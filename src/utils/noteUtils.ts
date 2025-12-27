import { NOTE_NAMES } from "../constants/notes";
import type { MidiNumber, NoteName } from "../types";

/**
 * Convert MIDI note number (0-127) to note name (e.g., "C4")
 */
export function midiToNoteName(midiNumber: MidiNumber): NoteName {
  const noteIndex = midiNumber % 12;
  const octave = Math.floor(midiNumber / 12) - 1;
  const noteName = NOTE_NAMES[noteIndex];
  return `${noteName}${octave}`;
}

/**
 * Convert note name (e.g., "C4") to MIDI note number
 */
export function noteNameToMidi(noteName: NoteName): MidiNumber {
  // Parse note name (e.g., "C4", "F#5", "Bb3")
  const match = noteName.match(/^([A-G])([#b]?)(\d+)$/);
  if (!match) {
    throw new Error(`Invalid note name: ${noteName}`);
  }

  const [, baseNote, accidental, octaveStr] = match;
  const octave = parseInt(octaveStr, 10);

  // Find base note index
  let noteIndex = NOTE_NAMES.findIndex((n) => n.startsWith(baseNote));
  
  // Handle flats by converting to sharps (enharmonic equivalent)
  if (accidental === "b") {
    noteIndex = (noteIndex - 1 + 12) % 12;
  } else if (accidental === "#") {
    // Already correct, but ensure we get the sharp version
    const sharpNote = baseNote + "#";
    noteIndex = NOTE_NAMES.findIndex((n) => n === sharpNote);
    if (noteIndex === -1) {
      // Fallback: find base note and add 1
      noteIndex = NOTE_NAMES.findIndex((n) => n.startsWith(baseNote));
      noteIndex = (noteIndex + 1) % 12;
    }
  }

  // Calculate MIDI number: (octave + 1) * 12 + noteIndex
  return (octave + 1) * 12 + noteIndex;
}

/**
 * Get detailed information about a MIDI note
 */
export function getNoteInfo(midiNumber: MidiNumber): {
  name: string;
  octave: number;
  isAccidental: boolean;
} {
  const noteIndex = midiNumber % 12;
  const octave = Math.floor(midiNumber / 12) - 1;
  const noteName = NOTE_NAMES[noteIndex];
  const isAccidental = noteName.includes("#");

  return {
    name: noteName,
    octave,
    isAccidental,
  };
}


