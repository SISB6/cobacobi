'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  Layers, 
  CalendarDays, 
  Shuffle, 
  Bookmark, 
  BookOpen, 
  Sliders, 
  ShieldCheck, 
  Menu, 
  X, 
  Cpu, 
  Trash2,
  Settings
} from 'lucide-react';
import { getApiConfig, hasGivenPhotoConsent, wipeAllPersonalPhotos } from '@/lib/storage';

interface HeaderProps {
  onOpenStyleDna?: () => void;
  onOpenApiSettings?: () => void;
}

export function Header({ onOpenStyleDna, onOpenApiSettings }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [apiConfig, setApiConfig] = useState(getApiConfig());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateConfig = () => setApiConfig(getApiConfig());
    window.addEventListener('pakai_data_updated', updateConfig);
    return () => window.removeEventListener('pakai_data_updated', updateConfig);
  }, []);

  const navLinks = [
    { href: '/fitting-room', label: 'Fitting Room', icon: Sparkles, badge: 'AI Live' },
    { href: '/occasions', label: 'Occasion Stylist', icon: CalendarDays, badge: 'Signature' },
    { href: '/one-piece-many-ways', label: '1 Piece Many Ways', icon: Layers },
    { href: '/mix-match', label: 'Mix & Match', icon: Shuffle },
    { href: '/lookbook', label: 'Lookbook', icon: Bookmark },
    { href: '/journal', label: 'Journal', icon: BookOpen },
  ];

  const handleWipeData = () => {
    if (confirm('Hapus seluruh foto pribadi dan hasil try-on dari sesi ini?')) {
      wipeAllPersonalPhotos();
      window.location.reload();
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FBF9F5]/90 backdrop-blur-md shadow-sm border-b border-[#E8E2D8]'
          : 'bg-[#FBF9F5] border-b border-[#E8E2D8]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-baseline gap-2 group">
              <span className="font-editorial text-3xl font-extrabold tracking-tight text-[#1C1917] group-hover:text-[#D97706] transition-colors">
                PAKAI
              </span>
              <span className="text-[11px] uppercase tracking-widest font-semibold text-[#8C8275] hidden sm:inline-block">
                Virtual Fashion Studio
              </span>
            </a>

            {/* AI Engine Status Pill */}
            <button
              onClick={onOpenApiSettings}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                apiConfig.useLiveAi && (apiConfig.fashnApiKey || apiConfig.customGpuUrl)
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
              title="Klik untuk konfigurasi FASHN VTON 1.5 & GPU"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{apiConfig.useLiveAi ? 'FASHN v1.5 API' : 'Studio Demo Mode'}</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#1C1917] bg-[#EFE9DF] font-semibold'
                      : 'text-[#615B52] hover:text-[#1C1917] hover:bg-[#F3EFE8]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D97706]' : 'text-[#8C8275]'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#FDE68A] text-[#92400E] rounded">
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            
            {/* Style DNA Trigger */}
            <button
              onClick={onOpenStyleDna}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-[#E8E2D8] text-[#1C1917] hover:bg-[#F7F4EE] hover:border-[#D5CCC0] shadow-sm transition-all"
            >
              <Sliders className="w-3.5 h-3.5 text-[#A855F7]" />
              <span>Style DNA</span>
            </button>

            {/* Admin CMS backstage */}
            <a
              href="/admin"
              className="hidden sm:flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-medium text-[#736E65] hover:text-[#1C1917] hover:bg-[#F3EFE8] transition-colors"
              title="Studio Admin CMS"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Backstage CMS</span>
            </a>

            {/* Quick Settings Icon */}
            <button
              onClick={onOpenApiSettings}
              className="p-2 rounded-lg text-[#736E65] hover:text-[#1C1917] hover:bg-[#F3EFE8] transition-colors"
              title="Pengaturan AI & GPU"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Privacy Wipe Button */}
            <button
              onClick={handleWipeData}
              className="p-2 rounded-lg text-[#736E65] hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Hapus foto pribadi & reset data sesi"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#1C1917] hover:bg-[#F3EFE8] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF9F5] border-b border-[#E8E2D8] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive ? 'bg-[#EFE9DF] text-[#1C1917] font-semibold' : 'text-[#615B52] hover:bg-[#F3EFE8]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#D97706]" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#FDE68A] text-[#92400E] rounded">
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}

          <div className="pt-4 border-t border-[#E8E2D8] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStyleDna?.();
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#E8E2D8] text-sm font-semibold text-[#1C1917]"
            >
              <Sliders className="w-4 h-4 text-[#A855F7]" />
              <span>My Style DNA (Color & Silhouette)</span>
            </button>
            <a
              href="/admin"
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-[#736E65] hover:bg-[#F3EFE8]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Studio Backstage Admin CMS</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
