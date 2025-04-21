import AnimeCard from './AnimeCard';
import '../../styles/AnimeList.css';

const AnimeList = ({ animeList, title }) => {
  if (!animeList || animeList.length === 0) {
    return (
      <div className="anime-list-empty">
        <h2>No anime found</h2>
        <p>Try a different search term or check back later.</p>
      </div>
    );
  }

  return (
    <div className="anime-list-container">
      {title && <h2 className="anime-list-title">{title}</h2>}
      <div className="anime-list">
        {animeList.map(anime => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default AnimeList; 