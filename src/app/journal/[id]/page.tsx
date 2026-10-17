'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Sparkles, Share2, BookOpen } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StyleDnaModal } from '@/components/StyleDnaModal';
import { ApiSettingsDrawer } from '@/components/ApiSettingsDrawer';
import { getArticles, getGarments } from '@/lib/storage';
import { FashionArticle, Garment } from '@/types';

function ArticleDetailContent() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [article, setArticle] = useState<FashionArticle | null>(null);
  const [featuredGarments, setFeaturedGarments] = useState<Garment[]>([]);
  const [styleDnaOpen, setStyleDnaOpen] = useState(false);
  const [apiSettingsOpen, setApiSettingsOpen] = useState(false);

  useEffect(() => {
    const allArticles = getArticles();
    const current = allArticles.find((a) => a.id === id);
    if (current) {
      setArticle(current);
      const allGarments = getGarments();
      const matched = allGarments.filter((g) => current.featuredGarmentIds.includes(g.id));
      setFeaturedGarments(matched);
    }
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="space-y-4">
            <h2 className="font-editorial text-2xl font-bold">Artikel Tidak Ditemukan</h2>
            <a href="/journal" className="text-xs font-semibold text-purple-700 underline">
              Kembali ke Indeks Journal &rarr;
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Header
        onOpenStyleDna={() => setStyleDnaOpen(true)}
        onOpenApiSettings={() => setApiSettingsOpen(true)}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Back Link */}
        <div>
          <a
            href="/journal"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#736E65] hover:text-[#1C1917] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Seluruh Artikel</span>
          </a>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-800 inline-block">
            {article.category}
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.18]">
            {article.title}
          </h1>
          <p className="text-base sm:text-lg text-[#615B52] leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D8] text-xs text-[#736E65]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <strong className="block text-[#1C1917] font-semibold">{article.author.name}</strong>
                <span>{article.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(article.publishedAt).toLocaleDateString('id-ID')}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Cover Photo */}
        <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden bg-stone-900 border border-[#E8E2D8] shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <article className="prose prose-stone max-w-none text-[#292524] text-sm sm:text-base leading-relaxed space-y-5">
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('# ')) {
              return (
                <h2 key={idx} className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1917] pt-4">
                  {paragraph.replace('# ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h3 key={idx} className="font-editorial text-xl sm:text-2xl font-bold text-[#1C1917] pt-3">
                  {paragraph.replace('## ', '')}
                </h3>
              );
            }
            return (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* Featured Garments in this Article */}
        {featuredGarments.length > 0 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h3 className="font-editorial text-xl font-bold text-[#1C1917]">
                  Pakaian yang Disebut dalam Panduan Ini
                </h3>
              </div>
              <span className="text-xs text-[#736E65]">
                Dapat dicoba langsung
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredGarments.map((g) => (
                <div
                  key={g.id}
                  className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D8] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-16 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={g.imageUrl} alt={g.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-[#1C1917] line-clamp-1">{g.name}</h4>
                      <p className="text-[11px] font-mono font-bold text-amber-800">
                        Rp {g.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`/fitting-room?try=${g.id}`}
                    className="px-3.5 py-2 rounded-xl bg-[#1C1917] text-white text-xs font-semibold hover:bg-[#292524] transition-colors shrink-0 flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Coba AI</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

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

export default function ArticleDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FBF9F5] text-stone-700">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-stone-800 border-t-transparent rounded-full animate-spin" />
            <span className="font-editorial text-sm">Membuka Artikel Editorial...</span>
          </div>
        </div>
      }
    >
      <ArticleDetailContent />
    </Suspense>
  );
}
