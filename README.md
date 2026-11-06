# Concert Ticket Booking Platform (Sheila on 7 • Kisah Klasik Festival 2026)

Monorepo Serverless Web App untuk pemesanan tiket konser Sheila on 7 dengan proteksi concurrency tinggi ("War Tiket"). Didesain berdasarkan Design System Google Stitch **"Kisik-Indie Concert Flow"** (Meadow Festival Red Edition) dengan estetika retro-analog berpadu modern tactile UI.

---

## Tech Stack & Target Deployment

- **Frontend (`/frontend`)**:
  - React 18, Vite, TypeScript
  - Tailwind CSS (desain tactile cards, perforated ticket stubs, custom hard shadows)
  - QR Code generator (`qrcode.react`) & Confetti celebration (`canvas-confetti`)
  - Centralized API Service (`src/services/api.ts`) tanpa mock/dummy data
  - Target Deployment: **AWS Amplify**

- **Backend (`/backend`)**:
  - Node.js 20, TypeScript, Serverless Framework (`serverless.yml`)
  - Target Deployment: **AWS API Gateway + AWS Lambda**
  - Database: **PostgreSQL (Amazon RDS)** via **Prisma ORM**
  - Concurrency Control: **Optimistic Concurrency Locking** via `@default(0) version` & Prisma atomic interactive transactions untuk mencegah double-booking saat trafik tinggi ("War Tiket").

---

## Port & Layanan yang Digunakan (Ports & Services)

Berikut adalah daftar port dan layanan yang digunakan dalam lingkungan pengembangan (development) monorepo ini:

| Layanan / Service | Lingkungan | Port | URL / Connection String | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Web App** | Vite Dev Server | **`5173`** | `http://localhost:5173` | UI React client untuk pemesanan tiket, live countdown, dan e-ticket modal (dikonfigurasi di `vite.config.ts`). |
| **Backend API Gateway** | Local Dev / Serverless | **`3000`** | `http://localhost:3000/dev` | Simulasi AWS API Gateway & Lambda handlers lokal (`src/devServer.ts` / Serverless Offline). |
| **Database PostgreSQL** | Docker Container | **`5433`** | `postgresql://postgres:postgres@localhost:5433/ticket_booking?schema=public` | Container PostgreSQL `ticket-postgres` dipetakan ke port host `5433` (menghindari konflik dengan Postgres sistem di `5432`). |
| **Database PostgreSQL** | Amazon RDS (Prod) | **`5432`** | `postgresql://<user>:<password>@<rds-endpoint>:5432/ticket_booking?schema=public` | Port standar PostgreSQL pada deployment cloud Amazon RDS. |

---

## Directory Structure

```
ticket-booking/
├── frontend/                     # React UI application (Target: AWS Amplify)
│   ├── public/
│   │   └── hero-concert.jpg      # Aset visual konser lokal resolusi tinggi
│   ├── src/
│   │   ├── components/           # Reusable tactile UI components
│   │   │   ├── Navbar.tsx        # Announcement ribbon, logo SO7, navigation
│   │   │   ├── Hero.tsx          # Billboard hero 30 Tahun Kisah Klasik
│   │   │   ├── Countdown.tsx     # Scoreboard analog hitung mundur live
│   │   │   ├── Lineup.tsx        # Lineup musisi & bintang tamu
│   │   │   ├── TicketSection.tsx # Tiket perforasi tactile & stepper kuota
│   │   │   ├── CheckoutForm.tsx  # Form pemesan & pembayaran instan (QRIS/VA)
│   │   │   ├── BookingModal.tsx  # Modal E-Tiket instan dengan QR Code & print
│   │   │   ├── NewsSection.tsx   # Panduan wristband & logistik konser
│   │   │   ├── VenueInfo.tsx     # Info GBK Senayan & akses transportasi
│   │   │   └── Footer.tsx        # Info promotor & mitra resmi
│   │   ├── pages/
│   │   │   └── HomePage.tsx      # Main layout pemesanan tiket
│   │   ├── services/
│   │   │   └── api.ts            # Centralized API service ke API Gateway
│   │   ├── types/
│   │   │   └── index.ts          # Strict TypeScript interfaces
│   │   ├── App.tsx
│   │   ├── index.css             # Perforation notches, hard shadows & animations
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── .env                      # VITE_API_URL
│   ├── .env.example
│   ├── index.html                # Google Fonts Bricolage Grotesque & Space Grotesk
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js        # Design tokens Google Stitch
│   ├── tsconfig.json
│   └── vite.config.ts            # Server port 5173
│
├── backend/                      # Serverless API (Target: AWS API Gateway + Lambda)
│   ├── prisma/
│   │   └── schema.prisma         # Event, TicketTier (with version lock), Booking
│   ├── src/
│   │   ├── db/
│   │   │   ├── client.ts         # Prisma client singleton (reused across warm Lambdas)
│   │   │   └── seed.ts           # Seeder data konser & kuota tiket
│   │   ├── handlers/             # Single Responsibility Lambda functions
│   │   │   ├── health.ts         # GET /health
│   │   │   ├── getEvents.ts      # GET /events
│   │   │   ├── getTicketTiers.ts # GET /tickets/tiers
│   │   │   ├── bookSeat.ts       # POST /tickets/book (Anti "War Tiket")
│   │   │   └── getBookingStatus.ts # GET /bookings/status
│   │   ├── utils/
│   │   │   ├── apiResponse.ts    # Standard API Gateway response formatting + CORS
│   │   │   └── types.ts          # Backend TypeScript interfaces
│   │   └── devServer.ts          # Local dev API Gateway runner (port 3000)
│   ├── .env                      # DATABASE_URL, PORT, AWS_REGION
│   ├── .env.example
│   ├── package.json
│   ├── serverless.yml            # IaC Serverless Framework definition
│   └── tsconfig.json
│
├── AGENTS.md                     # Engineering constraints & guidelines
└── README.md                     # Dokumentasi arsitektur & panduan sistem
```

