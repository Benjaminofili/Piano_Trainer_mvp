import { useEffect } from "react";
import { initializeAudio, setVolume, isAudioInitialized } from "../lib/audio/AudioManager";
import { useAppStore } from "../stores/useAppStore";

export function useAudio() {
  const audio = useAppStore((state) => state.audio);
  const audioActions = useAppStore((state) => state.audioActions);

  const handleInitialize = async () => {
    try {
      await initializeAudio();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to initialize audio";
      audioActions.setError(errorMessage);
    }
  };

  const handleSetVolume = (volume: number) => {
    setVolume(volume);
    audioActions.setVolume(volume);
  };

  return {
    status: audio.status,
    volume: audio.volume,
    error: audio.error,
    isInitialized: isAudioInitialized(),
    initialize: handleInitialize,
    setVolume: handleSetVolume,
  };
}


