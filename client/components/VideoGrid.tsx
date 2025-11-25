'use client';

import { VideoGridProps } from '../types/video';

export default function VideoGrid({ videos, onVideoClick, favoriteIds, onToggleFavorite }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map(video => (
        <div
          key={video.id}
          onClick={() => onVideoClick(video)}
          className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
        >
          <div className="relative">
            <video
              src={video.videoUrl}
              className="w-full h-48 object-cover"
              muted
              preload="metadata"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(video.id);
              }}
              className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                favoriteIds.includes(video.id)
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-black bg-opacity-50 text-gray-300 hover:bg-red-600 hover:text-white'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill={favoriteIds.includes(video.id) ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
          
          <div className="p-4">
            <h3 className="text-white font-semibold mb-2 line-clamp-2">{video.title}</h3>
            <div className="flex flex-wrap gap-1">
              {video.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
              {video.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                  +{video.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}