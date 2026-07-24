import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Layers, Plus, FileText, CheckCircle2, Compass, ExternalLink, X, Paperclip, BrainCircuit, RefreshCw, Mail, UserCheck, ShieldAlert, LogOut } from 'lucide-react';
import { RecommendationCard } from './RecommendationCard';
import { sendChatMessage } from '../services/api';

export const ChatInterface = ({ userRole, onLogout }) => {
  const [chatMode, setChatMode] = useState('guided'); // 'guided' | 'open'
  
  // Chat & Session States
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'AI',
      text: 'Hi there! 👋 Welcome to TechBridge AI. Please select a Banking Domain to begin configuring your solution.',
      type: 'QUESTION',
      options: ['1. Reconciliation Engine', '2. Payments Processing (Demo)', '3. Data & Regulatory Reporting (Demo)']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [thinkingLogs, setThinkingLogs] = useState([]);
  
  // Session ID State: Guided = Session-1, Discovery = Session-2
  const [sessionId, setSessionId] = useState('Session-1');
  
  // Director Inbox Tickets State
  const [directorInbox, setDirectorInbox] = useState([]);

  // PDF Modal State
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [activePdfUrl, setActivePdfModalUrl] = useState('/doc.pdf');

  // File Input Ref
  const fileInputRef = useRef(null);

  // State for Custom Requirement Discovery Flow
  const [openStep, setOpenStep] = useState(0);

  // Real-time tracking state for Sidebar
  const [requirements, setRequirements] = useState({
    domain: 'Awaiting Selection...',
    scope: 'Pending...',
    ingestion: 'Pending...',
    scale: 'Pending...'
  });

  const chatEndRef = useRef(null);

  // BROADCAST CHANNEL FOR REAL-TIME MULTI-TAB COMMUNICATION
  useEffect(() => {
    const channel = new BroadcastChannel('techbridge_tickets_channel');
    
    // Listen for incoming tickets from other tab
    channel.onmessage = (event) => {
      if (event.data && event.data.type === 'NEW_TICKET') {
        setDirectorInbox((prev) => [event.data.ticket, ...prev]);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, loadingStep, thinkingLogs]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSwitchMode = (mode) => {
    setChatMode(mode);
    setOpenStep(0);
    setThinkingLogs([]);
    removeSelectedFile();

    if (mode === 'open') {
      setSessionId('Session-2');

      setMessages([
        {
          id: Date.now(),
          sender: 'AI',
          text: 'Hi! How may I assist you today with your custom solution requirements?',
          type: 'TEXT'
        }
      ]);
      setRequirements({
        domain: 'Custom Requirement Discovery',
        scope: 'Interactive Analysis...',
        ingestion: 'Conversational / Document Ingestion',
        scale: 'Dynamic Evaluation'
      });
    } else {
      setSessionId('Session-1');
      setDirectorInbox([]);

      setMessages([
        {
          id: Date.now(),
          sender: 'AI',
          text: 'Hi there! 👋 Welcome to TechBridge Guided Mode. Select a domain or choose an option to begin.',
          type: 'QUESTION',
          options: ['1. Reconciliation Engine', '2. Payments Processing (Demo)', '3. Data & Regulatory Reporting (Demo)']
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

  const handleOpenEndedFlow = async (text, file) => {
    const lowerInput = text.toLowerCase().trim();

    if (openStep === 0) {
      if (
        lowerInput.includes('scam') || 
        lowerInput.includes('stop') || 
        lowerInput.includes('fraud') || 
        lowerInput.includes('money') || 
        lowerInput.includes('payment') || 
        file
      ) {
        setOpenStep(1);
        setRequirements(prev => ({
          ...prev,
          domain: 'Real-Time Scam Intervention',
          scope: file ? `Parsed from ${file.name}` : 'Pre-Execution Detection',
          ingestion: file ? `Document (${file.name})` : 'Real-time Stream'
        }));

        return {
          type: 'TEXT',
          message: 'Should the system automatically reject the payment based on transaction patterns and historical customer behavior?'
        };
      } 
      
      return {
        type: 'TEXT',
        message: 'Hello! Please describe your functional requirement or upload a requirement document to get started.'
      };
    }

    if (openStep === 1) {
      setLoading(true);
      setThinkingLogs([]);

      setLoadingStep('Analyzing conversation context & intent...');
      setThinkingLogs(prev => [...prev, '🧠 Extracting functional parameters: [Real-time Stream, Pre-Execution Hold, Behavioral Rules]']);
      await delay(1200);

      setLoadingStep('Searching product catalog...');
      setThinkingLogs(prev => [...prev, '🔍 Querying product catalog for matching capabilities...']);
      await delay(1500);

      setLoadingStep('Evaluating BioGuard Sentinel Engine...');
      setThinkingLogs(prev => [...prev, '⚠️ Evaluated BioGuard Sentinel Engine == 45% match (Lacks sub-second behavioral fraud intervention)']);
      await delay(1800);

      setLoadingStep('Evaluating Aegis Risk Core...');
      setThinkingLogs(prev => [...prev, '⚠️ Evaluated Aegis Risk Core == 62% match (Lacks real-time streaming pre-holding hooks)']);
      await delay(1800);

      setLoadingStep('Determining capability gap...');
      setThinkingLogs(prev => [...prev, '❌ No 100% direct product match found in existing portfolio.']);
      await delay(1500);

      setLoadingStep('Generating Technical Solution Blueprint...');
      setThinkingLogs(prev => [...prev, '📄 Generating custom Technical Requirement Blueprint & contacting Solution Director...']);
      await delay(1800);

      setLoading(false);
      setLoadingStep('');
      setThinkingLogs([]);

      // Create new ticket
      const newTicket = {
        id: 'REQ-' + Math.floor(1000 + Math.random() * 9000),
        businessUser: 'Rahul Sharma (Senior Business Analyst)',
        sessionId: sessionId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
        requirementDomain: requirements.domain || 'Real-Time Scam Intervention',
        summary: 'Pre-execution payment hold with behavioral analytics & real-time fraud intervention rules.',
        pdfUrl: '/doc.pdf',
        isRead: false
      };

      setDirectorInbox(prev => [newTicket, ...prev]);

      // Broadcast to other open tabs (Director Portal tab)
      try {
        const channel = new BroadcastChannel('techbridge_tickets_channel');
        channel.postMessage({ type: 'NEW_TICKET', ticket: newTicket });
        channel.close();
      } catch (err) {
        console.log('BroadcastChannel error:', err);
      }

      return {
        type: 'OPEN_OUTCOME',
        message: 'No existing product matches this capability. A new technical requirement ticket and solution blueprint have been generated and dispatched to the Engineering & Solution Director.',
        contact: {
          name: 'Neha Baglkot',
          role: 'Director',
          phone: '+91 98765 43210',
          email: 'neha.baglkot@techbridge.com'
        }
      };
    }

    return {
      type: 'TEXT',
      message: 'I am processing your input. Could you elaborate on your target execution environment?'
    };
  };

  const handleLocalDemoFlow = (text) => {
    const lower = text.toLowerCase();
    
    if (lower.includes("good") || lower.includes("ready") || lower.includes("hi") || lower.includes("hello")) {
      return {
        type: 'QUESTION',
        message: "Great! Please select the core Banking Domain you are building or searching a product for:",
        options: ['1. Reconciliation Engine', '2. Payments Processing (Demo)', '3. Data & Regulatory Reporting (Demo)']
      };
    }

    if (lower.includes('reconciliation') || lower.includes('1.')) {
      setRequirements(prev => ({ ...prev, domain: 'Reconciliation Engine' }));
      return {
        type: 'QUESTION',
        message: 'What datasets are you looking to reconcile?',
        options: ['Front Office vs Back Office', 'Position Matching', 'Ledger vs Bank Statements']
      };
    }

    if (lower.includes('front office') || lower.includes('position') || lower.includes('ledger')) {
      setRequirements(prev => ({ ...prev, scope: text }));
      return {
        type: 'QUESTION',
        message: 'How will source files and data be ingested into the engine?',
        options: ['Daily File Ingestion (CSV/XML)', 'Database Sync', 'Real-time Kafka / Streaming']
      };
    }

    if (lower.includes('file') || lower.includes('sync') || lower.includes('kafka')) {
      setRequirements(prev => ({ ...prev, ingestion: text }));
      return {
        type: 'QUESTION',
        message: 'What is your expected daily record processing volume?',
        options: ['Standard (<100k)', 'High Volume (>1 Million)', 'Enterprise Ultra Scale (>1 Billion)']
      };
    }

    if (lower.includes('standard') || lower.includes('high volume') || lower.includes('enterprise ultra') || lower.includes('billion')) {
      const finalScale = text;
      const finalScope = requirements.scope !== 'Pending...' ? requirements.scope : 'Selected Datasets';
      const finalIngestion = requirements.ingestion !== 'Pending...' ? requirements.ingestion : 'Configured Ingestion Source';

      setRequirements(prev => ({ ...prev, scale: finalScale }));
      return {
        type: 'RECOMMENDATION',
        message: `Based on your requirements, I recommend the Pair Enterprise Reconciliation Platform...`,
        recommendation: {
          product: 'Pair Enterprise Platform',
          fitScore: 98,
          reasons: [
            `Engineered specifically for high-throughput multi-source reconciliation (${finalScope}).`,
            `Real-time automated exception matching and ledger mapping for ${finalIngestion}.`,
            `Sub-second query response with full audit trail compliance designed for ${finalScale}.`
          ]
        }
      };
    }

    return {
      type: 'QUESTION',
      message: 'Please select Reconciliation Engine to proceed with configured decision flow.',
      options: ['1. Reconciliation Engine']
    };
  };

  const handleSend = async (textToSend) => {
    const text = textToSend || inputMessage;
    const currentFile = selectedFile;

    if ((!text.trim() && !currentFile) || loading) return;

    const userDisplayText = currentFile 
      ? `${text ? text + '\n' : ''}📎 Attached: ${currentFile.name}`
      : text;

    const userMsg = { id: Date.now(), sender: 'USER', text: userDisplayText };
    setMessages((prev) => [...prev, userMsg]);

    if (!textToSend) setInputMessage('');
    removeSelectedFile();

    if (chatMode === 'open') {
      const responsePayload = await handleOpenEndedFlow(text, currentFile);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'AI',
        text: responsePayload.message,
        type: responsePayload.type,
        contact: responsePayload.contact
      };
      setMessages((prev) => [...prev, aiMsg]);
    } else {
      setLoading(true);
      setThinkingLogs([]);

      const isFinalScaleStep = text.toLowerCase().includes('billion') || 
                               text.toLowerCase().includes('100k') || 
                               text.toLowerCase().includes('million') || 
                               text.toLowerCase().includes('enterprise ultra');

      if (isFinalScaleStep) {
        setLoadingStep('Scanning Banking Product Catalog...');
        setThinkingLogs(prev => [...prev, '🧠 Analyzing Reconciliation Criteria: [Ultra High Volume, Multi-Source Ingestion]']);
        await delay(1200);

        setLoadingStep('Evaluating DUCO Matching Engine...');
        setThinkingLogs(prev => [...prev, '⚠️ Evaluated DUCO Engine == 50% match (Lower performance on enterprise ultra-scale)']);
        await delay(1500);

        setLoadingStep('Evaluating TLM Reconciliation Engine...');
        setThinkingLogs(prev => [...prev, '⚠️ Evaluated TLM Platform == 68% match (Requires complex legacy mapping scripts)']);
        await delay(1500);

        setLoadingStep('Evaluating Pair Platform...');
        setThinkingLogs(prev => [...prev, '🎯 Pair Enterprise Platform == 98% match (Optimal fit for enterprise throughput)']);
        await delay(1200);

        setLoadingStep('Generating Final Product Recommendation...');
        await delay(1000);
      } else {
        setLoadingStep('Consulting workflow engine...');
        await delay(800);
      }

      const backendResponse = await sendChatMessage(sessionId, text);
      setLoading(false);
      setLoadingStep('');
      setThinkingLogs([]);

      if (backendResponse && backendResponse.type !== 'ERROR') {
        const botReply = backendResponse.message || backendResponse.reply;
        const currentNode = backendResponse.currentNode || '';
        const options = backendResponse.options || [];

        if (text.includes('1.') || text.toLowerCase().includes('reconciliation')) {
          setRequirements(prev => ({ ...prev, domain: 'Reconciliation Engine' }));
        } else if (requirements.domain !== 'Awaiting Selection...' && requirements.scope === 'Pending...') {
          setRequirements(prev => ({ ...prev, scope: text }));
        } else if (requirements.scope !== 'Pending...' && requirements.ingestion === 'Pending...') {
          setRequirements(prev => ({ ...prev, ingestion: text }));
        } else if (requirements.ingestion !== 'Pending...' && requirements.scale === 'Pending...') {
          setRequirements(prev => ({ ...prev, scale: text }));
        }

        if (currentNode === 'recommendation' || backendResponse.type === 'RECOMMENDATION' || botReply?.includes('recommend') || botReply?.includes('Pair DB') || botReply?.includes('Pair')) {
          const recObj = backendResponse.recommendation || {
            product: 'Pair Enterprise Platform',
            fitScore: 98,
            reasons: [
              'Engineered specifically for high-throughput multi-source reconciliation.',
              'Real-time automated exception matching and ledger mapping.',
              'Sub-second query response with full audit trail compliance.'
            ]
          };

          recObj.product = 'Pair Enterprise Platform';

          const aiMsg = {
            id: Date.now() + 1,
            sender: 'AI',
            text: 'Based on your requirements, I recommend the Pair Enterprise Reconciliation Platform...',
            type: 'RECOMMENDATION',
            recommendation: recObj
          };
          setMessages((prev) => [...prev, aiMsg]);
        } else {
          const aiMsg = {
            id: Date.now() + 1,
            sender: 'AI',
            text: botReply,
            type: 'QUESTION',
            options: options.length > 0 ? options : undefined
          };
          setMessages((prev) => [...prev, aiMsg]);
        }
      } else {
        const fallbackResponse = handleLocalDemoFlow(text);
        const aiMsg = {
          id: Date.now() + 1,
          sender: 'AI',
          text: fallbackResponse.message,
          type: fallbackResponse.type,
          options: fallbackResponse.options,
          recommendation: fallbackResponse.recommendation
        };
        setMessages((prev) => [...prev, aiMsg]);
      }
    }
  };

  const handleViewBlueprint = (ticket) => {
    setActivePdfModalUrl(ticket.pdfUrl);
    setShowPdfModal(true);

    setDirectorInbox(prev =>
      prev.map(t => t.id === ticket.id ? { ...t, isRead: true } : t)
    );
  };

  const unreadCount = directorInbox.filter(t => !t.isRead).length;

  return (
    <div className="flex h-screen bg-[#0b0f19] text-slate-100 overflow-hidden">
      
      {/* 1. LEFT SIDEBAR (Only in Business Analyst View) */}
      {userRole === 'business' && (
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
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors cursor-pointer"
              title="Reset Conversation"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

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
                  className="w-full text-left p-2.5 bg-slate-900/40 hover:bg-indigo-600/10 border border-slate-800/80 hover:border-indigo-500/30 rounded-lg text-xs text-slate-300 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                  <span>Start Reconciliation Flow</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
            Powered by TechBridge Assistant Engine
          </div>
        </aside>
      )}

      {/* 2. MAIN CONTAINER */}
      <main className="flex-1 flex flex-col h-full relative">
        <header className="h-14 border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-300">
              {userRole === 'business' ? `Active Session: ${sessionId}` : 'Technical Architecture Portal'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {userRole === 'business' && (
              <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => handleSwitchMode('guided')}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition cursor-pointer ${
                    chatMode === 'guided' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Guided Flow
                </button>
                <button
                  onClick={() => handleSwitchMode('open')}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                    chatMode === 'open' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  Custom Requirement Discovery
                </button>
              </div>
            )}

            <button
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Logout Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {userRole === 'director' ? (
          /* DIRECTOR PORTAL VIEW */
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0b0f19]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-amber-500" /> Technical Architecture Mailbox & Requirement Blueprints
                </h2>
                <p className="text-xs text-slate-400 mt-1">Review custom technical requirements and solution blueprints submitted by business users.</p>
              </div>
              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs px-3 py-1 rounded-lg font-mono">
                {unreadCount} Unread Proposal{unreadCount !== 1 ? 's' : ''}
              </span>
            </div>

            {directorInbox.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-12 text-center text-slate-500 space-y-3">
                <Mail className="w-10 h-10 mx-auto opacity-30 text-slate-400" />
                <p className="text-sm">No new requirement tickets received yet in this session.</p>
              </div>
            ) : (
              <div className="space-y-4 max-w-4xl mx-auto">
                {directorInbox.map((ticket) => (
                  <div key={ticket.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl hover:border-slate-700 transition-all relative overflow-hidden">
                    {!ticket.isRead && (
                      <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-bold text-[9px] uppercase px-2 py-0.5 rounded-bl-lg">
                        New
                      </div>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] px-2.5 py-0.5 rounded-md font-mono font-bold">
                            {ticket.id}
                          </span>
                          <span className="text-xs text-slate-400">{ticket.timestamp}</span>
                        </div>
                        <h3 className="font-semibold text-white mt-2 text-base">
                          {ticket.requirementDomain}
                        </h3>
                        <p className="text-xs text-indigo-300 mt-0.5">
                          Submitted by: <span className="font-medium text-slate-200">{ticket.businessUser}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => handleViewBlueprint(ticket)}
                        className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-4 py-2.5 rounded-xl transition shadow-md cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Technical Blueprint</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </button>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-xs text-slate-300 leading-relaxed">
                      <strong className="text-amber-400 block mb-1">Requirement Summary:</strong>
                      {ticket.summary}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* BUSINESS ANALYST CHAT VIEW */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
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
                    {msg.text && msg.type !== 'OPEN_OUTCOME' && (
                      <div
                        className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                          msg.sender === 'USER'
                            ? 'bg-indigo-600 text-white rounded-tr-none'
                            : 'bg-slate-900 border border-slate-800/90 text-slate-200 rounded-tl-none shadow-lg'
                        }`}
                      >
                        {msg.text}
                      </div>
                    )}

                    {chatMode === 'guided' && msg.options && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {msg.options.map((option, idx) => {
                          const labelText = typeof option === 'object' ? (option.label || option.value) : option;
                          const sendValue = typeof option === 'object' ? (option.value || option.label) : option;

                          return (
                            <button
                              key={idx}
                              onClick={() => handleSend(sendValue)}
                              className="text-xs bg-indigo-500/10 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded-full transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              {labelText}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {msg.recommendation && (
                      <RecommendationCard recommendation={msg.recommendation} />
                    )}

                    {msg.type === 'OPEN_OUTCOME' && (
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-200 space-y-4 shadow-2xl">
                        <p className="text-sm font-medium text-amber-400 leading-relaxed flex items-start gap-2">
                          <ShieldAlert className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
                          <span>{msg.text}</span>
                        </p>

                        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 space-y-3 text-xs">
                          <p className="text-slate-300 font-medium">To onboard or discuss this requirement further, please get in touch with:</p>
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
                <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-4 space-y-3 max-w-2xl shadow-xl animate-in fade-in duration-300 relative">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                    <BrainCircuit className="w-4 h-4 animate-pulse" />
                    <span>AI Reasoning Engine Active</span>
                  </div>

                  {thinkingLogs.length > 0 && (
                    <div className="space-y-2 text-xs font-mono bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                      {thinkingLogs.map((log, index) => (
                        <div key={index} className="text-slate-300 leading-relaxed flex items-start gap-1.5">
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 items-center text-slate-400 text-xs pt-1">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                    <span className="font-medium text-slate-200">{loadingStep}</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-md space-y-2">
              {selectedFile && (
                <div className="max-w-4xl mx-auto flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1.5 rounded-lg text-xs text-indigo-300 w-fit">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="font-medium truncate max-w-xs">{selectedFile.name}</span>
                  <button
                    onClick={removeSelectedFile}
                    className="hover:bg-indigo-500/20 rounded p-0.5 text-indigo-400 hover:text-white transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="max-w-4xl mx-auto relative flex items-center"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute left-2 p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
                  title="Attach requirement document (.pdf, .doc, .txt)"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={
                    chatMode === 'guided'
                      ? 'Select the requirement or type requirement...'
                      : 'Describe custom requirement or upload document...'
                  }
                  className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-12 py-3 border border-slate-800 focus:outline-none focus:border-indigo-500/80 transition-all shadow-inner"
                />

                <button
                  type="submit"
                  disabled={(!inputMessage.trim() && !selectedFile) || loading}
                  className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* PDF MODAL */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" /> Technical Requirement Solution Blueprint (PDF)
              </h3>
              <button
                onClick={() => setShowPdfModal(false)}
                className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-1.5 rounded-lg transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 bg-slate-950">
              <iframe
                src={activePdfUrl}
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