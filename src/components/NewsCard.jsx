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

const BookmarkIcon = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);

// NewsData.io returns a `sentiment` field (positive/negative/neutral) on paid plans.
const SENTIMENT_META = {
  positive: { label: 'Positive', color: '#22c55e', icon: '▲' },
  negative: { label: 'Negative', color: '#ef4444', icon: '▼' },
  neutral: { label: 'Neutral', color: '#94a3b8', icon: '■' },
};

const NewsCard = ({ article, index, featured = false, isBookmarked = false, onToggleBookmark }) => {
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

  const sentiment = SENTIMENT_META[article.sentiment];
  const aiTag = Array.isArray(article.ai_tag) ? article.ai_tag[0] : article.ai_tag;
  const keywords = (article.keywords || []).slice(0, 2);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleBookmark?.(article);
  };

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
        {onToggleBookmark && (
          <button
            className={`card__bookmark ${isBookmarked ? 'card__bookmark--active' : ''}`}
            onClick={handleBookmark}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Save article'}
            title={isBookmarked ? 'Remove from saved' : 'Save for later'}
          >
            <BookmarkIcon filled={isBookmarked} />
          </button>
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

        {(sentiment || aiTag || keywords.length > 0) && (
          <div className="card__tags">
            {sentiment && (
              <span
                className="card__chip card__chip--sentiment"
                style={{ '--chip-color': sentiment.color }}
              >
                {sentiment.icon} {sentiment.label}
              </span>
            )}
            {aiTag && <span className="card__chip">{aiTag}</span>}
            {keywords.map(kw => (
              <span key={kw} className="card__chip card__chip--keyword">#{kw}</span>
            ))}
          </div>
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
