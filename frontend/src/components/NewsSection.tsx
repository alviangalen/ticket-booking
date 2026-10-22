import React from "react";
import { Newspaper, ArrowRight } from "lucide-react";

export const NewsSection: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-surface-container-low" id="berita">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-surface px-4 py-1.5 border-2 border-on-surface font-bold text-xs uppercase rounded">
            <Newspaper className="w-4 h-4 text-[#0e7490]" />
            <span>INFORMASI TERKINI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary uppercase tracking-tight">
            BERITA &amp; KABAR FESTIVAL
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant max-w-xl mx-auto">
            Pantau terus petunjuk keselamatan, peta kantong parkir, serta info eksklusif official merchandise.
          </p>
        </div>

        {/* 3-Card News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* News 1 */}
          <article className="tactile-card bg-[#fff8f6] rounded-lg overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-48 w-full border-b-2 border-on-surface overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpJZpF5eSVRoGJA2kbW_NOtLbbHxCOIYQFZrgBkosXaPe7zTze8r45FP0qPeRnsK1zeyJqm8I14zIiSPb5tFvMzTMTYYN1BEHr36iqmN__zRGeUkLGp0urGNA-5snp5YL7hHbZ--ssbmlrf3wA-g-UdKWn-ckKAY5xXAWirctNWmOyn_vEhoLGD0xGXRS_UXGf5i_TQYRkeuL6xzfrz0sPzvIK8AhHAjpWhjWUHtcfAnAxsjkHLDWELw"
                  alt="Panduan Wristband"
                />
                <span className="absolute top-3 left-3 bg-[#0e7490] text-white px-2.5 py-1 text-[10px] font-bold uppercase rounded border border-on-surface">
                  PANDUAN
                </span>
              </div>
              <div className="p-6 space-y-3">
                <span className="text-xs font-semibold text-on-surface-variant uppercase">
                  14 OKTOBER 2026
                </span>
                <h3 className="font-headline font-bold text-lg text-primary uppercase leading-tight">
                  Jadwal &amp; Lokasi Penukaran Wristband Resmi
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Penukaran e-voucher dapat dilakukan H-3 sebelum konser di Senayan Park dan Plaza Barat GBK untuk menghindari antrean panjang hari H.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <a
                href="#berita"
                className="inline-flex items-center gap-2 font-bold text-xs text-primary uppercase hover:underline decoration-2 decoration-secondary"
              >
                <span>BACA SELENGKAPNYA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>

          {/* News 2 */}
          <article className="tactile-card bg-[#fff8f6] rounded-lg overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-48 w-full border-b-2 border-on-surface overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxRJAUel5PGot4C5iNUvesb570nuSLc2F40sTUk06cOpZ6DKwYsxAvZ8P5bHs28rmXqNk2EzQc49igNFXlnjdTl3lc0GTPhmFOst5Hg0CH286MDQhK7bJgahGHssN5XJ_xcMD60hMmxZ_K7O6m1jRbTqP4jRnNZXNSn0puOTy4VpxVLkwh1HB8j3YsxgjaGl0aFHBHpodx5TpsbrMRjQ46oG4zgtxD2j-n9YnmKnmgYwkl5Qp_s8jPlg"
                  alt="Line up pembuka"
                />
                <span className="absolute top-3 left-3 bg-[#e67e22] text-[#faf6f0] px-2.5 py-1 text-[10px] font-bold uppercase rounded border border-on-surface">
                  LINE UP
                </span>
              </div>
              <div className="p-6 space-y-3">
                <span className="text-xs font-semibold text-on-surface-variant uppercase">
                  08 OKTOBER 2026
                </span>
                <h3 className="font-headline font-bold text-lg text-primary uppercase leading-tight">
                  Special Guest &amp; Line Up Pembuka Diumumkan
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Kolaborasi lintas generasi siap mengguncang Jakarta. Saksikan penampilan orkestra khusus yang mengiringi lagu-lagu legendaris SO7.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <a
                href="#berita"
                className="inline-flex items-center gap-2 font-bold text-xs text-primary uppercase hover:underline decoration-2 decoration-secondary"
              >
                <span>BACA SELENGKAPNYA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>

          {/* News 3 */}
          <article className="tactile-card bg-[#fff8f6] rounded-lg overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-48 w-full border-b-2 border-on-surface overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuqY3uBfRVlGbmWAaWgmsjhRG9Sa1mAe4wXTAkXi4nXYsT4dN-gVEbZXMXD6cTU2bqWd1lsNQlIdLuMcw6cz3U3OaHyNiDHv3qtabdN7SnmZnFXKPGPKjXSDrB-z6DKgJpB9LxgovAF8xSnpu5-HYut9z6uQbXEhJhhd2VotuLFqgGuqpRo4zYiGNYytp6PQpSz86NdFzQlEZFwywEQ4sLXOxbnQC2W3WmRd1uBxbbGNSK88kqVWe8Xg"
                  alt="Akses GBK"
                />
                <span className="absolute top-3 left-3 bg-primary text-white px-2.5 py-1 text-[10px] font-bold uppercase rounded border border-on-surface">
                  LOGISTIK
                </span>
              </div>
              <div className="p-6 space-y-3">
                <span className="text-xs font-semibold text-on-surface-variant uppercase">
                  01 OKTOBER 2026
                </span>
                <h3 className="font-headline font-bold text-lg text-primary uppercase leading-tight">
                  Panduan Akses Transportasi Publik &amp; Gate GBK
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Gunakan MRT Istora Mandiri atau TransJakarta Koridor 1. Simak pintu masuk berdasarkan kategori tiket gelang Anda.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <a
                href="#berita"
                className="inline-flex items-center gap-2 font-bold text-xs text-primary uppercase hover:underline decoration-2 decoration-secondary"
              >
                <span>BACA SELENGKAPNYA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};