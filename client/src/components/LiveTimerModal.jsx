import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, Check, Award, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LiveTimerModal({ workout, onClose, onCompleteWorkout }) {
  const [currentSlotIndex, setCurrentSlotIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(45);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSets, setCompletedSets] = useState([false, false, false]);

  const slots = workout?.slots || [];
  const activeSlot = slots[currentSlotIndex] || {
    selected_exercise_name: 'Barbell Flat Bench Press',
    pattern: 'Push_Horizontal',
    prescription: { sets: '3', reps: '8–12', rpe: 'RPE 8', rest: '60–90s' }
  };

  // Play audio chime using Web Audio API
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (err) {
      console.warn('AudioContext playback blocked or unavailable:', err);
    }
  };

  // Countdown timer loop
  useEffect(() => {
    let timer = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      playBeep();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const toggleSet = (index) => {
    const updated = [...completedSets];
    updated[index] = !updated[index];
    setCompletedSets(updated);

    // If set was checked, automatically trigger 45s rest timer!
    if (updated[index]) {
      setSecondsLeft(45);
      setIsRunning(true);
      playBeep();
    }

    // Check if all sets finished
    if (updated.every(Boolean)) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNextExercise = () => {
    if (currentSlotIndex < slots.length - 1) {
      setCurrentSlotIndex(currentSlotIndex + 1);
      setCompletedSets([false, false, false]);
      setSecondsLeft(45);
      setIsRunning(false);
    } else {
      // All exercises finished!
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 }
      });
      if (onCompleteWorkout) {
        onCompleteWorkout({
          id: Date.now(),
          title: `${slots[0]?.selected_exercise_name || 'Workout'} Completed`,
          category: `${slots[0]?.pattern?.replace('_', ' ') || 'Strength'} Session`,
          date: 'Today',
          reps: `${slots.length} Slots · All Sets Complete`,
          completed: true,
          color: '#10E57A'
        });
      }
      onClose();
    }
  };

  return (
    <div className="modal-overlay" style={{ background: '#FFFFFF' }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}>
        <button onClick={onClose} className="header-btn" style={{ width: '36px', height: '36px' }}>
          <ChevronLeft size={20} />
        </button>
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)' }}>
          Active Session · Step {currentSlotIndex + 1} of {slots.length || 4}
        </span>
        <div style={{ width: '36px' }} />
      </div>

      <div className="screen-scroll-container" style={{ paddingBottom: '40px' }}>
        <div className="live-timer-hero">
          <div className="live-step-label">
            {activeSlot.pattern?.replace('_', ' ')} Focus
          </div>
          <h2 className="live-exercise-title">
            {activeSlot.selected_exercise_name}
          </h2>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-surface-subtle)',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'var(--text-secondary)'
          }}>
            <span>Prescription: {activeSlot.prescription?.reps || '8–12 reps'}</span>
            <span>·</span>
            <span>Target: {activeSlot.prescription?.rpe || 'RPE 8'}</span>
          </div>

          {/* Big Digital Countdown Timer (Matching Mockup) */}
          <div className="live-countdown-display">
            {formatTime(secondsLeft)}
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Rest & Inter-Set Recovery
          </div>

          {/* Controls */}
          <div className="live-controls">
            <button
              className="btn-circle-control"
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft(45);
              }}
              title="Reset Timer"
            >
              <RotateCcw size={20} />
            </button>

            <button
              className="btn-circle-control primary"
              onClick={() => setIsRunning(!isRunning)}
              title={isRunning ? 'Pause' : 'Start Timer'}
            >
              {isRunning ? <Pause size={28} fill="#FFF" /> : <Play size={28} fill="#FFF" style={{ marginLeft: '4px' }} />}
            </button>

            <button
              className="btn-circle-control"
              onClick={playBeep}
              title="Test Sound Chime"
            >
              <Volume2 size={20} />
            </button>
          </div>
        </div>

        {/* Set Tracker Checkboxes */}
        <div style={{ marginTop: '20px' }}>
          <div className="section-header">
            <h3 className="section-title">Track Sets</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Check off when complete</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {completedSets.map((done, idx) => (
              <div
                key={idx}
                onClick={() => toggleSet(idx)}
                style={{
                  background: done ? 'var(--primary-orange-light)' : 'var(--bg-card)',
                  border: `1px solid ${done ? 'var(--primary-orange)' : 'var(--border-light)'}`,
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '9999px',
                    background: done ? 'var(--primary-orange)' : 'var(--bg-surface-subtle)',
                    color: done ? '#FFF' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    {done ? <Check size={16} /> : idx + 1}
                  </div>
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>
                      Set {idx + 1}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '8px' }}>
                      {activeSlot.prescription?.reps || '8–12'} reps
                    </span>
                  </div>
                </div>

                <span style={{ fontSize: '12px', fontWeight: '600', color: done ? 'var(--primary-orange)' : 'var(--text-muted)' }}>
                  {done ? 'Completed' : 'Tap to finish'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Exercise Button */}
        <button
          className="btn-start-workout"
          style={{ width: '100%', justifyContent: 'center', marginTop: '24px', padding: '14px' }}
          onClick={handleNextExercise}
        >
          {currentSlotIndex < slots.length - 1 ? 'Next Exercise →' : 'Complete Workout 🎉'}
        </button>
      </div>
    </div>
  );
}
