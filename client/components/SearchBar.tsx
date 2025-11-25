'use client';

import { useState } from 'react';
import { SearchBarProps } from '../types/video';

export default function SearchBar({
  searchTerm,
  selectedTags,
  onSearchChange,
  onTagToggle,
  availableTags,
  showFavoritesOnly,
  onToggleFavorites,
  favoriteCount
}: SearchBarProps) {
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  return (
    <div className="mb-8 space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={() => setIsTagsOpen(!isTagsOpen)}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Tags ({selectedTags.length})
        </button>
        {/* <button
          onClick={onToggleFavorites}
          className={`px-6 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            showFavoritesOnly
              ? 'bg-red-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Favorites ({favoriteCount})
        </button> */}
      </div>

      {isTagsOpen && (
        <div className="flex flex-wrap gap-2 p-4 bg-gray-800 rounded-lg">
          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}