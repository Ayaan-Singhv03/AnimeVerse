import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

// Add delay to avoid rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Retry API call with exponential backoff
const retryApiCall = async (apiCall, maxRetries = 3, initialDelay = 1000) => {
  let retries = 0;
  let currentDelay = initialDelay;

  while (retries < maxRetries) {
    try {
      return await apiCall();
    } catch (error) {
      // If we've reached max retries or it's not a rate limiting issue, throw the error
      if (retries === maxRetries - 1 || 
         (error.response && error.response.status !== 429)) {
        throw error;
      }
      
      console.warn(`API call failed, retrying in ${currentDelay}ms...`, error.message);
      // Wait for the specified delay
      await delay(currentDelay);
      // Increase the delay for next retry (exponential backoff)
      currentDelay *= 2;
      retries++;
    }
  }
};

// Search anime by title
export const searchAnime = async (query, page = 1) => {
  try {
    await delay(1000); // Increased delay to prevent rate limiting
    
    return await retryApiCall(async () => {
      const response = await axios.get(`${BASE_URL}/anime`, {
        params: {
          q: query,
          page,
          limit: 20,
          sfw: true
        }
      });
      return response.data;
    });
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};

// Get anime details by ID
export const getAnimeById = async (id) => {
  try {
    await delay(1000); // Increased delay to prevent rate limiting
    
    return await retryApiCall(async () => {
      const response = await axios.get(`${BASE_URL}/anime/${id}`);
      return response.data;
    });
  } catch (error) {
    console.error('Error getting anime details:', error);
    throw error;
  }
};

// Get top anime
export const getTopAnime = async (page = 1) => {
  try {
    await delay(1000); // Increased delay to prevent rate limiting
    
    return await retryApiCall(async () => {
      const response = await axios.get(`${BASE_URL}/top/anime`, {
        params: {
          page,
          limit: 20
        }
      });
      return response.data;
    });
  } catch (error) {
    console.error('Error getting top anime:', error);
    throw error;
  }
};

// Get anime by genre
export const getAnimeByGenre = async (genreId, page = 1) => {
  try {
    await delay(1000); // Increased delay to prevent rate limiting
    
    return await retryApiCall(async () => {
      const response = await axios.get(`${BASE_URL}/anime`, {
        params: {
          genres: genreId,
          page,
          limit: 10,
          order_by: 'popularity',
          sort: 'asc',
          sfw: true
        }
      });
      return response.data;
    });
  } catch (error) {
    console.error(`Error getting anime for genre ${genreId}:`, error);
    throw error;
  }
};

// Get anime recommendations based on an anime ID
export const getAnimeRecommendations = async (id) => {
  try {
    await delay(1000); // Increased delay to prevent rate limiting
    
    return await retryApiCall(async () => {
      const response = await axios.get(`${BASE_URL}/anime/${id}/recommendations`);
      return response.data;
    });
  } catch (error) {
    console.error('Error getting anime recommendations:', error);
    throw error;
  }
}; 