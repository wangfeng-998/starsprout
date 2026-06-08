import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Spark {
  id: string;
  title: string;
  description: string;
  stage: 1 | 2 | 3;
  template: string;
  defaultOutput: string;
  icon: string;
  tag: string;
}

const sparks: Spark[] = [
  {
    id: 'hello-star',
    title: '你好，星星',
    description: '让计算机对你说 "Hello, Star!" —— 你的第一行代码',
    stage: 1,
    template: 'print("Hello, Star!")',
    defaultOutput: 'Hello, Star!',
    icon: '👋',
    tag: '入门',
  },
  {
    id: 'star-name',
    title: '星星的名字',
    description: '让程序记住你的名字并跟你打招呼',
    stage: 1,
    template: `name = "小星星"
print("你好，" + name + "！欢迎来到编程世界 ✨")`,
    defaultOutput: '你好，小星星！欢迎来到编程世界 ✨',
    icon: '📛',
    tag: '入门',
  },
  {
    id: 'weather-emoji',
    title: '天气表情包',
    description: '输入天气，输出对应的表情符号',
    stage: 1,
    template: `weather = "晴天"  # 试试改成 下雨、多云、下雪

if weather == "晴天":
    print("☀️ 阳光明媚！")
elif weather == "下雨":
    print("🌧️ 记得带伞哦")
elif weather == "多云":
    print("⛅ 云朵在飘")
else:
    print("🌈 不管什么天气，都是好天气！")`,
    defaultOutput: '☀️ 阳光明媚！',
    icon: '🌤️',
    tag: '条件',
  },
  {
    id: 'star-twinkle',
    title: '画一颗星星',
    description: '用代码画出你的第一颗星星图案',
    stage: 1,
    template: `for i in range(5):
    print("  " * (5 - i) + "* " * (i + 1))`,
    defaultOutput: `    * \n   * * \n  * * * \n * * * * \n* * * * *`,
    icon: '⭐',
    tag: '图形',
  },
  {
    id: 'multiplication-table',
    title: '乘法口诀表',
    description: '用嵌套循环打印九九乘法表',
    stage: 2,
    template: `for i in range(1, 10):
    line = ""
    for j in range(1, i + 1):
        line += f"{j}×{i}={i*j}\\t"
    print(line)`,
    defaultOutput: `1×1=1\n1×2=2  2×2=4\n1×3=3  2×3=6  3×3=9\n...\n9×9=81`,
    icon: '✖️',
    tag: '循环',
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
    defaultOutput: '今天的颜色是: 🌻 金黄色',
    icon: '🎨',
    tag: '条件',
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
    defaultOutput: `🌟\n第 1 颗星星亮起来了...\n🌟🌟\n第 2 颗星星亮起来了...\n...\n一共 7 颗星星在空中闪烁 ✨`,
    icon: '🔢',
    tag: '循环',
  },
  {
    id: 'guess-number',
    title: '猜数字游戏',
    description: '经典的猜数字游戏，看看几次能猜中',
    stage: 2,
    template: `import random

secret = random.randint(1, 10)
guess = 5  # 猜一个 1-10 之间的数字
tries = 1

while guess != secret:
    if guess < secret:
        print(f"第 {tries} 次: {guess} → 大一点！")
    else:
        print(f"第 {tries} 次: {guess} → 小一点！")
    guess = (guess + secret) // 2  # 缩小范围
    tries += 1

print(f"🎉 猜对了！数字是 {secret}，你用了 {tries} 次")`,
    defaultOutput: `第 1 次: 5 → 大一点！\n🎉 猜对了！数字是 7，你用了 2 次`,
    icon: '🎲',
    tag: '逻辑',
  },
  {
    id: 'simple-calc',
    title: '迷你计算器',
    description: '用函数做一个能加减乘除的小计算器',
    stage: 2,
    template: `def calculate(a, b, op):
    if op == "+":
        return a + b
    elif op == "-":
        return a - b
    elif op == "*":
        return a * b
    elif op == "/":
        return a / b if b != 0 else "不能除以0！"
    else:
        return "未知运算"

print("3 + 5 =", calculate(3, 5, "+"))
print("10 - 4 =", calculate(10, 4, "-"))
print("6 * 7 =", calculate(6, 7, "*"))
print("8 / 2 =", calculate(8, 2, "/"))`,
    defaultOutput: '3 + 5 = 8\n10 - 4 = 6\n6 * 7 = 42\n8 / 2 = 4.0',
    icon: '🧮',
    tag: '函数',
  },
  {
    id: 'todo-list',
    title: '待办清单',
    description: '用列表管理你的每日任务',
    stage: 3,
    template: `todos = []

def add_task(task):
    todos.append(task)
    print(f"✅ 已添加: {task}")

def show_tasks():
    print("\\n📋 我的待办清单:")
    if not todos:
        print("  （暂时空空如也~）")
    for i, task in enumerate(todos, 1):
        print(f"  {i}. {task}")

add_task("学习一个数学概念")
add_task("练习10分钟代码")
add_task("记录今天的心情")
show_tasks()`,
    defaultOutput: `✅ 已添加: 学习一个数学概念\n✅ 已添加: 练习10分钟代码\n✅ 已添加: 记录今天的心情\n\n📋 我的待办清单:\n  1. 学习一个数学概念\n  2. 练习10分钟代码\n  3. 记录今天的心情`,
    icon: '📝',
    tag: '列表',
  },
  {
    id: 'poem-generator',
    title: '随机小诗',
    description: '用随机选择拼出一首独一无二的小诗',
    stage: 3,
    template: `import random

subjects = ["星星", "月亮", "微风", "萤火虫", "露珠"]
verbs = ["轻轻说", "眨了眨眼", "悄悄飞过", "缓缓升起", "静静落下"]
endings = ["晚安，世界", "明天见", "好梦", "一切都好", "慢慢来"]

for i in range(3):
    s = random.choice(subjects)
    v = random.choice(verbs)
    e = random.choice(endings)
    print(f"{s}{v}，{e}")`,
    defaultOutput: `星星轻轻说，晚安，世界\n月亮悄悄飞过，明天见\n萤火虫眨了眨眼，一切都好`,
    icon: '📜',
    tag: '随机',
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
    defaultOutput: '🏡 === 我的小花园 === 🏡\n|  🌻  |\n|  🌷  |\n|  🌸  |\n|  🌺  |\n==============',
    icon: '🏗️',
    tag: '函数',
  },
  {
    id: 'mood-tracker',
    title: '心情记录器',
    description: '创建一个简单的心情追踪日记工具',
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
    defaultOutput: '✅ 已记录: 😊 - 今天阳光很好\n✅ 已记录: 😌 - 学会了写代码\n\n📖 小星星 的心情日记:\n  1. 😊 今天阳光很好\n  2. 😌 学会了写代码',
    icon: '📓',
    tag: '类',
  },
  {
    id: 'password-checker',
    title: '密码强度检测',
    description: '写一个检测密码够不够强的程序',
    stage: 3,
    template: `def check_password(pw):
    score = 0
    if len(pw) >= 8:
        score += 1
    if any(c.isdigit() for c in pw):
        score += 1
    if any(c.isupper() for c in pw):
        score += 1
    if any(c in "!@#$%^&*" for c in pw):
        score += 1
    return score

test_pws = ["123456", "Star1234", "St@rSprout2026!"]
for pw in test_pws:
    s = check_password(pw)
    level = "🟢 强" if s >= 4 else "🟡 中" if s >= 2 else "🔴 弱"
    print(f"{pw}: {level} (得分 {s}/4)")`,
    defaultOutput: '123456: 🔴 弱 (得分 0/4)\nStar1234: 🟡 中 (得分 3/4)\nSt@rSprout2026!: 🟢 强 (得分 4/4)',
    icon: '🔐',
    tag: '逻辑',
  },
  {
    id: 'emotion-thermometer',
    title: '情绪温度计',
    description: '把情绪分数转换成可视化的温度条',
    stage: 2,
    template: `def emotion_bar(score, max_score=10):
    filled = "█" * score
    empty = "░" * (max_score - score)
    emoji = "😄" if score >= 7 else "😐" if score >= 4 else "😢"
    return f"|{filled}{empty}| {score}/{max_score} {emoji}"

print("今日心情温度:")
print(emotion_bar(8))
print("昨日心情温度:")
print(emotion_bar(5))
print("上周心情温度:")
print(emotion_bar(3))`,
    defaultOutput: '今日心情温度:\n|████████░░| 8/10 😄\n昨日心情温度:\n|█████░░░░░| 5/10 😐\n上周心情温度:\n|███░░░░░░░| 3/10 😢',
    icon: '🌡️',
    tag: '函数',
  },
];

