import type { MidiNumber } from "../types";
import { getNoteInfo } from "./noteUtils";

/**
 * Generate a random MIDI note number within the specified range
 */
export function generateRandomNote(
  range: { lowMidi: MidiNumber; highMidi: MidiNumber },
  includeAccidentals: boolean
): MidiNumber {
  const { lowMidi, highMidi } = range;
  const candidates: MidiNumber[] = [];

  // Collect all notes in range
  for (let midi = lowMidi; midi <= highMidi; midi++) {
    const noteInfo = getNoteInfo(midi);
    if (includeAccidentals || !noteInfo.isAccidental) {
      candidates.push(midi);
    }
  }

  if (candidates.length === 0) {
    throw new Error("No valid notes in range with current settings");
  }

  // Return random note from candidates
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}


