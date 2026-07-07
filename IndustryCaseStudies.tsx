import React, { useState } from 'react';
import { HeartPulse, GraduationCap, Headset, Landmark, ShoppingBag, ShieldAlert, Zap, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { CaseStudy } from '../types';

const CASE_STUDIES: CaseStudy[] = [
  {
    industry: "Healthcare",
    icon: "heart-pulse",
    challenge: "Handling volume inquiries about common symptoms, scheduling appointments, and patient intake screening without overloading primary clinical staff.",
    ruleBasedApproach: "Pre-screening triage FAQs. Users select standard symptoms from a decision-tree structure. If a user types 'I have a mild fever', the system outputs doctor contacts or a link to book an appointment.",
    modernAIApproach: "AI Symptom checkers integrated with Electronic Health Records (EHR). Reads patient notes, detects emotional urgency or distressed speech tones (Sentiment Analysis), parses unstructured inputs, and flags critical emergency warnings to physicians immediately.",
    exampleScenario: "Rule-Based: User clicks 'Fever' button → Chatbot outputs static CDC guide.\nModern: User explains 'My child had a high fever since 2 AM and looks lethargic' → AI agent understands severity, requests infant weight, calculates safe ibuprofen dosage bounds, and offers immediate video triage triage queueing."
  },
  {
    industry: "Education",
    icon: "graduation-cap",
    challenge: "Providing 24/7 student guidance, grading assistance, personalized course pacing, and answering recurring syllabus questions.",
    ruleBasedApproach: "FAQ Bots on university portals or LMS. They scan for keywords like 'deadline', 'syllabus', or 'office hours' and reply with static text documents or calendar URLs.",
    modernAIApproach: "Autonomous AI Tutors (e.g., customized Khan Academy bots). They adapt teaching speed based on historical student quiz response times, identify core mathematical misunderstandings, and write custom tailored study paths.",
    exampleScenario: "Rule-Based: User types 'When is homework due?' → Bot scans for 'homework' and outputs 'Friday'.\nModern: User uploads code block: 'Why does this loop run forever?' → AI tutor explains the missing base case step-by-step using a Socratic dialogue, without giving away the direct answer."
  },
  {
    industry: "Customer Support",
    icon: "headset",
    challenge: "Managing massive volumes of tier-1 support tickets (refunds, tracking, accounts, subscription billing queries) cost-effectively and quickly.",
    ruleBasedApproach: "Interactive voice response (IVR) systems and early website chat icons. They prompt users with a static menu ('Press 1 for Shipping, 2 for Billing'). Typing raw descriptions often triggers the dreaded 'I don't understand, let me connect you to an agent' loop.",
    modernAIApproach: "Intelligent Conversational Agents (like Zendesk AI or Intercom Fin). They read order details live from internal database integrations, perform standard returns in-chat safely, analyze customer sentiments, and handle complex context shifts.",
    exampleScenario: "Rule-Based: 'Where is my order?' → 'Please enter your order ID' → User types ID → Bot displays shipping link.\nModern: 'Where's my order? I need it for a birthday tomorrow!' → AI notices the emotional distress and urgency, queries the parcel state, discovers a delay, automatically initiates a priority dispatch override, and credits $15 to the customer's account."
  },
  {
    industry: "Banking & Finance",
    icon: "landmark",
    challenge: "Safeguarding user transactions, querying bank balances, recommending financial products, and blocking compromised credit cards instantly.",
    ruleBasedApproach: "SMS Banking systems or basic chat apps. Users type explicit instructions (e.g., 'BAL' for balance, 'STOP' to block). If a query doesn't match an exact format, it fails.",
    modernAIApproach: "Conversational Financial Advisors (e.g., Bank of America's Erica). They query transaction ledgers, flag unusual spend patterns, predict upcoming subscription drafts, and assist in fraud prevention workflows using machine learning.",
    exampleScenario: "Rule-Based: User: 'Block my card' → Bot: 'Please call customer support at 1-800...' \nModern: User: 'I lost my credit card at the airport!' → AI instantly locks the account, initiates card re-issuance, and asks if they want to load a temporary digital card into their Apple/Google wallet."
  },
  {
    industry: "E-Commerce",
    icon: "shopping-bag",
    challenge: "Recommending personalized catalog products, managing cart recovery campaigns, and handling size adjustments.",
    ruleBasedApproach: "Discount code bots. They display text overlays like 'Use code SAVE10' or show rigid filters where users select size/color options from drop-down menus.",
    modernAIApproach: "Virtual Shopping Assistants. They understand semantic styling queries (e.g., 'show me something suitable for a summer beach wedding in Italy'), perform image-based styling recommendations, and cross-sell matching items.",
    exampleScenario: "Rule-Based: User types 'looking for a dark jacket' → Bot matches 'jacket' and outputs 20 generic items.\nModern: User: 'I need a sleek coat for winter, something like James Bond wears' → AI analyzes styling metrics, fetches 3 tailored trenchcoats, and suggests matching winter boots."
  }
];

export default function IndustryCaseStudies() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'heart-pulse':
        return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case 'graduation-cap':
        return <GraduationCap className="w-5 h-5 text-sky-400" />;
      case 'headset':
        return <Headset className="w-5 h-5 text-emerald-400" />;
      case 'landmark':
        return <Landmark className="w-5 h-5 text-amber-400" />;
      case 'shopping-bag':
        return <ShoppingBag className="w-5 h-5 text-fuchsia-400" />;
      default:
        return <Cpu className="w-5 h-5 text-neutral-400" />;
    }
  };

  const currentStudy = CASE_STUDIES[activeTab];

  return (
    <div className="space-y-6" id="case-studies-container">
      {/* Tab Selectors */}
      <div className="flex border-b border-neutral-800 overflow-x-auto whitespace-nowrap scrollbar-none" id="case-studies-tabs">
        {CASE_STUDIES.map((study, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-5 py-3 text-sm font-sans font-medium transition-all duration-200 border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === idx
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/10'
                : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40'
            }`}
          >
            {renderIcon(study.icon)}
            <span>{study.industry}</span>
          </button>
        ))}
      </div>

      {/* Case Study Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="case-studies-content">
        {/* Core Challenge & Approaches */}
        <div className="md:col-span-8 space-y-6">
          {/* Main Card */}
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 space-y-5">
            <div>
              <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-500">Industry Challenge</span>
              <h3 className="font-sans font-bold text-neutral-100 text-lg mt-0.5">{currentStudy.industry} Conversational Automation</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mt-2 font-sans">{currentStudy.challenge}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
              {/* Rule-Based Block */}
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-neutral-300 font-mono text-xs font-bold">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span>Rule-Based Approach</span>
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed font-sans">{currentStudy.ruleBasedApproach}</p>
              </div>

              {/* Modern AI Block */}
              <div className="p-4 bg-emerald-950/10 border border-emerald-900/30 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-300 font-mono text-xs font-bold">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>Modern LLM AI Agent</span>
                </div>
                <p className="text-neutral-300 text-xs leading-relaxed font-sans">{currentStudy.modernAIApproach}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Contrast Simulator Scenario */}
        <div className="md:col-span-4 bg-neutral-950 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Example Dialogue Contrast</h4>
            <div className="font-mono text-xs text-neutral-400 leading-relaxed whitespace-pre-wrap p-4 bg-neutral-900 rounded-xl border border-neutral-800/80">
              {currentStudy.exampleScenario}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-neutral-900 text-[11px] text-neutral-500 font-sans leading-relaxed">
            While rule-based systems are deterministic, reliable for strict keywords, and cheap to run, modern LLMs adapt dynamically to colloquial language and emotional urgency, bridging the user intent gap.
          </div>
        </div>
      </div>
    </div>
  );
}
