import { useEffect, useState } from 'react';
import { useAnime } from '../context/AnimeContext';
import { getTopAnime } from '../services/api';
import SearchForm from '../components/anime/SearchForm';
import AnimeList from '../components/anime/AnimeList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import '../styles/Home.css';

const Home = () => {
  const { state, dispatch } = useAnime();
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        setLoading(true);
        const data = await getTopAnime();
        setTopAnime(data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch top anime. Please try again later.');
        setLoading(false);
      }
    };

    fetchTopAnime();
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Next <span>Favorite Anime</span></h1>
          <p>Search thousands of anime titles, save to your watchlist, and explore new series with our curated recommendations.</p>
          <SearchForm />
        </div>
      </section>

      <section className="trending-section">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <AnimeList animeList={topAnime} title="Top Anime" />
        )}
      </section>
    </div>
  );
};

export default Home; 