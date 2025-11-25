'use client';

import { useState, useEffect, useMemo } from 'react';
import VideoGrid from '../components/VideoGrid';
import VideoPlayer from '../components/VideoPlayer';
import SearchBar from '../components/SearchBar';
import { Video } from '../types/video';
import { fetchShorts, toggleFavorite, getFavoriteIds } from '../lib/api';

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const availableTags = useMemo(() => {
    const tags = videos.flatMap(video => video.tags);
    return [...new Set(tags)].sort();
  }, [videos]);

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchShorts(searchTerm, selectedTags);
      setVideos(data);
    } catch (err) {
      setError('Failed to load videos');
      console.error('Error loading videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const ids = await getFavoriteIds();
      setFavoriteIds(ids);
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  };

  const filteredVideos = useMemo(() => {
    return showFavoritesOnly
      ? videos.filter(video => favoriteIds.includes(video.id))
      : videos;
  }, [videos, favoriteIds, showFavoritesOnly]);

  useEffect(() => {
    loadVideos();
  }, [searchTerm, selectedTags]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setSelectedVideo(null);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleToggleFavorite = async (videoId: number) => {
    try {
      const result = await toggleFavorite(videoId);
      if (result.isFavorite) {
        setFavoriteIds(prev => [...prev, videoId]);
      } else {
        setFavoriteIds(prev => prev.filter(id => id !== videoId));
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const handleToggleFavorites = () => {
    setShowFavoritesOnly(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">Short-flix</h1>
          <p className="text-gray-400">Discover amazing short videos</p>
        </header>

        <SearchBar
          searchTerm={searchTerm}
          selectedTags={selectedTags}
          onSearchChange={setSearchTerm}
          onTagToggle={handleTagToggle}
          availableTags={availableTags}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavorites={handleToggleFavorites}
          favoriteCount={favoriteIds.length}
        />

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading videos...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500 text-xl">{error}</div>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-400 text-xl">
              {showFavoritesOnly ? 'No favorite videos found' : 'No videos found'}
            </div>
          </div>
        ) : (
          <VideoGrid 
            videos={filteredVideos} 
            onVideoClick={handleVideoClick}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        <VideoPlayer
          video={selectedVideo}
          isOpen={isPlayerOpen}
          onClose={handleClosePlayer}
        />
      </div>
    </div>
  );
}
