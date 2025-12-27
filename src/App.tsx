import React, { useState, useEffect } from "react";
import { StartScreen } from "./components/screens/StartScreen";
import { PracticeScreen } from "./components/screens/PracticeScreen";
import { SessionSummary } from "./components/screens/SessionSummary";
import { useAudio } from "./hooks/useAudio";
import { useNoteInput } from "./hooks/useNoteInput";
import { useAppStore } from "./stores/useAppStore";
import { resetAudio } from "./lib/audio/AudioManager";

function App() {
  const { isInitialized } = useAudio();
  const { isActive } = useAppStore((state) => state.exercise);
  const { stopExercise, resetSession } = useAppStore((state) => state.exerciseActions);
  const [showSummary, setShowSummary] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useNoteInput();

  // Show summary when exercise stops after having started
  useEffect(() => {
    if (!isActive && hasStarted && isInitialized) {
      const session = useAppStore.getState().exercise.session;
      if (session.questionsAnswered > 0) {
        setShowSummary(true);
      }
    }
  }, [isActive, hasStarted, isInitialized]);

  // Track when exercise starts
  useEffect(() => {
    if (isActive) {
      setHasStarted(true);
      setShowSummary(false);
    }
  }, [isActive]);

  const handlePracticeAgain = () => {
    setShowSummary(false);
    setHasStarted(false);
    resetSession();
  };

  const handleBackToStart = () => {
    setShowSummary(false);
    setHasStarted(false);
    resetSession();
    stopExercise();
    // Reset audio system completely - this will reset both the module state and store state
    resetAudio();
  };

  if (showSummary) {
    return <SessionSummary onPracticeAgain={handlePracticeAgain} onBackToStart={handleBackToStart} />;
  }

  if (!isInitialized) {
    return <StartScreen />;
  }

  return <PracticeScreen onBackToStart={handleBackToStart} />;
}

export default App;