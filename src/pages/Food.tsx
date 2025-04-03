
import React, { useState } from 'react';
import { useCycle } from '@/context/CycleContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CyclePhase, MoodType, FoodRecommendation } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import AppNavbar from '@/components/AppNavbar';

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
  },
  {
    id: '11',
    name: 'Spinach',
    description: 'Rich in iron and folate',
    benefits: 'Helps combat fatigue and anemia',
    imageUrl: '/placeholder.svg',
    tags: ['vegetable', 'iron', 'folate'],
    forMoods: ['tired', 'irritable'],
    forPhases: ['menstrual', 'follicular']
  },
  {
    id: '12',
    name: 'Nuts and Seeds',
    description: 'Rich in healthy fats and protein',
    benefits: 'Stabilizes mood and balances hormones',
    imageUrl: '/placeholder.svg',
    tags: ['protein', 'snack', 'healthy fats'],
    forMoods: ['anxious', 'irritable'],
    forPhases: ['luteal', 'follicular']
  },
  {
    id: '13',
    name: 'Turmeric',
    description: 'Natural anti-inflammatory properties',
    benefits: 'Reduces inflammation and period pain',
    imageUrl: '/placeholder.svg',
    tags: ['spice', 'anti-inflammatory'],
    forMoods: ['tired', 'irritable'],
    forPhases: ['menstrual']
  },
  {
    id: '14',
    name: 'Sweet Potatoes',
    description: 'Complex carbs and vitamin A',
    benefits: 'Stabilizes blood sugar and mood swings',
    imageUrl: '/placeholder.svg',
    tags: ['carbs', 'dinner', 'vitamin A'],
    forMoods: ['irritable', 'sad'],
    forPhases: ['luteal']
  },
  {
    id: '15',
    name: 'Peppermint Tea',
    description: 'Soothes digestive issues',
    benefits: 'Relieves bloating and digestive discomfort',
    imageUrl: '/placeholder.svg',
    tags: ['tea', 'digestion', 'soothing'],
    forMoods: ['irritable'],
    forPhases: ['luteal', 'menstrual']
  }
];

const phaseLabels: Record<CyclePhase, string> = {
  'menstrual': 'Menstrual Phase',
  'follicular': 'Follicular Phase',
  'ovulation': 'Ovulation Phase',
  'luteal': 'Luteal Phase'
};

const moodLabels: Record<MoodType, string> = {
  'happy': 'Happy',
  'energetic': 'Energetic',
  'calm': 'Calm',
  'tired': 'Tired',
  'anxious': 'Anxious',
  'irritable': 'Irritable',
  'sad': 'Sad',
  'stressed': 'Stressed'
};

const FoodPage = () => {
  const { currentMood, currentPhase } = useCycle();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredFoods = searchTerm 
    ? foodDatabase.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : foodDatabase;

  const moodFilteredFoods = (mood: MoodType) => {
    return foodDatabase.filter(food => food.forMoods.includes(mood));
  };

  const phaseFilteredFoods = (phase: CyclePhase) => {
    return foodDatabase.filter(food => food.forPhases.includes(phase));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container px-4 py-6 max-w-md mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Food Guide</h1>
          <p className="text-muted-foreground">
            Find foods that help balance your mood and cycle
          </p>
        </header>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="search"
            placeholder="Search foods or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted"
          />
        </div>

        <ScrollArea className="h-[calc(100vh-15rem)]">
          <div className="space-y-6">
            <Tabs defaultValue="all">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="mood" className="flex-1">By Mood</TabsTrigger>
                <TabsTrigger value="phase" className="flex-1">By Phase</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="space-y-4">
                  {searchTerm && filteredFoods.length === 0 ? (
                    <p className="text-center text-muted-foreground py-6">
                      No foods found for "{searchTerm}"
                    </p>
                  ) : (
                    filteredFoods.map(food => (
                      <FoodCard key={food.id} food={food} />
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="mood">
                <div className="space-y-6">
                  {Object.entries(moodLabels).map(([mood, label]) => (
                    <div key={mood}>
                      <h3 className="text-lg font-medium mb-2 capitalize">
                        {label}
                        {currentMood === mood && ' (Current)'}
                      </h3>
                      <div className="space-y-3">
                        {moodFilteredFoods(mood as MoodType).length > 0 ? (
                          moodFilteredFoods(mood as MoodType).map(food => (
                            <FoodCard key={food.id} food={food} />
                          ))
                        ) : (
                          <p className="text-muted-foreground">No foods found</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="phase">
                <div className="space-y-6">
                  {Object.entries(phaseLabels).map(([phase, label]) => (
                    <div key={phase}>
                      <h3 className="text-lg font-medium mb-2">
                        {label}
                        {currentPhase === phase && ' (Current)'}
                      </h3>
                      <div className="space-y-3">
                        {phaseFilteredFoods(phase as CyclePhase).length > 0 ? (
                          phaseFilteredFoods(phase as CyclePhase).map(food => (
                            <FoodCard key={food.id} food={food} />
                          ))
                        ) : (
                          <p className="text-muted-foreground">No foods found</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>
      
      <AppNavbar />
    </div>
  );
};

interface FoodCardProps {
  food: FoodRecommendation;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center p-4">
        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
          <img 
            src={food.imageUrl || '/placeholder.svg'} 
            alt={food.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="flex-1 ml-4">
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
    </Card>
  );
};

export default FoodPage;
