import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sliders, Cpu, Activity, Cpu as Engine, Star, CheckCircle2, RefreshCw } from 'lucide-react';

interface PipelineVisualizerProps {
  isProcessing: boolean;
  onAnimationComplete?: () => void;
}

interface StepNode {
  id: number;
  label: string;
  sub: string;
  desc: string;
  icon: any;
  color: string;
}

const PIPELINE_STEPS: StepNode[] = [
  {
    id: 1,
    label: "Input Dimensions",
    sub: "Preferences Matrix",
    desc: "Collect and model category, sub-genres, interest chips, and tag matrices.",
    icon: Sliders,
    color: "from-cyan-500 to-indigo-500"
  },
  {
    id: 2,
    label: "Data Preprocessing",
    sub: "Filtering Invalid",
    desc: "Step 1: Rule-based verification. Prune items violating hard constraints (budget/skill).",
    icon: Cpu,
    color: "from-indigo-500 to-violet-500"
  },
  {
    id: 3,
    label: "Feature Extraction",
    sub: "TF-IDF Weighting",
    desc: "Extract document frequencies (DF). Create term-frequency (TF) matrices of selected tags.",
    icon: Activity,
    color: "from-violet-500 to-purple-500"
  },
  {
    id: 4,
    label: "Similarity Engine",
    sub: "Cosine Projection",
    desc: "Step 2: Vector dot product calculation. Score content-based and collaborative correlation.",
    icon: Engine,
    color: "from-purple-500 to-fuchsia-500"
  },
  {
    id: 5,
    label: "Ranking & Sorter",
    sub: "Composite Scoring",
    desc: "Step 3: Combine hybrid weights (50% content, 30% collaborative, 20% stars/popular).",
    icon: Star,
    color: "from-fuchsia-500 to-pink-500"
  },
  {
    id: 6,
    label: "Resolved Output",
    sub: "Top Neural Matches",
    desc: "Step 4: Resolve top candidates. Dispatch vector arrays to responsive dashboard cards.",
    icon: CheckCircle2,
    color: "from-pink-500 to-cyan-500"
  }
];

export default function PipelineVisualizer({ isProcessing, onAnimationComplete }: PipelineVisualizerProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (isProcessing) {
      setActiveStep(1);
      const timer1 = setTimeout(() => setActiveStep(2), 500);
      const timer2 = setTimeout(() => setActiveStep(3), 1000);
      const timer3 = setTimeout(() => setActiveStep(4), 1500);
      const timer4 = setTimeout(() => setActiveStep(5), 2000);
      const timer5 = setTimeout(() => setActiveStep(6), 2500);
      const timer6 = setTimeout(() => {
        setActiveStep(0);
        if (onAnimationComplete) onAnimationComplete();
      }, 3100);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
        clearTimeout(timer6);
      };
    }
  }, [isProcessing]);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-6 backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-sans text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
            Neural Recommendation Pipeline
          </h3>
          <p className="font-sans text-xs text-slate-400 mt-0.5">Real-time flow of high-dimension tensor matching, rule checks, and rank resolving.</p>
        </div>
        {isProcessing && (
          <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 font-mono text-[10px] text-cyan-400 font-semibold animate-pulse">
            <RefreshCw className="h-3 w-3 animate-spin" />
            PROCESSING MATRIX...
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative">
        {/* Step Cards */}
        {PIPELINE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isNodeActive = activeStep === step.id;
          const isNodeCompleted = activeStep > step.id || activeStep === 0;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
                isNodeActive 
                  ? 'border-cyan-400 bg-slate-900 shadow-lg shadow-cyan-400/10' 
                  : isNodeCompleted && activeStep > 0
                    ? 'border-slate-800 bg-slate-900/60'
                    : 'border-slate-800/50 bg-slate-900/20'
              }`}
            >
              {/* Active neon scanning line */}
              {isNodeActive && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-500 animate-pulse" />
              )}

              <div className="flex items-center justify-between mb-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  isNodeActive 
                    ? 'bg-gradient-to-tr ' + step.color + ' text-white' 
                    : 'bg-slate-900 text-slate-500'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded ${
                  isNodeActive 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'bg-slate-950 text-slate-600'
                }`}>
                  NODE 0{step.id}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className={`font-sans text-xs font-bold truncate transition-colors ${
                  isNodeActive ? 'text-white' : 'text-slate-300'
                }`}>
                  {step.label}
                </h4>
                <p className="font-mono text-[9px] text-cyan-400 uppercase tracking-wide font-medium">
                  {step.sub}
                </p>
                <p className="font-sans text-[10px] text-slate-500 mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Glowing decorative background for active node */}
              {isNodeActive && (
                <div className="absolute -bottom-8 -right-8 h-16 w-16 rounded-full bg-cyan-400/5 blur-xl pointer-events-none" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
