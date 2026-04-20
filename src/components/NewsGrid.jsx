import React from 'react';
import NewsCard from './NewsCard';
import './NewsGrid.css';

const NewsGrid = ({ articles, hasMore, loadMore, loading }) => {
  if (!articles.length) return null;

  const featured = articles.slice(0, 2);
  const rest = articles.slice(2);

  return (
    <div className="news-grid">
      {featured.length > 0 && (
        <section className="news-grid__featured">
          <div className="news-grid__featured-inner">
            {featured.map((article, i) => (
              <NewsCard key={article.article_id || i} article={article} index={i} featured />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="news-grid__regular">
          {rest.map((article, i) => (
            <NewsCard key={article.article_id || i} article={article} index={i + 2} />
          ))}
        </section>
      )}

      {hasMore && (
        <div className="news-grid__load-more">
          <button
            className={`news-grid__load-btn ${loading ? 'news-grid__load-btn--loading' : ''}`}
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="news-grid__spinner" />
                Loading…
              </>
            ) : (
              <>
                Load More Stories
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </>
            )}
          </button>
        </div>
      )}

      {!hasMore && articles.length > 0 && (
        <p className="news-grid__end">You've reached the end · {articles.length} stories loaded</p>
      )}
    </div>
  );
};

export default NewsGrid;
