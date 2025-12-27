// Note types
export type MidiNumber = number;
export type NoteName = string; // e.g., "C4", "F#5"

export interface NoteEvent {
  type: "noteOn" | "noteOff";
  midiNumber: MidiNumber;
  noteName: NoteName;
  velocity: number;
  timestamp: number;
  source: "midi" | "virtual" | "keyboard";
}

// Audio types
export type AudioStatus = "uninitialized" | "ready" | "error";

// MIDI types
export type MidiConnectionStatus = "unsupported" | "disconnected" | "connecting" | "connected" | "error";

export interface MidiDevice {
  id: string;
  name: string;
}

// Exercise types
export interface ExerciseQuestion {
  targetMidiNumber: MidiNumber;
  targetNoteName: NoteName;
  startTime: number;
}

export interface SessionStats {
  questionsAnswered: number;
  correctAnswers: number;
  averageResponseTimeMs: number;
  currentStreak: number;
  bestStreak: number;
}

export interface ExerciseSettings {
  noteRangeLow: MidiNumber;
  noteRangeHigh: MidiNumber;
  includeAccidentals: boolean;
  autoAdvance: boolean;
  autoAdvanceDelayMs: number;
}


