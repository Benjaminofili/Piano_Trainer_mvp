export const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;

export const MIDI_MIDDLE_C = 60;
export const MIDI_A4 = 69; // 440Hz tuning reference

// Standard 88-key piano range
export const PIANO_LOWEST = 21;  // A0
export const PIANO_HIGHEST = 108; // C8

// Piano ranges starting from C1 (MIDI 24)
// Based on the image: 88 keys from A0, B0, C1 to C8
// But user wants to start from C1 and extend by octaves

// C1 = MIDI 24
export const MIDI_C1 = 24;

// 5 octaves from C1: C1 (24) to C6 (84) = 61 keys
export const PIANO_61_LOW = 24;  // C1
export const PIANO_61_HIGH = 84; // C6

// 6.5 octaves from C1: C1 (24) to F#6 (90) = 76 keys
export const PIANO_76_LOW = 24;  // C1
export const PIANO_76_HIGH = 90; // F#6

// 7 octaves from C1: C1 (24) to C7 (96) = 73 keys
// But 88-key piano goes to C8 (108), so for 7 octaves we'll use C1 to C8
export const PIANO_88_LOW = 24;  // C1
export const PIANO_88_HIGH = 108; // C8

// Default exercise range (2 octaves around middle C)
export const DEFAULT_RANGE_LOW = 48;  // C3
export const DEFAULT_RANGE_HIGH = 72; // C5

// Default settings
export const DEFAULT_AUTO_ADVANCE_DELAY = 1000; // ms
