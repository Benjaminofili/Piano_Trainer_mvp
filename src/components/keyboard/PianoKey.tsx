import React, { memo } from "react";

interface PianoKeyProps {
  midiNumber: number;
  noteName: string;
  isBlack: boolean;
  isPressed: boolean;
  isTarget: boolean;
  style?: React.CSSProperties;
  onPointerDown: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerLeave: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerCancel: (event: React.PointerEvent<HTMLElement>) => void;
}

export const PianoKey = memo(function PianoKey({
  midiNumber,
  noteName,
  isBlack,
  isPressed,
  isTarget,
  style,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
}: PianoKeyProps) {
  const baseClasses = "relative border border-gray-300 transition-all duration-75 touch-none";
  
  const whiteKeyClasses = `bg-white hover:bg-gray-100 ${
    isPressed ? "bg-blue-200 scale-95" : ""
  } ${isTarget ? "ring-4 ring-yellow-400 ring-opacity-50" : ""}`;
  
  const blackKeyClasses = `bg-gray-800 hover:bg-gray-700 z-10 ${
    isPressed ? "bg-blue-600 scale-95" : ""
  } ${isTarget ? "ring-4 ring-yellow-400 ring-opacity-50" : ""}`;

  return (
    <div
      data-note={midiNumber}
      className={`${baseClasses} ${isBlack ? blackKeyClasses : whiteKeyClasses}`}
      style={style}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerCancel}
      role="button"
      tabIndex={-1}
      aria-label={`Piano key ${noteName}`}
    >
      {isBlack && (
        <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-xs">
          {noteName}
        </span>
      )}
    </div>
  );
});


