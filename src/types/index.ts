export type Category = 
  | 'tops' 
  | 'bottoms' 
  | 'dresses' 
  | 'outerwear' 
  | 'batik' 
  | 'formalwear' 
  | 'modestwear';

export type IndonesianOccasion = 
  | 'kondangan' 
  | 'lebaran' 
  | 'bukber' 
  | 'wisuda' 
  | 'lamaran' 
  | 'kerja' 
  | 'interview' 
  | 'acara_keluarga' 
  | 'liburan' 
  | 'casual_weekend';

export type FormalityLevel = 'casual' | 'smart_casual' | 'semi_formal' | 'formal';
export type VenueType = 'indoor_ac' | 'outdoor_tropis' | 'semi_outdoor';
export type StyleVibe = 'minimalist' | 'wastra_modern' | 'edgy' | 'feminine' | 'classic';
export type ModestPreference = 'hijab_friendly' | 'modest_non_hijab' | 'open_flexible';

export interface Garment {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number; // in IDR (Rupiah)
  imageUrl: string;
  tryOnOverlayUrl?: string; // High-res transparent alpha cut or model mask
  description: string;
  fabric: string; // e.g., 'Katun Sutra ATBM', 'Linen Rami Adem', 'Satin Silk Viscose'
  colors: string[];
  occasions: IndonesianOccasion[];
  formality: FormalityLevel;
  isModestFriendly: boolean;
  isFeatured?: boolean;
  status: 'published' | 'draft';
  stock?: number;
  tags: string[];
  createdAt: string;
}

export interface UserPhoto {
  id: string;
  url: string;
  name: string;
  isPreset?: boolean;
  gender?: 'female' | 'male' | 'unisex';
  skinTone?: 'sawo_matang' | 'kuning_langsat' | 'putih_gading';
  isHijab?: boolean;
  height?: string;
  city?: string;
}

export interface TryOnResult {
  id: string;
  userPhotoUrl: string;
  garmentId: string;
  garmentName: string;
  garmentImageUrl: string;
  garmentPrice: number;
  resultImageUrl: string;
  createdAt: string;
  occasionTag?: IndonesianOccasion;
  isFavorite: boolean;
  rating?: number;
  notes?: string;
  method: 'fashn_v1_5' | 'studio_synthesis';
}

export interface OccasionRecommendation {
  id: string;
  occasion: IndonesianOccasion;
  title: string;
  subtitle: string;
  formality: FormalityLevel;
  venue: VenueType;
  styleVibe: StyleVibe;
  isHijabFriendly: boolean;
  estimatedBudget: number; // in IDR
  culturalContext: string; // Indonesian cultural explanation
  weatherAdvice: string; // Indonesian weather / humidity tip
  garmentIds: string[]; // Garments in this outfit
  stylingTips: string[];
}

export interface OnePieceStyleVariation {
  id: string;
  modeTitle: string; // e.g., "9-to-5 Executive Workwear"
  vibe: string;
  situation: string;
  description: string;
  pairedGarments: {
    role: 'Atasan' | 'Bawahan' | 'Outer' | 'Sepatu/Tas' | 'Hijab/Aksesoris';
    name: string;
    description: string;
    garmentId?: string;
  }[];
  colorPalette: string[];
  proTip: string;
  tryOnResultPreview?: string;
}

export interface StyleDNAProfile {
  name: string;
  skinTone: 'sawo_matang' | 'kuning_langsat' | 'putih_gading' | 'cerah';
  colorSeason: 'warm_autumn' | 'cool_summer' | 'bright_spring' | 'deep_winter';
  bodySilhouette: 'relaxed_oversized' | 'tailored_slim' | 'modest_flowy' | 'structured';
  isHijab: boolean;
  favoriteVibe: StyleVibe;
  heightCm: number;
  preferredPalette: string[];
}

export interface FashionArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown or rich text
  coverImage: string;
  category: 'Wastra Nusantara' | 'Occasion Guide' | 'Color Theory' | 'Style Hacks';
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featuredGarmentIds: string[];
  publishedAt: string;
  isPublished: boolean;
}

export interface TryOnJobRequest {
  personImageUrl: string;
  garmentImageUrl: string;
  category: Category;
  mode?: 'performance' | 'quality';
  coverFeet?: boolean;
  adjustHands?: boolean;
  restoreBackground?: boolean;
}

export interface TryOnJobResponse {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed';
  outputUrl?: string;
  error?: string;
  progressPercent: number;
  durationSeconds?: number;
}
