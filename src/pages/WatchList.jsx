import { useAnime } from '../context/AnimeContext';
import AnimeList from '../components/anime/AnimeList';
import { Link } from 'react-router-dom';
import '../styles/WatchList.css';

const WatchList = () => {
  const { state } = useAnime();
  const { watchlist } = state;

  return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        <h1>My Watchlist</h1>
        <p>{watchlist.length} anime in your watchlist</p>
      </div>

      {watchlist.length > 0 ? (
        <AnimeList animeList={watchlist} />
      ) : (
        <div className="empty-watchlist">
          <h2>Your watchlist is empty</h2>
          <p>Start exploring and add anime to your watchlist!</p>
          <Link to="/" className="explore-btn">Explore Anime</Link>
        </div>
      )}
    </div>
  );
};

export default WatchList; 