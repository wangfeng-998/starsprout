import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';

const steps = [
  {
    title: '欢迎来到星芽 🌱',
    subtitle: '这里没有考试，没有评判。\n只有一颗陪你发芽的星星。',
    illustration: '🌟',
    description: '你不必成为太阳，做一颗发芽的星星就好。',
  },
  {
    title: '今天感觉如何？',
    subtitle: '我们可以从记录心情开始。\n不需要很多话，一个表情就够了。',
    illustration: '💛',
    description: '无论快乐或低落，所有情绪都值得被看见。',
  },
  {
    title: '慢慢来',
    subtitle: '每天只需5分钟。\n学一点数学，写两行代码，或者只是呼吸。',
    illustration: '🐢',
    description: '不急不急，按你自己的节奏来。',
  },
];

const avatars = ['⭐', '🌙', '🌸', '🦋', '🐣', '🌈', '🍀', '🕊️', '🐱', '🦊'];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('⭐');
  const [showNameInput, setShowNameInput] = useState(false);

  const { setUserName, setUserAvatar, completeOnboarding } = useAppStore();

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShowNameInput(true);
    }
  };

  const handleFinish = () => {
    setUserName(name || '小星星');
    setUserAvatar(selectedAvatar);
    completeOnboarding();
  };

  if (showNameInput) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-6 petal-bg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-warm max-w-sm w-full text-center"
        >
          <div className="text-6xl mb-4">{selectedAvatar}</div>
          <h2 className="text-xl font-semibold text-earth-700 mb-2">
            怎么称呼你？
          </h2>
          <p className="text-earth-400 text-sm mb-4">
            可以是真名，也可以是任何你喜欢的名字
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {avatars.map((a) => (
              <button
                key={a}
                onClick={() => setSelectedAvatar(a)}
                className={`text-2xl p-2 rounded-xl transition-all ${
                  selectedAvatar === a
                    ? 'bg-calm-gold/20 ring-2 ring-calm-gold/40 scale-110'
                    : 'bg-earth-100/50 hover:bg-earth-100'
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          <input
            className="input-warm mb-4 text-center"
            placeholder="你的名字..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFinish()}
            autoFocus
          />

          <button onClick={handleFinish} className="btn-primary w-full">
            开始旅程 🌱
          </button>
        </motion.div>
      </div>
    );
  }

  const currentStep = steps[step];

  return (
    <div className="min-h-dvh flex items-center justify-center p-6 petal-bg">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="card-warm max-w-sm w-full text-center"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-7xl mb-6"
          >
            {currentStep.illustration}
          </motion.div>

          <h1 className="text-2xl font-bold text-earth-700 mb-2">
            {currentStep.title}
          </h1>
          <p className="text-earth-500 whitespace-pre-line leading-relaxed mb-3">
            {currentStep.subtitle}
          </p>
          <p className="text-earth-400 text-sm italic mb-6">
            {currentStep.description}
          </p>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? 'w-6 bg-calm-gold' : 'w-1.5 bg-earth-200'
                }`}
              />
            ))}
          </div>

          <button onClick={handleNext} className="btn-primary w-full">
            {step < steps.length - 1 ? '继续 →' : '准备好了 ✨'}
          </button>

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="btn-ghost mt-3 text-sm text-earth-400"
            >
              ← 上一步
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
