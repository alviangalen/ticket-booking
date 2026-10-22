import React from "react";
import { BookingResult } from "../types";
import { QRCodeSVG } from "qrcode.react";
import { X, CheckCircle, Printer, Sparkles, MapPin, Calendar, Clock } from "lucide-react";

interface BookingModalProps {
  booking: BookingResult | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-surface border-4 border-on-surface rounded-2xl shadow-hard-lg overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-primary text-white p-5 flex items-center justify-between border-b-2 border-on-surface">
          <div className="flex items-center gap-2 font-headline font-bold text-lg uppercase">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span>PEMESANAN TIKET BERHASIL!</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded bg-black/20 hover:bg-black/40 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / The Ticket Stub */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-500 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>E-TIKET RESMI • LANGSUNG AKTIF</span>
            </div>
            <h3 className="text-2xl font-headline font-black text-primary uppercase">
              SHEILA ON 7 • KISAH KLASIK 2026
            </h3>
            <p className="text-xs text-on-surface-variant">
              Simpan dan tunjukkan kode QR di bawah ini ke gatekeeper saat penukaran wristband.
            </p>
          </div>

          {/* Ticket Perforated Box */}
          <div className="ticket-stub tactile-card rounded-xl p-6 border-2 border-on-surface bg-[#fff8f6] space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-5 border-b-2 border-dashed border-outline">
              <div className="bg-white p-3 border-2 border-on-surface rounded-lg shadow-hard-sm shrink-0">
                <QRCodeSVG
                  value={booking.qrPayload || booking.bookingCode}
                  size={140}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">
                    KODE BOOKING
                  </span>
                  <span className="font-mono font-black text-lg text-primary bg-surface px-2.5 py-0.5 rounded border border-on-surface inline-block">
                    {booking.bookingCode}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">
                    KATEGORI TIKET
                  </span>
                  <span className="font-headline font-extrabold text-xl text-[#0e7490]">
                    {booking.tierName} ({booking.quantity} Tiket)
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">
                    NAMA PEMEGANG TIKET
                  </span>
                  <span className="font-bold text-sm text-on-surface">
                    {booking.customerName}
                  </span>
                </div>
              </div>
            </div>

            {/* Event & Logistics Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-on-surface">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary shrink-0" />
                <span>20 November 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Pintu Dibuka: 15:00 WIB</span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Stadion Utama Gelora Bung Karno Jakarta</span>
              </div>
            </div>

            {/* Total Paid */}
            <div className="border-t-2 border-dashed border-outline pt-3 flex justify-between items-center text-xs sm:text-sm">
              <span className="font-bold text-on-surface-variant uppercase">
                Status Pembayaran:
              </span>
              <span className="px-2.5 py-0.5 rounded bg-green-100 text-green-800 font-bold border border-green-700">
                LUNAS ({booking.paymentMethod.toUpperCase()})
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handlePrint}
              className="tactile-btn flex-1 bg-secondary text-white py-3 rounded font-bold text-sm uppercase flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="tactile-btn sm:w-32 bg-surface text-on-surface border-2 border-on-surface py-3 rounded font-bold text-sm uppercase"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};