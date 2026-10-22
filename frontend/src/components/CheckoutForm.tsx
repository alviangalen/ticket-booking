import React, { useState } from "react";
import { TicketTier, BookingResult } from "../types";
import { apiService } from "../services/api";
import { ShieldCheck, CreditCard, QrCode, AlertCircle, Loader2, Info } from "lucide-react";
import confetti from "canvas-confetti";

interface CheckoutFormProps {
  selectedTier: TicketTier | null;
  quantity: number;
  onBookingSuccess: (booking: BookingResult) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  selectedTier,
  quantity,
  onBookingSuccess,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "va">("qris");
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentQty = quantity || 1;
  const totalPrice = selectedTier ? selectedTier.price * currentQty : 0;

  const formatRupiah = (val: number) => {
    return "Rp " + val.toLocaleString("id-ID");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedTier) {
      setErrorMessage("Silakan pilih kategori tiket terlebih dahulu sebelum melakukan pemesanan.");
      return;
    }

    if (!termsAgreed) {
      setErrorMessage("Harap menyetujui syarat & ketentuan sebelum melanjutkan.");
      return;
    }

    try {
      setLoading(true);
      const result = await apiService.bookTicket({
        ticketTierId: selectedTier.id,
        customerName: fullName,
        customerEmail: email,
        customerPhone: whatsapp,
        quantity: currentQty,
        paymentMethod,
      });

      // Celebration effect on confirmed booking
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      onBookingSuccess(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memproses pemesanan tiket.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 bg-surface" id="checkout">
      <div className="max-w-5xl mx-auto">
        <div className="tactile-card bg-[#fff8f6] rounded-xl p-6 sm:p-10 md:p-12 border-4 border-on-surface">
          {/* Header */}
          <div className="border-b-2 border-on-surface pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="bg-secondary text-white px-3 py-1 text-xs font-bold uppercase rounded">
                LANGKAH 2 DARI 2
              </span>
              <h2 className="text-2xl sm:text-3xl font-headline font-bold text-primary uppercase mt-1">
                DATA PEMESAN &amp; E-TIKET
              </h2>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant text-xs sm:text-sm font-semibold">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <span>Enkripsi Pembayaran 256-bit Aman</span>
            </div>
          </div>

          {!selectedTier && (
            <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-600 text-amber-900 rounded flex items-center gap-3 text-sm font-semibold">
              <Info className="w-5 h-5 text-amber-700 shrink-0" />
              <span>Belum ada tiket yang dipilih. Silakan pilih salah satu kategori tiket di atas.</span>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-700 text-red-900 rounded flex items-center gap-3 text-sm font-semibold">
              <AlertCircle className="w-5 h-5 text-red-700 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form className="grid grid-cols-1 lg:grid-cols-12 gap-8" onSubmit={handleSubmit}>
            {/* Left Form Fields */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-bold text-on-surface uppercase mb-2 tracking-wide"
                >
                  Nama Lengkap (Sesuai KTP / Paspor) *
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  disabled={!selectedTier}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Contoh: Danu Pratama"
                  className="w-full bg-[#fff8f6] border-2 border-on-surface p-3.5 rounded text-sm md:text-base focus:outline-none focus:border-[#0e7490] focus:shadow-hard-sm disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-on-surface uppercase mb-2 tracking-wide"
                  >
                    Email Aktif (Pengiriman E-Tiket) *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    disabled={!selectedTier}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full bg-[#fff8f6] border-2 border-on-surface p-3.5 rounded text-sm md:text-base focus:outline-none focus:border-[#0e7490] focus:shadow-hard-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="block text-xs font-bold text-on-surface uppercase mb-2 tracking-wide"
                  >
                    Nomor WhatsApp Aktif *
                  </label>
                  <input
                    id="whatsapp"
                    type="tel"
                    required
                    disabled={!selectedTier}
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="0812XXXXXXXX"
                    className="w-full bg-[#fff8f6] border-2 border-on-surface p-3.5 rounded text-sm md:text-base focus:outline-none focus:border-[#0e7490] focus:shadow-hard-sm disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-on-surface uppercase mb-3 tracking-wide">
                  Metode Pembayaran Instan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* QRIS */}
                  <label
                    className={`flex items-center gap-3 p-3.5 border-2 border-on-surface rounded cursor-pointer transition-colors ${
                      paymentMethod === "qris" ? "bg-amber-100 ring-2 ring-amber-500" : "bg-surface-container"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value="qris"
                      disabled={!selectedTier}
                      checked={paymentMethod === "qris"}
                      onChange={() => setPaymentMethod("qris")}
                      className="text-secondary focus:ring-0"
                    />
                    <div>
                      <div className="text-xs font-black uppercase flex items-center gap-1.5">
                        <QrCode className="w-4 h-4 text-[#0e7490]" />
                        <span>QRIS INSTAN</span>
                      </div>
                      <div className="text-xs text-on-surface-variant">
                        BCA, GoPay, OVO, Dana (Bebas Biaya)
                      </div>
                    </div>
                  </label>

                  {/* Virtual Account */}
                  <label
                    className={`flex items-center gap-3 p-3.5 border-2 border-on-surface rounded cursor-pointer transition-colors ${
                      paymentMethod === "va" ? "bg-amber-100 ring-2 ring-amber-500" : "bg-surface-container"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value="va"
                      disabled={!selectedTier}
                      checked={paymentMethod === "va"}
                      onChange={() => setPaymentMethod("va")}
                      className="text-secondary focus:ring-0"
                    />
                    <div>
                      <div className="text-xs font-black uppercase flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-[#0e7490]" />
                        <span>VIRTUAL ACCOUNT</span>
                      </div>
                      <div className="text-xs text-on-surface-variant">
                        Mandiri, BRI, BNI, BCA VA
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  disabled={!selectedTier}
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="mt-1 border-2 border-on-surface text-secondary focus:ring-0 rounded"
                />
                <label htmlFor="terms" className="text-xs text-on-surface-variant leading-relaxed">
                  Saya menyetujui Syarat &amp; Ketentuan masuk venue konser Sheila on 7 Kisah Klasik Festival 2026 dan menjamin data KTP yang dimasukkan adalah valid.
                </label>
              </div>
            </div>

            {/* Right: Order Summary Box */}
            <div className="lg:col-span-5">
              <div className="bg-surface-container border-2 border-on-surface p-6 rounded-lg space-y-4 shadow-hard-sm">
                <h3 className="font-headline font-bold text-lg text-primary uppercase border-b-2 border-on-surface pb-3">
                  RINGKASAN PESANAN
                </h3>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="font-bold text-on-surface">
                      {selectedTier ? `${selectedTier.name} (x${currentQty})` : "Belum memilih tiket"}
                    </span>
                    <span className="font-bold text-on-surface">
                      {selectedTier ? formatRupiah(totalPrice) : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Pajak Hiburan Pemprov DKI (15%)</span>
                    <span className="text-green-700 font-semibold">Sudah Termasuk</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Biaya Platform &amp; Asuransi</span>
                    <span className="text-green-700 font-semibold">Rp 0 (Promo)</span>
                  </div>
                </div>

                <div className="border-t-2 border-dashed border-outline pt-4 flex justify-between items-baseline">
                  <span className="text-sm font-black uppercase tracking-wider">
                    TOTAL BAYAR
                  </span>
                  <span className="text-2xl font-headline font-black text-[#991b1b]">
                    {selectedTier ? formatRupiah(totalPrice) : "-"}
                  </span>
                </div>

                {/* Pay Button */}
                <button
                  type="submit"
                  disabled={loading || !selectedTier}
                  className="tactile-btn w-full bg-[#991b1b] hover:bg-primary text-white py-4 rounded font-bold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Mengamankan Tiket...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">payments</span>
                      <span>BAYAR SEKARANG</span>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-on-surface-variant">
                  E-Tiket berupa QR Barcode akan otomatis dikirimkan ke email &amp; WhatsApp setelah verifikasi sistem bank.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};