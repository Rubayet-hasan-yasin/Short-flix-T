import { Request, Response } from 'express';
import videoService from '../services/videoService';
import { CreateVideoRequest, VideoSearchParams } from '../types/video';

export const getShorts = (req: Request<{}, {}, {}, VideoSearchParams>, res: Response) => {
  try {
    const { search, tags } = req.query;
    const videos = videoService.searchVideos(search, tags);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createShort = (req: Request<{}, {}, CreateVideoRequest>, res: Response) => {
  try {
    const { videoUrl, title, tags } = req.body;

    if (!videoUrl || !title || !tags) {
      return res.status(400).json({ error: 'Missing required fields: videoUrl, title, tags' });
    }

    if (!Array.isArray(tags)) {
      return res.status(400).json({ error: 'Tags must be an array' });
    }

    const newVideo = videoService.addVideo({ videoUrl, title, tags });
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const toggleFavorite = (req: Request<{ id: string }>, res: Response) => {
  try {
    const videoId = parseInt(req.params.id);
    
    if (isNaN(videoId)) {
      return res.status(400).json({ error: 'Invalid video ID' });
    }

    const result = videoService.toggleFavorite(videoId);
    res.json(result);
  } catch (error: any) {
    if (error.message === 'Video not found') {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFavorites = (req: Request, res: Response) => {
  try {
    const favorites = videoService.getFavorites();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFavoriteIds = (req: Request, res: Response) => {
  try {
    const favoriteIds = videoService.getFavoriteIds();
    res.json({ favoriteIds });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};