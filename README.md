# Concert Ticket Booking Platform (Sheila on 7 • Kisah Klasik Festival 2026)

Monorepo Serverless Web App untuk pemesanan tiket konser Sheila on 7 dengan proteksi concurrency tinggi ("War Tiket"). Didesain berdasarkan Design System Google Stitch **"Kisik-Indie Concert Flow"** (Meadow Festival Red Edition) dengan estetika retro-analog berpadu modern tactile UI.

---

## 🏗️ Tech Stack & Architecture

- **Frontend (`/frontend`)**:
  - React 18, Vite, TypeScript
  - Tailwind CSS (desain tactile cards, perforated ticket stubs, custom hard shadows)
  - QR Code generator (`qrcode.react`) & Confetti celebration
  - Centralized API Service (`src/services/api.ts`)
  - Target Deployment: **AWS Amplify**

- **Backend (`/backend`)**:
  - Node.js 20, TypeScript, Serverless Framework (`serverless.yml`)
  - Target Deployment: **AWS API Gateway + AWS Lambda**
  - Database: **PostgreSQL (Amazon RDS)** via **Prisma ORM**
  - Concurrency Control: **Optimistic Concurrency Locking** via `@default(0) version` & Prisma atomic interactive transactions untuk mencegah double-booking saat trafik tinggi ("War Tiket").

---

## 📁 Directory Structure

```
ticket-booking-monorepo/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable tactile UI components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Countdown.tsx
│   │   │   ├── Lineup.tsx
│   │   │   ├── TicketSection.tsx
│   │   │   ├── CheckoutForm.tsx
│   │   │   ├── BookingModal.tsx
│   │   │   ├── NewsSection.tsx
│   │   │   ├── VenueInfo.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/           # Page layout
│   │   │   └── HomePage.tsx
│   │   ├── services/        # Centralized API service with resilience
│   │   │   └── api.ts
│   │   ├── types/           # Strict TypeScript interfaces
│   │   ├── App.tsx
│   │   ├── index.css        # Perforation notches, hard shadows & animations
│   │   └── main.tsx
│   ├── tailwind.config.js   # Stitch tokens (crimson, indie teal, amber, alabaster paper)
│   └── vite.config.ts
├── backend/
│   ├── prisma/
│   │   └── schema.prisma    # Event, TicketTier (with version lock), Booking
│   ├── src/
│   │   ├── db/
│   │   │   ├── client.ts    # Prisma client singleton (reused across warm Lambdas)
│   │   │   └── seed.ts      # Event & tier seeder
│   │   ├── handlers/        # Single Responsibility Lambda functions
│   │   │   ├── health.ts
│   │   │   ├── getEvents.ts
│   │   │   ├── getTicketTiers.ts
│   │   │   ├── bookSeat.ts  # Concurrency & locking transaction ("War Tiket")
│   │   │   └── getBookingStatus.ts
│   │   └── utils/
│   │       ├── apiResponse.ts # Standard API Gateway response formatting
│   │       └── types.ts
│   └── serverless.yml       # IaC definition for AWS
└── AGENTS.md                # Engineering constraints & guidelines
```

---

## ⚡ Concurrency & "War Tiket" Protection

Pada `backend/src/handlers/bookSeat.ts`:
1. Menggunakan kolom `version` pada tabel `TicketTier`.
2. Saat pemesanan masuk, query update dieksekusi secara atomik dalam `prisma.$transaction`:
   ```ts
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
   ```
3. Jika dua atau lebih Lambda mencoba memesan sisa tiket terakhir di detik yang sama, hanya satu yang berhasil meng-increment version; pemesanan lainnya akan mendeteksi `updateResult.count === 0` lalu menjalankan mekanisme retry ber-jitter atau menolak dengan status HTTP `409 (Sold Out)`.

---

## 🚀 Cara Menjalankan

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npx prisma generate
npm run build
```