'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  Check, 
  Search, 
  Sparkles, 
  RefreshCw, 
  Eye, 
  EyeOff,
  Layers,
  CalendarDays,
  BookOpen,
  ArrowLeft
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  getGarments, 
  saveGarments, 
  addGarment, 
  updateGarment, 
  deleteGarment, 
  resetGarmentsToDefault,
  getOccasionRecommendations,
  saveOccasionRecommendations,
  getArticles,
  saveArticles
} from '@/lib/storage';
import { uploadFashionMedia } from '@/lib/supabase';
import { Garment, Category, IndonesianOccasion, FormalityLevel, OccasionRecommendation, FashionArticle } from '@/types';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'garments' | 'occasions' | 'articles'>('garments');
  const [garments, setGarments] = useState<Garment[]>([]);
  const [recommendations, setRecommendations] = useState<OccasionRecommendation[]>([]);
  const [articles, setArticles] = useState<FashionArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Editing modal
  const [editingGarment, setEditingGarment] = useState<Garment | null>(null);
  const [isNewGarment, setIsNewGarment] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if previously authenticated in session
    if (typeof window !== 'undefined' && sessionStorage.getItem('pakai_admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
    loadData();
  }, []);

  const loadData = () => {
    setGarments(getGarments());
    setRecommendations(getOccasionRecommendations());
    setArticles(getArticles());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234
    if (pinInput === '1234' || pinInput.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('pakai_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('pakai_admin_auth');
  };

  // Garment CRUD
  const handleAddNewGarment = () => {
    const fresh: Garment = {
      id: '',
      name: '',
      brand: 'Studio Nusantara',
      category: 'tops',
      price: 350000,
      imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80',
      description: 'Deskripsi busana modern Nusantara dengan serat berkualitas tinggi.',
      fabric: 'Katun Primissima Adem',
      colors: ['#1e293b', '#f8fafc'],
      occasions: ['kerja', 'kondangan'],
      formality: 'smart_casual',
      isModestFriendly: true,
      isFeatured: false,
      status: 'published',
      stock: 10,
      tags: ['Baru', 'Wastra'],
      createdAt: new Date().toISOString(),
    };
    setEditingGarment(fresh);
    setIsNewGarment(true);
  };

  const handleSaveGarment = () => {
    if (!editingGarment) return;
    if (!editingGarment.name.trim() || !editingGarment.imageUrl.trim()) {
      alert('Nama dan URL foto pakaian wajib diisi.');
      return;
    }

    if (isNewGarment) {
      addGarment(editingGarment);
    } else {
      updateGarment(editingGarment.id, editingGarment);
    }

    loadData();
    setEditingGarment(null);
  };

  const handleDeleteGarment = (id: string) => {
    if (confirm('Hapus garmen pakaian ini dari katalog publik?')) {
      deleteGarment(id);
      loadData();
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Kembalikan katalog pakaian ke data awal (default presets)?')) {
      resetGarmentsToDefault();
      loadData();
    }
  };

  // Image Upload helper
  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingGarment) return;
    setUploadingImage(true);

    try {
      const res = await uploadFashionMedia(file, 'garments');
      if (res.url) {
        setEditingGarment({ ...editingGarment, imageUrl: res.url });
      } else {
        alert(res.error || 'Gagal mengunggah gambar');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  // Filtered Garments
  const filteredGarments = garments.filter((g) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      g.name.toLowerCase().includes(q) ||
      g.brand.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D8] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
              <h1 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917]">
                PAKAI Studio Backstage CMS
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#736E65]">
              Panel pengelolaan katalog pakaian, rekomendasi momen, dan artikel fashion journal dengan sinkronisasi langsung ke aplikasi publik.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/fitting-room"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#E8E2D8] text-[#1C1917] hover:bg-[#F3EFE8] transition-colors"
            >
              Lihat Aplikasi Publik &rarr;
            </a>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-200 text-[#1C1917] hover:bg-stone-300 transition-colors"
              >
                Keluar CMS
              </button>
            )}
          </div>
        </div>

        {/* Security Login Gate */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border border-[#E8E2D8] shadow-xl text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-editorial text-2xl font-bold text-[#1C1917]">
                Akses Terbatas Studio CMS
              </h3>
              <p className="text-xs text-[#736E65]">
                Masukkan PIN otentikasi administrator studio untuk melanjutkan.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Masukkan PIN (Default: 1234)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl text-center font-mono text-base border focus:outline-none transition-colors ${
                    pinError
                      ? 'border-rose-500 bg-rose-50 text-rose-900'
                      : 'border-[#E8E2D8] bg-[#FBF9F5] text-[#1C1917] focus:ring-2 focus:ring-purple-600'
                  }`}
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-600 mt-1 font-semibold">
                    PIN tidak valid. Coba gunakan: <strong>1234</strong>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#1C1917] text-white text-xs font-semibold hover:bg-[#292524] shadow-md transition-all"
              >
                Masuk ke Panel Studio
              </button>

              <div className="text-[11px] text-[#8C8275] pt-2">
                *Demo Mode PIN default: <strong>1234</strong>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-6">
            
            {/* Top CMS Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-[#E8E2D8] shadow-sm">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('garments')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
                    activeTab === 'garments'
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#736E65] hover:text-[#1C1917] hover:bg-[#F3EFE8]'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Katalog Busana ({garments.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('occasions')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
                    activeTab === 'occasions'
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#736E65] hover:text-[#1C1917] hover:bg-[#F3EFE8]'
                  }`}
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Rekomendasi Momen ({recommendations.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('articles')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
                    activeTab === 'articles'
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#736E65] hover:text-[#1C1917] hover:bg-[#F3EFE8]'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Fashion Journal ({articles.length})</span>
                </button>
              </div>

              {activeTab === 'garments' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddNewGarment}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1C1917] text-white hover:bg-[#292524] shadow-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Pakaian Baru</span>
                  </button>
                  <button
                    onClick={handleResetDefaults}
                    className="p-2 rounded-xl text-[#736E65] hover:text-[#1C1917] hover:bg-[#F3EFE8]"
                    title="Reset Katalog ke Data Awal"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* TAB 1: GARMENTS CATALOG CRUD */}
            {activeTab === 'garments' && (
              <div className="space-y-4">
                
                {/* Search Bar */}
                <div className="relative max-w-sm">
                  <Search className="w-4 h-4 text-[#8C8275] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Saring nama pakaian atau brand..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#E8E2D8] text-xs text-[#1C1917] focus:outline-none"
                  />
                </div>

                {/* Garments Table */}
                <div className="bg-white rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#FBF9F5] border-b border-[#E8E2D8] text-[#736E65] uppercase tracking-wider text-[10px]">
                          <th className="py-3.5 px-4 font-bold">Produk</th>
                          <th className="py-3.5 px-4 font-bold">Kategori</th>
                          <th className="py-3.5 px-4 font-bold">Harga (IDR)</th>
                          <th className="py-3.5 px-4 font-bold">Material & Fit</th>
                          <th className="py-3.5 px-4 font-bold">Status</th>
                          <th className="py-3.5 px-4 font-bold text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E2D8]/60">
                        {filteredGarments.map((g) => (
                          <tr key={g.id} className="hover:bg-[#FDFBF7] transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-14 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-[#E8E2D8]">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={g.imageUrl} alt={g.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0 max-w-xs">
                                  <span className="text-[10px] uppercase font-bold text-[#8C8275]">{g.brand}</span>
                                  <h4 className="font-semibold text-xs text-[#1C1917] truncate">{g.name}</h4>
                                  <span className="text-[10px] text-[#736E65]">{g.occasions.join(', ')}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700">
                                {g.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-mono font-bold text-amber-800">
                              Rp {g.price.toLocaleString('id-ID')}
                            </td>
                            <td className="py-3 px-4 text-[#736E65] max-w-xs truncate">
                              {g.fabric}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  g.status === 'published'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-amber-50 text-amber-700'
                                }`}
                              >
                                {g.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => {
                                    setEditingGarment(g);
                                    setIsNewGarment(false);
                                  }}
                                  className="p-1.5 rounded-lg text-[#736E65] hover:text-[#1C1917] hover:bg-[#F3EFE8]"
                                  title="Edit Produk"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteGarment(g.id)}
                                  className="p-1.5 rounded-lg text-[#8C8275] hover:text-rose-600 hover:bg-rose-50"
                                  title="Hapus Produk"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: OCCASIONS RECOMMENDATIONS OVERVIEW */}
            {activeTab === 'occasions' && (
              <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3">
                  <div>
                    <h3 className="font-editorial text-lg font-bold text-[#1C1917]">
                      Daftar Kurasi Dress for the Occasion
                    </h3>
                    <p className="text-xs text-[#736E65]">
                      Paduan busana yang muncul pada fitur signature rekomendasi momen acara.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D8] flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full inline-block">
                          {rec.occasion}
                        </span>
                        <h4 className="font-editorial font-bold text-base text-[#1C1917]">{rec.title}</h4>
                        <p className="text-xs text-[#736E65]">{rec.subtitle}</p>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-xs font-bold text-amber-800 block">
                          Rp {rec.estimatedBudget.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[11px] text-[#736E65]">
                          {rec.garmentIds.length} item garmen
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: ARTICLES CMS OVERVIEW */}
            {activeTab === 'articles' && (
              <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3">
                  <div>
                    <h3 className="font-editorial text-lg font-bold text-[#1C1917]">
                      Daftar Artikel Fashion Journal
                    </h3>
                    <p className="text-xs text-[#736E65]">
                      Kelola artikel editorial yang terbit di majalah digital PAKAI.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {articles.map((art) => (
                    <div
                      key={art.id}
                      className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D8] flex gap-3"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="text-[9px] font-bold uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full inline-block">
                          {art.category}
                        </span>
                        <h4 className="font-editorial text-sm font-bold text-[#1C1917] line-clamp-1">{art.title}</h4>
                        <p className="text-[11px] text-[#736E65] line-clamp-2">{art.excerpt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Garment Edit / Add Modal */}
      {editingGarment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#FBF9F5] border border-[#E8E2D8] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-auto space-y-5">
            
            <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3">
              <h3 className="font-editorial text-xl font-bold text-[#1C1917]">
                {isNewGarment ? 'Tambah Pakaian Baru ke Katalog' : 'Edit Data Busana'}
              </h3>
              <button
                onClick={() => setEditingGarment(null)}
                className="p-1.5 rounded-lg text-[#736E65] hover:text-[#1C1917]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="space-y-1 sm:col-span-2">
                <label className="font-semibold text-[#1C1917]">Nama Pakaian:</label>
                <input
                  type="text"
                  value={editingGarment.name}
                  onChange={(e) => setEditingGarment({ ...editingGarment, name: e.target.value })}
                  placeholder="Misal: Outer Kimono Tenun Ikat Sumba"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8E2D8] text-xs text-[#1C1917] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1C1917]">Brand / Studio:</label>
                <input
                  type="text"
                  value={editingGarment.brand}
                  onChange={(e) => setEditingGarment({ ...editingGarment, brand: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8E2D8] text-xs text-[#1C1917]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1C1917]">Kategori:</label>
                <select
                  value={editingGarment.category}
                  onChange={(e) => setEditingGarment({ ...editingGarment, category: e.target.value as Category })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8E2D8] text-xs text-[#1C1917]"
                >
                  <option value="tops">Atasan (Tops)</option>
                  <option value="bottoms">Bawahan (Bottoms)</option>
                  <option value="dresses">Dresses / Terusan</option>
                  <option value="outerwear">Outerwear</option>
                  <option value="batik">Batik & Wastra</option>
                  <option value="formalwear">Jas & Formalwear</option>
                  <option value="modestwear">Modestwear</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1C1917]">Harga (Rupiah):</label>
                <input
                  type="number"
                  value={editingGarment.price}
                  onChange={(e) => setEditingGarment({ ...editingGarment, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8E2D8] text-xs font-mono text-[#1C1917]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1C1917]">Material Kain / Fabric:</label>
                <input
                  type="text"
                  value={editingGarment.fabric}
                  onChange={(e) => setEditingGarment({ ...editingGarment, fabric: e.target.value })}
                  placeholder="Misal: Katun Sutra ATBM & Furing Trikot"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8E2D8] text-xs text-[#1C1917]"
                />
              </div>

              {/* Image URL & Upload button */}
              <div className="space-y-1 sm:col-span-2">
                <label className="font-semibold text-[#1C1917] flex items-center justify-between">
                  <span>URL Foto Pakaian:</span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[10px] text-purple-700 hover:underline flex items-center gap-1"
                  >
                    <Upload className="w-3 h-3" />
                    <span>{uploadingImage ? 'Mengunggah...' : 'Unggah Berkas Baru'}</span>
                  </button>
                </label>
                <input
                  type="text"
                  value={editingGarment.imageUrl}
                  onChange={(e) => setEditingGarment({ ...editingGarment, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8E2D8] text-xs text-[#1C1917]"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleMediaUpload}
                />
              </div>

              {/* Description */}
              <div className="space-y-1 sm:col-span-2">
                <label className="font-semibold text-[#1C1917]">Deskripsi Filosofi & Karakter:</label>
                <textarea
                  rows={3}
                  value={editingGarment.description}
                  onChange={(e) => setEditingGarment({ ...editingGarment, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8E2D8] text-xs text-[#1C1917]"
                />
              </div>

              {/* Status & Options */}
              <div className="space-y-1">
                <label className="font-semibold text-[#1C1917]">Status Tayang:</label>
                <select
                  value={editingGarment.status}
                  onChange={(e) => setEditingGarment({ ...editingGarment, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8E2D8] text-xs text-[#1C1917]"
                >
                  <option value="published">Published (Tayang Publik)</option>
                  <option value="draft">Draft (Disembunyikan)</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-4 sm:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editingGarment.isModestFriendly}
                    onChange={(e) => setEditingGarment({ ...editingGarment, isModestFriendly: e.target.checked })}
                    className="rounded text-purple-600"
                  />
                  <span className="font-semibold text-[#1C1917]">Modest / Hijab Friendly</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editingGarment.isFeatured}
                    onChange={(e) => setEditingGarment({ ...editingGarment, isFeatured: e.target.checked })}
                    className="rounded text-purple-600"
                  />
                  <span className="font-semibold text-[#1C1917]">Tampilkan di Beranda (Featured)</span>
                </label>
              </div>

            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#E8E2D8]">
              <button
                onClick={() => setEditingGarment(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#736E65]"
              >
                Batal
              </button>
              <button
                onClick={handleSaveGarment}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#1C1917] text-white hover:bg-[#292524] shadow-md flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Perubahan</span>
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
