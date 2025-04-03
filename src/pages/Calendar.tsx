
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { useCycle } from '@/context/CycleContext';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import AppNavbar from '@/components/AppNavbar';

const CalendarPage = () => {
  const { userData, currentPhase } = useCycle();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const getSelectedDateData = () => {
    if (!selectedDate || !userData.currentCycle) return null;
    
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    return userData.currentCycle.days[dateKey] || null;
  };

  const selectedDayData = getSelectedDateData();
  
  const getDayIndicator = (date: Date) => {
    if (!userData.currentCycle) return null;
    
    const dateKey = format(date, 'yyyy-MM-dd');
    const day = userData.currentCycle.days[dateKey];
    
    if (day?.period) {
      return <div className="cycle-dot absolute w-5 h-5 rounded-full bg-bloom-500 bottom-0.5 right-0.5" />;
    }
    
    if (day?.mood) {
      let moodColor = 'bg-lavender-400';
      switch (day.mood) {
        case 'happy': moodColor = 'bg-mint-400'; break;
        case 'energetic': moodColor = 'bg-mint-500'; break;
        case 'calm': moodColor = 'bg-lavender-300'; break;
        case 'tired': moodColor = 'bg-bloom-300'; break;
        case 'anxious': moodColor = 'bg-lavender-400'; break;
        case 'irritable': moodColor = 'bg-bloom-500'; break;
        case 'sad': moodColor = 'bg-lavender-500'; break;
        case 'stressed': moodColor = 'bg-bloom-400'; break;
      }
      
      return <div className={`absolute w-3 h-3 rounded-full ${moodColor} top-0.5 right-0.5`} />;
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container px-4 py-6 max-w-md mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
          {currentPhase && (
            <p className="text-primary">Current phase: {currentPhase}</p>
          )}
        </header>

        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  components={{
                    DayContent: (props) => (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {format(props.date, 'd')}
                        {getDayIndicator(props.date)}
                      </div>
                    )
                  }}
                />
              </CardContent>
            </Card>

            {selectedDayData ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {format(selectedDate!, 'MMMM d, yyyy')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="summary">
                    <TabsList className="w-full">
                      <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
                      <TabsTrigger value="notes" className="flex-1">Notes</TabsTrigger>
                      <TabsTrigger value="symptoms" className="flex-1">Symptoms</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="summary" className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-muted p-3">
                          <h3 className="text-sm font-medium mb-1">Period</h3>
                          <p>{selectedDayData.period ? 'Yes' : 'No'}</p>
                        </div>
                        <div className="rounded-lg bg-muted p-3">
                          <h3 className="text-sm font-medium mb-1">Mood</h3>
                          <p className="capitalize">{selectedDayData.mood || 'Not recorded'}</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="notes" className="mt-4">
                      {selectedDayData.notes ? (
                        <div className="bg-muted p-4 rounded-lg">
                          <p>{selectedDayData.notes}</p>
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-4">
                          No notes for this day
                        </p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="symptoms" className="mt-4">
                      {selectedDayData.symptoms && selectedDayData.symptoms.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedDayData.symptoms.map((symptom, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                            >
                              {symptom}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-4">
                          No symptoms recorded for this day
                        </p>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-6 text-center">
                  <p className="text-muted-foreground">
                    No data recorded for {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>
      
      <AppNavbar />
    </div>
  );
};

export default CalendarPage;