---

## Daftar Endpoint API

Semua endpoint mengembalikan respons standar format `{ "success": boolean, "data": ..., "message": ... }`:

| Method | Endpoint | Request Params / Body | Deskripsi & Fungsi | File Handler |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/health` | *(None)* | Cek status kesehatan dan uptime backend API | [`health.ts`](backend/src/handlers/health.ts) |
| `GET` | `/events` | `?slug=...` *(opsional)* | Mengambil detail konser, lokasi GBK, dan tanggal pelaksanaan | [`getEvents.ts`](backend/src/handlers/getEvents.ts) |
| `GET` | `/tickets/tiers` | `?eventId=...` *(opsional)* | Mengambil daftar kategori tiket (*FESTIVAL A/B, VIP*), harga, kuota real-time | [`getTicketTiers.ts`](backend/src/handlers/getTicketTiers.ts) |
| `POST` | `/tickets/book` | **Body (JSON):**<br>`ticketTierId`, `customerName`, `customerEmail`, `customerPhone`, `quantity` (1-4), `paymentMethod` (`qris`/`va`) | Pemesanan tiket dengan transaksi atomik dan penguncian optimistik | [`bookSeat.ts`](backend/src/handlers/bookSeat.ts) |
| `GET` | `/bookings/status` | `?code=...` atau `?email=...` | Memeriksa rincian e-tiket, QR payload, dan verifikasi pembayaran | [`getBookingStatus.ts`](backend/src/handlers/getBookingStatus.ts) |

---

## Concurrency & "War Tiket" Protection

Pada `backend/src/handlers/bookSeat.ts`:
1. Kolom `version` pada tabel `TicketTier` digunakan sebagai penanda versi transaksi.
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
3. Jika dua atau lebih Lambda mencoba memesan sisa tiket terakhir di detik yang sama, hanya satu yang berhasil meng-increment `version`. Transaksi lain yang mendeteksi `updateResult.count === 0` akan melakukan *retry* dengan *exponential backoff jitter* atau menolak dengan HTTP `409 Conflict (Sold Out)` untuk mencegah double-booking.

---

## Panduan Menjalankan Aplikasi

### 1. Database PostgreSQL (Lokal via Docker)
Jalankan container PostgreSQL pada port `5433`:
```bash
docker run --name ticket-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=ticket_booking \
  -p 5433:5432 -d postgres:15-alpine
```

Sinkronkan skema Prisma dan lakukan seeder data awal:
```bash
cd backend
npx prisma db push
npm run prisma:seed
```

### 2. Backend (Port 3000)
Jalankan dev server API Gateway lokal:
```bash
cd backend
npm install
npm run dev
# Server aktif di http://localhost:3000/dev
```

Untuk memverifikasi backend:
```bash
curl http://localhost:3000/dev/health
curl http://localhost:3000/dev/tickets/tiers
```

### 3. Frontend (Port 5173)
Pastikan `VITE_API_URL` pada `frontend/.env` mengarah ke backend:
```env
VITE_API_URL="http://localhost:3000/dev"
```

Jalankan server Vite frontend:
```bash
cd frontend
npm install
npm run dev
# Buka http://localhost:5173 di browser
```

Build produksi:
```bash
npm run build
```
