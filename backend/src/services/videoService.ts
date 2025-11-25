import { Video } from '../types/video';

class VideoService {
  private favorites: Set<number> = new Set();
  
  private videos: Video[] = [
    {
      id: 1,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      title: 'Big Buck Bunny',
      tags: ['animation', 'comedy', 'short']
    },
    {
      id: 2,
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      title: 'Sample 5 Second Video',
      tags: ['demo', 'test', 'short']
    },
    {
      id: 3,
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
      title: 'Sample 10 Second Video',
      tags: ['demo', 'test', 'medium']
    },
    {
      id: 4,
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4',
      title: 'Sample 15 Second Video',
      tags: ['demo', 'test', 'medium']
    },
    {
      id: 5,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      title: 'Elephants Dream',
      tags: ['animation', 'fantasy', 'artistic']
    },
    {
      id: 6,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      title: 'For Bigger Blazes',
      tags: ['action', 'demo', 'cinematic']
    },
    {
      id: 7,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      title: 'For Bigger Escapes',
      tags: ['adventure', 'demo', 'cinematic']
    },
    {
      id: 8,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      title: 'For Bigger Fun',
      tags: ['entertainment', 'demo', 'fun']
    }
  ];

  private nextId = 9;

  getAllVideos(): Video[] {
    return [...this.videos];
  }

  searchVideos(search?: string, tags?: string): Video[] {
    let filteredVideos = [...this.videos];

    if (search) {
      const searchLower = search.toLowerCase();
      filteredVideos = filteredVideos.filter(video =>
        video.title.toLowerCase().includes(searchLower) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
      filteredVideos = filteredVideos.filter(video =>
        tagArray.some(tag => 
          video.tags.some(videoTag => videoTag.toLowerCase().includes(tag))
        )
      );
    }

    return filteredVideos;
  }

  addVideo(videoData: Omit<Video, 'id'>): Video {
    const newVideo: Video = {
      id: this.nextId++,
      ...videoData
    };
    this.videos.push(newVideo);
    return newVideo;
  }

  getVideoById(id: number): Video | undefined {
    return this.videos.find(video => video.id === id);
  }

  toggleFavorite(id: number): { videoId: number; isFavorite: boolean } {
    const video = this.getVideoById(id);
    if (!video) {
      throw new Error('Video not found');
    }

    if (this.favorites.has(id)) {
      this.favorites.delete(id);
      return { videoId: id, isFavorite: false };
    } else {
      this.favorites.add(id);
      return { videoId: id, isFavorite: true };
    }
  }

  isFavorite(id: number): boolean {
    return this.favorites.has(id);
  }

  getFavorites(): Video[] {
    return this.videos.filter(video => this.favorites.has(video.id));
  }

  getFavoriteIds(): number[] {
    return Array.from(this.favorites);
  }
}

export default new VideoService();