import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, MathProgress } from '../store';

interface Concept {
  id: string;
  title: string;
  description: string;
  category: 'linear' | 'calculus';
  difficulty: 1 | 2 | 3;
  icon: string;
  color: string;
}

const concepts: Concept[] = [
  {
    id: 'vector-intro',
    title: '什么是向量？',
    description: '向量就像有方向的箭头，指向你想去的地方...',
    category: 'linear',
    difficulty: 1,
    icon: '🏹',
    color: '#f4c2c2',
  },
  {
    id: 'vector-add',
    title: '向量的加法',
    description: '两条路合在一起，就像把两个箭头首尾相接...',
    category: 'linear',
    difficulty: 1,
    icon: '➕',
    color: '#d4c5e2',
  },
  {
    id: 'matrix-intro',
    title: '矩阵初识',
    description: '矩阵是数字排列成的方阵，像一个整齐的花圃...',
    category: 'linear',
    difficulty: 2,
    icon: '🔲',
    color: '#b8d8ba',
  },
  {
    id: 'limit-intro',
    title: '极限的感觉',
    description: '无限靠近却不触碰，就像靠近河岸看自己的倒影...',
    category: 'calculus',
    difficulty: 1,
    icon: '🌊',
    color: '#b5d8e8',
  },
  {
    id: 'derivative-intro',
    title: '变化的速度',
    description: '导数告诉你每一刻事物在如何变化...',
    category: 'calculus',
    difficulty: 2,
    icon: '🏃',
    color: '#fad4c0',
  },
  {
    id: 'integral-intro',
    title: '积分的魔法',
    description: '把无数个小片段拼成完整的画面...',
    category: 'calculus',
    difficulty: 3,
    icon: '🧩',
    color: '#f7e8a0',
  },
];

const quizQuestions: Record<string, {
  question: string;
  options: string[];
  correct: number;
  hint: string;
}> = {
  'vector-intro': {
    question: '向量最像下面哪个东西？',
    options: ['一个数字', '一个有方向的箭头', '一个圆', '一条直线'],
    correct: 1,
    hint: '想想看，什么东西既有大小又有方向？',
  },
  'vector-add': {
    question: '两个向量相加，结果会怎样？',
    options: ['变得更短', '首尾相接形成新向量', '变成一个点', '消失'],
    correct: 1,
    hint: '想象你在走路——先走一条路，再走另一条路，最终你在哪里？',
  },
  'matrix-intro': {
    question: '一个 2×2 的矩阵有多少个数字？',
    options: ['2个', '3个', '4个', '6个'],
    correct: 2,
    hint: '2×2 = 行数 × 列数 = ?',
  },
  'limit-intro': {
    question: '"极限"描述的是什么？',
    options: ['最大值', '无限接近某个值的趋势', '最小值', '平均值'],
    correct: 1,
    hint: '不是到达，而是"越来越靠近"...',
  },
  'derivative-intro': {
    question: '导数告诉我们什么？',
    options: ['总数', '变化的快慢', '起点和终点', '中间值'],
    correct: 1,
    hint: '如果你在开车，导数是你的速度表。',
  },
  'integral-intro': {
    question: '积分和什么最像？',
    options: ['计算速度', '把碎片拼成整体', '测量角度', '找最大值'],
    correct: 1,
    hint: '就像把下雨的每一滴水收集起来，看总共有多少水...',
  },
};

