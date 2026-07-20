import React from 'react';
import { motion } from 'motion/react';
import { RecommendationResult } from '../recommendation/engine';
import { DatasetItem } from '../data/dataset';
import { Layers, HelpCircle, ArrowRight, Check, AlertCircle } from 'lucide-react';

interface OverlapComparisonProps {
  recommendations: RecommendationResult[];
  selectedItem: DatasetItem | null;
}

export default function OverlapComparison({ recommendations, selectedItem }: OverlapComparisonProps) {
  // If no item is explicitly selected, fall back to the top recommended item
  const activeResult = selectedItem 
    ? recommendations.find(r => r.item.id === selectedItem.id) || recommendations[0]
    : recommendations[0];

  if (!activeResult) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-6 text-center">
        <p className="font-sans text-sm text-slate-400">Resolve preferences first to analyze overlap matrices.</p>
      </div>
    );
  }

  const { item, binaryOverlapScore, similarityPercentage } = activeResult;
  const binaryPercentage = Math.round(binaryOverlapScore * 100);
  const tfidfPercentage = similarityPercentage;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-6 backdrop-blur-md">
      <div className="mb-6">
        <h3 className="font-sans text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Layers className="h-4.5 w-4.5 text-pink-400" />
          Binary Overlap vs TF-IDF Neural Model
        </h3>
        <p className="font-sans text-xs text-slate-400 mt-0.5">
          Comparative proof of how basic string overlap matches fall short compared to frequency-weighted cosine similarity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Left Card: Binary Matching */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/10 p-5 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Model A: Set Binary Overlap
              </span>
              <span className="rounded-full bg-slate-950 px-2.5 py-0.5 font-mono text-[9px] text-slate-400 border border-slate-800">
                Intersection / Union
              </span>
            </div>
            
            <h4 className="font-sans text-sm font-bold text-white mb-1.5">
              Crude Token Count Intersection
            </h4>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Calculates the raw overlap ratio of shared tags. Every matched keyword (whether common like "premium" or specific like "AI") carries the identical weight of 1.0.
            </p>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between font-mono text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <AlertCircle className="h-3 w-3 text-amber-500" />
                Intersection Ratio:
              </span>
              <span className="text-amber-400 font-bold">{binaryPercentage}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${binaryPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-amber-400 shadow-sm shadow-amber-400/30"
              />
            </div>
          </div>
        </div>

        {/* Right Card: TF-IDF Weighted Cosine */}
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/5 p-5 relative overflow-hidden flex flex-col justify-between">
          {/* Subtle neon indicator */}
          <div className="absolute top-0 right-0 h-16 w-16 -mr-4 -mt-4 rounded-full bg-cyan-500/10 blur-xl" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                Model B: TF-IDF + Cosine Proximity
              </span>
              <span className="rounded-full bg-cyan-950/40 px-2.5 py-0.5 font-mono text-[9px] text-cyan-400 border border-cyan-500/20">
                Vector Similarity
              </span>
            </div>
            
            <h4 className="font-sans text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
              Dynamic Frequency Vectoring
            </h4>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Down-weights generic words while magnifying rare technical tag combinations. Calculates exact spatial proximity via cosine dot-products.
            </p>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between font-mono text-xs">
              <span className="text-cyan-400 flex items-center gap-1">
                <Check className="h-3 w-3 text-cyan-400" />
                Cosine Theta Proximity:
              </span>
              <span className="text-cyan-400 font-bold">{tfidfPercentage}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${tfidfPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-sm shadow-cyan-400/30"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Limitation analysis box */}
      <div className="mt-6 p-4 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-pink-400">
            Limitation Diagnostic for: <span className="text-white">"{item.title}"</span>
          </span>
          <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-2xl">
            {binaryPercentage === tfidfPercentage 
              ? "For this specific matching, both ratios resolved identically because the term weights happened to balance. However, in larger search indices, binary models suffer from tag-spam false positives."
              : binaryPercentage > tfidfPercentage 
                ? `Simple binary matching over-represents this match at ${binaryPercentage}% due to coincidental overlap of common words. Our TF-IDF engine filtered this down to ${tfidfPercentage}% by identifying that some matched keywords are high-frequency terms in our dataset, keeping your results pristine.`
                : `Simple binary matching fails to capture the relevance of this match (${binaryPercentage}%), but the TF-IDF engine correctly ranks it at ${tfidfPercentage}% because the matching terms (e.g., specific tags) are rare in the corpus, conveying a higher preference score.`}
          </p>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-pink-400 border border-pink-500/30 rounded-full px-3 py-1 bg-pink-950/10">
          Neural Correction: Done
        </div>
      </div>
    </div>
  );
}
