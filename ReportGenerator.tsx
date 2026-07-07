import React, { useState } from 'react';
import { FileText, Copy, Check, Download, Edit3, Settings, ShieldAlert } from 'lucide-react';
import { PYTHON_CHATBOT_CODE } from '../chatbot_code';

export default function ReportGenerator() {
  const [studentName, setStudentName] = useState('Areesha Bhatti');
  const [companyName, setCompanyName] = useState('AI Innovations Lab');
  const [advisorName, setAdvisorName] = useState('Dr. Sarah Jenkins (Internship Coordinator)');
  const [projectTitle, setProjectTitle] = useState('Development and Comparative Study of a Python-Based Rule Chatbot');
  const [submissionDate, setSubmissionDate] = useState('June 27, 2026');
  const [copied, setCopied] = useState(false);

  const generateMarkdownReport = () => {
    return `# INTERNSHIP PROJECT REPORT: RULE-BASED AI CHATBOT SYSTEM

---
**PROJECT TITLE:** ${projectTitle}
**STUDENT NAME:** ${studentName}
**HOST ORGANIZATION:** ${companyName}
**INTERNSHIP ADVISOR:** ${advisorName}
**DATE OF SUBMISSION:** ${submissionDate}
---

## 1. EXECUTIVE SUMMARY
This report details the implementation of a rule-based AI chatbot designed and deployed during the AI internship program. Built in standard Python, the system utilizes the classical **Input-Process-Output (IPO) model** and deterministic conditional logic to resolve user inquiries. It does not rely on heavy neural networks, external APIs, or high-dimensional vector spaces, making it computationally lightweight, fully predictable, and secure. Additionally, this report analyzes the boundaries of keyword-based search and contrasts it with modern, vector-embedded, large-scale language models (LLMs).

---

## 2. THE SYSTEM ARCHITECTURE (THE IPO MODEL)
The architecture follows the classic software engineering **IPO model**:

### A. INPUT PHASE
1. **Console Input Capture:** Raw character streams are collected from the standard terminal input buffer using standard interactive inputs.
2. **Robust Exception Catching:** Gracefully handles keyboard interrupts (e.g., \`Ctrl+C\`) and End-of-File signals (\`EOFError\`) to prevent dirty console tracebacks.

### B. PROCESS PHASE
1. **String Sanitization:** 
   - \`.strip()\`: Eliminates erratic leading or trailing whitespaces.
   - \`.lower()\`: Converts all incoming queries to absolute lowercase to facilitate case-insensitive evaluations.
2. **Rule Evaluation (if-elif-else Control Flow):** 
   - Employs exact comparison constraints and substring checks via Python's list membership operator (\`in\`) to evaluate exact and relative matches.
   - Prescribes hierarchical priority where exit controls are evaluated first, followed by greetings, targeted system queries, and conversational helpers.

### C. OUTPUT PHASE
1. **Console Dispatch:** Dispatches the corresponding response back to the standard terminal output stream, followed by a clean newline layout to delineate dialogues.

---

## 3. COMPLETE PYTHON SOURCE CODE
The following Python script implements the chatbot in its entirety. It is self-contained, beginner-friendly, and contains clear descriptive annotations:

\`\`\`python
${PYTHON_CHATBOT_CODE}
\`\`\`

---

## 4. CONVERSATIONAL DIALOGUE SCENARIOS (SAMPLE TRACES)

### Scenario A: Greetings and Initialization
* **User Input:** " Hey there, Good Morning!  "
* **Processed State:** "good morning" (sanitized)
* **Rule Triggered:** \`elif user_input in ["hi", "hello", "hey", ...]\`
* **Bot Output:** "Hello there! I am a rule-based AI chatbot. How can I assist you today?"

### Scenario B: Educational Query regarding System Workings
* **User Input:** "How do you work?"
* **Processed State:** "how do you work"
* **Rule Triggered:** \`elif "how do you work" in user_input\`
* **Bot Output:** "I work using explicit keyword matching and if-elif-else logic! This is a deterministic, rule-based approach. I search for specific words in your input and return hardcoded replies. Unlike modern large language models, I don't use vector embeddings, neural networks, or probability."

### Scenario C: Fallback Trigger (Unknown Input)
* **User Input:** "What is the capital of France?"
* **Processed State:** "what is the capital of france"
* **Rule Triggered:** \`else\` (Catch-all block)
* **Bot Output:** "Sorry, I don't understand that. Please try another question (e.g., 'What is the IPO model?' or 'How do you work?')."

### Scenario D: System Exit
* **User Input:** "Bye"
* **Processed State:** "bye"
* **Rule Triggered:** \`if user_input in ["bye", "exit", "quit", "goodbye"]\`
* **Bot Output:** "Goodbye! Good luck with your AI internship assignment!" (Loop terminates immediately)

---

## 5. THE THEORETICAL BRIDGE: KEYWORDS VS. VECTOR EMBEDDINGS
The implemented chatbot operates under **Keyword/Rule-Based Matching**. It relies entirely on character sequences. If a user's prompt matches a defined string sequence, it triggers; if they use a synonym that is absent from the code (e.g., "Can you elucidate your construction?"), the system enters the fallback condition.

### Modern AI: Moving into Vector Space
Modern AI systems solve this limitation by transforming language into **Vector Embeddings**:
1. **High-Dimensional Mapping:** Machine learning models translate arbitrary sequences of text into dense mathematical coordinate arrays (typically 768 to 1536 dimensions) where semantically similar words are positioned near each other.
2. **Cosine Similarity:** Rather than matching characters, systems calculate the cosine of the angle between two multi-dimensional vectors:
   $$\\text{Similarity} = \\frac{\\mathbf{A} \\cdot \\mathbf{B}}{\\|\\mathbf{A}\\| \\|\\mathbf{B}\\|}$$
   This allows an LLM to immediately recognize that *"Elucidate your design architecture"* is semantically close to *"How do you work"*, even though they share zero words in common.

---

## 6. MULTI-SECTOR CHATBOT APPLICATIONS
Modern conversational interfaces have expanded into key industrial sectors:

1. **Healthcare:** Pre-screening intake symptoms, managing scheduling, and routing patients based on medical urgency metrics.
2. **Education:** 24/7 AI-guided interactive tutors that break down complex equations step-by-step using Socratic dialogue.
3. **Customer Support:** Resolving massive tier-1 ticket loads (shipping states, order revisions, refunds) via automated data integrations.
4. **Banking:** Secure ledger inquiries, suspicious activity tracking, credit card locking, and custom personal budgeting tips.
5. **E-Commerce:** Semantic styling recommendations (e.g., matching winter jackets to outfits) and direct shopping assistants.

---

## 7. COMPUTATIONAL COMPLEXITY METRICS
* **Time Complexity:** 
  - **Sanitization:** $\\mathcal{O}(L)$ where $L$ is the length of the input string.
  - **Rule Matching:** $\\mathcal{O}(R \\cdot L)$ where $R$ is the number of defined branch keywords. Since both the string length and the ruleset count are small, operations complete in less than 1 millisecond.
* **Space Complexity:** $\\mathcal{O}(1)$ auxiliary space. The system stores no conversation history, saving memory overhead.

---

## 8. FUTURE RECOMMENDATIONS & ROADMAP
To scale this rule-based chatbot into a more robust AI, several stages of development are recommended:
1. **Natural Language Toolkit (NLTK):** Integrate basic tokenization, stemmers, and stop-word filtering to allow robust keyword extraction.
2. **TF-IDF & Cosine Similarity:** Introduce a Term Frequency-Inverse Document Frequency weight matrix to compare user prompts against a database of document answers, enabling automated keyword weighting.
3. **Retrieval-Augmented Generation (RAG):** Connect the input to a vector database containing company policy papers and feed the relevant documents into a lightweight LLM (e.g., Gemini Flash) to generate accurate, contextual answers.
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="report-generator-grid">
      {/* Editor Sidebar (Left) */}
      <div className="lg:col-span-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5 space-y-5" id="report-form">
        <div className="flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-amber-400" />
          <h3 className="font-sans font-bold text-neutral-100 text-base">Metadata Compiler</h3>
        </div>

        <p className="text-xs text-neutral-400 font-sans leading-relaxed">
          Fill in your academic/internship details. The generator will compile these fields into a professional Markdown report, ready for submission.
        </p>

        <div className="space-y-4">
          {/* Student Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Student Name:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-sm text-neutral-100 outline-none transition font-sans"
            />
          </div>

          {/* Company Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Host Organization:</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-sm text-neutral-100 outline-none transition font-sans"
            />
          </div>

          {/* Advisor/Supervisor */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Supervisor Name:</label>
            <input
              type="text"
              value={advisorName}
              onChange={(e) => setAdvisorName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-sm text-neutral-100 outline-none transition font-sans"
            />
          </div>

          {/* Project Title */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Project Title:</label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-sm text-neutral-100 outline-none transition font-sans"
            />
          </div>

          {/* Date */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Submission Date:</label>
            <input
              type="text"
              value={submissionDate}
              onChange={(e) => setSubmissionDate(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-sm text-neutral-100 outline-none transition font-sans"
            />
          </div>
        </div>

        {/* Tip */}
        <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-[11px] text-neutral-500 leading-relaxed font-sans">
          This compiler includes your live metadata updates alongside full analytical answers for your assignment criteria.
        </div>
      </div>

      {/* Report Preview Panel (Right) */}
      <div className="lg:col-span-8 flex flex-col bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl" id="report-preview">
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono text-neutral-300">compiled_report.md (Preview)</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-lg transition font-medium cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied Markdown!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full Report Markdown</span>
              </>
            )}
          </button>
        </div>

        {/* Scrollable Document Render */}
        <div className="flex-1 p-6 overflow-y-auto max-h-[500px] text-neutral-300 space-y-6 font-sans text-sm leading-relaxed scrollbar-thin">
          <div className="text-center pb-6 border-b border-neutral-800 space-y-2">
            <h1 className="text-xl font-bold font-sans tracking-tight text-white uppercase">{projectTitle}</h1>
            <p className="text-xs font-mono text-neutral-500">Student Assignment Portfolio | {companyName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-neutral-900/50 p-4 border border-neutral-800 rounded-xl text-neutral-400">
            <div>
              <span className="text-neutral-500 block text-[10px]">PREPARED BY:</span>
              <span className="text-neutral-200">{studentName}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px]">COORDINATOR / ADVISOR:</span>
              <span className="text-neutral-200">{advisorName}</span>
            </div>
            <div className="pt-2 border-t border-neutral-800">
              <span className="text-neutral-500 block text-[10px]">SUBMISSION DATE:</span>
              <span className="text-neutral-200">{submissionDate}</span>
            </div>
            <div className="pt-2 border-t border-neutral-800">
              <span className="text-neutral-500 block text-[10px]">FORMAT:</span>
              <span className="text-neutral-200">GitHub Flavor Markdown</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-neutral-100 border-b border-neutral-800 pb-1 font-sans">1. Executive Summary</h2>
              <p className="text-neutral-400 text-xs">
                This report details the implementation of a rule-based AI chatbot designed and deployed during the AI internship program. Built in standard Python, the system utilizes the classical <strong>Input-Process-Output (IPO) model</strong> and deterministic conditional logic to resolve user inquiries. It does not rely on heavy neural networks, external APIs, or high-dimensional vector spaces, making it computationally lightweight, fully predictable, and secure. Additionally, this report analyzes the boundaries of keyword-based search and contrasts it with modern, vector-embedded, large-scale language models (LLMs).
              </p>
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-bold text-neutral-100 border-b border-neutral-800 pb-1 font-sans">2. The System Architecture (The IPO Model)</h2>
              <p className="text-neutral-400 text-xs leading-relaxed">
                The architecture follows the classic software engineering IPO model:
              </p>
              <ul className="list-disc list-inside text-xs text-neutral-400 space-y-1 pl-1">
                <li><strong>INPUT:</strong> The raw query string is captured using standard input protocols. Graceful checks ensure KeyboardInterrupt signals are handled correctly.</li>
                <li><strong>PROCESS:</strong> Sanitizes text using <code>.strip().lower()</code> and evaluates matches via <code>if-elif-else</code> conditional keyword blocks.</li>
                <li><strong>OUTPUT:</strong> Print functions deliver calculated responses with elegant text formatting.</li>
              </ul>
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-bold text-neutral-100 border-b border-neutral-800 pb-1 font-sans">3. Complete Python Source Code</h2>
              <pre className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-[10px] text-emerald-300 font-mono overflow-x-auto max-h-[150px]">
                {PYTHON_CHATBOT_CODE}
              </pre>
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-bold text-neutral-100 border-b border-neutral-800 pb-1 font-sans">4. Theoretical Reflection: Keywords vs. Vector Spaces</h2>
              <p className="text-neutral-400 text-xs">
                While keywords search for exact character matches, modern AI maps strings into high-dimensional vector coordinate rooms, measuring cosine similarity to find semantic meaning instead of spelling similarities. This bridges classical computing rules to artificial cognition models.
              </p>
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-bold text-neutral-100 border-b border-neutral-800 pb-1 font-sans">5. Computational Complexity Analysis</h2>
              <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-xl text-xs space-y-2 text-neutral-400">
                <div>
                  <strong>Time Complexity:</strong> <code className="text-emerald-400">O(L)</code> to sanitize a string of length L, and <code className="text-emerald-400">O(R * L)</code> to test it across R rules. This operates near-instantly.
                </div>
                <div>
                  <strong>Space Complexity:</strong> <code className="text-emerald-400">O(1)</code> auxiliary memory space, as rules are hardcoded and session history is transient.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
