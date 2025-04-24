
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { useCycle } from '@/context/CycleContext';

const NotesDisplay = () => {
  const { userData, currentMood, currentPhase } = useCycle();

  const getNotes = () => {
    if (!userData.currentCycle?.days) return [];
    
    return Object.entries(userData.currentCycle.days)
      .filter(([_, dayData]) => dayData.notes)
      .map(([date, dayData]) => ({
        date: new Date(date),
        note: dayData.notes,
        mood: dayData.mood
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const getAIRecommendations = () => {
    if (!currentMood) return null;

    const recommendations = {
      food: {
        happy: ['Fresh fruits', 'Green smoothies', 'Whole grains'],
        energetic: ['Nuts and seeds', 'Lean proteins', 'Complex carbs'],
        calm: ['Herbal tea', 'Dark chocolate', 'Yogurt'],
        tired: ['Bananas', 'Coffee alternatives', 'Iron-rich foods'],
        anxious: ['Chamomile tea', 'Dark chocolate', 'Fatty fish'],
        irritable: ['Magnesium-rich foods', 'Leafy greens', 'Avocados'],
        sad: ['Omega-3 rich foods', 'Berries', 'Dark chocolate'],
        stressed: ['Green tea', 'Citrus fruits', 'Complex carbs']
      },
      exercise: {
        happy: ['Dance workout', 'Group fitness classes', 'Outdoor activities'],
        energetic: ['HIIT workout', 'Running', 'Sports activities'],
        calm: ['Yoga', 'Stretching', 'Walking meditation'],
        tired: ['Gentle stretching', 'Light walking', 'Restorative yoga'],
        anxious: ['Deep breathing exercises', 'Yoga', 'Nature walks'],
        irritable: ['Boxing', 'High-intensity cardio', 'Strength training'],
        sad: ['Light jogging', 'Walking in nature', 'Group exercises'],
        stressed: ['Meditation', 'Yoga', 'Swimming']
      }
    };

    return {
      food: recommendations.food[currentMood],
      exercise: recommendations.exercise[currentMood]
    };
  };

  const notes = getNotes();
  const aiRecommendations = getAIRecommendations();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            {notes.length > 0 ? (
              <div className="space-y-4">
                {notes.map((note, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-muted-foreground">
                        {format(note.date, 'MMM d, yyyy')}
                      </span>
                      {note.mood && (
                        <span className="text-sm font-medium text-primary">
                          Feeling: {note.mood}
                        </span>
                      )}
                    </div>
                    <p className="text-sm">{note.note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No notes yet</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {aiRecommendations && (
        <Card>
          <CardHeader>
            <CardTitle>Today's Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Food Suggestions</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {aiRecommendations.food.map((food, index) => (
                    <li key={index} className="text-muted-foreground">{food}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Exercise Suggestions</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {aiRecommendations.exercise.map((exercise, index) => (
                    <li key={index} className="text-muted-foreground">{exercise}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotesDisplay;
