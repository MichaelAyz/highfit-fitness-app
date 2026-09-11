import MetricCards from '../components/MetricCards';
import TrendingCard from '../components/TrendingCard';
import PopularCollections from '../components/PopularCollections';
import GoalProgressList from '../components/GoalProgressList';
import LatestActivityList from '../components/LatestActivityList';

export default function HomeTab({ 
  lifestyleScores, 
  nutrition, 
  trainingStrategy, 
  currentWorkout, 
  activities = [],
  onStartWorkout, 
  onSelectCollection 
}) {
  return (
    <div>
      {/* Metrics Section */}
      <MetricCards 
        lifestyleScores={lifestyleScores} 
        nutrition={nutrition} 
        strategy={trainingStrategy} 
      />

      {/* Trending Workout Card */}
      <TrendingCard 
        todayWorkout={currentWorkout} 
        onStartWorkout={onStartWorkout} 
      />

      {/* Workout Collections */}
      <PopularCollections 
        onSelectCollection={onSelectCollection} 
      />

      {/* Goal Progress Ring List */}
      <GoalProgressList />

      {/* Latest Activity Stream (With zero-state for fresh users) */}
      <LatestActivityList 
        activities={activities}
        onSelectWorkout={onStartWorkout} 
      />
    </div>
  );
}
