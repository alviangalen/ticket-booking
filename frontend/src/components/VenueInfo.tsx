import React from "react";
import { Train, Bus, MapPin } from "lucide-react";

export const VenueInfo: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-surface border-t-2 border-on-surface" id="lokasi">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 space-y-6">
          <div className="inline-block bg-[#e67e22] text-[#faf6f0] px-3 py-1 text-xs font-bold uppercase rounded border-2 border-on-surface">
            VENUES &amp; AKOMODASI
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline font-bold text-primary uppercase tracking-tight">
            STADION UTAMA GELORA BUNG KARNO
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant">
            Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270.
          </p>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <Train className="w-5 h-5 text-secondary shrink-0" />
              <span>Stasiun MRT Terdekat: Stasiun Istora Mandiri (300 Meter ke Pintu 7)</span>
            </div>
            <div className="flex items-center gap-3">
              <Bus className="w-5 h-5 text-secondary shrink-0" />
              <span>Halte TransJakarta Terdekat: GBK Senayan (Koridor 1 Blok M - Kota)</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="tactile-card rounded-lg overflow-hidden border-2 border-on-surface h-80 relative">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx_0cWMWsjonl58RbBMFv6bNVgdEuEpRFzXZYgXjiEXjI6qpNherSR7H0z0vqdvSrNAIjGeN9xEFazjFzvRH9ar1_oo00wyhOqXB5r4oerPJnUpSrSShdCJtSP8O8Ksarn2qjedScBno3BH1QlTHbnvl0yBAEh9_J8ysiDGfdPAv4NwkdrU8bZzE16-n_-ab7SQR_vmbwfwnjf09EvWfTrUOIAc_zpvH26pKSqxVOVD2OM4ZU620dN2A"
              alt="Gelora Bung Karno sports complex diagram"
            />
            <div className="absolute bottom-4 right-4 bg-surface/95 border-2 border-on-surface p-3 rounded text-xs font-bold uppercase flex items-center gap-2 shadow-hard-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Pintu Masuk Tiket Festival: Plaza Tenggara</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};