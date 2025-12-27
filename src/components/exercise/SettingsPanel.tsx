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
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Note Range: {midiToNoteName(settings.noteRangeLow)} - {midiToNoteName(settings.noteRangeHigh)}
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-800 font-medium mb-1">Low</label>
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
              <label className="block text-xs text-gray-800 font-medium mb-1">High</label>
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
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.includeAccidentals}
              onChange={(e) => {
                console.log("Include accidentals changed:", e.target.checked);
                updateSettings({ includeAccidentals: e.target.checked });
              }}
              className="rounded w-4 h-4"
            />
            <span className="text-sm text-gray-900">Include accidentals (sharps/flats)</span>
          </label>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoAdvance}
              onChange={(e) => {
                console.log("Auto-advance changed:", e.target.checked);
                updateSettings({ autoAdvance: e.target.checked });
              }}
              className="rounded w-4 h-4"
            />
            <span className="text-sm text-gray-900">Auto-advance after correct answer</span>
          </label>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showTargetOnKeyboard}
              onChange={(e) => {
                console.log("Show target on keyboard changed:", e.target.checked);
                updateSettings({ showTargetOnKeyboard: e.target.checked });
              }}
              className="rounded w-4 h-4"
            />
            <span className="text-sm text-gray-900">Show target note highlight on keyboard</span>
          </label>
        </div>
      </div>
    </div>
  );
}


