import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw, Shield, Layers, Plus, FileText, CheckCircle2 } from 'lucide-react';
import { RecommendationCard } from './RecommendationCard';
import { sendChatMessage } from '../services/api';

export const ChatInterface = () => {
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
  const [sessionId, setSessionId] = useState('session-' + Math.floor(Math.random() * 1000));
  
  // Real-time tracking state for Sidebar
  const [requirements, setRequirements] = useState({
    domain: 'Awaiting Selection...',
    scope: 'Pending...',
    inputMethod: 'Pending...',
    volumeOrLatency: 'Pending...'
  });

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Decision Engine Logic for 3 Banking Products
  const handleLocalDemoFlow = (text) => {
    const lower = text.toLowerCase();
    
    // GREETING STAGE
    if (lower.includes("good") || lower.includes("ready") || lower.includes("hi") || lower.includes("hello")) {
      return {
        type: 'QUESTION',
        message: "Great! Please select the core Banking Domain you are building or searching a product for:",
        options: ['1. Reconciliation Engine', '2. Payments Processing', '3. Data & Regulatory Reporting']
      };
    }

    // ==========================================
    // DOMAIN 1: RECONCILIATION FLOW
    // ==========================================
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
      setRequirements(prev => ({ ...prev, inputMethod: text }));
      return {
        type: 'QUESTION',
        message: 'Q3/3 (Volume): What is your expected daily record processing volume?',
        options: ['Standard (<100k)', 'High Volume (>1 Million)', 'Enterprise Ultra Scale']
      };
    }
    if (lower.includes('standard') || lower.includes('high volume') || lower.includes('enterprise ultra')) {
      setRequirements(prev => ({ ...prev, volumeOrLatency: text }));
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

    // ==========================================
    // DOMAIN 2: PAYMENTS PROCESSING FLOW
    // ==========================================
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
      setRequirements(prev => ({ ...prev, inputMethod: text }));
      return {
        type: 'QUESTION',
        message: 'Q3/3 (Latency): What is your requirement for sanctions screening & latency?',
        options: ['Sub-Second Realtime Screening', 'Batch Processing with Sanctions']
      };
    }
    if (lower.includes('sub-second') || lower.includes('batch processing')) {
      setRequirements(prev => ({ ...prev, volumeOrLatency: text }));
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

    // ==========================================
    // DOMAIN 3: DATA & REGULATORY REPORTING FLOW
    // ==========================================
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
      setRequirements(prev => ({ ...prev, inputMethod: text }));
      return {
        type: 'QUESTION',
        message: 'Q3/3 (Frequency): How frequently should reports and data models refresh?',
        options: ['End of Day (EOD) Batch', 'Intra-day Hourly Refresh', 'Real-time Event Driven']
      };
    }
    if (lower.includes('end of day') || lower.includes('intra-day') || lower.includes('event driven')) {
      setRequirements(prev => ({ ...prev, volumeOrLatency: text }));
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
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'USER', text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
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
            onClick={() => {
              setMessages([{
                id: Date.now(),
                sender: 'AI',
                text: 'Hi there! 👋 Welcome to TechBridge AI. How can I assist you today?',
                type: 'GREETING',
                options: ["I'm good, let's explore products!", "Ready to configure business requirements."]
              }]);
              setRequirements({ domain: 'Awaiting Selection...', scope: 'Pending...', inputMethod: 'Pending...', volumeOrLatency: 'Pending...' });
              setSessionId('session-' + Math.floor(Math.random() * 1000));
            }}
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
              <div className="flex justify-between">
                <span className="text-slate-400">Target Domain:</span>
                <span className="font-medium text-indigo-300">{requirements.domain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Scope/Type:</span>
                <span className="font-medium text-slate-200">{requirements.scope}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ingestion/Protocol:</span>
                <span className="font-medium text-slate-200">{requirements.inputMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Scale/Latency:</span>
                <span className="font-medium text-slate-200">{requirements.volumeOrLatency}</span>
              </div>
            </div>
          </div>

          {/* Quick Demo Triggers for Judges */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Fast Demo Trigger
            </h3>
            <div className="space-y-1.5">
              <button 
                onClick={() => handleSend("1. Reconciliation Engine")}
                className="w-full text-left p-2.5 bg-slate-900/40 hover:bg-indigo-600/10 border border-slate-800/80 hover:border-indigo-500/30 rounded-lg text-xs text-slate-300 transition-all flex items-center gap-2 group"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>Test Reconciliation Flow</span>
              </button>
              <button 
                onClick={() => handleSend("2. Payments Processing")}
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
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
            <Shield className="w-3 h-3" /> Enterprise Architecture Guardrails Active
          </div>
        </header>

        {/* Chat Messages */}
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
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'USER'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800/90 text-slate-200 rounded-tl-none shadow-lg'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Option Buttons */}
                {msg.options && (
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
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-center text-slate-400 text-xs bg-slate-900/80 w-fit px-4 py-2.5 rounded-xl border border-slate-800">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              <span>Evaluating product parameters...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Bottom Input Field */}
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
              placeholder="Select an option above or type your requirement..."
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
    </div>
  );
};