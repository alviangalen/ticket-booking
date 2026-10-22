# Context
You are an expert Full-Stack TypeScript Developer, specializing in Serverless architectures on AWS. You are tasked with building a Modern Serverless Web App for concert ticket booking. 

This is a Monorepo project containing both the frontend and backend. You must strictly adhere to the directory boundaries and the tech stack specified below.

# Tech Stack
- **Frontend (`/frontend`)**: React, Vite, TypeScript, Tailwind CSS. (Target deployment: AWS Amplify).
- **Backend (`/backend`)**: Node.js, TypeScript, Serverless Framework (`serverless.yml`). (Target deployment: AWS API Gateway + AWS Lambda).
- **Database**: PostgreSQL (Amazon RDS) using Prisma ORM.

# Directory Structure
ticket-booking-monorepo/
├── frontend/                 # React UI application
├── backend/                  # Serverless API and Database
│   ├── prisma/               # Prisma schema and migrations
│   ├── src/
│   │   ├── db/               # Prisma client instantiation
│   │   ├── handlers/         # Lambda function entry points
│   │   └── utils/            # Helper functions
│   └── serverless.yml        # Infrastructure as Code
└── AGENTS.md                 # This file

# Global Rules
1. **Directory Isolation**: Never mix frontend and backend dependencies. Always verify your current working directory before running `npm install` or executing scripts.
2. **TypeScript Strictness**: Use strict typing. Avoid `any`. Define proper interfaces for API requests and responses.
3. **Environment Variables**: Always use `.env` files for secrets. Do not hardcode database URLs or API keys.
4. **Mock or Dummy Data**: Please dont put mock or dummy data on frontend or backend. We will use real database and API Gateway. Mocking API Gateway is allowed. if there no data from API Gateway, please return empty array or null. Please dont assume the data structure. You need to check the API Gateway response.

# Backend Development Rules (Serverless & Lambda)
1. **Single Responsibility**: Each file in `backend/src/handlers/` should export exactly one Lambda handler function (e.g., `bookSeat.ts`, `getEvents.ts`).
2. **Database Connections (CRITICAL)**: Lambda functions scale horizontally and can exhaust RDS connections. You MUST instantiate the Prisma Client outside the Lambda handler scope to allow connection reuse across warm invocations. Keep queries fast to free up connections quickly.
3. **Concurrency & Locking**: For the ticket booking logic, you must implement database-level locking or optimistic concurrency control to prevent double-booking during high-traffic ticket drops ("war tiket").
4. **API Responses**: Always return standard API Gateway response objects (statusCode, headers for CORS, body as a JSON string).

# Frontend Development Rules
1. **Component Structure**: Use functional components and React Hooks. Place reusable UI components in `frontend/src/components/` and page layouts in `frontend/src/pages/`.
2. **Styling**: Use Tailwind CSS exclusively for styling. Ensure components are responsive.
3. **API Integration**: Create centralized service functions in `frontend/src/services/` to handle API calls to the backend API Gateway endpoints. Handle loading and error states gracefully.