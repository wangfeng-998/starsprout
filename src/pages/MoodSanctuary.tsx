import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, MoodEmoji } from '../store';
import BreathFlower from '../components/BreathFlower';

const moodOptions: { emoji: MoodEmoji; label: string; color: string; value: number }[] = [
  { emoji: '😊', label: '开心', color: '#f4c542', value: 5 },
  { emoji: '😌', label: '平静', color: '#8fbc8f', value: 4 },
  { emoji: '😐', label: '还行', color: '#b8a9c9', value: 3 },
  { emoji: '😔', label: '低落', color: '#7ba7c9', value: 2 },
  { emoji: '😢', label: '难过', color: '#a0c4e8', value: 1 },
  { emoji: '😤', label: '烦躁', color: '#d4a5a5', value: 2 },
  { emoji: '🥺', label: '委屈', color: '#f4c2c2', value: 1 },
  { emoji: '😴', label: '疲惫', color: '#c9bfb5', value: 2 },
  { emoji: '🌈', label: '有希望', color: '#f7c873', value: 5 },
  { emoji: '💪', label: '有力量', color: '#b8d8ba', value: 5 },
];

const intensityLabels = ['很轻微', '有一点', '中等', '比较强', '非常强'];

const quickResponses = [
  '听起来今天不太容易，你愿意多说一点吗？',
  '我听到了。这种感觉是真实的，也是暂时的。',
  '谢谢你愿意分享。你可以在这里待一会儿，不用着急。',
  '不管怎样，你已经很棒了——因为你打开了这个页面。',
  '情绪就像天气，它在变，也会变。你不是你的情绪。',
];

const moodValueMap: Record<MoodEmoji, number> = {
  '😊': 5, '🌈': 5, '💪': 5,
  '😌': 4,
  '😐': 3,
  '😔': 2, '😤': 2, '😴': 2,
  '😢': 1, '🥺': 1,
};

