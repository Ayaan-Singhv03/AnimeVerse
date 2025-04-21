import { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  searchResults: [],
  watchlist: [],
  favorites: [],
  loading: false,
  error: null,
  searchQuery: '',
};

// Create context
const AnimeContext = createContext();

// Reducer function
const animeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'ADD_TO_WATCHLIST':
      // Prevent duplicates
      if (state.watchlist.some(anime => anime.mal_id === action.payload.mal_id)) {
        return state;
      }
      return { 
        ...state, 
        watchlist: [...state.watchlist, action.payload] 
      };
    case 'REMOVE_FROM_WATCHLIST':
      return { 
        ...state, 
        watchlist: state.watchlist.filter(anime => anime.mal_id !== action.payload) 
      };
    case 'ADD_TO_FAVORITES':
      // Prevent duplicates
      if (state.favorites.some(anime => anime.mal_id === action.payload.mal_id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(anime => anime.mal_id !== action.payload)
      };
    default:
      return state;
  }
};

// Provider component
export const AnimeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(animeReducer, initialState);

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('animeWatchlist');
    if (savedWatchlist) {
      const parsedWatchlist = JSON.parse(savedWatchlist);
      parsedWatchlist.forEach(anime => {
        dispatch({ type: 'ADD_TO_WATCHLIST', payload: anime });
      });
    }
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('animeFavorites');
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      parsedFavorites.forEach(anime => {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: anime });
      });
    }
  }, []);

  // Save watchlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('animeWatchlist', JSON.stringify(state.watchlist));
  }, [state.watchlist]);
  
  // Save favorites to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('animeFavorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  return (
    <AnimeContext.Provider value={{ state, dispatch }}>
      {children}
    </AnimeContext.Provider>
  );
};

// Custom hook for using the context
export const useAnime = () => {
  const context = useContext(AnimeContext);
  if (!context) {
    throw new Error('useAnime must be used within an AnimeProvider');
  }
  return context;
}; 