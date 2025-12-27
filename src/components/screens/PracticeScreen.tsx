import React from "react";
import { ExerciseView } from "../exercise/ExerciseView";
import { MidiConnection } from "../midi/MidiConnection";
import { Button } from "../common/Button";

interface PracticeScreenProps {
  onBackToStart: () => void;
}

export function PracticeScreen({ onBackToStart }: PracticeScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex-1">
            <MidiConnection />
          </div>
          <div className="ml-4">
            <Button onClick={onBackToStart} variant="secondary">
              ← Back to Start
            </Button>
          </div>
        </div>
        <ExerciseView />
      </div>
    </div>
  );
}