'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Moon, Sun, Heart, Star, Target, Zap, Gift, ShoppingBag, Coins } from 'lucide-react';
import { INITIAL_REWARD_STATE } from '@/lib/rewards';

export default function Pet() {
  const [points, setPoints] = useState(INITIAL_REWARD_STATE.points);
  const [petState, setPetState] = useState({
    level: INITIAL_REWARD_STATE.level,
    exp: INITIAL_REWARD_STATE.exp,
    affection: INITIAL_REWARD_STATE.affection,
    energy: INITIAL_REWARD_STATE.energy,
    name: '슬립팡 (Slee-Pang)'
  });
  const [showRewardToast, setShowRewardToast] = useState(false);
  const [isFeeding, setIsFeeding] = useState(false);

  // Feeding logic
  const handleFeed = () => {
    if (points >= 10) {
      setPoints(prev => prev - 10);
      setIsFeeding(true);
      
      setPetState(prev => {
        let newExp = prev.exp + 5;
        let newLevel = prev.level;
        if (newExp >= 100) {
          newExp -= 100;
          newLevel += 1;
          setShowRewardToast(true);
        }
        return {
          ...prev,
          level: newLevel,
          exp: newExp,
          affection: Math.min(100, prev.affection + 2),
          energy: Math.min(100, prev.energy + 5)
        };
      });

      setTimeout(() => setIsFeeding(false), 2000);
    }
  };

  useEffect(() => {
    if (showRewardToast) {
      const timer = setTimeout(() => setShowRewardToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showRewardToast]);

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
      <AnimatePresence>
        {showRewardToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="glass"
            style={{ 
              position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', 
              zIndex: 1000, background: 'var(--primary)', color: 'white', padding: '12px 24px',
              borderRadius: '99px', boxShadow: '0 0 20px rgba(123, 97, 255, 0.5)', display: 'flex',
              alignItems: 'center', gap: '8px', border: 'none'
            }}
          >
            <Sparkles size={18} />
            <span>레벨 업! 새로운 정원 테마가 해금되었습니다! ✨</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="gradient-text">나의 수면 펫 & 정원</h1>
          <p style={{ color: 'var(--muted)' }}>규칙적인 수면 리듬이 쌓일수록 펫이 성장하고 정원이 아름다워집니다.</p>
        </div>
        <div className="glass" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
          <Coins size={18} color="#FFD700" />
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{points.toLocaleString()} P</span>
        </div>
      </header>

      <div className="dashboard-grid">
        <motion.div variants={itemVariants} className="glass-card span-2" style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
           <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(123, 97, 255, 0.15) 0%, transparent 70%)' }}></div>
           
           <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', gap: '8px' }}>
              <div className="glass" style={{ padding: '8px 16px', border: 'none', background: 'rgba(255,255,255,0.05)', fontSize: '0.9rem', fontWeight: 600 }}>Lv. {petState.level} {petState.name}</div>
           </div>

           {/* Pet visual */}
           <motion.div 
              animate={isFeeding ? {
                scale: [1, 1.2, 1, 1.1, 1],
                y: [0, -30, 0, -10, 0],
                rotate: [0, 10, -10, 5, 0]
              } : { 
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: isFeeding ? 0 : Infinity, duration: isFeeding ? 2 : 4, ease: "easeInOut" }}
              style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
           >
              <AnimatePresence>
                {isFeeding && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0, y: 0 }}
                    animate={{ scale: 1, opacity: 1, y: -60 }}
                    exit={{ opacity: 0 }}
                    style={{ position: 'absolute', top: 0 }}
                  >
                    <Star size={40} fill="#FFD700" color="#FFD700" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div style={{ 
                width: '120px', height: '120px', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', 
                background: petState.level > 15 ? 'linear-gradient(135deg, gold, #7B61FF)' : 'linear-gradient(135deg, var(--primary), var(--accent))',
                boxShadow: `0 0 40px rgba(123, 97, 255, ${isFeeding ? 0.9 : 0.6}), inset 0 0 20px rgba(255, 255, 255, 0.3)`,
                transition: 'all 0.5s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
                   <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }}></div>
                   <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }}></div>
                </div>
                <div style={{ width: '12px', height: '4px', background: 'rgba(255,255,255,0.5)', borderRadius: '2px', margin: '14px auto' }}></div>
              </div>
              <div style={{ width: '100px', height: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '50%', marginTop: '30px', filter: 'blur(4px)' }}></div>
              <p style={{ marginTop: '20px', fontWeight: 700, fontSize: '1.2rem' }}>
                {isFeeding ? '함냐함냐! 맛있어요!' : '슬립팡이 낮잠을 자고 있어요!'}
              </p>
           </motion.div>

           <div style={{ position: 'absolute', bottom: '24px', right: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                onClick={handleFeed}
                disabled={points < 10 || isFeeding}
                className="btn btn-secondary" 
                style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Gift size={16} />
                먹이 주기 (10 P)
              </button>
              <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={16} />
                정원 꾸미기
              </button>
           </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card">
           <h2>성장 상태</h2>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>다음 레벨까지</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{petState.exp}%</span>
                 </div>
                 <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${petState.exp}%` }}
                       transition={{ duration: 0.5 }}
                       style={{ height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px rgba(123, 97, 255, 0.5)' }}
                    ></motion.div>
                 </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                 <div className="glass" style={{ padding: '16px', border: 'none', background: 'rgba(247, 160, 114, 0.05)', textAlign: 'center' }}>
                    <Heart size={20} color="var(--secondary)" style={{ marginBottom: '4px' }} />
                    <p style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>애정도</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>{petState.affection}</p>
                 </div>
                 <div className="glass" style={{ padding: '16px', border: 'none', background: 'rgba(0, 209, 255, 0.05)', textAlign: 'center' }}>
                    <Zap size={20} color="var(--accent)" style={{ marginBottom: '4px' }} />
                    <p style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>에너지</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>{petState.energy}</p>
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
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid var(--border)' }}>
                 <span style={{ fontSize: '0.9rem' }}>일반 먹이</span>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>10 P</span>
                    <button onClick={handleFeed} disabled={points < 10} className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>구매</button>
                 </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid var(--border)' }}>
                 <span style={{ fontSize: '0.9rem' }}>슈퍼 먹이</span>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>50 P</span>
                    <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>구매</button>
                 </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px' }}>
                 <span style={{ fontSize: '0.9rem' }}>밤의 꽃 씨앗</span>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>120 P</span>
                    <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>구매</button>
                 </div>
              </div>
              <button className="btn btn-primary" style={{ marginTop: 'auto' }}>상점 방문하기</button>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
