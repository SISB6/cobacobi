# PAKAI — Your AI Fitting Room 👗✨
### Studio Mode Virtual & Interactive Fashion Fitting Room untuk Busana Indonesia

**PAKAI** adalah aplikasi web studio mode virtual interaktif berkualitas produksi yang dirancang khusus untuk busana dan wastra Nusantara (Batik Tulis, Tenun Sumba, Kebaya modern, linen kasual, dan modestwear/hijab).

---

## 🌟 Fitur Unggulan

### 1. Virtual Fitting Room Berbasis AI
- **Unggah & Preview Foto Pengguna**: Validasi format (JPG, PNG, WEBP), batas ukuran file (<10MB), dan privasi penuh.
- **5 Model Foto Bawaan (Presets)**: Siti (Casual Modest Bandung), Alya (Hijab Chic Yogyakarta), Raka (Smart Casual Pria Jakarta), Dian (Editorial Glamour Surabaya), Bima (Batik Tradisional Solo).
- **Katalog Busana Interaktif**: Kategori Tops, Bottoms, Dresses, Outerwear, Batik & Wastra, Formalwear, dan Modestwear.
- **Simulasi AI Photorealistic (FASHN VTON v1.5 Pipeline)**:
  - Preservasi pose, identitas wajah, proporsi bahu, dan rona kulit sawo matang/kuning langsat.
  - Alur proses 4 tahap: Analisis pose & landmark &rarr; Warp & tekstur kain &rarr; Rendering pencahayaan difusi &rarr; Blending identitas wajah.
  - Mode **Studio Demo Engine** (tanpa biaya GPU) dan mode **FASHN v1.5 Live AI** (Cloud API atau Python GPU Server).
- **Komparasi Before / After**: Slider split interaktif (drag geser kiri-kanan), mode berdampingan (*side-by-side*), dan zoom 100%–200%.
- **Unggah Pakaian Sendiri**: Pengguna dapat mengunggah foto baju dari lemari sendiri atau e-commerce (Tokopedia/Shopee) untuk dicoba langsung!
- **Look Actions**: Simpan ke Lookbook, Favoritkan, Unduh Kartu Mode Resolusi Tinggi (HD), dan Duel di Look Battle.

### 2. Dress for the Occasion (Signature Feature)
Kurasi rekomendasi busana untuk **10 momen penting masyarakat Indonesia**:
1. **Kondangan** (Resepsi Pernikahan Ballroom / Garden Party)
2. **Lebaran** (Silaturahmi Idul Fitri & Open House)
3. **Bukber** (Buka Puasa Bersama Teman & Kantor)
4. **Wisuda** (Kelulusan Akademis & Foto Studio)
5. **Lamaran** (Prosesi Tunangan Adat & Modern)
6. **Kerja / Rapat** (Executive 9-to-5 & Pitching Klien)
7. **Interview** (Wawancara Kerja Profesional)
8. **Acara Keluarga** (Arisan Trah & Kumpul Sanak Famili)
9. **Liburan** (Resort Tropis, Pantai Bali & Staycation)
10. **Casual Weekend** (Coffee Walk Kemang & Galeri Seni)

Setiap momen dilengkapi:
- **Etika Adat & Kearifan Budaya**: Penjelasan filosofi motif wastra (motif Parang, Truntum, Sekar Jagad) dan warna yang pantas.
- **Saran Cuaca & Kenyamanan Tropis**: Pemilihan serat kain breathable (katun sutra, linen rami, organza silk) agar bebas gerah di suhu 32°C.
- **Filter Cerdas**: Tingkat formalitas, venue (Indoor AC vs Outdoor Tropis), preferensi hijab, dan rentang budget Rupiah.
- **1-Click Try-On**: Setiap item busana yang direkomendasikan dapat langsung dicoba pada foto pengguna.

### 3. One Piece, Many Ways (Satu Pakaian, Ragam Gaya)
- Pengguna memilih 1 pakaian jangkar (*anchor garment*), misalnya *Long Kimono Outer Tenun Ikat Sumba* atau *Blazer Batik Parang Indigo*.
- AI menghasilkan **4 transformasi gaya berbeda**:
  - *Gaya 1: 9-to-5 Executive Heritage (Kantor & Rapat)*
  - *Gaya 2: Saturday Coffee Walk (Casual & Santai)*
  - *Gaya 3: Malam Resepsi Kondangan Ballroom (Glamour & Royal)*
  - *Gaya 4: Tropical Resort Sunset Lounge (Liburan Eksotis)*
- Dilengkapi paduan item bawahan, sepatu, tas, aksesoris, palet warna, dan tips stylist profesional.

### 4. Mix & Match Studio
- Kanvas visual tiga lapis (Outerwear + Top + Bottom).
- Perhitungan **Skor Harmoni Gaya & Warna (0–100%)** secara real-time.
- Tombol acak kombinasi otomatis dan tombol langsung kirim ke fitting room.

### 5. Look Battle & My Lookbook
- **Look Battle**: Pilih 2 hingga 4 outfit tersimpan untuk dibandingkan secara head-to-head. Pilih outfit pemenang dengan pesta konfeti selebrasi!
- **My Lookbook**: Folder koleksi (Kondangan, Kantor, Favorit), cetak kartu mode digital beresolusi tinggi (HD).

