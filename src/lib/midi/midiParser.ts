import type { NoteEvent } from "../../types";
import { midiToNoteName } from "../../utils/noteUtils";

/**
 * Parse a MIDI message and convert it to a normalized NoteEvent
 */
export function parseMidiMessage(data: Uint8Array, timestamp: number): NoteEvent | null {
  if (data.length < 3) {
    return null;
  }

  const [status, note, velocity] = data;

  // Check if this is a Note On or Note Off message
  // Note On: 144-159 (0x90-0x9F)
  // Note Off: 128-143 (0x80-0x8F)
  const messageType = status & 0xF0;

  if (messageType === 0x90) {
    // Note On
    // Note: velocity 0 is treated as Note Off
    if (velocity === 0) {
      return {
        type: "noteOff",
        midiNumber: note,
        noteName: midiToNoteName(note),
        velocity: 0,
        timestamp,
        source: "midi",
      };
    }

    return {
      type: "noteOn",
      midiNumber: note,
      noteName: midiToNoteName(note),
      velocity,
      timestamp,
      source: "midi",
    };
  } else if (messageType === 0x80) {
    // Note Off
    return {
      type: "noteOff",
      midiNumber: note,
      noteName: midiToNoteName(note),
      velocity: 0,
      timestamp,
      source: "midi",
    };
  }

  // Not a note message we care about
  return null;
}


