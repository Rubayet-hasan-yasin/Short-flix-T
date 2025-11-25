import { Video } from '../types/video';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:8000/api';

export const fetchShorts = async (searchTerm?: string, tags?: string[]): Promise<Video[]> => {
  const params = new URLSearchParams();
  
  if (searchTerm) params.append('search', searchTerm);
  if (tags && tags.length > 0) params.append('tags', tags.join(','));
  
  const url = `${API_BASE_URL}/shorts${params.toString() ? `?${params.toString()}` : ''}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  
  return response.json();
};

export const createShort = async (video: Omit<Video, 'id'>): Promise<Video> => {
  const response = await fetch(`${API_BASE_URL}/shorts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(video),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create video');
  }
  
  return response.json();
};

export const toggleFavorite = async (videoId: number): Promise<{ videoId: number; isFavorite: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/shorts/${videoId}/favorite`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to toggle favorite');
  }
  
  return response.json();
};

export const getFavorites = async (): Promise<Video[]> => {
  const response = await fetch(`${API_BASE_URL}/favorites`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch favorites');
  }
  
  return response.json();
};

export const getFavoriteIds = async (): Promise<number[]> => {
  const response = await fetch(`${API_BASE_URL}/favorite-ids`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch favorite IDs');
  }
  
  const data = await response.json();
  return data.favoriteIds;
};