// RotatingSpinner.tsx
import React from 'react';
import './RotatingSpinner.css';

const RotatingSpinner: React.FC = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="spinner-border custom-spinner" role="status">
      </div>
    </div>
  );
};

export default RotatingSpinner;
