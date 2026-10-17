import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'PAKAI — Your AI Fitting Room | Indonesian Fashion Studio',
  description: 'Interactive virtual fitting room and fashion studio tailored for Indonesian users. Try on modern batik, tenun, kebaya, modestwear and curated occasion outfits with photorealistic AI.',
  keywords: [
    'Virtual Fitting Room',
    'AI Try On Indonesia',
    'FASHN VTON',
    'Batik Modern',
    'Tenun Ikat',
    'Modestwear',
    'Kondangan Outfit',
    'Fashion Stylist AI'
  ],
  authors: [{ name: 'PAKAI Creative Studio' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${playfair.variable} antialiased scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917] selection:bg-[#FDE047] selection:text-[#1C1917]">
        {children}
      </body>
    </html>
  );
}
