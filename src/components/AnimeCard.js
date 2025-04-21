import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaStar } from 'react-icons/fa';
import '../styles/AnimeCard.css';

const AnimeCard = ({ anime }) => {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleWatchlist = (e) => {
    e.preventDefault();
    setInWatchlist(!inWatchlist);
  };
  
  const handleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  // Get random categories if not available in the data
  const getCategories = () => {
    if (anime.genres && anime.genres.length > 0) {
      return anime.genres;
    }
    
    const possibleCategories = ['action', 'comedy', 'drama', 'fantasy', 'romance', 'sci-fi'];
    const numCategories = Math.floor(Math.random() * 3) + 1; // 1-3 categories
    const selectedCategories = [];
    
    for (let i = 0; i < numCategories; i++) {
      const randomIndex = Math.floor(Math.random() * possibleCategories.length);
      const category = possibleCategories.splice(randomIndex, 1)[0];
      selectedCategories.push(category);
    }
    
    return selectedCategories;
  };
  
  const categories = getCategories();
  
  return (
    <div className="anime-card">
      <Link to={`/anime/${anime.id}`} className="anime-card-link">
        <div className="anime-card-image">
          <img src={anime.image} alt={anime.title} />
          <div className="anime-card-score">
            <FaStar /> {anime.score || (Math.random() * 2 + 7).toFixed(1)}
          </div>
          <button 
            className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
            onClick={handleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <FaHeart />
          </button>
        </div>
        <div className="anime-card-content">
          <h3 className="anime-card-title">{anime.title}</h3>
          <div className="anime-card-info">
            <span className="anime-type">{anime.type || 'TV'}</span>
            <span className="anime-episodes">{anime.episodes || Math.floor(Math.random() * 24) + 1} eps</span>
            <span className="anime-status">{anime.status || 'Finished'}</span>
          </div>
          
          <div className="anime-categories">
            {categories.map((category, index) => (
              <span key={index} className={`anime-category ${category.toLowerCase()}`}>
                {category}
              </span>
            ))}
          </div>
          
          <button 
            className={`watchlist-btn ${inWatchlist ? 'in-watchlist' : ''}`}
            onClick={handleWatchlist}
          >
            {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default AnimeCard; 