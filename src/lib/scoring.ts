import { planets, blackHole, DISTORTION_ORDER, type DistortionType, type Planet } from '../data/planets';
import { questions } from '../data/questions';

export interface TestResult {
  scores: Record<DistortionType, number>;
  totalScore: number;
  mainPlanet: Planet;
  subPlanets: Planet[];
  isBlackHole: boolean;
}

export function calculateScores(answers: number[]): Record<DistortionType, number> {
  const scores = {} as Record<DistortionType, number>;

  // 모든 타입을 0으로 초기화
  DISTORTION_ORDER.forEach((type) => {
    scores[type] = 0;
  });

  // 각 답변을 해당 인지왜곡 점수에 합산
  questions.forEach((question, index) => {
    const answer = answers[index] ?? 0;
    scores[question.distortionType] += answer;
  });

  return scores;
}

export function calculateResult(answers: number[]): TestResult {
  const scores = calculateScores(answers);

  // 총점 계산
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  // 히든 결과 (블랙홀) 체크
  // 조건: 총점 80점 이상 또는 8점 이상인 항목이 5개 이상
  const highScoreCount = Object.values(scores).filter((score) => score >= 8).length;
  const isBlackHole = totalScore >= 80 || highScoreCount >= 5;

  // 순위 정렬 (점수 내림차순, 동점 시 priority 오름차순)
  const sortedTypes = Object.entries(scores)
    .sort(([typeA, scoreA], [typeB, scoreB]) => {
      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }
      const priorityA = planets.find((p) => p.type === typeA)?.priority ?? 99;
      const priorityB = planets.find((p) => p.type === typeB)?.priority ?? 99;
      return priorityA - priorityB;
    })
    .map(([type]) => type as DistortionType);

  // 결과 행성 선정
  const mainPlanet = planets.find((p) => p.type === sortedTypes[0])!;
  const subPlanets = sortedTypes.slice(1, 3).map((type) => planets.find((p) => p.type === type)!);

  return {
    scores,
    totalScore,
    mainPlanet,
    subPlanets,
    isBlackHole,
  };
}

export function calculateResultFromScores(scores: Record<DistortionType, number>): TestResult {
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const highScoreCount = Object.values(scores).filter((score) => score >= 8).length;
  const isBlackHole = totalScore >= 80 || highScoreCount >= 5;

  const sortedTypes = Object.entries(scores)
    .sort(([typeA, scoreA], [typeB, scoreB]) => {
      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }
      const priorityA = planets.find((p) => p.type === typeA)?.priority ?? 99;
      const priorityB = planets.find((p) => p.type === typeB)?.priority ?? 99;
      return priorityA - priorityB;
    })
    .map(([type]) => type as DistortionType);

  const mainPlanet = planets.find((p) => p.type === sortedTypes[0])!;
  const subPlanets = sortedTypes.slice(1, 3).map((type) => planets.find((p) => p.type === type)!);

  return {
    scores,
    totalScore,
    mainPlanet,
    subPlanets,
    isBlackHole,
  };
}

export { blackHole };
