import { useState, useEffect } from 'react';
import { questionsByAge, TOTAL_QUESTIONS, type AgeGroup } from '../../data/questions';
import { calculateScores } from '../../lib/scoring';
import { encodeResult } from '../../lib/resultEncoder';

type TestPhase = 'intro' | 'age_selection' | 'testing' | 'calculating';

const STORAGE_KEY = 'mindplanet_test_progress';
const AGE_STORAGE_KEY = 'mindplanet_age_group';

const SCORE_OPTIONS = [
  { score: 1, label: '매우 아니다' },
  { score: 2, label: '아니다' },
  { score: 3, label: '보통' },
  { score: 4, label: '그렇다' },
  { score: 5, label: '매우 그렇다' },
];

const AGE_OPTIONS: { value: AgeGroup; label: string; emoji: string }[] = [
  { value: 'teens', label: '10대', emoji: '🎒' },
  { value: 'twenties', label: '20대', emoji: '🎓' },
  { value: 'thirties', label: '30대', emoji: '💼' },
  { value: 'forties_plus', label: '40대 이상', emoji: '🌳' },
];

export default function TestContainer() {
  const [phase, setPhase] = useState<TestPhase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(AGE_STORAGE_KEY);
      if (saved && ['teens', 'twenties', 'thirties', 'forties_plus'].includes(saved)) {
        return saved as AgeGroup;
      }
    }
    return null;
  });
  const [answers, setAnswers] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    if (answers.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]);

  useEffect(() => {
    if (ageGroup) {
      localStorage.setItem(AGE_STORAGE_KEY, ageGroup);
    }
  }, [ageGroup]);

  const handleStart = () => {
    // 기존 진행 상황이 있고, 연령대도 저장되어 있으면 바로 테스트로
    if (answers.length > 0 && ageGroup) {
      setCurrentIndex(Math.min(answers.length, TOTAL_QUESTIONS - 1));
      setPhase('testing');
    } else {
      // 새로 시작하거나 연령대가 없으면 연령대 선택으로
      setPhase('age_selection');
    }
  };

  const handleRestart = () => {
    setAnswers([]);
    setCurrentIndex(0);
    setAgeGroup(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(AGE_STORAGE_KEY);
    setPhase('age_selection');
  };

  const handleAgeSelect = (age: AgeGroup) => {
    setAgeGroup(age);
    setPhase('testing');
  };

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = score;
    setAnswers(newAnswers);

    if (currentIndex === TOTAL_QUESTIONS - 1) {
      setPhase('calculating');
      setTimeout(() => {
        const scores = calculateScores(newAnswers);
        const resultCode = encodeResult(scores);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(AGE_STORAGE_KEY);
        window.location.href = `/test/${resultCode}`;
      }, 1500);
    } else {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 400);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const questions = ageGroup ? questionsByAge[ageGroup] : questionsByAge.twenties;
  const progress = ((currentIndex + 1) / TOTAL_QUESTIONS) * 100;
  const currentQuestion = questions[currentIndex];

  // 인트로 화면
  if (phase === 'intro') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">🪐</div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            마음 행성 테스트
          </h1>
          <p className="text-xl text-primary mb-2">"당신의 마음 속 지배 행성은?"</p>
          <p className="text-foreground-muted mb-8">
            24개 문항으로 알아보는 나의 마음 패턴
            <br />
            <span className="text-sm">(약 3~5분 소요)</span>
          </p>

          <div className="space-y-3">
            <button
              onClick={handleStart}
              className="w-full py-4 px-6 bg-primary text-background font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              {answers.length > 0 && ageGroup ? '이어서 하기' : '테스트 시작하기'}
            </button>
            {answers.length > 0 && ageGroup && (
              <button
                onClick={handleRestart}
                className="w-full py-3 px-6 border border-border text-foreground-muted rounded-xl hover:bg-surface transition-colors"
              >
                처음부터 다시하기
              </button>
            )}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 text-sm text-foreground-muted">
            <div className="p-4 bg-surface rounded-xl">
              <div className="text-2xl mb-2">🔮</div>
              <p>12가지 마음 패턴</p>
            </div>
            <div className="p-4 bg-surface rounded-xl">
              <div className="text-2xl mb-2">🌙</div>
              <p>숨겨진 위성 발견</p>
            </div>
            <div className="p-4 bg-surface rounded-xl">
              <div className="text-2xl mb-2">🕳️</div>
              <p>히든 결과</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 연령대 선택 화면
  if (phase === 'age_selection') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="text-5xl mb-6">🎂</div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            연령대를 선택해주세요
          </h2>
          <p className="text-foreground-muted mb-8">
            더 공감되는 상황으로 테스트를 진행합니다
          </p>

          <div className="grid grid-cols-2 gap-4">
            {AGE_OPTIONS.map(({ value, label, emoji }) => (
              <button
                key={value}
                onClick={() => handleAgeSelect(value)}
                className="p-6 bg-surface border border-border rounded-2xl hover:border-primary hover:bg-surface/80 transition-all group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {emoji}
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {label}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setPhase('intro')}
            className="mt-8 text-foreground-muted hover:text-foreground transition-colors"
          >
            ← 뒤로 가기
          </button>
        </div>
      </div>
    );
  }

  // 계산 중 화면
  if (phase === 'calculating') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-pulse">🪐</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            당신의 마음 우주를 분석 중...
          </h2>
          <p className="text-foreground-muted">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  // 테스트 진행 화면
  return (
    <div className="min-h-screen flex flex-col">
      {/* 진행 바 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-foreground-muted">
              {currentIndex + 1} / {TOTAL_QUESTIONS}
            </span>
            <span className="text-sm text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 문항 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-8">
        <div className="max-w-2xl w-full">
          {/* 상황 + 질문 */}
          <div className="mb-10">
            <p className="text-sm text-primary font-medium mb-3">
              Q{currentIndex + 1} - {currentQuestion.situation}
            </p>
            <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
              {currentQuestion.thought}
            </p>
          </div>

          {/* 라디오 버튼 스타일 점수 선택 */}
          <div className="mb-6">
            {/* 라디오 버튼 그룹 */}
            <div className="flex items-end justify-between gap-1 md:gap-2">
              {SCORE_OPTIONS.map(({ score, label }, index) => {
                const isSelected = answers[currentIndex] === score;
                // 버튼 크기: 양 끝이 크고, 중앙(보통)이 가장 작음
                const sizeClass = index === 0 || index === 4
                  ? 'w-12 h-12 md:w-14 md:h-14'
                  : index === 1 || index === 3
                    ? 'w-10 h-10 md:w-11 md:h-11'
                    : 'w-8 h-8 md:w-9 md:h-9';

                return (
                  <div key={score} className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleAnswer(score)}
                      className={`${sizeClass} rounded-full border-2 transition-all duration-200 flex items-center justify-center
                        ${
                          isSelected
                            ? 'border-primary bg-primary'
                            : 'border-border bg-transparent hover:border-primary/50'
                        }`}
                      aria-label={label}
                    >
                      {/* 내부 원 (선택됨 표시) */}
                      <span
                        className={`rounded-full transition-all duration-200 ${
                          isSelected
                            ? 'w-3 h-3 md:w-4 md:h-4 bg-background'
                            : 'w-0 h-0'
                        }`}
                      />
                    </button>
                    {/* 라벨 (모두 표시) */}
                    <span className="text-xs text-foreground-muted text-center whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 이전 버튼 */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="mt-4 text-foreground-muted hover:text-foreground transition-colors"
            >
              ← 이전 문항
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
