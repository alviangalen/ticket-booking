import React from "react";
import { Calendar, MapPin, Users, Ticket, PlayCircle, Sparkles } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative border-b-2 border-on-surface bg-surface-container overflow-hidden">
      {/* Concert Visual Image Canvas */}
      <div className="relative w-full h-[540px] md:h-[640px]">
        <img
          src="/hero-concert.jpg"
          alt="Sheila on 7 live concert performance"
          className="w-full h-full object-cover object-center filter contrast-105 brightness-90"
        />

        {/* Retro Halftone & Parchment Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c18] via-[#1c1c18]/60 to-transparent" />
        <div className="absolute inset-0 bg-[#991b1b]/20 mix-blend-color-burn pointer-events-none" />

        {/* 30 Years Badge Ribbon */}
        <div className="absolute top-6 left-6 md:top-8 md:left-12 z-20">
          <div className="inline-flex items-center gap-2 bg-[#e67e22] text-[#faf6f0] px-4 py-2 border-2 border-on-surface shadow-hard font-bold text-xs md:text-sm uppercase tracking-wider rounded">
            <Sparkles className="w-4 h-4 text-yellow-200" />
            <span>30 TAHUN MERAYAKAN KISAH KLASIK</span>
          </div>
        </div>

        {/* Hero Content Platter */}
        <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 z-20 max-w-5xl">
          <div className="space-y-4">
            <div className="inline-block bg-[#0e7490] text-white px-3 py-1 font-bold text-xs uppercase tracking-widest border-2 border-on-surface shadow-hard-sm">
              FESTIVAL TERBESAR DI INDONESIA 2026
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-headline font-extrabold uppercase text-[#faf6f0] tracking-tight drop-shadow-[4px_4px_0px_#760009] leading-none">
              SHEILA ON 7 <br />
              <span className="text-[#e67e22]">KONSER KISAH KLASIK</span>
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-white pt-2 font-medium text-sm md:text-base">
              <span className="flex items-center gap-2 bg-[#261c1a]/85 backdrop-blur-sm px-3.5 py-1.5 border border-[#faf6f0]/30 rounded">
                <Calendar className="w-4 h-4 text-[#e67e22]" />
                20 NOVEMBER 2026
              </span>
              <span className="flex items-center gap-2 bg-[#261c1a]/85 backdrop-blur-sm px-3.5 py-1.5 border border-[#faf6f0]/30 rounded">
                <MapPin className="w-4 h-4 text-[#8fdfff]" />
                STADION UTAMA GBK JAKARTA
              </span>
              <span className="flex items-center gap-2 bg-[#261c1a]/85 backdrop-blur-sm px-3.5 py-1.5 border border-[#faf6f0]/30 rounded">
                <Users className="w-4 h-4 text-[#ffaaa1]" />
                50.000+ SHEILAGANK
              </span>
            </div>

            {/* CTA Cluster */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#tiket"
                className="tactile-btn bg-[#0e7490] hover:bg-[#006781] text-[#faf6f0] px-7 py-3.5 rounded font-bold text-sm md:text-base uppercase tracking-wider flex items-center gap-3"
              >
                <Ticket className="w-5 h-5" />
                <span>AMBIL TIKET ANDA</span>
              </a>
              <a
                href="#lineup"
                className="tactile-btn bg-surface text-primary border-2 border-primary px-6 py-3.5 rounded font-bold text-sm md:text-base uppercase tracking-wider flex items-center gap-2"
              >
                <PlayCircle className="w-5 h-5" />
                <span>LIHAT SUSUNAN ACARA</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};