'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Sparkles, 
  Heart, 
  Download, 
  Swords, 
  Trash2, 
  ArrowRight, 
  Filter, 
  Sliders,
  FolderHeart,
  Share2
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StyleDnaModal } from '@/components/StyleDnaModal';
import { ApiSettingsDrawer } from '@/components/ApiSettingsDrawer';
import { LookBattleModal } from '@/components/LookBattleModal';
import { ExportLookCard } from '@/components/ExportLookCard';
import { getTryOnResults, toggleFavoriteResult, deleteTryOnResult, getStyleDNA } from '@/lib/storage';
import { TryOnResult, IndonesianOccasion } from '@/types';

export default function LookbookPage() {
  const [results, setResults] = useState<TryOnResult[]>([]);
  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [styleDna, setStyleDna] = useState(getStyleDNA());

  const [lookBattleOpen, setLookBattleOpen] = useState(false);
  const [selectedExportResult, setSelectedExportResult] = useState<TryOnResult | null>(null);
  const [styleDnaOpen, setStyleDnaOpen] = useState(false);
  const [apiSettingsOpen, setApiSettingsOpen] = useState(false);

  useEffect(() => {
    setResults(getTryOnResults());
    setStyleDna(getStyleDNA());
  }, []);

  const handleToggleFav = (id: string) => {
    toggleFavoriteResult(id);
    setResults(getTryOnResults());
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus look ini dari koleksi Lookbook?')) {
      deleteTryOnResult(id);
      setResults(getTryOnResults());
    }
  };

  // Filter by folder
  const filteredResults = results.filter((r) => {
    if (activeFolder === 'favorites') return r.isFavorite;
    if (activeFolder === 'kondangan') return r.occasionTag === 'kondangan' || r.garmentName.toLowerCase().includes('batik') || r.garmentName.toLowerCase().includes('kebaya');
    if (activeFolder === 'kerja') return r.occasionTag === 'kerja' || r.garmentName.toLowerCase().includes('blazer') || r.garmentName.toLowerCase().includes('linen');
    return true;
  });

  const folders = [
    { key: 'all', label: 'Semua Look Tersimpan', count: results.length },
    { key: 'favorites', label: 'Favorit Saya', count: results.filter((r) => r.isFavorite).length },
    { key: 'kondangan', label: 'Kondangan & Wastra', count: results.filter((r) => r.occasionTag === 'kondangan' || r.garmentName.toLowerCase().includes('batik')).length },
    { key: 'kerja', label: 'Karier & Kantor', count: results.filter((r) => r.occasionTag === 'kerja' || r.garmentName.toLowerCase().includes('blazer')).length },
  ];

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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100/70 text-purple-900 border border-purple-200">
              <FolderHeart className="w-3.5 h-3.5" />
              <span>Studio Archive</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
              My Lookbook
            </h1>
            <p className="text-xs sm:text-sm text-[#736E65] max-w-xl">
              Arsip inspirasi busana hasil simulasi AI Anda. Atur koleksi berdasarkan momen acara, unduh kartu mode, atau duelkan di Look Battle.
            </p>
          </div>

          {results.length >= 2 && (
            <button
              onClick={() => setLookBattleOpen(true)}
              className="px-5 py-3 rounded-2xl bg-amber-500 text-white font-semibold text-xs hover:bg-amber-600 transition-all flex items-center gap-2 shadow-md shrink-0"
            >
              <Swords className="w-4 h-4" />
              <span>Mulai Look Battle (Duel Gaya)</span>
            </button>
          )}
        </div>

        {/* Style DNA Quick Info Banner */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E8E2D8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8C8275]">
                Style DNA Aktif
              </span>
              <h4 className="font-editorial text-base font-bold text-[#1C1917]">
                {styleDna.name} • {styleDna.colorSeason.replace('_', ' ').toUpperCase()}
              </h4>
              <p className="text-xs text-[#736E65]">
                Kulit {styleDna.skinTone.replace('_', ' ')} • Siluet {styleDna.bodySilhouette.replace('_', ' ')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setStyleDnaOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#FBF9F5] border border-[#E8E2D8] text-xs font-semibold text-[#1C1917] hover:bg-[#F3EFE8] transition-colors shrink-0"
          >
            Edit Profil Style DNA
          </button>
        </div>

        {/* Collection Folders Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {folders.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFolder(f.key)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeFolder === f.key
                  ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-sm'
                  : 'bg-white text-[#615B52] border-[#E8E2D8] hover:border-[#1C1917]'
              }`}
            >
              <span>{f.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  activeFolder === f.key ? 'bg-white/20 text-white' : 'bg-[#F3EFE8] text-[#736E65]'
                }`}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Look Grid */}
        {filteredResults.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E8E2D8] space-y-4">
            <Bookmark className="w-10 h-10 text-[#8C8275] mx-auto opacity-50" />
            <div className="space-y-1">
              <h3 className="font-editorial text-xl font-bold text-[#1C1917]">
                Belum Ada Look Tersimpan di Koleksi Ini
              </h3>
              <p className="text-xs text-[#736E65] max-w-sm mx-auto">
                Kunjungi Virtual Fitting Room dan coba pakaian untuk mulai membangun portofolio gaya Anda.
              </p>
            </div>
            <a
              href="/fitting-room"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#1C1917] text-white text-xs font-semibold hover:bg-[#292524] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Buka Fitting Room Sekarang</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredResults.map((look) => (
              <div
                key={look.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E8E2D8] hover:border-[#1C1917] hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Look Image */}
                <div className="relative aspect-[3/4] w-full bg-stone-900 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={look.resultImageUrl}
                    alt={look.garmentName}
                    className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-300"
                  />

                  {/* Top tags */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
                      {new Date(look.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>

                  {/* Favorite button top right */}
                  <button
                    onClick={() => handleToggleFav(look.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        look.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'
                      }`}
                    />
                  </button>
                </div>

                {/* Metadata & Actions */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-editorial text-sm font-bold text-[#1C1917] line-clamp-1 group-hover:text-[#D97706] transition-colors">
                      {look.garmentName}
                    </h4>
                    <p className="text-[11px] font-mono text-amber-800 font-bold mt-0.5">
                      Rp {look.garmentPrice.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E8E2D8]/60 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setSelectedExportResult(look)}
                      className="text-[#736E65] hover:text-[#1C1917] flex items-center gap-1 text-[11px] font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh Kartu</span>
                    </button>

                    <button
                      onClick={() => handleDelete(look.id)}
                      className="text-[#8C8275] hover:text-rose-600 transition-colors p-1"
                      title="Hapus dari Lookbook"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      <Footer />

      {/* Global Modals */}
      <LookBattleModal
        isOpen={lookBattleOpen}
        onClose={() => setLookBattleOpen(false)}
        availableLooks={results}
      />

      {selectedExportResult && (
        <ExportLookCard
          isOpen={Boolean(selectedExportResult)}
          onClose={() => setSelectedExportResult(null)}
          result={selectedExportResult}
        />
      )}

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
