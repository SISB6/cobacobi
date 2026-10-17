'use client';

import React from 'react';
import { Shield, Lock, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { setPhotoConsent } from '@/lib/storage';

interface ConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

export function ConsentModal({ isOpen, onAccept, onCancel }: ConsentModalProps) {
  if (!isOpen) return null;

  const handleAgree = () => {
    setPhotoConsent(true);
    onAccept();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FBF9F5] border border-[#E8E2D8] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-editorial text-xl font-bold text-[#1C1917]">
              Persetujuan Privasi & Pemrosesan Foto
            </h3>
            <p className="text-xs text-[#736E65]">
              Komitmen Perlindungan Data Pribadi & Etika AI PAKAI
            </p>
          </div>
        </div>

        {/* Bullet points */}
        <div className="space-y-3 text-xs sm:text-sm text-[#44403C]">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E8E2D8]">
            <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#1C1917] font-semibold">Ruang Simpan Privat Sesi</strong>
              <span>Foto Anda hanya digunakan selama sesi simulasi fitting room dan tidak disebarluaskan ke pihak ketiga mana pun.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E8E2D8]">
            <EyeOff className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#1C1917] font-semibold">Tidak Digunakan untuk Pelatihan AI Publik</strong>
              <span>Foto pribadi Anda tidak pernah digunakan untuk melatih ulang (re-train) model kecerdasan buatan publik tanpa izin tertulis eksplisit.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E8E2D8]">
            <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#1C1917] font-semibold">Kontrol Penghapusan Mandiri</strong>
              <span>Anda dapat menghapus seluruh foto dan riwayat coba busana kapan saja melalui tombol "Hapus Data" di bagian atas halaman.</span>
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Peringatan Simulasi Visual:</strong> Hasil virtual try-on adalah representasi simulasi komputer AI dan tidak menjamin kecocokan ukuran lingkar dada/pinggang fisik, kehangatan bahan, atau perilaku kain di dunia nyata.
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[#736E65] hover:bg-[#F3EFE8] transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleAgree}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#1C1917] text-white hover:bg-[#292524] shadow-md transition-all"
          >
            Saya Setuju & Lanjutkan
          </button>
        </div>

      </div>
    </div>
  );
}
