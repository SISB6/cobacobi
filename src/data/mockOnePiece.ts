import { Garment, OnePieceStyleVariation } from '@/types';

export const ONE_PIECE_PRESETS: Record<string, OnePieceStyleVariation[]> = {
  'g-tenun-sumba-outer': [
    {
      id: 'sumba-work',
      modeTitle: '9-to-5 Executive Heritage',
      vibe: 'Sharp, Kultural, Berwibawa',
      situation: 'Rapat Dewan Direksi atau Presentasi Klien Multinasional',
      description: 'Jadikan long kimono tenun sebagai mantel luar pengganti blazer konvensional. Padukan dengan kemeja putih berkerah kaku dan celana bahan lurus monokrom.',
      pairedGarments: [
        { role: 'Atasan', name: 'Kemeja Katun Putih Crisp Formal', description: 'Kerah kemeja runcing tucked-in rapi' },
        { role: 'Bawahan', name: 'Celana Tailored Trousers Hitam', description: 'Potongan lurus rapi berpinggang tinggi' },
        { role: 'Sepatu/Tas', name: 'Pointed Loafers Kulit & Briefcase Tan', description: 'Elegan dan praktis membawa laptop' },
        { role: 'Hijab/Aksesoris', name: 'Hijab Voal Hitam Rapi & Jam Tangan Emas', description: 'Aksen minimalis tidak bertabrakan dengan motif tenun' }
      ],
      colorPalette: ['#1e293b', '#7c2d12', '#ffffff', '#d97706'],
      proTip: 'Gulung sedikit ujung lengan kimono hingga tiga perempat lengan bawah untuk memperlihatkan jam tangan dan memberi siluet proporsional.',
      tryOnResultPreview: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'sumba-weekend',
      modeTitle: 'Saturday Brunch & Coffee Walk',
      vibe: 'Effortless, Santai, Bohemien Tropis',
      situation: 'Nongkrong di Café Terbuka atau Kunjungan Pameran Seni',
      description: 'Biarkan outer terbuka melambai tertiup angin tropis. Kenakan kaus oblong katun basic warna broken white dan celana kulot atau denim longgar.',
      pairedGarments: [
        { role: 'Atasan', name: 'T-Shirt Katun Combed Broken White', description: 'Kaus oblong leher bulat yang adem' },
        { role: 'Bawahan', name: 'Celana Kulot Linen Terracotta', description: 'Kenyamanan gerak santai sepanjang siang', garmentId: 'g-kulot-terracotta' },
        { role: 'Sepatu/Tas', name: 'Sandal Kulit Anyam & Tote Bag Kanvas', description: 'Sentuhan artisan lokal yang ramah lingkungan' },
        { role: 'Hijab/Aksesoris', name: 'Kacamata Hitam Vintage Cat-eye', description: 'Melindungi mata dari silau terik tropis' }
      ],
      colorPalette: ['#7c2d12', '#b45309', '#fdfbf7', '#d97706'],
      proTip: 'Kombinasi warna tenun Sumba yang alami sangat selaras dengan celana kulot terracotta—menciptakan estetika earthy tone yang fotogenik.',
      tryOnResultPreview: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'sumba-kondangan',
      modeTitle: 'Malam Resepsi Kondangan Ballroom',
      vibe: 'Glamour, Royal Nusantara, Menghipnotis',
      situation: 'Pernikahan Adat Megah atau Gala Dinner Budaya',
      description: 'Ubah kimono menjadi gaun lilit statement! Kancingkan bagian pinggang dengan belt obi kulit beraksen gesper kuningan antik, dipadu rok songket satin berona keemasan.',
      pairedGarments: [
        { role: 'Atasan', name: 'Inner Manset Sutra Silk Nude', description: 'Dalaman halus yang tidak menonjol' },
        { role: 'Bawahan', name: 'Rok Lilit Songket Champagne Gold', description: 'Kilau satin songket yang mewah di lampu ballroom', garmentId: 'g-rok-lilit-satin' },
        { role: 'Sepatu/Tas', name: 'Stiletto Heels Emas 7cm & Hard Clutch Pesta', description: 'Menambah tinggi dan postur tegap anggun' },
        { role: 'Hijab/Aksesoris', name: 'Kalung Etnik Choker Perak Bakar & Anting Mutiara', description: 'Mahkota kemewahan adat kontemporer' }
      ],
      colorPalette: ['#7c2d12', '#d4af37', '#451a03', '#fef08a'],
      proTip: 'Gunakan bros perak bakar Nusantara berukuran sedang untuk mengunci pertemuan kerah kimono di dada, menciptakan siluet leher V yang jenjang.',
      tryOnResultPreview: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'sumba-vacation',
      modeTitle: 'Tropical Resort Sunset Lounge',
      vibe: 'Eksotis, Ringan, Luxury Escape',
      situation: 'Sunset Cocktail di Beach Club Bali atau Resort Labuan Bajo',
      description: 'Kenakan outer tenun di atas slip dress katun atau linen tipis bernuansa pasir pantai. Tenun yang ditiup semilir angin laut menciptakan visual dramatis.',
      pairedGarments: [
        { role: 'Atasan', name: 'Slip Camisole Dress Linen Sand', description: 'Potongan jatuh santai anti gerah' },
        { role: 'Sepatu/Tas', name: 'Espadrilles Tali & Tas Anyaman Rotan Bali', description: 'Tekstur anyaman senada dengan benang tenun' },
        { role: 'Hijab/Aksesoris', name: 'Topi Fedora Anyam Daun Lontar', description: 'Pelindung terik matahari pesisir yang stylish' }
      ],
      colorPalette: ['#7c2d12', '#d7ccc8', '#fef3c7', '#0284c7'],
      proTip: 'Semprotkan dry mist sunblock sebelum mengenakan busana, dan biarkan tenun bergerak bebas tanpa dikancingkan.',
      tryOnResultPreview: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'
    }
  ],
  'g-batik-blazer': [
    {
      id: 'batik-work',
      modeTitle: 'Monday Boardroom Authority',
      vibe: 'Tajam, Tegas, Karismatik',
      situation: 'Rapat Kerja Evaluasi Tahunan atau Negosiasi Kontrak',
      description: 'Padukan blazer batik parang indigo dengan kemeja putih kerah shanghai dan celana bahan katun lurus charcoal.',
      pairedGarments: [
        { role: 'Atasan', name: 'Kemeja Linen Ivory', description: 'Kerah kemeja rapi tucked-in', garmentId: 'g-linen-shirt-ivory' },
        { role: 'Bawahan', name: 'Celana Kulot Pleated Charcoal', description: 'Potongan rapi berpinggang tinggi' },
        { role: 'Sepatu/Tas', name: 'Oxford Shoes Kulit Hitam Mengkilap', description: 'Kesan profesional tanpa cela' }
      ],
      colorPalette: ['#1e293b', '#fdfbf7', '#475569', '#3b82f6'],
      proTip: 'Kancingkan kancing pertama blazer saat berjalan atau berdiri untuk mempertahankan struktur bahu yang tegap.',
      tryOnResultPreview: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'batik-casual',
      modeTitle: 'Urban Smart Casual Friday',
      vibe: 'Santai, Rileks, Kreatif',
      situation: 'Casual Friday Kantor & Nongkrong Malam Mingguan',
      description: 'Lepaskan kesan kaku dengan memadukan blazer batik bersama kaus polos abu-abu muda dan celana kulot terracotta bertekstur slub.',
      pairedGarments: [
        { role: 'Bawahan', name: 'Celana Kulot Terracotta', description: 'Warna tanah yang menyeimbangkan dinginnya indigo', garmentId: 'g-kulot-terracotta' },
        { role: 'Sepatu/Tas', name: 'White Leather Minimalist Sneakers', description: 'Kesan muda dan dinamis melintasi kota' }
      ],
      colorPalette: ['#1e293b', '#b45309', '#f8fafc', '#94a3b8'],
      proTip: 'Lipat lengan blazer hingga siku untuk menampakkan lapisan furing lurik bagian dalam yang kontras.',
      tryOnResultPreview: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'batik-kondangan',
      modeTitle: 'Resepsi Semi-Formal Modern',
      vibe: 'Anggun, Berakar Budaya, Berkelas',
      situation: 'Akad Nikah Kerabat atau Resepsi Adat di Pendopo',
      description: 'Kombinasikan blazer batik dengan rok lilit songket champagne atau celana sutra lilit berhias selendang tipis.',
      pairedGarments: [
        { role: 'Bawahan', name: 'Rok Lilit Songket Champagne Gold', description: 'Kombinasi batik dan songket dalam satu harmoni', garmentId: 'g-rok-lilit-satin' },
        { role: 'Sepatu/Tas', name: 'Pointed Mule Velvet Heels', description: 'Sentuhan tekstur beludru mewah' }
      ],
      colorPalette: ['#1e293b', '#d4af37', '#e5c158', '#3b82f6'],
      proTip: 'Kenakan bros perak di lapel blazer untuk menyatukan warna perhiasan dengan motif batik.',
      tryOnResultPreview: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=800&auto=format&fit=crop&q=80'
    }
  ],
  'g-linen-shirt-ivory': [
    {
      id: 'linen-work',
      modeTitle: 'Clean Minimalist Workwear',
      vibe: 'Bersih, Modern, Terorganisir',
      situation: 'Hari Kerja di Startup Tech atau Creative Agency',
      description: 'Kemeja linen oversized dikancingkan rapi hingga kerah atas, diselipkan ke celana kulot pleat terracotta atau rok midi berstruktur.',
      pairedGarments: [
        { role: 'Bawahan', name: 'Celana Kulot Linen Terracotta', description: 'Kombinasi warna ivory dan terracotta yang abadi', garmentId: 'g-kulot-terracotta' },
        { role: 'Sepatu/Tas', name: 'Loafers Kulit Cokelat & Tote Bag Laptop', description: 'Siap mobilitas tinggi seharian' }
      ],
      colorPalette: ['#fdfbf7', '#b45309', '#78350f', '#e2ded5'],
      proTip: 'Semprotkan pelembut pakaian beraroma segar chamomile sebelum disetrika uap ringan.',
      tryOnResultPreview: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'linen-weekend',
      modeTitle: 'Coffee & Bookshop Stroll',
      vibe: 'Effortless, Santai, Natural',
      situation: 'Menikmati Sabtu Pagi di Kawasan Kemang atau Canggu',
      description: 'Jadikan kemeja sebagai outer ringan terbuka dengan dalaman tank top katun atau kaus crop rajut bertekstur.',
      pairedGarments: [
        { role: 'Outer', name: 'Rompi Etnik Tenun Rangrang Lombok', description: 'Layering ekstra untuk aksen warna', garmentId: 'g-tenun-rangrang-vest' },
        { role: 'Sepatu/Tas', name: 'Sandal Slop Kulit Cokelat & Tas Rajut Katun', description: 'Gaya santai akhir pekan' }
      ],
      colorPalette: ['#fdfbf7', '#e11d48', '#ea580c', '#e2ded5'],
      proTip: 'Biarkan kerut alami khas linen tampak apa adanya—itulah pesona kemewahan serat rami alami.',
      tryOnResultPreview: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80'
    }
  ]
};

