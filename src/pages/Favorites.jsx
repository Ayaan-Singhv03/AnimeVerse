import { useAnime } from '../context/AnimeContext';
import AnimeList from '../components/anime/AnimeList';
import { Link } from 'react-router-dom';
import '../styles/Favorites.css';

const Favorites = () => {
  const { state } = useAnime();
  const { favorites } = state;

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>My Favorites</h1>
        <p>{favorites.length} anime in your favorites</p>
      </div>

      {favorites.length > 0 ? (
        <AnimeList animeList={favorites} />
      ) : (
        <div className="empty-favorites">
          <h2>Your favorites list is empty</h2>
          <p>Heart the anime you love to add them here!</p>
          <Link to="/" className="explore-btn">Explore Anime</Link>
        </div>
      )}
    </div>
  );
};

export default Favorites; 