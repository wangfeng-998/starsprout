/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#faf7f2',
        warm: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
        },
        petal: {
          rose: '#f4c2c2',
          lavender: '#d4c5e2',
          mint: '#b8d8ba',
          sky: '#b5d8e8',
          peach: '#fad4c0',
          butter: '#f7e8a0',
        },
        earth: {
          50: '#faf7f2',
          100: '#f5f0e8',
          200: '#ebe3d5',
          300: '#d4c9b5',
          400: '#b8a99a',
          500: '#a0917b',
          600: '#7d6f5d',
          700: '#5e5345',
          800: '#3d352c',
          900: '#1f1b16',
        },
        calm: {
          blue: '#7ba7c9',
          green: '#8fbc8f',
          purple: '#b8a9c9',
          pink: '#d4a5a5',
          gold: '#c9a96e',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        serif: ['"Noto Serif SC"', '"SimSun"', 'serif'],
        display: ['"ZCOOL KuaiLe"', 'cursive'],
      },
      borderRadius: {
        blob: '30% 70% 70% 30% / 30% 30% 70% 70%',
        soft: '1.25rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'breathe': 'breathe 8s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'petal-fall': 'petalFall 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10%) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
