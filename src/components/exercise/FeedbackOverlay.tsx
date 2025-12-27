import React, { useEffect, useState } from "react";
import { useAppStore } from "../../stores/useAppStore";

export function FeedbackOverlay() {
  const lastAnswerCorrect = useAppStore((state) => state.exercise.lastAnswerCorrect);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (lastAnswerCorrect !== null) {
      setShowFeedback(true);
      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [lastAnswerCorrect]);

  if (!showFeedback || lastAnswerCorrect === null) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div
        className={`text-6xl font-bold transition-opacity duration-300 ${
          lastAnswerCorrect ? "text-green-500" : "text-red-500"
        }`}
      >
        {lastAnswerCorrect ? "✓" : "✗"}
      </div>
    </div>
  );
}


