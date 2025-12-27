import React, { useState } from "react";
import { useAudio } from "../../hooks/useAudio";
import { Button } from "../common/Button";
import { MidiConnection } from "../midi/MidiConnection";
import { useAppStore } from "../../stores/useAppStore";
import { PIANO_61_LOW, PIANO_61_HIGH, PIANO_76_LOW, PIANO_76_HIGH, PIANO_88_LOW, PIANO_88_HIGH } from "../../constants/notes";

export function StartScreen() {
  const { status, initialize, isInitialized } = useAudio();
  const { updateSettings } = useAppStore((state) => state.exerciseActions);
  const [pianoRange, setPianoRange] = useState<"61" | "76" | "88">("61");
  const [displayMode, setDisplayMode] = useState<"keyboard" | "staff" | "both">("keyboard");

  const handleStart = async () => {
    // Set piano range based on selection
    if (pianoRange === "61") {
      updateSettings({
        noteRangeLow: PIANO_61_LOW,
        noteRangeHigh: PIANO_61_HIGH,
        pianoRange: "61",
        displayMode,
      });
    } else if (pianoRange === "76") {
      updateSettings({
        noteRangeLow: PIANO_76_LOW,
        noteRangeHigh: PIANO_76_HIGH,
        pianoRange: "76",
        displayMode,
      });
    } else {
      updateSettings({
        noteRangeLow: PIANO_88_LOW,
        noteRangeHigh: PIANO_88_HIGH,
        pianoRange: "88",
        displayMode,
      });
    }
    await initialize();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Piano Trainer</h1>
          <p className="text-lg text-gray-700 mb-2">
            Practice note recognition with your MIDI keyboard or virtual keyboard
          </p>
          <p className="text-sm text-gray-600">
            For MIDI support, please use Chrome or Edge desktop browser
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Piano Range (starting from C1)
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                <input
                  type="radio"
                  name="pianoRange"
                  value="61"
                  checked={pianoRange === "61"}
                  onChange={(e) => setPianoRange(e.target.value as "61" | "76" | "88")}
                  className="rounded"
                />
                <span className="text-sm text-gray-900">61 keys (5 octaves: C1 to C6)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                <input
                  type="radio"
                  name="pianoRange"
                  value="76"
                  checked={pianoRange === "76"}
                  onChange={(e) => setPianoRange(e.target.value as "61" | "76" | "88")}
                  className="rounded"
                />
                <span className="text-sm text-gray-900">76 keys (6.5 octaves: C1 to F#6)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                <input
                  type="radio"
                  name="pianoRange"
                  value="88"
                  checked={pianoRange === "88"}
                  onChange={(e) => setPianoRange(e.target.value as "61" | "76" | "88")}
                  className="rounded"
                />
                <span className="text-sm text-gray-900">88 keys (7 octaves: C1 to C8)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Display Mode
            </label>
            <select
              value={displayMode}
              onChange={(e) => setDisplayMode(e.target.value as "keyboard" | "staff" | "both")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
            >
              <option value="keyboard">Keyboard Highlight</option>
              <option value="staff">Staff Notation</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <MidiConnection />
        </div>

        <div className="text-center">
          {!isInitialized ? (
            <Button
              onClick={handleStart}
              variant="primary"
              className="text-lg px-8 py-3"
              disabled={status === "ready"}
            >
              {status === "ready" ? "Audio Ready" : "Start Practice"}
            </Button>
          ) : (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-900 font-medium">Audio initialized! You can start practicing.</p>
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-900">Failed to initialize audio. Please check your browser settings.</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-sm text-gray-800">
          <h3 className="font-semibold mb-2">How to use:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Select your piano range and display mode</li>
            <li>Click "Start Practice" to initialize audio</li>
            <li>Connect a MIDI keyboard (optional, Chrome/Edge only)</li>
            <li>Or use the virtual keyboard on screen</li>
            <li>Practice recognizing notes highlighted on the keyboard or staff</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
