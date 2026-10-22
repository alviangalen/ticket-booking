import { APIGatewayProxyHandler } from "aws-lambda";
import { prisma } from "../db/client";
import { errorResponse, successResponse } from "../utils/apiResponse";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const slug = event.queryStringParameters?.slug;

    if (slug) {
      const concertEvent = await prisma.event.findUnique({
        where: { slug },
        include: {
          ticketTiers: {
            orderBy: { price: "asc" },
          },
        },
      });

      if (!concertEvent) {
        return errorResponse("Event not found", 404);
      }

      return successResponse(concertEvent);
    }

    const events = await prisma.event.findMany({
      include: {
        ticketTiers: {
          orderBy: { price: "asc" },
        },
      },
      orderBy: { date: "asc" },
    });

    return successResponse(events);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(`Failed to retrieve events: ${message}`, 500);
  }
};
