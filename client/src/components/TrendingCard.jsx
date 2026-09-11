import { Play, Clock, Flame } from 'lucide-react';

export default function TrendingCard({ todayWorkout, onStartWorkout }) {
  const workoutTitle = todayWorkout?.day || 'Day 1 - Upper Power & Chest';
  const slotCount = todayWorkout?.slots?.length || 4;

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Trending Workout</h2>
        <button 
          className="section-action-link"
          onClick={onStartWorkout}
        >
          View Live
        </button>
      </div>

      <div className="trending-banner">
        <div className="trending-tags">
          <span className="trending-tag">Strength Focus</span>
          <span className="trending-tag">{slotCount} Slots</span>
          <span className="trending-tag">Deterministic Safe</span>
        </div>

        <h3 className="trending-title">Push Your Limit</h3>
        <p className="trending-desc">
          {workoutTitle}. Tailored slot selection matching your recovery reserves and movement priorities.
        </p>

        <div className="trending-footer">
          <div className="trending-meta">
            <div className="trending-meta-item">
              <Flame size={15} color="#FF6433" />
              <span>360 kcal</span>
            </div>
            <div className="trending-meta-item">
              <Clock size={15} color="#A0AEC0" />
              <span>45 min</span>
            </div>
          </div>

          <button 
            className="btn-start-workout"
            onClick={onStartWorkout}
          >
            <Play size={14} fill="#FFF" />
            Start Session
          </button>
        </div>
      </div>
    </div>
  );
}
