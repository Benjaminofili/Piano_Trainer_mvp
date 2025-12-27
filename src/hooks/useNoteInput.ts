import { useEffect } from "react";
import { setNoteEventCallback } from "../lib/midi/MidiManager";
import { handleNoteEvent } from "../lib/input/InputHandler";

/**
 * Hook to subscribe to unified note input events
 * This connects MIDI events to the InputHandler
 */
export function useNoteInput() {
  useEffect(() => {
    // Set up MIDI callback to route through InputHandler
    setNoteEventCallback(handleNoteEvent);

    return () => {
      // Cleanup: remove callback
      setNoteEventCallback(() => {});
    };
  }, []);
}


