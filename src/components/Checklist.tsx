'use client';

import React, { useState } from 'react';
import Card from './Card';
import Checkbox from './Checkbox';
import { CheckCircle2 } from 'lucide-react';

const hygieneItems = [
  { id: 'caffeine', label: '오후 2시 이후 카페인 섭취 제한' },
  { id: 'screen', label: '취침 1시간 전 스마트폰 사용 자제' },
  { id: 'temp', label: '적정 실내 온도 유지 (18-22도)' },
  { id: 'light', label: '완전한 암막 환경 조성' },
  { id: 'regular', label: '매일 같은 시간에 기상' },
];

const Checklist: React.FC = () => {
  const [items, setItems] = useState(
    hygieneItems.map(item => ({ ...item, checked: false }))
  );

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const completedCount = items.filter(i => i.checked).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <Card className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <CheckCircle2 size={20} className="text-primary" />
          수면 위생 체크리스트
        </h3>
        <span className="text-sm font-medium text-muted-foreground">
          {completedCount} / {items.length} 완료
        </span>
      </div>

      <div className="w-full bg-border h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-primary h-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <Checkbox
            key={item.id}
            checked={item.checked}
            onChange={() => toggleItem(item.id)}
            label={item.label}
          />
        ))}
      </div>
    </Card>
  );
};

export default Checklist;
