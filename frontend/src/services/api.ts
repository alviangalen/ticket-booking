import { ApiResponse, BookingRequest, BookingResult, ConcertEvent, TicketTier } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiService = {
  /**
   * Fetch concert event details from API Gateway
   * Returns null if no data is found.
   */
  async getEvent(slug = "sheila-on-7-kisah-klasik-2026"): Promise<ConcertEvent | null> {
    const response = await fetch(`${API_BASE_URL}/events?slug=${encodeURIComponent(slug)}`);
    if (!response.ok) {
      throw new Error(`Gagal memuat event dari server (${response.status}: ${response.statusText})`);
    }
    const json: ApiResponse<ConcertEvent> = await response.json();
    if (!json.success || !json.data) {
      return null;
    }
    return json.data;
  },

  /**
   * Fetch live ticket tiers and remaining quotas from API Gateway
   * Returns empty array if no data is found.
   */
  async getTicketTiers(eventId?: string): Promise<TicketTier[]> {
    const endpoint = eventId
      ? `${API_BASE_URL}/tickets/tiers?eventId=${encodeURIComponent(eventId)}`
      : `${API_BASE_URL}/tickets/tiers`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Gagal memuat kategori tiket dari server (${response.status}: ${response.statusText})`);
    }
    const json: ApiResponse<TicketTier[]> = await response.json();
    if (!json.success || !json.data || !Array.isArray(json.data)) {
      return [];
    }
    return json.data;
  },

  /**
   * Submit ticket booking with concurrency & locking protection to API Gateway
   */
  async bookTicket(payload: BookingRequest): Promise<BookingResult> {
    const response = await fetch(`${API_BASE_URL}/tickets/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json: ApiResponse<BookingResult> = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.error || "Gagal memproses pemesanan tiket.");
    }

    if (!json.data) {
      throw new Error("Respon server tidak valid atau kosong.");
    }

    return json.data;
  },

  /**
   * Verify booking status from API Gateway
   */
  async getBookingStatus(code: string): Promise<BookingResult | null> {
    const response = await fetch(`${API_BASE_URL}/bookings/status?code=${encodeURIComponent(code)}`);
    if (!response.ok) {
      throw new Error(`Gagal memeriksa kode booking (${response.status})`);
    }
    const json: ApiResponse<BookingResult> = await response.json();
    if (!json.success || !json.data) {
      return null;
    }
    return json.data;
  },
};