import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'nexus-bookmarks';

// Persists saved articles (full objects, so the Saved view works offline) to localStorage.
const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const keyOf = (article) => article.article_id || article.link;

  const isBookmarked = useCallback(
    (article) => bookmarks.some(b => keyOf(b) === keyOf(article)),
    [bookmarks]
  );

  const toggleBookmark = useCallback((article) => {
    setBookmarks(prev => {
      const exists = prev.some(b => keyOf(b) === keyOf(article));
      return exists
        ? prev.filter(b => keyOf(b) !== keyOf(article))
        : [article, ...prev];
    });
  }, []);

  return { bookmarks, isBookmarked, toggleBookmark };
};

export default useBookmarks;
