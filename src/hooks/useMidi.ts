import { useEffect } from "react";
import {
  requestMidiAccess,
  selectDevice,
  disconnect,
  setNoteEventCallback,
  isMidiSupported,
} from "../lib/midi/MidiManager";
import { handleNoteEvent } from "../lib/input/InputHandler";
import { useAppStore } from "../stores/useAppStore";

export function useMidi() {
  const midi = useAppStore((state) => state.midi);
  const midiActions = useAppStore((state) => state.midiActions);

  useEffect(() => {
    // Check MIDI support on mount
    const supported = isMidiSupported();
    midiActions.setIsSupported(supported);
    if (!supported) {
      midiActions.setStatus("unsupported");
    }

    // Set up note event callback
    setNoteEventCallback(handleNoteEvent);

    return () => {
      // Cleanup on unmount
      disconnect();
    };
  }, []);

  const handleRequestAccess = async () => {
    try {
      await requestMidiAccess();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to access MIDI";
      console.error("MIDI access error:", error);
      midiActions.setStatus("error");
    }
  };

  const handleSelectDevice = (deviceId: string) => {
    try {
      selectDevice(deviceId);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to select device";
      console.error("Device selection error:", error);
      midiActions.setStatus("error");
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return {
    status: midi.status,
    availableDevices: midi.availableDevices,
    selectedDeviceId: midi.selectedDeviceId,
    isSupported: midi.isSupported,
    requestAccess: handleRequestAccess,
    selectDevice: handleSelectDevice,
    disconnect: handleDisconnect,
  };
}


