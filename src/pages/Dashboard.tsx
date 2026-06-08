import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';

const greetings = {
  morning: { text: '早上好', emoji: '☀️', range: [5, 11] },
  noon: { text: '中午好', emoji: '🌤️', range: [11, 14] },
  afternoon: { text: '下午好', emoji: '🌿', range: [14, 18] },
  evening: { text: '晚上好', emoji: '🌙', range: [18, 23] },
  night: { text: '夜深了', emoji: '✨', range: [23, 5] },
};

function getGreeting(): { text: string; emoji: string } {
  const hour = new Date().getHours();
  for (const g of Object.values(greetings)) {
    const [start, end] = g.range;
    if (start <= end) {
      if (hour >= start && hour < end) return g;
    } else {
      // overnight range (23-5)
      if (hour >= start || hour < end) return g;
    }
  }
  return greetings.afternoon;
}

const dailyQuotes = [
  '不必成为太阳，做一颗发芽的星星就好。',
  '今天比昨天好一点点，就够了。',
  '慢慢来，比较快。',
  '所有的情绪都值得被看见。',
  '你不需要立刻成为谁，你已经在路上了。',
  '累了就休息，休息也是一种前进。',
  '每一步都是发芽。',
];

const quickActions = [
  { path: '/breathe', icon: '🌸', label: '呼吸练习', desc: '来一次3分钟的平静' },
  { path: '/safe', icon: '🌳', label: '安全空间', desc: '树洞在等你' },
  { path: '/math', icon: '🌱', label: '数学花园', desc: '今天种下什么？' },
  { path: '/code', icon: '✨', label: '代码星火', desc: '写两行代码吧' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const userName = useAppStore((s) => s.userName);
  const userAvatar = useAppStore((s) => s.userAvatar);
  const streak = useAppStore((s) => s.streak);
  const todayCheckedIn = useAppStore((s) => s.todayCheckedIn);
  const moodHistory = useAppStore((s) => s.moodHistory);
  const mathProgress = useAppStore((s) => s.mathProgress);
  const codeProgress = useAppStore((s) => s.codeProgress);
  const gardenDecorations = useAppStore((s) => s.gardenDecorations);

  const greeting = getGreeting();
  const quoteIndex = new Date().getDate() % dailyQuotes.length;
  const todayMood = todayCheckedIn && moodHistory.length > 0 ? moodHistory[0] : null;

  const mathDone = mathProgress.filter((p) => p.stage === 'flower').length;
  const mathTotal = mathProgress.length || 6; // fallback to 6 total concepts
  const codeDone = codeProgress.filter((p) => p.stage === 'create').length;
  const codeTotal = codeProgress.length || 6;

  return (
    <div className="page-transition px-4 pt-6 pb-6 space-y-5">
      {/* ===== 问候区 ===== */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <p className="text-earth-400 text-sm">
            {greeting.emoji} {greeting.text}
          </p>
          <h1 className="text-2xl font-bold text-earth-800 mt-1">
            {userName || '小星星'}
            <span className="text-earth-400 text-lg font-normal ml-2">
              今天也辛苦了
            </span>
          </h1>
        </div>
        <div className="text-4xl">{userAvatar || '⭐'}</div>
      </motion.div>

      {/* ===== 连续签到 & 情绪快照（双卡片） ===== */}
      <div className="grid grid-cols-2 gap-3">
        {/* 签到卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card-warm flex flex-col items-center justify-center gap-1 py-4"
        >
          <span className="text-3xl">
            {streak >= 7 ? '🔥' : streak >= 3 ? '✨' : '🌟'}
          </span>
          <p className="text-2xl font-bold text-earth-700">{streak}</p>
          <p className="text-xs text-earth-400">天连续签到</p>
        </motion.div>

        {/* 今日情绪 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/mood')}
          className={`card-warm flex flex-col items-center justify-center gap-1 py-4 cursor-pointer ${
            todayCheckedIn
              ? 'border-calm-gold/30'
              : 'border-dashed border-earth-300'
          }`}
        >
          {todayMood ? (
            <>
              <span className="text-3xl">{todayMood.emoji}</span>
              <p className="text-xs font-medium text-earth-500">今日已记录</p>
              <p className="text-[10px] text-earth-400">
                强度 {todayMood.intensity}/5
              </p>
            </>
          ) : (
            <>
              <span className="text-3xl opacity-50">🌤️</span>
              <p className="text-xs text-earth-400">今天还没记录</p>
              <p className="text-[10px] text-calm-gold">点击签到 →</p>
            </>
          )}
        </motion.div>
      </div>

      {/* ===== 学习概览 ===== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card-warm space-y-4"
      >
        <h3 className="text-sm font-semibold text-earth-600">🌱 花园近况</h3>

        {/* 数学进度 */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-earth-500">🌻 数学花园</span>
            <span className="text-earth-400">
              {mathDone}/{mathTotal} 开花
            </span>
          </div>
          <div className="h-2 bg-earth-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${mathTotal > 0 ? (mathDone / mathTotal) * 100 : 0}%` }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-calm-green to-calm-gold rounded-full"
            />
          </div>
        </div>

        {/* 代码进度 */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-earth-500">💫 代码星火</span>
            <span className="text-earth-400">
              {codeDone}/{codeTotal} 完成
            </span>
          </div>
          <div className="h-2 bg-earth-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${codeTotal > 0 ? (codeDone / codeTotal) * 100 : 0}%` }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-calm-purple to-calm-pink rounded-full"
            />
          </div>
        </div>

        {/* 花园装饰品 */}
        {gardenDecorations.length > 0 && (
          <div className="pt-2 border-t border-earth-100">
            <p className="text-xs text-earth-400 mb-2">收集的装饰品</p>
            <div className="flex gap-1 flex-wrap">
              {gardenDecorations.slice(-6).map((d, i) => (
                <span
                  key={i}
                  className="text-lg bg-earth-100/50 rounded-lg px-1 py-0.5"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* ===== 快捷入口 ===== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-3"
      >
        {quickActions.map((action, i) => (
          <button
            key={action.path}
            onClick={() => navigate(action.path)}
            className="card-warm text-left p-4 hover:bg-earth-50/80 transition-colors cursor-pointer"
          >
            <span className="text-2xl mb-2 block">{action.icon}</span>
            <p className="text-sm font-medium text-earth-700">{action.label}</p>
            <p className="text-xs text-earth-400 mt-0.5">{action.desc}</p>
          </button>
        ))}
      </motion.div>

      {/* ===== 今日心语 ===== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="card-warm bg-gradient-to-br from-calm-gold/5 to-calm-pink/5 text-center"
      >
        <p className="text-earth-400 text-xs mb-1">今日心语</p>
        <p className="text-earth-600 italic leading-relaxed text-sm">
          「{dailyQuotes[quoteIndex]}」
        </p>
      </motion.div>
    </div>
  );
}
