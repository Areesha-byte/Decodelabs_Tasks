import React from 'react';
import { motion } from 'motion/react';
import { SIMULATED_USERS, RECOMMENDATION_DATASET, DatasetItem } from '../data/dataset';
import { Users, Star, ArrowUpRight, Sparkles } from 'lucide-react';
import { calculateUserSimilarities } from '../recommendation/engine';

interface CollaborativeSyncProps {
  selectedItem: DatasetItem | null;
  userPreferences: any;
}

export default function CollaborativeSync({ selectedItem, userPreferences }: CollaborativeSyncProps) {
  const similarities = calculateUserSimilarities(userPreferences);
  
  // Sort users by calculated affinity to the active user's preferences
  const sortedPeers = [...SIMULATED_USERS].sort((a, b) => {
    return (similarities[b.id] || 0) - (similarities[a.id] || 0);
  });

  const targetItem = selectedItem || RECOMMENDATION_DATASET[0];

  // Find other items highly rated by the closest peer user
  const topPeer = sortedPeers[0];
  const peerFavorites = RECOMMENDATION_DATASET
    .filter(item => item.id !== targetItem.id && (item.userRatings[topPeer.id] || 0) >= 4.5)
    .slice(0, 3);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-6 backdrop-blur-md space-y-6">
      <div>
        <h3 className="font-sans text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Users className="h-4.5 w-4.5 text-violet-400" />
          Collaborative Filtering & peer sync
        </h3>
        <p className="font-sans text-xs text-slate-400 mt-0.5">
          Simulating crowd-sourced ratings from cluster peers who share matching behavioral vectors.
        </p>
      </div>

      {/* Target Item Rating Overlap */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-bold uppercase text-slate-400">
            Peer feedback for target: <span className="text-white">"{targetItem.title}"</span>
          </span>
          <span className="font-mono text-[9px] text-violet-400 font-semibold uppercase flex items-center gap-1">
            <Sparkles className="h-3 w-3 animate-pulse" />
            Cluster Consensus
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {sortedPeers.map(peer => {
            const rating = targetItem.userRatings[peer.id] || 3.0;
            const affinity = Math.round((similarities[peer.id] || 0.1) * 100);

            return (
              <div 
                key={peer.id} 
                className="rounded-xl border border-slate-800/60 bg-slate-900/30 p-3 flex flex-col items-center text-center justify-between"
              >
                <div className="relative">
                  <img 
                    src={peer.avatar} 
                    alt={peer.name} 
                    className="h-10 w-10 rounded-full border border-violet-500/30 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-violet-600 px-1 py-0.2 font-mono text-[8px] font-extrabold text-white">
                    {affinity}%
                  </div>
                </div>

                <div className="mt-2.5">
                  <h5 className="font-sans text-[10px] font-bold text-white truncate max-w-[85px]">
                    {peer.name.split(' ')[0]}
                  </h5>
                  <p className="font-mono text-[8px] text-slate-500 uppercase mt-0.5">
                    Peer Cluster
                  </p>
                </div>

                <div className="mt-2 flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-2.5 w-2.5 ${i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-800'}`} 
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* People with similar interests also liked... */}
      <div className="space-y-3">
        <h4 className="font-sans text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          People with similar interests (like {topPeer.name.split(' ')[0]}) also liked:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {peerFavorites.map(item => (
            <div 
              key={item.id} 
              className="rounded-xl border border-slate-800 bg-slate-900/20 p-3.5 hover:border-slate-700 transition-all group flex flex-col justify-between h-32"
            >
              <div className="space-y-1">
                <span className="font-mono text-[8px] uppercase font-bold text-slate-500">
                  {item.category}
                </span>
                <h5 className="font-sans text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-white transition-colors">
                  {item.title}
                </h5>
                <p className="font-sans text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-900/60 font-mono text-[9px] text-slate-500">
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="h-2.5 w-2.5 fill-amber-400" />
                  {item.rating.toFixed(1)}
                </span>
                <span className="text-violet-400 flex items-center gap-0.5 font-bold">
                  {topPeer.name.split(' ')[0]} rated 5★
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