export default function MoodSanctuary() {
  const {
    userName, userAvatar,
    todayCheckedIn, streak,
    setTodayCheckedIn, addMoodRecord, updateStreak,
    moodHistory,
  } = useAppStore();

  const [selectedMood, setSelectedMood] = useState<MoodEmoji | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [note, setNote] = useState('');
  const [showBreath, setShowBreath] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [showCelebrate, setShowCelebrate] = useState(false);

  // 最近7天情绪数据
  const weekData = useMemo(() => {
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    const data: { day: string; emoji: string; value: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const record = moodHistory.find(
        r => new Date(r.timestamp).toISOString().split('T')[0] === dateStr
      );
      data.push({
        day: days[d.getDay()],
        emoji: record?.emoji ?? '',
        value: record ? moodValueMap[record.emoji] ?? 0 : 0,
      });
    }
    return data;
  }, [moodHistory]);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayRecord = moodHistory.find(
    r => new Date(r.timestamp).toISOString().split('T')[0] === todayStr
  );

  const handleCheckIn = () => {
    if (!selectedMood) return;
    addMoodRecord({ emoji: selectedMood, intensity, note, timestamp: Date.now() });
    setTodayCheckedIn(true);
    updateStreak();
    setAiMessage(quickResponses[Math.floor(Math.random() * quickResponses.length)]);
    if (streak + 1 >= 3) {
      setShowCelebrate(true);
      setTimeout(() => setShowCelebrate(false), 3000);
    }
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 6) return '夜深了 🌙';
    if (h < 12) return '早上好 ☀️';
    if (h < 14) return '中午好 🌤️';
    if (h < 18) return '下午好 🌈';
    return '晚上好 🌆';
  };

  return (
    <motion.div
      className="max-w-lg mx-auto px-5 pt-8 pb-6 page-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* 签到庆祝 */}
      <AnimatePresence>
        {showCelebrate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: 3, duration: 0.4 }}
                className="text-6xl mb-2"
              >🎉</motion.div>
              <p className="text-lg font-bold text-earth-700">
                连续签到 {streak + 1} 天！
              </p>
              <p className="text-sm text-earth-400">你真的在认真对待自己 💛</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-medium text-earth-500">{greeting()}</h1>
          <p className="text-2xl font-bold text-earth-700 flex items-center gap-2">
            <span>{userAvatar}</span><span>{userName || '小星星'}</span>
          </p>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1 bg-warm-50 px-3 py-1.5 rounded-full">
            <span className="text-lg">🔥</span>
            <span className="text-sm font-semibold text-warm-700">{streak} 天</span>
          </div>
        )}
      </div>

      {/* 情绪签到 */}
      {!todayRecord ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-warm mb-4">
          <h2 className="text-lg font-semibold text-earth-600 mb-1">此刻心情如何？</h2>
          <p className="text-sm text-earth-400 mb-4">选一个最能表达你的</p>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {moodOptions.map(m => (
              <motion.button
                key={m.emoji}
                onClick={() => setSelectedMood(m.emoji)}
                whileTap={{ scale: 0.9 }}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all text-2xl ${
                  selectedMood === m.emoji
                    ? 'bg-white ring-2 ring-calm-gold/50 shadow-md scale-110'
                    : 'bg-earth-100/40 hover:bg-earth-100/70'
                }`}
              >
                <span>{m.emoji}</span>
                <span className="text-[10px] text-earth-400 font-medium">{m.label}</span>
              </motion.button>
            ))}
          </div>

          {selectedMood && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div>
                <label className="text-xs text-earth-400 mb-1.5 block">感觉有多强烈？</label>
                <div className="flex gap-1">
                  {intensityLabels.map((l, i) => (
                    <button
                      key={i}
                      onClick={() => setIntensity(i + 1)}
                      className={`flex-1 py-1.5 rounded-xl text-xs transition-all ${
                        intensity === i + 1
                          ? 'bg-calm-gold/20 text-calm-gold font-medium'
                          : 'bg-earth-100/40 text-earth-400 hover:bg-earth-100'
                      }`}
                    >{l}</button>
                  ))}
                </div>
              </div>
              <div>
                <textarea
                  className="input-warm text-sm resize-none h-16"
                  placeholder="想说点什么？（可以跳过）"
                  value={note} onChange={e => setNote(e.target.value)}
                  maxLength={200}
                />
              </div>
              <button onClick={handleCheckIn} className="btn-primary w-full text-sm">
                记录这一刻 ☁️
              </button>
            </motion.div>
          )}
        </motion.div>
      ) : (
        /* 已签到 */
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-warm mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{todayRecord.emoji}</span>
            <div>
              <p className="text-sm font-medium text-earth-600">今天的心情已记录</p>
              <p className="text-xs text-earth-400">强度 {todayRecord.intensity}/5 · 已连续 {streak} 天</p>
            </div>
          </div>

          {/* 情绪彩虹趋势图 */}
          {weekData.some(d => d.value > 0) && (
            <div className="pt-3 border-t border-earth-100">
              <p className="text-xs text-earth-400 mb-2">最近 7 天</p>
              <div className="flex items-end justify-between gap-1 h-20">
                {weekData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-lg transition-all duration-500"
                      style={{
                        height: `${d.value * 20}%`,
                        backgroundColor: d.value > 0
                          ? moodOptions.find(m => m.value === d.value)?.color ?? '#d4c5e2'
                          : '#f0ebe4',
                        minHeight: d.value > 0 ? '8px' : '4px',
                        opacity: d.value > 0 ? 0.85 : 0.3,
                      }}
                    />
                    <span className="text-[10px] text-earth-400">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* AI 暖伴 */}
      <AnimatePresence>
        {aiMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card-warm mb-4 border-l-4 border-l-calm-green/60"
          >
            <p className="text-sm text-earth-600 leading-relaxed italic">"{aiMessage}"</p>
            <p className="text-xs text-earth-400 mt-1">— 你的暖伴 🌱</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 呼吸练习 */}
      {!showBreath ? (
        <motion.div className="card-warm mb-4" whileHover={{ scale: 1.01 }}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌸</span>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-earth-600">呼吸练习</h3>
              <p className="text-xs text-earth-400">4-7-8 呼吸法，帮焦虑悄悄离开</p>
            </div>
            <button onClick={() => setShowBreath(true)} className="btn-primary text-sm">开始</button>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="card-warm mb-4 py-8"
        >
          <BreathFlower onComplete={() => setShowBreath(false)} />
        </motion.div>
      )}

      {/* 感恩一瞬 */}
      <motion.div
        className="card-warm"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      >
        <h3 className="text-sm font-semibold text-earth-600 mb-2">感恩一瞬 💮</h3>
        <p className="text-xs text-earth-400 mb-3">今天有什么微小却让你感到温暖的事？</p>
        <textarea
          className="input-warm text-sm resize-none h-14"
          placeholder="比如：窗外有阳光 / 喝到了好喝的茶 / 听到一首喜欢的歌..."
          maxLength={100}
        />
      </motion.div>
    </motion.div>
  );
}
