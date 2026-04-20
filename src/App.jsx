import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';
import NewsGrid from './components/NewsGrid';
import StatsBar from './components/StatsBar';
import ErrorState from './components/ErrorState';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import ApiKeyBanner from './components/ApiKeyBanner';
import { SkeletonGrid } from './components/SkeletonCard';
import useNews from './hooks/useNews';
import useTheme from './hooks/useTheme';
import useDebounce from './hooks/useDebounce';
import { LANGUAGES, CATEGORIES, COUNTRIES } from './utils/constants';
import './App.css';

const HAS_API_KEY = !!process.env.REACT_APP_NEWSDATA_API_KEY;

function App() {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState('en');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const query = useDebounce(searchInput, 600);

  const filters = useMemo(() => ({
    language,
    category,
    country,
    query,
  }), [language, category, country, query]);

  const { articles, loading, error, hasMore, loadMore } = useNews(filters);

  const handleClearFilters = () => {
    setCategory('');
    setCountry('');
    setSearchInput('');
  };

  const showSkeleton = loading && articles.length === 0;
  const showEmpty = !loading && !error && articles.length === 0;
  const showGrid = articles.length > 0;

  return (
    <div className="app">
      {!HAS_API_KEY && <ApiKeyBanner />}

      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        language={language}
        onLanguageChange={setLanguage}
        languages={LANGUAGES}
        searchQuery={searchInput}
        onSearchChange={setSearchInput}
      />

      <CategoryBar
        categories={CATEGORIES}
        selected={category}
        onSelect={setCategory}
        country={country}
        onCountryChange={setCountry}
        countries={COUNTRIES}
      />

      <main className="app__main">
        <div className="app__container">
          <StatsBar
            count={articles.length}
            language={language}
            category={category}
            query={query}
            languages={LANGUAGES}
            categories={CATEGORIES}
          />

          {error && (
            <ErrorState message={error} onRetry={() => window.location.reload()} />
          )}

          {showSkeleton && (
            <SkeletonGrid count={9} featuredCount={2} />
          )}

          {showEmpty && !error && (
            <EmptyState query={query} onClear={handleClearFilters} />
          )}

          {showGrid && (
            <NewsGrid
              articles={articles}
              hasMore={hasMore}
              loadMore={loadMore}
              loading={loading}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
