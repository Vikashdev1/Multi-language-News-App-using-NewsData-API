import React, { useState } from 'react';
import './ApiKeyBanner.css';

const ApiKeyBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="apibanner">
      <div className="apibanner__inner">
        <div className="apibanner__icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
          </svg>
        </div>
        <div className="apibanner__content">
          <strong>API Key Required</strong>
          <span>
            Copy <code>.env.example</code> to <code>.env</code> and add your{' '}
            <a href="https://newsdata.io/register" target="_blank" rel="noopener noreferrer">
              NewsData.io API key
            </a>{' '}
            to <code>REACT_APP_NEWSDATA_API_KEY</code>.
          </span>
        </div>
        <button className="apibanner__close" onClick={() => setDismissed(true)} aria-label="Dismiss">✕</button>
      </div>
    </div>
  );
};

export default ApiKeyBanner;
