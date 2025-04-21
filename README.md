# AniFind - Anime Finder Web Application

A modern React application for discovering, exploring, and creating a personalized anime watchlist.

## Features

- **Browse Popular Anime**: View top-rated anime on the home page
- **Search Functionality**: Find anime by title
- **Detailed Information**: View comprehensive details about each anime
- **Personalized Watchlist**: Save your favorite anime to a watchlist
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Recommendations**: Get recommendations based on an anime you're viewing

## Tech Stack

- React.js with Functional Components and Hooks
- React Router DOM for navigation
- React Context API for global state management
- Vanilla CSS for styling (responsive design)
- Jikan API (unofficial MyAnimeList API) for data

## Setup and Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd anime-web
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Project Structure

```
anime-web/
├── src/
│   ├── components/   # Reusable components
│   │   ├── anime/    # Anime-specific components
│   │   ├── common/   # Shared UI components
│   │   └── layout/   # Layout components (Navbar, Footer)
│   ├── context/      # Context API for state management
│   ├── pages/        # Page components
│   ├── services/     # API service functions
│   ├── styles/       # CSS files
│   ├── App.jsx       # Main App component
│   └── main.jsx      # Entry point
├── public/           # Static files
└── index.html        # HTML template
```

## API Information

This project uses the [Jikan API](https://jikan.moe), an unofficial MyAnimeList API. No API key is required, but there are rate limits to be aware of.

## Credits

- Data provided by [Jikan API](https://jikan.moe)
- Inspired by MyAnimeList and Crunchyroll

## License

MIT
