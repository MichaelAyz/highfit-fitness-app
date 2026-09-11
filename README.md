# High Fit | Deterministic AI Fitness & Nutrition Recommendation Platform

A production-grade, deterministic fitness architecture and mobile-first workout recommendation web platform. Designed to eliminate AI hallucinations by deriving all workout decisions from deterministic biomechanical rules, lifestyle scoring, validated templates, and a curated 55+ movement database.

---

## 🏗️ Architecture & Core Principles

The core AI **never hallucinates or invents exercises or volume out of thin air**. Workout generation follows a strict, non-negotiable decision flow:

```
User Intake Profile
  ↓
Lifestyle & Recovery Scoring (Recovery Capacity, Stress Load, Time Constraints)
  ↓
Training Strategy Selection (Frequency, Intensity, Volume Tiers)
  ↓
Template Selection (Full Body, Upper/Lower, Push/Pull/Legs)
  ↓
Workout Assembly (Biomechanical Movement Slot Matching + Injury Exclusions)
  ↓
Sets, Reps & RPE Prescription (Double Progression Framework)
  ↓
AI Rationale & Plan Finalization (Contextual biomechanical justification)
```

### Key Modules

- **`src/engine/lifestyle.js`**: Calculates recovery capacity (0–100 scale), stress loads, and time constraints based on sleep, stress, and schedule.
- **`src/engine/nutrition.js`**: Calculates BMR via Mifflin-St Jeor equation, TDEE with activity multipliers, safe caloric deficits/surpluses (clamped above BMR), and protein targets (2g/kg).
- **`src/engine/strategy.js`**: Assigns frequency, intensity, and volume tiers. Enforces safety caps (e.g., capping frequency to 3 days when recovery is low or stress is high).
- **`src/engine/prescriptions.js`**: Prescribes double progression rep ranges, RPE targets, and rest intervals per slot hierarchy.
- **`src/planner/assembler.js`**: Assembles multi-day workout routines from movement pattern slots, equipment constraints, and injury exclusions.
- **`src/data/exercises.js`**: 55+ curated, validated exercises covering all 9 primary movement patterns.
- **`src/ai/service.js`**: Contextual rationale generator with offline deterministic solver and optional Gemini LLM integration.
- **`src/db/index.js`**: Resilient data access layer supporting PostgreSQL with automatic zero-friction fallback to local storage.
- **`client/`**: Modern, mobile-first React frontend with dark aesthetic, metric tracking, custom slot swap drawer, and live workout timer.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ (tested on Node.js 20+)
- npm 9+

### 2. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 3. Environment Configuration (Optional)
Copy the example environment file:
```bash
cp .env.example .env
```
*Note: The platform is fully functional out-of-the-box without any database or API keys thanks to built-in deterministic fallbacks.*

### 4. Running the Application

```bash
# Start Backend API Server (default: http://localhost:4000)
npm run dev

# Start Frontend Dev Server (default: http://localhost:5173)
cd client
npm run dev
```

---

## 🧪 Testing & Code Quality

The codebase includes an extensive automated test suite covering all mathematical calculations, boundary validations, database fallback logic, and API routes:

```bash
# Run all automated tests
npm test
```

### Test Coverage Highlights
- **52 unit and integration tests across 13 test suites**:
  - `nutrition.test.js`: BMR (male/female/unspecified), TDEE, caloric limits, protein ratios.
  - `lifestyle.test.js`: Recovery baseline calculations, sleep/stress penalties, constraint mapping.
  - `strategy.test.js`: Recovery and stress frequency capping, volume/intensity assignments.
  - `prescriptions.test.js`: Double progression rules, RPE slot priority, conditioning intervals.
  - `assembler.test.js`: Slot assembly, equipment filtering, injury exclusion filters.
  - `exercises.test.js`: Catalog schema validation, uniqueness, movement pattern coverage.
  - `db.test.js`: PostgreSQL and fallback local storage transactions.
  - `app.test.js`: Express endpoints (`/api/v1/analyze`, `/api/v1/exercises`, `/api/health`).

---

## 📁 Repository Structure

```
├── client/                     # Mobile-first React/Vite frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components & modals
│   │   ├── pages/              # Tab views (Home, Plan, Discover, Stats, Profile)
│   │   ├── services/           # Frontend API client
│   │   └── styles/             # Curated design tokens & CSS theme
│   ├── index.html
│   └── vite.config.js
├── scripts/                    # Verification and integration flow scripts
│   ├── test_full_flow.js
│   └── verify_full_system.js
├── src/                        # Backend Express & Deterministic Engine
│   ├── ai/                     # Prompt templates & LLM / deterministic service
│   ├── data/                   # Exercise database (55+ movements)
│   ├── db/                     # Database connection layer & schema
│   ├── engine/                 # Core biomechanical & nutrition logic
│   ├── planner/                # Workout assembly & session templates
│   ├── routes/                 # Express API routes
│   ├── app.js                  # Express app setup & middleware
│   └── server.js               # Entry point
├── tests/                      # Automated test suite (52 tests)
├── .env.example                # Configuration template
├── .gitignore                  # Production gitignore configuration
├── context.md                  # Biomechanical & System Specification
├── package.json
└── README.md
```

---

## 🛡️ License
MIT
