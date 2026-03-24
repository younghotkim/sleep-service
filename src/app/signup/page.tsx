'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Mail, Lock, Loader2, User } from 'lucide-react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Success - show verification message or redirect
      router.push('/login?message=Check your email to confirm your account');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card" 
        style={{ width: '100%', maxWidth: '400px', padding: '40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ background: 'var(--primary-glow)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 16px' }}>
            <UserPlus size={32} color="var(--primary)" />
          </div>
          <h1 className="gradient-text">회원가입</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>SleepTune과 함께 더 나은 수면을 시작하세요</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ padding: '12px', background: 'rgba(255, 71, 87, 0.1)', border: '1px solid rgba(255, 71, 87, 0.2)', borderRadius: '8px', color: '#ff4757', fontSize: '0.85rem', marginBottom: '20px', textAlign: 'center' }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            <input 
              type="text" 
              placeholder="이름" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="glass"
              style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            <input 
              type="email" 
              placeholder="이메일 주소" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="glass"
              style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            <input 
              type="password" 
              placeholder="비밀번호" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="glass"
              style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary" 
            style={{ width: '100%', height: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : '가입하기'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--muted)' }}>이미 계정이 있으신가요? </span>
          <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>로그인</Link>
        </div>
      </motion.div>
    </div>
  );
}
