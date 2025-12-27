import React from "react";
import { useMidi } from "../../hooks/useMidi";
import { Button } from "../common/Button";
import { StatusIndicator } from "../common/StatusIndicator";

export function MidiConnection() {
  const { status, availableDevices, selectedDeviceId, isSupported, requestAccess, selectDevice, disconnect } = useMidi();

  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-900 font-medium">
          MIDI is only available in Chrome/Edge desktop. Virtual keyboard is available.
        </p>
      </div>
    );
  }

  if (status === "unsupported") {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <StatusIndicator status="unsupported" />
      </div>
    );
  }

  if (status === "disconnected" || status === "connecting") {
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <StatusIndicator status={status} />
          <Button onClick={requestAccess} disabled={status === "connecting"}>
            {status === "connecting" ? "Connecting..." : "Connect MIDI Device"}
          </Button>
        </div>
        {availableDevices.length > 0 && (
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Select Device:
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={selectedDeviceId || ""}
              onChange={(e) => selectDevice(e.target.value)}
            >
              <option value="">-- Select a device --</option>
              {availableDevices.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  }

  if (status === "connected") {
    const selectedDevice = availableDevices.find((d) => d.id === selectedDeviceId);
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center justify-between">
          <StatusIndicator status="connected" label={`Connected: ${selectedDevice?.name || "Unknown"}`} />
          <Button variant="secondary" onClick={disconnect}>
            Disconnect
          </Button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <StatusIndicator status="error" label="Connection error. Please try again." />
        <Button variant="secondary" onClick={requestAccess} className="mt-2">
          Retry
        </Button>
      </div>
    );
  }

  return null;
}


