import React from 'react';
import { CATEGORIES } from '../data/dataset';
import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  sortBy: 'match' | 'popularity' | 'rating';
  setSortBy: (sort: 'match' | 'popularity' | 'rating') => void;
}

export default function SearchFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy
}: SearchFiltersProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/20 p-5 backdrop-blur-sm space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items, keywords, tags..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
          />
        </div>

        {/* Sorters */}
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Sort:
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-850">
            {(['match', 'popularity', 'rating'] as const).map(option => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`rounded-lg px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-wider transition-all ${
                  sortBy === option
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {option === 'match' ? 'Match' : option === 'popularity' ? 'Popularity' : 'Stars'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Pills Filtering */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
            selectedCategory === 'All'
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
          }`}
        >
          All Dimensions
        </button>

        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
