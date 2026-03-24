'use client';

import { motion } from 'framer-motion';
import { Target, Gift, Users, Trophy, Star, ChevronRight, Moon, Zap, HandMetal } from 'lucide-react';

export default function Challenges() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  const currentChallenges = [
    { title: '오후 11시 취침 7일 달성', participants: '12,450', reward: '500 P', category: 'Night', icon: Moon, level: 'Hard' },
    { title: '기상 후 5분 스트레칭', participants: '8,210', reward: '200 P', category: 'Morning', icon: Zap, level: 'Easy' },
    { title: '스마트폰 없이 잠들기', participants: '15,300', reward: '300 P', category: 'Habit', icon: HandMetal, level: 'Normal' },
  ];

  const trophies = [
    { title: '초보 수면꾼', date: '2026.03.10', icon: Trophy, color: '#CD7F32' },
    { title: '기상 요정', date: '2026.03.15', icon: Star, color: '#C0C0C0' },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <header style={{ marginBottom: '40px' }}>
        <h1 className="gradient-text">커뮤니티 & 챌린지</h1>
        <p style={{ color: 'var(--muted)' }}>함께하면 더 쉬운 수면 리듬 관리. 다른 슬립튜너들과 함께 목표를 달성하세요.</p>
      </header>

      <div className="dashboard-grid">
        <motion.div variants={itemVariants} className="glass-card span-2">
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2>진행 중인 챌린지</h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                 <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>전체 보기</button>
              </div>
           </div>

           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentChallenges.map((c, i) => (
                <div key={i} className="glass" style={{ padding: '20px', border: 'none', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ background: 'rgba(123, 97, 255, 0.1)', padding: '12px', borderRadius: '16px' }}>
                         <c.icon color="var(--primary)" size={24} />
                      </div>
                      <div>
                         <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{c.title}</h3>
                         <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>참여자 {c.participants}명 • {c.level}</p>
                      </div>
                   </div>
                   
                   <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <div style={{ textAlign: 'right' }}>
                         <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--secondary)' }}>{c.reward}</p>
                         <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>보상</p>
                      </div>
                      <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>참여하기</button>
                   </div>
                </div>
              ))}
           </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card">
           <h2>나의 명예의 전당</h2>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {trophies.map((t, i) => (
                <div key={i} className="glass" style={{ padding: '16px', border: 'none', background: 'rgba(123, 97, 255, 0.05)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                   <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <t.icon color={t.color} size={24} />
                   </div>
                   <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{t.title}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>획득일: {t.date}</p>
                   </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '12px' }}>다음 훈장까지 챌린지 2개 남음!</p>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                     <div style={{ width: '60%', background: 'var(--accent)', height: '100%' }}></div>
                  </div>
              </div>
           </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card span-3">
           <h2>슬립튜너 커뮤니티 Talk</h2>
           <div style={{ gridTemplateColumns: 'repeat(3, 1fr)', display: 'grid', gap: '20px' }}>
              {[
                { author: '밤의여왕', text: '어제 카페인 끊었더니 수면 점수 20점이나 올랐어요 대박!', likes: 24, comments: 8 },
                { author: '꿈꾸는베어', text: '슬립팡 레벨 15 찍으신 분 있나요? 성장이 점점 더뎌지네요..', likes: 12, comments: 20 },
                { author: '아침형지배자', text: '오전 기상 후 5분 스트레칭 진짜 효과 좋습니다. 다들 꼭 해보세요.', likes: 56, comments: 14 }
              ].map((talk, i) => (
                <div key={i} className="glass" style={{ padding: '20px', border: 'none', background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--glass-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>👤</div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{talk.author}</span>
                   </div>
                   <p style={{ fontSize: '0.9rem', color: 'var(--foreground)', lineHeight: '1.4' }}>{talk.text}</p>
                   <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '0.75rem', color: 'var(--muted)' }}>
                      <span>👍 {talk.likes}</span>
                      <span>💬 {talk.comments}</span>
                   </div>
                </div>
              ))}
           </div>
           <button className="btn btn-secondary" style={{ width: '100%', marginTop: '24px' }}>커뮤니티 더 보기</button>
        </motion.div>
      </div>
    </motion.div>
  );
}
