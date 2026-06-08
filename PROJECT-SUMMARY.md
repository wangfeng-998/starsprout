# 🌟 星芽 StarSprout · 项目总览

> **Slogan**：不必成为太阳，做一颗发芽的星星就好。
> **定位**：面向抑郁/焦虑+学习困境青少年的跨平台心理陪伴与学习辅助系统
> **部署**：`8a5f08e4283147e093c4f322d885e03a.codebuddy.cloudstudio.run`

---

## 📊 项目规模

```
┌─────────────────────────────────────────────────────┐
│  星芽.html   821 行  ·  77 KB  ·  单文件全栈 PWA    │
│  Master Prompt   412 行                             │
│  AI 创作规范   150+ 行                              │
│  React/TS 源码   6 页面 + 组件                       │
└─────────────────────────────────────────────────────┘
```

---

## 🏗 架构一览

```
┌──────────────────────────────────────────────────────┐
│                    星芽 StarSprout                     │
├──────────┬──────────┬──────────┬──────────┬──────────┤
│  🌤️ 晨露  │  🌱 数语  │  ✨ 萤火  │  🧭 星图  │  🏡 树洞  │
│ MoodPage │MathPage  │CodePage  │PathPage  │SafePage  │
├──────────┴──────────┴──────────┴──────────┴──────────┤
│               🧠 AI 暖伴 (AiCompanion)                │
│             💾 Zustand Store + localStorage           │
│         🎵 Web Audio API (6 种环境音景)               │
└──────────────────────────────────────────────────────┘
```

---

## 🌸 五瓣花功能矩阵

| 花瓣 | 页面 | 核心功能 | 子功能数 |
|:---:|:---:|:---|:---:|
| 🌤️ 晨露 | `MoodPage` | 情绪签到 · 呼吸花园 · AI暖伴 · 感恩一瞬 · 情绪年轮 | 5 |
| 🌱 数语 | `MathPage` | 概念种子 · 微探险 · 向量花园 · 微积分河流 · 每日一题 | 5 |
| ✨ 萤火 | `CodePage` | Scratch→Python 渐进 · 即时可视化 · 碎片项目 · 好奇心地图 | 4 |
| 🧭 星图 | `PathPage` | 兴趣卡片 (Tinder式) · 能力拼图 · 故事馆 · 方向星轨 | 4 |
| 🏡 树洞 | `SafePage` | 环境音景 · 引导冥想 · 急救箱 · 心理援助 · AI暖伴 · 成长时间线 | 6 |

**总计：24 个子功能模块**

---

## 🎵 环境音景引擎

| 音景 | 算法 |
|:---:|:---|
| 🌧️ 雨声 | 白噪音 → 低通 500Hz → 慢速 LFO 调制 |
| 🌲 森林 | 双层混合：高频鸟鸣 BP 1200Hz + 低频风声 LP 200Hz |
| 🔥 篝火 | 噪音 → 带通 800Hz → 快速裂响 LFO 3Hz |
| 🌊 海浪 | 噪音 → 低通 350Hz → 潮汐 LFO 0.12Hz |
| ☕ 咖啡馆 | 噪音 → 极低通 300Hz → 人声嗡响模拟 |
| 🍃 微风 | 噪音 → 宽频带通 → 频率+音量双重慢漂移 |

> 纯 Web Audio API 生成，零外部音频文件，4 节点音频管线

---

## 🛠 技术栈

| 层级 | 技术 | 用途 |
|:---|:---|:---|
| 前端 | React 18 + Babel Standalone | 单文件组件渲染 |
| 状态 | React Context (类 Zustand) | 全局状态 + localStorage 持久化 |
| 样式 | CSS 变量 + 原生 CSS | 温暖自然调色板 |
| 音频 | Web Audio API | 6 种程序化自然音景 |
| 部署 | CloudStudio | 一键远程部署 |

---

## 🔧 实现过程 & 关键 Bug 修复

