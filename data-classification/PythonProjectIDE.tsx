import { useState } from "react";
import { Folder, FolderOpen, FileCode, Copy, Download, Check, Terminal, Play } from "lucide-react";
import { pythonFiles } from "../data/pythonProject";
import { CodeFile } from "../types";

export default function PythonProjectIDE() {
  const [activeFile, setActiveFile] = useState<CodeFile>(pythonFiles[0]);
  const [copied, setCopied] = useState<boolean>(false);

  // Copy code utility
  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download individual file utility
  const handleDownload = () => {
    const blob = new Blob([activeFile.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download all files as a quick-start checklist instruction
  return (
    <div className="bg-[#1e1e1e] rounded-xl border border-[#333] shadow-lg overflow-hidden flex flex-col h-[700px]" id="python-project-ide">
      {/* Visual Editor Header */}
      <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-[#333] text-xs">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-300">Portfolio Project Exporter</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* IDE Sidebar: Folder Structure */}
        <div className="w-52 bg-[#252526] border-r border-[#1e1e1e] flex flex-col select-none">
          {/* Workspace title */}
          <div className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-[#1e1e1e]">
            Workspace Directory
          </div>

          <div className="p-2 space-y-1 overflow-y-auto flex-1 text-xs text-slate-300 font-mono">
            {/* Root Folder */}
            <div className="flex items-center gap-1.5 px-1 py-1 font-semibold text-slate-200">
              <FolderOpen className="w-4 h-4 text-amber-400" />
              <span>Data-Classification/</span>
            </div>

            {/* Subfolders (Static mock subfolders) */}
            <div className="pl-4 space-y-1">
              <div className="flex items-center gap-1.5 px-1 py-0.5 text-slate-400">
                <Folder className="w-3.5 h-3.5 text-slate-500" />
                <span>dataset/</span>
              </div>
              <div className="flex items-center gap-1.5 px-1 py-0.5 text-slate-400">
                <Folder className="w-3.5 h-3.5 text-slate-500" />
                <span>models/</span>
              </div>
              <div className="flex items-center gap-1.5 px-1 py-0.5 text-slate-400">
                <Folder className="w-3.5 h-3.5 text-slate-500" />
                <span>screenshots/</span>
              </div>

              {/* Code Files List */}
              {pythonFiles.map((file) => (
                <button
                  key={`ide-file-${file.name}`}
                  onClick={() => setActiveFile(file)}
                  className={`w-full flex items-center gap-1.5 px-2 py-1 rounded transition-all text-left ${
                    activeFile.name === file.name
                      ? "bg-[#37373d] text-white font-semibold"
                      : "text-slate-400 hover:bg-[#2a2a2b] hover:text-slate-200"
                  }`}
                >
                  <FileCode className={`w-3.5 h-3.5 ${
                    file.name === "classification.py" ? "text-emerald-400" :
                    file.name === "requirements.txt" ? "text-indigo-400" : "text-sky-400"
                  }`} />
                  <span className="truncate">{file.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Checklist Instructions box inside IDE sidebar */}
          <div className="p-3 bg-[#1e1e1e] m-2 rounded border border-[#333] text-[10px] text-slate-400 leading-normal">
            <span className="font-semibold text-slate-200 block mb-1">🚀 Portfolio Tip:</span>
            Download all three files locally, setup your virtual environment, and run python to launch!
          </div>
        </div>

        {/* IDE Editor Area */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e] min-w-0">
          {/* File Tab */}
          <div className="bg-[#2d2d2d] flex items-center justify-between border-b border-[#1e1e1e] px-4 py-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-slate-200 px-3 py-1 bg-[#1e1e1e] border-t-2 border-t-emerald-500 rounded-t">
              <FileCode className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono">{activeFile.name}</span>
            </div>

            {/* Copy / Download Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className="p-1 px-2.5 rounded bg-[#3c3c3c] text-slate-300 hover:bg-[#4a4a4a] hover:text-white transition-all text-[10px] font-semibold flex items-center gap-1"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy Code"}
              </button>
              <button
                onClick={handleDownload}
                className="p-1 px-2.5 rounded bg-indigo-600 text-white hover:bg-indigo-500 transition-all text-[10px] font-semibold flex items-center gap-1"
                title="Download file"
              >
                <Download className="w-3 h-3" />
                Download File
              </button>
            </div>
          </div>

          {/* IDE Main text panel with code */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed scrollbar-thin select-text">
            <pre className="whitespace-pre">
              <code>{activeFile.content}</code>
            </pre>
          </div>

          {/* Visual Terminal */}
          <div className="bg-[#1e1e1e] border-t border-[#333] p-3 text-[10px] font-mono text-slate-400 flex flex-col gap-1">
            <div className="flex items-center gap-2 border-b border-[#2d2d2d] pb-1.5 mb-1 text-[#ccc] font-sans">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span>Terminal Output Simulation (K-Fold Comparison)</span>
            </div>
            <div>$ python classification.py</div>
            <div className="text-emerald-400">============================================================</div>
            <div className="text-emerald-400 font-bold">====== HYPERPARAMETER TUNING (COMPARING K VALUES) ======</div>
            <div className="text-emerald-400">============================================================</div>
            <div className="text-slate-300">
              K   Accuracy (%)  Precision  Recall  F1-Score  Status<br/>
              1   100.00%       1.0000     1.0000  1.0000    High Overfit Risk<br/>
              3   100.00%       1.0000     1.0000  1.0000    Optimal Sweet Spot<br/>
              5   100.00%       1.0000     1.0000  1.0000    Optimal Sweet Spot<br/>
              7   96.67%        0.9697     0.9630  0.9628    Well-Generalized<br/>
              9   100.00%       1.0000     1.0000  1.0000    Optimal Sweet Spot
            </div>
            <div className="text-cyan-400 mt-1">★ Best-performing K-value based on testing accuracy is K=3 (100.00% accuracy).</div>
          </div>
        </div>
      </div>
    </div>
  );
}
