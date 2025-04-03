
import React from 'react';
import { useCycle } from '@/context/CycleContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { format, differenceInDays } from 'date-fns';
import { MoodType, CyclePhase } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import AppNavbar from '@/components/AppNavbar';

const InsightsPage = () => {
  const { userData, currentPhase } = useCycle();

  const getMoodCounts = () => {
    if (!userData.currentCycle) return {};
    
    const moodCounts: Partial<Record<MoodType, number>> = {};
    
    Object.values(userData.currentCycle.days).forEach(day => {
      if (day.mood) {
        moodCounts[day.mood] = (moodCounts[day.mood] || 0) + 1;
      }
    });
    
    return moodCounts;
  };

  const getTopMood = (): MoodType | null => {
    const moodCounts = getMoodCounts();
    if (Object.keys(moodCounts).length === 0) return null;
    
    return Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0] as MoodType;
  };

  const calculateCycleDays = () => {
    if (!userData.currentCycle) return 0;
    
    return differenceInDays(new Date(), userData.currentCycle.startDate);
  };
  
  const calculateNextPeriod = () => {
    if (!userData.currentCycle) return 0;
    
    const cycleEnd = new Date(userData.currentCycle.startDate);
    cycleEnd.setDate(cycleEnd.getDate() + userData.currentCycle.cycleLength);
    return differenceInDays(cycleEnd, new Date());
  };

  const moodCounts = getMoodCounts();
  const topMood = getTopMood();
  const cycleDays = calculateCycleDays();
  const daysUntilNextPeriod = calculateNextPeriod();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container px-4 py-6 max-w-md mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Insights</h1>
          <p className="text-muted-foreground">
            Understand your patterns and cycles
          </p>
        </header>

        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cycle Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.currentCycle ? (
                    <>
                      <div>
                        <h3 className="text-sm font-medium mb-1">Current Phase</h3>
                        <p className="text-lg font-semibold capitalize">{currentPhase || 'Unknown'}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-1">Cycle Day</h3>
                        <p className="text-lg font-semibold">{cycleDays} / {userData.currentCycle.cycleLength}</p>
                        <Progress 
                          value={(cycleDays / userData.currentCycle.cycleLength) * 100} 
                          className="h-2 mt-1"
                        />
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-1">Days Until Next Period</h3>
                        <p className="text-lg font-semibold">
                          {daysUntilNextPeriod > 0 
                            ? `${daysUntilNextPeriod} days`
                            : 'Your period is due now'
                          }
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-1">Cycle Started On</h3>
                        <p className="text-lg font-semibold">
                          {format(userData.currentCycle.startDate, 'MMMM d, yyyy')}
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      Start tracking your cycle to see insights
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mood Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(moodCounts).length > 0 ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Most Common Mood</h3>
                      <p className="text-lg font-semibold capitalize">{topMood}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Mood Distribution</h3>
                      {Object.entries(moodCounts).map(([mood, count]) => (
                        <div key={mood} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{mood}</span>
                            <span>{count} days</span>
                          </div>
                          <Progress 
                            value={(count / Object.values(userData.currentCycle?.days || {}).length) * 100} 
                            className="h-1.5"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    Record your moods to see patterns
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cycle Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-1">Avg. Cycle Length</h3>
                    <p className="text-lg font-semibold">
                      {userData.averageCycleLength} days
                    </p>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-1">Avg. Period Length</h3>
                    <p className="text-lg font-semibold">
                      {userData.averagePeriodLength} days
                    </p>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-1">Cycles Tracked</h3>
                    <p className="text-lg font-semibold">
                      {userData.cycles.length}
                    </p>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-1">Days Logged</h3>
                    <p className="text-lg font-semibold">
                      {userData.currentCycle 
                        ? Object.keys(userData.currentCycle.days).length 
                        : 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
      
      <AppNavbar />
    </div>
  );
};

export default InsightsPage;
