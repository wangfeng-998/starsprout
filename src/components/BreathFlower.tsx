import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BreathFlowerProps {
  onComplete?: () => void;
}

type Phase = 'inhale' | 'hold' | 'exhale' | 'rest';

const phaseConfig: Record<Phase, { label: string; duration: number; scale: number }> = {
  inhale: { label: '吸气', duration: 4, scale: 1.3 },
  hold: { label: '屏息', duration: 7, scale: 1.3 },
  exhale: { label: '呼气', duration: 8, scale: 0.85 },
  rest: { label: '放松', duration: 2, scale: 1 },
};

export default function BreathFlower({ onComplete }: BreathFlowerProps) {
  const [phase, setPhase] = useState<Phase>('inhale');
  const [countdown, setCountdown] = useState(phaseConfig.inhale.duration);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Move to next phase
          const phases: Phase[] = ['inhale', 'hold', 'exhale', 'rest'];
          const idx = phases.indexOf(phase);
          const next = phases[(idx + 1) % phases.length];
          setPhase(next);
          if (next === 'inhale') {
            setCycles((c) => c + 1);
          }
          return phaseConfig[next].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  useEffect(() => {
    if (cycles >= 3) {
      setIsActive(false);
      setPhase('inhale');
      setCountdown(phaseConfig.inhale.duration);
      setCycles(0);
      onComplete?.();
    }
  }, [cycles, onComplete]);

  const startSession = () => {
    setIsActive(true);
    setPhase('inhale');
    setCountdown(phaseConfig.inhale.duration);
    setCycles(0);
  };

  const config = phaseConfig[phase];

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{
          scale: isActive ? config.scale : 1,
        }}
        transition={{
          duration: isActive ? config.duration : 0.5,
          ease: 'easeInOut',
        }}
        className="relative mb-6"
      >
        {/* Flower petals */}
        <div className="w-32 h-32 relative">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.div
              key={angle}
              className="absolute top-1/2 left-1/2 w-16 h-8 -mt-4 -ml-8"
              style={{ transform: `rotate(${angle}deg)`, transformOrigin: 'right center' }}
              animate={{
                scaleY: isActive ? phase === 'exhale' ? 0.7 : 1 : 1,
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `hsl(${30 + i * 15}, 65%, ${75 + (i % 3) * 5}%)`,
                  opacity: 0.8,
                }}
              />
            </motion.div>
          ))}
          {/* Center */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-10 h-10 -mt-5 -ml-5 rounded-full bg-calm-gold/40 flex items-center justify-center text-lg"
            animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌼
          </motion.div>
        </div>

        {/* Breathing ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-calm-gold/20 -m-4"
          animate={{
            scale: isActive ? config.scale * 1.05 : 1,
            opacity: isActive ? [0.3, 0.6, 0.3] : 0.1,
          }}
          transition={{
            duration: isActive ? config.duration : 2,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {isActive ? (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="text-2xl font-bold text-calm-gold mb-1">
              {config.label}
            </p>
            <p className="text-4xl font-light text-earth-400 mb-2">
              {countdown}
            </p>
            <p className="text-xs text-earth-300">
              第 {Math.min(cycles + 1, 3)} / 3 轮
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="text-earth-500 text-sm mb-4">
              跟着花朵一起呼吸，让焦虑慢慢消散
            </p>
            <button onClick={startSession} className="btn-primary">
              开始呼吸练习 🌸
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
