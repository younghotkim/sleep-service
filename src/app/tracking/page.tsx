'use client';

import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, BarChart3, TrendingUp, Sun, Moon } from 'lucide-react';

export default function Tracking() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const weeklyData = [
    { day: '월', score: 78, duration: '6h 30m' },
    { day: '화', score: 85, duration: '7h 24m' },
    { day: '수', score: 62, duration: '5h 15m' },
    { day: '목', score: 89, duration: '7h 45m' },
    { day: '금', score: 72, duration: '6h 10m' },
    { day: '토', score: 91, duration: '8h 20m' },
    { day: '일', score: 84, duration: '7h 50m' },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="gradient-text">수면 트래킹 상세 데이터</h1>
          <p style={{ color: 'var(--muted)' }}>최근 7일간의 수면 흐름을 분석했습니다.</p>
        </div>
        <div className="glass" style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', borderRadius: '12px' }}>
          <ChevronLeft size={20} style={{ cursor: 'pointer' }} />
          <span style={{ margin: '0 16px', fontSize: '0.9rem', fontWeight: 600 }}>2026년 3월 17일 ~ 24일</span>
          <ChevronRight size={20} style={{ cursor: 'pointer' }} />
        </div>
      </header>

      <div className="dashboard-grid">
        <motion.div variants={itemVariants} className="glass-card span-2">
          <h2>주간 수면 점수 추이</h2>
          <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '20px 0 40px', position: 'relative' }}>
             {/* Horizontal lines */}
             <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', bottom: '40px' }}></div>
             <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', bottom: '115px' }}></div>
             <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', bottom: '190px' }}></div>
             <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', bottom: '265px' }}></div>
             
             {weeklyData.map((d, i) => (
               <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', zIndex: 1 }}>
                 <div style={{ position: 'relative', width: '32px', height: '225px', display: 'flex', alignItems: 'flex-end' }}>
                   <motion.div 
                     initial={{ height: 0 }}
                     animate={{ height: `${(d.score / 100) * 100}%` }}
                     transition={{ duration: 1, delay: i * 0.1 }}
                     style={{ 
                       width: '100%', 
                       background: d.score > 80 ? 'linear-gradient(to top, var(--primary), var(--accent))' : 'rgba(255,255,255,0.1)', 
                       borderRadius: '8px',
                       boxShadow: d.score > 80 ? '0 0 15px rgba(123, 97, 255, 0.4)' : 'none'
                     }}
                   >
                     <p style={{ position: 'absolute', top: '-24px', width: '100%', textAlign: 'center', fontSize: '0.75rem', fontWeight: 600 }}>{d.score}</p>
                   </motion.div>
                 </div>
                 <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>{d.day}</span>
               </div>
             ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card">
          <h2>분석 요약</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '8px' }}>최저 수면 기록</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FF6B6B' }}>62</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>점 (수요일)</span>
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '8px' }}>최고 수면 기록</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)' }}>91</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>점 (토요일)</span>
              </div>
            </div>

            <div style={{ background: 'rgba(123, 97, 255, 0.1)', padding: '16px', borderRadius: '16px', marginTop: '12px' }}>
              <TrendingUp size={24} color="var(--primary)" style={{ marginBottom: '8px' }} />
              <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>개선 가능성</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '4px' }}>취침 전 2시간 동안 핸드폰 사용을 자제하면 점수가 약 15% 향상될 수 있습니다.</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card span-2">
          <h2>수면 단계 분포 (Weekly)</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
             <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '8px solid var(--primary)', borderRightColor: 'var(--accent)', borderBottomColor: 'var(--muted)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                   <p style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>Average</p>
                   <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>82</p>
                </div>
             </div>
             
             <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div className="glass" style={{ padding: '16px', border: 'none', background: 'rgba(255,255,255,0.02)' }}>
                   <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>깊은 잠</p>
                   <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)' }}>24%</p>
                </div>
                <div className="glass" style={{ padding: '16px', border: 'none', background: 'rgba(255,255,255,0.02)' }}>
                   <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>렘 수면</p>
                   <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>28%</p>
                </div>
                <div className="glass" style={{ padding: '16px', border: 'none', background: 'rgba(255,255,255,0.02)' }}>
                   <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>얕은 잠</p>
                   <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--muted)' }}>48%</p>
                </div>
             </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card">
           <h2 style={{ fontSize: '1.1rem' }}>수면 환경 일지</h2>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                 <span>평균 온도</span>
                 <span style={{ fontWeight: 600 }}>22.5°C (쾌적)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                 <span>평균 습도</span>
                 <span style={{ fontWeight: 600 }}>50% (쾌적)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                 <span>주변 소음</span>
                 <span style={{ fontWeight: 600 }}>32dB (조용함)</span>
              </div>
           </div>
           <button className="btn btn-secondary" style={{ width: '100%', marginTop: '24px', fontSize: '0.85rem' }}>환경 분석 리포트</button>
        </motion.div>
      </div>
    </motion.div>
  );
}
