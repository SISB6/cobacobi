'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CalendarDays, 
  Layers, 
  Shuffle, 
  ShieldCheck, 
  Heart, 
  Sliders, 
  Zap,
  CheckCircle2,
  Cpu,
  ChevronRight
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StyleDnaModal } from '@/components/StyleDnaModal';
import { ApiSettingsDrawer } from '@/components/ApiSettingsDrawer';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { getGarments, getUserPhotos } from '@/lib/storage';
import { Garment, UserPhoto } from '@/types';
import { OCCASIONS_LIST } from '@/data/mockOccasions';
import { INITIAL_ARTICLES } from '@/data/mockArticles';

export default function HomePage() {
  const [styleDnaOpen, setStyleDnaOpen] = useState(false);
  const [apiSettingsOpen, setApiSettingsOpen] = useState(false);
  const [garments, setGarments] = useState<Garment[]>([]);
  const [demoModel, setDemoModel] = useState<UserPhoto | null>(null);
  const [featuredGarment, setFeaturedGarment] = useState<Garment | null>(null);

  useEffect(() => {
    const allG = getGarments();
    const photos = getUserPhotos();
    setGarments(allG);
    if (photos.length > 0) setDemoModel(photos[0]);
    if (allG.length > 0) setFeaturedGarment(allG[0]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Header
        onOpenStyleDna={() => setStyleDnaOpen(true)}
        onOpenApiSettings={() => setApiSettingsOpen(true)}
      />

      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#E8E2D8]/80">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Editorial Headline */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#E8E2D8] shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[#1C1917]">Studio Virtual Try-On Nusantara</span>
                  <span className="text-[#8C8275]">•</span>
                  <span className="text-[#D97706] font-bold">FASHN VTON v1.5</span>
                </div>

                {/* Title */}
                <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1917] leading-[1.12]">
                  Pakaian Impian,<br />
                  <span className="italic font-normal text-stone-700">Pas di Badan</span> Dalam Satu Klik.
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-[#615B52] max-w-xl leading-relaxed">
                  Unggah satu foto Anda, jelajahi kemegahan Batik Tulis, Tenun Sumba, Kebaya modern, hingga busana modestwear, dan saksikan AI merender busana tersebut di tubuh Anda dengan rona kulit dan pose alami yang terjaga.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="/fitting-room"
                    className="px-7 py-3.5 rounded-2xl bg-[#1C1917] text-white font-semibold text-sm hover:bg-[#292524] shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300 group-hover:rotate-12 transition-transform" />
                    <span>Mulai Virtual Fitting Room</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="/occasions"
                    className="px-6 py-3.5 rounded-2xl bg-white border border-[#E8E2D8] text-[#1C1917] font-semibold text-sm hover:bg-[#F3EFE8] transition-all flex items-center gap-2"
                  >
                    <CalendarDays className="w-4 h-4 text-[#D97706]" />
                    <span>Dress for the Occasion</span>
                  </a>
                </div>

                {/* Trust Metrics */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E8E2D8]/80 text-left">
                  <div>
                    <div className="font-editorial text-2xl font-bold text-[#1C1917]">100%</div>
                    <div className="text-xs text-[#736E65]">Preservasi Wajah & Pose</div>
                  </div>
                  <div>
                    <div className="font-editorial text-2xl font-bold text-[#1C1917]">10+</div>
                    <div className="text-xs text-[#736E65]">Momen Khas Indonesia</div>
                  </div>
                  <div>
                    <div className="font-editorial text-2xl font-bold text-[#1C1917]">Privat</div>
                    <div className="text-xs text-[#736E65]">Hapus Foto Kapan Saja</div>
                  </div>
                </div>

              </div>

              {/* Right Column: Live Interactive Demo Hero */}
              <div className="lg:col-span-5">
                <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E8E2D8] shadow-xl relative">
                  
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-xs font-mono text-[#736E65] ml-2">
                        PAKAI Studio v1.5 Demo
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                      Interaktif: Geser Slider
                    </span>
                  </div>

                  {/* Interactive Before/After Visual */}
                  <div className="rounded-2xl overflow-hidden">
                    <BeforeAfterSlider
                      beforeImage="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                      afterImage="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80"
                      beforeLabel="Foto Asli Siti (Bandung)"
                      afterLabel="Hasil Coba: Blazer Batik Parang Indigo"
                      aspectRatio="aspect-[3/4]"
                    />
                  </div>

                  {/* Bottom quick details */}
                  <div className="mt-4 pt-3 border-t border-[#E8E2D8] flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-xs text-[#1C1917]">
                        Blazer Batik Parang Indigo Modern
                      </h4>
                      <p className="text-[11px] text-[#736E65]">
                        NARA Heritage Studio • Katun Primissima
                      </p>
                    </div>
                    <a
                      href="/fitting-room"
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#1C1917] text-white hover:bg-[#292524] transition-colors"
                    >
                      Coba di Badan Anda
                    </a>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SIGNATURE FEATURE 1: DRESS FOR THE OCCASION */}
        <section className="py-16 md:py-24 border-b border-[#E8E2D8]/80 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                  Signature Feature
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C1917]">
                  Dress for the Occasion
                </h2>
                <p className="text-sm text-[#736E65] max-w-xl">
                  Rekomendasi busana cerdas yang disesuaikan dengan adab budaya, tingkat formalitas, dan kenyamanan iklim tropis Indonesia.
                </p>
              </div>

              <a
                href="/occasions"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1917] hover:text-[#D97706] transition-colors group"
              >
                <span>Lihat Seluruh 10 Momen</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Occasion Cards Carousel/Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {OCCASIONS_LIST.slice(0, 5).map((occ) => (
                <a
                  key={occ.key}
                  href={`/occasions?occ=${occ.key}`}
                  className="group p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D8] hover:border-[#1C1917] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-full inline-block">
                      {occ.badge}
                    </span>
                    <h3 className="font-editorial text-lg font-bold text-[#1C1917] group-hover:text-[#D97706] transition-colors">
                      {occ.name}
                    </h3>
                    <p className="text-xs text-[#736E65] line-clamp-2">
                      {occ.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E8E2D8]/60 flex items-center justify-between text-xs font-semibold text-[#1C1917]">
                    <span>Pilih Busana</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>

          </div>
        </section>

        {/* CURATED GARMENT CATALOG SHOWCASE */}
        <section className="py-16 md:py-24 border-b border-[#E8E2D8]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                  Katalog Terpilih
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C1917]">
                  Wastra & Busana Kontemporer
                </h2>
                <p className="text-sm text-[#736E65] max-w-xl">
                  Klik item apa saja untuk langsung mencobanya pada foto Anda di Virtual Fitting Room.
                </p>
              </div>

              <a
                href="/fitting-room"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1917] hover:text-[#D97706] transition-colors group"
              >
                <span>Buka Seluruh Katalog Fitting Room</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Garments Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {garments.slice(0, 8).map((garment) => (
                <div
                  key={garment.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E8E2D8] hover:border-[#1C1917] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] w-full bg-stone-900 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={garment.imageUrl}
                      alt={garment.name}
                      className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-300"
                    />

                    {/* Category pill */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
                        {garment.category}
                      </span>
                    </div>

                    {/* Try-on Quick Overlay Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <a
                        href={`/fitting-room?try=${garment.id}`}
                        className="px-4 py-2.5 rounded-xl bg-white text-[#1C1917] font-semibold text-xs shadow-lg hover:bg-[#F3EFE8] flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Coba Sekarang</span>
                      </a>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[#8C8275] tracking-wider">
                        {garment.brand}
                      </p>
                      <h4 className="font-editorial text-sm font-bold text-[#1C1917] line-clamp-1 group-hover:text-[#D97706] transition-colors">
                        {garment.name}
                      </h4>
                      <p className="text-[11px] text-[#736E65] line-clamp-1 mt-0.5">
                        {garment.fabric}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E8E2D8]/60 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-amber-800">
                        Rp {garment.price.toLocaleString('id-ID')}
                      </span>
                      <a
                        href={`/one-piece-many-ways?anchor=${garment.id}`}
                        className="text-[10px] font-semibold text-purple-700 hover:underline"
                        title="Padu padan gaya"
                      >
                        Styling Ideas &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* CORE FEATURES PILLARS */}
        <section className="py-16 md:py-24 bg-white border-b border-[#E8E2D8]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                Studio Intelligence
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C1917]">
                Mengapa Memilih PAKAI Fitting Room?
              </h2>
              <p className="text-sm text-[#736E65]">
                Didesain dengan memadukan keanggunan majalah mode premium dan presisi pipeline generatif kecerdasan buatan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="p-6 rounded-3xl bg-[#FBF9F5] border border-[#E8E2D8] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-xl font-bold text-[#1C1917]">
                  FASHN VTON v1.5 Integration
                </h3>
                <p className="text-xs sm:text-sm text-[#615B52] leading-relaxed">
                  Kami mengintegrasikan model difusi mutakhir yang mempertahankan kontur tubuh, rona kulit sawo matang, serta jatuhnya lipatan kain tenun dan batik dengan photorealism tinggi.
                </p>
                <div className="text-xs font-semibold text-[#D97706]">
                  Dukungan API Cloud & Local GPU &rarr;
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#FBF9F5] border border-[#E8E2D8] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-xl font-bold text-[#1C1917]">
                  One Piece, Many Ways
                </h3>
                <p className="text-xs sm:text-sm text-[#615B52] leading-relaxed">
                  Satu pakaian wastra bisa dipakai ke 4 acara berbeda: dari ruang rapat kantor 9-to-5, nongkrong kafe akhir pekan, hingga malam resepsi kondangan megah.
                </p>
                <a href="/one-piece-many-ways" className="text-xs font-semibold text-purple-700 hover:underline">
                  Jelajahi Transformasi Gaya &rarr;
                </a>
              </div>

              <div className="p-6 rounded-3xl bg-[#FBF9F5] border border-[#E8E2D8] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-700">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-xl font-bold text-[#1C1917]">
                  Privasi & Etika Data Pribadi
                </h3>
                <p className="text-xs sm:text-sm text-[#615B52] leading-relaxed">
                  Foto pribadi Anda tidak pernah digunakan untuk melatih model publik. Kendali penuh ada di tangan Anda dengan tombol sekali klik untuk menghapus seluruh jejak berkas.
                </p>
                <div className="text-xs font-semibold text-rose-700">
                  Persetujuan Eksplisit & Keamanan &rarr;
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* FASHION JOURNAL HIGHLIGHT */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                  Fashion Journal
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C1917]">
                  Editorial & Panduan Gaya
                </h2>
                <p className="text-sm text-[#736E65] max-w-xl">
                  Wawasan mendalam tentang filosofi wastra, teori warna kulit Nusantara, dan kiat berpesta anti-gerah.
                </p>
              </div>

              <a
                href="/journal"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1917] hover:text-[#D97706] transition-colors group"
              >
                <span>Baca Seluruh Artikel</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INITIAL_ARTICLES.map((article) => (
                <a
                  key={article.id}
                  href={`/journal/${article.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E8E2D8] hover:border-[#1C1917] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] w-full overflow-hidden bg-stone-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full inline-block">
                        {article.category}
                      </span>
                      <h3 className="font-editorial text-lg font-bold text-[#1C1917] group-hover:text-[#D97706] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-[#736E65] line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-[#E8E2D8]/40 flex items-center justify-between text-xs text-[#8C8275]">
                    <span>{article.author.name}</span>
                    <span>{article.readTime}</span>
                  </div>
                </a>
              ))}
            </div>

          </div>
        </section>

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
