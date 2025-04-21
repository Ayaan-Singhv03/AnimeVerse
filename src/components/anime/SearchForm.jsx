import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnime } from '../../context/AnimeContext';
import '../../styles/SearchForm.css';

const SearchForm = () => {
  const { state, dispatch } = useAnime();
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }
    
    setError('');
    dispatch({ type: 'SET_SEARCH_QUERY', payload: searchTerm });
    dispatch({ type: 'SET_LOADING', payload: true });
    navigate('/search');
  };

  return (
    <div className="search-form-container">
      <form className="hero-search-form" onSubmit={handleSubmit}>
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Search for anime..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={error ? 'error' : ''}
          />
          <button type="submit">Search</button>
        </div>
        {error && <p className="search-error">{error}</p>}
      </form>
    </div>
  );
};

export default SearchForm; 