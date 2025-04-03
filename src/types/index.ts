
export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

export type MoodType = 
  | 'happy' 
  | 'energetic' 
  | 'calm' 
  | 'tired' 
  | 'anxious' 
  | 'irritable' 
  | 'sad' 
  | 'stressed';

export interface CycleDay {
  date: Date;
  phase?: CyclePhase;
  mood?: MoodType;
  notes?: string;
  period?: boolean;
  symptoms?: string[];
}

export interface FoodRecommendation {
  id: string;
  name: string;
  description: string;
  benefits: string;
  imageUrl?: string;
  tags: string[];
  forMoods: MoodType[];
  forPhases: CyclePhase[];
}

export interface UserCycle {
  startDate: Date;
  endDate?: Date;
  periodLength: number;
  cycleLength: number;
  days: Record<string, CycleDay>;
}

export interface UserData {
  cycles: UserCycle[];
  currentCycle?: UserCycle;
  averageCycleLength: number;
  averagePeriodLength: number;
}
