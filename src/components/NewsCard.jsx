import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './NewsCard.css';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60';

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const NewsCard = ({ article, index, featured = false }) => {
  const [imgError, setImgError] = useState(false);

  const timeAgo = article.pubDate
    ? formatDistanceToNow(new Date(article.pubDate), { addSuffix: true })
    : 'Recently';

  const imgSrc = (!imgError && article.image_url) ? article.image_url : PLACEHOLDER;

  const categoryColor = {
    technology: '#3b82f6',
    business: '#f59e0b',
    science: '#8b5cf6',
    health: '#22c55e',
    sports: '#ef4444',
    entertainment: '#ec4899',
    politics: '#f97316',
    environment: '#10b981',
    world: '#06b6d4',
    top: '#6366f1',
  };

  const catColor = categoryColor[article.category?.[0]] || '#3b82f6';

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`card ${featured ? 'card--featured' : ''}`}
      style={{ '--cat-color': catColor, animationDelay: `${(index % 10) * 0.05}s` }}
    >
      <div className="card__img-wrap">
        <img
          src={imgSrc}
          alt={article.title}
          className="card__img"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        <div className="card__img-overlay" />
        {article.category?.[0] && (
          <span className="card__category">{article.category[0]}</span>
        )}
      </div>

      <div className="card__body">
        {article.source_id && (
          <div className="card__source">
            <div className="card__source-dot" />
            <span>{article.source_id}</span>
          </div>
        )}

        <h3 className="card__title">{article.title}</h3>

        {featured && article.description && (
          <p className="card__desc">{article.description?.slice(0, 140)}…</p>
        )}

        <div className="card__meta">
          <span className="card__time">{timeAgo}</span>
          {article.language && (
            <span className="card__lang">{article.language?.toUpperCase()}</span>
          )}
          <span className="card__read-more">
            Read <ExternalIcon />
          </span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
