import type { IExercise, ExerciseResult, ExerciseConfig } from "./types";
import type { ExerciseQuestion, SessionStats, ExerciseSettings } from "../../types";
import { generateRandomNote } from "../../utils/noteGenerator";
import { midiToNoteName } from "../../utils/noteUtils";

export class NoteRecognitionExercise implements IExercise {
  private config: ExerciseConfig;

  constructor(config: ExerciseConfig) {
    this.config = config;
  }

  generateQuestion(): ExerciseQuestion {
    const { settings } = this.config;
    const targetMidiNumber = generateRandomNote(
      {
        lowMidi: settings.noteRangeLow,
        highMidi: settings.noteRangeHigh,
      },
      settings.includeAccidentals
    );

    return {
      targetMidiNumber,
      targetNoteName: midiToNoteName(targetMidiNumber),
      startTime: performance.now(),
    };
  }

  validateAnswer(question: ExerciseQuestion, answer: number): boolean {
    return question.targetMidiNumber === answer;
  }

  calculateResponseTime(question: ExerciseQuestion): number {
    return performance.now() - question.startTime;
  }

  updateStats(
    stats: SessionStats,
    isCorrect: boolean,
    responseTime: number
  ): SessionStats {
    const newQuestionsAnswered = stats.questionsAnswered + 1;
    const newCorrectAnswers = stats.correctAnswers + (isCorrect ? 1 : 0);
    const newAverageResponseTime =
      (stats.averageResponseTimeMs * stats.questionsAnswered + responseTime) /
      newQuestionsAnswered;
    const newCurrentStreak = isCorrect ? stats.currentStreak + 1 : 0;
    const newBestStreak = Math.max(stats.bestStreak, newCurrentStreak);

    return {
      questionsAnswered: newQuestionsAnswered,
      correctAnswers: newCorrectAnswers,
      averageResponseTimeMs: newAverageResponseTime,
      currentStreak: newCurrentStreak,
      bestStreak: newBestStreak,
    };
  }
}


