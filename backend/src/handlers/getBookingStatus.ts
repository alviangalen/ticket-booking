import { APIGatewayProxyHandler } from "aws-lambda";
import { prisma } from "../db/client";
import { errorResponse, successResponse } from "../utils/apiResponse";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const code = event.queryStringParameters?.code;
    const email = event.queryStringParameters?.email;

    if (!code && !email) {
      return errorResponse("Harap sertakan parameter 'code' atau 'email'", 400);
    }

    if (code) {
      const booking = await prisma.booking.findUnique({
        where: { bookingCode: code },
        include: {
          ticketTier: {
            include: {
              event: true,
            },
          },
        },
      });

      if (!booking) {
        return errorResponse("Kode booking tidak ditemukan", 404);
      }

      return successResponse(booking);
    }

    if (email) {
      const bookings = await prisma.booking.findMany({
        where: { customerEmail: email.toLowerCase() },
        include: {
          ticketTier: {
            include: {
              event: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return successResponse(bookings);
    }

    return errorResponse("Parameter tidak valid", 400);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(`Gagal memeriksa status tiket: ${message}`, 500);
  }
};
