'use client';

import { motion } from 'framer-motion';
import { LucideIcon, Target } from 'lucide-react';

interface ChallengeCardProps {
  title: string;
  participants: string;
  reward: string;
  level: string;
  icon: LucideIcon;
  joined?: boolean;
  onJoin?: () => void;
}

const ChallengeCard = ({ title, participants, reward, level, icon: Icon, joined, onJoin }: ChallengeCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass" 
      style={{ 
        padding: '20px', 
        border: 'none', 
        background: 'rgba(255,255,255,0.02)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ background: joined ? 'rgba(0, 209, 255, 0.1)' : 'rgba(123, 97, 255, 0.1)', padding: '12px', borderRadius: '16px' }}>
          <Icon color={joined ? 'var(--accent)' : 'var(--primary)'} size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{title}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
            참여자 {participants}명 • <span style={{ color: level === 'Hard' ? '#ff4757' : level === 'Easy' ? '#2ed573' : 'var(--secondary)' }}>{level}</span>
          </p>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--secondary)' }}>{reward}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>보상</p>
        </div>
        <button 
          onClick={onJoin}
          disabled={joined}
          className={`btn ${joined ? 'btn-secondary' : 'btn-primary'}`} 
          style={{ padding: '8px 20px', fontSize: '0.85rem', minWidth: '100px' }}
        >
          {joined ? '참여 중' : '참여하기'}
        </button>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;
