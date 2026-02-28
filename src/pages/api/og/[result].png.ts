import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg, initWasm } from '@resvg/resvg-wasm';
import { decodeResult, isValidResultCode } from '../../../lib/resultEncoder';
import { calculateResultFromScores, blackHole } from '../../../lib/scoring';

export const prerender = false;

// WASM 초기화 상태
let wasmInitialized = false;

async function ensureWasmInitialized() {
  if (!wasmInitialized) {
    const wasmModule = await import('@resvg/resvg-wasm/index_bg.wasm?module');
    await initWasm(wasmModule.default);
    wasmInitialized = true;
  }
}

// 폰트 캐시
let fontData: ArrayBuffer | null = null;

async function loadFont(): Promise<ArrayBuffer> {
  if (fontData) {
    return fontData;
  }

  const response = await fetch(
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf'
  );
  fontData = await response.arrayBuffer();
  return fontData;
}

export const GET: APIRoute = async ({ params }) => {
  const { result } = params;

  // 유효성 검사
  if (!result || !isValidResultCode(result.replace('.png', ''))) {
    return new Response('Invalid result code', { status: 400 });
  }

  const resultCode = result.replace('.png', '');
  const scores = decodeResult(resultCode);
  if (!scores) {
    return new Response('Invalid result code', { status: 400 });
  }

  const testResult = calculateResultFromScores(scores);
  const displayPlanet = testResult.isBlackHole ? blackHole : testResult.mainPlanet;

  try {
    await ensureWasmInitialized();
    const font = await loadFont();

    // Satori로 SVG 생성
    const svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #171717 0%, #2A2A2A 100%)',
            fontFamily: 'Pretendard',
          },
          children: [
            // 상단 로고
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 24,
                  color: '#686868',
                  marginBottom: 24,
                },
                children: '마인드 플래닛',
              },
            },
            // 이모지
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 100,
                  marginBottom: 16,
                },
                children: displayPlanet?.emoji || '🪐',
              },
            },
            // 행성 이름
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 56,
                  color: '#FFFFFF',
                  fontWeight: 700,
                  marginBottom: 12,
                },
                children: displayPlanet?.planetName || '마음 행성',
              },
            },
            // 키워드
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 28,
                  color: '#FF8585',
                  marginBottom: 32,
                },
                children: testResult.isBlackHole
                  ? '"모든 빛을 삼키는 상태"'
                  : `"${testResult.mainPlanet?.keyword || ''}"`,
              },
            },
            // 위성 (블랙홀이 아닐 때)
            !testResult.isBlackHole && testResult.subPlanets.length > 0
              ? {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      gap: 24,
                      marginBottom: 40,
                    },
                    children: testResult.subPlanets.map((planet) => ({
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '12px 20px',
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: 24,
                        },
                        children: [
                          {
                            type: 'span',
                            props: {
                              style: { fontSize: 24 },
                              children: planet.emoji,
                            },
                          },
                          {
                            type: 'span',
                            props: {
                              style: { fontSize: 20, color: '#B9B9B9' },
                              children: planet.planetName,
                            },
                          },
                        ],
                      },
                    })),
                  },
                }
              : null,
            // CTA
            {
              type: 'div',
              props: {
                style: {
                  marginTop: testResult.isBlackHole ? 20 : 0,
                  padding: '16px 40px',
                  background: '#FF8585',
                  borderRadius: 16,
                  color: '#171717',
                  fontSize: 22,
                  fontWeight: 600,
                },
                children: '나도 테스트하기',
              },
            },
          ].filter(Boolean),
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Pretendard',
            data: font,
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );

    // SVG → PNG 변환
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: 'width',
        value: 1200,
      },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return new Response(pngBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('OG Image generation error:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
};
