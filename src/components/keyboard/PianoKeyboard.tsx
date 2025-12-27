import React, { useMemo, useState, useEffect } from "react";
import { PianoKey } from "./PianoKey";
import { usePianoKeyboard } from "../../hooks/usePianoKeyboard";
import { getNoteInfo } from "../../utils/noteUtils";
import { DEFAULT_RANGE_LOW, DEFAULT_RANGE_HIGH } from "../../constants/notes";
import { useAppStore } from "../../stores/useAppStore";

interface PianoKeyboardProps {
  lowMidi?: number;
  highMidi?: number;
}

export function PianoKeyboard({ 
  lowMidi = DEFAULT_RANGE_LOW, 
  highMidi = DEFAULT_RANGE_HIGH 
}: PianoKeyboardProps) {
  const keyboardHandlers = usePianoKeyboard();
  const currentQuestion = useAppStore((state) => state.exercise.currentQuestion);
  const showTargetOnKeyboard = useAppStore((state) => state.exercise.settings.showTargetOnKeyboard);
  const [pressedKeys, setPressedKeys] = useState<Set<number>>(new Set());

  // Update pressed keys based on active pointers
  useEffect(() => {
    const updatePressedKeys = () => {
      const active = new Set(Array.from(keyboardHandlers.activePointers.current.values()));
      setPressedKeys(active);
    };

    // Update on pointer events
    const handlePointerEvent = () => {
      requestAnimationFrame(updatePressedKeys);
    };

    // Update periodically to reflect active pointers (fallback)
    const interval = setInterval(updatePressedKeys, 100);
    
    // Also update on any pointer activity
    document.addEventListener('pointerdown', handlePointerEvent);
    document.addEventListener('pointerup', handlePointerEvent);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('pointerdown', handlePointerEvent);
      document.removeEventListener('pointerup', handlePointerEvent);
    };
  }, [keyboardHandlers.activePointers]);

  // Generate keys with proper positioning
  const { whiteKeys, blackKeys } = useMemo(() => {
    const whites: Array<{
      midiNumber: number;
      noteName: string;
      index: number;
    }> = [];
    const blacks: Array<{
      midiNumber: number;
      noteName: string;
      whiteIndex: number; // Index of white key to the left
    }> = [];

    let whiteIndex = 0;

    for (let midi = lowMidi; midi <= highMidi; midi++) {
      const noteInfo = getNoteInfo(midi);
      const noteName = `${noteInfo.name}${noteInfo.octave}`;

      if (!noteInfo.isAccidental) {
        whites.push({
          midiNumber: midi,
          noteName,
          index: whiteIndex++,
        });
      } else {
        // Black key positioned between white keys
        blacks.push({
          midiNumber: midi,
          noteName,
          whiteIndex: whiteIndex - 1, // Position after the last white key
        });
      }
    }

    return { whiteKeys: whites, blackKeys: blacks };
  }, [lowMidi, highMidi]);

  const whiteKeyWidth = 100 / whiteKeys.length;

  return (
    <div 
      className="relative w-full h-[200px] bg-gray-200 rounded-lg overflow-hidden" 
      style={{ touchAction: "none" }}
    >
      {/* White keys */}
      {whiteKeys.map((key) => (
        <PianoKey
          key={key.midiNumber}
          midiNumber={key.midiNumber}
          noteName={key.noteName}
          isBlack={false}
          isPressed={pressedKeys.has(key.midiNumber)}
          isTarget={currentQuestion?.targetMidiNumber === key.midiNumber && showTargetOnKeyboard}
          style={{
            position: "absolute",
            left: `${key.index * whiteKeyWidth}%`,
            width: `${whiteKeyWidth}%`,
            height: "200px",
            bottom: 0,
          }}
          {...keyboardHandlers}
        />
      ))}

      {/* Black keys */}
      {blackKeys.map((key) => {
        const blackKeyWidth = whiteKeyWidth * 0.6;
        const leftOffset = (key.whiteIndex + 1) * whiteKeyWidth - blackKeyWidth / 2;
        
        return (
          <PianoKey
            key={key.midiNumber}
            midiNumber={key.midiNumber}
            noteName={key.noteName}
            isBlack={true}
            isPressed={pressedKeys.has(key.midiNumber)}
            isTarget={currentQuestion?.targetMidiNumber === key.midiNumber && showTargetOnKeyboard}
            style={{
              position: "absolute",
              left: `${leftOffset}%`,
              width: `${blackKeyWidth}%`,
              height: "120px",
              bottom: 0,
            }}
            {...keyboardHandlers}
          />
        );
      })}
    </div>
  );
}
