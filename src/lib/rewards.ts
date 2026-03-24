
export interface RewardState {
  points: number;
  level: number;
  exp: number;
  affection: number;
  energy: number;
}

export const INITIAL_REWARD_STATE: RewardState = {
  points: 1250,
  level: 12,
  exp: 80,
  affection: 98,
  energy: 100,
};

export const calculateReward = (sleepScore: number): number => {
  // Simple logic: sleep score * 2 points
  return Math.floor(sleepScore * 1.5);
};

export const getLevelThreshold = (level: number): number => {
  return level * 100;
};
