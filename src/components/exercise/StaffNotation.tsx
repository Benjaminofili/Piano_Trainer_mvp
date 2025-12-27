import React from "react";
import { useAppStore } from "../../stores/useAppStore";
import { midiToNoteName } from "../../utils/noteUtils";

/**
 * Simple staff notation display component
 * For MVP, shows the note name on a staff-like background
 * Full VexFlow integration can be added later
 */
export function StaffNotation() {
  const currentQuestion = useAppStore((state) => state.exercise.currentQuestion);
  const displayMode = useAppStore((state) => state.exercise.settings.displayMode);

  if (!currentQuestion || (displayMode !== "staff" && displayMode !== "both")) {
    return null;
  }

  const noteName = currentQuestion.targetNoteName;
  const [note, octave] = noteName.match(/([A-G]#?)(\d)/)?.slice(1) || [noteName, ""];

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Staff Notation</h3>
      <div className="relative h-32 bg-gradient-to-b from-white via-white to-white border-2 border-gray-800">
        {/* Staff lines */}
        {[1, 2, 3, 4, 5].map((line) => (
          <div
            key={line}
            className="absolute w-full border-t border-gray-800"
            style={{ top: `${(line - 1) * 20 + 10}%` }}
          />
        ))}
        
        {/* Note display (simplified - full implementation would use VexFlow) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">{note}</div>
            <div className="text-lg text-gray-600">Octave {octave}</div>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Full staff notation with VexFlow coming in v2
      </p>
    </div>
  );
}

