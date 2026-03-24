'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Activity, Moon, Clock, ChevronRight, Zap, Target, Star, Coins, CheckCircle2 } from 'lucide-react';
import { INITIAL_REWARD_STATE } from '@/lib/rewards';

export default function Home() {
  const [points, setPoints] = useState(INITIAL_REWARD_STATE.points);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [showClaimAnimation, setShowClaimAnimation] = useState(false);

  const handleClaimReward = () => {
    if (!rewardClaimed) {
      setShowClaimAnimation(true);
      setTimeout(() => {
        setPoints(p => p + 120);
        setRewardClaimed(true);
        setShowClaimAnimation(false);
      }, 1500);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p className="subtitle" style={{ marginBottom: '8px' }}>2026년 3월 24일 (화)</p>
          <h1 className="gradient-text">안녕하세요, 슬립튜너님! 👋</h1>
          <p style={{ color: 'var(--muted)' }}>어젯밤 수면 점수는 우수합니다. 오늘 하루도 개운하게 시작해볼까요?</p>
        </div>
        <div className="glass" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
          <Coins size={18} color="#FFD700" />
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{points.toLocaleString()} P</span>
        </div>
      </header>

      <section className="dashboard-grid">
        <motion.div variants={itemVariants} className="glass-card span-2" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ marginBottom: 0 }}>나의 수면 점수</h2>
            <div className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>상세 분석 보기</div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <div className="sleep-score-circle" style={{ border: '8px solid rgba(123, 97, 255, 0.2)', borderRadius: '50%', boxShadow: '0 0 20px rgba(123, 97, 255, 0.3)' }}>
              <span className="sleep-score-value gradient-text">85</span>
              <div style={{ position: 'absolute', bottom: '20px', fontSize: '0.8rem', color: 'var(--muted)' }}>Good</div>
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>총 수면 시간</span>
                  <span style={{ fontWeight: 600 }}>7시간 24분</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>깊은 잠 (Deep)</span>
                  <span style={{ fontWeight: 600, color: 'var(--accent)' }}>1시간 40분 (22%)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>렘 수면 (REM)</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>2시간 10분 (28%)</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', height: '8px', borderRadius: '4px', marginTop: '8px', overflow: 'hidden', display: 'flex' }}>
                  <div style={{ width: '22%', background: 'var(--accent)', height: '100%' }}></div>
                  <div style={{ width: '50%', background: 'var(--primary)', height: '100%' }}></div>
                  <div style={{ width: '28%', background: 'var(--muted)', height: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card" style={{ position: 'relative', background: 'linear-gradient(135deg, rgba(123, 97, 255, 0.1), rgba(0, 209, 255, 0.05))', overflow: 'hidden' }}>
          <h2>Sleep-to-Earn</h2>
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <motion.div 
              animate={showClaimAnimation ? { 
                scale: [1, 1.5, 0],
                opacity: [1, 1, 0],
                y: [0, -20, -50]
              } : (rewardClaimed ? { scale: 1 } : { scale: [1, 1.1, 1] })} 
              transition={{ repeat: rewardClaimed || showClaimAnimation ? 0 : Infinity, duration: 2 }}
            >
               <Star size={48} fill={rewardClaimed ? "var(--muted)" : "var(--secondary)"} color={rewardClaimed ? "var(--muted)" : "var(--secondary)"} />
            </motion.div>
            
            <AnimatePresence>
              {showClaimAnimation && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1.2 }}
                  exit={{ opacity: 0, scale: 2 }}
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
                >
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: '#FFD700' }}>+120 P</span>
                </motion.div>
              )}
            </AnimatePresence>

            <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: '16px 0 4px', color: rewardClaimed ? 'var(--muted)' : 'inherit' }}>
              {rewardClaimed ? '+0 Point' : '+120 Point'}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
              {rewardClaimed ? '오늘의 보상을 모두 받았습니다.' : '어젯밤 목표 수면 시간 준수!'}
            </p>
          </div>
          <button 
            onClick={handleClaimReward}
            disabled={rewardClaimed || showClaimAnimation}
            className={rewardClaimed ? "btn btn-secondary" : "btn btn-primary"} 
            style={{ width: '100%', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            {rewardClaimed ? (
              <>
                <CheckCircle2 size={18} />
                수령 완료
              </>
            ) : '보상 받기'}
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card">
          <h2>생활 습관 체크</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'rgba(247, 160, 114, 0.1)', padding: '10px', borderRadius: '12px' }}>
                <Coffee color="var(--secondary)" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>오후 카페인</p>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '4px' }}>
                  <div style={{ width: '30%', background: 'var(--secondary)', height: '100%' }}></div>
                </div>
              </div>
              <span style={{ fontSize: '0.8rem' }}>적정</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'rgba(0, 209, 255, 0.1)', padding: '10px', borderRadius: '12px' }}>
                <Activity color="var(--accent)" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>활동량</p>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '4px' }}>
                  <div style={{ width: '80%', background: 'var(--accent)', height: '100%' }}></div>
                </div>
              </div>
              <span style={{ fontSize: '0.8rem' }}>높음</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card span-2">
          <h2>오늘 밤 추천 솔루션</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="glass" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', border: 'none', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <Moon size={20} color="var(--primary)" />
                 <span style={{ fontWeight: 600 }}>90분 수면 사이클 알람</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>내일 07:00 기상을 위해 밤 11:30에 잠드시는 것을 추천해요.</p>
              <button className="btn btn-secondary" style={{ padding: '8px', fontSize: '0.8rem' }}>알람 설정하기</button>
            </div>
            
            <div className="glass" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', border: 'none', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <Zap size={20} color="var(--accent)" />
                 <span style={{ fontWeight: 600 }}>AI 사운드스케이프</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>오늘의 피로도를 분석한 결과, &apos;깊은 숲속 장작 소리&apos;를 추천합니다.</p>
              <button className="btn btn-secondary" style={{ padding: '8px', fontSize: '0.8rem' }}>재생하기</button>
            </div>
          </div>
        </motion.div>
      </section>

      <section style={{ marginTop: '48px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Star color="var(--secondary)" fill="var(--secondary)" size={20} />
          진행중인 챌린지
        </h2>
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }}>
          {['오후 11시 전 취침하기', '자기 전 핸드폰 멀리하기', '기상 후 5분 스트레칭'].map((challenge, i) => (
            <div key={i} className="glass-card" style={{ minWidth: '280px', flexShrink: 0, padding: '20px' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '8px' }}>Challenge {i+1}</p>
              <h3 style={{ fontSize: '1.1rem' }}>{challenge}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>참여자 1.2k</span>
                <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>참여하기</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
