import { prisma } from "./client";

async function main() {
  console.log("Seeding concert event data...");

  const existingEvent = await prisma.event.findUnique({
    where: { slug: "sheila-on-7-kisah-klasik-2026" },
  });

  if (existingEvent) {
    console.log("Event already seeded. Skipping.");
    return;
  }

  const concert = await prisma.event.create({
    data: {
      slug: "sheila-on-7-kisah-klasik-2026",
      title: "SHEILA ON 7 • KONSER KISAH KLASIK",
      subtitle: "30 TAHUN MERAYAKAN KISAH KLASIK",
      venue: "Stadion Utama Gelora Bung Karno Jakarta",
      date: new Date("2026-11-20T19:00:00.000Z"),
      gatesOpen: "15:00 WIB",
      description:
        "Perayaan tiga dekade lagu-lagu persahabatan, cinta, dan nostalgia bersama Sheila on 7 serta penampilan kolaborasi eksklusif The Adams, Barasuara, dan Nadin Amizah.",
      bannerUrl: "/hero-concert.jpg",
      ticketTiers: {
        create: [
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
        ],
      },
    },
  });

  console.log("Seeding completed successfully for event:", concert.title);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });