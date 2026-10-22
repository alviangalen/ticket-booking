import React from "react";
import { Instagram, Youtube, Radio } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-high border-t-2 border-outline">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-outline/40">
          {/* Brand Logo in Footer */}
          <div className="space-y-2">
            <div className="text-2xl font-headline font-bold text-primary uppercase tracking-wider">
              SHEILA ON 7 • KISAH KLASIK
            </div>
            <p className="text-xs md:text-sm text-on-surface-variant max-w-md">
              Konser akbar perayaan 30 tahun berkarya. Menyatukan kenangan dari panggung ke panggung sejak era analog hingga selamanya.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Instagram Official Sheila on 7"
              className="w-10 h-10 rounded border-2 border-on-surface bg-surface flex items-center justify-center hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform"
            >
              <Instagram className="w-5 h-5 text-primary" />
            </a>
            <a
              href="#"
              aria-label="YouTube Official Sheila on 7"
              className="w-10 h-10 rounded border-2 border-on-surface bg-surface flex items-center justify-center hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform"
            >
              <Youtube className="w-5 h-5 text-primary" />
            </a>
            <a
              href="#"
              aria-label="Spotify Sheila on 7"
              className="w-10 h-10 rounded border-2 border-on-surface bg-surface flex items-center justify-center hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform"
            >
              <Radio className="w-5 h-5 text-primary" />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs md:text-sm font-semibold">
          <a
            href="#"
            className="text-on-surface-variant hover:text-primary transition-colors hover:underline underline-offset-4 decoration-2 decoration-secondary"
          >
            Panduan Festival
          </a>
          <a
            href="#"
            className="text-on-surface-variant hover:text-primary transition-colors hover:underline underline-offset-4 decoration-2 decoration-secondary"
          >
            Syarat &amp; Ketentuan
          </a>
          <a
            href="#"
            className="text-on-surface-variant hover:text-primary transition-colors hover:underline underline-offset-4 decoration-2 decoration-secondary"
          >
            Kebijakan Privasi
          </a>
          <a
            href="#"
            className="text-on-surface-variant hover:text-primary transition-colors hover:underline underline-offset-4 decoration-2 decoration-secondary"
          >
            Hubungi Promotor
          </a>
          <a
            href="#"
            className="text-on-surface-variant hover:text-primary transition-colors hover:underline underline-offset-4 decoration-2 decoration-secondary"
          >
            Pertanyaan Umum (FAQ)
          </a>
        </div>

        {/* Copyright Notice */}
        <div className="pt-4 border-t border-outline/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
          <div>
            &copy; 2026 Sheila on 7 Kisah Klasik Festival. Hak Cipta Dilindungi Undang-Undang. Diproduksi bersama Meadow Festival.
          </div>
          <div className="flex items-center gap-2">
            <span>
              Official Ticketing Partner: <strong>TiketNusantara ID</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};