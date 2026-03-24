'use client';

import { motion } from 'framer-motion';
import { Clock, BookOpen, Coffee, Zap, Stethoscope, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import SoundPlayer from '@/components/SoundPlayer';
import { getTonightRecommendations, soundscapes, Soundscape } from '@/utils/recommendationEngine';

export default function Recommendation() {
  const [currentTrack, setCurrentTrack] = useState<Soundscape>(soundscapes[0]);
  const [recommendations, setRecommendations] = useState<any>(null);

  useEffect(() => {
    const recs = getTonightRecommendations();
    setRecommendations(recs);
    setCurrentTrack(recs.soundscapeRecommendation.sound);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  if (!recommendations) return null; // or a loader

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <header style={{ marginBottom: '40px' }}>
        <h1 className="gradient-text">맞춤형 회복 솔루션</h1>
        <p style={{ color: 'var(--muted)' }}>유저님의 오늘의 상태와 수면 데이터에 최적화된 리드미컬 케어를 제안합니다.</p>
        <p style={{ color: 'var(--accent)', marginTop: '8px', fontSize: '0.9rem' }}>
           💡 {recommendations.soundscapeRecommendation.reason}
        </p>
      </header>

      <div className="dashboard-grid">
        <SoundPlayer 
          currentTrack={currentTrack} 
          trackList={soundscapes} 
          onTrackSelect={setCurrentTrack} 
        />

        <motion.div variants={itemVariants} className="glass-card">
          <h2>적정 취침 시간</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock color="var(--primary)" size={24} />
                <div>
                   <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>기상 목표 시간</p>
                   <p style={{ fontSize: '1.2rem', fontWeight: 700 }}>AM 07:00</p>
                </div>
             </div>
             
             <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '12px' }}>추천 취침 시작 ({recommendations.alarmRecommendation.time})</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderRadius: '12px', background: 'rgba(123, 97, 255, 0.1)' }}>
                      <span style={{ fontSize: '0.9rem' }}>5 사이클 (최적)</span>
                      <span style={{ fontWeight: 700 }}>PM 11:30</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)' }}>
                      <span style={{ fontSize: '0.9rem' }}>6 사이클 (충분)</span>
                      <span style={{ fontWeight: 600 }}>PM 10:00</span>
                   </div>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '12px' }}>* {recommendations.alarmRecommendation.reason}</p>
             </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card span-2">
           <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Stethoscope color="var(--accent)" size={24} />
              CBT-I 수면 교육 및 루틴
           </h2>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div className="glass" style={{ padding: '24px', border: 'none', background: 'rgba(255,255,255,0.02)', display: 'flex', gap: '16px' }}>
                 <div style={{ minWidth: '80px', height: '80px', borderRadius: '16px', background: 'rgba(0, 209, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BookOpen color="var(--accent)" size={32} />
                 </div>
                 <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>수면 위생의 7가지 규칙</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '12px' }}>수면 전문의가 알려주는 수면 환경 개선 가이드</p>
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>자세히 보기</button>
                 </div>
              </div>
              
              <div className="glass" style={{ padding: '24px', border: 'none', background: 'rgba(255,255,255,0.02)', display: 'flex', gap: '16px' }}>
                 <div style={{ minWidth: '80px', height: '80px', borderRadius: '16px', background: 'rgba(123, 97, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap color="var(--primary)" size={32} />
                 </div>
                 <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>자기 전 5분 명상</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '12px' }}>심박수를 안정시키고 부교감 신경을 활성화합니다.</p>
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>스트리밍 시작</button>
                 </div>
              </div>
           </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card">
           <h2>Today&apos;s Tip</h2>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'rgba(247, 160, 114, 0.1)', padding: '10px', borderRadius: '12px', height: 'fit-content' }}>
                      <Coffee color="var(--secondary)" size={20} />
                  </div>
                  <div>
                      <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>카페인 일광 금지</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '4px' }}>오후 2시 이후에는 카페인 섭취를 삼가는 것이 좋습니다.</p>
                  </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px', height: 'fit-content' }}>
                      <Sun color="var(--foreground)" size={20} />
                  </div>
                  <div>
                      <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>아침 햇살 쬐기</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '4px' }}>기상 후 30분 내로 햇빛을 쬐면 멜라토닌 리듬이 맞춰집니다.</p>
                  </div>
              </div>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
