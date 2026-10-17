'use client';

import React, { useState } from 'react';
import { X, Trophy, Sparkles, Star, ThumbsUp, Check, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TryOnResult } from '@/types';

interface LookBattleModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableLooks: TryOnResult[];
  onSetWinner?: (look: TryOnResult) => void;
}

export function LookBattleModal({
  isOpen,
  onClose,
  availableLooks,
  onSetWinner,
}: LookBattleModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    availableLooks.slice(0, 4).map((l) => l.id)
  );
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [battleOccasion, setBattleOccasion] = useState<string>('Pernikahan (Kondangan) 2026');

  if (!isOpen) return null;

  const activeLooks = availableLooks.filter((l) => selectedIds.includes(l.id));

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const handlePickWinner = (look: TryOnResult) => {
    setWinnerId(look.id);
    onSetWinner?.(look);

    // Fire festive celebration confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D97706', '#C084FC', '#FB7185', '#FDE047'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#FBF9F5] border border-[#E8E2D8] rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl my-auto space-y-6 animate-scale-up">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 shadow-inner">
              <Trophy className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-2xl font-bold text-[#1C1917]">
                  Look Battle — Duel Gaya AI
                </h3>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-purple-100 text-purple-800 rounded-full">
                  Komparasi 2–4 Look
                </span>
              </div>
              <p className="text-xs text-[#736E65]">
                Bandingkan hasil try-on secara langsung dan tentukan pemenang outfit terbaik untuk momen Anda.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#736E65] hover:text-[#1C1917] hover:bg-[#F3EFE8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Occasion Scenario Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#E8E2D8]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Kategori Momen Duel:</span>
            <select
              value={battleOccasion}
              onChange={(e) => setBattleOccasion(e.target.value)}
              className="bg-[#F3EFE8] border border-[#E8E2D8] rounded-lg px-2.5 py-1 text-xs font-medium text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="Pernikahan (Kondangan) 2026">Pernikahan (Kondangan) 2026</option>
              <option value="Silaturahmi Lebaran Idul Fitri">Silaturahmi Lebaran Idul Fitri</option>
              <option value="Wisuda & Sidang Kelulusan">Wisuda & Sidang Kelulusan</option>
              <option value="Executive Boardroom Meeting">Executive Boardroom Meeting</option>
              <option value="First Impression Interview">First Impression Interview</option>
              <option value="Santai Coffee Walk Kemang">Santai Coffee Walk Kemang</option>
            </select>
          </div>

          <div className="text-xs text-[#736E65]">
            Membandingkan <strong className="text-[#1C1917]">{activeLooks.length}</strong> outfit
          </div>
        </div>

        {/* Battle Cards Grid */}
        {activeLooks.length === 0 ? (
          <div className="text-center py-12 text-[#736E65] space-y-2">
            <p className="font-semibold text-base">Belum ada hasil try-on yang tersimpan</p>
            <p className="text-xs">
              Silakan coba pakaian di Virtual Fitting Room terlebih dahulu untuk memulai Look Battle!
            </p>
          </div>
        ) : (
          <div
            className={`grid gap-4 ${
              activeLooks.length === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : activeLooks.length === 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : 'grid-cols-2 sm:grid-cols-4'
            }`}
          >
            {activeLooks.map((look, idx) => {
              const isWinner = winnerId === look.id;
              return (
                <div
                  key={look.id}
                  className={`group relative rounded-2xl overflow-hidden bg-white border-2 transition-all duration-200 flex flex-col ${
                    isWinner
                      ? 'border-amber-400 ring-4 ring-amber-100 shadow-xl'
                      : 'border-[#E8E2D8] hover:border-[#D5CCC0] shadow-sm'
                  }`}
                >
                  {/* Winner Crown Ribbon */}
                  {isWinner && (
                    <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-center gap-1.5 py-1 px-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs shadow-md animate-bounce">
                      <Trophy className="w-3.5 h-3.5 text-yellow-200 fill-yellow-200" />
                      <span>THE WINNER OUTFIT</span>
                    </div>
                  )}

                  {/* Look Image */}
                  <div className="relative aspect-[3/4] w-full bg-stone-900 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={look.resultImageUrl}
                      alt={look.garmentName}
                      className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                    />

                    {/* Method Tag */}
                    <div className="absolute bottom-2 left-2">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-black/60 text-white backdrop-blur-sm">
                        Look #{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-[#1C1917] line-clamp-1">
                        {look.garmentName}
                      </h4>
                      <p className="text-[11px] font-mono text-amber-800 font-semibold mt-0.5">
                        Rp {look.garmentPrice.toLocaleString('id-ID')}
                      </p>
                    </div>

                    {/* Action Button: Vote Winner */}
                    <button
                      onClick={() => handlePickWinner(look)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        isWinner
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-[#F3EFE8] text-[#1C1917] hover:bg-amber-100 hover:text-amber-900'
                      }`}
                    >
                      {isWinner ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Pemenang Terpilih</span>
                        </>
                      ) : (
                        <>
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Pilih Sebagai Pemenang</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E8E2D8] text-xs">
          <span className="text-[#736E65]">
            *Semua hasil try-on mempertahankan rona kulit dan pose asli Anda.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1C1917] text-white font-semibold hover:bg-[#292524] transition-colors"
          >
            Tutup Duel
          </button>
        </div>

      </div>
    </div>
  );
}
