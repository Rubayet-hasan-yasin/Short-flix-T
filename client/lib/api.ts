import axios from 'axios';
import { Video } from '../types/video';

const API_BASE_URL = '/api';
  

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.message || 'API request failed');
    } else if (error.request) {
      console.error('Network Error:', error.request);
      throw new Error('Network error - please check your connection');
    } else {
      console.error('Request Error:', error.message);
      throw new Error('Request failed');
    }
  }
);

export const fetchShorts = async (searchTerm?: string, tags?: string[]): Promise<Video[]> => {
  const params = new URLSearchParams();
  
  if (searchTerm) params.append('search', searchTerm);
  if (tags && tags.length > 0) params.append('tags', tags.join(','));
  
  const response = await api.get<Video[]>(`/shorts${params.toString() ? `?${params.toString()}` : ''}`);
  
  return response.data;
};

export const createShort = async (video: Omit<Video, 'id'>): Promise<Video> => {
  const response = await api.post<Video>('/shorts', video);
  return response.data;
};

export const toggleFavorite = async (videoId: number): Promise<{ videoId: number; isFavorite: boolean }> => {
  const response = await api.post<{ videoId: number; isFavorite: boolean }>(`/shorts/${videoId}/favorite`);
  
  return response.data;
};

export const getFavorites = async (): Promise<Video[]> => {
  const response = await api.get<Video[]>('/favorites');
  return response.data;
};

export const getFavoriteIds = async (): Promise<number[]> => {
  const response = await api.get<{ favoriteIds: number[] }>('/favorite-ids');
  return response.data.favoriteIds;
};