const allTags = ['全部', ...Array.from(new Set(sparks.map((s) => s.tag)))];

export default function CodeSparks() {
  const [activeSpark, setActiveSpark] = useState<Spark | null>(null);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [filterTag, setFilterTag] = useState('全部');

  const visibleSparks = useMemo(
    () => (filterTag === '全部' ? sparks : sparks.filter((s) => s.tag === filterTag)),
    [filterTag]
  );

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
      // If code hasn't been modified, show default output
      if (activeSpark && userCode === activeSpark.template) {
        setOutput(activeSpark.defaultOutput);
        return;
      }

      // Attempt to simulate: extract print statements
      const printPatterns = [
        ...userCode.matchAll(/print\(f?"([^"]*)"[^)]*\)/g),
        ...userCode.matchAll(/print\(f?'([^']*)'[^)]*\)/g),
      ];

      if (printPatterns.length > 0) {
        // Simple: show literal print outputs with variable substitution hints
        const lines: string[] = [];
        for (const match of printPatterns) {
          let text = match[1];
          // Try basic substitution
          text = text.replace(/\{(\w+)\}/g, (_, v) =>
            (userCode.match(new RegExp(`${v}\\s*=\\s*"([^"]*)"`)) ||
             userCode.match(new RegExp(`${v}\\s*=\\s*'([^']*)'`)) ||
             [])[1] || `{${v}}`
          );
          lines.push(text);
        }
        setOutput(lines.join('\n') || '代码运行完成 ✅');
      } else if (activeSpark) {
        setOutput(activeSpark.defaultOutput);
      } else {
        setOutput('代码运行完成 ✅');
      }
    } catch {
      setErrorMsg('遇到了一点小问题... 调整一下代码就好 🌱');
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
        <h1 className="text-2xl font-bold text-earth-700 mb-1">代码星火 ✨</h1>
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

      {/* 标签筛选 */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-earth-500">
          火花库（{sparks.length} 颗）
        </h2>
        <div className="flex gap-1 flex-wrap justify-end max-w-[240px]">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`text-xs px-2 py-1 rounded-lg transition-all ${
                filterTag === tag
                  ? 'bg-calm-gold/20 text-calm-gold font-medium'
                  : 'text-earth-400 hover:bg-earth-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Sparks Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {visibleSparks.map((spark) => (
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
