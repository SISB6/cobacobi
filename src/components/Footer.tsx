'use client';

import React from 'react';
import { ShieldCheck, Heart, Sparkles, ExternalLink, Trash2 } from 'lucide-react';
import { wipeAllPersonalPhotos } from '@/lib/storage';

export function Footer() {
  const handleWipe = () => {
    if (confirm('Konfirmasi: Hapus semua foto pribadi dan riwayat sesi ini secara permanen?')) {
      wipeAllPersonalPhotos();
      window.location.reload();
    }
  };

  return (
    <footer className="bg-[#1C1917] text-[#D5CCC0] pt-16 pb-12 border-t border-[#292524] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#292524]">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-editorial text-3xl font-extrabold tracking-tight text-white">
                PAKAI
              </span>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#A8A29E]">
                Your AI Fitting Room
              </span>
            </div>
            <p className="text-sm text-[#A8A29E] max-w-md leading-relaxed">
              Studio virtual fashion interaktif yang dirancang khusus untuk busana Indonesia. Dari kemegahan Batik Tulis, kelembutan Tenun Ikat Sumba, hingga anggunnya Kebaya dan Modestwear kontemporer.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#292524] text-[#FDE047] border border-[#3E3835]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Powered by FASHN VTON v1.5 Pipeline</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              Studio Fitur
            </h4>
            <ul className="space-y-2 text-sm text-[#A8A29E]">
              <li><a href="/fitting-room" className="hover:text-white transition-colors">Virtual Fitting Room</a></li>
              <li><a href="/occasions" className="hover:text-white transition-colors">Dress for the Occasion</a></li>
              <li><a href="/one-piece-many-ways" className="hover:text-white transition-colors">One Piece, Many Ways</a></li>
              <li><a href="/mix-match" className="hover:text-white transition-colors">Mix & Match Studio</a></li>
              <li><a href="/lookbook" className="hover:text-white transition-colors">My Lookbook & Battle</a></li>
              <li><a href="/journal" className="hover:text-white transition-colors">Fashion Journal</a></li>
            </ul>
          </div>

          {/* Privacy & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              Keamanan & Privasi
            </h4>
            <p className="text-xs text-[#A8A29E] leading-relaxed">
              Foto pribadi Anda diproses secara privat dan tidak digunakan untuk melatih model AI publik tanpa izin eksplisit.
            </p>
            <button
              onClick={handleWipe}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/60 border border-rose-800 rounded-lg hover:bg-rose-900 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Data & Foto Saya</span>
            </button>
            <div>
              <a
                href="/admin"
                className="text-xs text-[#78716C] hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>Studio Backstage CMS</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <div className="text-center md:text-left space-y-1">
            <p>
              &copy; 2026 PAKAI Studio Indonesia. Dibuat dengan penuh dedikasi untuk keindahan wastra Nusantara.
            </p>
            <p className="text-[11px] text-[#A8A29E]">
              <strong>Disclaimer Resmi:</strong> Hasil simulasi Virtual Try-On adalah visualisasi ilustratif berbasis kecerdasan buatan, bukan jaminan presisi ukuran fisik, drape kain di dunia nyata, atau ketersediaan stok ritel.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[#A8A29E]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
