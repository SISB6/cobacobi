'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Layers, 
  Sparkles, 
  ArrowRight, 
  Check, 
  HelpCircle, 
  ShoppingBag, 
  Palette,
  Lightbulb,
  ChevronRight
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StyleDnaModal } from '@/components/StyleDnaModal';
import { ApiSettingsDrawer } from '@/components/ApiSettingsDrawer';
import { getGarments } from '@/lib/storage';
import { generateVariationsForGarment } from '@/data/mockOnePiece';
import { Garment, OnePieceStyleVariation } from '@/types';

function OnePieceContent() {
  const searchParams = useSearchParams();
  const anchorParam = searchParams.get('anchor');

  const [garments, setGarments] = useState<Garment[]>([]);
  const [selectedAnchor, setSelectedAnchor] = useState<Garment | null>(null);
  const [variations, setVariations] = useState<OnePieceStyleVariation[]>([]);

  const [styleDnaOpen, setStyleDnaOpen] = useState(false);
  const [apiSettingsOpen, setApiSettingsOpen] = useState(false);

  useEffect(() => {
    const all = getGarments();
    setGarments(all);

    let anchor = all[0];
    if (anchorParam) {
      const match = all.find((g) => g.id === anchorParam);
      if (match) anchor = match;
    }
    setSelectedAnchor(anchor);
    if (anchor) {
      setVariations(generateVariationsForGarment(anchor));
    }
  }, [anchorParam]);

  const handleSelectAnchor = (garment: Garment) => {
    setSelectedAnchor(garment);
    setVariations(generateVariationsForGarment(garment));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Header
        onOpenStyleDna={() => setStyleDnaOpen(true)}
        onOpenApiSettings={() => setApiSettingsOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Page Top Heading */}
        <div className="border-b border-[#E8E2D8] pb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100/70 text-purple-900 border border-purple-200">
            <Layers className="w-3.5 h-3.5" />
            <span>Versatile Fashion Matrix</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            One Piece, Many Ways
          </h1>
          <p className="text-xs sm:text-sm text-[#736E65] max-w-2xl leading-relaxed">
            Satu helai pakaian wastra berkualitas dapat bertransformasi menjadi 4 karakter gaya yang sangat berbeda. Pilih pakaian jangkar (*anchor piece*) Anda dan temukan inspirasi padu padannya.
          </p>
        </div>

        {/* Anchor Piece Shelf */}
        <div className="bg-white p-5 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
              Pilih Pakaian Jangkar (Anchor Garment):
            </label>
            <span className="text-xs text-[#736E65]">
              Klik untuk mengubah pakaian utama
            </span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {garments.map((garment) => {
              const isSelected = selectedAnchor?.id === garment.id;
              return (
                <button
                  key={garment.id}
                  onClick={() => handleSelectAnchor(garment)}
                  className={`p-2.5 rounded-2xl border-2 transition-all flex items-center gap-3 text-left shrink-0 ${
                    isSelected
                      ? 'border-[#1C1917] bg-[#FBF9F5] shadow-md ring-2 ring-stone-200'
                      : 'border-[#E8E2D8] bg-white hover:border-[#8C8275]'
                  }`}
                >
                  <div className="w-12 h-14 rounded-xl overflow-hidden bg-stone-900 shrink-0">
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
                    <h4 className="font-editorial text-xs font-bold text-[#1C1917] max-w-[140px] truncate">
                      {garment.name}
                    </h4>
                    <span className="font-mono text-[11px] font-bold text-amber-800">
                      Rp {garment.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Anchor Details Banner */}
        {selectedAnchor && (
          <div className="bg-[#1C1917] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-6">
            <div className="w-28 h-36 rounded-2xl overflow-hidden shrink-0 border border-white/20 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedAnchor.imageUrl}
                alt={selectedAnchor.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2 flex-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-stone-950 inline-block">
                Pakaian Jangkar Utama
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                {selectedAnchor.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                {selectedAnchor.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-stone-400">
                <span>Material: <strong>{selectedAnchor.fabric}</strong></span>
                <span>•</span>
                <span>Brand: <strong>{selectedAnchor.brand}</strong></span>
              </div>
            </div>

            <div className="shrink-0">
              <a
                href={`/fitting-room?try=${selectedAnchor.id}`}
                className="px-6 py-3 rounded-2xl bg-white text-[#1C1917] font-semibold text-xs hover:bg-[#F3EFE8] transition-colors flex items-center gap-1.5 shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Coba di Fitting Room</span>
              </a>
            </div>
          </div>
        )}

        {/* 3 - 5 Styling Transformations Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-2xl font-bold text-[#1C1917]">
              4 Transformasi Gaya Padu Padan
            </h3>
            <span className="text-xs text-[#736E65]">
              Dirancang oleh Fashion Stylist PAKAI
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {variations.map((v, idx) => (
              <div
                key={v.id}
                className="bg-white rounded-3xl border border-[#E8E2D8] p-6 shadow-sm space-y-5 flex flex-col justify-between hover:border-[#1C1917] transition-all"
              >
                <div className="space-y-4">
                  
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 border-b border-[#E8E2D8]/60 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="font-editorial text-lg font-bold text-[#1C1917]">
                          {v.modeTitle}
                        </h4>
                      </div>
                      <p className="text-xs font-semibold text-[#D97706] mt-0.5">
                        {v.vibe}
                      </p>
                    </div>

                    {/* Color Swatch */}
                    <div className="flex items-center gap-1 bg-[#FBF9F5] p-1.5 rounded-xl border border-[#E8E2D8]">
                      {v.colorPalette.map((c, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-md border border-black/10"
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Situation & Description */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-[#8C8275] uppercase tracking-wider block">
                      Cocok Untuk: {v.situation}
                    </span>
                    <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                      {v.description}
                    </p>
                  </div>

                  {/* Paired Garments Breakdown */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1C1917] block">
                      Paduan Item Pelengkap:
                    </span>
                    <div className="space-y-1.5">
                      {v.pairedGarments.map((item, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D8]/70 flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="font-bold text-[#8C8275] mr-2">
                              {item.role}:
                            </span>
                            <strong className="text-[#1C1917]">{item.name}</strong>
                            <p className="text-[10px] text-[#736E65]">{item.description}</p>
                          </div>
                          {item.garmentId && (
                            <a
                              href={`/fitting-room?try=${item.garmentId}`}
                              className="text-[10px] font-bold text-purple-700 hover:underline shrink-0"
                            >
                              Coba &rarr;
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stylist Pro-Tip */}
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      <strong>Stylist Tip:</strong> {v.proTip}
                    </span>
                  </div>

                </div>

                {/* Card CTA */}
                <div className="pt-3 border-t border-[#E8E2D8]/60 flex items-center justify-between">
                  <span className="text-xs text-[#736E65]">
                    Gaya #{idx + 1} dari 4 Opsi
                  </span>
                  <a
                    href={`/fitting-room?try=${selectedAnchor?.id}`}
                    className="px-4 py-2 rounded-xl bg-[#1C1917] text-white text-xs font-semibold hover:bg-[#292524] transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Coba Gaya Ini AI</span>
                  </a>
                </div>

              </div>
            ))}
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

export default function OnePieceManyWaysPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FBF9F5] text-stone-700">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-stone-800 border-t-transparent rounded-full animate-spin" />
            <span className="font-editorial text-sm">Menyiapkan Transformasi Gaya...</span>
          </div>
        </div>
      }
    >
      <OnePieceContent />
    </Suspense>
  );
}
