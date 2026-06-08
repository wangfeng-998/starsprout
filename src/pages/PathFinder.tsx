import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';

interface InterestCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  color: string;
  scenario: string;
}

const interestCards: InterestCard[] = [
  {
    id: 'data-science',
    title: '数据科学',
    description: '从数字中发现故事和规律。你学到的数学会成为你的超能力！',
    icon: '📊',
    category: '科技',
    color: '#7ba7c9',
    scenario: '你可能会帮环保组织分析气候数据，或者帮游戏公司理解玩家的喜好...',
  },
  {
    id: 'ui-ux',
    title: 'UI / UX 设计',
    description: '让应用变得好看又好用。如果你喜欢温暖的颜色和舒服的交互...',
    icon: '🎨',
    category: '设计',
    color: '#d4c5e2',
    scenario: '你设计的页面会被成千上万的人看到、触摸、使用。每一处细节都出自你手...',
  },
  {
    id: 'ai-ml',
    title: '人工智能',
    description: '教计算机学习。就像教一个新朋友慢慢理解这个世界',
    icon: '🤖',
    category: '科技',
    color: '#b8d8ba',
    scenario: '你训练的模型可能帮医生更快发现疾病，或者让盲人"看见"眼前的画面...',
  },
  {
    id: 'ed-tech',
    title: '教育科技',
    description: '把知识变得有趣。帮更多像你一样的人找到学习的乐趣',
    icon: '📚',
    category: '教育',
    color: '#fad4c0',
    scenario: '你设计的工具让成千上万害怕数学的学生第一次感受到"我也可以"...',
  },
  {
    id: 'creative-coding',
    title: '创意编程',
    description: '用代码画画、做音乐、生成艺术作品。代码是你的画笔',
    icon: '🎵',
    category: '艺术',
    color: '#f4c2c2',
    scenario: '你写的代码生成音乐、动画和交互艺术，在美术馆里展出...',
  },
  {
    id: 'mental-health-tech',
    title: '心理健康科技',
    description: '用科技帮助和你经历相似的人。你懂得那种感受',
    icon: '💚',
    category: '健康',
    color: '#8fbc8f',
    scenario: '你开发的 App 成为深夜失眠者的慰藉，帮无数人渡过难关...',
  },
  {
    id: 'game-dev',
    title: '游戏开发',
    description: '创造让人沉浸的世界。你定规则，你编故事，你给玩家带来快乐',
    icon: '🎮',
    category: '娱乐',
    color: '#f7e8a0',
    scenario: '你创造的世界里有冒险、有友情、有你设计的每一片森林和每一次日落...',
  },
  {
    id: 'environmental-tech',
    title: '环保科技',
    description: '用代码守护地球。让数据帮助大自然',
    icon: '🌍',
    category: '公益',
    color: '#b5d8e8',
    scenario: '你的算法优化城市公交路线，减少碳排放；你的传感器网络监测森林火情...',
  },
  {
    id: 'cybersecurity',
    title: '网络安全',
    description: '像数字世界的守护者——保护信息不被坏人窃取',
    icon: '🛡️',
    category: '科技',
    color: '#c4c8e8',
    scenario: '你发现了一个银行系统的漏洞并及时修复，保护了数百万人的财产安全...',
  },
  {
    id: 'robotics',
    title: '机器人',
    description: '把代码注入机器，让它们动起来、感知世界、甚至帮助人类',
    icon: '🦾',
    category: '科技',
    color: '#d0d0d0',
    scenario: '你设计的机械臂准确地完成精密手术，或者你的救援机器人在废墟中找到了幸存者...',
  },
  {
    id: 'biomedical',
    title: '生物医学工程',
    description: '用工程技术解决健康问题——假肢、影像、新药研发',
    icon: '🔬',
    category: '健康',
    color: '#c4e8d0',
    scenario: '你改良的假肢让失去双腿的人重新奔跑——科技直接改变生命的质量...',
  },
  {
    id: 'urban-planning',
    title: '智慧城市',
    description: '设计更宜居的城市——把传感器、数据和建筑结合起来',
    icon: '🏙️',
    category: '设计',
    color: '#e8d8c4',
    scenario: '你设计的智能交通系统让一个城市的拥堵减少了40%，空气也变好了...',
  },
  {
    id: 'content-creation',
    title: '内容创作',
    description: '写文章、拍视频、做播客——用你的声音影响世界',
    icon: '🎬',
    category: '艺术',
    color: '#e0c4e8',
    scenario: '你的视频帮助成千上万人理解了复杂的科技概念，你的播客成为很多人的睡前陪伴...',
  },
  {
    id: 'psychology-tech',
    title: '心理科技',
    description: '结合心理学和技术，设计能真正帮到人的产品',
    icon: '🧠',
    category: '健康',
    color: '#c4e0e8',
    scenario: '你和心理学家一起设计了一个App，让CBT疗法触手可及，帮无数人走出抑郁...',
  },
  {
    id: 'web3-blockchain',
    title: 'Web3 / 区块链',
    description: '探索下一代互联网——去中心化、数字身份和新型协作方式',
    icon: '⛓️',
    category: '科技',
    color: '#f0e0c4',
    scenario: '你设计的去中心化平台让创作者直接获得收入，不再被中间商抽成...',
  },
];

