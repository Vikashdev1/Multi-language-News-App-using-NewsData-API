import React, { useState, useEffect } from 'react';
import './Header.css';

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const Header = ({ theme, toggleTheme, language, onLanguageChange, languages, searchQuery, onSearchChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const currentLang = languages.find(l => l.code === language);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <div className="header__logo">
          <div className="header__logo-mark">
            <span className="header__logo-dot"></span>
            <span className="header__logo-dot header__logo-dot--2"></span>
          </div>
          <span className="header__logo-text">NEXUS</span>
          <span className="header__logo-sub">NEWS</span>
        </div>

        <div className={`header__search ${searchFocused ? 'header__search--focused' : ''}`}>
          <svg className="header__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            className="header__search-input"
            placeholder="Search stories, topics…"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {searchQuery && (
            <button className="header__search-clear" onClick={() => onSearchChange('')}>✕</button>
          )}
        </div>

        <div className="header__controls">
          <div className="header__lang-selector">
            <select
              value={language}
              onChange={e => onLanguageChange(e.target.value)}
              className="header__lang-select"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.label}
                </option>
              ))}
            </select>
            <span className="header__lang-badge">{currentLang?.flag} {currentLang?.code.toUpperCase()}</span>
          </div>

          <button className="header__theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button className="header__mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="header__mobile-panel">
          <div className="header__mobile-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search stories…"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
            />
          </div>
          <div className="header__mobile-lang">
            <label>Language</label>
            <select value={language} onChange={e => { onLanguageChange(e.target.value); setMobileOpen(false); }}>
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.flag} {lang.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
