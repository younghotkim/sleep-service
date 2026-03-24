'use client';

import { motion } from 'framer-motion';
import { useSleepTracker } from '@/hooks/useSleepTracker';
import { Play, Square, Activity, Volume2, Moon, Clock } from 'lucide-react';

export default function LiveTracking() {
  const { isTracking, duration, liveData, currentStage, startTracking, stopTracking, sessionStageDistribution } = useSleepTracker();

  const handleToggle = async () => {
    if (isTracking) {
      stopTracking();
    } else {
      const success = await startTracking();
      if (!success) alert('권한 요청에 실패했습니다.');
    }
  };

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold gradient-text">실시간 수면 트래킹</h1>
          <p className="text-sm text-gray-400">센서를 통해 수면 상태를 분석 중입니다.</p>
        </div>
        <button 
          onClick={handleToggle}
          className={`btn ${isTracking ? 'btn-danger' : 'btn-primary'} flex items-center gap-2`}
        >
          {isTracking ? <><Square size={18} /> 중단</> : <><Play size={18} /> 트래킹 시작</>}
        </button>
      </header>

      {isTracking ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card flex flex-col items-center justify-center p-8 gap-4"
          >
            <div className="relative w-48 h-48 flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-primary rounded-full blur-3xl"
              />
              <div className="z-10 text-center">
                <p className="text-4xl font-bold">{formatDuration(duration)}</p>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Tracking Duration</p>
              </div>
            </div>
            
            <div className="mt-4 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <span className="text-sm font-semibold text-accent flex items-center gap-2">
                <Moon size={16} /> 현재 단계: {currentStage || '분석 중...'}
              </span>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            <div className="glass-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Activity size={16} className="text-primary" /> 움직임 강도
                </h3>
                <span className="text-xs text-secondary">Intensity: {((liveData?.motionIntensity || 0) * 100).toFixed(1)}%</span>
              </div>
              <div className="h-12 bg-white/5 rounded-lg overflow-hidden flex items-end">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(liveData?.motionIntensity || 0) * 100}%` }}
                  className="w-full bg-primary"
                />
              </div>
            </div>

            <div className="glass-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Volume2 size={16} className="text-accent" /> 주변 소음
                </h3>
                <span className="text-xs text-secondary">Level: {((liveData?.noiseLevel || 0) * 100).toFixed(1)}%</span>
              </div>
              <div className="h-12 bg-white/5 rounded-lg overflow-hidden flex items-end">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(liveData?.noiseLevel || 0) * 100}%` }}
                  className="w-full bg-accent"
                />
              </div>
            </div>

            <div className="glass-card">
               <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                 <Clock size={16} /> 세션별 비중
               </h3>
               <div className="flex gap-2 h-4 rounded-full overflow-hidden bg-white/5">
                 {Object.entries(sessionStageDistribution).map(([stage, dur]) => (
                    <div 
                      key={stage}
                      style={{ width: `${(dur / (duration || 1)) * 100}%` }}
                      className={`h-full ${
                        stage === 'DEEP' ? 'bg-accent' : 
                        stage === 'REM' ? 'bg-primary' : 
                        stage === 'LIGHT' ? 'bg-white/20' : 'bg-red-500/40'
                      }`}
                    />
                 ))}
               </div>
               <div className="flex justify-between mt-2 text-[10px] text-gray-500">
                  <span>Deep</span>
                  <span>REM</span>
                  <span>Light</span>
                  <span>Awake</span>
               </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card flex flex-col items-center justify-center p-20 gap-6 text-center">
          <div className="p-6 bg-primary/10 rounded-full">
            <Moon size={48} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">수면 트래킹을 시작할 준비가 되셨나요?</h2>
            <p className="text-gray-400 mt-2">트래킹을 시작하면 휴대폰의 가속도계와 마이크 센서를 사용합니다.<br/>휴대폰을 침대 옆이나 머리맡에 두면 더 정확하게 분석됩니다.</p>
          </div>
          <button 
            onClick={handleToggle}
            className="btn btn-primary btn-lg px-12"
          >
            시작하기
          </button>
        </div>
      )}
    </div>
  );
}
