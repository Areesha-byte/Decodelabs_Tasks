import React, { useState } from 'react';
import { HelpCircle, Sliders, ArrowRight, Lightbulb, Compass, Search, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface PredefinedComparison {
  userPhrase: string;
  keywordMatchResult: 'success' | 'fail';
  matchedRule: string;
  simulatedSimilarity: number;
  closestEmbeddingCategory: string;
  explanation: string;
}

const COMPARISON_DATA: PredefinedComparison[] = [
  {
    userPhrase: "Can you define what artificial intelligence means?",
    keywordMatchResult: 'success',
    matchedRule: 'elif "define artificial intelligence" in user_input',
    simulatedSimilarity: 0.95,
    closestEmbeddingCategory: "AI Concepts",
    explanation: "This succeeds in both! The rule-based system matches the literal substring 'define artificial intelligence' exactly. The vector model calculates a 0.95 similarity score because the vectors for 'define' and 'means' cluster closely together with 'artificial intelligence'."
  },
  {
    userPhrase: "Explain smart neural computer systems to me",
    keywordMatchResult: 'fail',
    matchedRule: 'Catch-all else block (No keywords matched)',
    simulatedSimilarity: 0.82,
    closestEmbeddingCategory: "AI Concepts",
    explanation: "The rule-based system fails because none of our exact strings like 'what is ai' are found in this query. However, a vector model succeeds! It understands that 'smart neural computer systems' is semantically identical to 'AI', calculating a high 0.82 similarity."
  },
  {
    userPhrase: "What's up buddy, how's life treating you?",
    keywordMatchResult: 'fail',
    matchedRule: 'Catch-all else block (No keywords matched)',
    simulatedSimilarity: 0.88,
    closestEmbeddingCategory: "Well-being Query",
    explanation: "Our rule-based script only checks for 'how are you' or 'how's it going'. Casual slang fails. A vector embedding easily pairs 'how's life treating you' with the 'well-being' cluster at 0.88 similarity, outputting a friendly response."
  },
  {
    userPhrase: "Are you built by some programmer?",
    keywordMatchResult: 'fail',
    matchedRule: 'Catch-all else block (No keywords matched)',
    simulatedSimilarity: 0.84,
    closestEmbeddingCategory: "Creator Query",
    explanation: "The rule-based checks only look for 'who created you' or 'who built you'. The vector space places 'built by some programmer' near the 'Creator Query' cluster with 0.84 cosine similarity, matching perfectly."
  }
];

export default function ConceptBridge() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(0.80);
  const [customPhrase, setCustomPhrase] = useState<string>('');
  const [customTrace, setCustomTrace] = useState<PredefinedComparison | null>(null);

  const selectedData = customTrace || COMPARISON_DATA[selectedIdx];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPhrase.trim()) return;

    const lowerInput = customPhrase.trim().toLowerCase();
    
    // Simple heuristic for demo
    let keywordMatchResult: 'success' | 'fail' = 'fail';
    let matchedRule = 'Catch-all else block (No keywords matched)';
    let simulatedSimilarity = 0.35;
    let closestEmbeddingCategory = "Unknown Fallback";

    if (lowerInput.includes("what is ai") || lowerInput.includes("define artificial intelligence")) {
      keywordMatchResult = 'success';
      matchedRule = 'elif "what is ai" in user_input';
      simulatedSimilarity = 0.98;
      closestEmbeddingCategory = "AI Concepts";
    } else if (lowerInput.includes("smart") || lowerInput.includes("neural") || lowerInput.includes("algorithm") || lowerInput.includes("machine") || lowerInput.includes("deep learning")) {
      simulatedSimilarity = 0.86;
      closestEmbeddingCategory = "AI Concepts";
    } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      keywordMatchResult = 'success';
      matchedRule = 'elif user_input in ["hi", "hello", ...]';
      simulatedSimilarity = 0.96;
      closestEmbeddingCategory = "Greetings";
    } else if (lowerInput.includes("who are you") || lowerInput.includes("name")) {
      keywordMatchResult = 'success';
      matchedRule = 'elif "your name" in user_input';
      simulatedSimilarity = 0.92;
      closestEmbeddingCategory = "Identity";
    } else if (lowerInput.includes("creator") || lowerInput.includes("maker") || lowerInput.includes("dev") || lowerInput.includes("programmer")) {
      simulatedSimilarity = 0.78;
      closestEmbeddingCategory = "Creator Query";
    }

    setCustomTrace({
      userPhrase: customPhrase,
      keywordMatchResult,
      matchedRule,
      simulatedSimilarity,
      closestEmbeddingCategory,
      explanation: keywordMatchResult === 'success' 
        ? "Exact substring match occurred. Both systems recognize the query successfully."
        : `The rule-based chatbot failed to match exact keywords. However, the vector space placed this query in the '${closestEmbeddingCategory}' neighborhood with a similarity of ${simulatedSimilarity.toFixed(2)}.`
    });
  };

  const clearCustom = () => {
    setCustomTrace(null);
    setCustomPhrase('');
  };

  return (
    <div className="space-y-8" id="concept-bridge-container">
      {/* Intro Explanation Banner */}
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400 animate-spin-slow" />
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider font-semibold">Theoretical Bridge</span>
          </div>
          <h2 className="font-sans font-bold text-neutral-100 text-xl tracking-tight">From Keywords to High-Dimensional Vectors</h2>
          <p className="text-neutral-400 text-sm leading-relaxed font-sans">
            Your Python assignment uses <strong>Keyword Matching</strong> (conditional testing on literal character strings). 
            Modern AI chatbots instead use <strong>Vector Embeddings</strong>. They represent entire meanings as long lists of numbers 
            (vectors) inside a multi-dimensional mathematical coordinate space, allowing systems to grasp <em>intent</em> rather than relying on exact word configurations.
          </p>
        </div>
        <div className="md:col-span-4 bg-neutral-950/80 p-4 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
            <Lightbulb className="w-4 h-4" />
            <span>Keyword Disadvantage</span>
          </div>
          <p className="text-neutral-500 text-xs leading-relaxed font-sans">
            If the user asks "Explain smart neural computers", the chatbot returns <strong>"Sorry, I don't understand that."</strong> because those words aren't in the exact rules, even though the user is asking about AI.
          </p>
        </div>
      </div>

      {/* Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Simulator Controls & Vectors Visualization */}
        <div className="lg:col-span-7 flex flex-col bg-neutral-950 border border-neutral-800 rounded-2xl p-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-sans font-bold text-neutral-100 text-base">Semantic Similarity Simulator</h3>
            <span className="text-[10px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-400 px-2 py-1 rounded">
              INTERACTIVE SANDBOX
            </span>
          </div>

          {/* Preset Chooser */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Test Sample Phrases:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COMPARISON_DATA.map((comparison, idx) => (
                <button
                  key={idx}
                  onClick={() => { setSelectedIdx(idx); setCustomTrace(null); }}
                  className={`p-3 text-left rounded-xl border text-xs font-sans transition flex flex-col justify-between h-20 ${
                    selectedIdx === idx && !customTrace
                      ? 'bg-emerald-950/20 border-emerald-500/60 text-emerald-100'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  <span className="font-medium line-clamp-2">"{comparison.userPhrase}"</span>
                  <span className={`text-[10px] font-mono mt-1 ${comparison.keywordMatchResult === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    Keywords: {comparison.keywordMatchResult.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Try Form */}
          <form onSubmit={handleCustomSubmit} className="space-y-2">
            <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">Or Try Any Custom Query:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customPhrase}
                onChange={(e) => setCustomPhrase(e.target.value)}
                placeholder="Type e.g., 'Explain deep learning models'..."
                className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-sm font-sans text-neutral-100 outline-none transition"
              />
              <button
                type="submit"
                disabled={!customPhrase.trim()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 text-white text-xs rounded-xl flex items-center gap-1.5 transition font-medium cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Simulate</span>
              </button>
              {customTrace && (
                <button
                  type="button"
                  onClick={clearCustom}
                  className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-xl border border-neutral-700 font-medium transition cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </form>

          {/* Vector Slider */}
          <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Cosine Similarity Threshold
              </span>
              <span className="text-amber-400 font-bold text-sm">
                &ge; {similarityThreshold.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.50"
              max="0.95"
              step="0.05"
              value={similarityThreshold}
              onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-neutral-950 h-1 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-[10px] text-neutral-500 font-sans leading-relaxed">
              In Vector Search, a similarity threshold determines matches. If the computed Cosine Similarity score is higher than this setting, the chatbot handles the intent successfully.
            </p>
          </div>
        </div>

        {/* Comparison Comparison & Graph Representation */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Diagnostic Display */}
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5 space-y-5 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Comparison Diagnostics</h4>
              
              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
                <div className="text-[10px] font-mono text-neutral-500 uppercase">Input Sentence:</div>
                <div className="text-xs font-mono font-medium text-white">"{selectedData.userPhrase}"</div>
              </div>

              {/* Keyword Result Box */}
              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Keyword-Based Engine</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    selectedData.keywordMatchResult === 'success' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {selectedData.keywordMatchResult === 'success' ? 'MATCH FOUND' : 'FALLBACK TRIGGERED'}
                  </span>
                </div>
                <div className="text-xs font-mono space-y-1">
                  <div className="text-neutral-400 text-[11px] truncate">
                    Matched Rule: <code className="text-amber-400">{selectedData.matchedRule}</code>
                  </div>
                </div>
              </div>

              {/* Vector Embedding Result Box */}
              {(() => {
                const vectorSucceeds = selectedData.simulatedSimilarity >= similarityThreshold;
                return (
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Vector Embedding Engine</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        vectorSucceeds 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {vectorSucceeds ? 'SEMAN-MATCH OK' : 'NO SEMAN-MATCH'}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-neutral-400">Semantic Neighborhood:</span>
                        <span className="text-sky-400 font-bold">{selectedData.closestEmbeddingCategory}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-neutral-400">Cosine Similarity:</span>
                        <span className={`font-bold ${vectorSucceeds ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {selectedData.simulatedSimilarity.toFixed(2)}
                        </span>
                      </div>
                      {/* Visual progress bar */}
                      <div className="w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${vectorSucceeds ? 'bg-emerald-500' : 'bg-rose-500'}`}
                          style={{ width: `${selectedData.simulatedSimilarity * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Explanation Commentary */}
            <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl flex gap-2.5 items-start mt-4">
              <AlertCircle className="w-4.5 h-4.5 text-sky-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-sky-400 font-bold uppercase block">Interactive Commentary</span>
                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                  {selectedData.explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