### 6. My Style DNA
- Analisis personal warna: Warm Autumn, Cool Summer, Deep Winter, Bright Spring.
- Preferensi siluet tubuh, tinggi badan, dan toggle modestwear/hijab.

### 7. Fashion Journal
- Artikel editorial gaya majalah mode bergengsi seputar seni wastra Nusantara, tips kondangan outdoor anti-gerah, dan analisis rona kulit sawo matang.

### 8. Studio Backstage Admin CMS
- Akses PIN terproteksi (Default: **`1234`**).
- Manajemen CRUD pakaian lengkap (nama, kategori, harga IDR, material kain, status draft/publish, featured toggle).
- Pengunggah media dengan pratinjau langsung.
- Perubahan yang disimpan langsung sinkron secara instan ke aplikasi publik.

---

## 🛠️ Arsitektur Teknologi

- **Frontend & Server**: Next.js 16.4.2 (App Router), React 19, TypeScript 5, Tailwind CSS v4.
- **Desain & Tipografi**: Editorial Fashion Serif (`Playfair Display`), Sans Modern (`Plus Jakarta Sans`), Lucide Icons, Glassmorphism, Micro-animations.
- **Integrasi Database & Storage**: Supabase JS Client (`src/lib/supabase.ts`) dengan fallback penyimpanan reaktif lokal.
- **AI Virtual Try-On Pipeline**:
  - Kompatibel penuh dengan **FASHN VTON v1.5** ([GitHub](https://github.com/fashn-AI/fashn-vton-1.5) | [Hugging Face](https://huggingface.co/fashn-ai/fashn-vton-1.5)).
  - Layanan Python GPU FastAPI mandiri (`fashn_server.py`).
  - Next.js API Route `/api/tryon` dengan penanganan polling asinkron.

---

## 🚀 Panduan Menjalankan Aplikasi

### 1. Menjalankan Aplikasi Web (Next.js)
```bash
# Jalankan server pengembangan pada port 3005:
npm run dev -- -p 3005

# Buka peramban:
# http://localhost:3005
```

Atau untuk build produksi:
```bash
npm run build
npm start -- -p 3005
```

### 2. Mengakses Halaman Penting
- **Beranda (Editorial Landing)**: `http://localhost:3005/`
- **Virtual Fitting Room**: `http://localhost:3005/fitting-room`
- **Dress for the Occasion**: `http://localhost:3005/occasions`
- **One Piece, Many Ways**: `http://localhost:3005/one-piece-many-ways`
- **Mix & Match Studio**: `http://localhost:3005/mix-match`
- **My Lookbook & Look Battle**: `http://localhost:3005/lookbook`
- **Fashion Journal**: `http://localhost:3005/journal`
- **Admin CMS Backstage**: `http://localhost:3005/admin` *(PIN: `1234`)*

### 3. Menjalankan Layanan Python GPU FASHN VTON 1.5 (Opsional)
Jika Anda memiliki komputer atau server cloud dengan GPU NVIDIA (VRAM &ge; 16GB, misal RTX 3090/4090, A100, atau RunPod):
```bash
# Instal dependensi Python:
pip install fastapi uvicorn torch torchvision diffusers transformers accelerate pillow requests pydantic

# Jalankan server:
python3 fashn_server.py --port 8000
```
Lalu di aplikasi web PAKAI:
1. Klik tombol **Gear / Status AI** di navbar kanan atas.
2. Aktifkan **Live AI Inference**.
3. Masukkan URL GPU: `http://localhost:8000`.

### 4. Menghubungkan ke FASHN.ai Cloud Hosted API (Opsional)
Jika menggunakan FASHN.ai API resmi:
1. Dapatkan kunci API dari [fashn.ai](https://fashn.ai).
2. Di aplikasi PAKAI, buka Drawer Pengaturan AI.
3. Masukkan kunci Anda pada kolom **FASHN.ai Hosted API Key** atau atur file `.env.local`:
   ```env
   FASHN_API_KEY=fa_live_xxxxxxxxxxxxxxxxxxxxxxxx
   ```

*Catatan: Tanpa GPU atau API Key eksternal, aplikasi tetap berfungsi 100% menggunakan **Studio Demo Engine** dengan sintesis fotorealistis.*

### 5. Menghubungkan ke Supabase (Opsional)
Buat berkas `.env.local` jika ingin menyinkronkan data ke PostgreSQL dan Storage Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🔒 Privasi & Etika Data

- **Persetujuan Eksplisit**: Modal persetujuan privasi wajib sebelum memproses foto pribadi pengguna.
- **Penyimpanan Privat Sesi**: Foto tidak dibagikan ke pihak ketiga mana pun.
- **Bukan untuk Training Model**: Foto pengguna tidak pernah digunakan untuk melatih model publik.
- **Kontrol Penghapusan Mandiri**: Tombol tempat sampah (*trash*) di header dapat langsung menghapus semua foto pribadi dan riwayat sesi secara permanen.
- **Disclaimer**: Simulasi try-on adalah representasi komputer berbasis AI dan bukan jaminan ukuran fisik atau kelenturan kain di dunia nyata.
