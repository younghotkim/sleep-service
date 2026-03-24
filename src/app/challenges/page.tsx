'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Zap, HandMetal, Trophy, Star } from 'lucide-react';
import { challengeService, Challenge } from '@/lib/services/challenge-service';
import ChallengeCard from '@/components/ChallengeCard';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      const { data } = await challengeService.getChallenges();
      if (data) setChallenges(data);
      setLoading(false);
    };
    fetchChallenges();
  }, []);

  const handleJoin = async (id: string) => {
    await challengeService.joinChallenge(id);
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, joined: true, participants: (parseInt(c.participants.replace(',', '')) + 1).toLocaleString() } : c));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <header style={{ marginBottom: '40px' }}>
        <h1 className="gradient-text">전체 챌린지</h1>
        <p style={{ color: 'var(--muted)' }}>당신의 완벽한 수면을 위한 특별한 미션들입니다.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>챌린지를 불러오는 중...</div>
        ) : (
          challenges.map((c) => (
            <ChallengeCard 
              key={c.id}
              title={c.title}
              participants={c.participants}
              reward={c.reward}
              level={c.level}
              icon={c.icon}
              joined={c.joined}
              onJoin={() => handleJoin(c.id)}
            />
          ))
        )}
      </div>

      <section style={{ marginTop: '64px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <Trophy color="var(--secondary)" size={24} />
          챌린지 명예의 전당
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="glass-card" style={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'rgba(205, 127, 50, 0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Trophy color="#CD7F32" size={24} />
            </div>
            <div>
               <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>초보 수면꾼</h4>
               <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>첫 챌린지 성공 기념</p>
            </div>
          </div>
          <div className="glass-card" style={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'rgba(192, 192, 192, 0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Star color="#C0C0C0" size={24} />
            </div>
            <div>
               <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>기상 요정</h4>
               <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>아침 기상 챌린지 3회 성공</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
