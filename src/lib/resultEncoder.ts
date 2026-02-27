import { DISTORTION_ORDER, type DistortionType } from '../data/planets';

// Base62 문자셋 (0-9, A-Z, a-z가 아닌 0-9, A 대신 단순 0-10 → 0-A 매핑)
// 점수 범위: 0-10 (각 인지왜곡당 2문항 × 최대 5점)
const CHARS = '0123456789A';

/**
 * 점수 객체를 URL-safe한 12자리 코드로 인코딩
 * 각 인지왜곡 점수(0-10)를 한 자리 문자로 변환
 * 예: { emotional_reasoning: 5, dichotomous_thinking: 10, ... } → "5A..."
 */
export function encodeResult(scores: Record<DistortionType, number>): string {
  return DISTORTION_ORDER.map((type) => {
    const score = Math.min(10, Math.max(0, scores[type] ?? 0));
    return CHARS[score];
  }).join('');
}

/**
 * 12자리 코드를 점수 객체로 디코딩
 * 예: "5A3721004823" → { emotional_reasoning: 5, dichotomous_thinking: 10, ... }
 */
export function decodeResult(code: string): Record<DistortionType, number> | null {
  if (!code || code.length !== 12) {
    return null;
  }

  const scores = {} as Record<DistortionType, number>;

  for (let i = 0; i < DISTORTION_ORDER.length; i++) {
    const char = code[i];
    const score = CHARS.indexOf(char);

    if (score === -1) {
      return null; // 유효하지 않은 문자
    }

    scores[DISTORTION_ORDER[i]] = score;
  }

  return scores;
}

/**
 * 결과 코드 유효성 검사
 */
export function isValidResultCode(code: string): boolean {
  if (!code || code.length !== 12) {
    return false;
  }

  return code.split('').every((char) => CHARS.includes(char));
}
