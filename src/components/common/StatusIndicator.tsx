import React from "react";

interface StatusIndicatorProps {
  status: "connected" | "disconnected" | "connecting" | "error" | "unsupported";
  label?: string;
}

export function StatusIndicator({ status, label }: StatusIndicatorProps) {
  const statusColors = {
    connected: "bg-green-500",
    disconnected: "bg-gray-400",
    connecting: "bg-yellow-500",
    error: "bg-red-500",
    unsupported: "bg-gray-400",
  };

  const statusLabels = {
    connected: "Connected",
    disconnected: "Disconnected",
    connecting: "Connecting...",
    error: "Error",
    unsupported: "Not Supported",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
      <span className="text-sm text-gray-700">{label || statusLabels[status]}</span>
    </div>
  );
}