const puzzleQuestions = [
  {
    question: '看到一个乱糟糟的衣柜，你会？',
    options: [
      { text: '按颜色分类整理', trait: '秩序感' },
      { text: '设计一个新收纳系统', trait: '创造力' },
      { text: '先整理一部分，累了就歇', trait: '务实' },
    ],
  },
  {
    question: '学习新东西时，你更喜欢？',
    options: [
      { text: '看图片和视频', trait: '视觉型' },
      { text: '听别人讲解', trait: '听觉型' },
      { text: '自己动手试', trait: '实践型' },
    ],
  },
  {
    question: '周末早上醒来，你第一个想法是？',
    options: [
      { text: '今天想做点什么', trait: '目标导向' },
      { text: '就躺着，享受安静', trait: '内省型' },
      { text: '看看朋友们在干嘛', trait: '社交型' },
    ],
  },
  {
    question: '面对一个从未用过的新软件，你会？',
    options: [
      { text: '先点遍所有按钮，探索一下', trait: '实践型' },
      { text: '先找教程视频看一遍', trait: '视觉型' },
      { text: '先想想它背后的逻辑', trait: '秩序感' },
    ],
  },
  {
    question: '在小组项目中，你通常？',
    options: [
      { text: '主动规划分工和时间线', trait: '目标导向' },
      { text: '提出创新的点子', trait: '创造力' },
      { text: '关注每个人的感受和参与', trait: '社交型' },
    ],
  },
  {
    question: '如果一天完全自由，你会？',
    options: [
      { text: '学一个新技能或研究一个话题', trait: '内省型' },
      { text: '动手做点什么（画画/手工/编程）', trait: '实践型' },
      { text: '计划未来想做的事', trait: '目标导向' },
    ],
  },
];

