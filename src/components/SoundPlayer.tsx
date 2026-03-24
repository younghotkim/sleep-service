'use client';

import { motion } from 'framer-motion';
import { Play, Pause, FastForward, Rewind, Music, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { Soundscape } from '@/utils/recommendationEngine';

interface SoundPlayerProps {
  currentTrack: Soundscape;
  trackList?: Soundscape[];
  onTrackSelect?: (track: Soundscape) => void;
}

export default function SoundPlayer({ currentTrack, trackList = [], onTrackSelect }: SoundPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(65);

  return (
    <div className="glass-card-container" style={{ gridColumn: 'span 2' }}>
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(123, 97, 255, 0.2), rgba(0, 0, 0, 0.4))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <h2>AI 사운드스케이프 플레이어</h2>
           <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
                 <Music size={16} color="var(--primary)" />
              </div>
           </div>
        </div>
        
        <div style={{ display: 'flex', gap: '40px', marginTop: '24px', position: 'relative' }}>
           <div style={{ width: '240px', height: '200px', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--background), transparent)' }}></div>
              <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                 <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>Now Mixing</p>
                 <p style={{ fontSize: '1.2rem', fontWeight: 700 }}>{currentTrack.title}</p>
              </div>
              {/* Simulated Waveform or Viz */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px', position: 'absolute', right: '20px', bottom: '20px' }}>
                 {[0.4, 0.8, 0.6, 0.9, 0.5, 0.7].map((h, i) => (
                    <motion.div 
                       key={i}
                       animate={{ height: isPlaying ? [h*30, h*10, h*40, h*20] : 10 }}
                       transition={{ repeat: Infinity, duration: 1 + i*0.2, ease: "easeInOut" }}
                       style={{ width: '4px', background: 'var(--accent)', borderRadius: '2px' }}
                    ></motion.div>
                 ))}
              </div>
           </div>
           
           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
                 <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Rewind size={24} /></button>
                 <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{ 
                       width: '72px', height: '72px', borderRadius: '50%', background: 'var(--primary)', 
                       color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                       boxShadow: '0 0 20px rgba(123, 97, 255, 0.5)'
                    }}
                 >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
                 </button>
                 <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><FastForward size={24} /></button>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                 <Volume2 size={20} color="var(--muted)" />
                 <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', position: 'relative' }}>
                    <div style={{ width: `${volume}%`, height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'white', position: 'absolute', top: '-3px', left: `${volume}%`, transform: 'translateX(-50%)', cursor: 'pointer' }}></div>
                 </div>
                 <span style={{ fontSize: '0.8rem', width: '30px' }}>{volume}%</span>
              </div>
           </div>
        </div>
        
        {trackList.length > 0 && (
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '32px' }}>
              {trackList.map((s, i) => (
                 <div 
                    key={i} 
                    className="glass" 
                    onClick={() => onTrackSelect && onTrackSelect(s)}
                    style={{ 
                       padding: '16px', border: currentTrack.id === s.id ? '1px solid var(--primary)' : 'none', 
                       background: currentTrack.id === s.id ? 'rgba(123, 97, 255, 0.1)' : 'rgba(255,255,255,0.03)', 
                       cursor: 'pointer', transition: 'all 0.2s' 
                    }}
                 >
                    <p style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600 }}>{s.type}</p>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, margin: '4px 0' }}>{s.title}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{s.duration}</p>
                 </div>
              ))}
           </div>
        )}
      </div>
    </div>
  );
}
