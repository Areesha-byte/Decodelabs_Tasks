import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PreferenceForm from './components/PreferenceForm';
import PipelineVisualizer from './components/PipelineVisualizer';
import VectorSpace from './components/VectorSpace';
import OverlapComparison from './components/OverlapComparison';
import CollaborativeSync from './components/CollaborativeSync';
import RecommendationCard from './components/RecommendationCard';
import CardDetailsModal from './components/CardDetailsModal';
import SearchFilters from './components/SearchFilters';
import NotificationToast from './components/NotificationToast';
import { runRecommendationPipeline, RecommendationResult } from './recommendation/engine';
import { DatasetItem, RECOMMENDATION_DATASET, UserPreferences } from './data/dataset';
import { Sparkles, Brain, Sliders, Activity, Heart, Bookmark, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'match' | 'popularity' | 'rating'>('match');
  const [filterFavoritesOnly, setFilterFavoritesOnly] = useState(false);
  const [filterSavedOnly, setFilterSavedOnly] = useState(false);

  // Selected Item details modal state
  const [selectedResult, setSelectedResult] = useState<RecommendationResult | null>(null);

  // Favorites & Saved lists
  const [favorites, setFavorites] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);

  // Notifications
  const [toasts, setToasts] = useState<any[]>([]);

  // Sidebar interactive panel tab
  const [sidebarTab, setSidebarTab] = useState<'vector' | 'overlap' | 'peers'>('vector');

  // Trigger toast
  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToasts(prev => [...prev, { id: Math.random().toString(), message, type }]);
  };

  // Run pipeline based on preferences
  const recommendations = useMemo(() => {
    if (!preferences) return [];
    return runRecommendationPipeline(preferences);
  }, [preferences]);

  // Compute filtered & sorted recommendations
  const filteredRecommendations = useMemo(() => {
    let result = [...recommendations];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.item.title.toLowerCase().includes(q) ||
        r.item.description.toLowerCase().includes(q) ||
        r.item.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(r => r.item.category === selectedCategory);
    }

    // Favorites filter
    if (filterFavoritesOnly) {
      result = result.filter(r => favorites.includes(r.item.id));
    }

    // Saved filter
    if (filterSavedOnly) {
      result = result.filter(r => saved.includes(r.item.id));
    }

    // Sorting
    if (sortBy === 'popularity') {
      result.sort((a, b) => b.item.popularity - a.item.popularity);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.item.rating - a.item.rating);
    } else {
      // Sort by Match Score (Engine default)
      result.sort((a, b) => b.matchScore - a.matchScore);
    }

    return result;
  }, [recommendations, searchQuery, selectedCategory, sortBy, filterFavoritesOnly, filterSavedOnly, favorites, saved]);

  // Handle toggles
  const handleToggleFavorite = (itemId: string) => {
    const isFav = favorites.includes(itemId);
    if (isFav) {
      setFavorites(prev => prev.filter(id => id !== itemId));
      addToast('Removed from system favorites', 'info');
    } else {
      setFavorites(prev => [...prev, itemId]);
      addToast('Added to neural favorite registry', 'success');
    }
  };

  const handleToggleSave = (itemId: string) => {
    const isSaved = saved.includes(itemId);
    if (isSaved) {
      setSaved(prev => prev.filter(id => id !== itemId));
      addToast('Removed from saved index', 'info');
    } else {
      setSaved(prev => [...prev, itemId]);
      addToast('Securely mapped to local saved index', 'success');
    }
  };

  const handleCalculatePreferences = (prefs: UserPreferences) => {
    setPreferences(prefs);
    setIsProcessing(true);
    setShowResults(false);
  };

  const handlePipelineFinished = () => {
    setIsProcessing(false);
    setShowResults(true);
    addToast('Vector indexes resolved. Displaying matches.', 'success');
  };

  const handleResetPreferences = () => {
    setPreferences(null);
    setShowResults(false);
    setSearchQuery('');
    setSelectedCategory('All');
    setFilterFavoritesOnly(false);
    setFilterSavedOnly(false);
    addToast('Configuration reset. Initializing fresh tensor domain.', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative pb-12">
      {/* Dynamic ambient particle glow grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80 pointer-events-none" />

      {/* Primary header navbar */}
      <Header onResetPrefs={handleResetPreferences} hasPrefs={!!preferences} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <AnimatePresence mode="wait">
          {/* Welcome Screen / Preferences Form */}
          {!preferences && !isProcessing && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Futuristic Hero Section */}
              <div className="text-center max-w-3xl mx-auto py-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/20 px-4 py-1.5 text-xs text-violet-300 font-mono">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse text-violet-400" />
                  COGNITIVE NEURAL RECOMMENDATION SUITE
                </div>
                
                <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  Discover Resources Powered By{' '}
                  <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Multidimensional Matching
                  </span>
                </h1>
                
                <p className="font-sans text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  Map your lifestyle parameters, favorite sub-genres, and technical tag modifiers. Our hybrid engine resolves rule-based constraints, collaborative rating clusters, and TF-IDF cosine weights.
                </p>
              </div>

              {/* Central Preference form */}
              <div className="max-w-4xl mx-auto">
                <PreferenceForm onCalculate={handleCalculatePreferences} />
              </div>

              {/* Visual Teaser Cards (Teasing the database items) */}
              <div className="max-w-5xl mx-auto border-t border-slate-900 pt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-cyan-400" />
                    <span className="font-mono text-xs uppercase text-slate-400 font-bold">Teaser Catalog Index</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">{RECOMMENDATION_DATASET.length} Total records locked</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {RECOMMENDATION_DATASET.slice(0, 5).map(item => (
                    <div key={item.id} className="rounded-xl border border-slate-900 bg-slate-950/40 p-3 flex flex-col justify-between h-36">
                      <div className="space-y-1">
                        <span className="font-mono text-[8px] text-slate-500 uppercase">{item.category}</span>
                        <h5 className="font-sans text-[11px] font-bold text-slate-200 line-clamp-1">{item.title}</h5>
                        <p className="font-sans text-[9px] text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between text-slate-500 font-mono text-[8px] pt-1 border-t border-slate-900/60">
                        <span>★ {item.rating}</span>
                        <span>{item.budget.toUpperCase()} COST</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Processing / Computation Hologram Loader */}
          {isProcessing && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[70vh] max-w-5xl mx-auto space-y-8"
            >
              <div className="text-center space-y-2">
                <Brain className="h-12 w-12 text-cyan-400 mx-auto animate-pulse" />
                <h2 className="font-display text-2xl font-black text-white tracking-tight">Resolving Vector Relations...</h2>
                <p className="font-sans text-xs text-slate-400">Processing tag sets, calculating cosine similarity ratios, and sorting collaborative arrays.</p>
              </div>

              <div className="w-full">
                <PipelineVisualizer isProcessing={isProcessing} onAnimationComplete={handlePipelineFinished} />
              </div>
            </motion.div>
          )}

          {/* Core Applet Workspace Dashboard */}
          {showResults && preferences && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Row 1: Statistics Counters Dashboard */}
              <Dashboard recommendations={recommendations} activeCategory={preferences.category} />

              {/* Row 2: Multi-panel Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left side: Main Matches & Sorters (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Search filters toolbar */}
                  <SearchFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />

                  {/* Extra favorites/saved quick filtering flags */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setFilterFavoritesOnly(!filterFavoritesOnly)}
                      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-sans text-[10px] font-bold uppercase transition-all ${
                        filterFavoritesOnly 
                          ? 'bg-pink-950/20 border-pink-500 text-pink-400' 
                          : 'border-slate-800 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <Heart className={`h-3 w-3 ${filterFavoritesOnly ? 'fill-pink-400' : ''}`} />
                      Favorites Only ({favorites.length})
                    </button>

                    <button
                      onClick={() => setFilterSavedOnly(!filterSavedOnly)}
                      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-sans text-[10px] font-bold uppercase transition-all ${
                        filterSavedOnly 
                          ? 'bg-cyan-950/20 border-cyan-500 text-cyan-400' 
                          : 'border-slate-800 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <Bookmark className={`h-3 w-3 ${filterSavedOnly ? 'fill-cyan-400' : ''}`} />
                      Saved Index Only ({saved.length})
                    </button>
                  </div>

                  {/* Recommendations Cards Bento Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filteredRecommendations.length > 0 ? (
                      filteredRecommendations.map(result => (
                        <RecommendationCard
                          key={result.item.id}
                          result={result}
                          onViewDetails={setSelectedResult}
                          isFavorite={favorites.includes(result.item.id)}
                          isSaved={saved.includes(result.item.id)}
                          onToggleFavorite={() => handleToggleFavorite(result.item.id)}
                          onToggleSave={() => handleToggleSave(result.item.id)}
                        />
                      ))
                    ) : (
                      <div className="col-span-2 rounded-2xl border border-dashed border-slate-800 p-12 text-center text-slate-500">
                        No matches resolved inside active search constraints. Try adjusting filters or search queries.
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side: Interactive AI Space tabs (4 cols) */}
                <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                  {/* Tab triggers */}
                  <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-950 p-1 border border-slate-850">
                    {(['vector', 'overlap', 'peers'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setSidebarTab(tab)}
                        className={`rounded-lg py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${
                          sidebarTab === tab
                            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {tab === 'vector' ? 'Vector Map' : tab === 'overlap' ? 'TF-IDF' : 'Peer Sync'}
                      </button>
                    ))}
                  </div>

                  {/* Active Sidebar Tab render */}
                  <div className="transition-all duration-300">
                    {sidebarTab === 'vector' && (
                      <VectorSpace
                        recommendations={recommendations}
                        onSelectItem={(item) => {
                          const result = recommendations.find(r => r.item.id === item.id);
                          if (result) setSelectedResult(result);
                        }}
                        selectedItem={selectedResult ? selectedResult.item : null}
                      />
                    )}

                    {sidebarTab === 'overlap' && (
                      <OverlapComparison
                        recommendations={recommendations}
                        selectedItem={selectedResult ? selectedResult.item : null}
                      />
                    )}

                    {sidebarTab === 'peers' && (
                      <CollaborativeSync
                        selectedItem={selectedResult ? selectedResult.item : null}
                        userPreferences={preferences}
                      />
                    )}
                  </div>
                </div>

              </div>

              {/* Bottom Pipeline display for educational visualization */}
              <div className="pt-6 border-t border-slate-900">
                <PipelineVisualizer isProcessing={false} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Detail zoom expand modal */}
      <CardDetailsModal
        result={selectedResult}
        onClose={() => setSelectedResult(null)}
        userPreferences={preferences}
      />

      {/* Global Toast micro-notifiers */}
      <NotificationToast toasts={toasts} setToasts={setToasts} />
    </div>
  );
}
