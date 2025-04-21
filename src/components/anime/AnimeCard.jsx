import { Link } from 'react-router-dom';
import { useAnime } from '../../context/AnimeContext';
import '../../styles/AnimeCard.css';

const AnimeCard = ({ anime }) => {
  const { state, dispatch } = useAnime();
  
  const isInWatchlist = state.watchlist.some(item => item.mal_id === anime.mal_id);
  const isInFavorites = state.favorites.some(item => item.mal_id === anime.mal_id);
  
  const handleWatchlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWatchlist) {
      dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: anime.mal_id });
    } else {
      dispatch({ type: 'ADD_TO_WATCHLIST', payload: anime });
    }
  };
  
  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInFavorites) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: anime.mal_id });
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: anime });
    }
  };
  
  return (
    <div className="anime-card">
      <Link to={`/anime/${anime.mal_id}`} className="anime-card-link">
        <div className="anime-card-image">
          <img 
            src={anime.images?.jpg?.image_url || 'https://via.placeholder.com/225x318?text=No+Image'} 
            alt={anime.title}
          />
          <div className="anime-card-score">
            <span>★ {anime.score || 'N/A'}</span>
          </div>
          <button 
            className={`favorite-btn ${isInFavorites ? 'is-favorite' : ''}`}
            onClick={handleFavoriteToggle}
            title={isInFavorites ? "Remove from favorites" : "Add to favorites"}
          >
            ♥
          </button>
        </div>
        
        <div className="anime-card-content">
          <h3 className="anime-card-title">{anime.title}</h3>
          
          <div className="anime-card-info">
            {anime.type && <span className="anime-type">{anime.type}</span>}
            {anime.episodes && <span className="anime-episodes">{anime.episodes} eps</span>}
            {anime.status && <span className="anime-status">{anime.status}</span>}
          </div>
          
          <button 
            className={`watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`}
            onClick={handleWatchlistToggle}
            title={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
          >
            {isInWatchlist ? '✓ Watchlist' : '+ Watchlist'}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default AnimeCard; 