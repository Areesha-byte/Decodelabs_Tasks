import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RecommendationResult } from '../recommendation/engine';
import { Heart, Bookmark, ArrowRight, Star, Sparkles } from 'lucide-react';

interface RecommendationCardProps {
  key?: React.Key;
  result: RecommendationResult;
  onViewDetails: (item: any) => void;
  isFavorite: boolean;
  isSaved: boolean;
  onToggleFavorite: () => void;
  onToggleSave: () => void;
}

export default function RecommendationCard({
  result,
  onViewDetails,
  isFavorite,
  isSaved,
  onToggleFavorite,
  onToggleSave
}: RecommendationCardProps) {
  const { item, matchScore, similarityPercentage, whyRecommended, techniqueUsed } = result;

  const [isHovered, setIsHovered] = useState(false);

  // Styling category badges
  const categoryGlows: { [key: string]: string } = {
    "Tech & Gadgets": "from-cyan-500/20 to-indigo-500/10 border-cyan-500/30 text-cyan-300",
    "Movies & Entertainment": "from-pink-500/20 to-purple-500/10 border-pink-500/30 text-pink-300",
    "Books & Literature": "from-violet-500/20 to-indigo-500/10 border-violet-500/30 text-violet-300",
    "Online Courses & Skills": "from-indigo-500/20 to-blue-500/10 border-indigo-500/30 text-indigo-300",
    "Travel & Adventure": "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300"
  };

  const badgeStyle = categoryGlows[item.category] || "from-slate-800 to-slate-900 border-slate-700 text-slate-300";

  return (
    <motion.div
      layoutId={`card-container-${item.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-slate-900/35 backdrop-blur-md transition-all duration-300 ${
        isHovered 
          ? 'border-violet-500/40 shadow-xl shadow-violet-500/5 bg-slate-900/60' 
          : 'border-slate-800'
      }`}
    >
      {/* Glow highlight for high matches */}
      {matchScore >= 90 && (
        <div className="absolute top-0 right-0 h-16 w-16 -mr-4 -mt-4 rounded-full bg-cyan-400/10 blur-lg pointer-events-none" />
      )}

      {/* Card Image Header */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={item.imageUrl}
          alt={item.title}
          className={`h-full w-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {/* Absolute dark gradient on image bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

        {/* Favorite & Save Action Overlays */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
            className={`flex h-8.5 w-8.5 items-center justify-center rounded-full border backdrop-blur-md transition-all ${
              isFavorite 
                ? 'bg-pink-500/20 border-pink-500 text-pink-400' 
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-pink-400' : ''}`} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
            className={`flex h-8.5 w-8.5 items-center justify-center rounded-full border backdrop-blur-md transition-all ${
              isSaved 
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' 
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-cyan-400' : ''}`} />
          </button>
        </div>

        {/* Category Pill Overlays */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className={`rounded-md border bg-gradient-to-tr px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest ${badgeStyle}`}>
            {item.category}
          </span>
          <span className="rounded-md border border-slate-800 bg-slate-950/80 px-2 py-0.5 font-mono text-[9px] text-slate-400">
            {techniqueUsed}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Match Score Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="font-mono text-[11px] text-slate-400 uppercase">Match Score:</span>
              <span className="font-mono text-xs font-black text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-500/20">
                {matchScore}%
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
              <span>Similarity:</span>
              <span className="text-slate-300 font-bold">{similarityPercentage}%</span>
            </div>
          </div>

          {/* Title */}
          <h4 className="font-sans text-base font-bold text-white tracking-tight line-clamp-1 group-hover:text-cyan-400 transition-colors">
            {item.title}
          </h4>

          {/* Excerpt description */}
          <p className="font-sans text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Neural Why Recommended tag */}
          <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-900/80">
            <span className="font-mono text-[9px] font-bold text-violet-400 uppercase tracking-widest flex items-center gap-1 mb-1">
              <Sparkles className="h-3 w-3 animate-pulse text-violet-400" />
              Engine Insight
            </span>
            <p className="font-sans text-[11px] text-slate-400 leading-normal line-clamp-2">
              {whyRecommended}
            </p>
          </div>
        </div>

        {/* Tags, Rating and View Details Trigger */}
        <div className="mt-5 space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-[22px]">
            {item.tags.slice(0, 3).map(tag => (
              <span key={tag} className="rounded bg-slate-950 px-2 py-0.5 font-mono text-[9px] text-slate-500 border border-slate-900">
                #{tag.toLowerCase()}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-900/80">
            {/* Global Rating star */}
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
              </div>
              <span className="font-mono text-xs font-bold text-slate-300">{item.rating.toFixed(1)}</span>
              <span className="font-mono text-[9px] text-slate-500">({item.popularity} pop)</span>
            </div>

            {/* Expand Detailed trigger */}
            <motion.button
              whileHover={{ x: 3 }}
              onClick={() => onViewDetails(result)}
              className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              View Details
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
