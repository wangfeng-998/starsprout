import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Soundscape {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

const soundscapes: Soundscape[] = [
  { id: 'rain', name: '雨声', emoji: '🌧️', description: '淅淅沥沥，冲刷一天的疲惫' },
  { id: 'forest', name: '森林', emoji: '🌲', description: '鸟鸣与风穿过树叶的声音' },
  { id: 'campfire', name: '篝火', emoji: '🔥', description: '噼啪作响的温暖篝火' },
  { id: 'ocean', name: '海浪', emoji: '🌊', description: '潮起潮落，一切都慢下来' },
  { id: 'cafe', name: '咖啡馆', emoji: '☕', description: '远处的交谈声，安心而慵懒' },
  { id: 'wind', name: '微风', emoji: '🍃', description: '轻轻的风铃声，让人平静' },
];

const meditations = [
  { duration: 3, title: '三分驻足', description: '停下来，感受此刻呼吸' },
  { duration: 5, title: '五分钟放松', description: '缓慢释放身体的紧张' },
  { duration: 10, title: '十分钟安睡', description: '为入睡做好准备' },
];

// Gentle affirmations
const affirmations = [
  '你已经做得很好了。',
  '这种感受是真实的，也是暂时的。',
  '不需要今天就解决所有问题。',
  '允许自己不完美。',
  '你的感受很重要。',
  '慢慢来，一切都会好起来的。',
  '你不是一个人在经历这些。',
  '休息也是一种进步。',
];

// 5-4-3-2-1 grounding exercise
const groundingSteps = [
  { instruction: '看看周围，说出 5 样你能看到的东西', count: 5, sense: '👀' },
  { instruction: '感受 4 样你能触摸到的东西', count: 4, sense: '🤲' },
  { instruction: '倾听 3 种你听到的声音', count: 3, sense: '👂' },
  { instruction: '闻一闻，找到 2 种气味', count: 2, sense: '👃' },
  { instruction: '感受口中或身体的 1 种感觉', count: 1, sense: '💫' },
];

export default function SafeSpace() {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [showMeditation, setShowMeditation] = useState(false);
  const [meditationTime, setMeditationTime] = useState(0);
  const [isMeditating, setIsMeditating] = useState(false);
  const [meditationProgress, setMeditationProgress] = useState(0);
  const [showEmergency, setShowEmergency] = useState(false);
  const [groundingStep, setGroundingStep] = useState(0);
  const [affirmation, setAffirmation] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const meditateTimerRef = useRef<ReturnType<typeof setInterval>>();

  // Affirmation rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setAffirmation(
        affirmations[Math.floor(Math.random() * affirmations.length)]
      );
    }, 8000);
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
    return () => clearInterval(interval);
  }, []);

  // Sound simulation with visual feedback
  const toggleSound = (id: string) => {
    if (activeSound === id) {
      setActiveSound(null);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setActiveSound(id);
      // Simulate playing - would be replaced with actual audio
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  // Meditation
  const startMeditation = (duration: number) => {
    setMeditationTime(duration * 60);
    setIsMeditating(true);
    setMeditationProgress(0);

    const totalSeconds = duration * 60;
    let elapsed = 0;

    meditateTimerRef.current = setInterval(() => {
      elapsed++;
      setMeditationProgress((elapsed / totalSeconds) * 100);
      setMeditationTime(totalSeconds - elapsed);

      if (elapsed >= totalSeconds) {
        clearInterval(meditateTimerRef.current);
        setIsMeditating(false);
        setShowMeditation(false);
      }
    }, 1000);
  };

  const stopMeditation = () => {
    if (meditateTimerRef.current) clearInterval(meditateTimerRef.current);
    setIsMeditating(false);
    setShowMeditation(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (meditateTimerRef.current) clearInterval(meditateTimerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className="max-w-lg mx-auto px-5 pt-8 pb-4 page-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-earth-700 mb-1">安全空间 🌳</h1>
        <p className="text-sm text-earth-400">这是一个只属于你的树洞</p>
      </div>

      {/* Affirmation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={affirmation}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="card-warm mb-4 text-center py-5 border-l-4 border-l-calm-green/40"
        >
          <p className="text-earth-600 italic text-balance leading-relaxed">
            "{affirmation}"
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Soundscapes */}
      <div className="card-warm mb-4">
        <h2 className="text-sm font-semibold text-earth-600 mb-3">
          环境音景 🎧
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {soundscapes.map((sound) => (
            <motion.button
              key={sound.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSound(sound.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                activeSound === sound.id
                  ? 'bg-calm-green/15 ring-2 ring-calm-green/30'
                  : 'bg-earth-100/30 hover:bg-earth-100/50'
              }`}
            >
              <span className="text-2xl">
                {sound.emoji}
                {activeSound === sound.id && (
                  <motion.span
                    className="absolute text-xs"
                    animate={{ opacity: [0, 1, 0], y: [-5, -15, -25] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ♪
                  </motion.span>
                )}
              </span>
              <span className="text-xs text-earth-500">{sound.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Guided Meditation */}
      <div className="card-warm mb-4">
        <h2 className="text-sm font-semibold text-earth-600 mb-3">
          引导冥想 🧘
        </h2>

        {!showMeditation ? (
          <div className="space-y-2">
            {meditations.map((med) => (
              <button
                key={med.duration}
                onClick={() => {
                  setShowMeditation(true);
                  setMeditationTime(med.duration * 60);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-earth-100/30 hover:bg-earth-100/50 transition-colors"
              >
                <span className="text-2xl">
                  {med.duration === 3 ? '🌿' : med.duration === 5 ? '🍃' : '🌙'}
                </span>
                <div className="text-left">
                  <h3 className="text-sm font-medium text-earth-700">
                    {med.title}
                  </h3>
                  <p className="text-xs text-earth-400">{med.description}</p>
                </div>
                <span className="text-xs text-earth-400 ml-auto">
                  {med.duration} 分钟
                </span>
              </button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            {!isMeditating ? (
              <>
                <div className="text-5xl mb-4">🧘</div>
                <p className="text-earth-500 text-sm mb-4">
                  准备好开始 {formatTime(meditationTime)} 的冥想了吗？
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => startMeditation(meditationTime / 60)}
                    className="btn-primary text-sm"
                  >
                    开始 🌸
                  </button>
                  <button
                    onClick={() => setShowMeditation(false)}
                    className="btn-ghost text-sm text-earth-400"
                  >
                    返回
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Meditation progress circle */}
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="text-earth-100"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="text-calm-green"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - meditationProgress / 100)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-light text-earth-700">
                      {formatTime(meditationTime)}
                    </span>
                    <span className="text-xl">🌙</span>
                  </div>
                </div>

                {/* Breathing guide */}
                <motion.div
                  className="w-20 h-20 mx-auto rounded-full bg-calm-green/10 mb-3"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <p className="text-xs text-earth-400 mb-3">
                  跟着这颗光点一起呼吸...
                </p>

                <button
                  onClick={stopMeditation}
                  className="btn-ghost text-sm text-earth-400"
                >
                  结束冥想
                </button>
              </>
            )}
          </motion.div>
        )}
      </div>

      {/* Emergency Kit */}
      <div className="card-warm mb-4 border-2 border-calm-pink/20">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🧰</span>
          <h2 className="text-sm font-semibold text-earth-600">急救箱</h2>
          <span className="text-[10px] text-calm-pink/70 ml-auto">
            紧急时使用
          </span>
        </div>
        <p className="text-xs text-earth-400 mb-3">
          当情绪特别强烈，需要立即找到一些抓手的时候...
        </p>

        {!showEmergency ? (
          <button
            onClick={() => {
              setShowEmergency(true);
              setGroundingStep(0);
            }}
            className="btn-primary text-sm w-full bg-calm-pink/70 hover:bg-calm-pink/80"
          >
            打开急救箱 👐
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-calm-pink/5 rounded-xl p-4 mb-3">
              <h3 className="text-sm font-medium text-earth-700 mb-2">
                5-4-3-2-1 接地练习
              </h3>
              <p className="text-xs text-earth-400 mb-3">
                让注意力回到当下，从焦虑中抽离出来
              </p>

              {groundingStep < groundingSteps.length ? (
                <div className="text-center">
                  <p className="text-2xl mb-2">
                    {groundingSteps[groundingStep].sense}
                  </p>
                  <p className="text-sm text-earth-600 mb-1 font-medium">
                    {groundingSteps[groundingStep].instruction}
                  </p>
                  <p className="text-xs text-earth-400 mb-3">
                    正在做第 {groundingStep + 1}/{groundingSteps.length} 步
                  </p>
                  <button
                    onClick={() => setGroundingStep(groundingStep + 1)}
                    className="btn-ghost text-sm text-calm-gold"
                  >
                    {groundingStep < groundingSteps.length - 1
                      ? '下一步 →'
                      : '完成 ✨'}
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-3xl mb-2 block">🌿</span>
                  <p className="text-sm text-earth-600 mb-3">
                    做得很好。你已经回到了此刻。
                    如果需要，可以再来一轮。
                  </p>
                  <button
                    onClick={() => setGroundingStep(0)}
                    className="btn-ghost text-xs text-earth-400"
                  >
                    再来一轮
                  </button>
                </div>
              )}
            </div>

            {/* Cold sensory suggestion */}
            <div className="bg-calm-blue/5 rounded-xl p-4">
              <h3 className="text-sm font-medium text-earth-700 mb-2">
                感官降温法 🧊
              </h3>
              <p className="text-xs text-earth-400 leading-relaxed">
                试试握住一块冰块，或在手腕内侧滴一滴冷水。
                强烈的感官刺激可以帮你暂时"跳出"情绪的漩涡。
              </p>
            </div>

            <button
              onClick={() => {
                setShowEmergency(false);
                setGroundingStep(0);
              }}
              className="btn-ghost text-xs text-earth-400 w-full mt-3"
            >
              关闭急救箱
            </button>
          </motion.div>
        )}
      </div>

      {/* Growth Timeline placeholder */}
      <div className="card-warm">
        <h2 className="text-sm font-semibold text-earth-600 mb-3">
          成长时间线 📅
        </h2>
        <div className="text-center py-6">
          <span className="text-3xl mb-2 block">🌱</span>
          <p className="text-sm text-earth-500 mb-1">
            你已经走了很远的路
          </p>
          <p className="text-xs text-earth-400">
            每一次打开星芽，每一次记录心情，
            每一次尝试——都是成长。
          </p>
        </div>
      </div>
    </motion.div>
  );
}
