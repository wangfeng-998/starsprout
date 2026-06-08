import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BreathFlower from '../components/BreathFlower';

export default function BreathingPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-dvh flex flex-col items-center justify-center px-5 pt-8 pb-6 page-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-earth-700 mb-1">呼吸练习 🌸</h1>
        <p className="text-sm text-earth-400">4-7-8 呼吸法，帮焦虑悄悄离开</p>
      </div>

      <div className="card-warm py-8 px-4 w-full max-w-sm">
        <BreathFlower onComplete={() => {}} />
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-earth-400 mb-2">
          每天做3轮4-7-8呼吸，坚持一周就能感受到变化 🌱
        </p>
        <button
          onClick={() => navigate('/mood')}
          className="btn-ghost text-sm text-calm-gold"
        >
          ← 返回心情空间
        </button>
      </div>
    </motion.div>
  );
}
