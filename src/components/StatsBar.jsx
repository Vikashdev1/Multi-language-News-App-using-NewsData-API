import React from 'react';
import './StatsBar.css';

const StatsBar = ({ count, language, category, query, languages, categories }) => {
  const langLabel = languages.find(l => l.code === language);
  const catLabel = categories.find(c => c.id === category);

  return (
    <div className="statsbar">
      <div className="statsbar__count">
        <span className="statsbar__num">{count}</span>
        <span className="statsbar__label">stories</span>
      </div>
      <div className="statsbar__filters">
        {langLabel && (
          <span className="statsbar__tag">
            {langLabel.flag} {langLabel.label}
          </span>
        )}
        {catLabel && catLabel.id && (
          <span className="statsbar__tag">
            {catLabel.icon} {catLabel.label}
          </span>
        )}
        {query && (
          <span className="statsbar__tag statsbar__tag--query">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            {query}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsBar;
