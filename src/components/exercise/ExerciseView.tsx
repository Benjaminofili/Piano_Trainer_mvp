import React from "react";
import { useExercise } from "../../hooks/useExercise";
import { Button } from "../common/Button";
import { PianoKeyboard } from "../keyboard/PianoKeyboard";
import { SessionStats } from "./SessionStats";
import { SettingsPanel } from "./SettingsPanel";
import { FeedbackOverlay } from "./FeedbackOverlay";

export function ExerciseView() {
  const {
    isActive,
    currentQuestion,
    lastAnswerCorrect,
    session,
    startExercise,
    stopExercise,
    nextQuestion,
    resetSession,
    settings,
  } = useExercise();

  if (!isActive) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-4">Note Recognition Exercise</h2>
          <p className="text-gray-600 mb-6">
            Practice recognizing notes on the piano. A note will be highlighted - play it to continue!
          </p>
          <Button onClick={startExercise} variant="primary" className="text-lg px-8 py-3">
            Start Exercise
          </Button>
        </div>
        <SettingsPanel />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <FeedbackOverlay />
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Practice Mode</h2>
          <div className="flex gap-2">
            <Button onClick={stopExercise} variant="secondary">
              Stop
            </Button>
            <Button onClick={resetSession} variant="secondary">
              Reset Stats
            </Button>
          </div>
        </div>

        {currentQuestion && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-lg font-semibold text-blue-900">
              Target Note: <span className="text-2xl">{currentQuestion.targetNoteName}</span>
            </p>
          </div>
        )}

        {lastAnswerCorrect === false && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">Incorrect! Try again or click Next to continue.</p>
            <Button onClick={nextQuestion} variant="primary" className="mt-2">
              Next Note
            </Button>
          </div>
        )}
      </div>

      <div className="mb-6">
        <PianoKeyboard
          lowMidi={settings.noteRangeLow}
          highMidi={settings.noteRangeHigh}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SessionStats />
        <SettingsPanel />
      </div>
    </div>
  );
}


