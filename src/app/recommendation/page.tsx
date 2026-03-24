'use client';

import { motion } from 'framer-motion';
import { Play, Pause, FastForward, Rewind, Music, Volume2, Moon, Clock, BookOpen, Coffee, Zap, Stethoscope, Sun } from 'lucide-react';
import { useState } from 'react';

export default function Recommendation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(65);

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

  const soundscapes = [
    { title: '깊은 숲속의 장작', duration: '무한 재생', type: 'ASMR' },
    { title: '우주 정거장의 백색소음', duration: '무한 재생', type: 'White Noise' },
    { title: '봄비 내리는 창가', duration: '무한 재생', type: 'Nature' },
    { title: '알파파 유도 비트', duration: '30분', type: 'Binaural Beats' },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <header style={{ marginBottom: '40px' }}>
        <h1 className="gradient-text">맞춤형 회복 솔루션</h1>
        <p style={{ color: 'var(--muted)' }}>유저님의 오늘의 상태와 수면 데이터에 최적화된 리드미컬 케어를 제안합니다.</p>
      </header>

      <div className="dashboard-grid">
        <motion.div variants={itemVariants} className="glass-card span-2" style={{ background: 'linear-gradient(135deg, rgba(123, 97, 255, 0.2), rgba(0, 0, 0, 0.4))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <h2>AI 사운드스케이프 플레이어</h2>
             <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
                   <Music size={16} color="var(--primary)" />
                </div>
             </div>
          </div>
          
          <div style={{ display: 'flex', gap: '40px', marginTop: '24px', position: 'relative' }}>
             <div style={{ width: '240px', height: '200px', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--background), transparent)' }}></div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                   <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>Now Mixing</p>
                   <p style={{ fontSize: '1.2rem', fontWeight: 700 }}>깊은 숲속의 장작</p>
                </div>
                {/* Simulated Waveform or Viz */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px', position: 'absolute', right: '20px', bottom: '20px' }}>
                   {[0.4, 0.8, 0.6, 0.9, 0.5, 0.7].map((h, i) => (
                      <motion.div 
                         key={i}
                         animate={{ height: isPlaying ? [h*30, h*10, h*40, h*20] : 10 }}
                         transition={{ repeat: Infinity, duration: 1 + i*0.2, ease: "easeInOut" }}
                         style={{ width: '4px', background: 'var(--accent)', borderRadius: '2px' }}
                      ></motion.div>
                   ))}
                </div>
             </div>
             
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
                   <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Rewind size={24} /></button>
                   <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      style={{ 
                         width: '72px', height: '72px', borderRadius: '50%', background: 'var(--primary)', 
                         color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                         boxShadow: '0 0 20px rgba(123, 97, 255, 0.5)'
                      }}
                   >
                      {isPlaying ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
                   </button>
                   <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><FastForward size={24} /></button>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                   <Volume2 size={20} color="var(--muted)" />
                   <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', position: 'relative' }}>
                      <div style={{ width: `${volume}%`, height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'white', position: 'absolute', top: '-3px', left: `${volume}%`, transform: 'translateX(-50%)', cursor: 'pointer' }}></div>
                   </div>
                   <span style={{ fontSize: '0.8rem', width: '30px' }}>{volume}%</span>
                </div>
             </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '32px' }}>
             {soundscapes.map((s, i) => (
                <div key={i} className="glass" style={{ padding: '16px', border: 'none', background: 'rgba(255,255,255,0.03)', cursor: 'pointer', transition: 'all 0.2s' }}>
                   <p style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600 }}>{s.type}</p>
                   <p style={{ fontSize: '0.85rem', fontWeight: 600, margin: '4px 0' }}>{s.title}</p>
                   <p style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{s.duration}</p>
                </div>
             ))}
          </div>
        </motion.div>

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
                <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '12px' }}>추천 취침 시작</p>
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
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '12px' }}>* 수면 사이클 90분 단위를 고려했습니다.</p>
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
