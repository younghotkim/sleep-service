'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, User, MoreHorizontal, Heart, MessageCircle } from 'lucide-react';
import { communityService, Post } from '@/lib/services/community-service';
import { challengeService, Challenge } from '@/lib/services/challenge-service';
import ChallengeCard from '@/components/ChallengeCard';

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [newPostText, setNewPostText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [postRes, challengeRes] = await Promise.all([
        communityService.getPosts(),
        challengeService.getChallenges()
      ]);
      if (postRes.data) setPosts(postRes.data);
      if (challengeRes.data) setChallenges(challengeRes.data.slice(0, 2));
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    
    setSubmitting(true);
    const { data } = await communityService.createPost(newPostText, '나의 계정');
    if (data) {
      setPosts(prev => [data, ...prev]);
      setNewPostText('');
    }
    setSubmitting(false);
  };

  const handleJoinChallenge = async (id: string) => {
    await challengeService.joinChallenge(id);
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, joined: true } : c));
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
        <h1 className="gradient-text">커뮤니티</h1>
        <p style={{ color: 'var(--muted)' }}>슬립튜너들의 생생한 수면 이야기와 팁을 나누는 공간입니다.</p>
      </header>

      <div className="dashboard-grid">
        <div className="span-2" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Post Creation */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <form onSubmit={handleCreatePost}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={20} color="var(--primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <textarea 
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="오늘 수면은 어떠셨나요? 팁이나 고민을 나눠보세요."
                    style={{ 
                      width: '100%', 
                      background: 'none', 
                      border: 'none', 
                      color: 'white', 
                      fontSize: '1rem', 
                      resize: 'none',
                      minHeight: '80px',
                      outline: 'none'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <button 
                      type="submit"
                      disabled={submitting || !newPostText.trim()}
                      className="btn btn-primary" 
                      style={{ padding: '8px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Send size={16} />
                      <span>작성하기</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Posts Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>이야기를 불러오는 중...</div>
            ) : (
              <AnimatePresence>
                {posts.map((post) => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-card" 
                    style={{ padding: '24px' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <User size={16} color="var(--muted)" />
                        </div>
                        <div>
                          <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{post.author}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{post.createdAt}</p>
                        </div>
                      </div>
                      <button style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                    
                    <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>{post.text}</p>
                    
                    <div style={{ display: 'flex', gap: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <button style={{ background: 'none', border: 'none', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                        <Heart size={18} />
                        <span>{post.likes}</span>
                      </button>
                      <button style={{ background: 'none', border: 'none', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                        <MessageCircle size={18} />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card">
            <h2 style={{ marginBottom: '20px' }}>추천 챌린지</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {challenges.map((c) => (
                <ChallengeCard 
                  key={c.id}
                  title={c.title}
                  participants={c.participants}
                  reward={c.reward}
                  level={c.level}
                  icon={c.icon}
                  joined={c.joined}
                  onJoin={() => handleJoinChallenge(c.id)}
                />
              ))}
              <div style={{ marginTop: '12px' }}>
                <a href="/challenges" style={{ color: 'var(--primary)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>모든 챌린지 보기 →</a>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(123, 97, 255, 0.1), rgba(0, 209, 255, 0.05))' }}>
            <h2 style={{ fontSize: '1.1rem' }}>커뮤니티 수칙</h2>
            <ul style={{ padding: '0 0 0 20px', margin: '12px 0', fontSize: '0.85rem', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>서로 존중하며 따뜻하게 소통해요.</li>
              <li>수면 관련 개인적인 경험 공유는 매우 환영합니다!</li>
              <li>허위 정보나 부적절한 광고는 금지됩니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
