
import React, { useState } from 'react';
import { format, addDays, differenceInDays, isSameDay } from 'date-fns';
import { CyclePhase, UserCycle } from '@/types';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CycleTrackerProps {
  currentCycle?: UserCycle;
  onUpdateCycle: (cycle: UserCycle) => void;
}

const CycleTracker: React.FC<CycleTrackerProps> = ({ 
  currentCycle,
  onUpdateCycle
}) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [isTracking, setIsTracking] = useState<boolean>(!!currentCycle);

  const getCyclePhaseColor = (phase: CyclePhase): string => {
    switch (phase) {
      case 'menstrual': return 'bg-bloom-400';
      case 'follicular': return 'bg-lavender-300';
      case 'ovulation': return 'bg-mint-300';
      case 'luteal': return 'bg-lavender-400';
      default: return 'bg-gray-200';
    }
  };

  const getCyclePhaseForDay = (date: Date): CyclePhase | undefined => {
    if (!currentCycle) return undefined;
    
    const daysSinceStart = differenceInDays(date, currentCycle.startDate);
    
    if (daysSinceStart < 0) return undefined;
    if (daysSinceStart < currentCycle.periodLength) return 'menstrual';
    if (daysSinceStart < 14) return 'follicular';
    if (daysSinceStart < 16) return 'ovulation';
    if (daysSinceStart < currentCycle.cycleLength) return 'luteal';
    
    return undefined;
  };

  const startNewCycle = () => {
    const newCycle: UserCycle = {
      startDate: selectedDate || today,
      periodLength: 5,
      cycleLength: 28,
      days: {
        [format(selectedDate || today, 'yyyy-MM-dd')]: {
          date: selectedDate || today,
          period: true,
          phase: 'menstrual'
        }
      }
    };
    
    onUpdateCycle(newCycle);
    setIsTracking(true);
  };

  const updatePeriodStatus = (date: Date, isPeriod: boolean) => {
    if (!currentCycle) return;
    
    const dateKey = format(date, 'yyyy-MM-dd');
    const updatedDays = { ...currentCycle.days };
    
    if (!updatedDays[dateKey]) {
      updatedDays[dateKey] = { date, period: isPeriod };
    } else {
      updatedDays[dateKey] = { ...updatedDays[dateKey], period: isPeriod };
    }
    
    const updatedCycle = { ...currentCycle, days: updatedDays };
    onUpdateCycle(updatedCycle);
  };

  const getDayIndicator = (date: Date) => {
    if (!currentCycle) return null;
    
    const dateKey = format(date, 'yyyy-MM-dd');
    const day = currentCycle.days[dateKey];
    const phase = getCyclePhaseForDay(date);
    
    if (day?.period) {
      return <div className="cycle-dot absolute w-5 h-5 rounded-full bg-bloom-500 bottom-0.5 right-0.5" />;
    }
    
    if (phase) {
      return <div className={`absolute w-3 h-3 rounded-full ${getCyclePhaseColor(phase)} bottom-0.5 right-0.5`} />;
    }
    
    return null;
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cycle Tracker</h2>
          {selectedDate && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {format(selectedDate, 'MMMM d, yyyy')}
              </p>
              {currentCycle && (
                <p className="text-xs text-primary">
                  {getCyclePhaseForDay(selectedDate) 
                    ? `${getCyclePhaseForDay(selectedDate)} phase` 
                    : 'No cycle data'}
                </p>
              )}
            </div>
          )}
        </div>
        
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          components={{
            DayContent: ({ day }) => (
              <div className="relative w-full h-full flex items-center justify-center">
                {day.day}
                {getDayIndicator(day.date)}
              </div>
            )
          }}
        />
        
        <div className="mt-4 space-y-3">
          {!isTracking ? (
            <Button 
              onClick={startNewCycle} 
              className="w-full bg-bloom-500 hover:bg-bloom-600"
            >
              Start Tracking My Period
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant={currentCycle?.days[format(selectedDate || today, 'yyyy-MM-dd')]?.period ? 'default' : 'outline'}
                onClick={() => updatePeriodStatus(selectedDate || today, true)}
                className="flex-1"
              >
                Period Day
              </Button>
              <Button
                variant={!currentCycle?.days[format(selectedDate || today, 'yyyy-MM-dd')]?.period ? 'default' : 'outline'}
                onClick={() => updatePeriodStatus(selectedDate || today, false)}
                className="flex-1"
              >
                Not Period
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-around">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-bloom-400 mr-2"></div>
            <span className="text-xs">Menstrual</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-lavender-300 mr-2"></div>
            <span className="text-xs">Follicular</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-mint-300 mr-2"></div>
            <span className="text-xs">Ovulation</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-lavender-400 mr-2"></div>
            <span className="text-xs">Luteal</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CycleTracker;
