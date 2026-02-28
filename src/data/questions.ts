import type { DistortionType } from './planets';

export interface Question {
  id: number;
  situation: string;  // 상황
  thought: string;    // 속마음 (질문)
  distortionType: DistortionType;
}

export type AgeGroup = 'teens' | 'twenties' | 'thirties' | 'forties_plus';

// 연령대별 질문 (각 연령대 24문항: 12개 인지왜곡 × 2문항)
export const questionsByAge: Record<AgeGroup, Question[]> = {
  // ============================================
  // 10대 - 학교, 친구, SNS, 부모님, 외모, 진로
  // ============================================
  teens: [
    // 1. 흑백논리 (All-or-Nothing Thinking)
    {
      id: 1,
      situation: '중간고사에서 한 과목 점수가 떨어졌다.',
      thought: '"한 과목 망했으니 전부 망한 거야. 어차피 나는 공부랑 안 맞아."',
      distortionType: 'all_or_nothing',
    },
    {
      id: 2,
      situation: '친구와 사소한 다툼이 있었다.',
      thought: '"우정이 완전히 깨진 거야. 이제 우리는 끝났어."',
      distortionType: 'all_or_nothing',
    },

    // 2. 과잉 일반화 (Overgeneralization)
    {
      id: 3,
      situation: '친구들 사이에서 점심 그룹에 끼지 못했다.',
      thought: '"난 항상 왕따야. 아무도 나랑 친해지고 싶어하지 않아."',
      distortionType: 'overgeneralization',
    },
    {
      id: 4,
      situation: '좋아하는 사람에게 말을 걸었는데 반응이 시큰둥했다.',
      thought: '"난 매번 이래. 평생 아무도 나를 좋아해주지 않을 거야."',
      distortionType: 'overgeneralization',
    },

    // 3. 정신적 여과 (Mental Filter)
    {
      id: 5,
      situation: '발표 후 반응이 좋았는데 한 친구가 하품했다.',
      thought: '"저 친구 하품한 거 봤어? 완전 지루했던 게 분명해."',
      distortionType: 'mental_filter',
    },
    {
      id: 6,
      situation: '시험에서 좋은 성적을 받았는데 한 문제를 틀렸다.',
      thought: '"그 문제를 틀리다니... 결국 난 제대로 공부 못 한 거야."',
      distortionType: 'mental_filter',
    },

    // 4. 긍정 격하 (Disqualifying the Positive)
    {
      id: 7,
      situation: '선생님이 발표를 잘했다고 칭찬해주셨다.',
      thought: '"그냥 격려 차원에서 한 말이지. 진심이 아냐."',
      distortionType: 'disqualifying_positive',
    },
    {
      id: 8,
      situation: '친구들이 "넌 정말 재밌어"라고 말해줬다.',
      thought: '"그냥 분위기상 한 말이지. 진짜 내가 재밌어서 그런 게 아냐."',
      distortionType: 'disqualifying_positive',
    },

    // 5. 독심술 (Mind Reading)
    {
      id: 9,
      situation: '친구가 읽씹하고 답장을 안 한다.',
      thought: '"나한테 화났나? 내가 뭔가 실수했나 봐."',
      distortionType: 'mind_reading',
    },
    {
      id: 10,
      situation: '교실에서 친구들이 수군대며 웃고 있다.',
      thought: '"분명 내 얘기 하면서 비웃는 거야."',
      distortionType: 'mind_reading',
    },

    // 6. 예언자적 사고 (Fortune Telling)
    {
      id: 11,
      situation: '내일 학교 발표가 있다.',
      thought: '"어차피 떨어서 창피당할 거야. 안 하고 싶어."',
      distortionType: 'fortune_telling',
    },
    {
      id: 12,
      situation: '새 학기가 시작되고 반이 바뀌었다.',
      thought: '"어차피 새 반에서도 친구 못 사귈 거야. 혼자 겠지."',
      distortionType: 'fortune_telling',
    },

    // 7. 확대/축소 (Magnification and Minimization)
    {
      id: 13,
      situation: 'SNS에 올린 사진에 좋아요가 적다.',
      thought: '"아무도 나한테 관심 없어. 망했다."',
      distortionType: 'magnification',
    },
    {
      id: 14,
      situation: '반 대표로 뽑혔다.',
      thought: '"그냥 나 말고 할 사람이 없어서 뽑힌 거야. 별거 아니야."',
      distortionType: 'magnification',
    },

    // 8. 감정적 추론 (Emotional Reasoning)
    {
      id: 15,
      situation: '시험 공부할 생각에 불안하다.',
      thought: '"이렇게 불안한 거 보니 분명 떨어질 거야."',
      distortionType: 'emotional_reasoning',
    },
    {
      id: 16,
      situation: '새로운 동아리에 들어가려니 긴장된다.',
      thought: '"긴장되는 걸 보니 나랑 안 맞는 거야. 안 해야겠다."',
      distortionType: 'emotional_reasoning',
    },

    // 9. 당위적 진술 (Should Statements)
    {
      id: 17,
      situation: '주말에 공부 안 하고 게임만 했다.',
      thought: '"난 매일 공부해야 하는데. 정말 한심해."',
      distortionType: 'should_statements',
    },
    {
      id: 18,
      situation: '부모님 말씀에 짜증을 냈다.',
      thought: '"부모님께 항상 잘해야 하는데. 나는 왜 이렇게 못났지."',
      distortionType: 'should_statements',
    },

    // 10. 낙인찍기 (Labeling)
    {
      id: 19,
      situation: '시험 점수가 떨어졌다.',
      thought: '"나는 그냥 \'바보\'야. 머리가 나쁜 거야."',
      distortionType: 'labeling',
    },
    {
      id: 20,
      situation: '운동 시간에 실수해서 팀이 졌다.',
      thought: '"나는 \'운동치\'야. 몸치에 똥손이야."',
      distortionType: 'labeling',
    },

    // 11. 개인화 (Personalization)
    {
      id: 21,
      situation: '부모님이 다투고 있다.',
      thought: '"내가 시험 망쳐서 스트레스 받으신 거야."',
      distortionType: 'personalization',
    },
    {
      id: 22,
      situation: '친구 그룹의 분위기가 어색해졌다.',
      thought: '"내가 뭔가 잘못해서 분위기가 이상해진 거야."',
      distortionType: 'personalization',
    },

    // 12. 비난 (Blaming)
    {
      id: 23,
      situation: '성적이 안 나온다.',
      thought: '"엄마 아빠가 학원을 안 보내줘서 그래."',
      distortionType: 'blaming',
    },
    {
      id: 24,
      situation: '친구와 다퉜다.',
      thought: '"쟤가 먼저 날 무시해서 그런 거야. 다 쟤 탓이야."',
      distortionType: 'blaming',
    },
  ],

  // ============================================
  // 20대 - 취업, 직장, 연애, 자취, 미래 불안, 상사
  // ============================================
  twenties: [
    // 1. 흑백논리 (All-or-Nothing Thinking)
    {
      id: 1,
      situation: '면접에서 한 질문에 제대로 답하지 못했다.',
      thought: '"그 질문 망한 순간 끝난 거야. 다 틀어진 거나 마찬가지야."',
      distortionType: 'all_or_nothing',
    },
    {
      id: 2,
      situation: '다이어트 중인데 참지 못하고 치킨을 시켜 먹었다.',
      thought: '"오늘 식단은 완전히 망했어. 에라 모르겠다, 오늘은 다 먹자."',
      distortionType: 'all_or_nothing',
    },

    // 2. 과잉 일반화 (Overgeneralization)
    {
      id: 3,
      situation: '소개팅에서 연락이 끊겼다.',
      thought: '"난 매번 이래. 평생 연애 못 할 운명인가 봐."',
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
      situation: '업무 평가에서 대부분 칭찬인데 개선점 하나가 있었다.',
      thought: '"결국 그 부분이 문제라는 거잖아. 나는 부족해."',
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
      situation: '상사가 업무를 잘 처리했다고 칭찬했다.',
      thought: '"그건 운이 좋았을 뿐이야. 다음엔 못할 거야."',
      distortionType: 'disqualifying_positive',
    },
    {
      id: 8,
      situation: '주변 사람들이 "너 정말 성격 좋다"라고 칭찬했다.',
      thought: '"그건 내가 겉으로만 친절한 척해서 그래. 진짜 내 모습을 알면 실망할걸."',
      distortionType: 'disqualifying_positive',
    },

    // 5. 독심술 (Mind Reading)
    {
      id: 9,
      situation: '상사가 회의 중 내 의견에 무반응이다.',
      thought: '"싫어하는 게 분명해. 내가 맘에 안 드나 봐."',
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
      situation: '다음 주 중요한 면접이 잡혔다.',
      thought: '"준비해도 떨어질 거야. 항상 마지막에 망하잖아."',
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
      situation: '보고서에서 오타 하나를 발견했다.',
      thought: '"상사가 나를 무능하다고 생각할 거야. 큰일이다."',
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
      situation: '월요일 아침 출근이 무겁다.',
      thought: '"이렇게 기분이 안 좋은 건 이 직장이 안 맞아서야."',
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
      situation: '피곤해서 운동을 건너뛰었다.',
      thought: '"사회인이면 자기 관리를 해야지. 나는 왜 이럴까."',
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
      situation: '투자에서 손해를 봤다.',
      thought: '"나는 \'패배자\'야. 이런 것도 못 하다니."',
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
      situation: '팀 프로젝트 결과가 좋지 않았다.',
      thought: '"다 내가 부족해서 그래. 내 책임이야."',
      distortionType: 'personalization',
    },
    {
      id: 22,
      situation: '연인이 기분이 안 좋아 보인다.',
      thought: '"내가 뭘 잘못했나? 나 때문에 기분이 나쁜가 보다."',
      distortionType: 'personalization',
    },

    // 12. 비난 (Blaming)
    {
      id: 23,
      situation: '취업이 안 된다.',
      thought: '"부모님이 좋은 대학 안 보내줘서 이런 거야."',
      distortionType: 'blaming',
    },
    {
      id: 24,
      situation: '연인과 다투고 기분이 상했다.',
      thought: '"네가 내 말을 잘 들었으면 내가 화낼 일도 없었잖아. 다 너 때문이야."',
      distortionType: 'blaming',
    },
  ],

  // ============================================
  // 30대 - 커리어, 연인 관계, 재테크, 건강, 미래
  // ============================================
  thirties: [
    // 1. 흑백논리 (All-or-Nothing Thinking)
    {
      id: 1,
      situation: '프로젝트에서 하나의 피드백을 받았다.',
      thought: '"한 번 지적받으면 전체가 실패한 거지. 완벽하지 않으면 의미 없어."',
      distortionType: 'all_or_nothing',
    },
    {
      id: 2,
      situation: '연인과 의견 충돌이 있었다.',
      thought: '"이렇게 안 맞으면 계속 같이 있어봤자야. 이 관계는 안 되는 거야."',
      distortionType: 'all_or_nothing',
    },

    // 2. 과잉 일반화 (Overgeneralization)
    {
      id: 3,
      situation: '이직 면접에서 탈락했다.',
      thought: '"난 항상 여기서 떨어져. 평생 이 회사에서 못 벗어날 거야."',
      distortionType: 'overgeneralization',
    },
    {
      id: 4,
      situation: '투자한 주식이 또 떨어졌다.',
      thought: '"난 매번 이래. 돈을 모을 운명이 아닌가 봐."',
      distortionType: 'overgeneralization',
    },

    // 3. 정신적 여과 (Mental Filter)
    {
      id: 5,
      situation: '좋은 연봉협상 결과인데 원하던 금액은 아니었다.',
      thought: '"결국 원하는 대로 안 된 거잖아. 실패한 거야."',
      distortionType: 'mental_filter',
    },
    {
      id: 6,
      situation: '연인과 좋은 데이트를 했는데 헤어질 때 좀 서먹했다.',
      thought: '"마지막이 찝찝했어. 뭔가 잘못된 것 같아."',
      distortionType: 'mental_filter',
    },

    // 4. 긍정 격하 (Disqualifying the Positive)
    {
      id: 7,
      situation: '승진했다는 통보를 받았다.',
      thought: '"경쟁자가 없어서 그런 거야. 내 실력이 아냐."',
      distortionType: 'disqualifying_positive',
    },
    {
      id: 8,
      situation: '연인이 "너랑 있으면 편해"라고 말했다.',
      thought: '"그냥 좋게 말해주는 거지. 설레지 않는다는 뜻일 수도 있잖아."',
      distortionType: 'disqualifying_positive',
    },

    // 5. 독심술 (Mind Reading)
    {
      id: 9,
      situation: '연인이 오늘따라 말이 없다.',
      thought: '"나한테 불만 있는 거지? 내가 뭘 잘못한 건가."',
      distortionType: 'mind_reading',
    },
    {
      id: 10,
      situation: '상사가 내 기획안에 코멘트 없이 넘어갔다.',
      thought: '"마음에 안 드는 게 분명해. 나를 무시하는 거야."',
      distortionType: 'mind_reading',
    },

    // 6. 예언자적 사고 (Fortune Telling)
    {
      id: 11,
      situation: '새 프로젝트 리더를 맡게 됐다.',
      thought: '"분명 실패할 거야. 내가 리더십이 있겠어?"',
      distortionType: 'fortune_telling',
    },
    {
      id: 12,
      situation: '연인과 결혼 얘기가 나왔다.',
      thought: '"결혼하면 분명 후회할 거야. 지금이 가장 좋은 때일 텐데."',
      distortionType: 'fortune_telling',
    },

    // 7. 확대/축소 (Magnification and Minimization)
    {
      id: 13,
      situation: '회의에서 내 발언이 무시당한 것 같았다.',
      thought: '"회사에서 내 입지가 흔들리고 있어. 큰일이다."',
      distortionType: 'magnification',
    },
    {
      id: 14,
      situation: '꾸준히 운동해서 건강해졌다.',
      thought: '"이 정도는 누구나 하는 거지. 대단한 거 아냐."',
      distortionType: 'magnification',
    },

    // 8. 감정적 추론 (Emotional Reasoning)
    {
      id: 15,
      situation: '새로운 도전 앞에서 두렵다.',
      thought: '"두려운 걸 보니 내가 할 수 있는 일이 아닌가 봐."',
      distortionType: 'emotional_reasoning',
    },
    {
      id: 16,
      situation: '요즘 연인에게 설레임이 줄었다.',
      thought: '"설레지 않는 걸 보니 사랑이 식은 거야."',
      distortionType: 'emotional_reasoning',
    },

    // 9. 당위적 진술 (Should Statements)
    {
      id: 17,
      situation: '야근 없이 칼퇴했다.',
      thought: '"이 나이면 더 열심히 해야 하는 거 아냐? 게으른 거 같아."',
      distortionType: 'should_statements',
    },
    {
      id: 18,
      situation: '주말에 집에서 뒹굴거리며 보냈다.',
      thought: '"30대면 자기계발을 해야지. 이러면 안 되는데."',
      distortionType: 'should_statements',
    },

    // 10. 낙인찍기 (Labeling)
    {
      id: 19,
      situation: '승진에서 누락됐다.',
      thought: '"나는 결국 \'2인자\'야. 성공할 사람이 아니야."',
      distortionType: 'labeling',
    },
    {
      id: 20,
      situation: '연인과 또 같은 문제로 다퉜다.',
      thought: '"나는 \'연애 못하는 사람\'이야. 관계에 재능이 없어."',
      distortionType: 'labeling',
    },

    // 11. 개인화 (Personalization)
    {
      id: 21,
      situation: '연인의 기분이 안 좋아 보인다.',
      thought: '"내가 뭘 잘못했지? 나 때문인 것 같아."',
      distortionType: 'personalization',
    },
    {
      id: 22,
      situation: '팀 분위기가 좋지 않다.',
      thought: '"내가 팀 분위기를 망치고 있는 건 아닐까?"',
      distortionType: 'personalization',
    },

    // 12. 비난 (Blaming)
    {
      id: 23,
      situation: '커리어가 정체됐다.',
      thought: '"상사가 날 안 키워줘서 이 모양인 거야."',
      distortionType: 'blaming',
    },
    {
      id: 24,
      situation: '연인과 다퉜다.',
      thought: '"네가 내 말을 이해하려고 했으면 싸울 일도 없었어. 다 네 탓이야."',
      distortionType: 'blaming',
    },
  ],

  // ============================================
  // 40대 이상 - 결혼/육아 40%, 커리어 20%, 건강/가족 40%
  // ============================================
  forties_plus: [
    // 1. 흑백논리 (All-or-Nothing Thinking) - 건강
    {
      id: 1,
      situation: '건강검진에서 수치 하나가 경계에 걸렸다.',
      thought: '"하나라도 이상이 있으면 다 잘못된 거야. 건강을 완전히 망친 거지."',
      distortionType: 'all_or_nothing',
    },
    {
      id: 2,
      situation: '배우자와 의견 충돌이 있었다.',
      thought: '"이렇게 안 맞으면 평생 이해 못 하는 거야. 결혼 생활이 실패한 거지."',
      distortionType: 'all_or_nothing',
    },

    // 2. 과잉 일반화 (Overgeneralization) - 커리어
    {
      id: 3,
      situation: '후배에게 업무 피드백을 했는데 반응이 안 좋았다.',
      thought: '"난 항상 이래. 사람들이 나를 꼰대로 보는 거야."',
      distortionType: 'overgeneralization',
    },
    {
      id: 4,
      situation: '아이에게 조언을 했는데 귀찮아하는 표정을 지었다.',
      thought: '"난 매번 이래. 아이에게 필요 없는 사람이 됐어."',
      distortionType: 'overgeneralization',
    },

    // 3. 정신적 여과 (Mental Filter) - 결혼
    {
      id: 5,
      situation: '배우자와 좋은 대화를 나눴는데 한 마디가 걸린다.',
      thought: '"그 말 때문에 기분이 다 상했어. 좋았던 대화가 다 의미 없어졌어."',
      distortionType: 'mental_filter',
    },
    {
      id: 6,
      situation: '가족 여행이 즐거웠는데 아이가 한 번 떼를 썼다.',
      thought: '"그 순간 때문에 여행이 다 망쳐진 것 같아."',
      distortionType: 'mental_filter',
    },

    // 4. 긍정 격하 (Disqualifying the Positive) - 커리어
    {
      id: 7,
      situation: '오랜 경력을 인정받아 포상을 받았다.',
      thought: '"이 나이까지 버틴 것뿐이야. 대단한 게 아냐."',
      distortionType: 'disqualifying_positive',
    },
    {
      id: 8,
      situation: '아이가 "엄마/아빠 최고"라고 말했다.',
      thought: '"아직 어려서 그러는 거지. 진짜 나를 알면 달라질 거야."',
      distortionType: 'disqualifying_positive',
    },

    // 5. 독심술 (Mind Reading) - 육아
    {
      id: 9,
      situation: '아이가 방에서 안 나오고 말을 안 한다.',
      thought: '"내가 싫은 거야. 부모로서 뭘 잘못한 거지."',
      distortionType: 'mind_reading',
    },
    {
      id: 10,
      situation: '배우자가 요즘 대화가 줄었다.',
      thought: '"나한테 정이 떨어진 거야. 나랑 사는 게 지겨운 거지."',
      distortionType: 'mind_reading',
    },

    // 6. 예언자적 사고 (Fortune Telling) - 건강/가족
    {
      id: 11,
      situation: '부모님이 건강이 안 좋아지셨다.',
      thought: '"점점 더 나빠질 거야. 감당할 수 없는 일이 올 것 같아."',
      distortionType: 'fortune_telling',
    },
    {
      id: 12,
      situation: '아이가 진로를 고민 중이다.',
      thought: '"잘못된 선택을 할 거야. 분명 후회할 텐데."',
      distortionType: 'fortune_telling',
    },

    // 7. 확대/축소 (Magnification and Minimization) - 육아
    {
      id: 13,
      situation: '아이가 시험을 한 번 못 봤다.',
      thought: '"우리 애는 끝났어. 좋은 대학은 이제 물 건너갔어."',
      distortionType: 'magnification',
    },
    {
      id: 14,
      situation: '오랜 시간 가정을 잘 꾸려왔다.',
      thought: '"당연히 해야 할 일을 한 것뿐이야. 특별한 게 아냐."',
      distortionType: 'magnification',
    },

    // 8. 감정적 추론 (Emotional Reasoning) - 건강
    {
      id: 15,
      situation: '요즘 자주 피곤하고 의욕이 없다.',
      thought: '"이렇게 지치는 걸 보니 몸에 큰 문제가 있는 게 틀림없어."',
      distortionType: 'emotional_reasoning',
    },
    {
      id: 16,
      situation: '배우자에게 짜증이 자주 난다.',
      thought: '"짜증나는 걸 보니 이 결혼 생활이 잘못된 거야."',
      distortionType: 'emotional_reasoning',
    },

    // 9. 당위적 진술 (Should Statements) - 가족
    {
      id: 17,
      situation: '부모님 병원에 자주 못 갔다.',
      thought: '"자식이면 더 자주 가야지. 나는 불효자야."',
      distortionType: 'should_statements',
    },
    {
      id: 18,
      situation: '아이 학원을 하나 줄였다.',
      thought: '"부모라면 더 해줘야 하는데. 내가 부족한 거야."',
      distortionType: 'should_statements',
    },

    // 10. 낙인찍기 (Labeling) - 육아
    {
      id: 19,
      situation: '아이에게 화를 내버렸다.',
      thought: '"나는 \'나쁜 부모\'야. 자격이 없어."',
      distortionType: 'labeling',
    },
    {
      id: 20,
      situation: '회사에서 젊은 직원에게 밀리는 느낌이 든다.',
      thought: '"나는 이제 \'한물간 사람\'이야. 쓸모없어진 거지."',
      distortionType: 'labeling',
    },

    // 11. 개인화 (Personalization) - 결혼
    {
      id: 21,
      situation: '배우자가 요즘 지쳐 보인다.',
      thought: '"내가 가정에 소홀해서 그래. 다 내 탓이야."',
      distortionType: 'personalization',
    },
    {
      id: 22,
      situation: '아이 성적이 떨어졌다.',
      thought: '"내가 관심을 못 줘서야. 다 내 잘못이야."',
      distortionType: 'personalization',
    },

    // 12. 비난 (Blaming) - 건강
    {
      id: 23,
      situation: '요즘 건강이 안 좋아졌다.',
      thought: '"집안일에 치여서 내 건강을 못 챙긴 거야. 다 가족 탓이야."',
      distortionType: 'blaming',
    },
    {
      id: 24,
      situation: '배우자와 다퉜다.',
      thought: '"당신이 날 이해하려고 했으면 싸울 일도 없었어. 다 당신 탓이야."',
      distortionType: 'blaming',
    },
  ],
};

// 기본 질문 배열 (호환성 유지)
export const questions = questionsByAge.twenties;

export const TOTAL_QUESTIONS = 24;
