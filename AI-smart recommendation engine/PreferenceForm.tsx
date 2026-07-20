import React, { useState } from 'react';
import { CATEGORIES, GENRES_BY_CATEGORY, INTEREST_CHIPS, TAG_CHIPS, UserPreferences } from '../data/dataset';
import { ChevronRight, ArrowRight, Sparkles, Laptop, Film, Book, GraduationCap, Compass, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PreferenceFormProps {
  onCalculate: (prefs: UserPreferences) => void;
}

const CATEGORY_ICONS: { [key: string]: any } = {
  "Tech & Gadgets": Laptop,
  "Movies & Entertainment": Film,
  "Books & Literature": Book,
  "Online Courses & Skills": GraduationCap,
  "Travel & Adventure": Compass
};

export default function PreferenceForm({ onCalculate }: PreferenceFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [category, setCategory] = useState<string>('');
  const [genres, setGenres] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState<'low' | 'medium' | 'high'>('medium');
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [difficulty, setDifficulty] = useState<'easy' | 'moderate' | 'hard'>('moderate');
  const [duration, setDuration] = useState<'short' | 'medium' | 'long'>('medium');
  const [tags, setTags] = useState<string[]>([]);

  // Toggle helpers
  const handleToggleGenre = (g: string) => {
    setGenres(prev => 
      prev.includes(g) ? prev.filter(item => item !== g) : [...prev, g]
    );
  };

  const handleToggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) ? prev.filter(item => item !== interest) : [...prev, interest]
    );
  };

  const handleToggleTag = (tag: string) => {
    setTags(prev => 
      prev.includes(tag) ? prev.filter(item => item !== tag) : [...prev, tag]
    );
  };

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    // Reset specific sub-genres when category changes
    setGenres([]);
  };

  const handleNext = () => {
    if (currentStep === 1 && !category) return; // Category required
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    onCalculate({
      category,
      genres,
      interests,
      budget,
      skillLevel,
      difficulty,
      duration,
      tags
    });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-violet-500/25 bg-slate-900/60 p-6 md:p-8 backdrop-blur-md shadow-2xl shadow-violet-500/5">
      {/* Dynamic Background Blob */}
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-violet-600/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-cyan-600/10 blur-2xl pointer-events-none" />

      {/* Progress header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
            Dimension Configuration
          </span>
          <span className="font-mono text-xs text-slate-500">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="mt-3 flex h-1 w-full gap-1 rounded-full bg-slate-800">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 rounded-full transition-all duration-300 ${
                i + 1 <= currentStep 
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-400 shadow-sm shadow-cyan-400/50' 
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <div className="min-h-[280px]">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <h3 className="font-sans text-xl font-bold text-white tracking-tight">Select Core Recommendation Domain</h3>
                <p className="font-sans text-sm text-slate-400 mt-1">This configures the primary recommendation subset and loads relevant sub-genres.</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 pt-2">
                {CATEGORIES.map(cat => {
                  const IconComponent = CATEGORY_ICONS[cat];
                  const isSelected = category === cat;
                  return (
                    <motion.button
                      key={cat}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategorySelect(cat)}
                      className={`relative flex items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                        isSelected 
                          ? 'border-cyan-400 bg-cyan-950/20 shadow-md shadow-cyan-500/10' 
                          : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                      }`}
                    >
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                        isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-sans text-sm font-semibold text-white">{cat}</h4>
                        <span className="font-mono text-[10px] text-slate-500 uppercase">Vector Hub</span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-sans text-xl font-bold text-white tracking-tight">Focus Mapping & Interests</h3>
                <p className="font-sans text-sm text-slate-400 mt-1">Refine your recommendation parameters by mapping target sub-genres and general interest keywords.</p>
              </div>

              {/* Sub genres dynamic */}
              {category && GENRES_BY_CATEGORY[category] && (
                <div className="space-y-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-violet-400">
                    Specific {category} Sub-Genres:
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {GENRES_BY_CATEGORY[category].map(g => {
                      const isSelected = genres.includes(g);
                      return (
                        <motion.button
                          key={g}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleToggleGenre(g)}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/30 ring-1 ring-violet-400/50' 
                              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {g}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Interests general chips */}
              <div className="space-y-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  Global Interests & Themes:
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {INTEREST_CHIPS.map(interest => {
                    const isSelected = interests.includes(interest);
                    return (
                      <motion.button
                        key={interest}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleToggleInterest(interest)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-sm shadow-cyan-500/30 ring-1 ring-cyan-400/50' 
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {interest}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-sans text-xl font-bold text-white tracking-tight">Attributes & Environment Matrices</h3>
                <p className="font-sans text-sm text-slate-400 mt-1">Tune constraints for matching resource complexity, budget bounds, and duration limits.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-2">
                {/* Budget Selection */}
                <div className="space-y-2">
                  <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">Budget Range</label>
                  <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-950 p-1 border border-slate-800">
                    {(['low', 'medium', 'high'] as const).map(b => (
                      <button
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                          budget === b 
                            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Selection */}
                <div className="space-y-2">
                  <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">Preferred Duration</label>
                  <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-950 p-1 border border-slate-800">
                    {(['short', 'medium', 'long'] as const).map(d => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                          duration === d 
                            ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skill Level Selection */}
                <div className="space-y-2">
                  <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">Your Experience Skill Level</label>
                  <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-950 p-1 border border-slate-800">
                    {(['beginner', 'intermediate', 'advanced'] as const).map(sl => (
                      <button
                        key={sl}
                        onClick={() => setSkillLevel(sl)}
                        className={`rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                          skillLevel === sl 
                            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {sl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Selection */}
                <div className="space-y-2">
                  <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">Expected Complexity</label>
                  <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-950 p-1 border border-slate-800">
                    {(['easy', 'moderate', 'hard'] as const).map(diff => (
                      <button
                        key={diff}
                        onClick={() => setDifficulty(diff)}
                        className={`rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                          difficulty === diff 
                            ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-sans text-xl font-bold text-white tracking-tight">Custom Vector Tag Modifiers</h3>
                <p className="font-sans text-sm text-slate-400 mt-1">Specify additional exact-match metadata constraints to skew weights in the vector index mapping.</p>
              </div>

              <div className="space-y-3">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-pink-400">
                  Target Tag Modifiers:
                </span>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {TAG_CHIPS.map(tag => {
                    const isSelected = tags.includes(tag);
                    return (
                      <motion.button
                        key={tag}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleToggleTag(tag)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected 
                            ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-md shadow-pink-500/25 ring-1 ring-pink-400/50' 
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                        #{tag}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Selection Summary */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-400 space-y-2">
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-violet-400 font-semibold">Active Profile:</span>
                  <span className="text-white font-bold">{category || "Unspecified Category"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Genres mapped:</span>
                  <span className="text-slate-200 text-right">{genres.length > 0 ? genres.join(', ') : 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interests/Themes:</span>
                  <span className="text-slate-200 text-right">{interests.length > 0 ? interests.join(', ') : 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Constraints:</span>
                  <span className="text-slate-200">Budget:{budget} • Skill:{skillLevel} • Duration:{duration}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Control Buttons */}
      <div className="mt-8 flex justify-between border-t border-slate-800 pt-6">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`rounded-xl border border-slate-800 px-5 py-2.5 font-sans text-xs font-semibold tracking-wider text-slate-400 transition-all ${
            currentStep === 1 
              ? 'opacity-30 cursor-not-allowed' 
              : 'bg-slate-900 hover:bg-slate-800 hover:text-white'
          }`}
        >
          PREVIOUS
        </button>

        {currentStep < totalSteps ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={currentStep === 1 && !category}
            className={`flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 font-sans text-xs font-bold tracking-wider text-white shadow-lg transition-all ${
              currentStep === 1 && !category 
                ? 'opacity-40 cursor-not-allowed' 
                : 'shadow-violet-600/20 hover:from-violet-500 hover:to-indigo-500'
            }`}
          >
            NEXT STEP
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-7 py-2.5 font-sans text-xs font-bold tracking-wider text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-violet-500"
          >
            RESOLVE RECOMMENDATIONS
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
