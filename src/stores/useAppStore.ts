import { create } from "zustand";
import type {
  AudioStatus,
  MidiConnectionStatus,
  MidiDevice,
  ExerciseQuestion,
  SessionStats,
  ExerciseSettings,
} from "../types";
import {
  DEFAULT_RANGE_LOW,
  DEFAULT_RANGE_HIGH,
  DEFAULT_AUTO_ADVANCE_DELAY,
  PIANO_61_LOW,
  PIANO_61_HIGH,
  PIANO_76_LOW,
  PIANO_76_HIGH,
  PIANO_88_LOW,
  PIANO_88_HIGH,
} from "../constants/notes";

interface AppState {
  // Audio slice
  audio: {
    status: AudioStatus;
    volume: number;
    error?: string;
  };
  audioActions: {
    initializeAudio: () => Promise<void>;
    setVolume: (volume: number) => void;
    setError: (error?: string) => void;
    reset: () => void;
  };

  // MIDI slice
  midi: {
    status: MidiConnectionStatus;
    availableDevices: MidiDevice[];
    selectedDeviceId: string | null;
    isSupported: boolean;
  };
  midiActions: {
    requestAccess: () => Promise<void>;
    selectDevice: (deviceId: string) => void;
    disconnect: () => void;
    setAvailableDevices: (devices: MidiDevice[]) => void;
    setStatus: (status: MidiConnectionStatus) => void;
    setIsSupported: (isSupported: boolean) => void;
  };

  // Exercise slice
  exercise: {
    mode: "note_recognition";
    isActive: boolean;
    currentQuestion: ExerciseQuestion | null;
    lastAnswerCorrect: boolean | null;
    session: SessionStats;
    settings: ExerciseSettings;
  };
  exerciseActions: {
    startExercise: () => void;
    stopExercise: () => void;
    submitAnswer: (midiNumber: number) => boolean; // Returns true if correct
    nextQuestion: () => void;
    generateQuestion: () => void;
    resetSession: () => void;
    updateSettings: (settings: Partial<ExerciseSettings>) => void;
  };
}

export const useAppStore = create<AppState>((set, get) => ({
  // Audio slice
  audio: {
    status: "uninitialized",
    volume: 0.7,
  },
  audioActions: {
    initializeAudio: async () => {
      set({ audio: { ...get().audio, status: "ready" } });
    },
    setVolume: (volume: number) => {
      set({ audio: { ...get().audio, volume: Math.max(0, Math.min(1, volume)) } });
    },
    setError: (error?: string) => {
      set({
        audio: {
          ...get().audio,
          status: error ? "error" : "ready",
          error,
        },
      });
    },
    reset: () => {
      set({
        audio: {
          status: "uninitialized",
          volume: 0.7,
          error: undefined,
        },
      });
    },
  },

  // MIDI slice
  midi: {
    status: "disconnected",
    availableDevices: [],
    selectedDeviceId: null,
    isSupported: typeof navigator !== "undefined" && "requestMIDIAccess" in navigator,
  },
  midiActions: {
    requestAccess: async () => {
      // Implementation will be in MidiManager
    },
    selectDevice: (deviceId: string) => {
      set({ midi: { ...get().midi, selectedDeviceId: deviceId } });
    },
    disconnect: () => {
      set({
        midi: {
          ...get().midi,
          status: "disconnected",
          selectedDeviceId: null,
        },
      });
    },
    setAvailableDevices: (devices: MidiDevice[]) => {
      set({ midi: { ...get().midi, availableDevices: devices } });
    },
    setStatus: (status: MidiConnectionStatus) => {
      set({ midi: { ...get().midi, status } });
    },
    setIsSupported: (isSupported: boolean) => {
      set({ midi: { ...get().midi, isSupported } });
    },
  },

  // Exercise slice
  exercise: {
    mode: "note_recognition",
    isActive: false,
    currentQuestion: null,
    lastAnswerCorrect: null,
    session: {
      questionsAnswered: 0,
      correctAnswers: 0,
      averageResponseTimeMs: 0,
      currentStreak: 0,
      bestStreak: 0,
    },
    settings: {
      noteRangeLow: DEFAULT_RANGE_LOW,
      noteRangeHigh: DEFAULT_RANGE_HIGH,
      includeAccidentals: true,
      autoAdvance: true,
      autoAdvanceDelayMs: DEFAULT_AUTO_ADVANCE_DELAY,
      showTargetOnKeyboard: false, // Don't show target immediately
      displayMode: "keyboard", // Default to keyboard, can be "staff" or "both"
      pianoRange: "61", // Default to 61-key piano (5 octaves from C1)
    },
  },
  exerciseActions: {
    startExercise: () => {
      set({ exercise: { ...get().exercise, isActive: true } });
    },
    stopExercise: () => {
      set({ exercise: { ...get().exercise, isActive: false, currentQuestion: null } });
    },
    submitAnswer: (midiNumber: number) => {
      const { currentQuestion, session, settings } = get().exercise;
      if (!currentQuestion) return false;

      const isCorrect = midiNumber === currentQuestion.targetMidiNumber;
      const responseTime = performance.now() - currentQuestion.startTime;

      const newQuestionsAnswered = session.questionsAnswered + 1;
      const newCorrectAnswers = session.correctAnswers + (isCorrect ? 1 : 0);
      const newAverageResponseTime =
        (session.averageResponseTimeMs * session.questionsAnswered + responseTime) /
        newQuestionsAnswered;
      const newCurrentStreak = isCorrect ? session.currentStreak + 1 : 0;
      const newBestStreak = Math.max(session.bestStreak, newCurrentStreak);

      set({
        exercise: {
          ...get().exercise,
          lastAnswerCorrect: isCorrect,
          session: {
            questionsAnswered: newQuestionsAnswered,
            correctAnswers: newCorrectAnswers,
            averageResponseTimeMs: newAverageResponseTime,
            currentStreak: newCurrentStreak,
            bestStreak: newBestStreak,
          },
        },
      });

      // Auto-advance if correct and enabled
      // The hook will detect currentQuestion is null and generate a new one
      if (isCorrect && settings.autoAdvance) {
        setTimeout(() => {
          const state = get();
          if (state.exercise.isActive) {
            // Clear current question - hook's useEffect will generate new one
            get().exerciseActions.nextQuestion();
          }
        }, settings.autoAdvanceDelayMs);
      }

      return isCorrect;
    },
    nextQuestion: () => {
      // Reset current question - the hook will generate a new one
      set({
        exercise: {
          ...get().exercise,
          currentQuestion: null,
          lastAnswerCorrect: null,
        },
      });
    },
    generateQuestion: () => {
      // This will be called by the hook to generate a new question
      // The actual generation logic is in useExercise hook
    },
    resetSession: () => {
      set({
        exercise: {
          ...get().exercise,
          session: {
            questionsAnswered: 0,
            correctAnswers: 0,
            averageResponseTimeMs: 0,
            currentStreak: 0,
            bestStreak: 0,
          },
          currentQuestion: null,
          lastAnswerCorrect: null,
        },
      });
    },
    updateSettings: (newSettings: Partial<ExerciseSettings>) => {
      set({
        exercise: {
          ...get().exercise,
          settings: { ...get().exercise.settings, ...newSettings },
        },
      });
    },
  },
}));

