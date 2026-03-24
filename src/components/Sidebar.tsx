'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Moon, LineChart, Gift, Settings, Sparkles, User, Activity, LogIn, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const menuItems = [
    { title: '대시보드', icon: Home, path: '/' },
    { title: '수면 데이터', icon: LineChart, path: '/tracking' },
    { title: '실시간 트래킹', icon: Activity, path: '/tracking/live' },
    { title: '회복 솔루션', icon: Sparkles, path: '/recommendation' },
    { title: '디지털 펫', icon: Moon, path: '/pet' },
    { title: '커뮤니티', icon: User, path: '/community' },
    { title: '챌린지', icon: Gift, path: '/challenges' },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <h1 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: 0 }}>SleepTune</h1>
        <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '4px' }}>Better Sleep, Better Life</p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path} className={`nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {!loading && (
          user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div className="nav-link" style={{ cursor: 'default', color: 'var(--primary)', fontWeight: 600 }}>
                <User size={20} />
                <span style={{ fontSize: '0.85rem' }}>{user.email?.split('@')[0]}님</span>
              </div>
              <button onClick={handleLogout} className="nav-link" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <LogOut size={20} />
                <span>로그아웃</span>
              </button>
            </div>
          ) : (
            <Link href="/login" className={`nav-link ${pathname === '/login' ? 'active' : ''}`}>
              <LogIn size={20} />
              <span>로그인</span>
            </Link>
          )
        )}

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '8px 0' }} />

        <Link href="/settings" className={`nav-link ${pathname === '/settings' ? 'active' : ''}`}>
          <Settings size={20} />
          <span>설정</span>
        </Link>
        
        <div className="glass-card" style={{ padding: '16px', marginTop: '12px' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--secondary)' }}>Sleep-to-Earn</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>2,450 P</span>
          </div>
          <p style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '4px' }}>잠만 자도 쌓이는 포인트</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
