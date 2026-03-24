'use client';

import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import Input from './Input';
import { Thermometer, Droplets, Volume2, Save } from 'lucide-react';

const EnvironmentRecorder: React.FC = () => {
  const [data, setData] = useState({
    temperature: '',
    humidity: '',
    noise: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Saving environment data:', data);
    // Logic to save data would go here
  };

  return (
    <Card className="w-full">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        수면 환경 기록
      </h3>
      
      <div className="flex flex-col gap-6">
        <Input
          label="상온 (°C)"
          name="temperature"
          value={data.temperature}
          onChange={handleChange}
          placeholder="예: 22"
          icon={<Thermometer size={18} />}
          type="number"
        />
        
        <Input
          label="습도 (%)"
          name="humidity"
          value={data.humidity}
          onChange={handleChange}
          placeholder="예: 50"
          icon={<Droplets size={18} />}
          type="number"
        />
        
        <Input
          label="소음 레벨 (dB)"
          name="noise"
          value={data.noise}
          onChange={handleChange}
          placeholder="평상시 소음"
          icon={<Volume2 size={18} />}
          type="number"
        />

        <Button 
          variant="primary" 
          onClick={handleSave} 
          className="w-full mt-4"
          icon={<Save size={18} />}
        >
          기록 저장하기
        </Button>
      </div>
    </Card>
  );
};

export default EnvironmentRecorder;
