/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import TerminalEmulator from './components/TerminalEmulator';
import CodeViewer from './components/CodeViewer';
import ConceptBridge from './components/ConceptBridge';
import IndustryCaseStudies from './components/IndustryCaseStudies';
import ReportGenerator from './components/ReportGenerator';
import { Terminal, Code2, Compass, Briefcase, FileCheck, Cpu, BookOpen } from 'lucide-react';

type TabType = 'sandbox' | 'code' | 'bridge' | 'industries' | 'report';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('sandbox');
  const [activeLineId, setActiveLineId] = useState<string>('init');

  const handleLineExecute = (lineId: string) => {
    setActiveLineId(lineId);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Visual background gradient accents (Pure modern CSS, completely unobtrusive) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Container */}
      <header className="border-b border-neutral-900 bg-neutral-950/60 backdrop-blur z-10 sticky top-0" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
              <Cpu className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="font-sans font-bold text-sm sm:text-base tracking-tight text-white flex items-center gap-2">
                Python Rule Chatbot Studio
                <span className="text-[10px] font-mono bg-neutral-800 border border-neutral-700/60 text-neutral-400 px-2 py-0.5 rounded-full font-normal">
                  v1.0.0 (Local Simulator)
                </span>
              </h1>
              <p className="text-[10px] font-mono text-neutral-500">AI INTERNSHIP ASSIGNMENT PORTFOLIO</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-sans text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Deterministic Engine Ready
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        
        {/* Project Intro Hero Card */}
        <section className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6" id="welcome-hero">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-mono font-medium text-emerald-400 uppercase tracking-wider">Interactive Syllabus & Sandbox</span>
            </div>
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight text-white">
              Rule-Based AI Chatbot Portfolio
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans">
              This interactive workspace models a complete Python AI chatbot assignment. Use the live 
              terminal simulation to trigger matching criteria, inspect the underlying Python code execution, compare keywords 
              to vector spaces, explore real-world industry applications, and export a ready-to-submit markdown report.
            </p>
          </div>
        </section>

        {/* Tabbed Navigation Rail */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-900 pb-2 gap-4" id="navigation-rail">
          {/* Pills */}
          <div className="flex gap-1.5 bg-neutral-900 p-1.5 rounded-2xl border border-neutral-850 overflow-x-auto max-w-full scrollbar-none">
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-4 py-2 text-xs sm:text-sm font-sans font-medium rounded-xl flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'sandbox'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Sandbox Console</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 text-xs sm:text-sm font-sans font-medium rounded-xl flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Python Code</span>
            </button>
            <button
              onClick={() => setActiveTab('bridge')}
              className={`px-4 py-2 text-xs sm:text-sm font-sans font-medium rounded-xl flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'bridge'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Keywords vs. Vectors</span>
            </button>
            <button
              onClick={() => setActiveTab('industries')}
              className={`px-4 py-2 text-xs sm:text-sm font-sans font-medium rounded-xl flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'industries'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Industry Applications</span>
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`px-4 py-2 text-xs sm:text-sm font-sans font-medium rounded-xl flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'report'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Assignment Report Compiler</span>
            </button>
          </div>
        </div>

        {/* Dynamic Tab Panel Container */}
        <div className="bg-neutral-950" id="active-tab-container">
          {activeTab === 'sandbox' && (
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-3">
                <h3 className="font-sans font-bold text-lg text-white">Live Python Terminal & State Trace</h3>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">Interact with standard PyBot. Watch how raw keypresses flow through the IPO pipeline instantly.</p>
              </div>
              <TerminalEmulator onLineExecute={handleLineExecute} activeLineId={activeLineId} />
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-3">
                <h3 className="font-sans font-bold text-lg text-white">Python 3 Source Code Viewer</h3>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">Read, review, or copy the final code script. Any queries tested in the Sandbox tab will highlight the executing block here!</p>
              </div>
              <CodeViewer activeLineId={activeLineId} />
            </div>
          )}

          {activeTab === 'bridge' && (
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-3">
                <h3 className="font-sans font-bold text-lg text-white">Semantic AI Theory Simulator</h3>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">Compare simple deterministic string testing to modern semantic vector clustering coordinates using cosine angles.</p>
              </div>
              <ConceptBridge />
            </div>
          )}

          {activeTab === 'industries' && (
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-3">
                <h3 className="font-sans font-bold text-lg text-white">AI Case Studies</h3>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">Review industrial implementations. Contrast classical rule-based structures against modern LLM configurations.</p>
              </div>
              <IndustryCaseStudies />
            </div>
          )}

          {activeTab === 'report' && (
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-3">
                <h3 className="font-sans font-bold text-lg text-white">Personalized Assignment Report Compiler</h3>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">Compile your final submission instantly. Enter your name and advisor details to get a beautifully tailored markdown document.</p>
              </div>
              <ReportGenerator />
            </div>
          )}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-6 mt-12 text-center text-xs font-mono text-neutral-600">
        <p>&copy; 2026 AI Internship Course Materials. Prepared in compliance with strict academic programming parameters.</p>
      </footer>
    </div>
  );
}