### Bug #1：树洞页空白 🐛
```
现象：点击「树洞」tab → 页面完全空白
定位：Playwright 自动化测试 → console 捕获
      ReferenceError: s is not defined at SafePage
根因：SafePage() 函数漏写 const {s}=useStore()
      但 JSX 中引用了 s.moodHistory / s.streak / s.gardenFlowers
修复：第 633 行添加 const {s}=useStore();
耗时：2 轮测试迭代
```

### Bug #2：环境音景无声音 🔇
```
现象：点击雨声/森林/篝火等按钮 → 仅视觉高亮，无声音
根因：onClick 仅执行 setSound() 切换状态，零音频代码
方案：实现 Web Audio API 音频引擎
  ├── _acx()    → AudioContext 初始化
  ├── _nb()     → 噪声缓冲区生成
  ├── _playAud()→ 6 种音景的分支管线
  └── _stopAud()→ 优雅停止 + 资源回收
修复：新增 60 行音频代码 + 修改 1 行 onClick
测试：Playwright 逐一点击 6 按钮，0 错误
```

---

## 📋 七条铁律

```
① 情绪先行     → 先问候情绪再引导任务
② 脚手架       → 提供恰好支持，随能力逐步撤离
③ 成功螺旋     → 每次交互落在最近发展区内
④ 柔性边界     → 不惩罚"不做"，只庆祝"做了"
⑤ 自我决定     → 自主感 + 胜任感 + 联结感
⑥ 具身认知     → 花园/星图/河流替代抽象概念
⑦ 不叫"失败"   → 失败→尝试路径，错误→这条路不通
```

---

## 🚫 黑名单词汇

| ❌ 禁用 | ✅ 替代 |
|:---|:---|
| 失败 | 尝试路径 / 这次没开 |
| 错误 | 这条路不通 / 还在探索 |
| 测验 | 拼图 / 探索 / 小试一下 |
| 惩罚 | (直接删除该机制) |
| 你必须 | 你可以 / 如果你愿意 |
| 加油 | 慢慢来 / 今天走到这里已经很好了 |

---

## 📦 文件清单

```
星芽.html                         ← 🚀 主部署文件 (821行)
starsprout_master_prompt.txt      ← 📋 系统级 Master Prompt (412行)
StarSprout-AI-Creative-Spec.md    ← ✍️ AI 二次创作规范
README.md                         ← 📖 项目说明
src/
  ├── pages/
  │   ├── MoodSanctuary.tsx       ← 晨露·情绪栖息
  │   ├── MathGarden.tsx          ← 数语·数学花园
  │   ├── CodeSparks.tsx          ← 萤火·代码星火
  │   ├── PathFinder.tsx          ← 星图·方向探索
  │   ├── SafeSpace.tsx           ← 树洞·安全空间
  │   └── Onboarding.tsx          ← 引导页
  └── components/
      └── BottomNav.tsx           ← 底部导航
```

---

## 🧪 测试方法论

```
Playwright CLI 浏览器自动化
  ├── 页面加载 → 0 业务报错
  ├── localStorage 注入 → 跳过引导
  ├── #hash 路由导航 → 5 页面逐一验证
  ├── snapshot 快照 → 断言渲染完整性
  └── console 监控 → 捕获 ReferenceError / TypeError
```

---

## 🎯 关键数字

| 指标 | 数值 |
|:---|---:|
| 总代码行 | 821 行 |
| 组件数 | 10 (`MoodPage` `MathPage` `CodePage` `PathPage` `SafePage` `AiCompanion` `BottomNav` `Onboarding` `App` `useStore`) |
| 子功能模块 | 24 |
| 音景种类 | 6 |
| 冥想时长 | 3 档 (3/5/10 min) |
| 安抚语 | 8 条轮播 |
| 心理援助热线 | 3 条 |
| 产品铁律 | 7 条 |
| Bug 修复 | 2 个 (SafePage空白 + 音景静音) |
| 部署地址 | 1 个 (CloudStudio) |
