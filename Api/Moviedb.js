import axios from "axios";
import { api_key } from './../assets/constants/index';

const BaseURL = 'https://api.themoviedb.org/3';

// Dynamic Endpoints
export const getMovieDetails = id => `${BaseURL}/movie/${id}?api_key=${api_key}`;
export const getMovieCredits = id => `${BaseURL}/movie/${id}/credits?api_key=${api_key}`;
export const getMovieSimilar = id => `${BaseURL}/movie/${id}/similar?api_key=${api_key}`;

// Person
export const FetchPersonDetails = (id) => apiCall(`/person/${id}`);
export const FetchPersonMovies = (id) => apiCall(`/person/${id}/movie_credits`);

// search
export const SearchMovie = (query) => apiCall(`/search/movie?query=${encodeURIComponent(query)}`);



// Generic API Call
const apiCall = async (path, params = {}) => {
  try {
    const response = await axios.get(`${BaseURL}${path}`, {
      params: {
        api_key,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.log("API Error:", error.message);
    return {};
  }
};

// Movie APIs
export const FetchTrendingMovies = () => apiCall('/trending/movie/day');
export const FetchUpComingMovies = () => apiCall('/movie/upcoming');
export const FetchTopRatedMovies = () => apiCall('/movie/top_rated');

// Detail APIs (Fetch with Axios instead of just URL if needed)
export const FetchMovieDetails = (id) => apiCall(`/movie/${id}`);
export const FetchMovieCredits = (id) => apiCall(`/movie/${id}/credits`);
export const FetchSimilarMovies = (id) => apiCall(`/movie/${id}/similar`);

