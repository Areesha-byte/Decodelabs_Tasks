import React from 'react';
import { Activity, Star, BarChart, Award, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';
import { RecommendationResult } from '../recommendation/engine';

interface DashboardProps {
  recommendations: RecommendationResult[];
  activeCategory: string;
}

export default function Dashboard({ recommendations, activeCategory }: DashboardProps) {
  // Compute dashboard metrics
  const totalRecommendations = recommendations.length;
  
  const avgSimilarity = totalRecommendations > 0
    ? Math.round(recommendations.reduce((sum, r) => sum + r.similarityPercentage, 0) / totalRecommendations)
    : 0;

  const avgConfidence = totalRecommendations > 0
    ? Math.round(recommendations.reduce((sum, r) => sum + r.matchScore, 0) / totalRecommendations)
    : 0;

  const topMatch = recommendations[0];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {/* Stat Card 1: Total Generated */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-md"
      >
        <div className="absolute top-0 right-0 h-16 w-16 -mr-4 -mt-4 rounded-full bg-violet-500/10 blur-xl" />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
            <Activity className="h-5 w-5" />
          </div>
          <span className="font-sans text-xs font-medium text-slate-400 uppercase tracking-wider">Matches Found</span>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-mono text-3xl font-extrabold text-white">
            {totalRecommendations}
          </span>
          <span className="font-sans text-xs text-slate-500">records</span>
        </div>
        <div className="mt-1 font-mono text-[10px] text-violet-300 flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400" />
          Dynamic pipeline loaded
        </div>
      </motion.div>

      {/* Stat Card 2: Average Similarity */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-md"
      >
        <div className="absolute top-0 right-0 h-16 w-16 -mr-4 -mt-4 rounded-full bg-cyan-500/10 blur-xl" />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
            <BarChart className="h-5 w-5" />
          </div>
          <span className="font-sans text-xs font-medium text-slate-400 uppercase tracking-wider">Avg Similarity</span>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-mono text-3xl font-extrabold text-white">
            {avgSimilarity}%
          </span>
          <span className="font-sans text-xs text-slate-500">cosine similarity</span>
        </div>
        <div className="mt-1 font-mono text-[10px] text-cyan-300 flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
          Weighted TF-IDF space
        </div>
      </motion.div>

      {/* Stat Card 3: Recommendation Confidence */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-md"
      >
        <div className="absolute top-0 right-0 h-16 w-16 -mr-4 -mt-4 rounded-full bg-pink-500/10 blur-xl" />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
            <Award className="h-5 w-5" />
          </div>
          <span className="font-sans text-xs font-medium text-slate-400 uppercase tracking-wider">Confidence</span>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-mono text-3xl font-extrabold text-white">
            {avgConfidence}%
          </span>
          <span className="font-sans text-xs text-slate-500">precision threshold</span>
        </div>
        <div className="mt-1 font-mono text-[10px] text-pink-300 flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink-400 animate-ping" />
          Neural rank resolved
        </div>
      </motion.div>

      {/* Stat Card 4: Top Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-md"
      >
        <div className="absolute top-0 right-0 h-16 w-16 -mr-4 -mt-4 rounded-full bg-indigo-500/10 blur-xl" />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
            <Star className="h-5 w-5 fill-indigo-400/20" />
          </div>
          <span className="font-sans text-xs font-medium text-slate-400 uppercase tracking-wider">Top recommendation</span>
        </div>
        <div className="mt-4 flex flex-col justify-end">
          <span className="truncate font-sans text-sm font-semibold text-white max-w-full">
            {topMatch ? topMatch.item.title : "Calculating..."}
          </span>
          <span className="font-mono text-[10px] text-indigo-300 flex items-center gap-1 mt-1">
            <ThumbsUp className="h-3 w-3 text-indigo-400" />
            Score: {topMatch ? topMatch.matchScore : 0}% • {activeCategory || "All categories"}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
