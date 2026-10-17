import { IndonesianOccasion, OccasionRecommendation } from '@/types';

export interface OccasionMeta {
  key: IndonesianOccasion;
  name: string;
  tagline: string;
  iconName: string;
  badge: string;
  description: string;
  culturalEtiquette: string;
  weatherTips: string;
  defaultVenue: 'indoor_ac' | 'outdoor_tropis' | 'semi_outdoor';
}

export const OCCASIONS_LIST: OccasionMeta[] = [
  {
    key: 'kondangan',
    name: 'Kondangan (Pernikahan)',
    tagline: 'Elegan, Menghormati Tuan Rumah, Memukau',
    iconName: 'HeartHandshake',
    badge: 'Paling Populer',
    description: 'Resepsi pernikahan adat Nusantara maupun modern di hotel ballroom, gedung pertemuan, atau pesta kebun (garden wedding).',
    culturalEtiquette: 'Hindari memakai gaun putih polos (menyerupai pengantin wanita) atau motif Batik Parang Barong raksasa di adat Keraton Solo/Jogja jika bukan keturunan bangsawan langsung. Utamakan wastra bernuansa hangat atau pastel mewah.',
    weatherTips: 'Jika resepsi ballroom hotel: ruangan dingin ber-AC (18-20°C), outer organza atau selendang tenun sangat ideal. Jika garden party: pilih katun sutra bernapas dan hindari stiletto tajam.',
    defaultVenue: 'indoor_ac',
  },
  {
    key: 'lebaran',
    name: 'Lebaran & Idul Fitri',
    tagline: 'Suci, Sejuk, Silaturahmi Hangat',
    iconName: 'MoonStar',
    badge: 'Spesial Hari Raya',
    description: 'Salat Ied pagi hari dilanjutkan sungkeman, open house keluarga besar, hingga keliling silaturahmi ke sanak saudara.',
    culturalEtiquette: 'Pilihlah busana modest yang sopan, longgar (tidak membentuk lekuk tubuh), dan wudhu-friendly untuk memudahkan salat sunnah dan fardhu. Nuansa putih, sage green, broken white, atau pastel lembut sangat disukai.',
    weatherTips: 'Silaturahmi seharian berpindah rumah dan berdesakan saat kumpul keluarga memerlukan serat alami seperti katun voal, linen, atau sutra viscose yang adem dan cepat menyerap keringat.',
    defaultVenue: 'semi_outdoor',
  },
  {
    key: 'bukber',
    name: 'Bukber (Buka Puasa Bersama)',
    tagline: 'Smart Modest, Santai tapi Rapi',
    iconName: 'Utensils',
    badge: 'Kumpul Teman & Reuni',
    description: 'Acara buka puasa bersama teman sekolah, alumni kampus, kolega kantor, atau rekan komunitas di restoran, kafe, atau hotel.',
    culturalEtiquette: 'Keseimbangan antara kesan santai dan nuansa religius Ramadan. Layering kemeja linen dengan outer tenun atau tunik modern memberikan kesan rapi tanpa terlihat kaku.',
    weatherTips: 'Seringkali berpindah dari area makan indoor ke outdoor saat menanti azan magrib. Kenakan busana berlapis fleksibel yang mudah dilepas.',
    defaultVenue: 'indoor_ac',
  },
  {
    key: 'wisuda',
    name: 'Wisuda & Kelulusan',
    tagline: 'Penuh Prestasi, Megah, Tahan Seharian',
    iconName: 'GraduationCap',
    badge: 'Momen Bersejarah',
    description: 'Upacara wisuda universitas di auditorium ber-AC dilanjutkan sesi foto studio dan makan siang perayaan bersama keluarga.',
    culturalEtiquette: 'Wajib berbusana formal nasional (kebaya encim modern, kain batik/songket lilit, atau setelan jas resmi). Pastikan leher dan kerah kebaya nyaman di balik toga wisuda.',
    weatherTips: 'Pemakaian jubah toga tebal di atas busana kebaya dapat memicu kegerahan. Gunakan furing katun adem dan kain yang tidak mudah kusut saat duduk berjam-jam.',
    defaultVenue: 'indoor_ac',
  },
  {
    key: 'lamaran',
    name: 'Lamaran & Tunangan',
    tagline: 'Romantis, Serasi, Anggun Bersahaja',
    iconName: 'Gem',
    badge: 'Momen Sakral',
    description: 'Pertemuan resmi dua keluarga besar dalam rangka meminang dan menyematkan cincin pertunangan.',
    culturalEtiquette: 'Warna busana biasanya serasi dengan pasangan dan dekorasi keluarga (sage, terracotta lembut, rose gold, atau navy). Pilihan batik motif Truntum atau Sidomukti melambangkan cinta yang terus bersemi.',
    weatherTips: 'Acara biasanya berlangsung di rumah atau resto semi-privat. Pastikan siluet busana leluasa untuk posisi duduk sungkem atau bersila santun.',
    defaultVenue: 'indoor_ac',
  },
  {
    key: 'kerja',
    name: 'Kerja & Rapat Direksi',
    tagline: 'Tajam, Berwibawa, Profesional Modern',
    iconName: 'Briefcase',
    badge: 'Executive 9-to-5',
    description: 'Presentasi di hadapan dewan direksi, negosiasi dengan klien penting, atau penampilan sehari-hari di kantor korporat.',
    culturalEtiquette: 'Sentuhan batik modern atau tenun kontemporer pada blazer memberikan identitas kebangsaan yang berwibawa tanpa terlihat kuno. Potongan structured memberi aura kredibilitas.',
    weatherTips: 'Ruangan kantor dingin sepanjang hari. Outer berpotongan struktural dengan bahan semi-wool stretch atau katun primissima trikot sangat nyaman.',
    defaultVenue: 'indoor_ac',
  },
  {
    key: 'interview',
    name: 'Interview Kerja',
    tagline: 'Kesan Pertama Meyakinkan & Rapi',
    iconName: 'UserCheck',
    badge: 'Karier Impian',
    description: 'Sesi wawancara kerja tatap muka untuk posisi profesional di perusahaan multinasional, BUMN, atau startup terkemuka.',
    culturalEtiquette: 'Pilihlah palet warna netral yang menenangkan (navy, ivory, charcoal, sage). Hindari aksesoris mencolok atau wewangian yang terlalu pekat. Busana bersih, rapi, dan terawat.',
    weatherTips: 'Keringat gugup bisa terjadi saat wawancara. Kenakan dalaman kaos katun seamless anti-keringat di balik kemeja atau blazer.',
    defaultVenue: 'indoor_ac',
  },
  {
    key: 'acara_keluarga',
    name: 'Acara Keluarga & Arisan',
    tagline: 'Akrab, Modest, Nyaman Sepanjang Hari',
    iconName: 'Users',
    badge: 'Keluarga Hangat',
    description: 'Kumpul trah keluarga besar, arisan bulanan, tasyakuran aqiqah, atau perayaan ulang tahun kakek-nenek.',
    culturalEtiquette: 'Gaya santai berkelas dengan potongan yang sopan di hadapan para tetua keluarga. Bahan tidak mudah kusut saat memangku keponakan atau duduk bercengkerama.',
    weatherTips: 'Area ruang tamu atau pendopo semi-terbuka dengan sirkulasi kipas angin menuntut bahan katun rami atau linen adem.',
    defaultVenue: 'semi_outdoor',
  },
  {
    key: 'liburan',
    name: 'Liburan & Resort Tropis',
    tagline: 'Bebas, Ringan, Menawan di Kamera',
    iconName: 'Palmtree',
    badge: 'Staycation & Travel',
    description: 'Jalan-jalan santai di pantai Bali, resort Labuan Bajo, café hopping Bandung, atau eksplorasi budaya di Ubud.',
    culturalEtiquette: 'Gaya tropis santai. Kemeja camp collar linen terbuka, kimono tenun ringan, atau kacamata hitam retro. Di area pura atau tempat suci, siapkan kain sarung penutup.',
    weatherTips: 'Sinar matahari terik dan kelembapan pesisir tinggi. Pilih warna cerah yang memantulkan panas dan bahan 100% linen alami yang cepat kering jika terkena air.',
    defaultVenue: 'outdoor_tropis',
  },
  {
    key: 'casual_weekend',
    name: 'Casual Weekend & Coffee Walk',
    tagline: 'Effortless, Trendi, Nyaman Nongkrong',
    iconName: 'Coffee',
    badge: 'Weekend Vibe',
    description: 'Nongkrong di coffee shop estetik Jakarta Selatan, hunting pameran seni di galeri, atau belanja santai di mall.',
    culturalEtiquette: 'Kombinasi effortless chic: celana kulot berpinggang tinggi dipadu kemeja oversized jatuh atau vest etnik sebagai statement piece.',
    weatherTips: 'Berpindah dari udara jalanan tropis ke kafe ber-AC dingin. Layering ringan adalah kuncinya.',
    defaultVenue: 'indoor_ac',
  }
];

