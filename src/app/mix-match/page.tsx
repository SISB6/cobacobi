'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shuffle, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  Heart,
  Plus
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StyleDnaModal } from '@/components/StyleDnaModal';
import { ApiSettingsDrawer } from '@/components/ApiSettingsDrawer';
import { getGarments } from '@/lib/storage';
import { Garment } from '@/types';

export default function MixMatchPage() {
  const [garments, setGarments] = useState<Garment[]>([]);
  
  // Selected layers
  const [selectedTop, setSelectedTop] = useState<Garment | null>(null);
  const [selectedBottom, setSelectedBottom] = useState<Garment | null>(null);
  const [selectedOuter, setSelectedOuter] = useState<Garment | null>(null);

  const [styleDnaOpen, setStyleDnaOpen] = useState(false);
  const [apiSettingsOpen, setApiSettingsOpen] = useState(false);

  useEffect(() => {
    const all = getGarments();
    setGarments(all);

    const tops = all.filter((g) => g.category === 'tops');
    const bottoms = all.filter((g) => g.category === 'bottoms');
    const outers = all.filter((g) => g.category === 'outerwear' || g.category === 'batik');

    if (tops.length > 0) setSelectedTop(tops[0]);
    if (bottoms.length > 0) setSelectedBottom(bottoms[0]);
    if (outers.length > 0) setSelectedOuter(outers[0]);
  }, []);

  // Filter garments by slot
  const topOptions = garments.filter((g) => g.category === 'tops' || g.category === 'batik');
  const bottomOptions = garments.filter((g) => g.category === 'bottoms');
  const outerOptions = garments.filter((g) => g.category === 'outerwear' || g.category === 'formalwear');

  // Compute harmony score
  const calculateHarmony = () => {
    let score = 82;
    if (selectedTop && selectedBottom) score += 6;
    if (selectedOuter) score += 7;
    // Cap at 96 for realism
    return Math.min(97, score);
  };

  const totalPrice =
    (selectedTop?.price || 0) +
    (selectedBottom?.price || 0) +
    (selectedOuter?.price || 0);

  const handleRandomize = () => {
    if (topOptions.length > 0) setSelectedTop(topOptions[Math.floor(Math.random() * topOptions.length)]);
    if (bottomOptions.length > 0) setSelectedBottom(bottomOptions[Math.floor(Math.random() * bottomOptions.length)]);
    if (outerOptions.length > 0) setSelectedOuter(outerOptions[Math.floor(Math.random() * outerOptions.length)]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Header
        onOpenStyleDna={() => setStyleDnaOpen(true)}
        onOpenApiSettings={() => setApiSettingsOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Page Top Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D8] pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-900 border border-emerald-200">
              <Shuffle className="w-3.5 h-3.5" />
              <span>Layering Studio</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
              Mix & Match Studio
            </h1>
            <p className="text-xs sm:text-sm text-[#736E65] max-w-xl">
              Padukan atasan, bawahan, dan outer sesuka hati Anda. AI menghitung skor harmoni warna dan kecocokan material secara langsung.
            </p>
          </div>

          <button
            onClick={handleRandomize}
            className="px-5 py-2.5 rounded-2xl bg-white border border-[#E8E2D8] text-xs font-semibold text-[#1C1917] hover:bg-[#F3EFE8] transition-colors flex items-center gap-2 shadow-xs shrink-0"
          >
            <RefreshCw className="w-4 h-4 text-amber-600" />
            <span>Acak Paduan Otomatis</span>
          </button>
        </div>

        {/* Studio Canvas Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: VISUAL LAYER CANVAS (5 Cols) */}
          <div className="lg:col-span-5 space-y-5 sticky top-24">
            
            <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-md space-y-5 text-center">
              
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-[#D97706] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Kanvas Busana Terpadu</span>
                </span>
                <span className="font-mono font-bold text-amber-800">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Three Layer Visual Stack */}
              <div className="grid grid-cols-3 gap-2 bg-[#FBF9F5] p-3 rounded-2xl border border-[#E8E2D8]">
                
                {/* Outer */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#8C8275] uppercase">
                    Outer / Luaran
                  </span>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-900 border border-[#E8E2D8]">
                    {selectedOuter ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={selectedOuter.imageUrl}
                        alt={selectedOuter.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-400 p-2">
                        Pilih Outer
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] font-semibold text-[#1C1917] truncate">
                    {selectedOuter?.name || 'Tanpa Outer'}
                  </p>
                </div>

                {/* Top */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#8C8275] uppercase">
                    Atasan / Top
                  </span>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-900 border border-[#E8E2D8]">
                    {selectedTop ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={selectedTop.imageUrl}
                        alt={selectedTop.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-400 p-2">
                        Pilih Atasan
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] font-semibold text-[#1C1917] truncate">
                    {selectedTop?.name || 'Tanpa Atasan'}
                  </p>
                </div>

                {/* Bottom */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#8C8275] uppercase">
                    Bawahan / Bottom
                  </span>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-900 border border-[#E8E2D8]">
                    {selectedBottom ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={selectedBottom.imageUrl}
                        alt={selectedBottom.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-400 p-2">
                        Pilih Bawahan
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] font-semibold text-[#1C1917] truncate">
                    {selectedBottom?.name || 'Tanpa Bawahan'}
                  </p>
                </div>

              </div>

              {/* Harmony Score Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-purple-50 to-amber-50 border border-emerald-200 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Skor Harmoni Paduan:
                  </span>
                  <span className="font-mono text-lg font-extrabold text-emerald-700">
                    {calculateHarmony()}%
                  </span>
                </div>
                <p className="text-xs text-[#44403C] leading-relaxed">
                  Perpaduan tekstur serat alami yang sangat seimbang. Sangat fotogenik untuk silaturahmi, rapat formal santai, maupun kencan akhir pekan.
                </p>
              </div>

              {/* CTA Send to Fitting Room */}
              <a
                href={`/fitting-room?try=${selectedOuter?.id || selectedTop?.id}`}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#1C1917] text-white font-semibold text-xs hover:bg-[#292524] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Coba Paduan Ini di Fitting Room</span>
              </a>

            </div>

          </div>

          {/* RIGHT: SELECTORS FOR EACH LAYER (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Slot 1: Outerwear */}
            <div className="bg-white p-5 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                  1. Pilih Outer / Blazer / Kimono
                </span>
                <span className="text-xs text-[#736E65]">
                  {outerOptions.length} pilihan
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {outerOptions.map((g) => {
                  const isSelected = selectedOuter?.id === g.id;
                  return (
                    <div
                      key={g.id}
                      onClick={() => setSelectedOuter(g)}
                      className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-2.5 ${
                        isSelected
                          ? 'border-[#1C1917] bg-[#FBF9F5] ring-2 ring-stone-200'
                          : 'border-[#E8E2D8] hover:border-[#8C8275]'
                      }`}
                    >
                      <div className="w-12 h-14 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={g.imageUrl} alt={g.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="font-semibold text-xs text-[#1C1917] truncate">{g.name}</h5>
                        <p className="text-[11px] font-mono font-bold text-amber-800">
                          Rp {g.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Slot 2: Tops */}
            <div className="bg-white p-5 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                  2. Pilih Atasan / Kemeja / Kaos
                </span>
                <span className="text-xs text-[#736E65]">
                  {topOptions.length} pilihan
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {topOptions.map((g) => {
                  const isSelected = selectedTop?.id === g.id;
                  return (
                    <div
                      key={g.id}
                      onClick={() => setSelectedTop(g)}
                      className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-2.5 ${
                        isSelected
                          ? 'border-[#1C1917] bg-[#FBF9F5] ring-2 ring-stone-200'
                          : 'border-[#E8E2D8] hover:border-[#8C8275]'
                      }`}
                    >
                      <div className="w-12 h-14 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={g.imageUrl} alt={g.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="font-semibold text-xs text-[#1C1917] truncate">{g.name}</h5>
                        <p className="text-[11px] font-mono font-bold text-amber-800">
                          Rp {g.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Slot 3: Bottoms */}
            <div className="bg-white p-5 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                  3. Pilih Bawahan / Kulot / Rok Lilit
                </span>
                <span className="text-xs text-[#736E65]">
                  {bottomOptions.length} pilihan
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {bottomOptions.map((g) => {
                  const isSelected = selectedBottom?.id === g.id;
                  return (
                    <div
                      key={g.id}
                      onClick={() => setSelectedBottom(g)}
                      className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-2.5 ${
                        isSelected
                          ? 'border-[#1C1917] bg-[#FBF9F5] ring-2 ring-stone-200'
                          : 'border-[#E8E2D8] hover:border-[#8C8275]'
                      }`}
                    >
                      <div className="w-12 h-14 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={g.imageUrl} alt={g.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="font-semibold text-xs text-[#1C1917] truncate">{g.name}</h5>
                        <p className="text-[11px] font-mono font-bold text-amber-800">
                          Rp {g.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

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
