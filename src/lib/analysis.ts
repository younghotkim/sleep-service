/**
 * SleepTune AI Analysis & Stage Classification
 * - Simplified stage classification based on movement and noise data.
 */

export enum SleepStage {
  AWAKE = 'AWAKE',
  LIGHT = 'LIGHT',
  REM = 'REM',
  DEEP = 'DEEP'
}

export interface SleepDataPoint {
  timestamp: number;
  motionIntensity: number;
  noiseLevel: number;
}

export class SleepAnalyzer {
  /**
   * Classifies a sleep session into stages.
   * Typically done over 5-10 minute windows.
   */
  classifyStage(windowData: SleepDataPoint[]): SleepStage {
    if (windowData.length === 0) return SleepStage.AWAKE;

    // Calculate average intensity and noise in the current window
    const avgMotion = windowData.reduce((s, p) => s + p.motionIntensity, 0) / windowData.length;
    const avgNoise = windowData.reduce((s, p) => s + p.noiseLevel, 0) / windowData.length;
    
    // Weighted analysis (threshold-based AI simulation)
    // Motion is the strongest indicator of being 'Awake'
    if (avgMotion > 0.4 || avgNoise > 0.6) {
      return SleepStage.AWAKE;
    }

    // Low motion and low noise -> Deep Sleep
    if (avgMotion < 0.05 && avgNoise < 0.1) {
      return SleepStage.DEEP;
    }

    // Moderate/Low motion (eyes moving simulation) -> REM (Rough heuristic)
    if (avgMotion < 0.15 && avgMotion > 0.08) {
      return SleepStage.REM;
    }

    // Default: Light Sleep
    return SleepStage.LIGHT;
  }

  /**
   * Generates a sleep score (0-100) based on session data
   */
  calculateSleepScore(sessions: { stage: SleepStage, duration: number }[]): number {
    const totalDuration = sessions.reduce((s, d) => s + d.duration, 0);
    if (totalDuration === 0) return 0;
    
    // Weights for stages: Deep(1.2), REM(1.1), Light(0.8), Awake(-2.0)
    let weightedScore = 0;
    sessions.forEach(s => {
      const weight = {
        [SleepStage.DEEP]: 1.2,
        [SleepStage.REM]: 1.1,
        [SleepStage.LIGHT]: 0.8,
        [SleepStage.AWAKE]: -2.0
      }[s.stage];
      
      weightedScore += (s.duration / totalDuration) * 100 * weight;
    });

    return Math.min(Math.max(weightedScore, 0), 100);
  }
}