export const OCCASION_RECOMMENDATIONS: OccasionRecommendation[] = [
  {
    id: 'rec-kondangan-1',
    occasion: 'kondangan',
    title: 'The Modern Heritage Reception Look',
    subtitle: 'Kemewahan Tenun Sumba & Sentuhan Sutra Champagne',
    formality: 'formal',
    venue: 'indoor_ac',
    styleVibe: 'wastra_modern',
    isHijabFriendly: true,
    estimatedBudget: 1398000,
    culturalContext: 'Memadukan Long Kimono Outer Tenun Ikat Sumba dengan Rok Lilit Songket Champagne. Kombinasi ini memberi penghormatan mendalam pada kekayaan wastra Nusantara tanpa terlihat berat atau kaku.',
    weatherAdvice: 'Ballroom pernikahan ber-AC seringkali dingin menusuk. Outer panjang tenun ini menjaga kehangatan tubuh sekaligus bergerak anggun saat menyalami mempelai di pelaminan.',
    garmentIds: ['g-tenun-sumba-outer', 'g-rok-lilit-satin'],
    stylingTips: [
      'Gunakan inner manset warna nude atau broken white berbahan spandex adem.',
      'Sematkan bros tembaga bakar etnik di dada kiri outer.',
      'Padukan dengan mules heels hak tahu 5 cm berbahan velvet atau satin.'
    ]
  },
  {
    id: 'rec-kondangan-2',
    occasion: 'kondangan',
    title: 'Ethereal Garden Wedding Glamour',
    subtitle: 'Pesona Organza Silk Bordir & Rok Songket Halus',
    formality: 'formal',
    venue: 'semi_outdoor',
    styleVibe: 'feminine',
    isHijabFriendly: true,
    estimatedBudget: 1148000,
    culturalContext: 'Outer organza floral berona coral blush memancarkan aura sukacita yang manis, sangat selaras dengan pesta kebun sore hari di iklim tropis.',
    weatherAdvice: 'Organza transparan sangat ringan dan tidak menjebak panas tubuh, memastikan Anda tetap segar dari sesi pemberkatan hingga pesta malam.',
    garmentIds: ['g-organza-outer-kondangan', 'g-rok-lilit-satin'],
    stylingTips: [
      'Kenakan hijab voal segi empat lilit rapi berwarna rosewood senada.',
      'Pilih clutch bag anyaman mutiara atau kulit berstruktur kecil.',
      'Anting tusuk mutiara air tawar untuk sentuhan anggun minimalis.'
    ]
  },
  {
    id: 'rec-lebaran-1',
    occasion: 'lebaran',
    title: 'Silaturahmi Suci Lebaran 1447H',
    subtitle: 'Kelembutan Gamis Silk Lilac & Kenyamanan Seharian',
    formality: 'semi_formal',
    venue: 'semi_outdoor',
    styleVibe: 'feminine',
    isHijabFriendly: true,
    estimatedBudget: 689000,
    culturalContext: 'Warna lilac lembut menghadirkan nuansa kedamaian dan kebaruan jiwa saat saling memaafkan di hari nan fitri. Desain longgar menjaga adab kesantunan di hadapan keluarga besar.',
    weatherAdvice: 'Sutra viscose twill berkualitas tinggi memiliki sensasi sejuk di kulit saat berpelukan dan sungkeman di tengah riuhnya sanak famili.',
    garmentIds: ['g-gamis-silk-lilac'],
    stylingTips: [
      'Padukan dengan pashmina silk shimmer warna lilac senada yang disampirkan di bahu.',
      'Gunakan flat shoes pointed beraksen pita kecil untuk kemudahan buka-pasang saat bertamu.',
      'Semprotkan aroma wewangian oud rose atau vanilla hangat.'
    ]
  },
  {
    id: 'rec-kerja-1',
    occasion: 'kerja',
    title: 'Executive Presence with Cultural Pride',
    subtitle: 'Blazer Batik Indigo & Kulot Linen Terracotta',
    formality: 'semi_formal',
    venue: 'indoor_ac',
    styleVibe: 'wastra_modern',
    isHijabFriendly: true,
    estimatedBudget: 1178000,
    culturalContext: 'Memadukan biru indigo Batik Parang Modern dengan hangatnya warna tanah terracotta. Menampilkan kepribadian pemimpin yang tegas, approachable, dan berakar pada budaya lokal.',
    weatherAdvice: 'Ideal untuk ruang kerja ber-AC sentral. Celana kulot memberi sirkulasi udara baik saat mobilitas meeting antar gedung.',
    garmentIds: ['g-batik-blazer', 'g-kulot-terracotta'],
    stylingTips: [
      'Gunakan blus dalaman katun tanpa lengan warna broken white.',
      'Jinjing tote bag kulit asli warna cokelat tan berstruktur tegas.',
      'Jam tangan gelang emas rantai tipis untuk aksen profesional.'
    ]
  },
  {
    id: 'rec-wisuda-1',
    occasion: 'wisuda',
    title: 'Graduation Majesty Kebaya Encim Modern',
    subtitle: 'Kearifan Kebaya Sage Green & Songket Gold',
    formality: 'formal',
    venue: 'indoor_ac',
    styleVibe: 'classic',
    isHijabFriendly: true,
    estimatedBudget: 1649000,
    culturalContext: 'Kebaya encim modern warna sage melambangkan pertumbuhan akademis dan masa depan yang segar. Songket champagne mempertegas pencapaian gelar sarjana dengan penuh martabat.',
    weatherAdvice: 'Furing katun pada kebaya melindungi kulit dari panas jubah wisuda, sementara rok lilit satin bergerak luwes saat melangkah ke panggung podium.',
    garmentIds: ['g-kebaya-sage', 'g-rok-lilit-satin'],
    stylingTips: [
      'Sanggul modern rendah atau hijab pashmina clean look dengan sematan bros kecil.',
      'Siapkan sepatu heels berstrap pergelangan kaki agar stabil saat berjalan di tangga podium.',
      'Sediakan kipas angin mini portable untuk momen foto wisuda luar ruangan.'
    ]
  },
  {
    id: 'rec-weekend-1',
    occasion: 'casual_weekend',
    title: 'SCBD Coffee Crawl & Art Gallery Chic',
    subtitle: 'Kemeja Linen Ivory Oversized & Kulot Terracotta',
    formality: 'smart_casual',
    venue: 'indoor_ac',
    styleVibe: 'minimalist',
    isHijabFriendly: true,
    estimatedBudget: 818000,
    culturalContext: 'Gaya effortless ala kaum urban kreatif Jakarta. Kombinasi tekstur linen murni menciptakan estetika visual berkelas tanpa terkesan berdandan berlebihan.',
    weatherAdvice: 'Sangat tahan banting melintasi pedestrian MRT, trotoar panas, hingga kafe sejuk.',
    garmentIds: ['g-linen-shirt-ivory', 'g-kulot-terracotta'],
    stylingTips: [
      'Masukkan separuh kancing depan kemeja (french tuck) ke dalam celana kulot.',
      'Pakai sneakers putih bersih atau sandal Birkenstock kulit.',
      'Kacamata hitam berbingkai tortoise dan tas selempang kanvas etnik.'
    ]
  }
];
