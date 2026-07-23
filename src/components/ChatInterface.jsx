import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw, Shield, Layers, Plus, FileText, CheckCircle2, MessageSquare, ExternalLink, X } from 'lucide-react';
import { RecommendationCard } from './RecommendationCard';
import { sendChatMessage } from '../services/api';

export const ChatInterface = () => {
  const [chatMode, setChatMode] = useState('guided'); // 'guided' | 'open'
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'AI',
      text: 'Hi there! 👋 Welcome to TechBridge AI. How can I assist you today?',
      type: 'GREETING',
      options: ["I'm good, let's explore products!", "Ready to configure business requirements."]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [sessionId, setSessionId] = useState('session-' + Math.floor(Math.random() * 1000));
  
  // PDF Modal State
  const [showPdfModal, setShowPdfModal] = useState(false);

  // State for Open-Ended Multi-Turn Decision Tree
  const [openStep, setOpenStep] = useState(0);

  // Real-time tracking state for Sidebar
  const [requirements, setRequirements] = useState({
    domain: 'Awaiting Selection...',
    scope: 'Pending...',
    ingestion: 'Pending...',
    scale: 'Pending...'
  });

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, loadingStep]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Reset & Clear Chat when Switching Modes
  const handleSwitchMode = (mode) => {
    setChatMode(mode);
    setSessionId('session-' + Math.floor(Math.random() * 1000));
    setOpenStep(0);

    if (mode === 'open') {
      setMessages([
        {
          id: Date.now(),
          sender: 'AI',
          text: '⚡ Switched to Open-Minded Mode. Describe your custom banking or tech requirement to get started.',
          type: 'TEXT'
        }
      ]);
      setRequirements({
        domain: 'Custom Open Requirement',
        scope: 'Interactive Discovery...',
        ingestion: 'Conversational Input',
        scale: 'Dynamic Analysis'
      });
    } else {
      setMessages([
        {
          id: Date.now(),
          sender: 'AI',
          text: 'Hi there! 👋 Welcome to TechBridge Guided Mode. Select a domain or choose an option to begin.',
          type: 'QUESTION',
          options: ['1. Reconciliation Engine', '2. Payments Processing', '3. Data & Regulatory Reporting']
        }
      ]);
      setRequirements({
        domain: 'Awaiting Selection...',
        scope: 'Pending...',
        ingestion: 'Pending...',
        scale: 'Pending...'
      });
    }
  };

  // Open-Minded Multi-Turn Conversation Logic
  const handleOpenEndedFlow = async (text) => {
    const lower = text.toLowerCase();

    if (openStep === 0) {
      if (lower.includes('scam') || lower.includes('stop') || lower.includes('fraud') || lower.includes('payment')) {
        setOpenStep(1);
        setRequirements(prev => ({
          ...prev,
          domain: 'Real-Time Scam Intervention',
          scope: 'Pre-Execution Detection'
        }));
        return {
          type: 'TEXT',
          message: 'Do you need detection before or after the payment is executed?'
        };
      } else {
        return {
          type: 'TEXT',
          message: 'Hello! Please specify your exact functional requirement (for example: scam/fraud prevention, custom risk rules, or real-time payment controls).'
        };
      }
    }

    if (openStep === 1) {
      setOpenStep(2);
      setRequirements(prev => ({
        ...prev,
        ingestion: 'Real-time Payment Stream'
      }));
      return {
        type: 'TEXT',
        message: 'Should the system automatically reject the payment?'
      };
    }

    if (openStep === 2) {
      setOpenStep(3);
      setRequirements(prev => ({
        ...prev,
        scale: 'Sub-Second Latency / Hold Rules'
      }));
      return {
        type: 'TEXT',
        message: 'Should the decision use transaction patterns and historical customer behaviour?'
      };
    }

    if (openStep === 3) {
      setLoading(true);
      setLoadingStep('Analyzing requirements & intent...');
      await delay(1000);

      setLoadingStep('Scanning product catalog...');
      await delay(1000);

      setLoadingStep('Evaluating matches: Found Model X-Recon (50% match)...');
      await delay(1200);

      setLoadingStep('Evaluating matches: Found PayGrid Core (60% match)...');
      await delay(1200);

      setLoadingStep('No 100% direct match found. Generating Technical Requirement Blueprint...');
      await delay(1200);

      setLoadingStep('');
      setLoading(false);

      return {
        type: 'OPEN_OUTCOME',
        message: 'A capability gap is identified. This document is generated as the proposed technology requirement and solution blueprint.',
        docUrl: '/doc.pdf',
        contact: {
          name: 'Kunal Sharma',
          role: 'Lead Solutions Architect',
          phone: '+91 98765 43210',
          email: 'kunal.sharma@techbridge.com'
        }
      };
    }

    return {
      type: 'TEXT',
      message: 'I am processing your input. Could you elaborate on your target execution environment?'
    };
  };

  // Guided Logic
  const handleLocalDemoFlow = (text) => {
    const lower = text.toLowerCase();
    
    if (lower.includes("good") || lower.includes("ready") || lower.includes("hi") || lower.includes("hello")) {
      return {
        type: 'QUESTION',
        message: "Great! Please select the core Banking Domain you are building or searching a product for:",
        options: ['1. Reconciliation Engine', '2. Payments Processing', '3. Data & Regulatory Reporting']
      };
    }

    if (lower.includes('reconciliation') || lower.includes('1.')) {
      setRequirements(prev => ({ ...prev, domain: 'Reconciliation Engine' }));
      return {
        type: 'QUESTION',
        message: 'Q1/3 (Scope): What datasets are you looking to reconcile?',
        options: ['Front Office vs Back Office', 'Position Matching', 'Ledger vs Bank Statements']
      };
    }
    if (lower.includes('front office') || lower.includes('position') || lower.includes('ledger')) {
      setRequirements(prev => ({ ...prev, scope: text }));
      return {
        type: 'QUESTION',
        message: 'Q2/3 (Ingestion): How will source files/data be ingested into the engine?',
        options: ['Daily File Ingestion (CSV/XML)', 'Database Sync', 'Real-time Kafka / Streaming']
      };
    }
    if (lower.includes('file') || lower.includes('sync') || lower.includes('kafka')) {
      setRequirements(prev => ({ ...prev, ingestion: text }));
      return {
        type: 'QUESTION',
        message: 'Q3/3 (Volume): What is your expected daily record processing volume?',
        options: ['Standard (<100k)', 'High Volume (>1 Million)', 'Enterprise Ultra Scale']
      };
    }
    if (lower.includes('standard') || lower.includes('high volume') || lower.includes('enterprise ultra')) {
      setRequirements(prev => ({ ...prev, scale: text }));
      return {
        type: 'RECOMMENDATION',
        message: 'Based on your 3-point configuration, OmniRecon Core is the highest rated product match.',
        recommendation: {
          product: 'OmniRecon Core Platform',
          fitScore: 96,
          reasons: [
            'Built specifically for high-volume Front Office vs Back Office reconciliation',
            'Supports automated batch & Kafka ingestion with dynamic rule matching',
            'Integrated break investigation, exception routing & complete audit trail'
          ]
        }
      };
    }

    if (lower.includes('payments') || lower.includes('2.')) {
      setRequirements(prev => ({ ...prev, domain: 'Payments Processing' }));
      return {
        type: 'QUESTION',
        message: 'Q1/3 (Type): What type of payment processing capability do you need?',
        options: ['Cross-Border / SWIFT Transfers', 'Real-time Instant Payments', 'Bulk Domestic Clearing']
      };
    }
    if (lower.includes('swift') || lower.includes('instant') || lower.includes('clearing')) {
      setRequirements(prev => ({ ...prev, scope: text }));
      return {
        type: 'QUESTION',
        message: 'Q2/3 (Protocol): Which message format or standard does your system support?',
        options: ['ISO 20022 XML Standard', 'Legacy MT Messaging', 'RESTful JSON APIs']
      };
    }
    if (lower.includes('iso') || lower.includes('legacy') || lower.includes('restful')) {
      setRequirements(prev => ({ ...prev, ingestion: text }));
      return {
        type: 'QUESTION',
        message: 'Q3/3 (Latency): What is your requirement for sanctions screening & latency?',
        options: ['Sub-Second Realtime Screening', 'Batch Processing with Sanctions']
      };
    }
    if (lower.includes('sub-second') || lower.includes('batch processing')) {
      setRequirements(prev => ({ ...prev, scale: text }));
      return {
        type: 'RECOMMENDATION',
        message: 'Based on your parameters, PayBridge Gateway is the optimal enterprise engine.',
        recommendation: {
          product: 'PayBridge Gateway Core',
          fitScore: 98,
          reasons: [
            'Full support for ISO 20022 and SWIFT messaging standards',
            'Ultra-low latency sub-second real-time sanctions and fraud screening',
            'High reliability with zero-downtime multi-region failover'
          ]
        }
      };
    }

    if (lower.includes('data') || lower.includes('3.')) {
      setRequirements(prev => ({ ...prev, domain: 'Data & Reporting' }));
      return {
        type: 'QUESTION',
        message: 'Q1/3 (Objective): What is the main objective of this data pipeline?',
        options: ['Regulatory Compliance (Basel/MiFID)', 'Executive BI Dashboards', 'Risk Analytics']
      };
    }
    if (lower.includes('compliance') || lower.includes('executive') || lower.includes('risk')) {
      setRequirements(prev => ({ ...prev, scope: text }));
      return {
        type: 'QUESTION',
        message: 'Q2/3 (Storage): Where is your core transaction data hosted?',
        options: ['Cloud Data Lakehouse', 'On-Prem SQL Databases', 'Hybrid Data Sources']
      };
    }
    if (lower.includes('cloud') || lower.includes('on-prem') || lower.includes('hybrid')) {
      setRequirements(prev => ({ ...prev, ingestion: text }));
      return {
        type: 'QUESTION',
        message: 'Q3/3 (Frequency): How frequently should reports and data models refresh?',
        options: ['End of Day (EOD) Batch', 'Intra-day Hourly Refresh', 'Real-time Event Driven']
      };
    }
    if (lower.includes('end of day') || lower.includes('intra-day') || lower.includes('event driven')) {
      setRequirements(prev => ({ ...prev, scale: text }));
      return {
        type: 'RECOMMENDATION',
        message: 'DataLens Reporting Hub matches all your specified data compliance criteria.',
        recommendation: {
          product: 'DataLens Reporting Hub',
          fitScore: 94,
          reasons: [
            'Out-of-the-box regulatory reporting templates for Basel III & MiFID II',
            'Seamless integration with Cloud Lakehouses & Hybrid storage architectures',
            'Automated lineage tracking and encrypted audit log compliance'
          ]
        }
      };
    }

    return {
      type: 'QUESTION',
      message: 'Please choose one of the available options or specify your requirement.',
      options: ['Reconciliation Engine', 'Payments Processing', 'Data & Reporting']
    };
  };

  const handleSend = async (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg = { id: Date.now(), sender: 'USER', text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    if (chatMode === 'open') {
      const responsePayload = await handleOpenEndedFlow(text);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'AI',
        text: responsePayload.message,
        type: responsePayload.type,
        docUrl: responsePayload.docUrl,
        contact: responsePayload.contact
      };
      setMessages((prev) => [...prev, aiMsg]);
    } else {
      setLoading(true);
      const data = await sendChatMessage(sessionId, text);
      setLoading(false);

      let responsePayload = data && data.type !== 'ERROR' ? data : handleLocalDemoFlow(text);

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'AI',
        text: responsePayload.message,
        type: responsePayload.type,
        options: responsePayload.options,
        recommendation: responsePayload.recommendation
      };

      setMessages((prev) => [...prev, aiMsg]);
    }
  };

  return (
    <div className="flex h-screen bg-[#0b0f19] text-slate-100 overflow-hidden">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-80 border-r border-slate-800/80 bg-slate-950/60 flex flex-col hidden lg:flex">
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="font-bold tracking-wide text-sm bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              TechBridge AI
            </span>
          </div>
          <button 
            onClick={() => handleSwitchMode(chatMode)}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
            title="Reset Conversation"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Live Requirement Tracker */}
        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" /> Decision Tree Parameters
            </h3>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Target Domain</span>
                <span className="font-medium text-indigo-300 text-right truncate max-w-[140px]">{requirements.domain}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Scope</span>
                <span className="font-medium text-slate-200 text-right truncate max-w-[140px]">{requirements.scope}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Ingestion</span>
                <span className="font-medium text-slate-200 text-right truncate max-w-[140px]">{requirements.ingestion}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Scale</span>
                <span className="font-medium text-slate-200 text-right truncate max-w-[140px]">{requirements.scale}</span>
              </div>
            </div>
          </div>

          {/* Quick Demo Triggers */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Fast Demo Trigger
            </h3>
            <div className="space-y-1.5">
              <button 
                onClick={() => {
                  if(chatMode === 'open') handleSwitchMode('guided');
                  handleSend("1. Reconciliation Engine");
                }}
                className="w-full text-left p-2.5 bg-slate-900/40 hover:bg-indigo-600/10 border border-slate-800/80 hover:border-indigo-500/30 rounded-lg text-xs text-slate-300 transition-all flex items-center gap-2 group"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>Test Reconciliation Flow</span>
              </button>
              <button 
                onClick={() => {
                  if(chatMode === 'open') handleSwitchMode('guided');
                  handleSend("2. Payments Processing");
                }}
                className="w-full text-left p-2.5 bg-slate-900/40 hover:bg-indigo-600/10 border border-slate-800/80 hover:border-indigo-500/30 rounded-lg text-xs text-slate-300 transition-all flex items-center gap-2 group"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>Test Payments Flow</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
          Powered by TechBridge Assistant Engine
        </div>
      </aside>

      {/* 2. MAIN CHAT CONTAINER */}
      <main className="flex-1 flex flex-col h-full relative">
        <header className="h-14 border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-300">Active Session: {sessionId}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => handleSwitchMode('guided')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition ${
                  chatMode === 'guided' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Guided Flow
              </button>
              <button
                onClick={() => handleSwitchMode('open')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition flex items-center gap-1.5 ${
                  chatMode === 'open' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3 h-3" />
                Open Minded Conversation
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
              <Shield className="w-3 h-3" /> Guardrails Active
            </div>
          </div>
        </header>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${
                msg.sender === 'USER' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                  msg.sender === 'USER'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 border border-slate-700 text-indigo-400'
                }`}
              >
                {msg.sender === 'USER' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-3">
                {msg.text && (
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'USER'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800/90 text-slate-200 rounded-tl-none shadow-lg'
                    }`}
                  >
                    {msg.text}
                  </div>
                )}

                {/* Option Buttons */}
                {chatMode === 'guided' && msg.options && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {msg.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(option)}
                        className="text-xs bg-indigo-500/10 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded-full transition-all flex items-center gap-1 shadow-sm"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {/* Recommendation Card */}
                {msg.recommendation && (
                  <RecommendationCard recommendation={msg.recommendation} />
                )}

                {/* OPEN_OUTCOME Card with Inline Trigger */}
                {msg.type === 'OPEN_OUTCOME' && (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-200 space-y-4 shadow-2xl">
                    <p className="text-sm font-medium text-amber-400">
                      ⚠️ {msg.text}
                    </p>

                    <div className="bg-slate-950 border border-indigo-500/30 rounded-xl p-4 space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">Technology Requirement Blueprint Generated</h4>
                          <p className="text-xs text-slate-400">Sent automatically to Solution Director for review.</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowPdfModal(true)}
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-4 py-2.5 rounded-xl transition shadow-lg cursor-pointer"
                      >
                        <span>View Technical Proposal PDF</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 space-y-3 text-xs">
                      <p className="text-slate-300 font-medium">To take this architectural solution forward, please connect with:</p>
                      <div className="space-y-1 text-slate-400">
                        <p className="text-white font-semibold text-sm">
                          {msg.contact.name} <span className="text-xs font-normal text-indigo-400">({msg.contact.role})</span>
                        </p>
                        <p>Phone: {msg.contact.phone}</p>
                        <p>Email: {msg.contact.email}</p>
                      </div>

                      <a
                        href={`msteams://teams.microsoft.com/l/chat/0/0?users=${msg.contact.email}`}
                        className="inline-flex items-center gap-2 bg-[#5B5FC7] hover:bg-[#4F52B2] text-white px-4 py-2.5 rounded-xl text-xs font-medium transition shadow-md mt-2"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm-7 13.5h-5v-1.5h5v1.5zm3-4h-8v-1.5h8v1.5zm0-4h-8V7h8v1.5z" />
                        </svg>
                        Chat on Microsoft Teams
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-center text-slate-400 text-xs bg-slate-900/80 w-fit px-4 py-2.5 rounded-xl border border-slate-800">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              <span>{loadingStep || 'Evaluating product parameters...'}</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Bottom Input */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="max-w-4xl mx-auto relative flex items-center"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                chatMode === 'guided'
                  ? 'Select an option above or type your requirement...'
                  : 'Describe your custom requirement (e.g. Real-time scam intervention)...'
              }
              className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-4 pr-12 py-3 border border-slate-800 focus:outline-none focus:border-indigo-500/80 transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || loading}
              className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      {/* PDF IN-APP MODAL PREVIEW */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" /> Real Time Payment Scam Intervention Blueprint (doc.pdf)
              </h3>
              <button
                onClick={() => setShowPdfModal(false)}
                className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-1.5 rounded-lg transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 bg-slate-950">
              <iframe
                src="/doc.pdf"
                title="Document Preview"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};