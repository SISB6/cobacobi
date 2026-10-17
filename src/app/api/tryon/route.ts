import { NextRequest, NextResponse } from 'next/server';

interface TryOnRequestBody {
  personImageUrl: string;
  garmentImageUrl: string;
  category: string;
  mode?: 'performance' | 'quality';
  apiKey?: string;
  gpuUrl?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: TryOnRequestBody = await req.json();
    const { personImageUrl, garmentImageUrl, category, mode = 'quality' } = body;

    const apiKey = body.apiKey || process.env.FASHN_API_KEY;
    const gpuUrl = body.gpuUrl || process.env.FASHN_GPU_URL;

    if (!personImageUrl || !garmentImageUrl) {
      return NextResponse.json(
        { error: 'personImageUrl dan garmentImageUrl wajib disertakan.' },
        { status: 400 }
      );
    }

    // 1. If custom Python GPU endpoint is provided (e.g., http://localhost:8000/tryon)
    if (gpuUrl) {
      try {
        const gpuRes = await fetch(`${gpuUrl.replace(/\/$/, '')}/tryon`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            person_image: personImageUrl,
            garment_image: garmentImageUrl,
            category: mapCategoryToFashn(category),
            mode,
          }),
        });

        if (!gpuRes.ok) {
          const gpuErr = await gpuRes.text();
          throw new Error(`GPU inference server returned ${gpuRes.status}: ${gpuErr}`);
        }

        const gpuData = await gpuRes.json();
        return NextResponse.json({
          outputUrl: gpuData.output_url || gpuData.outputUrl,
          status: 'succeeded',
          backend: 'python_gpu_service',
        });
      } catch (err: any) {
        console.error('Custom GPU backend error:', err);
        return NextResponse.json(
          { error: `Gagal memanggil Python GPU server: ${err.message}` },
          { status: 502 }
        );
      }
    }

    // 2. If FASHN.ai Hosted API Key is provided
    if (apiKey) {
      try {
        // Step 1: Initialize job
        const initRes = await fetch('https://api.fashn.ai/v1/run', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model_image: personImageUrl,
            garment_image: garmentImageUrl,
            category: mapCategoryToFashn(category),
            mode,
            nsfw_filter: true,
            cover_feet: false,
            adjust_hands: true,
            restore_background: true,
          }),
        });

        if (!initRes.ok) {
          const initErr = await initRes.json().catch(() => ({}));
          throw new Error(initErr.message || `FASHN API HTTP ${initRes.status}`);
        }

        const initData = await initRes.json();
        const jobId = initData.id;

        // Step 2: Poll status up to 30 attempts (approx 45 seconds)
        let attempts = 0;
        const maxAttempts = 30;
        let finalOutputUrl = '';

        while (attempts < maxAttempts) {
          await new Promise((r) => setTimeout(r, 1500));
          attempts++;

          const statusRes = await fetch(`https://api.fashn.ai/v1/status/${jobId}`, {
            headers: { Authorization: `Bearer ${apiKey}` },
          });

          if (!statusRes.ok) continue;

          const statusData = await statusRes.json();
          if (statusData.status === 'completed' && statusData.output?.[0]) {
            finalOutputUrl = statusData.output[0];
            break;
          } else if (statusData.status === 'failed') {
            throw new Error(statusData.error?.message || 'FASHN VTON inference job gagal dijalankan.');
          }
        }

        if (!finalOutputUrl) {
          throw new Error('FASHN VTON inferensi timeout (melebihi batas waktu 45 detik).');
        }

        return NextResponse.json({
          outputUrl: finalOutputUrl,
          status: 'succeeded',
          jobId,
          backend: 'fashn_v1_5_cloud',
        });
      } catch (err: any) {
        console.error('FASHN API call error:', err);
        return NextResponse.json(
          { error: `FASHN API Error: ${err.message}` },
          { status: 502 }
        );
      }
    }

    // 3. Neither GPU URL nor API key is configured -> Inform client to use Demo Mode
    return NextResponse.json({
      status: 'demo_mode_active',
      message: 'FASHN API Key atau GPU URL belum dikonfigurasi. Menggunakan Studio Demo Engine.',
      outputUrl: garmentImageUrl,
    });
  } catch (err: any) {
    console.error('TryOn route error:', err);
    return NextResponse.json(
      { error: err.message || 'Terjadi kesalahan internal server.' },
      { status: 500 }
    );
  }
}

function mapCategoryToFashn(cat: string): 'tops' | 'bottoms' | 'one-pieces' {
  if (cat === 'bottoms') return 'bottoms';
  if (cat === 'dresses' || cat === 'modestwear' || cat === 'formalwear') return 'one-pieces';
  return 'tops'; // tops, outerwear, batik default to tops
}
