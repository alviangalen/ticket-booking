import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Countdown } from "../components/Countdown";
import { Lineup } from "../components/Lineup";
import { TicketSection } from "../components/TicketSection";
import { CheckoutForm } from "../components/CheckoutForm";
import { NewsSection } from "../components/NewsSection";
import { VenueInfo } from "../components/VenueInfo";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import { apiService } from "../services/api";
import { TicketTier, BookingResult } from "../types";

export const HomePage: React.FC = () => {
  const [tiers, setTiers] = useState<TicketTier[]>([]);
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingResult | null>(null);

  const [isLoadingTiers, setIsLoadingTiers] = useState<boolean>(true);
  const [tierError, setTierError] = useState<string | null>(null);

  const fetchTiers = useCallback(async () => {
    setIsLoadingTiers(true);
    setTierError(null);
    try {
      const data = await apiService.getTicketTiers();
      setTiers(data);
      if (data && data.length > 0) {
        setSelectedTier(data[0]);
      } else {
        setSelectedTier(null);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat kategori tiket.";
      setTierError(msg);
      setSelectedTier(null);
    } finally {
      setIsLoadingTiers(false);
    }
  }, []);

  useEffect(() => {
    fetchTiers();
  }, [fetchTiers]);

  const handleSelectTier = (tier: TicketTier, qty: number) => {
    setSelectedTier(tier);
    setSelectedQuantity(qty);
  };

  const handleBookingSuccess = (booking: BookingResult) => {
    setConfirmedBooking(booking);
    // Refresh remaining tier quotas after successful booking
    fetchTiers();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf9f3] text-[#1c1c18]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Countdown />
        <Lineup />
        <TicketSection
          tiers={tiers}
          selectedTier={selectedTier}
          selectedQuantity={selectedQuantity}
          isLoading={isLoadingTiers}
          error={tierError}
          onRetry={fetchTiers}
          onSelectTier={handleSelectTier}
        />
        <CheckoutForm
          selectedTier={selectedTier}
          quantity={selectedQuantity}
          onBookingSuccess={handleBookingSuccess}
        />
        <NewsSection />
        <VenueInfo />
      </main>
      <Footer />

      {/* Confirmation E-Ticket Modal */}
      <BookingModal
        booking={confirmedBooking}
        onClose={() => setConfirmedBooking(null)}
      />
    </div>
  );
};