export interface TicketTier {
  id: string;
  name: string;
  description: string;
  price: number;
  totalQuota: number;
  availableQuota: number;
  status: "AVAILABLE" | "LIMITED" | "SOLD_OUT";
  perks: string[];
}

export interface ConcertEvent {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  venue: string;
  date: string;
  gatesOpen: string;
  description: string;
  bannerUrl: string;
  ticketTiers: TicketTier[];
}

export interface BookingRequest {
  ticketTierId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  quantity: number;
  paymentMethod: "qris" | "va";
}

export interface BookingResult {
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

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
