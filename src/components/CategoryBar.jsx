import React, { useRef } from 'react';
import './CategoryBar.css';

const CategoryBar = ({
  categories, selected, onSelect, country, onCountryChange, countries,
  mode, onModeChange, showSaved, onToggleSaved, savedCount = 0,
}) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: dir * 200, behavior: 'smooth' });
  };

  return (
    <div className="catbar">
      <div className="catbar__inner">
        <button className="catbar__arrow catbar__arrow--left" onClick={() => scroll(-1)} aria-label="Scroll left">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="catbar__scroll" ref={scrollRef}>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`catbar__pill ${selected === cat.id ? 'catbar__pill--active' : ''}`}
              onClick={() => onSelect(cat.id)}
            >
              <span className="catbar__pill-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <button className="catbar__arrow catbar__arrow--right" onClick={() => scroll(1)} aria-label="Scroll right">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        <div className="catbar__divider" />

        <button
          className={`catbar__toggle ${mode === 'latest' ? 'catbar__toggle--active' : ''}`}
          onClick={() => onModeChange?.(mode === 'latest' ? 'news' : 'latest')}
          title="Show latest breaking news (NewsData.io /latest endpoint)"
        >
          <span className="catbar__toggle-pulse" />
          Breaking
        </button>

        <button
          className={`catbar__toggle ${showSaved ? 'catbar__toggle--active' : ''}`}
          onClick={onToggleSaved}
          title="Show saved articles"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill={showSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
          Saved{savedCount > 0 ? ` (${savedCount})` : ''}
        </button>

        <div className="catbar__country">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <select
            value={country}
            onChange={e => onCountryChange(e.target.value)}
            className="catbar__country-select"
          >
            {countries.map(c => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
