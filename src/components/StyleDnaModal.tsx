'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Palette, Ruler, UserCheck, Shield } from 'lucide-react';
import { getStyleDNA, saveStyleDNA } from '@/lib/storage';
import { StyleDNAProfile, StyleVibe } from '@/types';

interface StyleDnaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (profile: StyleDNAProfile) => void;
}

export function StyleDnaModal({ isOpen, onClose, onSaved }: StyleDnaModalProps) {
  const [profile, setProfile] = useState<StyleDNAProfile>(getStyleDNA());
  const [activeTab, setActiveTab] = useState<'color' | 'fit' | 'vibe'>('color');

  useEffect(() => {
    if (isOpen) {
      setProfile(getStyleDNA());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const colorPalettes = {
    warm_autumn: {
      name: 'Warm Autumn (Tanah Tropis Hangat)',
      desc: 'Sangat serasi untuk kulit Sawo Matang & Kuning Langsat hangat.',
      colors: ['#b45309', '#7c2d12', '#d97706', '#1e293b', '#fdfbf7'],
    },
    cool_summer: {
      name: 'Cool Summer (Embun Sejuk)',
      desc: 'Palet lembut pastel, sage green & dusty lilac yang menyejukkan.',
      colors: ['#84a98c', '#d8b4f8', '#94a3b8', '#64748b', '#f8fafc'],
    },
    deep_winter: {
      name: 'Deep Winter (Kontras Megah)',
      desc: 'Warna indigo pekat, charcoal, dan ruby merah yang karismatik.',
      colors: ['#0f172a', '#1e1b4b', '#881337', '#064e3b', '#ffffff'],
    },
    bright_spring: {
      name: 'Bright Spring (Cahaya Pagi)',
      desc: 'Rona cerah segar karang coral, peach, dan emas ceria.',
      colors: ['#fb7185', '#f59e0b', '#10b981', '#fef3c7', '#ffffff'],
    },
  };

  const handleSave = () => {
    saveStyleDNA(profile);
    onSaved?.(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-[#FBF9F5] border border-[#E8E2D8] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#1C1917]">
                My Style DNA
              </h3>
              <p className="text-xs text-[#736E65]">
                Profil analisis warna personal, siluet tubuh & preferensi modestwear
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

        {/* Tab switch */}
        <div className="flex rounded-xl bg-white p-1 border border-[#E8E2D8]">
          <button
            onClick={() => setActiveTab('color')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'color' ? 'bg-[#1C1917] text-white shadow-xs' : 'text-[#736E65]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Color Season</span>
          </button>
          <button
            onClick={() => setActiveTab('fit')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'fit' ? 'bg-[#1C1917] text-white shadow-xs' : 'text-[#736E65]'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Siluet & Hijab</span>
          </button>
          <button
            onClick={() => setActiveTab('vibe')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'vibe' ? 'bg-[#1C1917] text-white shadow-xs' : 'text-[#736E65]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Karakter Gaya</span>
          </button>
        </div>

        {/* Tab 1: Color Season */}
        {activeTab === 'color' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#1C1917] block mb-1">
                Rona Kulit Anda (Skin Undertone)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'sawo_matang', label: 'Sawo Matang', color: '#8d5524' },
                  { key: 'kuning_langsat', label: 'Kuning Langsat', color: '#c68642' },
                  { key: 'putih_gading', label: 'Putih Gading', color: '#e0ac69' },
                  { key: 'cerah', label: 'Cerah Dingin', color: '#f1c27d' },
                ].map((tone) => (
                  <button
                    key={tone.key}
                    onClick={() => setProfile({ ...profile, skinTone: tone.key as any })}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      profile.skinTone === tone.key
                        ? 'border-[#1C1917] bg-white ring-2 ring-[#1C1917] shadow-xs'
                        : 'border-[#E8E2D8] bg-white hover:bg-[#F3EFE8]'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full mx-auto mb-1 border border-black/10"
                      style={{ backgroundColor: tone.color }}
                    />
                    <span className="text-[11px] font-medium text-[#1C1917] block">
                      {tone.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1C1917] block mb-2">
                Color Season Pribadi
              </label>
              <div className="space-y-2.5">
                {(Object.keys(colorPalettes) as (keyof typeof colorPalettes)[]).map((seasonKey) => {
                  const s = colorPalettes[seasonKey];
                  const isSelected = profile.colorSeason === seasonKey;
                  return (
                    <div
                      key={seasonKey}
                      onClick={() => setProfile({ ...profile, colorSeason: seasonKey, preferredPalette: s.colors })}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/50 ring-2 ring-purple-200'
                          : 'border-[#E8E2D8] bg-white hover:bg-[#FDFBF7]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-[#1C1917]">{s.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-purple-700" />}
                      </div>
                      <p className="text-[11px] text-[#736E65] mb-2">{s.desc}</p>
                      <div className="flex items-center gap-1.5">
                        {s.colors.map((c, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-lg border border-black/10 shadow-xs"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Fit & Modestwear */}
        {activeTab === 'fit' && (
          <div className="space-y-4">
            {/* Hijab toggle */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] flex items-center justify-between">
              <div>
                <strong className="block text-xs font-bold text-[#1C1917]">
                  Preferensi Hijab & Modestwear
                </strong>
                <span className="text-[11px] text-[#736E65]">
                  Prioritaskan busana berkerah tinggi, lengan panjang & rok tertutup
                </span>
              </div>
              <button
                onClick={() => setProfile({ ...profile, isHijab: !profile.isHijab })}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  profile.isHijab ? 'bg-purple-600' : 'bg-[#D5CCC0]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    profile.isHijab ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Silhouette */}
            <div>
              <label className="text-xs font-semibold text-[#1C1917] block mb-1">
                Siluet Busana Favorit
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { key: 'relaxed_oversized', title: 'Relaxed & Oversized', desc: 'Nyaman, jatuh bebas, modern kasual' },
                  { key: 'tailored_slim', title: 'Tailored & Sharp', desc: 'Struktur tegas, proporsi pas badan' },
                  { key: 'modest_flowy', title: 'Modest & Flowy', desc: 'Siluet A-line anggun, tidak ketat' },
                  { key: 'structured', title: 'Architectural / Edgy', desc: 'Potongan asimetris, tegas kontemporer' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setProfile({ ...profile, bodySilhouette: item.key as any })}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      profile.bodySilhouette === item.key
                        ? 'border-[#1C1917] bg-white ring-2 ring-[#1C1917]'
                        : 'border-[#E8E2D8] bg-white hover:bg-[#F3EFE8]'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#1C1917] block mb-0.5">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-[#736E65] block leading-tight">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Height */}
            <div>
              <label className="text-xs font-semibold text-[#1C1917] block mb-1">
                Estimasi Tinggi Badan: <span className="text-purple-700 font-bold">{profile.heightCm} cm</span>
              </label>
              <input
                type="range"
                min="145"
                max="195"
                value={profile.heightCm}
                onChange={(e) => setProfile({ ...profile, heightCm: Number(e.target.value) })}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#736E65] mt-1 font-mono">
                <span>145 cm</span>
                <span>170 cm</span>
                <span>195 cm</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Style Vibe */}
        {activeTab === 'vibe' && (
          <div className="space-y-3">
            <label className="text-xs font-semibold text-[#1C1917] block">
              Pilih Karakter Gaya Utama (Vibe)
            </label>
            {[
              { key: 'wastra_modern', title: 'Wastra Modern (Batik & Tenun Kontemporer)', desc: 'Menghargai warisan budaya Nusantara dengan sentuhan siluet urban masa kini.' },
              { key: 'minimalist', title: 'Clean Minimalist Chic', desc: 'Serat alami linen murni, warna monokromatik netral, dan potongan bersih.' },
              { key: 'feminine', title: 'Feminine & Romantic Pastel', desc: 'Organza bordir, sentuhan floral lembut, warna lilac, rose, dan sutra halus.' },
              { key: 'classic', title: 'Timeless Classic Elegance', desc: 'Jas bespoke, kebaya encim peranakan anggun, dan songket lilit mewah.' },
              { key: 'edgy', title: 'Modern Edgy Statement', desc: 'Rompi tenun asimetris, perpaduan kontras tinggi, dan keberanian bereksperimen.' },
            ].map((vibe) => (
              <div
                key={vibe.key}
                onClick={() => setProfile({ ...profile, favoriteVibe: vibe.key as StyleVibe })}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                  profile.favoriteVibe === vibe.key
                    ? 'border-[#1C1917] bg-white ring-2 ring-[#1C1917]'
                    : 'border-[#E8E2D8] bg-white hover:bg-[#FDFBF7]'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-[#1C1917] mb-0.5">{vibe.title}</h4>
                  <p className="text-[11px] text-[#736E65] leading-relaxed">{vibe.desc}</p>
                </div>
                {profile.favoriteVibe === vibe.key && (
                  <Check className="w-4 h-4 text-[#1C1917] shrink-0 mt-0.5" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E8E2D8]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#736E65] hover:bg-[#F3EFE8] rounded-xl transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#1C1917] text-white hover:bg-[#292524] shadow-md transition-all flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Simpan Profil Style DNA</span>
          </button>
        </div>

      </div>
    </div>
  );
}
