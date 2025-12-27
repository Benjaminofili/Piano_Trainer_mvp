import { useCallback } from "react";
import { useAppStore } from "../stores/useAppStore";
import { NoteRecognitionExercise } from "../lib/exercises/NoteRecognitionExercise";

export function useExercise() {
  const exercise = useAppStore((state) => state.exercise);
  const exerciseActions = useAppStore((state) => state.exerciseActions);

  const generateNextQuestion = useCallback(() => {
    const currentExercise = useAppStore.getState().exercise;
    const exerciseInstance = new NoteRecognitionExercise({
      settings: currentExercise.settings,
    });
    const question = exerciseInstance.generateQuestion();
    useAppStore.setState({
      exercise: {
        ...currentExercise,
        currentQuestion: question,
        lastAnswerCorrect: null,
      },
    });
  }, []);

  const startExercise = useCallback(() => {
    exerciseActions.startExercise();
    generateNextQuestion();
  }, [exerciseActions, generateNextQuestion]);

  const nextQuestion = useCallback(() => {
    if (exercise.isActive) {
      generateNextQuestion();
    } else {
      exerciseActions.nextQuestion();
    }
  }, [exercise.isActive, exerciseActions, generateNextQuestion]);

  return {
    mode: exercise.mode,
    isActive: exercise.isActive,
    currentQuestion: exercise.currentQuestion,
    lastAnswerCorrect: exercise.lastAnswerCorrect,
    session: exercise.session,
    settings: exercise.settings,
    startExercise,
    stopExercise: exerciseActions.stopExercise,
    nextQuestion,
    resetSession: exerciseActions.resetSession,
    updateSettings: exerciseActions.updateSettings,
  };
}

