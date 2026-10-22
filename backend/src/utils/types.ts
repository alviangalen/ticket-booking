export interface BookSeatRequest {
  ticketTierId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  quantity: number;
  paymentMethod: "qris" | "va";
}

export interface BookingResponseData {
  bookingId: string;
  bookingCode: string;
  tierName: string;
  customerName: string;
  customerEmail: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  qrPayload: string;
  createdAt: string;
}

export interface TicketTierResponseData {
  id: string;
  name: string;
  description: string | null;
  price: number;
  totalQuota: number;
  availableQuota: number;
  status: string;
  perks: string[];
}

export interface EventResponseData {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  venue: string;
  date: string;
  gatesOpen: string;
  description: string;
  bannerUrl: string | null;
  ticketTiers: TicketTierResponseData[];
}
