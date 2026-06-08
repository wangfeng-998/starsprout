import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store';
import { AnimatePresence } from 'framer-motion';
import BottomNav from './components/BottomNav';
import Onboarding from './pages/Onboarding';
import MoodSanctuary from './pages/MoodSanctuary';
import MathGarden from './pages/MathGarden';
import CodeSparks from './pages/CodeSparks';
import PathFinder from './pages/PathFinder';
import SafeSpace from './pages/SafeSpace';

export default function App() {
  const onboardingComplete = useAppStore((s) => s.onboardingComplete);

  if (!onboardingComplete) {
    return <Onboarding />;
  }

  return (
    <div className="min-h-dvh pb-20 nav-safe petal-bg">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<MoodSanctuary />} />
          <Route path="/math" element={<MathGarden />} />
          <Route path="/code" element={<CodeSparks />} />
          <Route path="/path" element={<PathFinder />} />
          <Route path="/safe" element={<SafeSpace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}
