import test from 'node:test';
import assert from 'node:assert/strict';
import App from '../App.jsx';
import Header from '../components/Header.jsx';
import SideDrawer from '../components/SideDrawer.jsx';
import BottomNav from '../components/BottomNav.jsx';
import LiveTimerModal from '../components/LiveTimerModal.jsx';
import AlternativesModal from '../components/AlternativesModal.jsx';
import FreshWelcomeView from '../components/FreshWelcomeView.jsx';
import OnboardingModal from '../components/OnboardingModal.jsx';
import MetricCards from '../components/MetricCards.jsx';
import TrendingCard from '../components/TrendingCard.jsx';
import PopularCollections from '../components/PopularCollections.jsx';
import LatestActivityList from '../components/LatestActivityList.jsx';
import SlotCard from '../components/SlotCard.jsx';
import OverallStatCard from '../components/OverallStatCard.jsx';
import GoalProgressList from '../components/GoalProgressList.jsx';
import HomeTab from '../pages/HomeTab.jsx';
import PlanTab from '../pages/PlanTab.jsx';
import DiscoverTab from '../pages/DiscoverTab.jsx';
import StatsTab from '../pages/StatsTab.jsx';
import ProfileTab from '../pages/ProfileTab.jsx';
import * as apiService from '../services/api.js';

test('Frontend entrypoint App is a valid React component function', () => {
  assert.strictEqual(typeof App, 'function');
});

test('Header navigation bar exports valid component', () => {
  assert.strictEqual(typeof Header, 'function');
});

test('SideDrawer slide-out navigation exports valid component', () => {
  assert.strictEqual(typeof SideDrawer, 'function');
});

test('BottomNav dock exports valid component', () => {
  assert.strictEqual(typeof BottomNav, 'function');
});

test('LiveTimerModal workout timer exports valid component', () => {
  assert.strictEqual(typeof LiveTimerModal, 'function');
});

test('AlternativesModal exercise replacement dialog exports valid component', () => {
  assert.strictEqual(typeof AlternativesModal, 'function');
});

test('FreshWelcomeView zero-state onboarding exports valid component', () => {
  assert.strictEqual(typeof FreshWelcomeView, 'function');
});

test('OnboardingModal 4-step assessment stepper exports valid component', () => {
  assert.strictEqual(typeof OnboardingModal, 'function');
});

test('MetricCards circular recovery and calorie cards export valid component', () => {
  assert.strictEqual(typeof MetricCards, 'function');
});

test('TrendingCard daily feature card exports valid component', () => {
  assert.strictEqual(typeof TrendingCard, 'function');
});

test('PopularCollections collection cards export valid component', () => {
  assert.strictEqual(typeof PopularCollections, 'function');
});

test('LatestActivityList activity stream exports valid component', () => {
  assert.strictEqual(typeof LatestActivityList, 'function');
});

test('SlotCard routine exercise card exports valid component', () => {
  assert.strictEqual(typeof SlotCard, 'function');
});

test('OverallStatCard weekly consistency bar chart exports valid component', () => {
  assert.strictEqual(typeof OverallStatCard, 'function');
});

test('GoalProgressList progress rings export valid component', () => {
  assert.strictEqual(typeof GoalProgressList, 'function');
});

test('All primary tab views export valid React component functions', () => {
  assert.strictEqual(typeof HomeTab, 'function');
  assert.strictEqual(typeof PlanTab, 'function');
  assert.strictEqual(typeof DiscoverTab, 'function');
  assert.strictEqual(typeof StatsTab, 'function');
  assert.strictEqual(typeof ProfileTab, 'function');
});

test('apiService provides fallback data and query utilities', () => {
  assert.ok(apiService.fallbackUserData);
  assert.ok(apiService.fallbackSimulation);
  assert.strictEqual(typeof apiService.analyzeUserData, 'function');
});
