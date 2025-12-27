import React from "react";
import { ExerciseView } from "../exercise/ExerciseView";
import { MidiConnection } from "../midi/MidiConnection";

export function PracticeScreen() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <MidiConnection />
        </div>
        <ExerciseView />
      </div>
    </div>
  );
}


