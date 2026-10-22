import { APIGatewayProxyHandler } from "aws-lambda";
import { prisma } from "../db/client";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { BookSeatRequest, BookingResponseData } from "../utils/types";

// Maximum retries for optimistic lock conflict under heavy "war tiket" traffic
const MAX_LOCK_RETRIES = 3;

export const handler: APIGatewayProxyHandler = async (event) => {
  if (!event.body) {
    return errorResponse("Request body is required", 400);
  }

  let parsed: BookSeatRequest;
  try {
    parsed = JSON.parse(event.body);
  } catch {
    return errorResponse("Invalid JSON in request body", 400);
  }

  const {
    ticketTierId,
    customerName,
    customerEmail,
    customerPhone,
    quantity,
    paymentMethod,
  } = parsed;

  // Strict Validation
  if (!ticketTierId || typeof ticketTierId !== "string") {
    return errorResponse("ticketTierId is required", 400);
  }
  if (!customerName || customerName.trim().length < 3) {
    return errorResponse("customerName must be at least 3 characters", 400);
  }
  if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    return errorResponse("Valid customerEmail is required", 400);
  }
  if (!customerPhone || customerPhone.trim().length < 8) {
    return errorResponse("Valid customerPhone is required", 400);
  }
  if (!quantity || quantity < 1 || quantity > 4) {
    return errorResponse("Quantity must be between 1 and 4 tickets per transaction", 400);
  }
  if (!paymentMethod || !["qris", "va"].includes(paymentMethod)) {
    return errorResponse("paymentMethod must be 'qris' or 'va'", 400);
  }

  // AGENTS.md Rule 3: Concurrency & Locking for ticket booking ("war tiket")
  for (let attempt = 1; attempt <= MAX_LOCK_RETRIES; attempt++) {
    try {
      const result = await prisma.$transaction(async (tx) => {
        // 1. Fetch current tier state
        const currentTier = await tx.ticketTier.findUnique({
          where: { id: ticketTierId },
        });

        if (!currentTier) {
          throw new Error("TIER_NOT_FOUND");
        }

        if (currentTier.availableQuota < quantity) {
          throw new Error("INSUFFICIENT_QUOTA");
        }

        // 2. Optimistic Concurrency Control: atomic check on id + version
        const updateResult = await tx.ticketTier.updateMany({
          where: {
            id: ticketTierId,
            version: currentTier.version,
            availableQuota: { gte: quantity },
          },
          data: {
            availableQuota: { decrement: quantity },
            version: { increment: 1 },
          },
        });

        // Concurrency conflict occurred: another Lambda acquired the seat first
        if (updateResult.count === 0) {
          throw new Error("CONCURRENCY_CONFLICT");
        }

        // Check if now sold out
        const remaining = currentTier.availableQuota - quantity;
        if (remaining <= 0) {
          await tx.ticketTier.update({
            where: { id: ticketTierId },
            data: { status: "SOLD_OUT" },
          });
        }

        // 3. Generate booking code and QR Payload
        const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
        const bookingCode = `SO7-${Date.now().toString(36).toUpperCase()}-${randomSuffix}`;
        const totalPrice = currentTier.price * quantity;
        const qrPayload = JSON.stringify({
          app: "SO7-KisahKlasik-2026",
          code: bookingCode,
          tier: currentTier.name,
          qty: quantity,
          name: customerName.trim(),
          verified: true,
        });

        // 4. Create the booking entry
        const booking = await tx.booking.create({
          data: {
            bookingCode,
            ticketTierId,
            customerName: customerName.trim(),
            customerEmail: customerEmail.trim().toLowerCase(),
            customerPhone: customerPhone.trim(),
            quantity,
            totalPrice,
            paymentMethod,
            paymentStatus: "PAID",
            qrPayload,
          },
          include: {
            ticketTier: true,
          },
        });

        return booking;
      });

      const responseData: BookingResponseData = {
        bookingId: result.id,
        bookingCode: result.bookingCode,
        tierName: result.ticketTier.name,
        customerName: result.customerName,
        customerEmail: result.customerEmail,
        quantity: result.quantity,
        totalPrice: result.totalPrice,
        paymentMethod: result.paymentMethod,
        paymentStatus: result.paymentStatus,
        qrPayload: result.qrPayload,
        createdAt: result.createdAt.toISOString(),
      };

      return successResponse(
        responseData,
        "Pemesanan tiket berhasil dikonfirmasi! E-tiket telah diterbitkan.",
        201
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === "TIER_NOT_FOUND") {
          return errorResponse("Kategori tiket tidak ditemukan.", 404);
        }
        if (err.message === "INSUFFICIENT_QUOTA") {
          return errorResponse(
            "Maaf, tiket untuk kategori ini sudah habis terjual (Sold Out).",
            409
          );
        }
        if (err.message === "CONCURRENCY_CONFLICT") {
          // If conflict occurred during war tiket, retry with exponential jitter
          if (attempt < MAX_LOCK_RETRIES) {
            const backoff = Math.floor(Math.random() * 50) + attempt * 30;
            await new Promise((res) => setTimeout(res, backoff));
            continue;
          }
          return errorResponse(
            "Trafik pemesanan sangat padat (War Tiket). Silakan coba beberapa saat lagi.",
            409
          );
        }
      }

      const message = err instanceof Error ? err.message : "Internal server error";
      return errorResponse(`Gagal memproses pemesanan: ${message}`, 500);
    }
  }

  return errorResponse("Gagal mengamankan tiket setelah beberapa percobaan. Silakan coba lagi.", 409);
};
