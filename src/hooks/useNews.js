import { useState, useEffect, useCallback } from 'react';
import { fetchNews, fetchLatestNews } from '../utils/api';

// mode: 'news' (default archive) | 'latest' (breaking) — selects the NewsData.io endpoint.
const useNews = (filters, mode = 'news') => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loadNews = useCallback(async (reset = true, pageToken = null) => {
    setLoading(true);
    setError(null);
    try {
      const fetcher = mode === 'latest' ? fetchLatestNews : fetchNews;
      const data = await fetcher({
        ...filters,
        page: pageToken,
      });
      const newArticles = data.results || [];
      setArticles(prev => reset ? newArticles : [...prev, ...newArticles]);
      setNextPage(data.nextPage || null);
      setHasMore(!!data.nextPage);
    } catch (err) {
      const msg = err.response?.data?.results?.message || err.message || 'Failed to fetch news';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [filters, mode]);  // eslint-disable-line

  useEffect(() => {
    setArticles([]);
    setNextPage(null);
    setHasMore(true);
    loadNews(true);
  }, [filters.language, filters.category, filters.country, filters.query, mode]); // eslint-disable-line

  const loadMore = () => {
    if (!loading && hasMore && nextPage) {
      loadNews(false, nextPage);
    }
  };

  return { articles, loading, error, hasMore, loadMore };
};

export default useNews;