export default function PathFinder() {
  const { likedInterests, addLikedInterest, removeLikedInterest, abilityPuzzleCompleted, puzzleTrait, completeAbilityPuzzle, setPuzzleTrait } =
    useAppStore();

  const [currentCard, setCurrentCard] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
    null
  );
  const [showScenario, setShowScenario] = useState<string | null>(null);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [puzzleStep, setPuzzleStep] = useState(0);
  const [puzzleAnswers, setPuzzleAnswers] = useState<string[]>([]);
  const [puzzleResult, setPuzzleResult] = useState<string | null>(null);

  const handleSwipe = (direction: 'left' | 'right') => {
    const card = interestCards[currentCard];
    setSwipeDirection(direction);
    if (direction === 'right') {
      addLikedInterest(card.id);
    }
    setTimeout(() => {
      if (currentCard < interestCards.length - 1) {
        setCurrentCard(currentCard + 1);
      }
      setSwipeDirection(null);
    }, 300);
  };

  const handlePuzzleAnswer = (trait: string) => {
    const newAnswers = [...puzzleAnswers, trait];
    setPuzzleAnswers(newAnswers);

    if (puzzleStep < puzzleQuestions.length - 1) {
      setPuzzleStep(puzzleStep + 1);
    } else {
      // Analyze results
      const traitCounts: Record<string, number> = {};
      newAnswers.forEach((t) => {
        traitCounts[t] = (traitCounts[t] || 0) + 1;
      });
      const topTrait = Object.entries(traitCounts).sort((a, b) => b[1] - a[1])[0][0];

      const traitInsights: Record<string, string> = {
        '秩序感': '你喜欢有条理的工作方式，数据科学或后端开发可能特别适合你。',
        '创造力': '你的想象力是宝藏——UI设计、创意编程、游戏开发都在等你！',
        '务实': '你脚踏实地，教育科技或环保科技需要你这样能一步步把事情做好的人。',
        '视觉型': '你喜欢通过视觉获取信息，前端开发和数据可视化会让你如鱼得水。',
        '听觉型': '你对声音敏感，播客技术、音频处理或音乐编程可能会点燃你的热情。',
        '实践型': '你不喜欢空谈，"做中学"是你最好的方式。交互式编程和原型设计特别适合你。',
        '目标导向': '你有内在驱动力，适合需要独立规划和推动的项目。',
        '内省型': '你善于思考，人工智能和算法设计需要你这种深度思考的习惯。',
        '社交型': '你关心他人，心理健康科技或教育科技让你把这种关心变成力量。',
      };

      setPuzzleResult(topTrait);
      setPuzzleTrait(topTrait);
      completeAbilityPuzzle();
    }
  };

  const isDone = currentCard >= interestCards.length;

  return (
    <motion.div
      className="max-w-lg mx-auto px-5 pt-8 pb-4 page-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-earth-700 mb-1">
          方向探索 🧭
        </h1>
        <p className="text-sm text-earth-400">
          不知道该往哪走？我们来慢慢探索
        </p>
      </div>

      {/* Interest Cards (Swipe) */}
      <div className="card-warm mb-4">
        <h2 className="text-sm font-semibold text-earth-600 mb-3">
          兴趣探索卡
          {likedInterests.length > 0 && (
            <span className="text-calm-gold ml-1">
              · 已收藏 {likedInterests.length} 个
            </span>
          )}
        </h2>
        <p className="text-xs text-earth-400 mb-4">
          左滑 ="不太感兴趣"，右滑 ="有意思！"
        </p>

        {isDone ? (
          <div className="text-center py-8">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-3"
            >
              🌟
            </motion.div>
            <p className="text-earth-600 font-medium mb-1">探索完成！</p>
            <p className="text-sm text-earth-400 mb-3">
              {likedInterests.length === 0
                ? '暂时没有心动的方向，没关系——会遇到的'
                : `你标注了 ${likedInterests.length} 个感兴趣的方向`}
            </p>
            {likedInterests.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-earth-500 mb-2">你的兴趣分布：</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {(() => {
                    const cats = interestCards
                      .filter((c) => likedInterests.includes(c.id))
                      .reduce<Record<string, number>>((acc, c) => {
                        acc[c.category] = (acc[c.category] || 0) + 1;
                        return acc;
                      }, {});
                    return Object.entries(cats)
                      .sort((a, b) => b[1] - a[1])
                      .map(([cat, count]) => (
                        <span
                          key={cat}
                          className="text-xs px-2 py-0.5 rounded-full bg-calm-gold/10 text-calm-gold"
                        >
                          {cat} ×{count}
                        </span>
                      ));
                  })()}
                </div>
              </div>
            )}
            <button
              onClick={() => setCurrentCard(0)}
              className="btn-ghost text-sm text-calm-gold"
            >
              再来一轮 🔄
            </button>
          </div>
        ) : (
          <div className="relative">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={interestCards[currentCard].id}
                initial={
                  swipeDirection === null
                    ? { opacity: 0, scale: 0.9 }
                    : { opacity: 0 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  x: swipeDirection === 'right' ? 200 : -200,
                  opacity: 0,
                  rotate: swipeDirection === 'right' ? 10 : -10,
                  transition: { duration: 0.3 },
                }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-earth-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{
                      backgroundColor: `${interestCards[currentCard].color}25`,
                    }}
                  >
                    {interestCards[currentCard].icon}
                  </span>
                  <div>
                    <h3 className="font-semibold text-earth-700">
                      {interestCards[currentCard].title}
                    </h3>
                    <span className="text-xs text-earth-400">
                      {interestCards[currentCard].category}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-earth-600 leading-relaxed mb-3">
                  {interestCards[currentCard].description}
                </p>
                <button
                  onClick={() =>
                    setShowScenario(interestCards[currentCard].id)
                  }
                  className="text-xs text-calm-blue hover:underline"
                >
                  如果选择了这条路... →
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Swipe buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSwipe('left')}
                className="w-14 h-14 rounded-full bg-earth-100 flex items-center justify-center text-2xl hover:bg-earth-200/70 transition-colors"
              >
                👈
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSwipe('right')}
                className="w-14 h-14 rounded-full bg-calm-gold/15 flex items-center justify-center text-2xl hover:bg-calm-gold/25 transition-colors"
              >
                👉
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Scenario Modal */}
      <AnimatePresence>
        {showScenario && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-earth-900/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowScenario(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card-warm max-w-sm w-full text-center"
            >
              <span className="text-4xl mb-3 block">🔮</span>
              <p className="text-sm text-earth-600 leading-relaxed mb-4">
                {
                  interestCards.find((c) => c.id === showScenario)
                    ?.scenario
                }
              </p>
              <button
                onClick={() => setShowScenario(null)}
                className="btn-ghost text-sm text-earth-400"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ability Puzzle */}
      <div className="card-warm mb-4">
        <h2 className="text-sm font-semibold text-earth-600 mb-3">
          能力拼图 🧩
        </h2>

        {!abilityPuzzleCompleted && !showPuzzle ? (
          <div className="text-center">
            <p className="text-xs text-earth-400 mb-3">
              通过几个轻松的问题，帮你发现自己的思维偏好（不是考试！）
            </p>
            <button
              onClick={() => setShowPuzzle(true)}
              className="btn-primary text-sm"
            >
              开始拼图 ⭐
            </button>
          </div>
        ) : showPuzzle && !puzzleResult ? (
          <motion.div
            key={puzzleStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-xs text-earth-400 mb-1">
              问题 {puzzleStep + 1}/{puzzleQuestions.length}
            </p>
            <p className="text-sm font-medium text-earth-700 mb-3">
              {puzzleQuestions[puzzleStep].question}
            </p>
            {puzzleQuestions[puzzleStep].options.map((opt, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.97 }}
                onClick={() => handlePuzzleAnswer(opt.trait)}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm bg-earth-100/40 text-earth-600 hover:bg-earth-100 mb-2 transition-colors"
              >
                {opt.text}
              </motion.button>
            ))}
          </motion.div>
        ) : puzzleResult ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <span className="text-4xl mb-2 block">💡</span>
            <p className="text-sm text-earth-600 leading-relaxed mb-3">
              {puzzleResult === '秩序感'
                ? '你喜欢有条理的工作方式，数据科学或后端开发可能特别适合你。'
                : puzzleResult === '创造力'
                ? '你的想象力是宝藏——UI设计、创意编程、游戏开发都在等你！'
                : puzzleResult === '务实'
                ? '你脚踏实地，教育科技或环保科技需要你这样能一步步把事情做好的人。'
                : puzzleResult === '视觉型'
                ? '你喜欢通过视觉获取信息，前端开发和数据可视化会让你如鱼得水。'
                : puzzleResult === '实践型'
                ? '你不喜欢空谈，"做中学"是你最好的方式。交互式编程和原型设计特别适合你。'
                : '你的思维偏好很独特——这意味着你有能力在不同领域找到自己的位置 🌱'}
            </p>
            <button
              onClick={() => {
                setShowPuzzle(false);
                setPuzzleStep(0);
                setPuzzleAnswers([]);
                setPuzzleResult(null);
              }}
              className="btn-ghost text-xs text-earth-400"
            >
              重新探索
            </button>
          </motion.div>
        ) : (
          <div className="text-center py-2">
            <span className="text-2xl">✅</span>
            <p className="text-xs text-earth-400 mt-1">
              {puzzleTrait
                ? `已完成能力拼图 · 特质：${puzzleTrait}`
                : '已完成能力拼图'}
            </p>
            <button
              onClick={() => {
                setShowPuzzle(true);
                setPuzzleStep(0);
                setPuzzleAnswers([]);
                setPuzzleResult(null);
              }}
              className="btn-ghost text-xs text-calm-gold mt-1"
            >
              重新探索
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
