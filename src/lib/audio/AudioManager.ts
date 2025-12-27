import * as Tone from "tone";
import { useAppStore } from "../../stores/useAppStore";

let synth: Tone.PolySynth | null = null;
let isInitialized = false;

/**
 * Initialize the audio system (must be called after user interaction)
 */
export async function initializeAudio(): Promise<void> {
  if (isInitialized) {
    return;
  }

  try {
    // Start the audio context (required by browser autoplay policy)
    await Tone.start();

    // Create a polyphonic synthesizer
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "sine",
      },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.5,
        release: 0.3,
      },
    }).toDestination();

    // Set initial volume
    const volume = useAppStore.getState().audio.volume;
    synth.volume.value = Tone.gainToDb(volume);

    isInitialized = true;
    useAppStore.getState().audioActions.initializeAudio();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to initialize audio";
    useAppStore.getState().audioActions.setError(errorMessage);
    throw error;
  }
}

/**
 * Reset the audio system (for returning to start screen)
 */
export function resetAudio(): void {
  if (synth) {
    synth.dispose();
    synth = null;
  }
  isInitialized = false;
  useAppStore.getState().audioActions.reset();
}

/**
 * Play a note
 */
export function playNote(midiNumber: number, velocity: number = 100): void {
  if (!synth || !isInitialized) {
    console.warn("Audio not initialized. Call initializeAudio() first.");
    return;
  }

  // Convert MIDI note number to frequency
  const frequency = Tone.Frequency(midiNumber, "midi").toFrequency();
  const normalizedVelocity = Math.max(0, Math.min(1, velocity / 127));

  synth.triggerAttackRelease(frequency, "8n", undefined, normalizedVelocity);
}

/**
 * Stop a note
 */
export function stopNote(midiNumber: number): void {
  if (!synth || !isInitialized) {
    return;
  }

  const frequency = Tone.Frequency(midiNumber, "midi").toFrequency();
  synth.triggerRelease(frequency);
}

/**
 * Set the master volume (0-1)
 */
export function setVolume(volume: number): void {
  if (!synth) {
    return;
  }

  const clampedVolume = Math.max(0, Math.min(1, volume));
  synth.volume.value = Tone.gainToDb(clampedVolume);
  useAppStore.getState().audioActions.setVolume(clampedVolume);
}

/**
 * Check if audio is initialized
 */
export function isAudioInitialized(): boolean {
  return isInitialized;
}