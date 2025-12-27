import { useRef, useCallback } from "react";
import { handleNoteEvent } from "../lib/input/InputHandler";
import { midiToNoteName } from "../utils/noteUtils";
import type { NoteEvent } from "../types";

interface UsePianoKeyboardReturn {
  onPointerDown: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerLeave: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerCancel: (event: React.PointerEvent<HTMLElement>) => void;
  activePointers: React.MutableRefObject<Map<number, number>>;
}

export function usePianoKeyboard(): UsePianoKeyboardReturn {
  const activePointers = useRef<Map<number, number>>(new Map());

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const midiNumberStr = target.getAttribute("data-note");
    
    if (!midiNumberStr) {
      return;
    }

    const midiNumber = parseInt(midiNumberStr, 10);
    const pointerId = event.pointerId;

    // Store the pointer-to-note mapping
    activePointers.current.set(pointerId, midiNumber);

    // Create note event
    const noteEvent: NoteEvent = {
      type: "noteOn",
      midiNumber,
      noteName: midiToNoteName(midiNumber),
      velocity: 100, // Default velocity for virtual keyboard
      timestamp: performance.now(),
      source: "virtual",
    };

    handleNoteEvent(noteEvent);

    // Prevent default behaviors
    event.preventDefault();
  }, []);

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const pointerId = event.pointerId;
    const midiNumber = activePointers.current.get(pointerId);

    if (midiNumber !== undefined) {
      // Create note off event
      const noteEvent: NoteEvent = {
        type: "noteOff",
        midiNumber,
        noteName: midiToNoteName(midiNumber),
        velocity: 0,
        timestamp: performance.now(),
        source: "virtual",
      };

      handleNoteEvent(noteEvent);

      // Remove from active pointers
      activePointers.current.delete(pointerId);
    }

    event.preventDefault();
  }, []);

  const handlePointerLeave = useCallback((event: React.PointerEvent<HTMLElement>) => {
    // Treat pointer leave as note off
    handlePointerUp(event);
  }, [handlePointerUp]);

  const handlePointerCancel = useCallback((event: React.PointerEvent<HTMLElement>) => {
    // Treat pointer cancel as note off
    handlePointerUp(event);
  }, [handlePointerUp]);

  return {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerLeave: handlePointerLeave,
    onPointerCancel: handlePointerCancel,
    activePointers,
  };
}
