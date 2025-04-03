
import React from 'react';
import { CyclePhase, MoodType, FoodRecommendation } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FoodRecommendationsProps {
  currentMood?: MoodType;
  currentPhase?: CyclePhase;
}

const foodDatabase: FoodRecommendation[] = [
  {
    id: '1',
    name: 'Dark Chocolate',
    description: 'Rich in magnesium and antioxidants',
    benefits: 'Boosts serotonin levels and reduces stress',
    imageUrl: '/placeholder.svg',
    tags: ['sweet', 'treat', 'antioxidants'],
    forMoods: ['anxious', 'sad', 'stressed'],
    forPhases: ['luteal', 'menstrual']
  },
  {
    id: '2',
    name: 'Salmon',
    description: 'High in omega-3 fatty acids',
    benefits: 'Reduces inflammation and improves mood',
    imageUrl: '/placeholder.svg',
    tags: ['protein', 'dinner', 'omega-3'],
    forMoods: ['irritable', 'anxious', 'sad'],
    forPhases: ['follicular', 'luteal']
  },
  {
    id: '3',
    name: 'Bananas',
    description: 'Rich in potassium and vitamin B6',
    benefits: 'Regulates blood sugar and improves energy',
    imageUrl: '/placeholder.svg',
    tags: ['fruit', 'snack', 'energy'],
    forMoods: ['tired', 'irritable', 'sad'],
    forPhases: ['menstrual', 'follicular']
  },
  {
    id: '4',
    name: 'Leafy Greens',
    description: 'High in iron, calcium and magnesium',
    benefits: 'Helps with iron loss during menstruation',
    imageUrl: '/placeholder.svg',
    tags: ['vegetables', 'iron', 'calcium'],
    forMoods: ['tired', 'anxious'],
    forPhases: ['menstrual', 'follicular']
  },
  {
    id: '5',
    name: 'Yogurt',
    description: 'Probiotic-rich food with calcium',
    benefits: 'Improves gut health which affects mood',
    imageUrl: '/placeholder.svg',
    tags: ['breakfast', 'snack', 'probiotics'],
    forMoods: ['irritable', 'anxious', 'stressed'],
    forPhases: ['luteal', 'follicular']
  },
  {
    id: '6',
    name: 'Avocado',
    description: 'Healthy fats and B vitamins',
    benefits: 'Stabilizes mood and hormone levels',
    imageUrl: '/placeholder.svg',
    tags: ['healthy fats', 'breakfast', 'snack'],
    forMoods: ['irritable', 'anxious', 'stressed'],
    forPhases: ['luteal', 'follicular']
  },
  {
    id: '7',
    name: 'Chamomile Tea',
    description: 'Herbal tea with calming properties',
    benefits: 'Reduces anxiety and promotes sleep',
    imageUrl: '/placeholder.svg',
    tags: ['tea', 'relaxing', 'evening'],
    forMoods: ['anxious', 'stressed', 'irritable'],
    forPhases: ['luteal', 'menstrual']
  },
  {
    id: '8',
    name: 'Oatmeal',
    description: 'Complex carbs and fiber',
    benefits: 'Stabilizes blood sugar and improves mood',
    imageUrl: '/placeholder.svg',
    tags: ['breakfast', 'fiber', 'comfort food'],
    forMoods: ['sad', 'irritable', 'tired'],
    forPhases: ['follicular', 'ovulation']
  },
  {
    id: '9',
    name: 'Berries',
    description: 'High in antioxidants and vitamins',
    benefits: 'Fights inflammation and boosts energy',
    imageUrl: '/placeholder.svg',
    tags: ['fruit', 'antioxidants', 'snack'],
    forMoods: ['happy', 'energetic', 'tired'],
    forPhases: ['follicular', 'ovulation']
  },
  {
    id: '10',
    name: 'Ginger Tea',
    description: 'Anti-inflammatory properties',
    benefits: 'Reduces cramps and nausea during menstruation',
    imageUrl: '/placeholder.svg',
    tags: ['tea', 'digestive', 'anti-inflammatory'],
    forMoods: ['irritable', 'tired'],
    forPhases: ['menstrual']
  }
];

const FoodRecommendations: React.FC<FoodRecommendationsProps> = ({ 
  currentMood, 
  currentPhase 
}) => {
  const getRecommendationsForMood = (mood?: MoodType): FoodRecommendation[] => {
    if (!mood) return [];
    return foodDatabase.filter(food => food.forMoods.includes(mood));
  };

  const getRecommendationsForPhase = (phase?: CyclePhase): FoodRecommendation[] => {
    if (!phase) return [];
    return foodDatabase.filter(food => food.forPhases.includes(phase));
  };

  const getPersonalizedRecommendations = (): FoodRecommendation[] => {
    if (!currentMood && !currentPhase) return [];
    
    let recommendations = foodDatabase;
    
    if (currentMood) {
      recommendations = recommendations.filter(food => 
        food.forMoods.includes(currentMood)
      );
    }
    
    if (currentPhase) {
      recommendations = recommendations.filter(food => 
        food.forPhases.includes(currentPhase)
      );
    }
    
    return recommendations;
  };

  const moodRecommendations = getRecommendationsForMood(currentMood);
  const phaseRecommendations = getRecommendationsForPhase(currentPhase);
  const personalizedRecommendations = getPersonalizedRecommendations();

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Food Recommendations</h2>
        
        <Tabs defaultValue="personalized">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="personalized">For You</TabsTrigger>
            <TabsTrigger value="mood">By Mood</TabsTrigger>
            <TabsTrigger value="phase">By Phase</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personalized" className="space-y-4">
            {personalizedRecommendations.length > 0 ? (
              personalizedRecommendations.map(food => (
                <FoodCard key={food.id} food={food} />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">
                {currentMood || currentPhase 
                  ? "No personalized recommendations available for your current mood and phase combination." 
                  : "Track your mood and cycle to get personalized food recommendations."}
              </p>
            )}
          </TabsContent>
          
          <TabsContent value="mood" className="space-y-4">
            {currentMood ? (
              moodRecommendations.length > 0 ? (
                moodRecommendations.map(food => (
                  <FoodCard key={food.id} food={food} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No recommendations available for your current mood.
                </p>
              )
            ) : (
              <p className="text-center text-muted-foreground py-4">
                Track your mood to get food recommendations.
              </p>
            )}
          </TabsContent>
          
          <TabsContent value="phase" className="space-y-4">
            {currentPhase ? (
              phaseRecommendations.length > 0 ? (
                phaseRecommendations.map(food => (
                  <FoodCard key={food.id} food={food} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No recommendations available for your current cycle phase.
                </p>
              )
            ) : (
              <p className="text-center text-muted-foreground py-4">
                Track your cycle to get phase-based food recommendations.
                </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface FoodCardProps {
  food: FoodRecommendation;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  return (
    <div className="p-4 rounded-lg border bg-card flex items-center gap-4">
      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={food.imageUrl || '/placeholder.svg'} 
          alt={food.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{food.name}</h3>
        <p className="text-sm text-muted-foreground">{food.description}</p>
        <p className="text-xs mt-1 text-primary">{food.benefits}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {food.tags.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodRecommendations;
