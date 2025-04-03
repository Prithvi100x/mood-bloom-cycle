
import React from 'react';
import { MoodType } from '@/types';
import { 
  Smile, 
  Zap, 
  Sunset, 
  BatteryLow, 
  AlertCircle, 
  Flame, 
  CloudRain, 
  Brain 
} from 'lucide-react';

interface MoodSelectorProps {
  selectedMood?: MoodType;
  onSelectMood: (mood: MoodType) => void;
}

interface MoodOption {
  type: MoodType;
  label: string;
  icon: React.ReactNode;
  className: string;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelectMood }) => {
  const moodOptions: MoodOption[] = [
    { 
      type: 'happy', 
      label: 'Happy', 
      icon: <Smile size={24} strokeWidth={2.5} className="transform transition-all duration-300" />, 
      className: 'mood-card-happy' 
    },
    { 
      type: 'energetic', 
      label: 'Energetic', 
      icon: <Zap size={24} strokeWidth={2.5} className="transform transition-all duration-300 animate-pulse" />, 
      className: 'mood-card-energetic' 
    },
    { 
      type: 'calm', 
      label: 'Calm', 
      icon: <Sunset size={24} strokeWidth={2.5} className="transform transition-all duration-300" />, 
      className: 'mood-card-calm' 
    },
    { 
      type: 'tired', 
      label: 'Tired', 
      icon: <BatteryLow size={24} strokeWidth={2.5} className="transform transition-all duration-300" />, 
      className: 'mood-card-tired' 
    },
    { 
      type: 'anxious', 
      label: 'Anxious', 
      icon: <AlertCircle size={24} strokeWidth={2.5} className="transform transition-all duration-300 animate-pulse" />, 
      className: 'mood-card-anxious' 
    },
    { 
      type: 'irritable', 
      label: 'Irritable', 
      icon: <Flame size={24} strokeWidth={2.5} className="transform transition-all duration-300 animate-bounce" />, 
      className: 'mood-card-irritable' 
    },
    { 
      type: 'sad', 
      label: 'Sad', 
      icon: <CloudRain size={24} strokeWidth={2.5} className="transform transition-all duration-300" />, 
      className: 'mood-card-sad' 
    },
    { 
      type: 'stressed', 
      label: 'Stressed', 
      icon: <Brain size={24} strokeWidth={2.5} className="transform transition-all duration-300 animate-pulse" />, 
      className: 'mood-card-stressed' 
    }
  ];

  return (
    <div className="my-4">
      <h3 className="text-lg font-medium mb-3">How are you feeling today?</h3>
      <div className="grid grid-cols-4 gap-3">
        {moodOptions.map((mood) => (
          <button
            key={mood.type}
            onClick={() => onSelectMood(mood.type)}
            className={`${mood.className} ${
              selectedMood === mood.type ? 'ring-2 ring-primary scale-105 shadow-lg' : ''
            } p-3 rounded-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-md hover:shadow-xl`}
          >
            <div className="text-white mb-1 drop-shadow-md">{mood.icon}</div>
            <span className="text-xs font-medium text-white drop-shadow-md">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
