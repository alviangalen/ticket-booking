import React, { useState } from "react";
import { TicketTier } from "../types";
import { Ticket, CheckCircle2, ShoppingCart, Award, AlertCircle, RefreshCw, Loader2 } from "lucide-react";

interface TicketSectionProps {
  tiers: TicketTier[];
  selectedTier: TicketTier | null;
  selectedQuantity: number;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onSelectTier: (tier: TicketTier, quantity: number) => void;
}

export const TicketSection: React.FC<TicketSectionProps> = ({
  tiers,
  selectedTier,
  selectedQuantity,
  isLoading,
  error,
  onRetry,
  onSelectTier,
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQty = (tierId: string) => {
    if (selectedTier?.id === tierId) return selectedQuantity;
    return quantities[tierId] || 1;
  };

  const updateQty = (tierId: string, delta: number) => {
    const current = getQty(tierId);
    const next = Math.max(1, Math.min(4, current + delta));
    setQuantities((prev) => ({ ...prev, [tierId]: next }));
  };

  const formatRupiah = (val: number) => {
    return "Rp " + val.toLocaleString("id-ID");
  };

  return (
    <section className="py-16 px-6 bg-surface-container-high border-y-2 border-on-surface" id="tiket">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-3">
            <Ticket className="w-5 h-5 text-secondary" />
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary uppercase tracking-tight">
              PILIH KATEGORI TIKET
            </h2>
            <Ticket className="w-5 h-5 text-secondary" />
          </div>
          <p className="text-sm md:text-base text-on-surface-variant max-w-xl mx-auto">
            Seluruh tiket sudah termasuk Pajak Hiburan 15% &amp; Biaya Admin Penanganan. Nikmati pengalaman konser analog dengan gelang RFID resmi.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-16 text-center space-y-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
            <p className="text-sm font-bold uppercase tracking-wider text-on-surface">
              Memuat Kategori Tiket dari Server...
            </p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="max-w-xl mx-auto p-6 bg-red-100 border-2 border-red-700 rounded-lg text-center space-y-4">
            <AlertCircle className="w-8 h-8 text-red-700 mx-auto" />
            <div>
              <p className="font-bold text-red-900 text-sm">{error}</p>
              <p className="text-xs text-red-700 mt-1">Pastikan backend serverless telah berjalan.</p>
            </div>
            <button
              type="button"
              onClick={onRetry}
              className="tactile-btn inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded font-bold text-xs uppercase"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Coba Lagi</span>
            </button>
          </div>
        )}

        {/* 3 Ticket Cards with Retro Perforations */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((tier) => {
              const isSelected = selectedTier?.id === tier.id;
              const qty = getQty(tier.id);

              const isVip = tier.name.toUpperCase().includes("VIP");
              const isFestB = tier.name.toUpperCase().includes("B");

              return (
                <div
                  key={tier.id}
                  className={`ticket-stub tactile-card rounded-lg flex flex-col justify-between overflow-hidden border-2 border-on-surface transition-all ${
                    isSelected ? "ring-4 ring-primary shadow-hard-lg scale-[1.02]" : ""
                  } ${isVip ? "bg-[#fffdf9]" : "bg-[#fff8f6]"}`}
                >
                  {/* Perforation Cutouts */}
                  <div className="notch-top" />
                  <div className="notch-bottom" />

                  <div className="p-6 md:p-8 space-y-6 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span
                          className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                            isVip
                              ? "bg-[#e67e22] text-[#faf6f0]"
                              : isFestB
                              ? "bg-[#0e7490] text-white"
                              : "bg-[#991b1b] text-white"
                          }`}
                        >
                          {tier.description || "TIKET MASUK RESMI"}
                        </span>
                        <h3 className="text-2xl font-headline font-black text-primary mt-2">
                          {tier.name}
                        </h3>
                      </div>
                      {isVip ? (
                        <Award className="w-8 h-8 text-[#e67e22]" />
                      ) : (
                        <Ticket className="w-8 h-8 text-primary" />
                      )}
                    </div>

                    {/* Pricing Box */}
                    <div className="border-y-2 border-dashed border-outline py-4">
                      <span className="text-xs uppercase text-on-surface-variant font-medium">
                        Harga per tiket
                      </span>
                      <div className="text-3xl font-headline font-black text-primary">
                        {formatRupiah(tier.price)}
                      </div>
                      <span
                        className={`text-xs font-bold uppercase block mt-1 ${
                          tier.status === "SOLD_OUT" || tier.availableQuota <= 0
                            ? "text-error"
                            : tier.availableQuota <= 50
                            ? "text-amber-600"
                            : "text-secondary"
                        }`}
                      >
                        {tier.status === "SOLD_OUT" || tier.availableQuota <= 0
                          ? "STATUS: HABIS TERJUAL (SOLD OUT)"
                          : tier.availableQuota <= 50
                          ? `STATUS: HANYA TERSISA ${tier.availableQuota} TIKET!`
                          : "STATUS: TERSEDIA (BATCH 2)"}
                      </span>
                    </div>

                    {/* Perks list */}
                    <ul className="space-y-2.5 text-xs sm:text-sm text-on-surface">
                      {tier.perks.map((perk, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#0e7490] shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ticket Tear-off & Stepper Counter */}
                  <div className="bg-surface-container p-6 border-t-2 border-dashed border-on-surface space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wide">
                        Jumlah Tiket:
                      </span>
                      <div className="flex items-center gap-3 bg-surface border-2 border-on-surface px-3 py-1 rounded">
                        <button
                          type="button"
                          onClick={() => updateQty(tier.id, -1)}
                          className="font-black text-xl hover:text-primary leading-none px-1"
                          disabled={qty <= 1}
                        >
                          −
                        </button>
                        <span className="font-bold text-lg w-6 text-center">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(tier.id, 1)}
                          className="font-black text-xl hover:text-primary leading-none px-1"
                          disabled={qty >= 4}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={tier.status === "SOLD_OUT" || tier.availableQuota <= 0}
                      onClick={() => {
                        onSelectTier(tier, qty);
                        const checkoutEl = document.getElementById("checkout");
                        if (checkoutEl) {
                          checkoutEl.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className={`tactile-btn w-full py-3.5 rounded font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 ${
                        tier.status === "SOLD_OUT" || tier.availableQuota <= 0
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : isSelected
                          ? "bg-[#0e7490] text-white"
                          : "bg-[#991b1b] hover:bg-primary text-white"
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>
                        {tier.status === "SOLD_OUT" || tier.availableQuota <= 0
                          ? "TIKET HABIS"
                          : isSelected
                          ? `TERPILIH (${qty} TIKET)`
                          : "PILIH TIKET INI"}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};