import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import BottomNav from './components/BottomNav.jsx';
import SideDrawer from './components/SideDrawer.jsx';
import FreshWelcomeView from './components/FreshWelcomeView.jsx';
import HomeTab from './pages/HomeTab.jsx';
import PlanTab from './pages/PlanTab.jsx';
import StatsTab from './pages/StatsTab.jsx';
import DiscoverTab from './pages/DiscoverTab.jsx';
import ProfileTab from './pages/ProfileTab.jsx';
import LiveTimerModal from './components/LiveTimerModal.jsx';
import OnboardingModal from './components/OnboardingModal.jsx';
import AlternativesModal from './components/AlternativesModal.jsx';
import { fallbackUserData, fallbackSimulation, fetchExercises } from './services/api.js';
import './styles/theme.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fresh user tracking (persisted in localStorage)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem('highfit_has_onboarded') === 'true';
  });

  // User domain state
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('highfit_user_data');
    return saved ? JSON.parse(saved) : fallbackUserData;
  });

  const [lifestyleScores, setLifestyleScores] = useState(() => {
    const saved = localStorage.getItem('highfit_lifestyle');
    return saved ? JSON.parse(saved) : fallbackSimulation.lifestyle_scores;
  });

  const [trainingStrategy, setTrainingStrategy] = useState(() => {
    const saved = localStorage.getItem('highfit_strategy');
    return saved ? JSON.parse(saved) : fallbackSimulation.training_strategy;
  });

  const [nutrition, setNutrition] = useState(() => {
    const saved = localStorage.getItem('highfit_nutrition');
    return saved ? JSON.parse(saved) : fallbackSimulation.nutrition;
  });

  const [plan, setPlan] = useState(() => {
    const saved = localStorage.getItem('highfit_plan');
    return saved ? JSON.parse(saved) : fallbackSimulation;
  });

  // Empty activity log for fresh users
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('highfit_activities');
    return saved ? JSON.parse(saved) : [];
  });

  const [allExercises, setAllExercises] = useState([]);

  // Modals
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLiveWorkout, setShowLiveWorkout] = useState(false);
  const [activeWorkoutForSession, setActiveWorkoutForSession] = useState(null);
  const [slotForAlternatives, setSlotForAlternatives] = useState(null);
  const [slotMeta, setSlotMeta] = useState(null);

  // Fetch full exercise dataset on mount
  useEffect(() => {
    async function loadData() {
      const list = await fetchExercises();
      if (list && list.length > 0) {
        setAllExercises(list);
      } else {
        import('../../src/data/exercises.js').then((module) => {
          setAllExercises(module.exercises || []);
        }).catch((err) => {
          console.warn('Fallback exercise load failed:', err.message);
        });
      }
    }
    loadData();
  }, []);

  const handleStartWorkout = (workout) => {
    setActiveWorkoutForSession(workout || plan.days[0]);
    setShowLiveWorkout(true);
  };

  const handleCompleteWorkout = (completedRecord) => {
    const updatedActivities = [completedRecord, ...activities];
    setActivities(updatedActivities);
    localStorage.setItem('highfit_activities', JSON.stringify(updatedActivities));
  };

  const handleOpenAlternatives = (slot, slotIndex, dayIndex) => {
    setSlotForAlternatives(slot);
    setSlotMeta({ slotIndex, dayIndex });
  };

  const handleSelectAlternative = (newExercise) => {
    if (!slotMeta || !plan) return;
    const { dayIndex, slotIndex } = slotMeta;

    const updatedDays = [...plan.days];
    const targetDay = { ...updatedDays[dayIndex] };
    const targetSlots = [...targetDay.slots];

    targetSlots[slotIndex] = {
      ...targetSlots[slotIndex],
      selected_exercise_id: newExercise.id,
      selected_exercise_name: newExercise.name,
      equipment: newExercise.equipment,
      reason: `Customized choice: selected ${newExercise.name} for balanced mechanics.`
    };

    targetDay.slots = targetSlots;
    updatedDays[dayIndex] = targetDay;
    const newPlan = { ...plan, days: updatedDays };
    setPlan(newPlan);
    localStorage.setItem('highfit_plan', JSON.stringify(newPlan));
  };

  const handlePlanGenerated = (result) => {
    if (result.userData) {
      setUserData(result.userData);
      localStorage.setItem('highfit_user_data', JSON.stringify(result.userData));
    }
    if (result.lifestyleScores) {
      setLifestyleScores(result.lifestyleScores);
      localStorage.setItem('highfit_lifestyle', JSON.stringify(result.lifestyleScores));
    }
    if (result.trainingStrategy) {
      setTrainingStrategy(result.trainingStrategy);
      localStorage.setItem('highfit_strategy', JSON.stringify(result.trainingStrategy));
    }
    if (result.nutrition) {
      setNutrition(result.nutrition);
      localStorage.setItem('highfit_nutrition', JSON.stringify(result.nutrition));
    }
    if (result.plan) {
      const parsedPlan = result.plan.days ? result.plan : { days: result.plan };
      setPlan(parsedPlan);
      localStorage.setItem('highfit_plan', JSON.stringify(parsedPlan));
    }

    setHasCompletedOnboarding(true);
    localStorage.setItem('highfit_has_onboarded', 'true');
    setActiveTab('plan'); // navigate to routine tab
  };

  const handleResetToFreshUser = () => {
    localStorage.removeItem('highfit_has_onboarded');
    localStorage.removeItem('highfit_user_data');
    localStorage.removeItem('highfit_lifestyle');
    localStorage.removeItem('highfit_strategy');
    localStorage.removeItem('highfit_nutrition');
    localStorage.removeItem('highfit_plan');
    localStorage.removeItem('highfit_activities');

    setHasCompletedOnboarding(false);
    setActivities([]);
    setPlan(fallbackSimulation);
    setActiveTab('home');
    setShowOnboarding(false);
    setShowLiveWorkout(false);
  };

  return (
    <div className="app-viewport">
      <div className="mobile-frame">
        {/* Sticky Mobile Header */}
        <Header 
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenProfile={() => setActiveTab('profile')}
          notificationCount={hasCompletedOnboarding ? 1 : 0}
        />

        {/* Slide-out Side Drawer */}
        <SideDrawer
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenOnboarding={() => setShowOnboarding(true)}
          onResetToFreshUser={handleResetToFreshUser}
        />

        {/* Scrollable Screen Content */}
        <main className="screen-scroll-container">
          {/* FRESH USER ZERO STATE */}
          {!hasCompletedOnboarding ? (
            <FreshWelcomeView 
              onStartAssessment={() => setShowOnboarding(true)}
              onExploreSample={() => {
                setHasCompletedOnboarding(true);
                localStorage.setItem('highfit_has_onboarded', 'true');
              }}
            />
          ) : (
            <>
              {activeTab === 'home' && (
                <HomeTab
                  lifestyleScores={lifestyleScores}
                  nutrition={nutrition}
                  trainingStrategy={trainingStrategy}
                  currentWorkout={plan?.days?.[0]}
                  activities={activities}
                  onStartWorkout={() => handleStartWorkout(plan?.days?.[0])}
                  onSelectCollection={() => setActiveTab('discover')}
                />
              )}

              {activeTab === 'plan' && (
                <PlanTab
                  plan={plan}
                  onStartWorkout={handleStartWorkout}
                  onOpenAlternatives={handleOpenAlternatives}
                  onOpenOnboarding={() => setShowOnboarding(true)}
                />
              )}

              {activeTab === 'stats' && (
                <StatsTab 
                  userData={userData}
                  trainingStrategy={trainingStrategy}
                  nutrition={nutrition}
                  activities={activities}
                />
              )}

              {activeTab === 'discover' && (
                <DiscoverTab 
                  exercises={allExercises}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileTab
                  userData={userData}
                  lifestyleScores={lifestyleScores}
                  nutrition={nutrition}
                  trainingStrategy={trainingStrategy}
                  onOpenOnboarding={() => setShowOnboarding(true)}
                  onResetToFreshUser={handleResetToFreshUser}
                />
              )}
            </>
          )}
        </main>

        {/* Fixed Mobile Bottom Navigation Dock */}
        {hasCompletedOnboarding && (
          <BottomNav 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        )}

        {/* Live Workout Session & Rest Timer Modal */}
        {showLiveWorkout && (
          <LiveTimerModal
            workout={activeWorkoutForSession}
            onClose={() => setShowLiveWorkout(false)}
            onCompleteWorkout={handleCompleteWorkout}
          />
        )}

        {/* Onboarding & Personalized Assessment Stepper */}
        {showOnboarding && (
          <OnboardingModal
            initialData={userData}
            onClose={() => setShowOnboarding(false)}
            onPlanGenerated={handlePlanGenerated}
          />
        )}

        {/* Alternatives / Slot Swap Drawer */}
        {slotForAlternatives && (
          <AlternativesModal
            slot={slotForAlternatives}
            allExercises={allExercises}
            onSelectAlternative={handleSelectAlternative}
            onClose={() => setSlotForAlternatives(null)}
          />
        )}
      </div>
    </div>
  );
}
