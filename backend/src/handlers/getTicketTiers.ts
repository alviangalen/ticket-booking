import { APIGatewayProxyHandler } from "aws-lambda";
import { prisma } from "../db/client";
import { errorResponse, successResponse } from "../utils/apiResponse";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const eventId = event.queryStringParameters?.eventId;

    const tiers = await prisma.ticketTier.findMany({
      where: eventId ? { eventId } : undefined,
      select: {
        id: true,
        eventId: true,
        name: true,
        description: true,
        price: true,
        totalQuota: true,
        availableQuota: true,
        status: true,
        perks: true,
        updatedAt: true,
      },
      orderBy: { price: "asc" },
    });

    return successResponse(tiers);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(`Failed to fetch ticket tiers: ${message}`, 500);
  }
};
