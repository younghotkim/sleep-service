'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Moon, LineChart, Gift, Settings, Sparkles, User } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { title: '대시보드', icon: Home, path: '/' },
    { title: '수면 데이터', icon: LineChart, path: '/tracking' },
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

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path} className={`nav-link ${isActive ? 'active' : ''}`}>
              <Icon />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Link href="/settings" className={`nav-link ${pathname === '/settings' ? 'active' : ''}`}>
          <Settings />
          <span>설정</span>
        </Link>
        
        <div className="glass-card" style={{ padding: '16px', marginTop: '20px' }}>
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
