import React from 'react';
import './EmptyState.css';

const EmptyState = ({ query, onClear }) => (
  <div className="empty-state">
    <div className="empty-state__icon">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    </div>
    <h3 className="empty-state__title">No stories found</h3>
    <p className="empty-state__msg">
      {query
        ? `No results for "${query}". Try different keywords or adjust the filters.`
        : 'No articles available for the selected filters. Try a different category or language.'}
    </p>
    {onClear && (
      <button className="empty-state__btn" onClick={onClear}>
        Clear Filters
      </button>
    )}
  </div>
);

export default EmptyState;
