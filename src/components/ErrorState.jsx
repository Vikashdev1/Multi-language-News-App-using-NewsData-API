import React from 'react';
import './ErrorState.css';

const ErrorState = ({ message, onRetry }) => (
  <div className="error-state">
    <div className="error-state__icon">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    </div>
    <h3 className="error-state__title">Something went wrong</h3>
    <p className="error-state__msg">{message || 'Failed to load news. Please check your API key and try again.'}</p>
    {onRetry && (
      <button className="error-state__btn" onClick={onRetry}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10"/>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
        </svg>
        Try Again
      </button>
    )}
  </div>
);

export default ErrorState;
