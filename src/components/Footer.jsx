import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__brand">
        <span className="footer__logo">NEXUS NEWS</span>
        <p className="footer__tagline">World stories, your language.</p>
      </div>
      <div className="footer__meta">
        <span className="footer__powered">
          Powered by{' '}
          <a href="https://newsdata.io" target="_blank" rel="noopener noreferrer" className="footer__link">
            NewsData.io
          </a>
        </span>
        <span className="footer__sep">·</span>
        <span className="footer__credit">
          Built with React
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
