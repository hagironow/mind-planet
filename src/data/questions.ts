import type { DistortionType } from './planets';

export interface Question {
  id: number;
  situation: string;  // 상황
  thought: string;    // 속마음 (질문)
  distortionType: DistortionType;
}

// 24문항: 각 인지왜곡당 2문항씩
export const questions: Question[] = [
  // 1. 흑백논리 (All-or-Nothing Thinking)
  {
    id: 1,
    situation: '다이어트 중인데 참지 못하고 도넛을 하나 먹어버렸다.',
    thought: '"오늘 식단은 완전히 망했어. 에라 모르겠다, 그냥 오늘 밤은 다 먹자."',
    distortionType: 'all_or_nothing',
  },
  {
    id: 2,
    situation: '자격증 시험에서 커트라인은 넘겼지만, 목표했던 고득점은 받지 못했다.',
    thought: '"1등이 아니면 무슨 소용이야. 난 실패한 거나 다름없어."',
    distortionType: 'all_or_nothing',
  },

  // 2. 과잉 일반화 (Overgeneralization)
  {
    id: 3,
    situation: '마음에 드는 이성에게 애프터 신청을 거절당했다.',
    thought: '"난 항상 이래. 앞으로 평생 아무도 나를 좋아하지 않을 거야."',
    distortionType: 'overgeneralization',
  },
  {
    id: 4,
    situation: '출근길에 지갑을 두고 와서 다시 집에 다녀왔다.',
    thought: '"아침부터 꼬이네. 오늘은 하루 종일 재수 없는 날이 될 거야."',
    distortionType: 'overgeneralization',
  },

  // 3. 정신적 여과 (Mental Filter)
  {
    id: 5,
    situation: '발표가 끝난 후 10명이 칭찬했는데, 1명이 졸고 있는 걸 봤다.',
    thought: '"저 사람 표정 봤어? 오늘 발표는 완전히 지루했던 게 분명해."',
    distortionType: 'mental_filter',
  },
  {
    id: 6,
    situation: '즐거운 여행 중이었는데, 식당 음식이 맛이 없었다.',
    thought: '"점심을 망쳤으니 오늘 여행은 최악이야."',
    distortionType: 'mental_filter',
  },

  // 4. 긍정 격하 (Disqualifying the Positive)
  {
    id: 7,
    situation: '주변 사람들이 "너 정말 성격 좋다"라고 칭찬했다.',
    thought: '"그건 내가 겉으로만 친절한 척해서 그래. 진짜 내 모습을 알면 실망할걸."',
    distortionType: 'disqualifying_positive',
  },
  {
    id: 8,
    situation: '어려운 프로젝트를 성공적으로 마쳤다.',
    thought: '"이번엔 운이 좋았을 뿐이야. 누구나 할 수 있는 일이었어."',
    distortionType: 'disqualifying_positive',
  },

  // 5. 독심술 (Mind Reading)
  {
    id: 9,
    situation: '친구에게 카톡을 보냈는데 \'1\'이 없어지고 답장이 없다.',
    thought: '"읽고 씹네? 내가 뭐 실수했나? 나한테 화난 게 틀림없어."',
    distortionType: 'mind_reading',
  },
  {
    id: 10,
    situation: '복도를 지나가는데 동료들이 웃으며 이야기하고 있다.',
    thought: '"자기들끼리 내 흉을 보고 있는 게 분명해."',
    distortionType: 'mind_reading',
  },

  // 6. 예언자적 사고 (Fortune Telling)
  {
    id: 11,
    situation: '중요한 면접을 앞두고 있다.',
    thought: '"준비해도 소용없어. 난 너무 긴장해서 횡설수설하다 떨어질 거야."',
    distortionType: 'fortune_telling',
  },
  {
    id: 12,
    situation: '새로운 취미 모임에 나가기로 했다.',
    thought: '"가봤자 어울리지도 못하고 겉돌기만 할 텐데, 가지 말까?"',
    distortionType: 'fortune_telling',
  },

  // 7. 확대/축소 (Magnification and Minimization)
  {
    id: 13,
    situation: '보고서에서 사소한 오타 하나를 발견했다.',
    thought: '"이런 실수를 하다니! 상사가 나를 무능력하다고 생각할 거야. 큰일 났다."',
    distortionType: 'magnification',
  },
  {
    id: 14,
    situation: '내가 꾸준히 운동해서 건강해진 사실을 떠올렸다.',
    thought: '"이 정도는 다들 하는 건데 뭐. 대단한 것도 아니야."',
    distortionType: 'magnification',
  },

  // 8. 감정적 추론 (Emotional Reasoning)
  {
    id: 15,
    situation: '내일 할 일을 생각하니 갑자기 막연한 불안감이 덮쳐온다.',
    thought: '"이렇게 불안한 걸 보니, 내일 뭔가 안 좋은 일이 터질 게 확실해."',
    distortionType: 'emotional_reasoning',
  },
  {
    id: 16,
    situation: '집 청소를 안 해서 죄책감이 든다.',
    thought: '"죄책감이 드는 걸 보니 나는 정말 게으르고 나쁜 사람이야."',
    distortionType: 'emotional_reasoning',
  },

  // 9. 당위적 진술 (Should Statements)
  {
    id: 17,
    situation: '주말에 피곤해서 아무것도 안 하고 쉬었다.',
    thought: '"난 항상 생산적이어야 해. 이렇게 시간을 낭비하다니 난 쓰레기야."',
    distortionType: 'should_statements',
  },
  {
    id: 18,
    situation: '친구가 약속 시간에 5분 늦었다.',
    thought: '"사람이라면 약속을 지켜야지. 시간 관념 없는 건 용서가 안 돼."',
    distortionType: 'should_statements',
  },

  // 10. 낙인찍기 (Labeling)
  {
    id: 19,
    situation: '투자나 주식에서 돈을 잃었다.',
    thought: '"나는 \'실수한 사람\'이 아니라, 그냥 \'패배자\'야."',
    distortionType: 'labeling',
  },
  {
    id: 20,
    situation: '동료가 업무 실수를 해서 나에게 피해가 왔다.',
    thought: '"저 사람은 \'구제 불능\'이야. 상종 못 할 인간이네."',
    distortionType: 'labeling',
  },

  // 11. 개인화 (Personalization)
  {
    id: 21,
    situation: '퇴근한 배우자(또는 가족)의 표정이 어둡다.',
    thought: '"내가 아까 뭐 잘못했나? 나 때문에 기분이 나쁜가 보다."',
    distortionType: 'personalization',
  },
  {
    id: 22,
    situation: '팀 프로젝트 결과가 좋지 않았다.',
    thought: '"다 내가 부족해서 그래. 내가 리더 역할을 제대로 못 해서 망친 거야."',
    distortionType: 'personalization',
  },

  // 12. 비난 (Blaming)
  {
    id: 23,
    situation: '성격 문제로 대인관계가 힘들다.',
    thought: '"우리 부모님이 날 억압적으로 키워서 내 성격이 이렇게 된 거야."',
    distortionType: 'blaming',
  },
  {
    id: 24,
    situation: '연인과 다투고 기분이 상했다.',
    thought: '"네가 내 말을 잘 들었으면 내가 화낼 일도 없었잖아. 다 너 때문이야."',
    distortionType: 'blaming',
  },
];

export const TOTAL_QUESTIONS = questions.length;
