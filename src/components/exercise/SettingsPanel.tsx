import React from "react";
import { useExercise } from "../../hooks/useExercise";
import { DEFAULT_RANGE_LOW, DEFAULT_RANGE_HIGH } from "../../constants/notes";
import { midiToNoteName } from "../../utils/noteUtils";

export function SettingsPanel() {
  const { settings, updateSettings } = useExercise();

  const handleRangeChange = (field: "noteRangeLow" | "noteRangeHigh", value: number) => {
    updateSettings({ [field]: value });
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note Range: {midiToNoteName(settings.noteRangeLow)} - {midiToNoteName(settings.noteRangeHigh)}
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Low</label>
              <input
                type="range"
                min={DEFAULT_RANGE_LOW}
                max={DEFAULT_RANGE_HIGH}
                value={settings.noteRangeLow}
                onChange={(e) => handleRangeChange("noteRangeLow", parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">High</label>
              <input
                type="range"
                min={DEFAULT_RANGE_LOW}
                max={DEFAULT_RANGE_HIGH}
                value={settings.noteRangeHigh}
                onChange={(e) => handleRangeChange("noteRangeHigh", parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.includeAccidentals}
              onChange={(e) => updateSettings({ includeAccidentals: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm text-gray-700">Include accidentals (sharps/flats)</span>
          </label>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.autoAdvance}
              onChange={(e) => updateSettings({ autoAdvance: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm text-gray-700">Auto-advance after correct answer</span>
          </label>
        </div>
      </div>
    </div>
  );
}


