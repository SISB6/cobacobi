'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Columns, Split, Image as ImageIcon, Sparkles, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Foto Asli Anda',
  afterLabel = 'Hasil Virtual Try-On PAKAI',
  aspectRatio = 'aspect-[3/4]',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side' | 'toggle'>('slider');
  const [activeToggle, setActiveToggle] = useState<'before' | 'after'>('after');
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = rect.width;
      const newPos = Math.max(0, Math.min(100, (x / width) * 100));
      setSliderPosition(newPos);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  return (
    <div className="w-full space-y-3">
      {/* Top View Mode Controls */}
      <div className="flex items-center justify-between text-xs text-[#736E65] px-1">
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E8E2D8] shadow-sm">
          <button
            onClick={() => setViewMode('slider')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-colors ${
              viewMode === 'slider'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#736E65] hover:text-[#1C1917]'
            }`}
            title="Split Slider"
          >
            <Split className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Slider Split</span>
          </button>
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-colors ${
              viewMode === 'side-by-side'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#736E65] hover:text-[#1C1917]'
            }`}
            title="Side by Side"
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Berdampingan</span>
          </button>
          <button
            onClick={() => setViewMode('toggle')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-colors ${
              viewMode === 'toggle'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#736E65] hover:text-[#1C1917]'
            }`}
            title="Bandingkan Bergantian"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bergantian</span>
          </button>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E8E2D8] shadow-sm">
          <button
            onClick={() => setZoomLevel((z) => Math.min(2, z + 0.25))}
            className="p-1 hover:text-[#1C1917] rounded"
            title="Perbesar"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <span className="px-1 font-mono text-[11px]">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
            className="p-1 hover:text-[#1C1917] rounded"
            title="Perkecil"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          {zoomLevel > 1 && (
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 hover:text-amber-700 rounded text-amber-600"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Main Visual Frame */}
      {viewMode === 'slider' && (
        <div
          ref={containerRef}
          className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden select-none bg-[#1C1917] border border-[#E8E2D8] shadow-md group`}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* After image (full background) */}
          <div
            className="absolute inset-0 w-full h-full transition-transform duration-100 ease-out"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={afterImage}
              alt={afterLabel}
              className="w-full h-full object-cover object-top pointer-events-none"
            />
          </div>

          {/* Before image (clipped overlay) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-transform duration-100 ease-out"
            style={{
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              transform: `scale(${zoomLevel})`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={beforeImage}
              alt={beforeLabel}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Vertical Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Circular Handle */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#1C1917] shadow-xl border-2 border-[#1C1917] flex items-center justify-center font-bold text-xs select-none pointer-events-auto cursor-ew-resize hover:scale-105 active:scale-95 transition-transform">
              <Split className="w-4 h-4 text-[#1C1917]" />
            </div>
          </div>

          {/* Badges on left & right */}
          <div className="absolute top-3 left-3 z-20 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-black/60 text-white backdrop-blur-md border border-white/20">
              {beforeLabel}
            </span>
          </div>

          <div className="absolute top-3 right-3 z-20 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-purple-900/80 text-purple-100 backdrop-blur-md border border-purple-400/40 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <span>{afterLabel}</span>
            </span>
          </div>

          {/* Hint Overlay */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-medium bg-black/50 text-white/90 backdrop-blur-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            Geser ke kiri / kanan untuk membandingkan
          </div>
        </div>
      )}

      {/* Side-by-side mode */}
      {viewMode === 'side-by-side' && (
        <div className="grid grid-cols-2 gap-3">
          <div className={`relative ${aspectRatio} rounded-2xl overflow-hidden bg-stone-900 border border-[#E8E2D8] shadow-sm`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={beforeImage}
              alt={beforeLabel}
              className="w-full h-full object-cover object-top transition-transform duration-150"
              style={{ transform: `scale(${zoomLevel})` }}
            />
            <div className="absolute top-2 left-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/70 text-white">
                {beforeLabel}
              </span>
            </div>
          </div>

          <div className={`relative ${aspectRatio} rounded-2xl overflow-hidden bg-stone-900 border border-purple-300 shadow-sm`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={afterImage}
              alt={afterLabel}
              className="w-full h-full object-cover object-top transition-transform duration-150"
              style={{ transform: `scale(${zoomLevel})` }}
            />
            <div className="absolute top-2 right-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-900/80 text-purple-100 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>{afterLabel}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Toggle View Mode */}
      {viewMode === 'toggle' && (
        <div className="space-y-2">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setActiveToggle('before')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                activeToggle === 'before'
                  ? 'bg-[#1C1917] text-white border-[#1C1917]'
                  : 'bg-white text-[#736E65] border-[#E8E2D8]'
              }`}
            >
              {beforeLabel}
            </button>
            <button
              onClick={() => setActiveToggle('after')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                activeToggle === 'after'
                  ? 'bg-purple-800 text-white border-purple-800 shadow-sm'
                  : 'bg-white text-[#736E65] border-[#E8E2D8]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>{afterLabel}</span>
            </button>
          </div>

          <div className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden bg-stone-900 border border-[#E8E2D8] shadow-md`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeToggle === 'before' ? beforeImage : afterImage}
              alt={activeToggle === 'before' ? beforeLabel : afterLabel}
              className="w-full h-full object-cover object-top transition-all duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
