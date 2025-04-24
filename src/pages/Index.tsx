import React, { useState } from 'react';
import { format } from 'date-fns';
import MoodSelector from '@/components/MoodSelector';
import CycleTracker from '@/components/CycleTracker';
import FoodRecommendations from '@/components/FoodRecommendations';
import NotesDisplay from '@/components/NotesDisplay';
import { useCycle } from '@/context/CycleContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import AppNavbar from '@/components/AppNavbar';

const Index = () => {
  const { 
    currentMood, 
    currentPhase, 
    setMood, 
    userData, 
    updateCycle,
    addNote 
  } = useCycle();
  
  const [noteText, setNoteText] = useState<string>('');
  
  const handleNoteSubmit = () => {
    if (noteText.trim()) {
      addNote(noteText);
      setNoteText('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pb-20">
      <div className="container px-4 py-6 max-w-md mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            MoodBloom
          </h1>
          <p className="text-muted-foreground">
            {format(new Date(), 'EEEE, MMMM d')}
            {currentPhase && (
              <span className="ml-2 text-primary">• {currentPhase} phase</span>
            )}
          </p>
        </header>

        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-bloom-300/90 to-lavender-300/90 text-white pb-8">
                <CardTitle className="text-xl">Daily Check-in</CardTitle>
                <CardDescription className="text-white text-opacity-90">
                  How are you feeling today?
                </CardDescription>
              </CardHeader>
              <CardContent className="-mt-6 rounded-t-3xl bg-gradient-to-b from-background to-secondary/10 pt-6">
                <MoodSelector 
                  selectedMood={currentMood}
                  onSelectMood={setMood}
                />
                
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Add a note</h3>
                  <Textarea
                    placeholder="How was your day? Any symptoms or observations?"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button 
                    onClick={handleNoteSubmit} 
                    className="w-full mt-2"
                  >
                    Save Note
                  </Button>
                </div>
              </CardContent>
            </Card>

            <NotesDisplay />

            <CycleTracker 
              currentCycle={userData.currentCycle}
              onUpdateCycle={updateCycle}
            />

            <FoodRecommendations 
              currentMood={currentMood}
              currentPhase={currentPhase}
            />
          </div>
        </ScrollArea>
      </div>
      
      <AppNavbar />
    </div>
  );
};

export default Index;
