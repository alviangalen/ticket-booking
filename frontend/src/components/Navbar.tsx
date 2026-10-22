import React, { useState } from "react";
import { Ticket, Music, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Ribbon */}
      <aside
        aria-label="Announcement"
        className="bg-primary text-on-primary py-2 px-4 border-b-2 border-on-surface text-center flex items-center justify-center gap-3 text-xs md:text-sm font-semibold tracking-wider uppercase"
      >
        <span className="material-symbols-outlined text-sm text-amber-500">confirmation_number</span>
        <p>PRESALE TIKET DIBUKA HARI INI • JAMINAN HARGA RESMI &amp; TIKET LANGSUNG AKTIF</p>
        <Music className="w-3.5 h-3.5 text-amber-500 hidden sm:inline" />
      </aside>

      {/* Main Header Sticky Bar */}
      <header className="bg-surface border-b-2 border-outline shadow-[0_4px_0_0_#1c1c18] sticky top-0 z-40">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-3.5 w-full">
          {/* Brand Logo */}
          <a
            href="#"
            className="text-xl md:text-2xl font-headline font-extrabold uppercase tracking-tight text-primary flex items-center gap-2 hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform"
          >
            <span className="bg-primary text-on-primary px-2.5 py-0.5 rounded border-2 border-on-surface font-black text-lg">
              SO7
            </span>
            <span>Sheila on 7 • Kisah Klasik</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm uppercase tracking-wide">
            <a
              href="#lineup"
              className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform"
            >
              Lineup
            </a>
            <a
              href="#jadwal"
              className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform"
            >
              Jadwal
            </a>
            <a
              href="#tiket"
              className="text-primary border-b-2 border-primary font-bold hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform"
            >
              Tiket
            </a>
            <a
              href="#lokasi"
              className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform"
            >
              Lokasi
            </a>
            <a
              href="#berita"
              className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform"
            >
              Berita
            </a>
          </nav>

          {/* Trailing Primary Action */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#tiket"
              className="tactile-btn bg-secondary text-on-secondary px-5 py-2.5 rounded font-bold text-sm uppercase flex items-center gap-2 tracking-wider"
            >
              <span>Beli Tiket</span>
              <Ticket className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="md:hidden p-2 rounded border-2 border-on-surface bg-surface-container"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-outline bg-surface px-6 py-4 space-y-3 font-semibold text-sm uppercase">
            <a
              href="#lineup"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-on-surface-variant hover:text-primary py-1"
            >
              Lineup
            </a>
            <a
              href="#jadwal"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-on-surface-variant hover:text-primary py-1"
            >
              Jadwal
            </a>
            <a
              href="#tiket"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-primary font-bold py-1"
            >
              Pilih Tiket
            </a>
            <a
              href="#lokasi"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-on-surface-variant hover:text-primary py-1"
            >
              Lokasi &amp; Peta
            </a>
            <a
              href="#berita"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-on-surface-variant hover:text-primary py-1"
            >
              Berita &amp; Panduan
            </a>
            <div className="pt-2">
              <a
                href="#tiket"
                onClick={() => setMobileMenuOpen(false)}
                className="tactile-btn w-full text-center bg-secondary text-on-secondary px-5 py-2.5 rounded font-bold block"
              >
                Beli Tiket Sekarang
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
