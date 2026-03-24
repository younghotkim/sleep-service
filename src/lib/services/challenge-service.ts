import { createClient } from '../supabase';
import { wrapApiResponse, ApiResponse } from '../api';
import { Moon, Zap, HandMetal, LucideIcon } from 'lucide-react';

export interface Challenge {
  id: string;
  title: string;
  participants: string;
  reward: string;
  category: string;
  icon: LucideIcon;
  level: 'Easy' | 'Normal' | 'Hard';
  joined?: boolean;
}

const MOCK_CHALLENGES: Challenge[] = [
  { id: '1', title: '오후 11시 취침 7일 달성', participants: '12,450', reward: '500 P', category: 'Night', icon: Moon, level: 'Hard' },
  { id: '2', title: '기상 후 5분 스트레칭', participants: '8,210', reward: '200 P', category: 'Morning', icon: Zap, level: 'Easy' },
  { id: '3', title: '스마트폰 없이 잠들기', participants: '15,300', reward: '300 P', category: 'Habit', icon: HandMetal, level: 'Normal' },
];

export const challengeService = {
  async getChallenges(): Promise<ApiResponse<Challenge[]>> {
    // In a real app: const { data, error } = await supabase.from('challenges').select('*');
    return wrapApiResponse(MOCK_CHALLENGES);
  },

  async joinChallenge(challengeId: string): Promise<ApiResponse<boolean>> {
    // In a real app: const { error } = await supabase.from('user_challenges').insert({ challenge_id: challengeId });
    console.log(`Joined challenge: ${challengeId}`);
    return wrapApiResponse(true);
  }
};
