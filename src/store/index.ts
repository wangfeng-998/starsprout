import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MoodEmoji = '😊' | '😌' | '😐' | '😔' | '😢' | '😤' | '🥺' | '😴' | '🌈' | '💪';

export interface MoodRecord {
  emoji: MoodEmoji;
  intensity: number;
  note: string;
  timestamp: number;
}

export interface MathProgress {
  conceptId: string;
  stage: 'seed' | 'sprout' | 'bud' | 'flower';
  attempts: number;
  completedAt?: number;
}

export interface CodeProgress {
  sparkId: string;
  stage: 'copy' | 'modify' | 'create';
  completedAt?: number;
}

export interface AppState {
  // User
  userName: string;
  userAvatar: string;
  onboardingComplete: boolean;

  // Mood
  moodHistory: MoodRecord[];
  todayCheckedIn: boolean;
  streak: number;
  lastCheckinDate: string;

  // Math Garden
  mathProgress: MathProgress[];
  gardenDecorations: string[];

  // Code Sparks
  codeProgress: CodeProgress[];

  // Path Finder
  likedInterests: string[];
  abilityPuzzleCompleted: boolean;

  // Actions
  setUserName: (name: string) => void;
  setUserAvatar: (avatar: string) => void;
  completeOnboarding: () => void;
  addMoodRecord: (record: MoodRecord) => void;
  setTodayCheckedIn: (checked: boolean) => void;
  updateStreak: () => void;
  updateMathProgress: (progress: MathProgress) => void;
  addGardenDecoration: (decoration: string) => void;
  updateCodeProgress: (progress: CodeProgress) => void;
  addLikedInterest: (interest: string) => void;
  removeLikedInterest: (interest: string) => void;
  completeAbilityPuzzle: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      userName: '',
      userAvatar: '⭐',
      onboardingComplete: false,
      moodHistory: [],
      todayCheckedIn: false,
      streak: 0,
      lastCheckinDate: '',
      mathProgress: [],
      gardenDecorations: [],
      codeProgress: [],
      likedInterests: [],
      abilityPuzzleCompleted: false,

      setUserName: (name) => set({ userName: name }),
      setUserAvatar: (avatar) => set({ userAvatar: avatar }),
      completeOnboarding: () => set({ onboardingComplete: true }),

      addMoodRecord: (record) =>
        set((state) => ({
          moodHistory: [record, ...state.moodHistory].slice(0, 365),
        })),

      setTodayCheckedIn: (checked) => set({ todayCheckedIn: checked }),

      updateStreak: () => {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const state = get();

        if (state.lastCheckinDate === today) return;

        if (state.lastCheckinDate === yesterday) {
          set({ streak: state.streak + 1, lastCheckinDate: today });
        } else {
          set({ streak: 1, lastCheckinDate: today });
        }
      },

      updateMathProgress: (progress) =>
        set((state) => {
          const existing = state.mathProgress.findIndex(
            (p) => p.conceptId === progress.conceptId
          );
          if (existing >= 0) {
            const updated = [...state.mathProgress];
            updated[existing] = progress;
            return { mathProgress: updated };
          }
          return { mathProgress: [...state.mathProgress, progress] };
        }),

      addGardenDecoration: (decoration) =>
        set((state) => ({
          gardenDecorations: [...state.gardenDecorations, decoration],
        })),

      updateCodeProgress: (progress) =>
        set((state) => {
          const existing = state.codeProgress.findIndex(
            (p) => p.sparkId === progress.sparkId
          );
          if (existing >= 0) {
            const updated = [...state.codeProgress];
            updated[existing] = progress;
            return { codeProgress: updated };
          }
          return { codeProgress: [...state.codeProgress, progress] };
        }),

      addLikedInterest: (interest) =>
        set((state) => ({
          likedInterests: [...state.likedInterests, interest],
        })),

      removeLikedInterest: (interest) =>
        set((state) => ({
          likedInterests: state.likedInterests.filter((i) => i !== interest),
        })),

      completeAbilityPuzzle: () => set({ abilityPuzzleCompleted: true }),
    }),
    {
      name: 'starsprout-storage',
    }
  )
);
