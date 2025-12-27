import type { NoteEvent } from "../../types";
import { playNote, stopNote } from "../audio/AudioManager";
import { useAppStore } from "../../stores/useAppStore";

/**
 * Handle a normalized note event from any input source
 * This is the single canonical entry point for all note events
 */
export function handleNoteEvent(event: NoteEvent): void {
  // Trigger audio playback first (for immediate feedback)
  if (event.type === "noteOn") {
    playNote(event.midiNumber, event.velocity);
  } else if (event.type === "noteOff") {
    stopNote(event.midiNumber);
  }

  // Update exercise state (validate answer if exercise is active)
  const { exercise, exerciseActions } = useAppStore.getState();
  if (exercise.isActive && exercise.currentQuestion && event.type === "noteOn") {
    exerciseActions.submitAnswer(event.midiNumber);
  }

  // UI feedback is handled by components listening to store changes
  // No need to explicitly update UI here
}

