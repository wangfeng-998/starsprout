import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Spark {
  id: string;
  title: string;
  description: string;
  stage: 1 | 2 | 3;
  template: string;
  icon: string;
  tag: string;
  outputDescription: string;
}

const sparks: Spark[] = [
  {
    id: 'hello-star',
    title: '你好，星星',
    description: '让计算机对你说 "Hello, Star!" —— 你的第一行代码',
    stage: 1,
    template: 'print("Hello, Star!")',
    icon: '👋',
    tag: '入门',
    outputDescription: '屏幕上会出现一行文字：Hello, Star!',
  },
  {
    id: 'star-twinkle',
    title: '画一颗星星',
    description: '用代码画出你的第一颗星星',
    stage: 1,
    template: `for i in range(5):
    print("  " * (5 - i) + "* " * (i + 1))`,
    icon: '⭐',
    tag: '图形',
    outputDescription: `
    *
   * *
  * * *
 * * * *
* * * * *`,
  },
  {
    id: 'color-mood',
    title: '心情调色盘',
    description: '根据心情生成不同的颜色',
    stage: 2,
    template: `mood = "happy"  # 试试改成 sad, calm, excited

if mood == "happy":
    color = "🌻 金黄色"
elif mood == "sad":
    color = "🌧️ 蓝色"
elif mood == "calm":
    color = "🍃 绿色"
else:
    color = "🌈 彩虹色"

print("今天的颜色是:", color)`,
    icon: '🎨',
    tag: '条件',
    outputDescription: '根据你选择的心情，程序会返回对应的颜色',
  },
  {
    id: 'count-stars',
    title: '数星星',
    description: '让计算机帮你数数 —— 从 1 数到你的幸运数字',
    stage: 2,
    template: `lucky_number = 7  # 改成你的幸运数字!

for i in range(1, lucky_number + 1):
    print("🌟" * i)
    print(f"第 {i} 颗星星亮起来了...")

print(f"\\n一共 {lucky_number} 颗星星在空中闪烁 ✨")`,
    icon: '🔢',
    tag: '循环',
    outputDescription: '🌟\n🌟🌟\n🌟🌟🌟\n... 星星一颗一颗亮起来',
  },
  {
    id: 'garden-builder',
    title: '建造小花园',
    description: '用代码设计属于你的数学花园一角',
    stage: 3,
    template: `def create_garden(flowers):
    print("🏡 === 我的小花园 === 🏡")
    for flower in flowers:
        print(f"|  {flower}  |")
    print("=" * 14)

my_flowers = ["🌻", "🌷", "🌸", "🌺"]
create_garden(my_flowers)

# 试试添加更多花！
# my_flowers.append("🌼")`,
    icon: '🏗️',
    tag: '函数',
    outputDescription: '用代码自动生成一个整齐的小花园',
  },
  {
    id: 'mood-tracker',
    title: '心情记录器',
    description: '创建一个简单的心情追踪工具',
    stage: 3,
    template: `class MoodDiary:
    def __init__(self, name):
        self.name = name
        self.entries = []
    
    def add_entry(self, mood, note):
        self.entries.append({"mood": mood, "note": note})
        print(f"✅ 已记录: {mood} - {note}")
    
    def show_all(self):
        print(f"\\n📖 {self.name} 的心情日记:")
        for i, e in enumerate(self.entries, 1):
            print(f"  {i}. {e['mood']} {e['note']}")

# 使用你的日记
diary = MoodDiary("小星星")
diary.add_entry("😊", "今天阳光很好")
diary.add_entry("😌", "学会了写代码")
diary.show_all()`,
    icon: '📓',
    tag: '类',
    outputDescription: '创建一个属于自己的心情日记本，可以记录和查看心情',
  },
];

