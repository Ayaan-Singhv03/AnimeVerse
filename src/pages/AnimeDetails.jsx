import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAnime } from '../context/AnimeContext';
import { getAnimeById, getAnimeRecommendations } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AnimeList from '../components/anime/AnimeList';
import '../styles/AnimeDetails.css';

const AnimeDetails = () => {
  const { id } = useParams();
  const { state, dispatch } = useAnime();
  const [anime, setAnime] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const isInWatchlist = anime ? state.watchlist.some(item => item.mal_id === anime.mal_id) : false;
  const isInFavorites = anime ? state.favorites.some(item => item.mal_id === anime.mal_id) : false;

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        const animeData = await getAnimeById(id);
        setAnime(animeData.data);
        
        // Get recommendations after fetching anime details
        try {
          const recommendationsData = await getAnimeRecommendations(id);
          const recommendedAnime = recommendationsData.data.map(rec => rec.entry);
          setRecommendations(recommendedAnime.slice(0, 6)); // Limit to 6 recommendations
        } catch (recError) {
          console.error('Error fetching recommendations:', recError);
          setRecommendations([]);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch anime details. Please try again later.');
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: anime.mal_id });
    } else {
      dispatch({ type: 'ADD_TO_WATCHLIST', payload: anime });
    }
  };
  
  const handleFavoriteToggle = () => {
    if (isInFavorites) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: anime.mal_id });
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: anime });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !anime) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'Failed to load anime details'}</p>
        <Link to="/" className="btn-back">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="anime-details-container">
      <div className="anime-details-header">
        <div className="anime-details-image">
          <img 
            src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url} 
            alt={anime.title} 
          />
        </div>
        
        <div className="anime-details-info">
          <h1>{anime.title}</h1>
          {anime.title_japanese && <h2 className="japanese-title">{anime.title_japanese}</h2>}
          
          <div className="anime-stats">
            <div className="stat">
              <span className="stat-label">Rating:</span>
              <span className="stat-value">{anime.score || 'N/A'} ★</span>
            </div>
            <div className="stat">
              <span className="stat-label">Type:</span>
              <span className="stat-value">{anime.type || 'N/A'}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Episodes:</span>
              <span className="stat-value">{anime.episodes || 'N/A'}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Status:</span>
              <span className="stat-value">{anime.status || 'N/A'}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Aired:</span>
              <span className="stat-value">{anime.aired?.string || 'N/A'}</span>
            </div>
          </div>
          
          <div className="anime-genres">
            {anime.genres?.map(genre => (
              <span key={genre.mal_id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>
          
          <div className="action-buttons">
            <button 
              className={`watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`}
              onClick={handleWatchlistToggle}
            >
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
            
            <button 
              className={`favorite-btn-large ${isInFavorites ? 'is-favorite' : ''}`}
              onClick={handleFavoriteToggle}
            >
              {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'} ♥
            </button>
          </div>
          
          <Link to="/" className="btn-back">Back to Home</Link>
        </div>
      </div>
      
      <div className="anime-synopsis">
        <h3>Synopsis</h3>
        <p>{anime.synopsis || 'No synopsis available.'}</p>
      </div>
      
      <div className="anime-details-section">
        <h3>Details</h3>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Rating:</span>
            <span className="detail-value">{anime.rating || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Duration:</span>
            <span className="detail-value">{anime.duration || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Season:</span>
            <span className="detail-value">{anime.season ? `${anime.season} ${anime.year}` : 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Source:</span>
            <span className="detail-value">{anime.source || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Studios:</span>
            <span className="detail-value">
              {anime.studios?.map(studio => studio.name).join(', ') || 'N/A'}
            </span>
          </div>
        </div>
      </div>
      
      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <h3>You might also like</h3>
          <AnimeList animeList={recommendations} />
        </div>
      )}
    </div>
  );
};

export default AnimeDetails; 