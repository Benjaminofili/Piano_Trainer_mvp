import { useAppStore } from "../../stores/useAppStore";
import { parseMidiMessage } from "./midiParser";
import type { NoteEvent } from "../../types";

let midiAccess: MIDIAccess | null = null;
let currentInput: MIDIInput | null = null;
let noteEventCallback: ((event: NoteEvent) => void) | null = null;

/**
 * Check if Web MIDI API is supported
 */
export function isMidiSupported(): boolean {
  return typeof navigator !== "undefined" && "requestMIDIAccess" in navigator;
}

/**
 * Request MIDI access and enumerate devices
 */
export async function requestMidiAccess(): Promise<void> {
  if (!isMidiSupported()) {
    useAppStore.getState().midiActions.setStatus("unsupported");
    useAppStore.getState().midiActions.setIsSupported(false);
    return;
  }

  try {
    useAppStore.getState().midiActions.setStatus("connecting");

    midiAccess = await navigator.requestMIDIAccess({ sysex: false });

    // Enumerate devices
    const devices: Array<{ id: string; name: string }> = [];
    midiAccess.inputs.forEach((input) => {
      devices.push({ id: input.id, name: input.name });
    });

    useAppStore.getState().midiActions.setAvailableDevices(devices);
    useAppStore.getState().midiActions.setStatus("disconnected");

    // Listen for device changes
    midiAccess.addEventListener("statechange", handleStateChange);

    // If there's only one device, auto-select it
    if (devices.length === 1) {
      selectDevice(devices[0].id);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to access MIDI";
    console.error("MIDI access error:", error);
    useAppStore.getState().midiActions.setStatus("error");
    throw error;
  }
}

/**
 * Select a MIDI input device
 */
export function selectDevice(deviceId: string): void {
  if (!midiAccess) {
    throw new Error("MIDI access not initialized. Call requestMidiAccess() first.");
  }

  // Disconnect previous input
  if (currentInput) {
    currentInput.removeEventListener("midimessage", handleMidiMessage);
    currentInput = null;
  }

  // Find and connect to the selected device
  const input = midiAccess.inputs.get(deviceId);
  if (!input) {
    throw new Error(`MIDI device not found: ${deviceId}`);
  }

  currentInput = input;
  currentInput.addEventListener("midimessage", handleMidiMessage);

  useAppStore.getState().midiActions.selectDevice(deviceId);
  useAppStore.getState().midiActions.setStatus("connected");
}

/**
 * Disconnect from the current MIDI device
 */
export function disconnect(): void {
  if (currentInput) {
    currentInput.removeEventListener("midimessage", handleMidiMessage);
    currentInput = null;
  }

  useAppStore.getState().midiActions.disconnect();
  useAppStore.getState().midiActions.setStatus("disconnected");
}

/**
 * Set callback for note events
 */
export function setNoteEventCallback(callback: (event: NoteEvent) => void): void {
  noteEventCallback = callback;
}

/**
 * Handle incoming MIDI messages
 */
function handleMidiMessage(event: MIDIMessageEvent): void {
  const noteEvent = parseMidiMessage(event.data, performance.now());
  if (noteEvent && noteEventCallback) {
    noteEventCallback(noteEvent);
  }
}

/**
 * Handle MIDI device state changes (connect/disconnect)
 */
function handleStateChange(): void {
  if (!midiAccess) {
    return;
  }

  // Re-enumerate devices
  const devices: Array<{ id: string; name: string }> = [];
  midiAccess.inputs.forEach((input) => {
    devices.push({ id: input.id, name: input.name });
  });

  useAppStore.getState().midiActions.setAvailableDevices(devices);

  // If current device was disconnected, update status
  const selectedDeviceId = useAppStore.getState().midi.selectedDeviceId;
  if (selectedDeviceId && !devices.find((d) => d.id === selectedDeviceId)) {
    disconnect();
  }
}


