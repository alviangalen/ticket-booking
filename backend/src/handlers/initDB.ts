import { Handler } from "aws-lambda";
import { prisma } from "../db/client";
import { errorResponse, successResponse } from "../utils/apiResponse";

/**
 * Serverless Database Initialization & Seeding Handler
 *
 * Designed to be invoked manually (via AWS Console "Test" button or AWS CLI).
 * Executes raw PostgreSQL DDL queries to create tables and types if they do not exist,
 * and performs idempotent seeding using Prisma upsert operations.
 */
export const handler: Handler = async (event) => {
  console.log("Starting Serverless Database Initialization (initDB)...", event);

  try {
    // -------------------------------------------------------------------------
    // 1. Raw DDL: Ensure Types, Tables, and Indexes Exist
    // -------------------------------------------------------------------------
    console.log("Executing raw DDL queries to verify/create database schema...");

    // Create PaymentStatus ENUM type if not already existing
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PaymentStatus') THEN
          CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'EXPIRED');
        END IF;
      END $$;
    `);

    // Create "events" table matching Prisma model Event
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "events" (
        "id" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "subtitle" TEXT,
        "venue" TEXT NOT NULL,
        "date" TIMESTAMP(3) NOT NULL,
        "gatesOpen" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "bannerUrl" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "events_pkey" PRIMARY KEY ("id")
      );
    `);

    // Ensure unique index on events(slug)
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "events_slug_key" ON "events"("slug");
    `);

    // Create "ticket_tiers" table matching Prisma model TicketTier
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ticket_tiers" (
        "id" TEXT NOT NULL,
        "eventId" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "description" TEXT,
        "price" INTEGER NOT NULL,
        "totalQuota" INTEGER NOT NULL,
        "availableQuota" INTEGER NOT NULL,
        "version" INTEGER NOT NULL DEFAULT 0,
        "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
        "perks" TEXT[] DEFAULT ARRAY[]::TEXT[],
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "ticket_tiers_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "ticket_tiers_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    // Create "bookings" table matching Prisma model Booking
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "bookings" (
        "id" TEXT NOT NULL,
        "bookingCode" TEXT NOT NULL,
        "ticketTierId" TEXT NOT NULL,
        "customerName" TEXT NOT NULL,
        "customerEmail" TEXT NOT NULL,
        "customerPhone" TEXT NOT NULL,
        "quantity" INTEGER NOT NULL,
        "totalPrice" INTEGER NOT NULL,
        "paymentMethod" TEXT NOT NULL,
        "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
        "qrPayload" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "bookings_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "bookings_ticketTierId_fkey" FOREIGN KEY ("ticketTierId") REFERENCES "ticket_tiers"("id") ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `);

    // Ensure unique and lookup indexes for bookings
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "bookings_bookingCode_key" ON "bookings"("bookingCode");
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "bookings_customerEmail_idx" ON "bookings"("customerEmail");
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "bookings_bookingCode_idx" ON "bookings"("bookingCode");
    `);

    console.log("Raw DDL executed successfully. Tables and relations are in sync.");

    // -------------------------------------------------------------------------
    // 2. Seeding Logic: Sheila on 7 Event & Ticket Tiers via Upsert
    // -------------------------------------------------------------------------
    console.log("Upserting concert event data...");

    const seededEvent = await prisma.event.upsert({
      where: { slug: "sheila-on-7-kisah-klasik-2026" },
      update: {
        title: "SHEILA ON 7 • KONSER KISAH KLASIK",
        subtitle: "30 TAHUN MERAYAKAN KISAH KLASIK",
        venue: "Stadion Utama Gelora Bung Karno Jakarta",
        date: new Date("2026-11-20T19:00:00.000Z"),
        gatesOpen: "15:00 WIB",
        description:
          "Perayaan tiga dekade lagu-lagu persahabatan, cinta, dan nostalgia bersama Sheila on 7 serta penampilan kolaborasi eksklusif The Adams, Barasuara, dan Nadin Amizah.",
        bannerUrl: "/hero-concert.jpg",
      },
      create: {
        slug: "sheila-on-7-kisah-klasik-2026",
        title: "SHEILA ON 7 • KONSER KISAH KLASIK",
        subtitle: "30 TAHUN MERAYAKAN KISAH KLASIK",
        venue: "Stadion Utama Gelora Bung Karno Jakarta",
        date: new Date("2026-11-20T19:00:00.000Z"),
        gatesOpen: "15:00 WIB",
        description:
          "Perayaan tiga dekade lagu-lagu persahabatan, cinta, dan nostalgia bersama Sheila on 7 serta penampilan kolaborasi eksklusif The Adams, Barasuara, dan Nadin Amizah.",
        bannerUrl: "/hero-concert.jpg",
      },
    });

    console.log(`Concert event upserted: ${seededEvent.title} (ID: ${seededEvent.id})`);

    // Define ticket tier configurations to seed
    const ticketTiersToSeed = [
      {
        name: "FESTIVAL A",
        description: "Area Depan Panggung",
        price: 650000,
        totalQuota: 500,
        availableQuota: 500,
        status: "AVAILABLE",
        perks: [
          "Akses standing paling dekat dengan bibir panggung utama",
          "Jalur antrean khusus Soundcheck Privilege (Early Gate)",
          "Wristband kain tenun edisi 30 Tahun SO7",
        ],
      },
      {
        name: "FESTIVAL B",
        description: "Area Tengah Stadion",
        price: 450000,
        totalQuota: 1200,
        availableQuota: 1200,
        status: "AVAILABLE",
        perks: [
          "Pusat koor & sing-along serentak seluruh penonton",
          "Akses leluasa ke area F&B Festival Pasar Musik",
          "Free exclusive merchandise poster screen-printed",
        ],
      },
      {
        name: "VIP SEATING",
        description: "Tribun Utama (Numbered)",
        price: 950000,
        totalQuota: 300,
        availableQuota: 45,
        status: "LIMITED",
        perks: [
          "Tempat duduk bernomor (Numbered Seating) prime angle",
          "Paket souvenir boxset vinyl kaset pita & t-shirt resmi",
          "Akses toilet VIP khusus & lounge minuman gratis",
        ],
      },
    ];

    const seededTiers = [];

    for (const tierData of ticketTiersToSeed) {
      // Find existing tier by eventId and name to preserve its ID and current bookings
      const existingTier = await prisma.ticketTier.findFirst({
        where: {
          eventId: seededEvent.id,
          name: tierData.name,
        },
      });

      const tierId = existingTier
        ? existingTier.id
        : `tier-${seededEvent.id}-${tierData.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

      const upsertedTier = await prisma.ticketTier.upsert({
        where: { id: tierId },
        update: {
          description: tierData.description,
          price: tierData.price,
          totalQuota: tierData.totalQuota,
          status: tierData.status,
          perks: tierData.perks,
        },
        create: {
          id: tierId,
          eventId: seededEvent.id,
          name: tierData.name,
          description: tierData.description,
          price: tierData.price,
          totalQuota: tierData.totalQuota,
          availableQuota: tierData.availableQuota,
          status: tierData.status,
          perks: tierData.perks,
        },
      });

      seededTiers.push({
        id: upsertedTier.id,
        name: upsertedTier.name,
        price: upsertedTier.price,
        totalQuota: upsertedTier.totalQuota,
        availableQuota: upsertedTier.availableQuota,
        status: upsertedTier.status,
      });
    }

    console.log(`Seeded ${seededTiers.length} ticket tiers successfully.`);

    // -------------------------------------------------------------------------
    // 3. Return Standard Success Response
    // -------------------------------------------------------------------------
    return successResponse(
      {
        initialized: true,
        schemaStatus: "in_sync",
        event: {
          id: seededEvent.id,
          slug: seededEvent.slug,
          title: seededEvent.title,
          venue: seededEvent.venue,
          date: seededEvent.date,
        },
        ticketTiers: seededTiers,
      },
      "Database schema initialized and concert data seeded successfully.",
      200
    );
  } catch (error: unknown) {
    console.error("Database initialization failed:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return errorResponse(`Database initialization failed: ${errorMessage}`, 500);
  }
};

