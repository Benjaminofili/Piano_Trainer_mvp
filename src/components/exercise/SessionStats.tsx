import React from "react";
import { useAppStore } from "../../stores/useAppStore";

export function SessionStats() {
  const session = useAppStore((state) => state.exercise.session);

  const accuracy = session.questionsAnswered > 0
    ? Math.round((session.correctAnswers / session.questionsAnswered) * 100)
    : 0;

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Session Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-800 font-medium">Questions</div>
          <div className="text-2xl font-bold text-gray-900">{session.questionsAnswered}</div>
        </div>
        <div>
          <div className="text-sm text-gray-800 font-medium">Correct</div>
          <div className="text-2xl font-bold text-green-700">{session.correctAnswers}</div>
        </div>
        <div>
          <div className="text-sm text-gray-800 font-medium">Accuracy</div>
          <div className="text-2xl font-bold text-gray-900">{accuracy}%</div>
        </div>
        <div>
          <div className="text-sm text-gray-800 font-medium">Current Streak</div>
          <div className="text-2xl font-bold text-blue-700">{session.currentStreak}</div>
        </div>
        <div>
          <div className="text-sm text-gray-800 font-medium">Best Streak</div>
          <div className="text-2xl font-bold text-gray-900">{session.bestStreak}</div>
        </div>
        <div>
          <div className="text-sm text-gray-800 font-medium">Avg Response</div>
          <div className="text-2xl font-bold text-gray-900">
            {session.averageResponseTimeMs > 0
              ? `${Math.round(session.averageResponseTimeMs)}ms`
              : "—"}
          </div>
        </div>
      </div>
    </div>
  );
}


