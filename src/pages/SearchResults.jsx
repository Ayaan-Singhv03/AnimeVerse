import { useEffect, useState } from 'react';
import { useAnime } from '../context/AnimeContext';
import { searchAnime } from '../services/api';
import AnimeList from '../components/anime/AnimeList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import '../styles/SearchResults.css';

const SearchResults = () => {
  const { state, dispatch } = useAnime();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchAnimeResults = async () => {
      if (!state.searchQuery) return;

      try {
        setLoading(true);
        const data = await searchAnime(state.searchQuery);
        setResults(data.data);
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: data.data });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch search results. Please try again later.');
        dispatch({ type: 'SET_ERROR', payload: 'Search failed' });
        setLoading(false);
      }
    };

    fetchAnimeResults();
  }, [state.searchQuery, dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="search-header">
        <h2>Search Results for "{state.searchQuery}"</h2>
        <p>{results.length} results found</p>
      </div>
      
      {results.length > 0 ? (
        <AnimeList animeList={results} />
      ) : (
        <div className="no-results">
          <h3>No results found</h3>
          <p>Try searching for a different anime title.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults; 