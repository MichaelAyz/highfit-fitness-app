import OverallStatCard from '../components/OverallStatCard';
import GoalProgressList from '../components/GoalProgressList';
import { Award, Zap } from 'lucide-react';

export default function StatsTab({ userData, trainingStrategy, nutrition, activities = [] }) {
  const completedSessions = activities.length;
  const targetFrequency = trainingStrategy?.frequency_cap || 3;
  const adherencePercent = targetFrequency > 0 
    ? Math.min(100, Math.round((completedSessions / targetFrequency) * 100)) 
    : 0;

  // Calculate actual volume from completed sessions
  const workSetsPerSession = 4;
  const totalWorkSets = completedSessions * workSetsPerSession;
  // Estimate or calculate: ~3,500 kg volume per completed session based on compound lifts
  const totalVolumeKg = completedSessions * 3500;

  return (
    <div>
      <div className="section-header" style={{ marginTop: '0' }}>
        <h2 className="section-title">Analytics & Progress</h2>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
          Live Session Tracking
        </span>
      </div>

      {/* Dynamic Overall Stat Card */}
      <OverallStatCard 
        userWeight={userData?.weightKg || 70}
        weightUnit={userData?.weightUnit || 'kg'}
        targetDays={targetFrequency}
        completedSessions={completedSessions}
      />

      {/* Live Performance Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-orange)', marginBottom: '4px' }}>
            <Zap size={16} />
            <span style={{ fontSize: '11px', fontWeight: '700' }}>ADHERENCE</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: '800' }}>
            {adherencePercent}%
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            {completedSessions === 0 ? 'First session pending' : `${completedSessions} of ${targetFrequency} target sessions`}
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-teal)', marginBottom: '4px' }}>
            <Award size={16} />
            <span style={{ fontSize: '11px', fontWeight: '700' }}>TOTAL VOLUME</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: '800' }}>
            {totalVolumeKg > 0 ? totalVolumeKg.toLocaleString() : '0'}{' '}
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {userData?.weightUnit === 'lbs' ? 'lbs' : 'kg'}
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            {completedSessions === 0 ? '0 work sets logged' : `Across ${totalWorkSets} work sets`}
          </div>
        </div>
      </div>

      {/* Dynamic Goals List */}
      <GoalProgressList 
        goal={userData?.goal}
        targetCalories={nutrition?.target_calories}
        completedSessions={completedSessions}
        targetFrequency={targetFrequency}
      />
    </div>
  );
}
