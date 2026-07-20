import React, { useEffect, useState } from 'react';
import { Brain, Cpu, Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  onResetPrefs: () => void;
  hasPrefs: boolean;
}

export default function Header({ onResetPrefs, hasPrefs }: HeaderProps) {
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [aiEngine, setAiEngine] = useState<string>('Local Math Vector');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          const data = await res.json();
          setServerStatus('online');
          if (data.aiEngine && data.aiEngine.includes('Gemini')) {
            setAiEngine('Gemini Neural Active');
          } else {
            setAiEngine('Local Math Vector');
          }
        } else {
          setServerStatus('offline');
        }
      } catch (e) {
        setServerStatus('offline');
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-violet-500/20 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo and branding */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1px] shadow-lg shadow-violet-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950">
              <Brain className="h-5 w-5 text-cyan-400 animate-pulse" />
            </div>
            {/* Ambient indicator */}
            <div className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-cyan-400 border border-slate-950" />
          </div>
          <div>
            <span className="font-sans text-lg font-bold tracking-tight text-white bg-gradient-to-r from-white via-slate-200 to-violet-400 bg-clip-text text-transparent">
              AI Smart Recommendation Engine
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                Core v3.5
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span className="font-mono text-[9px] text-cyan-400">
                {aiEngine}
              </span>
            </div>
          </div>
        </div>

        {/* Server metrics & controls */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5">
            <div className="flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-violet-400" />
              <span className="font-mono text-[10px] text-slate-400">Status:</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${
                serverStatus === 'online' ? 'bg-emerald-400 shadow-emerald-400/50' :
                serverStatus === 'offline' ? 'bg-rose-500 shadow-rose-500/50' : 'bg-amber-400 shadow-amber-400/50'
              } animate-pulse shadow-sm`} />
              <span className="font-mono text-[10px] font-medium text-slate-200 uppercase tracking-wider">
                {serverStatus === 'online' ? 'ONLINE' : serverStatus === 'offline' ? 'OFFLINE' : 'CONNECTING'}
              </span>
            </div>
          </div>

          {hasPrefs && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onResetPrefs}
              className="flex items-center gap-2 rounded-lg border border-violet-500/30 bg-violet-950/20 px-3.5 py-1.5 text-xs font-semibold text-violet-300 transition-all hover:bg-violet-950/50 hover:border-violet-500/60 hover:text-white"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset Preferences
            </motion.button>
          )}

          <div className="relative flex items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/20 px-3 py-1.5 text-xs font-medium text-cyan-300">
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider">Neural Active</span>
          </div>
        </div>
      </div>
    </header>
  );
}
