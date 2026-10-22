import React, { useState, useEffect } from "react";
import { ArrowDown, Sparkles } from "lucide-react";

export const Countdown: React.FC = () => {
  // Target date: Nov 20, 2026
  const targetTime = new Date("2026-11-20T19:00:00.000Z").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, mins, secs });
      } else {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <section className="py-14 px-6 bg-surface-container-low border-b-2 border-on-surface relative" id="jadwal">
      <div className="max-w-5xl mx-auto text-center space-y-7">
        {/* Header with Meadow Ornaments */}
        <div className="flex items-center justify-center gap-3">
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
          <h2 className="text-2xl sm:text-4xl font-headline font-bold text-primary uppercase tracking-tight">
            HITUNG MUNDUR MENUJU HARI KONSER
          </h2>
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
        </div>

        <p className="text-sm md:text-base text-on-surface-variant max-w-xl mx-auto">
          Gerbang Stadion Utama Gelora Bung Karno akan dibuka serentak. Pastikan tiket Anda telah terkonfirmasi sebelum waktu panggung dimulai!
        </p>

        {/* Analog Scoreboard Countdown Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {/* DAYS */}
          <div className="bg-[#261c1a] border-4 border-on-surface rounded-lg p-5 shadow-hard-red flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-headline font-black text-[#e67e22] tracking-widest">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold text-[#faf6f0] uppercase tracking-widest mt-1">
              HARI / DAYS
            </span>
          </div>

          {/* HOURS */}
          <div className="bg-[#261c1a] border-4 border-on-surface rounded-lg p-5 shadow-hard-red flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-headline font-black text-[#e67e22] tracking-widest">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold text-[#faf6f0] uppercase tracking-widest mt-1">
              JAM / HOURS
            </span>
          </div>

          {/* MINUTES */}
          <div className="bg-[#261c1a] border-4 border-on-surface rounded-lg p-5 shadow-hard-red flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-headline font-black text-[#e67e22] tracking-widest">
              {String(timeLeft.mins).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold text-[#faf6f0] uppercase tracking-widest mt-1">
              MENIT / MINS
            </span>
          </div>

          {/* SECONDS */}
          <div className="bg-[#261c1a] border-4 border-on-surface rounded-lg p-5 shadow-hard-red flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-headline font-black text-[#e67e22] tracking-widest">
              {String(timeLeft.secs).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold text-[#faf6f0] uppercase tracking-widest mt-1">
              DETIK / SECS
            </span>
          </div>
        </div>

        {/* Prominent Primary Countdown CTA */}
        <div className="pt-2">
          <a
            href="#tiket"
            className="tactile-btn inline-flex items-center gap-3 bg-[#0e7490] hover:bg-[#006781] text-[#faf6f0] font-headline font-bold text-lg uppercase px-8 py-4 rounded-lg border-2 border-on-surface shadow-hard-lg"
          >
            <span>BELI TIKET SEKARANG</span>
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};