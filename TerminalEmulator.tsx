import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { Terminal, Send, ArrowRight, CornerDownRight, RotateCcw, HelpCircle, Check, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const QUICK_PROMPTS = [
  "Hi",
  "What is the IPO model?",
  "How do you work?",
  "Who created you?",
  "Tell me a joke",
  "What is AI?",
  "How are you?",
  "Exit"
];

interface TerminalEmulatorProps {
  onLineExecute: (lineId: string) => void;
  activeLineId: string;
}

export default function TerminalEmulator({ onLineExecute, activeLineId }: TerminalEmulatorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "====================================================\n        WELCOME TO THE RULE-BASED AI CHATBOT       \n====================================================\nThis chatbot uses standard Python rule-based logic.\nType your questions below. Type 'exit' or 'bye' to quit.\n",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTerminated, setIsTerminated] = useState(false);
  const [lastTrace, setLastTrace] = useState<Message['ipoTrace'] | null>(null);
  
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal to bottom
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const processResponse = (rawInput: string) => {
    // 1. INPUT PHASE
    const inputSanitized = rawInput.trim().toLowerCase();
    
    // 2. PROCESS & 3. OUTPUT PHASE
    let bot_response = "";
    let matchedRule = "";
    let matchedLogic = "";
    let lineId = "";

    if (inputSanitized === "") {
      bot_response = "It looks like you typed nothing. Please ask me a question!";
      matchedRule = "Empty Input Handling";
      matchedLogic = "inputSanitized === ''";
      lineId = "default";
    }
    // A. Exit
    else if (["bye", "exit", "quit", "goodbye"].includes(inputSanitized)) {
      bot_response = "Goodbye! Good luck with your AI internship assignment!";
      matchedRule = "Exit Commands Block";
      matchedLogic = 'user_input in ["bye", "exit", "quit", "goodbye"]';
      lineId = "exit";
      setIsTerminated(true);
    }
    // B. Greetings
    else if (["hi", "hello", "hey", "good morning", "good evening"].includes(inputSanitized)) {
      bot_response = "Hello there! I am a rule-based AI chatbot. How can I assist you today?";
      matchedRule = "Greetings Block";
      matchedLogic = 'user_input in ["hi", "hello", "hey", "good morning", "good evening"]';
      lineId = "greeting";
    }
    // C. Name
    else if (inputSanitized.includes("your name") || inputSanitized.includes("who are you")) {
      bot_response = "I am 'PyBot', a pure Python rule-based assistant created for an AI internship project.";
      matchedRule = "Identity Query Block";
      matchedLogic = '"your name" in user_input or "who are you" in user_input';
      lineId = "name";
    }
    // D. Creator
    else if (inputSanitized.includes("who created you") || inputSanitized.includes("who built you")) {
      bot_response = "I was created by an aspiring AI Engineer as part of an academic internship project.";
      matchedRule = "Creator Query Block";
      matchedLogic = '"who created you" in user_input or "who built you" in user_input';
      lineId = "creator";
    }
    // E. How do you work
    else if (inputSanitized.includes("how do you work") || inputSanitized.includes("how do you process")) {
      bot_response = "I work using explicit keyword matching and if-elif-else logic! This is a deterministic, rule-based approach. I search for specific words in your input and return hardcoded replies. Unlike modern large language models, I don't use vector embeddings, neural networks, or probability.";
      matchedRule = "Mechanism Query Block";
      matchedLogic = '"how do you work" in user_input or "how do you process" in user_input';
      lineId = "mechanism";
    }
    // F. AI definition
    else if (inputSanitized.includes("what is ai") || inputSanitized.includes("define artificial intelligence")) {
      bot_response = "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines programmed to think, learn, and make decisions. It spans from simple rule-based systems (like me!) to advanced Deep Learning models.";
      matchedRule = "AI Definition Block";
      matchedLogic = '"what is ai" in user_input or "define artificial intelligence" in user_input';
      lineId = "definition";
    }
    // G. IPO explanation
    else if (inputSanitized.includes("ipo model") || inputSanitized.includes("explain ipo")) {
      bot_response = "The IPO (Input-Process-Output) model is a fundamental software design framework:\n1. INPUT: The raw text string entered by the user.\n2. PROCESS: Sanitizing the text (strip/lower) and evaluating it via if-elif-else logic.\n3. OUTPUT: Presenting the corresponding text response back to the user.";
      matchedRule = "IPO Model Block";
      matchedLogic = '"ipo model" in user_input or "explain ipo" in user_input';
      lineId = "ipo";
    }
    // H. State / Greeting Back
    else if (inputSanitized.includes("how are you") || inputSanitized.includes("how's it going")) {
      bot_response = "I'm running optimally on standard Python! Ready to answer your questions. How are you?";
      matchedRule = "Well-being Query Block";
      matchedLogic = '"how are you" in user_input or "how\'s it going" in user_input';
      lineId = "state";
    }
    // I. Joke
    else if (inputSanitized.includes("joke")) {
      bot_response = "Why do programmers wear glasses? Because they can't C#! 😄";
      matchedRule = "Joke Block";
      matchedLogic = '"joke" in user_input';
      lineId = "joke";
    }
    // J. Default Fallback
    else {
      bot_response = "Sorry, I don't understand that. Please try another question (e.g., 'What is the IPO model?' or 'How do you work?').";
      matchedRule = "Catch-all Else Block";
      matchedLogic = "else (No keyword matched)";
      lineId = "fallback";
    }

    onLineExecute(lineId);

    return {
      bot_response,
      trace: {
        inputRaw: rawInput,
        inputSanitized,
        processMatchRule: matchedRule,
        processLogic: matchedLogic,
        outputRaw: bot_response
      }
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTerminated || !inputText.trim()) return;

    const currentInput = inputText;
    setInputText('');

    // Append User message
    const userMsg: Message = {
      sender: 'user',
      text: currentInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);

    // Simulate processing delay
    setTimeout(() => {
      const { bot_response, trace } = processResponse(currentInput);
      const botMsg: Message = {
        sender: 'bot',
        text: bot_response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ipoTrace: trace
      };
      setMessages(prev => [...prev, botMsg]);
      setLastTrace(trace);
    }, 450);
  };

  const handleReset = () => {
    setMessages([
      {
        sender: 'bot',
        text: "====================================================\n        WELCOME TO THE RULE-BASED AI CHATBOT       \n====================================================\nThis chatbot uses standard Python rule-based logic.\nType your questions below. Type 'exit' or 'bye' to quit.\n",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setIsTerminated(false);
    setLastTrace(null);
    onLineExecute('init');
  };

  const applyPrompt = (promptText: string) => {
    if (isTerminated) return;
    setInputText(promptText);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="sandbox-grid">
      {/* Console Section */}
      <div className="lg:col-span-7 flex flex-col h-[520px] bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl relative" id="console-window">
        {/* Window Topbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
            <div className="flex items-center gap-1 ml-3 text-xs font-mono text-neutral-400">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>chatbot_app.py</span>
            </div>
          </div>
          <button 
            onClick={handleReset} 
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-800 text-neutral-300 rounded transition"
            title="Restart Python continuous while-loop"
          >
            <RotateCcw className="w-3 h-3 text-emerald-400" />
            <span>Restart</span>
          </button>
        </div>

        {/* Terminal Screen output */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed text-neutral-200 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className="text-[10px] text-neutral-500 mb-1 px-1">
                {msg.sender === 'user' ? 'USER INPUT' : 'PYTHON BOT'} &bull; {msg.timestamp}
              </div>
              <div 
                className={`max-w-[90%] whitespace-pre-wrap rounded-xl px-4 py-2.5 ${
                  msg.sender === 'user' 
                    ? 'bg-neutral-800 text-white border border-neutral-700' 
                    : 'bg-emerald-950/20 text-emerald-300 border border-emerald-900/30 font-mono'
                }`}
              >
                {msg.sender === 'user' ? `> ${msg.text}` : msg.text}
              </div>
            </div>
          ))}

          {isTerminated && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="p-3 bg-rose-950/20 border border-rose-900/30 text-rose-400 rounded-xl text-center text-xs"
            >
              [Process finished with exit code 0 - Continuous while loop broken. Click Restart to restart PyBot]
            </motion.div>
          )}
          <div ref={consoleEndRef} />
        </div>

        {/* Terminal Input Form */}
        <form onSubmit={handleSubmit} className="p-3 bg-neutral-900/50 border-t border-neutral-800 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isTerminated ? "Process terminated. Click 'Restart' above to converse again." : "Type message & press Enter..."}
            disabled={isTerminated}
            className="flex-1 bg-neutral-950 border border-neutral-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2 text-sm font-mono text-neutral-100 outline-none transition disabled:opacity-50"
            maxLength={100}
          />
          <button
            type="submit"
            disabled={isTerminated || !inputText.trim()}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-lg flex items-center justify-center transition disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Prompts Drawer */}
        <div className="px-4 py-2.5 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
          <span className="text-[10px] font-mono text-neutral-500 uppercase flex-shrink-0">Quick Inputs:</span>
          <div className="flex gap-1.5">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                type="button"
                disabled={isTerminated}
                onClick={() => applyPrompt(prompt)}
                className="px-2.5 py-1 text-xs font-mono rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition border border-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* IPO Flow Visualizer Panel */}
      <div className="lg:col-span-5 flex flex-col justify-between" id="ipo-visualizer">
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-emerald-400" />
            <h3 className="font-sans font-semibold text-neutral-100 text-base">Real-Time IPO Trace</h3>
          </div>

          {!lastTrace ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-neutral-800 rounded-xl bg-neutral-950/20">
              <HelpCircle className="w-8 h-8 text-neutral-600 mb-2" />
              <p className="text-sm font-sans text-neutral-400">Type a message or click a quick prompt to trace the Input → Process → Output pipeline.</p>
            </div>
          ) : (
            <div className="space-y-4 flex-1 overflow-y-auto">
              {/* INPUT STEP */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    1. INPUT
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    user_input_raw
                  </span>
                </div>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex items-start gap-1">
                    <span className="text-neutral-500">Raw Input:</span>
                    <span className="text-amber-200">"{lastTrace.inputRaw}"</span>
                  </div>
                  <div className="flex items-start gap-1 pt-1.5 border-t border-neutral-900">
                    <span className="text-emerald-400 font-bold">Sanitization:</span>
                    <span className="text-neutral-300">.strip().lower()</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="text-neutral-500">Sanitized:</span>
                    <span className="text-emerald-300">"{lastTrace.inputSanitized}"</span>
                  </div>
                </div>
              </motion.div>

              {/* PROCESS STEP */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded">
                    2. PROCESS
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    if-elif-else logic
                  </span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <div className="text-neutral-500 text-[10px] uppercase mb-0.5">Matched Condition Group:</div>
                    <div className="text-sky-300 font-bold flex items-center gap-1">
                      <CornerDownRight className="w-3.5 h-3.5" />
                      {lastTrace.processMatchRule}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-neutral-900">
                    <div className="text-neutral-500 text-[10px] uppercase mb-1">Executed Control Flow:</div>
                    <pre className="bg-neutral-900 p-2 rounded text-[11px] text-neutral-300 overflow-x-auto border border-neutral-800">
                      {lastTrace.processLogic}
                    </pre>
                  </div>
                </div>
              </motion.div>

              {/* OUTPUT STEP */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                    3. OUTPUT
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    print() function
                  </span>
                </div>
                <div className="text-xs font-mono">
                  <div className="text-neutral-500 text-[10px] uppercase mb-0.5">Calculated bot_response:</div>
                  <p className="text-emerald-300 leading-relaxed bg-emerald-950/10 p-2 rounded border border-emerald-900/20">
                    {lastTrace.outputRaw}
                  </p>
                </div>
              </motion.div>
            </div>
          )}

          {/* Educational Sidebar tip */}
          <div className="mt-4 p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs space-y-1.5">
            <div className="text-neutral-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              IPO Programming Standard
            </div>
            <p className="text-neutral-400 leading-relaxed font-sans">
              Notice how <strong>Input</strong> converts user keystrokes into data, <strong>Process</strong> implements clean string sanitization and exact conditional matching, and <strong>Output</strong> displays the resulting state. This fulfills the core requirements of academic software engineering metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