export default function CodeSparks() {
  const [activeSpark, setActiveSpark] = useState<Spark | null>(null);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const openSpark = (spark: Spark) => {
    setActiveSpark(spark);
    setUserCode(spark.template);
    setOutput('');
    setErrorMsg('');
  };

  const runCode = () => {
    setOutput('');
    setErrorMsg('');

    try {
      // Build a simulated output from the code
      const lines: string[] = [];

      // Parse and simulate execution
      if (userCode.includes('print(')) {
        const printMatches = userCode.match(/print\(["']([^"']*)["']\s*\)/g);
        const fStringMatches = userCode.match(
          /print\(f["']([^"']*)["'].*?\)/g
        );

        if (userCode.includes('for i in range(')) {
          const rangeMatch = userCode.match(/range\((\d+),\s*(\d+)\s*\+\s*(\d+)\)/);
          const simpleRange = userCode.match(
            /range\(\s*(\d+)\s*,\s*(\d+)\s*\+\s*(\d+)\s*\)/
          );

          if (userCode.includes('print("🌟"') || userCode.includes("print('🌟'")) {
            const luckyMatch = userCode.match(/lucky_number\s*=\s*(\d+)/);
            const lucky = luckyMatch ? parseInt(luckyMatch[1]) : 7;
            for (let i = 1; i <= lucky; i++) {
              lines.push('🌟'.repeat(i));
              lines.push(`第 ${i} 颗星星亮起来了...`);
            }
            lines.push('');
            lines.push(`一共 ${lucky} 颗星星在空中闪烁 ✨`);
          } else {
            for (let i = 0; i < 5; i++) {
              const spaces = '  '.repeat(4 - i);
              const stars = '* '.repeat(i + 1);
              lines.push(spaces + stars);
            }
          }
        } else if (userCode.includes('mood =')) {
          const moodMatch = userCode.match(/mood\s*=\s*["'](\w+)["']/);
          const mood = moodMatch ? moodMatch[1] : 'happy';
          const moodColors: Record<string, string> = {
            happy: '🌻 金黄色',
            sad: '🌧️ 蓝色',
            calm: '🍃 绿色',
            excited: '🌈 彩虹色',
          };
          const color = moodColors[mood] || '🌈 彩虹色';
          lines.push(`今天的颜色是: ${color}`);
        } else if (userCode.includes('class MoodDiary')) {
          lines.push('✅ 已记录: 😊 - 今天阳光很好');
          lines.push('✅ 已记录: 😌 - 学会了写代码');
          lines.push('');
          lines.push('📖 小星星 的心情日记:');
          lines.push('  1. 😊 今天阳光很好');
          lines.push('  2. 😌 学会了写代码');
        } else if (userCode.includes('def create_garden')) {
          lines.push('🏡 === 我的小花园 === 🏡');
          lines.push('|  🌻  |');
          lines.push('|  🌷  |');
          lines.push('|  🌸  |');
          lines.push('|  🌺  |');
          lines.push('==============');
        } else {
          lines.push('Hello, Star!');
        }
      }

      setOutput(lines.length > 0 ? lines.join('\n') : '代码运行完成 ✅ （无输出）');
    } catch (e) {
      setErrorMsg(`遇到了一点小问题... 别担心，调整一下代码就好 🌱`);
    }
  };

  const resetCode = () => {
    if (activeSpark) {
      setUserCode(activeSpark.template);
      setOutput('');
      setErrorMsg('');
    }
  };

  return (
    <motion.div
      className="max-w-lg mx-auto px-5 pt-8 pb-4 page-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-earth-700 mb-1">
          代码星火 ✨
        </h1>
        <p className="text-sm text-earth-400">
          每一行代码都是一颗星星，聚在一起就是银河
        </p>
      </div>

      {/* Stages roadmap */}
      <div className="card-warm mb-4">
        <div className="flex items-center justify-between text-center text-xs">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl">📋</span>
            <span className="text-calm-gold font-medium">临摹</span>
            <span className="text-earth-400">复制看效果</span>
          </div>
          <div className="w-8 h-px bg-earth-200 mt-2" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl">✏️</span>
            <span className="text-earth-400 font-medium">改编</span>
            <span className="text-earth-400">改一个参数</span>
          </div>
          <div className="w-8 h-px bg-earth-200 mt-2" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl">🚀</span>
            <span className="text-earth-400 font-medium">创作</span>
            <span className="text-earth-400">加自己的想法</span>
          </div>
        </div>
      </div>

      {/* Sparks Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {sparks.map((spark) => (
          <motion.button
            key={spark.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => openSpark(spark)}
            className="card-warm text-left p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{spark.icon}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                  spark.stage === 1
                    ? 'bg-calm-green/20 text-calm-green'
                    : spark.stage === 2
                    ? 'bg-calm-blue/20 text-calm-blue'
                    : 'bg-calm-purple/20 text-calm-purple'
                }`}
              >
                {spark.tag}
              </span>
            </div>
            <h3 className="text-sm font-medium text-earth-700 mb-1">
              {spark.title}
            </h3>
            <p className="text-xs text-earth-400 leading-relaxed line-clamp-2">
              {spark.description}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Code Editor Modal */}
      <AnimatePresence>
        {activeSpark && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-earth-900/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setActiveSpark(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="card-warm max-w-lg w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{activeSpark.icon}</span>
                <div>
                  <h3 className="font-semibold text-earth-700">
                    {activeSpark.title}
                  </h3>
                  <p className="text-xs text-earth-400">
                    {activeSpark.description}
                  </p>
                </div>
              </div>

              {/* Code Editor */}
              <div className="mb-3">
                <label className="text-xs text-earth-400 mb-1.5 block">
                  试试修改代码，然后运行看看会发生什么 ✨
                </label>
                <textarea
                  className="w-full bg-earth-900 text-emerald-300 font-mono text-sm p-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-calm-gold/30"
                  rows={Math.min(userCode.split('\n').length + 2, 15)}
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  spellCheck={false}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mb-3">
                <button onClick={runCode} className="btn-primary text-sm flex-1">
                  运行 ▶️
                </button>
                <button onClick={resetCode} className="btn-ghost text-sm">
                  重置 🔄
                </button>
              </div>

              {/* Output */}
              {(output || errorMsg) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`rounded-xl p-3 text-sm font-mono whitespace-pre-wrap ${
                    errorMsg
                      ? 'bg-red-50 text-red-600 border border-red-100'
                      : 'bg-earth-50 text-earth-600 border border-earth-100'
                  }`}
                >
                  {errorMsg || output}
                </motion.div>
              )}

              <p className="text-[11px] text-earth-300 mt-3 text-center">
                没有"错误"——每次运行都是一次探索 🌟
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
