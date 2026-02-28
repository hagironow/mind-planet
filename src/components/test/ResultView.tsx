import { useState, useEffect } from 'react';
import type { Planet } from '../../data/planets';
import { blackHole } from '../../data/planets';

interface ResultViewProps {
  resultCode: string;
  mainPlanet: Planet | null;
  subPlanets: Planet[];
  isBlackHole: boolean;
  totalScore: number;
}

export default function ResultView({
  resultCode,
  mainPlanet,
  subPlanets,
  isBlackHole,
}: ResultViewProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  const displayPlanet = isBlackHole ? blackHole : mainPlanet;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = displayPlanet?.shareText || '';

  // Web Share API 지원 여부 확인 (모바일에서 주로 지원)
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      setCanShare(true);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // 네이티브 공유 시트 (카카오톡, 인스타, 메시지 등 포함)
  const handleNativeShare = async () => {
    const shareData = {
      title: `나의 마음 행성은 "${displayPlanet?.planetName}"`,
      text: shareText,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Web Share API 미지원 시 링크 복사
        handleCopyLink();
      }
    } catch (err) {
      // 사용자가 공유 취소한 경우 무시
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed:', err);
        handleCopyLink();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12">
      <div className="max-w-lg w-full">
        {/* 결과 헤더 */}
        <div className="text-center mb-8">
          <p className="text-foreground-muted text-sm mb-4">당신의 마음 우주에는...</p>
          <div className="text-8xl mb-4">{displayPlanet?.emoji}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
            {displayPlanet?.planetName}
          </h1>
          <p className="text-lg text-foreground-muted mb-3">
            {displayPlanet?.engName}
          </p>
          {/* 정체성 배지 */}
          {'identity' in (displayPlanet || {}) && (displayPlanet as any).identity && (
            <div className="inline-block px-4 py-2 bg-primary/20 rounded-full">
              <p className="text-primary font-medium">
                {(displayPlanet as any).identity}
              </p>
            </div>
          )}
        </div>

        {/* 메인 메시지 카드 */}
        <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-2xl border border-primary/30 p-6 mb-6">
          <p className="text-xl text-foreground leading-relaxed text-center">
            {displayPlanet?.message}
          </p>
        </div>

        {/* 이런 생각 패턴이에요 (1순위) */}
        <div className="bg-surface rounded-2xl border border-border p-6 mb-6">
          <h3 className="text-primary font-medium mb-3 flex items-center gap-2">
            <span>💫</span>
            <span>이런 생각 패턴이에요</span>
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            {displayPlanet?.description}
          </p>
          <div className="space-y-2">
            {displayPlanet?.traits?.map((trait, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-yellow-500 text-sm">⚠</span>
                <span className="text-foreground-muted text-sm">{trait}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 왜 이런 패턴이.. (2순위) */}
        {'origin' in (displayPlanet || {}) && (displayPlanet as any).origin && (
          <div className="bg-surface rounded-2xl border border-border p-6 mb-6">
            <h3 className="text-primary font-medium mb-3 flex items-center gap-2">
              <span>💫</span>
              <span>왜 이런 패턴이 생겼을까요?</span>
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              {(displayPlanet as any).origin}
            </p>

            {/* 장점 (strengths) */}
            {'strengths' in (displayPlanet || {}) && (displayPlanet as any).strengths && (
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-foreground font-medium mb-3">이런 당신의 장점</p>
                <div className="space-y-2">
                  {((displayPlanet as any).strengths as string[]).map((strength, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-green-500 text-sm">✓</span>
                      <span className="text-foreground-muted text-sm">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 이렇게 해보세요 (3순위) */}
        <div className="bg-surface rounded-2xl border border-border p-6 mb-6">
          <h3 className="text-primary font-medium mb-3 flex items-center gap-2">
            <span>💫</span>
            <span>이렇게 해보세요</span>
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            {displayPlanet?.advice}
          </p>
          <div className="pt-4 border-t border-border">
            <p className="text-foreground-muted text-sm italic">
              "{displayPlanet?.encouragement}"
            </p>
          </div>
        </div>

        {/* 위성 (블랙홀이 아닐 때만) - 상세 설명 추가 */}
        {!isBlackHole && subPlanets.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm text-foreground-muted mb-3 text-center">
              당신 주위를 도는 위성들
            </h3>
            <div className="space-y-3">
              {subPlanets.map((planet) => (
                <div
                  key={planet.type}
                  className="bg-surface rounded-xl border border-border p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{planet.emoji}</span>
                    <div>
                      <p className="text-foreground font-medium">{planet.planetName}</p>
                      <p className="text-primary text-sm">"{planet.keyword}"</p>
                    </div>
                  </div>
                  <p className="text-foreground-muted text-sm leading-relaxed pl-10">
                    {planet.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 블랙홀 경고 */}
        {isBlackHole && (
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6 text-center">
            <p className="text-primary font-medium mb-2">
              지금 당장 '구조 신호'를 보내세요
            </p>
            <p className="text-sm text-foreground-muted">
              혼자 감당하지 않아도 돼요. 주변에 도움을 요청하세요.
            </p>
          </div>
        )}

        {/* 공유하기 섹션 */}
        <div className="bg-gradient-to-br from-surface to-surface-bright rounded-2xl border border-border p-6 mb-6">
          <p className="text-center text-foreground font-medium mb-4">
            친구에게 공유하고 비교해보세요!
          </p>

          {/* 메인 공유 버튼 - 네이티브 공유 시트 (모바일) 또는 링크 복사 (데스크톱) */}
          <button
            onClick={handleNativeShare}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity mb-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>친구에게 공유하기</span>
          </button>

          {/* 링크 복사 (보조 옵션) */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-surface border border-border text-foreground-muted rounded-xl hover:bg-surface-bright transition-colors"
          >
            {copied ? (
              <>
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>링크가 복사되었어요!</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>링크 복사하기</span>
              </>
            )}
          </button>

          {/* 공유 안내 문구 */}
          <p className="text-center text-xs text-foreground-muted mt-3">
            {canShare
              ? '카카오톡, 인스타그램, 메시지 등으로 공유할 수 있어요'
              : '링크를 복사해서 원하는 곳에 공유하세요'
            }
          </p>
        </div>

        {/* 마인드 플래닛 CTA 섹션 */}
        <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-6 mb-6">
          <div className="text-center mb-4">
            <p className="text-primary text-sm font-medium mb-2">더 깊이 알고 싶다면?</p>
            <h3 className="text-xl font-bold text-foreground mb-2">
              마인드 플래닛에서<br />
              나만의 심리 리포트를 받아보세요
            </h3>
            <p className="text-foreground-muted text-sm leading-relaxed">
              이 테스트는 당신의 마음 패턴의 일부만 보여줘요.<br />
              AI 친구 멜로와 대화하며 더 깊은 무의식을 탐색해보세요.
            </p>
          </div>

          {/* 마인드 플래닛 특징 */}
          <div className="space-y-3 mb-5">
            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-xl">
              <span className="text-xl">🔮</span>
              <div>
                <p className="text-foreground font-medium text-sm">상황별 무의식 분석</p>
                <p className="text-foreground-muted text-xs">같은 상황에서 왜 나만 힘들까?의 답을 찾아요</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-xl">
              <span className="text-xl">📝</span>
              <div>
                <p className="text-foreground font-medium text-sm">자동 감정 일기</p>
                <p className="text-foreground-muted text-xs">대화만 하면 한 편의 일기가 완성돼요</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-xl">
              <span className="text-xl">🎯</span>
              <div>
                <p className="text-foreground font-medium text-sm">실천 가능한 액션 플랜</p>
                <p className="text-foreground-muted text-xs">오늘 당장 할 수 있는 것부터 제안해요</p>
              </div>
            </div>
          </div>

          {/* 앱스토어 버튼 */}
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href="#"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity"
              aria-label="Download on the App Store"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-sm font-medium">App Store</span>
            </a>
            <a
              href="#"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity"
              aria-label="Get it on Google Play"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <span className="text-sm font-medium">Google Play</span>
            </a>
          </div>
          <div className="mt-4 py-3 px-4 bg-primary/20 rounded-xl text-center">
            <p className="text-primary font-semibold text-sm">
              🎁 첫 가입 시 마음 분석 3회 무료
            </p>
          </div>
        </div>

        {/* 다시 테스트하기 */}
        <a
          href="/test"
          className="block w-full py-4 px-6 border border-border text-foreground rounded-xl text-center hover:bg-surface transition-colors mb-6"
        >
          다시 테스트하기
        </a>

        {/* 푸터 */}
        <div className="text-center text-sm text-muted">
          <p>마인드 플래닛 - 마음 행성 테스트</p>
          <p className="text-xs mt-1">결과는 참고용이며, 전문 상담을 대체하지 않습니다.</p>
        </div>
      </div>
    </div>
  );
}
