import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RecommendationResult } from '../recommendation/engine';
import { X, Sparkles, Brain, Cpu, Star, Activity, Percent, ArrowUpRight } from 'lucide-react';

interface CardDetailsModalProps {
  result: RecommendationResult | null;
  onClose: () => void;
  userPreferences: any;
}

interface AIExplanation {
  summary: string;
  vectorAlignment: string;
  collaborativeContext: string;
  neuralInsight: string;
}

export default function CardDetailsModal({ result, onClose, userPreferences }: CardDetailsModalProps) {
  const [aiExplain, setAiExplain] = useState<AIExplanation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (result) {
      const fetchAIExplanation = async () => {
        setIsLoading(true);
        setErrorMsg('');
        setAiExplain(null);
        try {
          const response = await fetch('/api/recommendations/explain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              item: result.item,
              preferences: userPreferences,
              matchScore: result.matchScore,
              similarityPercentage: result.similarityPercentage,
              technique: result.techniqueUsed
            })
          });

          if (response.ok) {
            const data = await response.json();
            setAiExplain(data);
          } else {
            setErrorMsg('Failed to synchronize with Gemini neural nodes.');
          }
        } catch (e) {
          setErrorMsg('Failed to establish server connection.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchAIExplanation();
    }
  }, [result, userPreferences]);

  if (!result) return null;

  const { item, matchScore, similarityPercentage, matchedKeywords, techniqueUsed } = result;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Blurred background overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/85 backdrop-blur-lg"
        />

        {/* Focused Card Center Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-violet-500/20 bg-slate-900/80 p-6 md:p-8 text-white shadow-2xl shadow-cyan-500/5 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Trigger Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-800 bg-slate-950 text-slate-400 transition-all hover:border-slate-600 hover:text-white"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          {/* Grid Layout: Left (Item Graphic & Details), Right (AI Explanation Terminal) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pt-4">
            {/* Left Panel: 5 Cols */}
            <div className="md:col-span-5 space-y-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 left-3 rounded-md border border-cyan-500/30 bg-cyan-950/80 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-cyan-300">
                  {item.category}
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Active Resource Target
                </span>
                <h3 className="font-sans text-2xl font-black text-white tracking-tight mt-1 leading-tight">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-slate-300 mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Technical Metrics metadata block */}
              <div className="grid grid-cols-2 gap-3.5 pt-3 border-t border-slate-800/60">
                <div className="rounded-xl bg-slate-950 p-3 border border-slate-900 font-mono">
                  <span className="text-[9px] text-slate-500 uppercase">Star Rating</span>
                  <div className="flex items-center gap-1 mt-1 text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span className="text-sm font-extrabold text-white">{item.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-950 p-3 border border-slate-900 font-mono">
                  <span className="text-[9px] text-slate-500 uppercase">Popularity</span>
                  <div className="flex items-center gap-1 mt-1 text-cyan-400">
                    <Activity className="h-3.5 w-3.5" />
                    <span className="text-sm font-extrabold text-white">{item.popularity}/100</span>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-950 p-3 border border-slate-900 font-mono">
                  <span className="text-[9px] text-slate-500 uppercase">Experience Node</span>
                  <div className="text-xs font-extrabold text-slate-300 mt-1 uppercase truncate">
                    {item.skillLevel}
                  </div>
                </div>

                <div className="rounded-xl bg-slate-950 p-3 border border-slate-900 font-mono">
                  <span className="text-[9px] text-slate-500 uppercase">Budget Weight</span>
                  <div className="text-xs font-extrabold text-slate-300 mt-1 uppercase truncate">
                    {item.budget} Cost
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: 7 Cols (AI Terminal) */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              {/* Header block with match stats */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Brain className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-bold text-white leading-none">
                      AI Explanation Panel
                    </h4>
                    <span className="font-mono text-[9px] text-slate-400 uppercase mt-0.5 inline-block">
                      {techniqueUsed} Engine Route
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-mono text-[9px] text-slate-500 uppercase block">Affinity Match</span>
                    <span className="font-mono text-base font-extrabold text-cyan-400">{matchScore}%</span>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-800" />
                  <div className="text-right">
                    <span className="font-mono text-[9px] text-slate-500 uppercase block">Cosine Sim</span>
                    <span className="font-mono text-base font-extrabold text-violet-400">{similarityPercentage}%</span>
                  </div>
                </div>
              </div>

              {/* Interactive Loading or Content Card */}
              <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 font-mono text-xs leading-relaxed relative min-h-[250px] flex flex-col justify-between">
                {/* Simulated AI shell print effect */}
                <div className="absolute top-3 right-3 flex gap-1.5 pointer-events-none">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>

                <div className="space-y-4">
                  {isLoading ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="font-mono text-[10px] text-cyan-400/70">INITIALIZING NEURAL OVERLAY CONNECT...</div>
                      <div className="h-4 w-1/3 rounded bg-slate-900" />
                      <div className="h-16 w-full rounded bg-slate-900" />
                      <div className="h-4 w-1/4 rounded bg-slate-900" />
                      <div className="h-12 w-full rounded bg-slate-900" />
                    </div>
                  ) : errorMsg ? (
                    <div className="space-y-2 text-rose-400 font-mono">
                      <p>CRITICAL_ERROR: neural handshake failed.</p>
                      <p className="text-[10px] text-slate-500">{errorMsg}</p>
                    </div>
                  ) : aiExplain ? (
                    <div className="space-y-4 font-sans text-xs text-slate-300">
                      {/* Summary Section */}
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <Cpu className="h-3 w-3 text-cyan-400" />
                          Synthetic Overview
                        </span>
                        <p className="leading-relaxed text-white font-semibold">
                          {aiExplain.summary}
                        </p>
                      </div>

                      {/* Vector Alignment Section */}
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-violet-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <Activity className="h-3 w-3 text-violet-400" />
                          TF-IDF Matrix Projection
                        </span>
                        <p className="leading-relaxed text-slate-300">
                          {aiExplain.vectorAlignment}
                        </p>
                      </div>

                      {/* Collaborative Context Section */}
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-pink-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <Percent className="h-3 w-3 text-pink-400" />
                          Collaborative Cluster Override
                        </span>
                        <p className="leading-relaxed text-slate-300">
                          {aiExplain.collaborativeContext}
                        </p>
                      </div>

                      {/* Neural Insight Section */}
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <Sparkles className="h-3 w-3 text-emerald-400" />
                          Neural Synergy Insight
                        </span>
                        <p className="leading-relaxed text-slate-300">
                          {aiExplain.neuralInsight}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-500 font-mono py-12 text-center">
                      Resolving quantum index...
                    </div>
                  )}
                </div>

                {/* Tags overlap check */}
                <div className="pt-4 border-t border-slate-900 mt-4 font-mono text-[10px] text-slate-500 space-y-1">
                  <div>
                    Matched interests: 
                    <span className="text-cyan-400 ml-1">
                      {matchedKeywords.length > 0 ? matchedKeywords.join(', ') : 'Category synergy match'}
                    </span>
                  </div>
                  <div>
                    Filtering logic: 
                    <span className="text-violet-400 ml-1">
                      {techniqueUsed} Matching Model
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-950 py-3 text-center text-xs font-bold text-slate-400 hover:border-slate-600 hover:text-white transition-all cursor-pointer"
                >
                  DISMISS OVERLAY
                </button>
                <a
                  href="https://ai.studio"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/10 flex items-center gap-1.5 hover:from-cyan-400 hover:to-violet-500 transition-all"
                >
                  UPGRADE ENGINE
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
