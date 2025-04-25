import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHome, FaHeart, FaList, FaBars } from 'react-icons/fa';
import { useAnime } from '../../context/AnimeContext';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { state, dispatch } = useAnime();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <h1 className="brand-name">ANIMEVERSE</h1>
          </Link>
        </div>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            <FaHome className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link to="/favorites" className="nav-link">
            <FaHeart className="nav-icon" />
            <span>Favorites</span>
            {state.favorites.length > 0 && <div className="badge favorites-badge">{state.favorites.length}</div>}
          </Link>
          <Link to="/watchlist" className="nav-link">
            <FaList className="nav-icon" />
            <span>Watchlist</span>
            {state.watchlist.length > 0 && <div className="badge watchlist-badge">{state.watchlist.length}</div>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
