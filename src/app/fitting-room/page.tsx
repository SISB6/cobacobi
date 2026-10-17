'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Sparkles, 
  Upload, 
  Camera, 
  Trash2, 
  Heart, 
  Download, 
  Swords, 
  Sliders, 
  Search, 
  Filter, 
  Check, 
  AlertCircle, 
  RefreshCw,
  Plus,
  Bookmark,
  Layers,
  Cpu
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { ConsentModal } from '@/components/ConsentModal';
import { LookBattleModal } from '@/components/LookBattleModal';
import { ExportLookCard } from '@/components/ExportLookCard';
import { StyleDnaModal } from '@/components/StyleDnaModal';
import { ApiSettingsDrawer } from '@/components/ApiSettingsDrawer';
import { 
  getGarments, 
  getUserPhotos, 
  addUserPhoto, 
  getActivePhotoId, 
  setActivePhotoId, 
  getTryOnResults, 
  saveTryOnResult, 
  toggleFavoriteResult, 
  hasGivenPhotoConsent,
  getApiConfig,
  getStyleDNA
} from '@/lib/storage';
import { runVirtualTryOn } from '@/lib/aiSynthesis';
import { Garment, Category, UserPhoto, TryOnResult, IndonesianOccasion } from '@/types';

function FittingRoomContent() {
  const searchParams = useSearchParams();
  const tryGarmentId = searchParams.get('try');

  // State
  const [garments, setGarments] = useState<Garment[]>([]);
  const [userPhotos, setUserPhotos] = useState<UserPhoto[]>([]);
  const [activePhoto, setActivePhoto] = useState<UserPhoto | null>(null);
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
  const [tryOnHistory, setTryOnHistory] = useState<TryOnResult[]>([]);
  const [activeResult, setActiveResult] = useState<TryOnResult | null>(null);

  // Filters
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [modestOnly, setModestOnly] = useState(false);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStep, setProgressStep] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);

  // Modals
  const [consentOpen, setConsentOpen] = useState(false);
  const [lookBattleOpen, setLookBattleOpen] = useState(false);
  const [exportCardOpen, setExportCardOpen] = useState(false);
  const [styleDnaOpen, setStyleDnaOpen] = useState(false);
  const [apiSettingsOpen, setApiSettingsOpen] = useState(false);

  // Custom garment upload
  const [customGarmentModal, setCustomGarmentModal] = useState(false);
  const [customGarmentName, setCustomGarmentName] = useState('');
  const [customGarmentCategory, setCustomGarmentCategory] = useState<Category>('tops');
  const [customGarmentImage, setCustomGarmentImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const garmentInputRef = useRef<HTMLInputElement>(null);

  // Initialize data
  useEffect(() => {
    const allGarments = getGarments();
    const photos = getUserPhotos();
    const activeId = getActivePhotoId();
    const history = getTryOnResults();

    setGarments(allGarments);
    setUserPhotos(photos);
    setTryOnHistory(history);

    const activeP = photos.find((p) => p.id === activeId) || photos[0];
    setActivePhoto(activeP || null);

    if (tryGarmentId) {
      const g = allGarments.find((item) => item.id === tryGarmentId);
      if (g) setSelectedGarment(g);
    } else if (allGarments.length > 0) {
      setSelectedGarment(allGarments[0]);
    }

    if (history.length > 0) {
      setActiveResult(history[0]);
    }
  }, [tryGarmentId]);

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Format berkas tidak valid. Harap pilih foto JPG, PNG, atau WEBP.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran berkas melebihi 10MB. Harap gunakan foto dengan ukuran lebih kecil.');
      return;
    }

    // Check consent
    if (!hasGivenPhotoConsent()) {
      setConsentOpen(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      const newPhoto = addUserPhoto({
        name: 'Foto Saya',
        url,
      });
      setUserPhotos(getUserPhotos());
      setActivePhoto(newPhoto);
    };
    reader.readAsDataURL(file);
  };

  // Select User Photo
  const handleSelectPhoto = (photo: UserPhoto) => {
    setActivePhotoId(photo.id);
    setActivePhoto(photo);
  };

  // Trigger Virtual Try-On
  const handleRunTryOn = async (garmentToTry = selectedGarment) => {
    if (!activePhoto || !garmentToTry) {
      alert('Harap pilih foto model dan garmen pakaian terlebih dahulu.');
      return;
    }

    setIsProcessing(true);
    setProgressPercent(10);
    setProgressStep('Mempersiapkan citra & inisialisasi AI...');

    try {
      const result = await runVirtualTryOn(activePhoto, garmentToTry, (step, percent) => {
        setProgressStep(step);
        setProgressPercent(percent);
      });

      saveTryOnResult(result);
      setTryOnHistory(getTryOnResults());
      setActiveResult(result);
    } catch (err: any) {
      console.error('Try-on error:', err);
      alert(`Terjadi kendala saat proses try-on: ${err.message}`);
    } finally {
      setIsProcessing(false);
      setProgressPercent(0);
    }
  };

  // Toggle Favorite
  const handleToggleFavorite = (id: string) => {
    toggleFavoriteResult(id);
    setTryOnHistory(getTryOnResults());
    if (activeResult && activeResult.id === id) {
      setActiveResult({ ...activeResult, isFavorite: !activeResult.isFavorite });
    }
  };

  // Custom garment upload handler
  const handleCustomGarmentFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCustomGarmentImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomGarment = () => {
    if (!customGarmentImage || !customGarmentName) {
      alert('Harap isi nama pakaian dan unggah foto pakaian.');
      return;
    }

    const newGarmentItem: Garment = {
      id: `g-custom-${Date.now()}`,
      name: customGarmentName,
      brand: 'Koleksi Pribadi',
      category: customGarmentCategory,
      price: 0,
      imageUrl: customGarmentImage,
      description: 'Pakaian pribadi yang diunggah oleh pengguna.',
      fabric: 'Kustom Serat Pilihan',
      colors: ['#1C1917'],
      occasions: ['casual_weekend'],
      formality: 'smart_casual',
      isModestFriendly: true,
      status: 'published',
      tags: ['Kustom', 'Upload Pribadi'],
      createdAt: new Date().toISOString(),
    };

    setSelectedGarment(newGarmentItem);
    setCustomGarmentModal(false);
    handleRunTryOn(newGarmentItem);
  };

  // Filter garments
  const filteredGarments = garments.filter((g) => {
    if (activeCategory !== 'all' && g.category !== activeCategory) return false;
    if (selectedOccasion !== 'all' && !g.occasions.includes(selectedOccasion as any)) return false;
    if (modestOnly && !g.isModestFriendly) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        g.name.toLowerCase().includes(q) ||
        g.brand.toLowerCase().includes(q) ||
        g.fabric.toLowerCase().includes(q) ||
        g.tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const categories = [
    { key: 'all', label: 'Semua Koleksi' },
    { key: 'tops', label: 'Atasan' },
    { key: 'bottoms', label: 'Bawahan' },
    { key: 'dresses', label: 'Dresses' },
    { key: 'outerwear', label: 'Outerwear' },
    { key: 'batik', label: 'Batik & Wastra' },
    { key: 'formalwear', label: 'Jas & Formal' },
    { key: 'modestwear', label: 'Modestwear' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Header
        onOpenStyleDna={() => setStyleDnaOpen(true)}
        onOpenApiSettings={() => setApiSettingsOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Page Top Heading */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E2D8] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917]">
                Virtual Fitting Room
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#736E65]">
              Studio pasang busana virtual bertenaga FASHN VTON 1.5. Pilih model foto Anda, klik pakaian apa saja, dan amati hasilnya seketika.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {tryOnHistory.length >= 2 && (
              <button
                onClick={() => setLookBattleOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Swords className="w-4 h-4 text-amber-700" />
                <span>Look Battle ({tryOnHistory.length} Look)</span>
              </button>
            )}

            <button
              onClick={() => setCustomGarmentModal(true)}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#E8E2D8] text-xs font-semibold text-[#1C1917] hover:bg-[#F3EFE8] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Upload className="w-3.5 h-3.5 text-purple-700" />
              <span>Unggah Baju Sendiri</span>
            </button>
          </div>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: ACTIVE TRY-ON STAGE (5 Cols) */}
          <div className="lg:col-span-5 space-y-5 sticky top-24">
            
            <div className="bg-white p-5 rounded-3xl border border-[#E8E2D8] shadow-md space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Stage</span>
                </span>
                {activeResult && (
                  <span className="text-[11px] font-mono text-[#736E65]">
                    {activeResult.method === 'fashn_v1_5' ? 'FASHN AI Live' : 'Demo Studio'}
                  </span>
                )}
              </div>

              {/* Main Visual Display */}
              <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-[#E8E2D8]">
                {activePhoto ? (
                  activeResult ? (
                    <BeforeAfterSlider
                      beforeImage={activePhoto.url}
                      afterImage={activeResult.resultImageUrl}
                      beforeLabel={`Foto Asli (${activePhoto.name})`}
                      afterLabel={`Hasil Coba: ${activeResult.garmentName}`}
                      aspectRatio="aspect-[3/4]"
                    />
                  ) : (
                    <div className="relative aspect-[3/4] w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activePhoto.url}
                        alt={activePhoto.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                        <div className="text-white text-xs">
                          <p className="font-semibold">{activePhoto.name}</p>
                          <p className="text-white/70 text-[11px]">
                            Pilih pakaian di katalog sebelah kanan lalu klik "Coba di Badan Saya".
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="aspect-[3/4] w-full flex items-center justify-center p-6 text-center text-[#736E65]">
                    Pilih atau unggah foto untuk memulai.
                  </div>
                )}

                {/* Processing Overlay */}
                {isProcessing && (
                  <div className="absolute inset-0 z-30 bg-black/75 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white space-y-4 animate-fade-in">
                    <div className="relative w-16 h-16">
                      <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-amber-400 animate-spin" />
                      <Sparkles className="w-6 h-6 text-amber-400 absolute inset-0 m-auto" />
                    </div>

                    <div className="space-y-1.5 max-w-xs">
                      <h4 className="font-editorial text-lg font-bold text-white">
                        Memproses Fitting AI...
                      </h4>
                      <p className="text-xs text-stone-300 min-h-[32px] leading-relaxed">
                        {progressStep}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full max-w-xs bg-white/20 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-400 h-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-stone-400">
                      FASHN VTON v1.5 • {progressPercent}%
                    </span>
                  </div>
                )}
              </div>

              {/* Garment Selected Bar & Try-on CTA */}
              {selectedGarment && (
                <div className="bg-[#FBF9F5] p-3.5 rounded-2xl border border-[#E8E2D8] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedGarment.imageUrl}
                        alt={selectedGarment.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-xs text-[#1C1917] truncate">
                        {selectedGarment.name}
                      </h4>
                      <p className="text-[11px] font-mono text-amber-800 font-bold">
                        Rp {selectedGarment.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRunTryOn(selectedGarment)}
                    disabled={isProcessing}
                    className="px-5 py-2.5 rounded-xl bg-[#1C1917] text-white font-semibold text-xs hover:bg-[#292524] transition-all shrink-0 flex items-center gap-1.5 shadow-md active:scale-95 disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Coba di Badan</span>
                  </button>
                </div>
              )}

              {/* Result Actions (if we have a result) */}
              {activeResult && (
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#E8E2D8]/60">
                  <button
                    onClick={() => handleToggleFavorite(activeResult.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1 transition-colors ${
                      activeResult.isFavorite
                        ? 'bg-rose-50 border-rose-300 text-rose-700'
                        : 'bg-white border-[#E8E2D8] text-[#736E65] hover:text-[#1C1917]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${activeResult.isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
                    <span>{activeResult.isFavorite ? 'Favorit' : 'Suka'}</span>
                  </button>

                  <button
                    onClick={() => setExportCardOpen(true)}
                    className="py-2 px-2 rounded-xl text-xs font-semibold bg-white border border-[#E8E2D8] text-[#736E65] hover:text-[#1C1917] flex items-center justify-center gap-1 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh HD</span>
                  </button>

                  <a
                    href={`/one-piece-many-ways?anchor=${activeResult.garmentId}`}
                    className="py-2 px-2 rounded-xl text-xs font-semibold bg-purple-50 border border-purple-200 text-purple-800 hover:bg-purple-100 flex items-center justify-center gap-1 transition-colors text-center"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Gaya Lain</span>
                  </a>
                </div>
              )}

            </div>

            {/* Model Photo Picker Shelf */}
            <div className="bg-white p-4 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1C1917]">
                  Pilih Model Foto Anda
                </span>
                <span className="text-[11px] text-[#736E65]">
                  {userPhotos.length} foto tersedia
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {userPhotos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => handleSelectPhoto(photo)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      activePhoto?.id === photo.id
                        ? 'border-[#1C1917] ring-2 ring-[#1C1917] scale-102 shadow-sm'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="w-full h-full object-cover object-top"
                    />
                    {activePhoto?.id === photo.id && (
                      <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#1C1917] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}

                {/* Upload Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-[#D5CCC0] hover:border-[#1C1917] bg-[#FBF9F5] flex flex-col items-center justify-center text-[#736E65] hover:text-[#1C1917] transition-colors p-1"
                  title="Unggah Foto Pribadi"
                >
                  <Upload className="w-4 h-4 mb-0.5" />
                  <span className="text-[9px] font-bold">Unggah</span>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>

          </div>

          {/* RIGHT COLUMN: INTERACTIVE CLOTHING CATALOG (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Search & Filters Header */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-4">
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari batik parang, tenun sumba, kebaya sage, linen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D8] text-xs sm:text-sm text-[#1C1917] placeholder:text-[#8C8275] focus:outline-none focus:ring-1 focus:ring-[#1C1917]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      activeCategory === cat.key
                        ? 'bg-[#1C1917] text-white shadow-xs'
                        : 'bg-[#F3EFE8] text-[#736E65] hover:text-[#1C1917]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Secondary Occasion & Modest Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E8E2D8]/60 text-xs">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[#736E65]" />
                  <span className="font-semibold text-[#1C1917]">Momen:</span>
                  <select
                    value={selectedOccasion}
                    onChange={(e) => setSelectedOccasion(e.target.value)}
                    className="bg-[#F3EFE8] border border-[#E8E2D8] rounded-lg px-2 py-1 text-xs text-[#1C1917] focus:outline-none"
                  >
                    <option value="all">Semua Momen</option>
                    <option value="kondangan">Kondangan</option>
                    <option value="lebaran">Lebaran</option>
                    <option value="bukber">Bukber</option>
                    <option value="wisuda">Wisuda</option>
                    <option value="lamaran">Lamaran</option>
                    <option value="kerja">Kerja / Rapat</option>
                    <option value="interview">Interview</option>
                    <option value="casual_weekend">Casual Weekend</option>
                  </select>
                </div>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={modestOnly}
                    onChange={(e) => setModestOnly(e.target.checked)}
                    className="rounded border-[#D5CCC0] text-purple-600 focus:ring-purple-500"
                  />
                  <span className="font-medium text-[#1C1917]">Hanya Modest / Hijab Friendly</span>
                </label>
              </div>

            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredGarments.map((garment) => {
                const isSelected = selectedGarment?.id === garment.id;
                return (
                  <div
                    key={garment.id}
                    onClick={() => {
                      setSelectedGarment(garment);
                      handleRunTryOn(garment);
                    }}
                    className={`group bg-white rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#1C1917] shadow-lg ring-2 ring-stone-200'
                        : 'border-[#E8E2D8] hover:border-[#D5CCC0] hover:shadow-sm'
                    }`}
                  >
                    {/* Image frame */}
                    <div className="relative aspect-[3/4] w-full bg-stone-900 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={garment.imageUrl}
                        alt={garment.name}
                        className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-300"
                      />

                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
                          {garment.category}
                        </span>
                      </div>

                      {/* Try on hover prompt */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                        <span className="px-3 py-1.5 rounded-xl bg-white text-[#1C1917] font-semibold text-xs shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Coba Sekarang</span>
                        </span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-[#8C8275] tracking-wider">
                          {garment.brand}
                        </p>
                        <h4 className="font-editorial text-xs sm:text-sm font-bold text-[#1C1917] line-clamp-1 group-hover:text-[#D97706] transition-colors">
                          {garment.name}
                        </h4>
                        <p className="text-[10px] text-[#736E65] line-clamp-1">
                          {garment.fabric}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#E8E2D8]/60 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-amber-800">
                          Rp {garment.price.toLocaleString('id-ID')}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredGarments.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E2D8] space-y-3">
                <AlertCircle className="w-8 h-8 text-[#8C8275] mx-auto" />
                <h4 className="font-editorial text-lg font-bold text-[#1C1917]">
                  Tidak Ada Pakaian yang Cocok
                </h4>
                <p className="text-xs text-[#736E65] max-w-sm mx-auto">
                  Coba sesuaikan kata kunci pencarian atau ubah filter kategori momen.
                </p>
              </div>
            )}

            {/* RECENT TRY-ON RESULTS REEL */}
            {tryOnHistory.length > 0 && (
              <div className="bg-white p-5 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <h3 className="font-editorial text-base font-bold text-[#1C1917]">
                      Riwayat Hasil Try-On Sesi Ini
                    </h3>
                  </div>
                  <span className="text-xs text-[#736E65]">
                    {tryOnHistory.length} hasil tersimpan
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {tryOnHistory.map((res) => (
                    <div
                      key={res.id}
                      onClick={() => setActiveResult(res)}
                      className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        activeResult?.id === res.id
                          ? 'border-purple-600 ring-2 ring-purple-200'
                          : 'border-[#E8E2D8] hover:border-[#1C1917]'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={res.resultImageUrl}
                        alt={res.garmentName}
                        className="w-full h-full object-cover object-top"
                      />
                      {res.isFavorite && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center">
                          <Heart className="w-2.5 h-2.5 fill-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />

      {/* Upload Custom Garment Modal */}
      {customGarmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FBF9F5] border border-[#E8E2D8] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-editorial text-xl font-bold text-[#1C1917]">
              Unggah Foto Pakaian Sendiri
            </h3>
            <p className="text-xs text-[#736E65]">
              Coba baju dari lemari Anda atau tangkapan layar e-commerce untuk dicoba di fitting room.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#1C1917] block mb-1">
                  Nama Pakaian:
                </label>
                <input
                  type="text"
                  placeholder="Misal: Kebaya Brokat Biru Langit"
                  value={customGarmentName}
                  onChange={(e) => setCustomGarmentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-[#E8E2D8] text-[#1C1917] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1C1917] block mb-1">
                  Kategori:
                </label>
                <select
                  value={customGarmentCategory}
                  onChange={(e) => setCustomGarmentCategory(e.target.value as Category)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-[#E8E2D8] text-[#1C1917] focus:outline-none"
                >
                  <option value="tops">Atasan (Tops)</option>
                  <option value="bottoms">Bawahan (Bottoms)</option>
                  <option value="dresses">Gaun / Terusan (Dresses)</option>
                  <option value="outerwear">Outerwear</option>
                  <option value="batik">Batik & Wastra</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1C1917] block mb-1">
                  Foto Pakaian:
                </label>
                <input
                  ref={garmentInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCustomGarmentFile}
                  className="w-full text-xs text-[#736E65]"
                />
              </div>

              {customGarmentImage && (
                <div className="w-24 h-24 rounded-xl overflow-hidden border border-[#E8E2D8] mx-auto mt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={customGarmentImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8E2D8]">
              <button
                onClick={() => setCustomGarmentModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#736E65]"
              >
                Batal
              </button>
              <button
                onClick={handleApplyCustomGarment}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#1C1917] text-white hover:bg-[#292524]"
              >
                Terapkan & Coba AI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <ConsentModal
        isOpen={consentOpen}
        onAccept={() => {
          setConsentOpen(false);
          fileInputRef.current?.click();
        }}
        onCancel={() => setConsentOpen(false)}
      />

      <LookBattleModal
        isOpen={lookBattleOpen}
        onClose={() => setLookBattleOpen(false)}
        availableLooks={tryOnHistory}
      />

      {activeResult && (
        <ExportLookCard
          isOpen={exportCardOpen}
          onClose={() => setExportCardOpen(false)}
          result={activeResult}
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

export default function FittingRoomPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FBF9F5] text-stone-700">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-stone-800 border-t-transparent rounded-full animate-spin" />
            <span className="font-editorial text-sm">Membuka Fitting Room...</span>
          </div>
        </div>
      }
    >
      <FittingRoomContent />
    </Suspense>
  );
}
