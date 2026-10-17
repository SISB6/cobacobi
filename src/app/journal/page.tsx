'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Clock, ArrowRight, User } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StyleDnaModal } from '@/components/StyleDnaModal';
import { ApiSettingsDrawer } from '@/components/ApiSettingsDrawer';
import { getArticles } from '@/lib/storage';
import { FashionArticle } from '@/types';

export default function JournalPage() {
  const [articles, setArticles] = useState<FashionArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [styleDnaOpen, setStyleDnaOpen] = useState(false);
  const [apiSettingsOpen, setApiSettingsOpen] = useState(false);

  useEffect(() => {
    setArticles(getArticles());
  }, []);

  const filteredArticles = articles.filter((a) => {
    if (!a.isPublished) return false;
    if (selectedCategory !== 'all' && a.category !== selectedCategory) return false;
    return true;
  });

  const categories = ['all', 'Wastra Nusantara', 'Occasion Guide', 'Color Theory', 'Style Hacks'];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Header
        onOpenStyleDna={() => setStyleDnaOpen(true)}
        onOpenApiSettings={() => setApiSettingsOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Page Top Heading */}
        <div className="border-b border-[#E8E2D8] pb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/70 text-amber-900 border border-amber-200">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Editorial Journal</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            Fashion Journal & Style Guides
          </h1>
          <p className="text-xs sm:text-sm text-[#736E65] max-w-xl">
            Eksplorasi mendalam seni wastra Nusantara, panduan etika busana pesta, dan teori analisis warna kulit khas Indonesia.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold capitalize whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-sm'
                  : 'bg-white text-[#615B52] border-[#E8E2D8] hover:border-[#1C1917]'
              }`}
            >
              {cat === 'all' ? 'Semua Panduan' : cat}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <a
              key={article.id}
              href={`/journal/${article.id}`}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E8E2D8] hover:border-[#1C1917] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] w-full bg-stone-900 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 inline-block">
                    {article.category}
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-[#1C1917] group-hover:text-[#D97706] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#736E65] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#E8E2D8]/60 flex items-center justify-between text-xs text-[#8C8275]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-stone-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
                  </div>
                  <span>{article.author.name}</span>
                </div>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                </span>
              </div>
            </a>
          ))}
        </div>

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
