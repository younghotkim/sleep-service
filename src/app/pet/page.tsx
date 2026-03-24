'use client';

import { motion } from 'framer-motion';
import { Sparkles, Moon, Sun, Heart, Star, Target, Zap } from 'lucide-react';

export default function Pet() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <header style={{ marginBottom: '40px' }}>
        <h1 className="gradient-text">나의 수면 펫 & 정원</h1>
        <p style={{ color: 'var(--muted)' }}>규칙적인 수면 리듬이 쌓일수록 펫이 성장하고 정원이 아름다워집니다.</p>
      </header>

      <div className="dashboard-grid">
        <motion.div variants={itemVariants} className="glass-card span-2" style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
           <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(123, 97, 255, 0.15) 0%, transparent 70%)' }}></div>
           
           <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', gap: '8px' }}>
              <div className="glass" style={{ padding: '8px 16px', border: 'none', background: 'rgba(255,255,255,0.05)', fontSize: '0.9rem', fontWeight: 600 }}>Lv. 12 슬립팡 (Slee-Pang)</div>
           </div>

           {/* Pet placeholder visual */}
           <motion.div 
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
           >
              <div style={{ 
                width: '120px', height: '120px', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', 
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                boxShadow: '0 0 40px rgba(123, 97, 255, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.3)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
                   <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }}></div>
                   <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }}></div>
                </div>
                <div style={{ width: '12px', height: '4px', background: 'rgba(255,255,255,0.5)', borderRadius: '2px', margin: '14px auto' }}></div>
              </div>
              <div style={{ width: '100px', height: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '50%', marginTop: '30px', filter: 'blur(4px)' }}></div>
              <p style={{ marginTop: '20px', fontWeight: 700, fontSize: '1.2rem' }}>슬립팡이 낮잠을 자고 있어요!</p>
           </motion.div>

           <div style={{ position: 'absolute', bottom: '24px', right: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
             <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>먹이 주기 (10 P)</button>
             <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>정원 꾸미기</button>
           </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card">
           <h2>성장 상태</h2>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>다음 레벨까지</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>80%</span>
                 </div>
                 <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: '80%' }}
                       transition={{ duration: 1.5 }}
                       style={{ height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px rgba(123, 97, 255, 0.5)' }}
                    ></motion.div>
                 </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                 <div className="glass" style={{ padding: '16px', border: 'none', background: 'rgba(247, 160, 114, 0.05)', textAlign: 'center' }}>
                    <Heart size={20} color="var(--secondary)" style={{ marginBottom: '4px' }} />
                    <p style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>애정도</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>98</p>
                 </div>
                 <div className="glass" style={{ padding: '16px', border: 'none', background: 'rgba(0, 209, 255, 0.05)', textAlign: 'center' }}>
                    <Zap size={20} color="var(--accent)" style={{ marginBottom: '4px' }} />
                    <p style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>에너지</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>100</p>
                 </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                 <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>최근 업적</p>
                 <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Target size={16} color="black" />
                    </div>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#C0C0C0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Star size={16} color="black" />
                    </div>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Moon size={16} color="white" />
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card span-2">
           <h2>정원 인벤토리</h2>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
              {[
                { name: '밤하늘 구름', emoji: '☁️', count: 12 },
                { name: '반짝이는 별', emoji: '⭐', count: 45 },
                { name: '초승달 텐트', emoji: '⛺', count: 1 },
                { name: '보랏빛 꽃', emoji: '🪻', count: 8 },
                { name: '숙면 배개', emoji: '💤', count: 3 }
              ].map((item, i) => (
                <div key={i} className="glass" style={{ padding: '16px', border: 'none', background: 'rgba(255,255,255,0.03)', textAlign: 'center', cursor: 'pointer' }}>
                   <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{item.emoji}</div>
                   <p style={{ fontSize: '0.75rem', fontWeight: 600 }}>{item.name}</p>
                   <p style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{item.count}개</p>
                </div>
              ))}
              <div className="glass" style={{ padding: '16px', border: '1px dashed var(--border)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                 <span style={{ fontSize: '1.5rem', color: 'var(--muted)' }}>+</span>
              </div>
           </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card">
           <h2>포인트 숍</h2>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid var(--border)' }}>
                 <span style={{ fontSize: '0.9rem' }}>일반 먹이</span>
                 <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>10 P</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid var(--border)' }}>
                 <span style={{ fontSize: '0.9rem' }}>슈퍼 먹이</span>
                 <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>50 P</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px' }}>
                 <span style={{ fontSize: '0.9rem' }}>밤의 꽃 씨앗</span>
                 <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>120 P</span>
              </div>
              <button className="btn btn-primary" style={{ marginTop: 'auto' }}>상점 방문하기</button>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
