export interface Soundscape {
  title: string;
  duration: string;
  type: string;
  id: string;
}

export interface SleepGuide {
  title: string;
  description: string;
  actionText: string;
  type: 'routine' | 'meditation';
}

export const soundscapes: Soundscape[] = [
  { id: 's1', title: '깊은 숲속의 장작', duration: '무한 재생', type: 'ASMR' },
  { id: 's2', title: '우주 정거장의 백색소음', duration: '무한 재생', type: 'White Noise' },
  { id: 's3', title: '봄비 내리는 창가', duration: '무한 재생', type: 'Nature' },
  { id: 's4', title: '알파파 유도 비트', duration: '30분', type: 'Binaural Beats' },
];

export function getRecommendedSoundscape(stressLevel: 'low' | 'medium' | 'high'): Soundscape {
  if (stressLevel === 'high') {
    return soundscapes[3];
  } else if (stressLevel === 'medium') {
    return soundscapes[2];
  }
  return soundscapes[0];
}

export function getTonightRecommendations() {
  return {
    alarmRecommendation: {
      time: 'PM 11:30',
      reason: '내일 07:00 기상을 위해 밤 11:30에 잠드시는 것을 추천해요.',
    },
    soundscapeRecommendation: {
      sound: getRecommendedSoundscape('medium'),
      reason: '오늘의 피로도를 분석한 결과, 자연의 소리가 숙면에 도움이 됩니다.'
    }
  };
}
