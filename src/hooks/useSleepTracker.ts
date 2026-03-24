/**
 * SleepTune Sleep Tracking Hook
 * - Manages session state (active session, live data, duration)
 * - Interfaces with SleepSensorManager and SleepAnalyzer
 */

import { useState, useEffect, useRef } from 'react';
import { SleepSensorManager, SensorData } from '../lib/sensors';
import { SleepAnalyzer, SleepStage, SleepDataPoint } from '../lib/analysis';

export interface UseSleepTrackerResult {
  isTracking: boolean;
  duration: number; // in seconds
  liveData: SensorData | null;
  currentStage: SleepStage | null;
  startTracking: () => Promise<boolean>;
  stopTracking: () => void;
  sessionStageDistribution: Record<SleepStage, number>; // Duration per stage
}

export function useSleepTracker(): UseSleepTrackerResult {
  const [isTracking, setIsTracking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [liveData, setLiveData] = useState<SensorData | null>(null);
  const [currentStage, setCurrentStage] = useState<SleepStage | null>(null);
  const [sessionStageDistribution, setSessionStageDistribution] = useState<Record<SleepStage, number>>({
    [SleepStage.AWAKE]: 0,
    [SleepStage.LIGHT]: 0,
    [SleepStage.REM]: 0,
    [SleepStage.DEEP]: 0
  });

  const sensorManager = useRef<SleepSensorManager | null>(null);
  const analyzer = useRef<SleepAnalyzer>(new SleepAnalyzer());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const windowBuffer = useRef<SleepDataPoint[]>([]);

  useEffect(() => {
    sensorManager.current = new SleepSensorManager();
    return () => {
      stopTracking();
    };
  }, []);

  const startTracking = async (): Promise<boolean> => {
    if (!sensorManager.current) return false;

    const granted = await sensorManager.current.requestPermissions();
    if (!granted) return false;

    setIsTracking(true);
    setDuration(0);
    setSessionStageDistribution({
      [SleepStage.AWAKE]: 0,
      [SleepStage.LIGHT]: 0,
      [SleepStage.REM]: 0,
      [SleepStage.DEEP]: 0
    });

    // 1. Start Sensors
    sensorManager.current.startMotionTracking((motionIntensity) => {
      setLiveData(prev => ({ ...prev!, timestamp: Date.now(), motionIntensity }));
    });

    await sensorManager.current.startNoiseTracking((noiseLevel) => {
      setLiveData(prev => ({ ...prev!, timestamp: Date.now(), noiseLevel }));
    });

    // 2. Start Duration Timer & Analysis
    timerRef.current = setInterval(() => {
      setDuration(prev => prev + 1);
      
      // Buffer current data for analysis
      if (liveData) {
        windowBuffer.current.push({ ...liveData });
      }

      // Analyze every 30 seconds for simplicity in this prototype (usually every few mins)
      if (duration > 0 && duration % 30 === 0) {
        const stage = analyzer.current.classifyStage(windowBuffer.current);
        setCurrentStage(stage);
        
        setSessionStageDistribution(prev => ({
          ...prev,
          [stage]: prev[stage] + 30
        }));
        
        windowBuffer.current = [];
      }
    }, 1000);

    return true;
  };

  const stopTracking = () => {
    setIsTracking(false);
    sensorManager.current?.stopAll();
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    windowBuffer.current = [];
  };

  return {
    isTracking,
    duration,
    liveData,
    currentStage,
    startTracking,
    stopTracking,
    sessionStageDistribution
  };
}
