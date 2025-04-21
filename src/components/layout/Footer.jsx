import '../../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AnimeVerse</h3>
            <p>Your gateway to exploring the anime universe.</p>
          </div>
          
          <div className="footer-section">
            <h3>Powered By</h3>
            <p>
              <a 
                href="https://jikan.moe" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Jikan API
              </a> - An unofficial MyAnimeList API
            </p>
          </div>
          
          <div className="footer-section">
            <h3>About</h3>
            <p>
              AniFind is a React-based web application for anime enthusiasts to discover, 
              explore, and curate their favorite anime.
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AniFind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 