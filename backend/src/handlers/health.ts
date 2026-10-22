import { APIGatewayProxyHandler } from "aws-lambda";
import { successResponse } from "../utils/apiResponse";

export const handler: APIGatewayProxyHandler = async () => {
  return successResponse({
    status: "healthy",
    service: "ticket-booking-backend",
    timestamp: new Date().toISOString(),
  });
};
