import { APIGatewayProxyResult } from "aws-lambda";

export interface ApiResponsePayload<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
  "Content-Type": "application/json",
};

export const createResponse = <T>(
  statusCode: number,
  payload: ApiResponsePayload<T>
): APIGatewayProxyResult => {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(payload),
  };
};

export const successResponse = <T>(
  data: T,
  message?: string,
  statusCode = 200
): APIGatewayProxyResult => {
  return createResponse<T>(statusCode, {
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  errorMessage: string,
  statusCode = 400
): APIGatewayProxyResult => {
  return createResponse(statusCode, {
    success: false,
    error: errorMessage,
  });
};
