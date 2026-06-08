import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BreathFlowerProps {
  onComplete?: () => void;
}

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'rest';

const phaseConfig: Record<
  Phase,
  { label: string; sub: string; duration: number; scale: number; color: string }
> = {
  idle:     { label: '准备开始', sub: '找一个舒服的姿势', duration: 0,  scale: 1,    color: '#f7c873' },
  inhale:   { label: '吸气',   sub: '让空气慢慢充满腹部', duration: 4, scale: 1.35, color: '#a8d8b8' },
  hold:     { label: '屏息',   sub: '轻轻感受，不必用力',     duration: 7, scale: 1.35, color: '#b8d4e8' },
  exhale:   { label: '呼气',   sub: '像花瓣一样慢慢舒展',     duration: 8, scale: 0.8,  color: '#f4c2c2' },
  rest:     { label: '放松',   sub: '感受此刻的平静',       duration: 2, scale: 1,    color: '#f7c873' },
};

const petals = [
  { angle: 0,   color: '#f7c873' },
  { angle: 60,  color: '#f4c2c2' },
  { angle: 120, color: '#b8d4e8' },
  { angle: 180, color: '#b8d8ba' },
  { angle: 240, color: '#e8d4f4' },
  { angle: 300, color: '#f4e8b8' },
];

export default function BreathFlower({ onComplete }: BreathFlowerProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [countdown, setCountdown] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startSession = useCallback(() => {
    setIsActive(true);
    setPhase('inhale');
    setCountdown(phaseConfig.inhale.duration);
    setCycles(0);
    setShowInstruction(false);
  }, []);

  const stopSession = useCallback(() => {
    clearTimer();
    setIsActive(false);
    setPhase('idle');
    setCountdown(0);
    setCycles(0);
    setShowInstruction(true);
    onComplete?.();
  }, [clearTimer, onComplete]);

  useEffect(() => {
    if (!isActive) return;
    if (countdown <= 0) {
      // 切换到下一阶段
      const flow: Phase[] = ['inhale', 'hold', 'exhale', 'rest'];
      const idx = flow.indexOf(phase);
      const next = flow[(idx + 1) % flow.length];
      setPhase(next);
      setCountdown(phaseConfig[next].duration);
      if (next === 'inhale') {
        setCycles(c => {
          const nextC = c + 1;
          if (nextC > 3) { stopSession(); return c; }
          return nextC;
        });
      }
      return;
    }
    timerRef.current = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    return () => clearTimer();
  }, [isActive, phase, countdown, clearTimer, stopSession]);

  const cfg = phaseConfig[phase];
  const progress = phase === 'idle' ? 0 : ((cfg.duration - countdown) / cfg.duration) * 100;

  return (
    <div className="flex flex-col items-center">
      {/* 花朵主体 */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-6">
        {/* 呼吸光环 */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ borderColor: cfg.color }}
          animate={{
            scale: isActive ? cfg.scale * 1.08 : 1,
            opacity: isActive ? [0.15, 0.35, 0.15] : 0.1,
            borderWidth: isActive ? 3 : 1,
          }}
          transition={{
            duration: isActive ? cfg.duration : 2,
            ease: 'easeInOut',
            repeat: isActive ? Infinity : 0,
          }}
        />

        {/* 花瓣 */}
        {petals.map((p, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-16 h-8 -mt-4 -ml-8 origin-right"
            style={{ rotate: `${p.angle}deg` }}
            animate={{
              scaleY: isActive
                ? phase === 'exhale' ? 0.6 : phase === 'inhale' ? 1.2 : 1
                : 1,
              opacity: isActive ? 0.9 : 0.6,
            }}
            transition={{ duration: isActive ? cfg.duration : 0.8, ease: 'easeInOut' }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{ background: `radial-gradient(ellipse, ${p.color}cc, ${p.color}33)` }}
            />
          </motion.div>
        ))}

        {/* 花心 */}
        <motion.div
          className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
          style={{ background: `radial-gradient(circle, ${cfg.color}66, ${cfg.color}22)` }}
          animate={{ scale: isActive ? [1, 1.15, 1] : 1 }}
          transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
        >
          🌼
        </motion.div>

        {/* 进度环 */}
        {isActive && (
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#e8e0d0" strokeWidth="2" />
            <motion.circle
              cx="60" cy="60" r="54" fill="none"
              stroke={cfg.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 54}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - progress / 100) }}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </svg>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!isActive ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center"
          >
            {showInstruction && (
              <p className="text-earth-500 text-sm mb-4 max-w-xs">
                找一个舒服的姿势，准备好后点击开始。<br />我们会一起做 3 轮 4-7-8 呼吸。
              </p>
            )}
            <button onClick={startSession} className="btn-primary text-base px-8 py-3">
              🌸 开始呼吸练习
            </button>
            {!showInstruction && (
              <button onClick={() => setShowInstruction(true)} className="btn-ghost text-xs mt-3">
                查看说明
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="active"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="text-2xl font-bold mb-1" style={{ color: cfg.color }}>
              {cfg.label}
            </p>
            <p className="text-4xl font-light text-earth-400 mb-1">{countdown}</p>
            <p className="text-xs text-earth-400 mb-4">{cfg.sub}</p>
            <div className="flex gap-2 justify-center mb-3">
              {[1, 2, 3].map(c => (
                <div
                  key={c}
                  className="w-6 h-1.5 rounded-full transition-all duration-500"
                  style={{ background: c <= cycles + 1 ? cfg.color : '#e8e0d0' }}
                />
              ))}
            </div>
            <p className="text-[10px] text-earth-400">第 {Math.min(cycles + 1, 3)} / 3 轮</p>
            <button onClick={stopSession} className="btn-ghost text-xs mt-4">
              提前结束
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
