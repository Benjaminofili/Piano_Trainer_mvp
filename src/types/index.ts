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
  showTargetOnKeyboard: boolean; // Whether to highlight target note on keyboard
  displayMode: "keyboard" | "staff" | "both"; // How to display the target note
  pianoRange: "61" | "76" | "88"; // Piano range preset (5, 6.5, or 7 octaves from C1)
}


