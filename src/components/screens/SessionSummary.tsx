import React from "react";
import { useAppStore } from "../../stores/useAppStore";
import { Button } from "../common/Button";

interface SessionSummaryProps {
  onPracticeAgain: () => void;
}

export function SessionSummary({ onPracticeAgain }: SessionSummaryProps) {
  const session = useAppStore((state) => state.exercise.session);

  const accuracy = session.questionsAnswered > 0
    ? Math.round((session.correctAnswers / session.questionsAnswered) * 100)
    : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Session Complete!</h2>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{session.questionsAnswered}</div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{session.bestStreak}</div>
            <div className="text-sm text-gray-600">Best Streak</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {session.averageResponseTimeMs > 0
                ? `${Math.round(session.averageResponseTimeMs)}ms`
                : "—"}
            </div>
            <div className="text-sm text-gray-600">Avg Response</div>
          </div>
        </div>

        <div className="text-center">
          <Button onClick={onPracticeAgain} variant="primary" className="text-lg px-8 py-3">
            Practice Again
          </Button>
        </div>
      </div>
    </div>
  );
}


