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
    id: 'determinant-intro',
    title: '行列式的秘密',
    description: '一个数字，藏着矩阵的"缩放因子"，像花园的放大镜...',
    category: 'linear',
    difficulty: 2,
    icon: '🔍',
    color: '#e8c4c4',
  },
  {
    id: 'matrix-multiply',
    title: '矩阵的"握手"',
    description: '两个矩阵相乘就像两群人互相握手——每个人都有搭档...',
    category: 'linear',
    difficulty: 2,
    icon: '🤝',
    color: '#c4c8e8',
  },
  {
    id: 'linear-transform',
    title: '空间的变形',
    description: '线性变换像一面哈哈镜——拉伸、旋转、翻转整个空间...',
    category: 'linear',
    difficulty: 3,
    icon: '🌀',
    color: '#c4e8d0',
  },
  {
    id: 'eigenvalue-intro',
    title: '特征值与特征向量',
    description: '有些特殊的方向，变换后只是被拉长或缩短，方向不变...',
    category: 'linear',
    difficulty: 3,
    icon: '🎯',
    color: '#e8d0c4',
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
    id: 'continuity',
    title: '连续是什么？',
    description: '如果你可以不抬笔画出函数的图像，它就是连续的...',
    category: 'calculus',
    difficulty: 1,
    icon: '✏️',
    color: '#d0e8c4',
  },
  {
    id: 'derivative-intro',
    title: '变化的速度',
    description: '导数告诉你每一刻事物在如何变化——就像速度表...',
    category: 'calculus',
    difficulty: 2,
    icon: '🏃',
    color: '#fad4c0',
  },
  {
    id: 'optimization',
    title: '找最优解',
    description: '用导数找到最大值和最小值——山坡的最高点和最低谷...',
    category: 'calculus',
    difficulty: 2,
    icon: '⛰️',
    color: '#c4e8e0',
  },
  {
    id: 'fundamental-theorem',
    title: '微积分基本定理',
    description: '微分和积分是一对相反的操作，像走路与倒带...',
    category: 'calculus',
    difficulty: 2,
    icon: '🔗',
    color: '#c4d0e8',
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
  {
    id: 'partial-derivative',
    title: '偏导数',
    description: '当事情不止一个因素在变化时，我们一次只看一个...',
    category: 'calculus',
    difficulty: 3,
    icon: '🎛️',
    color: '#e8c4d0',
  },
  {
    id: 'taylor-series',
    title: '泰勒展开',
    description: '用简单的多项式去近似复杂的函数，像用方形积木拼圆...',
    category: 'calculus',
    difficulty: 3,
    icon: '🪜',
    color: '#d0c4e8',
  },
  {
    id: 'matrix-rank',
    title: '矩阵的秩',
    description: '"秩"告诉你矩阵里有几行是"真正独立"的——像花园里不同颜色的花...',
    category: 'linear',
    difficulty: 2,
    icon: '📊',
    color: '#c4d8e8',
  },
  {
    id: 'inverse-matrix',
    title: '矩阵的逆',
    description: '就像数字的倒数，矩阵也有"逆"——A乘A逆等于单位矩阵...',
    category: 'linear',
    difficulty: 3,
    icon: '🔄',
    color: '#e8d4c4',
  },
  {
    id: 'orthogonal',
    title: '正交的魔法',
    description: '两个向量垂直时，它们"互不干扰"——像X轴和Y轴的关系...',
    category: 'linear',
    difficulty: 2,
    icon: '📐',
    color: '#d4e8c4',
  },
  {
    id: 'linear-independence',
    title: '线性相关与无关',
    description: '有些向量能用其他向量"拼出来"——像用已有的颜料调出新颜色...',
    category: 'linear',
    difficulty: 3,
    icon: '🧬',
    color: '#c4c4e8',
  },
  {
    id: 'chain-rule',
    title: '链式法则',
    description: '复合函数求导就像剥洋葱——一层一层往外剥...',
    category: 'calculus',
    difficulty: 2,
    icon: '⛓️',
    color: '#e8c4e0',
  },
  {
    id: 'implicit-diff',
    title: '隐函数求导',
    description: '当方程不能解出y时，我们偷偷对两边同时求导...',
    category: 'calculus',
    difficulty: 3,
    icon: '🕵️',
    color: '#c4e0e8',
  },
  {
    id: 'definite-integral',
    title: '定积分',
    description: '不定积分给出函数族，定积分给出具体的数——曲边梯形的面积...',
    category: 'calculus',
    difficulty: 2,
    icon: '📏',
    color: '#e0e8c4',
  },
  {
    id: 'mean-value-theorem',
    title: '中值定理',
    description: '在某处，瞬时速度一定等于平均速度——正如旅行中总有一个时刻刚刚好...',
    category: 'calculus',
    difficulty: 1,
    icon: '⏱️',
    color: '#c4e8d4',
  },
  {
    id: 'diff-equation-intro',
    title: '微分方程入门',
    description: '用方程描述变化本身——"增长的速度和当前数量成正比"...',
    category: 'calculus',
    difficulty: 3,
    icon: '📈',
    color: '#e0c4e8',
  },
  {
    id: 'series-convergence',
    title: '级数收敛',
    description: '无限多项加起来，能得到一个有限的数吗？1/2+1/4+1/8+...=1！',
    category: 'calculus',
    difficulty: 3,
    icon: '♾️',
    color: '#c4e8c8',
  },
  {
    id: 'gram-schmidt',
    title: '正交化神器',
    description: '格拉姆-施密特：把一组歪斜的向量"扶正"，变成互相垂直的好基友...',
    category: 'linear',
    difficulty: 3,
    icon: '🧹',
    color: '#e8c4c4',
  },
  {
    id: 'least-squares',
    title: '最小二乘法',
    description: '找一条"最不冤枉"的直线穿过所有散点——误差的平方和最小...',
    category: 'linear',
    difficulty: 2,
    icon: '📉',
    color: '#c4e8d8',
  },
  {
    id: 'lhopital-rule',
    title: '洛必达法则',
    description: '遇到 0/0 或 ∞/∞ 的极限不用慌——上下同时求导就好...',
    category: 'calculus',
    difficulty: 2,
    icon: '🏥',
    color: '#d8c4e8',
  },
  {
    id: 'integration-by-parts',
    title: '分部积分法',
    description: '乘积的积分：把一部分微分，另一部分积分——就像拆积木重组...',
    category: 'calculus',
    difficulty: 3,
    icon: '🧱',
    color: '#e8d8c4',
  },
  {
    id: 'double-integral',
    title: '二重积分',
    description: '先沿一个方向扫一遍，再沿另一个方向扫——曲顶柱体的体积...',
    category: 'calculus',
    difficulty: 3,
    icon: '🏔️',
    color: '#c4d8e8',
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
  'determinant-intro': {
    question: '二阶行列式的值 = ad - bc。如果 ad = bc，行列式 = ?',
    options: ['1', '0', '-1', '2'],
    correct: 1,
    hint: 'ad - bc，当 ad 等于 bc 时，结果是多少？',
  },
  'matrix-multiply': {
    question: '两个 2×2 矩阵相乘，结果是什么大小？',
    options: ['1×1', '2×2', '4×4', '2×1'],
    correct: 1,
    hint: '矩阵乘法：m×n 乘 n×p = m×p。2×2 乘 2×2 = ?',
  },
  'linear-transform': {
    question: '线性变换不会做以下哪件事？',
    options: ['旋转', '拉伸', '弯曲直线', '镜像翻转'],
    correct: 2,
    hint: '"线性"意味着直线变换后还是直线...',
  },
  'eigenvalue-intro': {
    question: '特征向量在变换后会发生什么？',
    options: ['方向改变', '只在原方向上伸缩', '消失', '变成零向量'],
    correct: 1,
    hint: '"特征"意思是"保持不变的特征"——什么保持不变？',
  },
  'limit-intro': {
    question: '"极限"描述的是什么？',
    options: ['最大值', '无限接近某个值的趋势', '最小值', '平均值'],
    correct: 1,
    hint: '不是到达，而是"越来越靠近"...',
  },
  'continuity': {
    question: '下列哪个函数在 x=0 处不连续？',
    options: ['y = x²', 'y = 1/x', 'y = sin(x)', 'y = x+1'],
    correct: 1,
    hint: '哪个函数在 x=0 处"断开"了？（分母为0）',
  },
  'derivative-intro': {
    question: '导数告诉我们什么？',
    options: ['总数', '变化的快慢', '起点和终点', '中间值'],
    correct: 1,
    hint: '如果你在开车，导数是你的速度表。',
  },
  'optimization': {
    question: '要找函数的最大值，应该令什么等于0？',
    options: ['函数本身', '导数（斜率）', '二阶导数', '积分'],
    correct: 1,
    hint: '山顶和山谷的共同点是什么？——坡度为0！',
  },
  'fundamental-theorem': {
    question: '微分和积分是什么关系？',
    options: ['完全无关', '互为逆运算', '完全相同', '积分是微分的2倍'],
    correct: 1,
    hint: '就像加法和减法、乘法和除法一样...',
  },
  'integral-intro': {
    question: '积分和什么最像？',
    options: ['计算速度', '把碎片拼成整体', '测量角度', '找最大值'],
    correct: 1,
    hint: '就像把下雨的每一滴水收集起来，看总共有多少水...',
  },
  'partial-derivative': {
    question: '偏导数一次只对几个变量求导？',
    options: ['所有变量', '一个变量', '两个变量', '零个'],
    correct: 1,
    hint: '"偏"意味着只关注一部分——其他变量暂时当做常数。',
  },
  'taylor-series': {
    question: '泰勒展开用什么来近似函数？',
    options: ['三角函数', '多项式', '指数函数', '对数'],
    correct: 1,
    hint: 'x + x²/2 + x³/6 + ... 这是用什么在逼近？',
  },
  'matrix-rank': {
    question: '矩阵的秩等于什么？',
    options: ['行数', '列数', '线性无关的行/列数', '所有元素之和'],
    correct: 2,
    hint: '秩衡量的是矩阵中"真正独立"的信息量——有多少行/列不能互相表示。',
  },
  'inverse-matrix': {
    question: '矩阵A可逆的充要条件是什么？',
    options: ['A是方阵', '行列式不为0', 'A是对称阵', 'A全是1'],
    correct: 1,
    hint: '如果矩阵能把空间压缩到更低维度，就回不去了——行列式=0则不可逆。',
  },
  'orthogonal': {
    question: '两个向量正交意味着什么？',
    options: ['它们相等', '它们的内积为0', '它们方向相同', '它们平行'],
    correct: 1,
    hint: '正交=垂直。两个垂直向量的"投影"为零——内积为零。',
  },
  'linear-independence': {
    question: '以下哪组向量线性相关？',
    options: ['(1,0) 和 (0,1)', '(1,2) 和 (2,4)', '(1,0) 和 (0,2)', '(1,1) 和 (1,-1)'],
    correct: 1,
    hint: '(2,4) = 2×(1,2)——一个向量是另一个的倍数，所以线性相关。',
  },
  'chain-rule': {
    question: '链式法则用于求什么？',
    options: ['简单函数的导数', '复合函数的导数', '函数的积分', '极限'],
    correct: 1,
    hint: '复合函数 f(g(x)) 求导 = f\'(g(x)) × g\'(x)——"外层导数乘内层导数"。',
  },
  'implicit-diff': {
    question: '隐函数求导的核心技巧是什么？',
    options: ['先把y解出来', '对等式两边同时求导,把y当x的函数', '用积分', '猜答案'],
    correct: 1,
    hint: '不需要解出y=f(x)——直接把等式两边对x求导，记住y是x的函数！',
  },
  'definite-integral': {
    question: '定积分 ∫ₐᵇ f(x)dx 的几何意义是？',
    options: ['切线斜率', '曲边梯形的面积', '函数最大值', '函数零点'],
    correct: 1,
    hint: '把[a,b]区间切成无数小条，每一条的面积加起来就是定积分。',
  },
  'mean-value-theorem': {
    question: '中值定理保证什么？',
    options: ['函数有最大值', '存在一点,切线斜率=割线斜率', '导数恒为0', '函数可积'],
    correct: 1,
    hint: '从北京开车到上海，中间一定有个时刻你的瞬时速度等于全程平均速度。',
  },
  'diff-equation-intro': {
    question: '以下哪个是微分方程？',
    options: ['x²+1=0', 'dy/dx=y', 'y=2x+1', 'a²+b²=c²'],
    correct: 1,
    hint: '微分方程是包含导数的方程——出现dy/dx或y\'的才是。',
  },
  'series-convergence': {
    question: '级数 1/2 + 1/4 + 1/8 + ... 的和是多少？',
    options: ['无穷大', '2', '1', '0.5'],
    correct: 2,
    hint: '等比数列求和：首项/(1-公比) = 0.5/(1-0.5) = 1。',
  },
  'gram-schmidt': {
    question: 'Gram-Schmidt 正交化的目的是什么？',
    options: ['求行列式', '把一组向量变成正交向量', '求特征值', '计算矩阵的逆'],
    correct: 1,
    hint: '"正交化"就是把歪的"扶正"——让向量两两垂直，互不干扰。',
  },
  'least-squares': {
    question: '最小二乘法中"最小"的是什么？',
    options: ['x的值', 'y的值', '误差的平方和', '数据点的数量'],
    correct: 2,
    hint: '我们想让直线尽量"贴近"所有散点——每条线都有一个总误差，选误差最小的那条。',
  },
  'lhopital-rule': {
    question: '洛必达法则适用于哪种极限？',
    options: ['∞-∞', '0/0 或 ∞/∞', '0·∞', '1^∞'],
    correct: 1,
    hint: '当分子分母同时趋近于0或无穷大时，可以分别对分子分母求导再取极限。',
  },
  'integration-by-parts': {
    question: '分部积分法的公式是？',
    options: ['∫udv = uv + ∫vdu', '∫udv = uv - ∫vdu', '∫udv = u²/2', '∫udv = uv×2'],
    correct: 1,
    hint: '和乘积求导法则反过来——(uv)\' = u\'v + uv\' → uv\' = (uv)\' - u\'v → ∫udv = uv - ∫vdu。',
  },
  'double-integral': {
    question: '二重积分 ∬ f(x,y)dxdy 的几何意义？',
    options: ['曲线长度', '曲面下的体积', '切平面斜率', '边界周长'],
    correct: 1,
    hint: '一重积分得面积（二维），二重积分求体积（三维）——曲顶柱体。',
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

  // 过滤难易度
  const [filterDifficulty, setFilterDifficulty] = useState<number | null>(null);
  const visibleConcepts = filterDifficulty
    ? concepts.filter((c) => c.difficulty === filterDifficulty)
    : concepts;

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

      {/* 难度筛选 */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-earth-500">
          种子库（{concepts.length} 颗）
        </h2>
        <div className="flex gap-1">
          {[null, 1, 2, 3].map((d) => (
            <button
              key={String(d)}
              onClick={() => setFilterDifficulty(d)}
              className={`text-xs px-2 py-1 rounded-lg transition-all ${
                filterDifficulty === d
                  ? 'bg-calm-gold/20 text-calm-gold font-medium'
                  : 'text-earth-400 hover:bg-earth-100'
              }`}
            >
              {d === null ? '全部' : `${'⭐'.repeat(d)}`}
            </button>
          ))}
        </div>
      </div>

      {/* Concept Seeds */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {visibleConcepts.map((concept) => {
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
                <span className="text-xs ml-auto">
                  {'⭐'.repeat(concept.difficulty)}
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
