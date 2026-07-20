import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RecommendationResult } from '../recommendation/engine';
import { DatasetItem, CATEGORIES } from '../data/dataset';
import { Target, Circle, HelpCircle, Activity } from 'lucide-react';

interface VectorSpaceProps {
  recommendations: RecommendationResult[];
  onSelectItem: (item: DatasetItem) => void;
  selectedItem: DatasetItem | null;
}

const CATEGORY_COLORS: { [key: string]: { dot: string; glow: string; text: string } } = {
  "Tech & Gadgets": { dot: "bg-cyan-400", glow: "shadow-cyan-400/50", text: "text-cyan-400" },
  "Movies & Entertainment": { dot: "bg-pink-500", glow: "shadow-pink-500/50", text: "text-pink-500" },
  "Books & Literature": { dot: "bg-violet-500", glow: "shadow-violet-500/50", text: "text-violet-500" },
  "Online Courses & Skills": { dot: "bg-indigo-400", glow: "shadow-indigo-400/50", text: "text-indigo-400" },
  "Travel & Adventure": { dot: "bg-emerald-400", glow: "shadow-emerald-400/50", text: "text-emerald-400" }
};

export default function VectorSpace({ recommendations, onSelectItem, selectedItem }: VectorSpaceProps) {
  const [hoveredDot, setHoveredDot] = useState<DatasetItem | null>(null);

  // Take top 25 recommendations to keep the visualization extremely clean
  const itemsToPlot = recommendations.slice(0, 25);

  // SVG dimensions
  const width = 500;
  const height = 350;
  const centerX = width / 2;
  const centerY = height / 2;

  // Scale coordinates: database coords are 0 to 1, we project around center
  const projectCoords = (coords: { x: number; y: number }) => {
    // x from 0 to 1 -> cx from centerX - 180 to centerX + 180
    // y from 0 to 1 -> cy from centerY + 130 to centerY - 130
    const cx = centerX + (coords.x - 0.5) * 360;
    const cy = centerY - (coords.y - 0.5) * 260;
    return { cx, cy };
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-6 backdrop-blur-md grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 2D Projection SVG Map */}
      <div className="lg:col-span-2 relative flex flex-col justify-between">
        <div>
          <h3 className="font-sans text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Target className="h-4.5 w-4.5 text-cyan-400" />
            Multidimensional Vector Space
          </h3>
          <p className="font-sans text-xs text-slate-400 mt-0.5">
            Projection of TF-IDF item features into Euclidean space. Proximity to the center represents Cosine Similarity to your profile.
          </p>
        </div>

        {/* The Graphic Canvas */}
        <div className="relative w-full h-[350px] border border-slate-800 bg-slate-950 rounded-2xl overflow-hidden mt-4">
          {/* Scientific Grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
          
          {/* Concentric proximity rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-[260px] w-[260px] rounded-full border border-slate-900 flex items-center justify-center">
              <div className="h-[180px] w-[180px] rounded-full border border-slate-800/60 flex items-center justify-center">
                <div className="h-[100px] w-[100px] rounded-full border border-cyan-500/10 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full border border-violet-500/5" />
                </div>
              </div>
            </div>
          </div>

          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="relative z-10">
            {/* Draw vectors from center user profile to top recommended matches */}
            {itemsToPlot.slice(0, 5).map(result => {
              const { cx, cy } = projectCoords(result.item.vectorCoords);
              const isSelected = selectedItem?.id === result.item.id;
              
              return (
                <line
                  key={`line-${result.item.id}`}
                  x1={centerX}
                  y1={centerY}
                  x2={cx}
                  y2={cy}
                  stroke={isSelected ? "url(#laserGradSelected)" : "url(#laserGrad)"}
                  strokeWidth={isSelected ? 2 : 1}
                  strokeDasharray={isSelected ? "none" : "4,4"}
                  className={isSelected ? "" : "animate-[dash_20s_linear_infinite]"}
                  opacity={isSelected ? 0.9 : 0.3}
                />
              );
            })}

            {/* Custom SVG Gradients */}
            <defs>
              <linearGradient id="laserGrad" x1={centerX} y1={centerY} x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="laserGradSelected" x1={centerX} y1={centerY} x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* User Profile Core Dot */}
            <g>
              <circle
                cx={centerX}
                cy={centerY}
                r="16"
                fill="#0F172A"
                stroke="#7C3AED"
                strokeWidth="2"
                className="animate-pulse"
              />
              <circle
                cx={centerX}
                cy={centerY}
                r="6"
                fill="#06B6D4"
              />
              <circle
                cx={centerX}
                cy={centerY}
                r="1"
                fill="#ffffff"
              />
            </g>

            {/* Item Dots */}
            {itemsToPlot.map(result => {
              const { cx, cy } = projectCoords(result.item.vectorCoords);
              const isSelected = selectedItem?.id === result.item.id;
              const colorInfo = CATEGORY_COLORS[result.item.category] || { dot: "bg-slate-400", glow: "shadow-slate-400/50" };
              const colorHex = isSelected ? "#06B6D4" : result.item.category === "Tech & Gadgets" ? "#06B6D4" : result.item.category === "Movies & Entertainment" ? "#EC4899" : result.item.category === "Books & Literature" ? "#7C3AED" : result.item.category === "Online Courses & Skills" ? "#4F46E5" : "#10B981";

              return (
                <g 
                  key={result.item.id}
                  className="cursor-pointer"
                  onClick={() => onSelectItem(result.item)}
                  onMouseEnter={() => setHoveredDot(result.item)}
                  onMouseLeave={() => setHoveredDot(null)}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 10 : 6}
                    fill={colorHex}
                    opacity={isSelected ? 1 : 0.75}
                    stroke="#0F172A"
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-300 hover:scale-150"
                  />
                  {isSelected && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r="16"
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="1.5"
                      className="animate-ping"
                      opacity="0.4"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Scale Legend */}
          <div className="absolute bottom-3 left-4 font-mono text-[9px] text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Activity className="h-3 w-3 text-cyan-400" />
            Cosine Delta Axis (X/Y)
          </div>
        </div>
      </div>

      {/* Projection details info sidebar */}
      <div className="border-l border-slate-800 lg:pl-6 flex flex-col justify-between">
        <div>
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Vector Node Index
          </h4>
          
          <div className="space-y-3">
            {CATEGORY_RECORDS.map(cat => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <div className={`h-2.5 w-2.5 rounded-full ${cat.color}`} />
                  <span className="text-slate-300 font-medium">{cat.name}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500 font-semibold">{cat.short}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl border border-slate-800/80 bg-slate-900/20">
          <AnimatePresence mode="wait">
            {hoveredDot || selectedItem ? (
              <motion.div
                key={hoveredDot ? `hover-${hoveredDot.id}` : `select-${selectedItem?.id}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 font-bold">
                    {hoveredDot ? "Active Hover Target" : "Locked Vector Node"}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    ID: {(hoveredDot || selectedItem)?.id}
                  </span>
                </div>
                <h5 className="font-sans text-xs font-bold text-white line-clamp-1">
                  {(hoveredDot || selectedItem)?.title}
                </h5>
                <p className="font-sans text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                  {(hoveredDot || selectedItem)?.description}
                </p>
                <div className="flex justify-between font-mono text-[9px] text-slate-500 pt-1 border-t border-slate-800/60">
                  <span>Coords: [X: {(hoveredDot || selectedItem)?.vectorCoords.x.toFixed(2)}, Y: {(hoveredDot || selectedItem)?.vectorCoords.y.toFixed(2)}]</span>
                  <span className="text-cyan-400 font-bold">Similarity: {recommendations.find(r => r.item.id === (hoveredDot || selectedItem)?.id)?.similarityPercentage || 50}%</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center py-6"
              >
                <HelpCircle className="h-8 w-8 text-slate-600 mb-2" />
                <p className="font-sans text-xs text-slate-400">
                  Hover over or click vector dots in the graph projection to inspect coordinate values.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const CATEGORY_RECORDS = [
  { name: "Tech & Gadgets", color: "bg-cyan-400", short: "[TECH_NODE]" },
  { name: "Movies & Entertainment", color: "bg-pink-500", short: "[FILM_NODE]" },
  { name: "Books & Literature", color: "bg-violet-500", short: "[BOOK_NODE]" },
  { name: "Online Courses & Skills", color: "bg-indigo-400", short: "[GRAD_NODE]" },
  { name: "Travel & Adventure", color: "bg-emerald-400", short: "[TRAV_NODE]" }
];
