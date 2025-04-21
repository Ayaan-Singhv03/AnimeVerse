import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import { AnimeProvider } from './context/AnimeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import AnimeDetails from './pages/AnimeDetails';
import WatchList from './pages/WatchList';
import Favorites from './pages/Favorites';

function App() {
  return (
    <AnimeProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/anime/:id" element={<AnimeDetails />} />
              <Route path="/watchlist" element={<WatchList />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AnimeProvider>
  );
}

export default App;
