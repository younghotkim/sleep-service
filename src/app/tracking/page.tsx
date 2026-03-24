'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Checklist from '@/components/Checklist';
import EnvironmentRecorder from '@/components/EnvironmentRecorder';
import { ClipboardList } from 'lucide-react';

export default function TrackingPage() {
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
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show"
      className="max-w-4xl mx-auto"
    >
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ClipboardList className="text-primary" size={24} />
          </div>
          <p className="subtitle m-0">수면 추적 및 관리</p>
        </div>
        <h1 className="gradient-text">나의 수면 위생 가이드</h1>
        <p className="text-muted-foreground mt-2">
          매일의 습관과 환경이 완벽한 숙면을 만듭니다. 오늘을 기록하고 관리해보세요.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <Checklist />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <EnvironmentRecorder />
        </motion.div>
      </div>

      <motion.section variants={itemVariants} className="mt-12">
        <div className="glass-card bg-gradient-to-br from-primary/5 to-accent/5">
          <h2 className="text-lg font-bold mb-3">💡 수석 분석가의 조언</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            현재 기록하신 실내 온도 22도는 숙면에 매우 적합한 환경입니다. 다만 습도가 40% 이하로 떨어지면 호흡기가 건조해질 수 있으니 가습기를 활용해 50-60%를 유지하는 것을 추천드립니다.
          </p>
        </div>
      </motion.section>
    </motion.div>
  );
}
