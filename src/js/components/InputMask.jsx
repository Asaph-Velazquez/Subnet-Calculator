import React from 'react';

function InputMask({ label, value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
      <label
        style={{
          width: '120px',
          textAlign: 'right',
          marginRight: '1rem',
          color: '#333',
          fontWeight: '600',
        }}
      >
        {label}:
      </label>
      <input
        type="number"
        value={value}
        min="0"
        max="32"
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          flex: 1,
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '0.5rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          fontSize: '1rem',
          maxWidth: '300px',
        }}
        placeholder="E.g., 24"
      />
    </div>
  );
}

export default InputMask;