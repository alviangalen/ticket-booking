import React from "react";
import { Music2 } from "lucide-react";

export const Lineup: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-surface max-w-7xl mx-auto" id="lineup">
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 bg-surface-container-high px-4 py-1.5 border-2 border-on-surface font-bold text-xs uppercase rounded">
          <Music2 className="w-4 h-4 text-primary" />
          <span>SUSUNAN ARTIS &amp; BINTANG TAMU</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary uppercase tracking-tight">
          PANGGUNG UTAMA KISAH KLASIK
        </h2>
        <p className="text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto">
          Perayaan tiga dekade lagu-lagu persahabatan, cinta, dan nostalgia bersama Sheila on 7 serta penampilan kolaborasi eksklusif.
        </p>
      </div>

      {/* Lineup Billboard Poster Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Main Act Card */}
        <div className="md:col-span-3 tactile-card bg-[#fff8f6] p-7 md:p-9 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-on-surface">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-[#991b1b] text-white px-3 py-1 text-xs font-black uppercase tracking-wider rounded">
              HEADLINER UTAMA (3 JAM SPESIAL SET)
            </span>
            <h3 className="text-3xl md:text-4xl font-headline font-black text-primary uppercase tracking-tight">
              SHEILA ON 7
            </h3>
            <p className="text-sm md:text-base text-on-surface-variant">
              Duta • Eross • Adam • bersama musisi pendukung legendaris dan aransemen orkestra megah.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            <span className="bg-surface-variant px-3 py-1 text-xs font-bold uppercase rounded border border-on-surface">
              Dan...
            </span>
            <span className="bg-surface-variant px-3 py-1 text-xs font-bold uppercase rounded border border-on-surface">
              Sephia
            </span>
            <span className="bg-surface-variant px-3 py-1 text-xs font-bold uppercase rounded border border-on-surface">
              Kisah Klasik
            </span>
            <span className="bg-surface-variant px-3 py-1 text-xs font-bold uppercase rounded border border-on-surface">
              Melompat Lebih Tinggi
            </span>
          </div>
        </div>

        {/* Supporting 1 */}
        <div className="tactile-card bg-surface-container-low p-6 rounded-lg text-center space-y-3">
          <span className="text-xs font-bold text-[#e67e22] uppercase tracking-wider">
            SPECIAL GUEST ACT
          </span>
          <h4 className="font-headline font-bold text-xl text-primary uppercase">
            THE ADAMS
          </h4>
          <p className="text-xs text-on-surface-variant">
            Harmonisasi power-pop Jakarta menyemarakkan pembuka sore.
          </p>
        </div>

        {/* Supporting 2 */}
        <div className="tactile-card bg-surface-container-low p-6 rounded-lg text-center space-y-3">
          <span className="text-xs font-bold text-[#0e7490] uppercase tracking-wider">
            SPECIAL GUEST ACT
          </span>
          <h4 className="font-headline font-bold text-xl text-primary uppercase">
            BARASUARA
          </h4>
          <p className="text-xs text-on-surface-variant">
            Energi ritmis membakar semangat stadion sebelum panggung utama.
          </p>
        </div>

        {/* Supporting 3 */}
        <div className="tactile-card bg-surface-container-low p-6 rounded-lg text-center space-y-3">
          <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
            OPENING ACOUSTIC
          </span>
          <h4 className="font-headline font-bold text-xl text-primary uppercase">
            NADIN AMIZAH
          </h4>
          <p className="text-xs text-on-surface-variant">
            Senandung puitis syahdu menyambut ribuan pasang mata senja GBK.
          </p>
        </div>
      </div>

      {/* Decorative Wavy Sine Divider */}
      <div className="w-full overflow-hidden py-4 text-primary flex justify-center">
        <svg className="w-full max-w-4xl h-5" fill="none" viewBox="0 0 1200 20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 10 Q 75 20, 150 10 T 300 10 T 450 10 T 600 10 T 750 10 T 900 10 T 1050 10 T 1200 10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </svg>
      </div>
    </section>
  );
};