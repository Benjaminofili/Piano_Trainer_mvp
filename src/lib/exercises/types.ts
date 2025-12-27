import type { ExerciseQuestion, SessionStats, ExerciseSettings } from "../../types";

export interface IExercise {
  generateQuestion(): ExerciseQuestion;
  validateAnswer(question: ExerciseQuestion, answer: number): boolean;
  calculateResponseTime(question: ExerciseQuestion): number;
  updateStats(
    stats: SessionStats,
    isCorrect: boolean,
    responseTime: number
  ): SessionStats;
}

export interface ExerciseResult {
  isCorrect: boolean;
  responseTime: number;
}

export interface ExerciseConfig {
  settings: ExerciseSettings;
}


