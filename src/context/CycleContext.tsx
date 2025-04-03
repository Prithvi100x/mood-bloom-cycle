
import React, { createContext, useContext, useState, useEffect } from 'react';
import { addDays, format, differenceInDays } from 'date-fns';
import { MoodType, CyclePhase, UserCycle, UserData, CycleDay } from '@/types';

interface CycleContextType {
  userData: UserData;
  currentMood?: MoodType;
  currentPhase?: CyclePhase;
  todayData?: CycleDay;
  setMood: (mood: MoodType) => void;
  updateCycle: (cycle: UserCycle) => void;
  addNote: (note: string) => void;
  addSymptom: (symptom: string) => void;
}

const defaultCycleData: UserData = {
  cycles: [],
  averageCycleLength: 28,
  averagePeriodLength: 5
};

const CycleContext = createContext<CycleContextType | undefined>(undefined);

export const CycleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    // Try to load from localStorage
    const savedData = localStorage.getItem('cycleData');
    return savedData ? JSON.parse(savedData) : defaultCycleData;
  });
  
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>();
  const [currentPhase, setCurrentPhase] = useState<CyclePhase | undefined>();
  const [todayData, setTodayData] = useState<CycleDay | undefined>();
  
  // Save to localStorage whenever userData changes
  useEffect(() => {
    localStorage.setItem('cycleData', JSON.stringify(userData));
  }, [userData]);
  
  // Calculate current phase based on cycle data
  useEffect(() => {
    if (userData.currentCycle) {
      const today = new Date();
      const todayFormatted = format(today, 'yyyy-MM-dd');
      
      // Get today's data if available
      const dayData = userData.currentCycle.days[todayFormatted];
      if (dayData) {
        setTodayData(dayData);
        if (dayData.mood) {
          setCurrentMood(dayData.mood);
        }
      }
      
      // Calculate phase
      const daysSinceStart = differenceInDays(today, userData.currentCycle.startDate);
      
      if (daysSinceStart < 0) {
        setCurrentPhase(undefined);
      } else if (daysSinceStart < userData.currentCycle.periodLength) {
        setCurrentPhase('menstrual');
      } else if (daysSinceStart < 14) {
        setCurrentPhase('follicular');
      } else if (daysSinceStart < 16) {
        setCurrentPhase('ovulation');
      } else if (daysSinceStart < userData.currentCycle.cycleLength) {
        setCurrentPhase('luteal');
      } else {
        // Beyond expected cycle length
        setCurrentPhase(undefined);
      }
    }
  }, [userData]);
  
  const setMood = (mood: MoodType) => {
    setCurrentMood(mood);
    
    // Update today's mood in the current cycle
    if (userData.currentCycle) {
      const today = new Date();
      const todayFormatted = format(today, 'yyyy-MM-dd');
      
      const updatedDays = { ...userData.currentCycle.days };
      if (!updatedDays[todayFormatted]) {
        updatedDays[todayFormatted] = { date: today, mood };
      } else {
        updatedDays[todayFormatted] = { ...updatedDays[todayFormatted], mood };
      }
      
      const updatedCycle = { ...userData.currentCycle, days: updatedDays };
      setUserData({
        ...userData,
        currentCycle: updatedCycle
      });
    }
  };
  
  const updateCycle = (cycle: UserCycle) => {
    setUserData({
      ...userData,
      currentCycle: cycle
    });
  };
  
  const addNote = (note: string) => {
    if (userData.currentCycle) {
      const today = new Date();
      const todayFormatted = format(today, 'yyyy-MM-dd');
      
      const updatedDays = { ...userData.currentCycle.days };
      if (!updatedDays[todayFormatted]) {
        updatedDays[todayFormatted] = { date: today, notes: note };
      } else {
        updatedDays[todayFormatted] = { ...updatedDays[todayFormatted], notes: note };
      }
      
      const updatedCycle = { ...userData.currentCycle, days: updatedDays };
      setUserData({
        ...userData,
        currentCycle: updatedCycle
      });
    }
  };
  
  const addSymptom = (symptom: string) => {
    if (userData.currentCycle) {
      const today = new Date();
      const todayFormatted = format(today, 'yyyy-MM-dd');
      
      const updatedDays = { ...userData.currentCycle.days };
      if (!updatedDays[todayFormatted]) {
        updatedDays[todayFormatted] = { date: today, symptoms: [symptom] };
      } else {
        const currentSymptoms = updatedDays[todayFormatted].symptoms || [];
        updatedDays[todayFormatted] = { 
          ...updatedDays[todayFormatted], 
          symptoms: [...currentSymptoms, symptom] 
        };
      }
      
      const updatedCycle = { ...userData.currentCycle, days: updatedDays };
      setUserData({
        ...userData,
        currentCycle: updatedCycle
      });
    }
  };
  
  return (
    <CycleContext.Provider 
      value={{ 
        userData, 
        currentMood, 
        currentPhase,
        todayData,
        setMood, 
        updateCycle,
        addNote,
        addSymptom
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};

export const useCycle = () => {
  const context = useContext(CycleContext);
  if (context === undefined) {
    throw new Error('useCycle must be used within a CycleProvider');
  }
  return context;
};
