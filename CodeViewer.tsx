import React, { useState } from 'react';
import { PYTHON_CHATBOT_CODE } from '../chatbot_code';
import { Copy, Check, Terminal, Code, Info, FileText, Settings, Play } from 'lucide-react';

interface CodeViewerProps {
  activeLineId: string;
}

export default function CodeViewer({ activeLineId }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PYTHON_CHATBOT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Maps terminal action to specific line indicators or explanation pointers
  const getBranchHighlight = () => {
    switch (activeLineId) {
      case 'exit':
        return 'Handling exit commands: "bye", "exit", "quit", "goodbye"';
      case 'greeting':
        return 'Handling greetings: "hi", "hello", "hey", etc.';
      case 'name':
        return 'Handling identity queries about name/who are you';
      case 'creator':
        return 'Handling creator question: "who created you"';
      case 'mechanism':
        return 'Handling functional questions about rule-based mechanism';
      case 'definition':
        return 'Handling AI definition query';
      case 'ipo':
        return 'Handling IPO model explanation query';
      case 'state':
        return 'Handling small-talk greeting: "how are you"';
      case 'joke':
        return 'Handling a witty programmer joke';
      case 'fallback':
        return 'Catch-all else block triggered for unrecognized input';
      default:
        return 'Continuous while True loop waiting for input...';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="code-viewer-grid">
      {/* Code Container (Left) */}
      <div className="lg:col-span-8 flex flex-col bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Code Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono text-neutral-300">main.py (Python 3.10+)</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-lg transition font-medium cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Python Code</span>
              </>
            )}
          </button>
        </div>

        {/* Live highlight bar */}
        {activeLineId !== 'init' && (
          <div className="bg-emerald-950/40 border-b border-emerald-900/40 px-4 py-2 flex items-center justify-between text-xs text-emerald-300 font-mono">
            <div className="flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span><strong>Active Execution Branch:</strong> {getBranchHighlight()}</span>
            </div>
            <span className="px-1.5 py-0.5 bg-emerald-900/40 rounded text-[10px]">LIFETIME TRACE</span>
          </div>
        )}

        {/* Code Box */}
        <div className="flex-1 p-4 overflow-auto max-h-[550px] font-mono text-xs leading-relaxed text-neutral-300 select-all scrollbar-thin">
          <pre className="whitespace-pre">
            {PYTHON_CHATBOT_CODE.split('\n').map((line, idx) => {
              // Simple heuristic to check if this line is in the active branch
              let isLineHighlighted = false;
              if (activeLineId === 'exit' && line.includes('["bye", "exit", "quit", "goodbye"]')) isLineHighlighted = true;
              if (activeLineId === 'greeting' && line.includes('["hi", "hello", "hey", "good morning", "good evening"]')) isLineHighlighted = true;
              if (activeLineId === 'name' && line.includes('"your name" in user_input')) isLineHighlighted = true;
              if (activeLineId === 'creator' && line.includes('"who created you" in user_input')) isLineHighlighted = true;
              if (activeLineId === 'mechanism' && line.includes('"how do you work" in user_input')) isLineHighlighted = true;
              if (activeLineId === 'definition' && line.includes('"what is ai" in user_input')) isLineHighlighted = true;
              if (activeLineId === 'ipo' && line.includes('"ipo model" in user_input')) isLineHighlighted = true;
              if (activeLineId === 'state' && line.includes('"how are you" in user_input')) isLineHighlighted = true;
              if (activeLineId === 'joke' && line.includes('"joke" in user_input')) isLineHighlighted = true;
              if (activeLineId === 'fallback' && line.includes('# If no keywords match, provide a polite fallback response')) isLineHighlighted = true;

              return (
                <div 
                  key={idx} 
                  className={`flex ${isLineHighlighted ? 'bg-emerald-950/50 border-l-2 border-emerald-500 py-0.5 text-emerald-200' : ''}`}
                >
                  <span className="inline-block w-8 text-neutral-600 text-right pr-3 select-none">{idx + 1}</span>
                  <span>{line}</span>
                </div>
              );
            })}
          </pre>
        </div>
      </div>

      {/* Logic Documentation (Right) */}
      <div className="lg:col-span-4 flex flex-col gap-4" id="documentation-section">
        {/* IPO Model Review */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-400" />
            <h3 className="font-sans font-semibold text-neutral-100 text-base">Key Technical Constructs</h3>
          </div>

          <div className="space-y-4 font-sans text-sm text-neutral-300">
            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
              <code className="text-amber-400 font-mono text-xs block mb-1">while True</code>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Creates a continuous, non-terminating loop. This holds the conversational state alive, waiting for successive user prompts until an exit clause breaks it.
              </p>
            </div>

            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
              <code className="text-sky-400 font-mono text-xs block mb-1">.strip().lower()</code>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Sanitizes input by stripping trailing whitespaces and lowercasing letters. It ensures greetings like " Hey " are normalized to "hey" for robust matching.
              </p>
            </div>

            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
              <code className="text-emerald-400 font-mono text-xs block mb-1">in Operator (Membership)</code>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Checks if an input matches elements inside a list (e.g., exit strings) or is a substring of the user's longer prompt (e.g., checking if "joke" is contained in the query).
              </p>
            </div>

            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
              <code className="text-rose-400 font-mono text-xs block mb-1">try ... except</code>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Catches EOFError or KeyboardInterrupt errors gracefully if the console is suddenly closed or interrupted with Ctrl+C, preventing standard traceback crashes.
              </p>
            </div>
          </div>
        </div>

        {/* Tip Box */}
        <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-2xl p-4 flex gap-3">
          <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-300/90 leading-relaxed font-sans">
            <strong>Internship Assignment Tip:</strong> Copying this clean script gives you an immediate working console application. Be sure to explain how the IPO architecture is segregated within the loop during your code review presentation.
          </div>
        </div>
      </div>
    </div>
  );
}
