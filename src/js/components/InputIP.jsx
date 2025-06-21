import React from 'react';

function InputIP({ label, value, onChange }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-text-light font-medium">
        {label}
      </label>
      <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-dark-blue/30 border border-border-blue/30 rounded-lg text-text-light placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-light-blue/50 focus:border-transparent transition-all duration-200"
        placeholder="E.g., 192.168.1.0"
          pattern="^(\d{1,3}\.){3}\d{1,3}$"
      />
        <div className="absolute inset-0 rounded-lg pointer-events-none ring-1 ring-inset ring-border-blue/30"></div>
      </div>
    </div>
  );
}

export default InputIP;