// Fallback generator for any garment that doesn't have custom presets
export function generateVariationsForGarment(garment: Garment): OnePieceStyleVariation[] {
  if (ONE_PIECE_PRESETS[garment.id]) {
    return ONE_PIECE_PRESETS[garment.id];
  }

  // Smart dynamic generator based on category and style
  return [
    {
      id: `${garment.id}-mode-work`,
      modeTitle: '9-to-5 Executive Workwear',
      vibe: 'Profesional, Tajam, Berwibawa',
      situation: 'Pertemuan Kantor Formal atau Presentasi Strategis',
      description: `Padukan ${garment.name} dengan bawahan/atasan terstruktur netral. Menampilkan profesionalisme tinggi dengan sentuhan karakter khas Indonesia.`,
      pairedGarments: [
        { role: 'Bawahan', name: 'Celana Tailored Trousers Bahan Wool-blend', description: 'Potongan lurus rapi berpinggang tinggi' },
        { role: 'Sepatu/Tas', name: 'Pointed Loafers Kulit & Tote Bag Minimalis', description: 'Kesan elegan dan praktis' },
        { role: 'Hijab/Aksesoris', name: 'Aksesoris Jam Tangan Minimalis & Bros Simpel', description: 'Aksen manis profesional' }
      ],
      colorPalette: [...garment.colors.slice(0, 2), '#1e293b', '#f8fafc'],
      proTip: 'Pastikan siluet pakaian rapi dan tidak terlalu banyak lipatan berlebih saat duduk di ruang rapat.',
      tryOnResultPreview: garment.imageUrl
    },
    {
      id: `${garment.id}-mode-weekend`,
      modeTitle: 'Weekend Café & Gallery Stroll',
      vibe: 'Effortless, Nyaman, Trendi',
      situation: 'Nongkrong Santai di Coffee Shop atau Hunting Foto Pameran',
      description: `Beri sentuhan rileks pada ${garment.name} dengan memadukannya bersama item kasual berbahan katun atau denim nyaman.`,
      pairedGarments: [
        { role: 'Bawahan', name: 'Celana Kulot Linen Longgar', description: 'Kebebasan bergerak di udara terbuka' },
        { role: 'Sepatu/Tas', name: 'Sneakers Putih Bersih atau Sandal Kulit', description: 'Kenyamanan melangkah santai' },
        { role: 'Hijab/Aksesoris', name: 'Kacamata Hitam & Tas Anyaman Bahu', description: 'Aksen pelengkap foto OOTD' }
      ],
      colorPalette: [...garment.colors.slice(0, 2), '#b45309', '#fdfbf7'],
      proTip: 'Kombinasi tekstur adalah kunci: biarkan serat alami pakaian berbicara dengan sendirinya.',
      tryOnResultPreview: garment.imageUrl
    },
    {
      id: `${garment.id}-mode-kondangan`,
      modeTitle: 'Pesta & Kondangan Modern',
      vibe: 'Mewah, Anggun, Memukau',
      situation: 'Resepsi Pernikahan Hotel Ballroom atau Pertunangan Sakral',
      description: `Tingkatkan derajat kemewahan ${garment.name} dengan aksen kain wastra berkilau halus seperti songket atau satin sutra.`,
      pairedGarments: [
        { role: 'Bawahan', name: 'Rok Lilit Songket Champagne Gold', description: 'Kilau elegan di bawah lampu pesta' },
        { role: 'Sepatu/Tas', name: 'Heels Pesta Berkilau & Clutch Berstruktur', description: 'Melengkapi keanggunan formal' },
        { role: 'Hijab/Aksesoris', name: 'Perhiasan Mutiara Air Tawar & Bros Bakar', description: 'Sentuhan aristokrat Nusantara' }
      ],
      colorPalette: [...garment.colors.slice(0, 2), '#d4af37', '#7c2d12'],
      proTip: 'Tambahkan selendang tipis tersampir di pundak untuk menambah aura keanggunan tradisional.',
      tryOnResultPreview: garment.imageUrl
    }
  ];
}
