import { useState } from 'react';
import { X, ArrowRight, ShieldCheck } from 'lucide-react';
import { analyzeUserData, generateWorkoutPlan } from '../services/api';

export default function OnboardingModal({ initialData, onClose, onPlanGenerated }) {
  const [step, setStep] = useState(1);
  const [weightUnit, setWeightUnit] = useState('kg'); // 'kg' | 'lbs'
  const [heightUnit, setHeightUnit] = useState('cm'); // 'cm' | 'ft'

  // Input states in both units
  const initialKg = initialData?.weightKg || 70;
  const initialCm = initialData?.heightCm || 175;

  const [weightKg, setWeightKg] = useState(initialKg);
  const [weightLbs, setWeightLbs] = useState(Math.round(initialKg * 2.20462));

  const [heightCm, setHeightCm] = useState(initialCm);
  const [heightFeet, setHeightFeet] = useState(Math.floor(initialCm / 30.48));
  const [heightInches, setHeightInches] = useState(Math.round((initialCm % 30.48) / 2.54));

  const [formData, setFormData] = useState({
    age: initialData?.age || 28,
    gender: initialData?.gender || 'Male',
    goal: initialData?.goal || 'MuscleGain',
    sleepQuality: initialData?.sleepQuality === 'Med' ? 'Mid' : (initialData?.sleepQuality || 'Mid'),
    stressLevel: initialData?.stressLevel === 'Med' ? 'Mid' : (initialData?.stressLevel || 'Mid'),
    timeAvailable: initialData?.timeAvailable || 45,
    daysAvailable: initialData?.daysAvailable || 3,
    equipment_access: initialData?.equipment_access || ['Dumbbell', 'Bodyweight'],
    injuries: initialData?.injuries || []
  });

  const [analyzedResults, setAnalyzedResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const equipmentOptions = ['Barbell', 'Dumbbell', 'Bodyweight', 'Machine', 'Cable', 'Band'];
  const injuryOptions = [
    { id: 'lower_back_load', label: 'Lower Back Sensitivity' },
    { id: 'shoulder_impingement', label: 'Shoulder Impingement' },
    { id: 'knee_acute_pain', label: 'Knee Patellar Pain' },
    { id: 'wrist_pain', label: 'Wrist Tendon Strain' }
  ];

  // Weight conversion handlers
  const handleWeightKgChange = (val) => {
    const num = Number(val);
    setWeightKg(num);
    setWeightLbs(Math.round(num * 2.20462));
  };

  const handleWeightLbsChange = (val) => {
    const num = Number(val);
    setWeightLbs(num);
    setWeightKg(Math.round((num / 2.20462) * 10) / 10);
  };

  // Height conversion handlers
  const handleHeightCmChange = (val) => {
    const num = Number(val);
    setHeightCm(num);
    setHeightFeet(Math.floor(num / 30.48));
    setHeightInches(Math.round((num % 30.48) / 2.54));
  };

  const handleHeightFtInChange = (ft, inch) => {
    const f = Number(ft) || 0;
    const i = Number(inch) || 0;
    setHeightFeet(f);
    setHeightInches(i);
    setHeightCm(Math.round(f * 30.48 + i * 2.54));
  };

  const handleEquipmentToggle = (item) => {
    const list = formData.equipment_access || [];
    if (list.includes(item)) {
      setFormData({ ...formData, equipment_access: list.filter(i => i !== item) });
    } else {
      setFormData({ ...formData, equipment_access: [...list, item] });
    }
  };

  const handleInjuryToggle = (id) => {
    const list = formData.injuries || [];
    if (list.includes(id)) {
      setFormData({ ...formData, injuries: list.filter(i => i !== id) });
    } else {
      setFormData({ ...formData, injuries: [...list, id] });
    }
  };

  // Step 3 -> 4: Run /api/v1/analyze to review constraints
  const handleProceedToReview = async () => {
    setLoading(true);

    // Map 'Mid' back to 'Med' for API schema compliance
    const apiPayload = {
      ...formData,
      weightKg,
      heightCm,
      sleepQuality: formData.sleepQuality === 'Mid' ? 'Med' : formData.sleepQuality,
      stressLevel: formData.stressLevel === 'Mid' ? 'Med' : formData.stressLevel,
    };

    try {
      const results = await analyzeUserData(apiPayload);
      setAnalyzedResults(results);
      setStep(4);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Final Step: Generate AI Plan
  const handleFinalizePlan = async () => {
    setLoading(true);
    const apiPayload = {
      ...formData,
      weightKg,
      heightCm,
      sleepQuality: formData.sleepQuality === 'Mid' ? 'Med' : formData.sleepQuality,
      stressLevel: formData.stressLevel === 'Mid' ? 'Med' : formData.stressLevel,
    };

    try {
      const response = await generateWorkoutPlan({
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        constraints: {
          nutrition: analyzedResults.nutrition,
          lifestyle_scores: analyzedResults.lifestyle_scores,
          training_strategy: analyzedResults.training_strategy
        },
        simulation: analyzedResults.simulation,
        raw_input: apiPayload
      });

      onPlanGenerated({
        userData: { ...apiPayload, weightUnit, heightUnit },
        lifestyleScores: analyzedResults.lifestyle_scores,
        trainingStrategy: analyzedResults.training_strategy,
        nutrition: analyzedResults.nutrition,
        plan: response.plan || response
      });
      onClose();
    } catch (err) {
      console.error(err);
      alert('Plan creation failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>
              {step === 4 ? 'Your Plan Summary' : 'Personalized Assessment'}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Step {step} of 4 · Tailored to your goals and lifestyle
            </p>
          </div>
          <button onClick={onClose} className="header-btn" style={{ width: '32px', height: '32px' }}>
            <X size={16} />
          </button>
        </div>

        {/* STEP 1: BIOMETRICS & GOAL */}
        {step === 1 && (
          <div>
            <div className="form-group">
              <label className="form-label">What is your main fitness goal?</label>
              <div className="pill-group">
                {['MuscleGain', 'FatLoss'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    className={`pill-item ${formData.goal === g ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, goal: g })}
                  >
                    {g === 'MuscleGain' ? 'Build Muscle (+250 kcal)' : 'Lose Fat (Safe Deficit)'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                  className="form-input"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unspecified">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* WEIGHT WITH KG / LBS TOGGLE */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>Weight</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setWeightUnit('kg')}
                    style={{
                      padding: '2px 8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      borderRadius: '4px',
                      border: '1px solid var(--border-light)',
                      background: weightUnit === 'kg' ? 'var(--primary-orange)' : 'var(--bg-surface-subtle)',
                      color: weightUnit === 'kg' ? '#FFF' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    kg
                  </button>
                  <button
                    type="button"
                    onClick={() => setWeightUnit('lbs')}
                    style={{
                      padding: '2px 8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      borderRadius: '4px',
                      border: '1px solid var(--border-light)',
                      background: weightUnit === 'lbs' ? 'var(--primary-orange)' : 'var(--bg-surface-subtle)',
                      color: weightUnit === 'lbs' ? '#FFF' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    lbs
                  </button>
                </div>
              </div>

              {weightUnit === 'kg' ? (
                <input
                  type="number"
                  step="0.5"
                  className="form-input"
                  placeholder="e.g. 75 kg"
                  value={weightKg}
                  onChange={(e) => handleWeightKgChange(e.target.value)}
                />
              ) : (
                <input
                  type="number"
                  step="1"
                  className="form-input"
                  placeholder="e.g. 165 lbs"
                  value={weightLbs}
                  onChange={(e) => handleWeightLbsChange(e.target.value)}
                />
              )}
            </div>

            {/* HEIGHT WITH CM / FT+IN TOGGLE */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>Height</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setHeightUnit('cm')}
                    style={{
                      padding: '2px 8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      borderRadius: '4px',
                      border: '1px solid var(--border-light)',
                      background: heightUnit === 'cm' ? 'var(--primary-orange)' : 'var(--bg-surface-subtle)',
                      color: heightUnit === 'cm' ? '#FFF' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    cm
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeightUnit('ft')}
                    style={{
                      padding: '2px 8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      borderRadius: '4px',
                      border: '1px solid var(--border-light)',
                      background: heightUnit === 'ft' ? 'var(--primary-orange)' : 'var(--bg-surface-subtle)',
                      color: heightUnit === 'ft' ? '#FFF' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    ft / in
                  </button>
                </div>
              </div>

              {heightUnit === 'cm' ? (
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 175 cm"
                  value={heightCm}
                  onChange={(e) => handleHeightCmChange(e.target.value)}
                />
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <input
                      type="number"
                      placeholder="Feet"
                      className="form-input"
                      value={heightFeet}
                      onChange={(e) => handleHeightFtInChange(e.target.value, heightInches)}
                    />
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Feet</span>
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Inches"
                      className="form-input"
                      value={heightInches}
                      onChange={(e) => handleHeightFtInChange(heightFeet, e.target.value)}
                    />
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Inches</span>
                  </div>
                </div>
              )}
            </div>

            <button
              className="btn-start-workout"
              style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
              onClick={() => setStep(2)}
            >
              Continue to Lifestyle <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: LIFESTYLE & AVAILABILITY */}
        {step === 2 && (
          <div>
            <div className="form-group">
              <label className="form-label">Sleep Quality</label>
              <div className="pill-group">
                {['Low', 'Mid', 'High'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`pill-item ${formData.sleepQuality === s ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, sleepQuality: s })}
                  >
                    {s} Sleep {s === 'High' ? '(Great)' : s === 'Mid' ? '(Normal)' : '(Tired)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Current Life Stress</label>
              <div className="pill-group">
                {['Low', 'Mid', 'High'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`pill-item ${formData.stressLevel === st ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, stressLevel: st })}
                  >
                    {st} Stress
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Workout Time (Minutes)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.timeAvailable}
                  onChange={(e) => setFormData({ ...formData, timeAvailable: Number(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Days per Week (2–6)</label>
                <input
                  type="number"
                  min="2"
                  max="6"
                  className="form-input"
                  value={formData.daysAvailable}
                  onChange={(e) => setFormData({ ...formData, daysAvailable: Number(e.target.value) })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button
                type="button"
                className="btn-slot-alt"
                style={{ flex: 1 }}
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className="btn-start-workout"
                style={{ flex: 2, justifyContent: 'center' }}
                onClick={() => setStep(3)}
              >
                Next: Gear & Comfort <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: EQUIPMENT ACCESS & INJURIES */}
        {step === 3 && (
          <div>
            <div className="form-group">
              <label className="form-label">What equipment do you have access to?</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {equipmentOptions.map((eq) => {
                  const active = (formData.equipment_access || []).includes(eq);
                  return (
                    <button
                      key={eq}
                      type="button"
                      className={`pill-item ${active ? 'active' : ''}`}
                      onClick={() => handleEquipmentToggle(eq)}
                    >
                      {active ? '✓ ' : '+ '} {eq}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '14px' }}>
              <label className="form-label">Any areas to protect? (Optional)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {injuryOptions.map((inj) => {
                  const checked = (formData.injuries || []).includes(inj.id);
                  return (
                    <div
                      key={inj.id}
                      onClick={() => handleInjuryToggle(inj.id)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: `1px solid ${checked ? '#FF6433' : 'var(--border-light)'}`,
                        background: checked ? 'var(--primary-orange-light)' : 'var(--bg-surface-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>
                        {inj.label}
                      </span>
                      {checked && <span style={{ color: 'var(--primary-orange)', fontWeight: '700', fontSize: '12px' }}>Avoided</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                className="btn-slot-alt"
                style={{ flex: 1 }}
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button
                className="btn-start-workout"
                style={{ flex: 2, justifyContent: 'center' }}
                onClick={handleProceedToReview}
                disabled={loading}
              >
                {loading ? 'Calculating...' : 'Review Plan →'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PLAN SUMMARY */}
        {step === 4 && analyzedResults && (
          <div>
            <div style={{
              background: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <ShieldCheck size={20} color="var(--primary-orange)" />
                <span style={{ fontSize: '14px', fontWeight: '800' }}>
                  Plan Rules Confirmed
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Recovery Capacity:</span>
                  <div style={{ fontWeight: '800', fontSize: '16px', color: 'var(--text-main)' }}>
                    {analyzedResults.lifestyle_scores.recovery_capacity}%
                  </div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Workout Frequency:</span>
                  <div style={{ fontWeight: '800', fontSize: '16px', color: 'var(--primary-orange)' }}>
                    {analyzedResults.training_strategy.frequency_cap} Days / week
                  </div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Daily Target Calories:</span>
                  <div style={{ fontWeight: '800', fontSize: '16px', color: 'var(--text-main)' }}>
                    {analyzedResults.nutrition.target_calories} kcal
                  </div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Daily Protein:</span>
                  <div style={{ fontWeight: '800', fontSize: '16px', color: 'var(--text-main)' }}>
                    {analyzedResults.nutrition.protein_target}g
                  </div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '16px' }}>
              Your routine will be created using your available equipment and personalized set/rep ranges to guarantee safety and progress.
            </p>

            <button
              className="btn-start-workout"
              style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
              onClick={handleFinalizePlan}
              disabled={loading}
            >
              {loading ? 'Creating Your Routine...' : 'Create My Plan 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
