import React from "react";
import { useAudio } from "../../hooks/useAudio";
import { Button } from "../common/Button";
import { MidiConnection } from "../midi/MidiConnection";

export function StartScreen() {
  const { status, initialize, isInitialized } = useAudio();

  const handleStart = async () => {
    await initialize();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Piano Trainer</h1>
          <p className="text-lg text-gray-600 mb-2">
            Practice note recognition with your MIDI keyboard or virtual keyboard
          </p>
          <p className="text-sm text-gray-500">
            For MIDI support, please use Chrome or Edge desktop browser
          </p>
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
              <p className="text-green-800 font-medium">Audio initialized! You can start practicing.</p>
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">Failed to initialize audio. Please check your browser settings.</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-sm text-gray-600">
          <h3 className="font-semibold mb-2">How to use:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Click "Start Practice" to initialize audio</li>
            <li>Connect a MIDI keyboard (optional, Chrome/Edge only)</li>
            <li>Or use the virtual keyboard on screen</li>
            <li>Practice recognizing notes highlighted on the keyboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


