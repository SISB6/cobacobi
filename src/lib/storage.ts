'use client';

import { Garment, IndonesianOccasion, OccasionRecommendation, TryOnResult, StyleDNAProfile, FashionArticle, UserPhoto } from '@/types';
import { INITIAL_GARMENTS, DEMO_USER_PHOTOS } from '@/data/mockGarments';
import { OCCASION_RECOMMENDATIONS } from '@/data/mockOccasions';
import { INITIAL_ARTICLES } from '@/data/mockArticles';

const KEYS = {
  GARMENTS: 'pakai_garments_v1',
  USER_PHOTOS: 'pakai_user_photos_v1',
  ACTIVE_PHOTO_ID: 'pakai_active_photo_id_v1',
  TRY_ON_RESULTS: 'pakai_tryon_results_v1',
  RECOMMENDATIONS: 'pakai_recommendations_v1',
  ARTICLES: 'pakai_articles_v1',
  STYLE_DNA: 'pakai_style_dna_v1',
  FAVORITES: 'pakai_favorites_v1',
  LOOKBOOK_FOLDERS: 'pakai_lookbook_folders_v1',
  CONSENT_GIVEN: 'pakai_photo_consent_v1',
  API_CONFIG: 'pakai_api_config_v1',
};

export interface ApiConfig {
  fashnApiKey: string;
  customGpuUrl: string;
  useLiveAi: boolean;
  modelQuality: 'performance' | 'quality';
}

export const DEFAULT_STYLE_DNA: StyleDNAProfile = {
  name: 'Tamu Mode PAKAI',
  skinTone: 'sawo_matang',
  colorSeason: 'warm_autumn',
  bodySilhouette: 'relaxed_oversized',
  isHijab: false,
  favoriteVibe: 'wastra_modern',
  heightCm: 165,
  preferredPalette: ['#b45309', '#7c2d12', '#fdfbf7', '#1e293b', '#84a98c'],
};

export const DEFAULT_API_CONFIG: ApiConfig = {
  fashnApiKey: '',
  customGpuUrl: '',
  useLiveAi: false,
  modelQuality: 'quality',
};

// Safe localStorage helper
function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('pakai_data_updated', { detail: { key } }));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

// Garments CRUD
export function getGarments(): Garment[] {
  return safeGet<Garment[]>(KEYS.GARMENTS, INITIAL_GARMENTS);
}

export function saveGarments(garments: Garment[]): void {
  safeSet(KEYS.GARMENTS, garments);
}

export function addGarment(garment: Omit<Garment, 'id' | 'createdAt'>): Garment {
  const all = getGarments();
  const newGarment: Garment = {
    ...garment,
    id: `g-custom-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  saveGarments([newGarment, ...all]);
  return newGarment;
}

export function updateGarment(id: string, updates: Partial<Garment>): Garment | null {
  const all = getGarments();
  const index = all.findIndex((g) => g.id === id);
  if (index === -1) return null;
  const updated = { ...all[index], ...updates };
  all[index] = updated;
  saveGarments([...all]);
  return updated;
}

export function deleteGarment(id: string): void {
  const all = getGarments();
  saveGarments(all.filter((g) => g.id !== id));
}

export function resetGarmentsToDefault(): void {
  saveGarments(INITIAL_GARMENTS);
}

// User Photos
export function getUserPhotos(): UserPhoto[] {
  return safeGet<UserPhoto[]>(KEYS.USER_PHOTOS, DEMO_USER_PHOTOS);
}

export function saveUserPhotos(photos: UserPhoto[]): void {
  safeSet(KEYS.USER_PHOTOS, photos);
}

export function addUserPhoto(photo: Omit<UserPhoto, 'id'>): UserPhoto {
  const all = getUserPhotos();
  const newPhoto: UserPhoto = {
    ...photo,
    id: `photo-user-${Date.now()}`,
    isPreset: false,
  };
  saveUserPhotos([newPhoto, ...all]);
  setActivePhotoId(newPhoto.id);
  return newPhoto;
}

export function getActivePhotoId(): string {
  return safeGet<string>(KEYS.ACTIVE_PHOTO_ID, DEMO_USER_PHOTOS[0].id);
}

export function setActivePhotoId(id: string): void {
  safeSet(KEYS.ACTIVE_PHOTO_ID, id);
}

export function deleteUserPhoto(id: string): void {
  const all = getUserPhotos();
  const filtered = all.filter((p) => p.id !== id);
  saveUserPhotos(filtered);
  const currentActive = getActivePhotoId();
  if (currentActive === id && filtered.length > 0) {
    setActivePhotoId(filtered[0].id);
  }
}

export function wipeAllPersonalPhotos(): void {
  // Privacy feature: wipe only user-uploaded photos and keep presets
  const presetsOnly = DEMO_USER_PHOTOS;
  saveUserPhotos(presetsOnly);
  setActivePhotoId(presetsOnly[0].id);
  safeSet(KEYS.TRY_ON_RESULTS, []);
  if (typeof window !== 'undefined') {
    localStorage.removeItem(KEYS.CONSENT_GIVEN);
  }
}

// Try-On Results History
export function getTryOnResults(): TryOnResult[] {
  return safeGet<TryOnResult[]>(KEYS.TRY_ON_RESULTS, []);
}

export function saveTryOnResult(result: TryOnResult): void {
  const all = getTryOnResults();
  const updated = [result, ...all.filter((r) => r.id !== result.id)].slice(0, 30); // keep last 30
  safeSet(KEYS.TRY_ON_RESULTS, updated);
}

export function toggleFavoriteResult(id: string): void {
  const all = getTryOnResults();
  const updated = all.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  safeSet(KEYS.TRY_ON_RESULTS, updated);
}

export function deleteTryOnResult(id: string): void {
  const all = getTryOnResults();
  safeSet(KEYS.TRY_ON_RESULTS, all.filter((r) => r.id !== id));
}

// Style DNA
export function getStyleDNA(): StyleDNAProfile {
  return safeGet<StyleDNAProfile>(KEYS.STYLE_DNA, DEFAULT_STYLE_DNA);
}

export function saveStyleDNA(profile: StyleDNAProfile): void {
  safeSet(KEYS.STYLE_DNA, profile);
}

// Occasion Recommendations
export function getOccasionRecommendations(): OccasionRecommendation[] {
  return safeGet<OccasionRecommendation[]>(KEYS.RECOMMENDATIONS, OCCASION_RECOMMENDATIONS);
}

export function saveOccasionRecommendations(recs: OccasionRecommendation[]): void {
  safeSet(KEYS.RECOMMENDATIONS, recs);
}

// Articles
export function getArticles(): FashionArticle[] {
  return safeGet<FashionArticle[]>(KEYS.ARTICLES, INITIAL_ARTICLES);
}

export function saveArticles(articles: FashionArticle[]): void {
  safeSet(KEYS.ARTICLES, articles);
}

// Consent
export function hasGivenPhotoConsent(): boolean {
  return safeGet<boolean>(KEYS.CONSENT_GIVEN, false);
}

export function setPhotoConsent(given: boolean): void {
  safeSet(KEYS.CONSENT_GIVEN, given);
}

// API Config
export function getApiConfig(): ApiConfig {
  return safeGet<ApiConfig>(KEYS.API_CONFIG, DEFAULT_API_CONFIG);
}

export function saveApiConfig(config: ApiConfig): void {
  safeSet(KEYS.API_CONFIG, config);
}
