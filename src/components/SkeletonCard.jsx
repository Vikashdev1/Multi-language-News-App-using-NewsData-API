import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = ({ featured = false }) => (
  <div className={`skeleton-card ${featured ? 'skeleton-card--featured' : ''}`}>
    <div className={`skeleton-card__img skeleton`} />
    <div className="skeleton-card__body">
      <div className="skeleton skeleton-card__source" />
      <div className="skeleton skeleton-card__title" />
      <div className="skeleton skeleton-card__title skeleton-card__title--short" />
      {featured && <div className="skeleton skeleton-card__desc" />}
      <div className="skeleton skeleton-card__meta" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 9, featuredCount = 0 }) => (
  <div className="skeleton-grid">
    {featuredCount > 0 && (
      <div className="skeleton-featured">
        {Array.from({ length: featuredCount }).map((_, i) => (
          <SkeletonCard key={`f-${i}`} featured />
        ))}
      </div>
    )}
    <div className="skeleton-grid__inner">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);

export default SkeletonCard;
