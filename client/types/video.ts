export interface Video {
  id: number;
  videoUrl: string;
  title: string;
  tags: string[];
}

export interface VideoGridProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
  favoriteIds: number[];
  onToggleFavorite: (videoId: number) => void;
}

export interface VideoPlayerProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface SearchBarProps {
  searchTerm: string;
  selectedTags: string[];
  onSearchChange: (term: string) => void;
  onTagToggle: (tag: string) => void;
  availableTags: string[];
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  favoriteCount: number;
}