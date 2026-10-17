'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  CalendarDays, 
  Sparkles, 
  Sun, 
  Snowflake, 
  HeartHandshake, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Filter, 
  Sliders, 
  MapPin, 
  DollarSign, 
  BookOpen,
  Info
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StyleDnaModal } from '@/components/StyleDnaModal';
import { ApiSettingsDrawer } from '@/components/ApiSettingsDrawer';
import { OCCASIONS_LIST, OCCASION_RECOMMENDATIONS } from '@/data/mockOccasions';
import { getGarments, getOccasionRecommendations } from '@/lib/storage';
import { Garment, IndonesianOccasion, OccasionRecommendation, FormalityLevel, VenueType, StyleVibe } from '@/types';

function OccasionsContent() {
  const searchParams = useSearchParams();
  const initialOcc = (searchParams.get('occ') as IndonesianOccasion) || 'kondangan';

  // State
  const [selectedOccasion, setSelectedOccasion] = useState<IndonesianOccasion>(initialOcc);
  const [formalityFilter, setFormalityFilter] = useState<string>('all');
  const [venueFilter, setVenueFilter] = useState<string>('all');
  const [vibeFilter, setVibeFilter] = useState<string>('all');
  const [modestOnly, setModestOnly] = useState<boolean>(false);
  const [maxBudget, setMaxBudget] = useState<number>(2000000);

  const [garments, setGarments] = useState<Garment[]>([]);
  const [recommendations, setRecommendations] = useState<OccasionRecommendation[]>([]);

  const [styleDnaOpen, setStyleDnaOpen] = useState(false);
  const [apiSettingsOpen, setApiSettingsOpen] = useState(false);

  useEffect(() => {
    setGarments(getGarments());
    setRecommendations(getOccasionRecommendations());
  }, []);

  const activeOccasionMeta = OCCASIONS_LIST.find((o) => o.key === selectedOccasion) || OCCASIONS_LIST[0];

  // Filter recommendations
  const filteredRecs = recommendations.filter((rec) => {
    if (rec.occasion !== selectedOccasion) return false;
    if (formalityFilter !== 'all' && rec.formality !== formalityFilter) return false;
    if (venueFilter !== 'all' && rec.venue !== venueFilter) return false;
    if (vibeFilter !== 'all' && rec.styleVibe !== vibeFilter) return false;
    if (modestOnly && !rec.isHijabFriendly) return false;
    if (rec.estimatedBudget > maxBudget) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Header
        onOpenStyleDna={() => setStyleDnaOpen(true)}
        onOpenApiSettings={() => setApiSettingsOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Page Top Heading */}
        <div className="border-b border-[#E8E2D8] pb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/70 text-amber-900 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Signature Feature</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            Dress for the Occasion
          </h1>
          <p className="text-xs sm:text-sm text-[#736E65] max-w-2xl leading-relaxed">
            Kurasi busana komprehensif untuk 10 momen penting masyarakat Indonesia. Mempertimbangkan tata krama adat, tingkat formalitas acara, dan kenyamanan sirkulasi udara di iklim tropis.
          </p>
        </div>

        {/* 10 Occasions Horizontal Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#736E65] block">
            Pilih Momen Acara:
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {OCCASIONS_LIST.map((occ) => {
              const isSelected = selectedOccasion === occ.key;
              return (
                <button
                  key={occ.key}
                  onClick={() => setSelectedOccasion(occ.key)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-md scale-102'
                      : 'bg-white text-[#615B52] border-[#E8E2D8] hover:border-[#1C1917]'
                  }`}
                >
                  <span>{occ.name}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Occasion Cultural Context & Weather Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Cultural Etiquette Card */}
          <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D97706]">
              <BookOpen className="w-4 h-4" />
              <span>Etika Berbusana & Kearifan Budaya</span>
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#1C1917]">
              {activeOccasionMeta.name} — {activeOccasionMeta.tagline}
            </h3>
            <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
              {activeOccasionMeta.culturalEtiquette}
            </p>
            <div className="pt-2 text-[11px] text-[#736E65]">
              *Didasarkan pada panduan dress code adat Nusantara kontemporer.
            </div>
          </div>

          {/* Climate & Weather Advice Card */}
          <div className="md:col-span-5 bg-gradient-to-br from-amber-50/70 to-orange-50/40 p-6 rounded-3xl border border-amber-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
              <Sun className="w-4 h-4 text-amber-600" />
              <span>Kenyamanan Iklim Tropis</span>
            </div>
            <h4 className="font-editorial text-lg font-bold text-[#1C1917]">
              Karakter Suhu & Sirkulasi
            </h4>
            <p className="text-xs sm:text-sm text-[#78350F] leading-relaxed">
              {activeOccasionMeta.weatherTips}
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white border border-amber-200 text-amber-900">
                Venue Default: {activeOccasionMeta.defaultVenue.replace('_', ' ')}
              </span>
            </div>
          </div>

        </div>

        {/* Multi-Parameter Filters Toolbar */}
        <div className="bg-white p-5 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8E2D8]/60 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C1917]">
              <Filter className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Sesuaikan Preferensi Pilihan Anda</span>
            </div>
            <span className="text-xs text-[#736E65]">
              Ditemukan <strong className="text-[#1C1917]">{filteredRecs.length}</strong> paduan busana
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            
            {/* Formality */}
            <div>
              <label className="font-semibold text-[#1C1917] block mb-1">
                Tingkat Formalitas:
              </label>
              <select
                value={formalityFilter}
                onChange={(e) => setFormalityFilter(e.target.value)}
                className="w-full bg-[#FBF9F5] border border-[#E8E2D8] rounded-xl px-3 py-2 text-xs text-[#1C1917] focus:outline-none"
              >
                <option value="all">Semua Formalitas</option>
                <option value="casual">Casual / Santai</option>
                <option value="smart_casual">Smart Casual</option>
                <option value="semi_formal">Semi-Formal</option>
                <option value="formal">Sangat Formal</option>
              </select>
            </div>

            {/* Venue */}
            <div>
              <label className="font-semibold text-[#1C1917] block mb-1">
                Lokasi / Venue:
              </label>
              <select
                value={venueFilter}
                onChange={(e) => setVenueFilter(e.target.value)}
                className="w-full bg-[#FBF9F5] border border-[#E8E2D8] rounded-xl px-3 py-2 text-xs text-[#1C1917] focus:outline-none"
              >
                <option value="all">Semua Lokasi</option>
                <option value="indoor_ac">Indoor (Ber-AC Dingin)</option>
                <option value="outdoor_tropis">Outdoor (Tropis Terbuka)</option>
                <option value="semi_outdoor">Semi-Outdoor / Pendopo</option>
              </select>
            </div>

            {/* Vibe */}
            <div>
              <label className="font-semibold text-[#1C1917] block mb-1">
                Gaya / Style Vibe:
              </label>
              <select
                value={vibeFilter}
                onChange={(e) => setVibeFilter(e.target.value)}
                className="w-full bg-[#FBF9F5] border border-[#E8E2D8] rounded-xl px-3 py-2 text-xs text-[#1C1917] focus:outline-none"
              >
                <option value="all">Semua Vibe</option>
                <option value="wastra_modern">Wastra Modern</option>
                <option value="minimalist">Minimalist</option>
                <option value="feminine">Feminine Pastel</option>
                <option value="classic">Classic Elegance</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="font-semibold text-[#1C1917] block mb-1">
                Maks. Budget: <span className="font-mono text-amber-800">Rp {maxBudget.toLocaleString('id-ID')}</span>
              </label>
              <input
                type="range"
                min="500000"
                max="3000000"
                step="100000"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-[#D97706] cursor-pointer mt-1"
              />
            </div>

            {/* Modest / Hijab */}
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={modestOnly}
                  onChange={(e) => setModestOnly(e.target.checked)}
                  className="rounded border-[#D5CCC0] text-purple-600 focus:ring-purple-500"
                />
                <span className="font-semibold text-[#1C1917]">Hanya Hijab-Friendly</span>
              </label>
            </div>

          </div>
        </div>

        {/* Recommended Outfit Combinations Feed */}
        <div className="space-y-8">
          {filteredRecs.map((rec, index) => {
            const matchedGarments = garments.filter((g) => rec.garmentIds.includes(g.id));

            return (
              <div
                key={rec.id}
                className="bg-white rounded-3xl border border-[#E8E2D8] p-6 sm:p-8 shadow-sm space-y-6"
              >
                {/* Outfit Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E2D8]/70 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800">
                        Opsi Gaya #{index + 1}
                      </span>
                      <span className="text-xs font-semibold text-[#8C8275]">
                        {rec.formality.replace('_', ' ')} • {rec.styleVibe.replace('_', ' ')}
                      </span>
                    </div>
                    <h3 className="font-editorial text-2xl font-bold text-[#1C1917]">
                      {rec.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#736E65]">
                      {rec.subtitle}
                    </p>
                  </div>

                  <div className="text-right sm:border-l sm:border-[#E8E2D8] sm:pl-6">
                    <span className="text-[10px] uppercase font-semibold text-[#736E65] block">
                      Estimasi Total Outfit:
                    </span>
                    <span className="font-mono text-lg font-bold text-amber-800">
                      Rp {rec.estimatedBudget.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Cultural & Weather Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#44403C]">
                  <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D8] space-y-1.5">
                    <strong className="block text-[#1C1917] font-semibold flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Alasan Kultural & Filosofi Paduan:</span>
                    </strong>
                    <p className="leading-relaxed text-[#615B52]">{rec.culturalContext}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-1.5">
                    <strong className="block text-amber-900 font-semibold flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-amber-600" />
                      <span>Kenyamanan Sirkulasi & Venue:</span>
                    </strong>
                    <p className="leading-relaxed text-amber-950/80">{rec.weatherAdvice}</p>
                  </div>
                </div>

                {/* Garments in this outfit */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                    Item Busana Dalam Kombinasi Ini:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {matchedGarments.map((garment) => (
                      <div
                        key={garment.id}
                        className="p-3 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D8] flex items-center justify-between gap-3 group hover:border-[#1C1917] transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-20 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={garment.imageUrl}
                              alt={garment.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#8C8275]">
                              {garment.category}
                            </span>
                            <h5 className="font-semibold text-xs text-[#1C1917] line-clamp-1">
                              {garment.name}
                            </h5>
                            <p className="text-[11px] font-mono font-bold text-amber-800">
                              Rp {garment.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>

                        <a
                          href={`/fitting-room?try=${garment.id}`}
                          className="px-3 py-2 rounded-xl bg-[#1C1917] text-white text-[11px] font-semibold hover:bg-[#292524] transition-colors shrink-0 flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-yellow-300" />
                          <span>Coba AI</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Styling Pro-Tips List */}
                <div className="pt-3 border-t border-[#E8E2D8]/60 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#736E65]">
                    Tips Aksesoris & Penataan Stylist:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#615B52]">
                    {rec.stylingTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-[#FBF9F5] p-2.5 rounded-xl border border-[#E8E2D8]/60">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}

          {filteredRecs.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E2D8] space-y-3">
              <Info className="w-8 h-8 text-[#8C8275] mx-auto" />
              <h3 className="font-editorial text-lg font-bold text-[#1C1917]">
                Tidak Ada Rekomendasi yang Memenuhi Filter Ini
              </h3>
              <p className="text-xs text-[#736E65] max-w-sm mx-auto">
                Silakan naikkan batas budget atau pilih formalitas "Semua" untuk melihat ragam opsi busana lainnya.
              </p>
            </div>
          )}
        </div>

      </main>

      <Footer />

      {/* Global Modals */}
      <StyleDnaModal
        isOpen={styleDnaOpen}
        onClose={() => setStyleDnaOpen(false)}
      />

      <ApiSettingsDrawer
        isOpen={apiSettingsOpen}
        onClose={() => setApiSettingsOpen(false)}
      />
    </div>
  );
}

export default function OccasionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FBF9F5] text-stone-700">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-stone-800 border-t-transparent rounded-full animate-spin" />
            <span className="font-editorial text-sm">Menyiapkan Kurasi Momen...</span>
          </div>
        </div>
      }
    >
      <OccasionsContent />
    </Suspense>
  );
}
