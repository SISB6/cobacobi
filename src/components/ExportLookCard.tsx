'use client';

import React, { useRef } from 'react';
import { Download, Sparkles, X, Share2, Tag, Calendar } from 'lucide-react';
import { TryOnResult } from '@/types';

interface ExportLookCardProps {
  isOpen: boolean;
  onClose: () => void;
  result: TryOnResult;
}

export function ExportLookCard({ isOpen, onClose, result }: ExportLookCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate high-res image via canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Warm Studio White
    ctx.fillStyle = '#FBF9F5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border inner frame
    ctx.strokeStyle = '#E8E2D8';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Title & Brand
    ctx.fillStyle = '#1C1917';
    ctx.font = 'bold 54px Georgia, serif';
    ctx.fillText('PAKAI', 80, 120);

    ctx.fillStyle = '#736E65';
    ctx.font = '600 20px -apple-system, sans-serif';
    ctx.fillText('VIRTUAL FASHION STUDIO INDONESIA', 260, 115);

    // Draw Result Image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = result.resultImageUrl;
    img.onload = () => {
      const imgX = 80;
      const imgY = 160;
      const imgW = canvas.width - 160;
      const imgH = 1080;
      ctx.drawImage(img, imgX, imgY, imgW, imgH);

      // Card Details below image
      ctx.fillStyle = '#1C1917';
      ctx.font = 'bold 36px Georgia, serif';
      ctx.fillText(result.garmentName, 80, 1310);

      ctx.fillStyle = '#D97706';
      ctx.font = 'bold 32px monospace';
      ctx.fillText(`Rp ${result.garmentPrice.toLocaleString('id-ID')}`, 80, 1365);

      ctx.fillStyle = '#57534E';
      ctx.font = '22px -apple-system, sans-serif';
      ctx.fillText(`Momen: ${result.occasionTag || 'Gaya Favorit'} • Model AI: FASHN VTON 1.5`, 80, 1420);

      // Watermark
      ctx.fillStyle = '#A8A29E';
      ctx.font = '18px -apple-system, sans-serif';
      ctx.fillText('Simulasi busana virtual oleh PAKAI AI Fitting Room (https://pakai.ai)', 80, 1500);

      // Download trigger
      const link = document.createElement('a');
      link.download = `PAKAI-Look-${result.garmentName.replace(/\s+/g, '-')}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FBF9F5] border border-[#E8E2D8] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="font-editorial text-lg font-bold text-[#1C1917]">
              Kartu Mode Virtual
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#736E65] hover:text-[#1C1917] hover:bg-[#F3EFE8]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card Preview */}
        <div
          ref={cardRef}
          className="bg-white border border-[#E8E2D8] rounded-2xl p-4 shadow-sm space-y-3"
        >
          <div className="flex items-baseline justify-between border-b border-[#E8E2D8]/60 pb-2">
            <span className="font-editorial font-extrabold text-xl tracking-tight text-[#1C1917]">
              PAKAI
            </span>
            <span className="text-[10px] font-mono text-[#736E65]">
              STUDIO ARCHIVE • {new Date(result.createdAt).toLocaleDateString('id-ID')}
            </span>
          </div>

          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-stone-900 shadow-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.resultImageUrl}
              alt={result.garmentName}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-2 right-2">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-white shadow-sm flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>AI TRY-ON</span>
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="font-editorial text-base font-bold text-[#1C1917] line-clamp-1">
              {result.garmentName}
            </h4>
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-amber-700">
                Rp {result.garmentPrice.toLocaleString('id-ID')}
              </span>
              <span className="text-[11px] text-[#736E65]">
                {result.method === 'fashn_v1_5' ? 'FASHN v1.5 API' : 'Studio Engine'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold border border-[#E8E2D8] bg-white text-[#736E65] hover:bg-[#F3EFE8] transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#1C1917] text-white hover:bg-[#292524] shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Kartu HD</span>
          </button>
        </div>

      </div>
    </div>
  );
}