export default function MathGarden() {
  const { mathProgress, gardenDecorations, updateMathProgress, addGardenDecoration } =
    useAppStore();
  const [activeConcept, setActiveConcept] = useState<string | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(
    null
  );

  const getConceptProgress = (id: string): MathProgress | undefined =>
    mathProgress.find((p) => p.conceptId === id);

  const stageToLabel: Record<string, { label: string; icon: string }> = {
    seed: { label: '种子', icon: '🌰' },
    sprout: { label: '发芽', icon: '🌱' },
    bud: { label: '花苞', icon: '🌷' },
    flower: { label: '开花', icon: '🌸' },
  };

  const handleAnswer = (idx: number) => {
    if (!activeConcept) return;
    setQuizAnswer(idx);
    const question = quizQuestions[activeConcept];
    if (question && idx === question.correct) {
      setQuizResult('correct');
      setTimeout(() => {
        const progress = getConceptProgress(activeConcept);
        const currentStage = progress?.stage || 'seed';
        const nextStage =
          currentStage === 'seed'
            ? 'sprout'
            : currentStage === 'sprout'
            ? 'bud'
            : 'flower';

        updateMathProgress({
          conceptId: activeConcept,
          stage: nextStage as MathProgress['stage'],
          attempts: (progress?.attempts || 0) + 1,
          completedAt: nextStage === 'flower' ? Date.now() : undefined,
        });

        if (nextStage === 'flower') {
          addGardenDecoration(
            ['🌷', '🌻', '🌺', '🦋', '🐝', '💐'][
              Math.floor(Math.random() * 6)
            ]
          );
        }

        setQuizResult(null);
        setQuizAnswer(null);
        setActiveConcept(null);
        setShowHint(false);
      }, 1500);
    } else {
      setQuizResult('incorrect');
      setTimeout(() => {
        setQuizResult(null);
        setQuizAnswer(null);
        setShowHint(true);
      }, 1200);
    }
  };

  return (
    <motion.div
      className="max-w-lg mx-auto px-5 pt-8 pb-4 page-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-earth-700 mb-1">数学花园 🌻</h1>
        <p className="text-sm text-earth-400">每学懂一个概念，你的花园就开一朵花</p>
      </div>

      {/* Garden View */}
      <div className="card-warm mb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">🏡</span>
          <div>
            <h2 className="text-sm font-semibold text-earth-600">你的花园</h2>
            <p className="text-xs text-earth-400">
              已种下 {mathProgress.length} 颗种子 ·{' '}
              {gardenDecorations.length} 朵花盛开
            </p>
          </div>
        </div>

        {/* Mini garden visualization */}
        <div className="bg-gradient-to-b from-calm-blue/10 to-calm-green/10 rounded-2xl p-4 min-h-[80px] flex items-center justify-center flex-wrap gap-1">
          {gardenDecorations.length === 0 ? (
            <p className="text-sm text-earth-400">一片等待播种的土壤...</p>
          ) : (
            gardenDecorations.map((d, i) => (
              <span
                key={i}
                className="text-xl animate-float"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {d}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Concept Seeds */}
      <h2 className="text-sm font-semibold text-earth-500 mb-3">
        今天的种子
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {concepts.map((concept) => {
          const progress = getConceptProgress(concept.id);
          const stage = progress?.stage || 'seed';
          const stageInfo = stageToLabel[stage];

          return (
            <motion.button
              key={concept.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveConcept(concept.id);
                setQuizAnswer(null);
                setShowHint(false);
                setQuizResult(null);
              }}
              className="card-warm text-left p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{concept.icon}</span>
                <span className="text-xs text-earth-400 italic">
                  {concept.category === 'linear' ? '线代' : '微积分'}
                </span>
              </div>
              <h3 className="text-sm font-medium text-earth-700 mb-1">
                {concept.title}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <span>{stageInfo.icon}</span>
                <span className="text-xs text-earth-400">{stageInfo.label}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {activeConcept && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-earth-900/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => {
              if (!quizResult) {
                setActiveConcept(null);
                setShowHint(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="card-warm max-w-sm w-full mx-4"
            >
              {quizResult ? (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`text-5xl mb-2 ${
                      quizResult === 'correct' ? 'text-calm-green' : 'text-calm-pink'
                    }`}
                  >
                    {quizResult === 'correct' ? '✨' : '💛'}
                  </motion.div>
                  <p className="text-lg font-semibold text-earth-700">
                    {quizResult === 'correct' ? '太棒了！' : '没关系，再试试！'}
                  </p>
                </div>
              ) : (
                <>
                  {/* Concept summary */}
                  <div className="mb-4 pb-4 border-b border-earth-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">
                        {concepts.find((c) => c.id === activeConcept)?.icon}
                      </span>
                      <h3 className="font-semibold text-earth-700">
                        {concepts.find((c) => c.id === activeConcept)?.title}
                      </h3>
                    </div>
                    <p className="text-sm text-earth-500">
                      {concepts.find((c) => c.id === activeConcept)?.description}
                    </p>
                  </div>

                  {/* Question */}
                  <p className="text-sm font-medium text-earth-600 mb-3">
                    {quizQuestions[activeConcept]?.question}
                  </p>

                  <div className="space-y-2 mb-3">
                    {quizQuestions[activeConcept]?.options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleAnswer(i)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${
                          quizAnswer === i
                            ? 'bg-calm-gold/20 text-calm-gold font-medium'
                            : 'bg-earth-100/40 text-earth-600 hover:bg-earth-100'
                        }`}
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>

                  {showHint && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-xs text-calm-blue bg-calm-blue/5 rounded-xl p-3"
                    >
                      💡 {quizQuestions[activeConcept]?.hint}
                    </motion.p>
                  )}

                  <button
                    onClick={() => {
                      setActiveConcept(null);
                      setShowHint(false);
                      setQuizAnswer(null);
                    }}
                    className="btn-ghost text-xs text-earth-400 w-full mt-2"
                  >
                    下次再来
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
