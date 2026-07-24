import React from 'react';
import { FileText, CheckCircle2, Download, X, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';

export const TechnicalDocumentView = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 md:p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header Bar */}
        <div className="p-4 md:px-6 md:py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                Real-Time Payment Scam Intervention Blueprint
              </h2>
              <p className="text-[11px] text-slate-400">
                Technology Requirement & Solution Proposal • Demo Outcome
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/doc.pdf"
              download="Scam_Intervention_Technical_Blueprint.pdf"
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-xl transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Complete PDF View */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 bg-[#0b0f19] text-slate-200 font-sans leading-relaxed text-xs md:text-sm">
          
          {/* Document Header Banner */}
          <div className="bg-gradient-to-r from-slate-950 via-indigo-950/50 to-slate-950 border border-indigo-500/30 rounded-2xl p-6 md:p-8 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-500/20 pb-3">
              <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-bold">
                Domain: Payments / Scam Prevention.
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              REAL-TIME PAYMENT SCAM INTERVENTION.
            </h1>
            <p className="text-indigo-300 text-xs md:text-sm font-medium">
              Technology Requirement & Solution Proposal.
            </p>
            <p className="text-slate-400 text-xs">
              Pre-payment intelligence that turns scam risk into timely customer protection.
            </p>
          </div>

          {/* SYSTEM CONTEXT FLOWCHART */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              System Context Diagram
            </h3>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 overflow-x-auto">
              <div className="min-w-[700px] flex flex-col items-center gap-2 text-center text-[11px] font-mono text-slate-300">
                <div className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-md">Customer Login.</div>
                <div className="text-slate-500">↓</div>
                <div className="px-4 py-1.5 bg-slate-900 border border-slate-700 rounded-md">CIDP (OAuth2 / OIDC / SSO).</div>
                <div className="text-slate-500">↓ JWT Access Token.</div>
                <div className="px-5 py-2 bg-slate-900 border border-slate-700 rounded-md">API Gateway (Authentication | Rate Limiting | Routing).</div>
                <div className="text-slate-500">↓ Validate Request.</div>
                <div className="px-5 py-2 bg-slate-900 border border-slate-700 rounded-md">Payment Service API.</div>
                <div className="text-slate-500">↓ Fraud Validation (AML / Limits / Rules).</div>
                <div className="px-6 py-2 bg-indigo-950 border border-indigo-500/40 rounded-lg text-indigo-300 font-bold">
                  Message Queue (MQ) — Kafka / RabbitMQ / Pub/Sub.
                </div>
                <div className="grid grid-cols-3 gap-3 w-full pt-2">
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-md">Payment Processor (Process Payment).</div>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-md">Notification Service (Email / SMS).</div>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-md">Audit Service (Logs & Tracking).</div>
                </div>
              </div>
            </div>
          </section>

          {/* 1. EXECUTIVE SUMMARY */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span> Executive Summary
            </h3>
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase">1. Executive Summary.</h4>
              <p className="text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
                The proposed Real-Time Payment Scam Intervention capability evaluates scam risk before a payment is executed and triggers a proportionate intervention—proceed, contextual warning, step-up verification, temporary hold or operational escalation. The design focuses on authorised scam scenarios where a genuine customer may be manipulated into sending money.
                <br /><br />
                <strong className="text-indigo-300">Core recommendation:</strong> reuse existing payment execution, fraud-signal and enterprise data capabilities; build the missing low-latency decisioning and intervention orchestration layer.
              </p>
            </div>
          </section>

          {/* 2. DEMO CONVERSATION THAT PRODUCES THIS OUTCOME */}
          <section className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase">2. Demo Conversation That Produces This Outcome</h4>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 font-mono text-[11px]">
              <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1 border-b border-slate-800 pb-1">
                Custom Requirement Discovery Flow Log
              </div>
              <div><span className="text-indigo-400 font-bold">ASSISTANT:</span> Hi! How may I assist you today with your custom solution requirements?</div>
              <div><span className="text-amber-300 font-bold">USER:</span> I want to stop customers from sending money when a payment looks like a scam</div>
              <div><span className="text-indigo-400 font-bold">ASSISTANT:</span> Should the system automatically reject the payment based on transaction patterns and historical customer behavior?</div>
              <div><span className="text-amber-300 font-bold">USER:</span> Yes</div>
              <div className="p-2.5 bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 rounded-lg mt-2 font-sans text-xs">
                <strong>OUTCOME:</strong> A capability gap is identified. This document is generated as the proposed technology requirement and solution blueprint.
              </div>
            </div>
          </section>

          {/* 3 & 4. BUSINESS PROBLEM & OBJECTIVES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase">3. Business Problem.</h4>
              <p className="text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
                Scammers can socially engineer customers into authorising payments that appear technically valid. Conventional controls may identify account takeover or known fraud patterns, yet authorised scams require richer contextual analysis and intervention before funds leave the bank. The challenge is to reduce scam losses without creating excessive friction for legitimate customers.
              </p>
            </section>

            <section className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase">4. Objectives.</h4>
              <ul className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 space-y-1.5 text-slate-300">
                <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" /> Assess scam risk synchronously before payment execution.</li>
                <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" /> Use behavioural, transaction, payee, device and existing fraud signals.</li>
                <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" /> Apply configurable risk thresholds and intervention policies.</li>
                <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" /> Provide contextual customer warnings and step-up verification.</li>
                <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" /> Support temporary hold and operational escalation for defined high-risk scenarios.</li>
                <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" /> Maintain complete, explainable and auditable decision evidence.</li>
                <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" /> Integrate with existing capabilities rather than replacing core payment infrastructure.</li>
              </ul>
            </section>
          </div>

          {/* REQUIREMENTS SECTION */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider border-b border-slate-800 pb-1.5">
              Requirements
            </h3>

            {/* 5. FUNCTIONAL REQUIREMENTS */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase">5. Functional Requirements.</h4>
              <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 text-[11px]">
                      <th className="p-3">ID / Capability.</th>
                      <th className="p-3">Requirement.</th>
                      <th className="p-3">Priority.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs font-mono">
                    <tr><td className="p-3 font-bold text-amber-400">FR-01 — Pre-payment assessment.</td><td className="p-3">Assess a payment before execution and return a decision.</td><td className="p-3 font-bold text-emerald-400">MUST.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">FR-02 — Context enrichment.</td><td className="p-3">Aggregate customer behaviour, transaction, payee, device and fraud signals.</td><td className="p-3 font-bold text-emerald-400">MUST.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">FR-03 — Risk scoring.</td><td className="p-3">Return risk score, risk band and reason codes.</td><td className="p-3 font-bold text-emerald-400">MUST.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400 FR-04">FR-04 — Policy decision.</td><td className="p-3">Select Proceed, Warn, Verify, Hold or Escalate.</td><td className="p-3 font-bold text-emerald-400">MUST.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">FR-05 — Customer intervention.</td><td className="p-3">Return channel-ready intervention and required action.</td><td className="p-3 font-bold text-emerald-400">MUST.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">FR-06 — Operational escalation.</td><td className="p-3">Route defined cases for review.</td><td className="p-3 font-bold text-indigo-400">SHOULD.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">FR-07 — Audit trail.</td><td className="p-3">Record inputs, score, policy version, intervention, user action and outcome.</td><td className="p-3 font-bold text-emerald-400">MUST.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">FR-08 — Feedback loop.</td><td className="p-3">Capture confirmed scam and legitimate outcomes for tuning.</td><td className="p-3 font-bold text-indigo-400">SHOULD.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 6. NON-FUNCTIONAL REQUIREMENTS */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase">6. Non-Functional Requirements.</h4>
              <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 text-[11px]">
                      <th className="p-3">Attribute.</th>
                      <th className="p-3">Requirement.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs font-mono">
                    <tr><td className="p-3 font-bold text-amber-400">Latency.</td><td className="p-3">Low-latency synchronous decisioning within a channel-agreed SLA.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">Availability.</td><td className="p-3">Highly available service with deterministic degradation behaviour.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">Scalability.</td><td className="p-3">Horizontal scale for peak payment volumes and bursts.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">Security.</td><td className="p-3">Strong service identity, encryption, least privilege and secrets management.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">Privacy.</td><td className="p-3">Data minimisation, controlled feature usage and approved retention.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">Explainability.</td><td className="p-3">Reason codes and reproducible decision evidence.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">Resilience.</td><td className="p-3">Timeouts, circuit breakers, idempotency and fallback policy.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">Observability.</td><td className="p-3">Latency, risk-band distribution, interventions, failures and outcomes monitored.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">Versioning.</td><td className="p-3">Version model, features and policy for historical reproducibility.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SCAM INTERVENTION DECISION FLOW DIAGRAM */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Scam Intervention Decision Flow Diagram.
            </h3>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 overflow-x-auto">
              <div className="min-w-[700px] flex items-center justify-between text-center font-mono text-[11px] gap-2">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-200">Payment Initiated.</div>
                <div className="text-slate-500">→</div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-200">Collect Context.</div>
                <div className="text-slate-500">→</div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-200">Calculate Scam Risk.</div>
                <div className="text-slate-500">→</div>
                <div className="p-3 bg-indigo-950 border border-indigo-500/40 rounded-xl text-indigo-300 font-bold">
                  Risk Band?.
                </div>
                <div className="text-slate-500">→</div>
                <div className="flex flex-col gap-2 text-[10px]">
                  <div className="p-2 bg-emerald-950 border border-emerald-500/30 text-emerald-400 rounded">LOW Risk — Proceed.</div>
                  <div className="p-2 bg-amber-950 border border-amber-500/30 text-amber-400 rounded">MEDIUM Risk — Warn / Verify.</div>
                  <div className="p-2 bg-red-950 border border-red-500/30 text-red-400 rounded">HIGH Risk — Hold / Escalate.</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-center text-[10px] text-slate-400 font-mono">
                → Record Decision, Customer Action & Final Outcome (Audit & Outcome Store).
              </div>
            </div>
          </section>

          {/* ANALYSIS & REUSE-VS-BUILD */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider border-b border-slate-800 pb-1.5">
              Analysis & Reuse-vs-Build
            </h3>

            {/* 7. CAPABILITY ANALYSIS */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase">7. Capability Analysis.</h4>
              <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 text-[11px]">
                      <th className="p-3">Capability.</th>
                      <th className="p-3">Strength.</th>
                      <th className="p-3">Gap.</th>
                      <th className="p-3">Decision.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs font-mono">
                    <tr><td className="p-3 font-bold text-white">Existing Payment Platform.</td><td className="p-3">Real-time payment lifecycle and execution.</td><td className="p-3 text-slate-400">Does not provide contextual scam intervention.</td><td className="p-3 font-bold text-emerald-400">REUSE.</td></tr>
                    <tr><td className="p-3 font-bold text-white">Existing Fraud Monitoring.</td><td className="p-3">Rules, alerts and fraud signals.</td><td className="p-3 text-slate-400">Not sufficient for pre-payment customer treatment orchestration.</td><td className="p-3 font-bold text-emerald-400">REUSE.</td></tr>
                    <tr><td className="p-3 font-bold text-white">Enterprise Data Platform.</td><td className="p-3">Historical and behavioural data.</td><td className="p-3 text-slate-400">Not designed as the synchronous decision layer.</td><td className="p-3 font-bold text-emerald-400">REUSE.</td></tr>
                    <tr><td className="p-3 font-bold text-white">Scam Intervention Layer.</td><td className="p-3">Risk orchestration, policy and customer intervention.</td><td className="p-3 text-amber-400">Capability gap.</td><td className="p-3 font-bold text-amber-400">BUILD.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 8. REUSE-VS-BUILD RECOMMENDATION */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase">8. Reuse-vs-Build Recommendation.</h4>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 space-y-2 text-slate-300">
                <p className="font-bold text-amber-400">BUILD ONLY THE GAP: a Real-Time Scam Decision & Intervention Layer.</p>
                <ul className="space-y-1.5 list-disc pl-5 text-xs">
                  <li>Reuse payment orchestration and execution interfaces.</li>
                  <li>Reuse existing fraud rules/signals as decision inputs.</li>
                  <li>Reuse enterprise behavioural and historical datasets.</li>
                  <li>Build synchronous context aggregation, scam-risk contract, policy orchestration, intervention APIs and audit evidence.</li>
                  <li>Keep risk scoring behind an abstraction so rules and ML models can evolve independently.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* TARGET TECHNICAL DESIGN */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider border-b border-slate-800 pb-1.5">
              Target Technical Design
            </h3>

            {/* 9. TARGET ARCHITECTURE */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase">9. Target Architecture Components.</h4>
              <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 text-[11px]">
                      <th className="p-3">Component.</th>
                      <th className="p-3">Responsibility.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs font-mono">
                    <tr><td className="p-3 font-bold text-indigo-300">Payment Integration Adapter.</td><td className="p-3">Normalises pre-execution payment requests and channel context.</td></tr>
                    <tr><td className="p-3 font-bold text-indigo-300">Context & Feature Service.</td><td className="p-3">Retrieves behavioural, payee, device, transaction and fraud features.</td></tr>
                    <tr><td className="p-3 font-bold text-indigo-300">Scam Risk Engine.</td><td className="p-3">Calculates risk score/band and reason codes.</td></tr>
                    <tr><td className="p-3 font-bold text-indigo-300">Policy Engine.</td><td className="p-3">Converts risk and context into Proceed/Warn/Verify/Hold/Escalate.</td></tr>
                    <tr><td className="p-3 font-bold text-indigo-300">Intervention API.</td><td className="p-3">Returns channel-ready warning and required next action.</td></tr>
                    <tr><td className="p-3 font-bold text-indigo-300">Audit & Outcome Store.</td><td className="p-3">Persists traceable decision evidence and outcomes.</td></tr>
                    <tr><td className="p-3 font-bold text-indigo-300">Feedback Pipeline.</td><td className="p-3">Feeds confirmed outcomes into policy/model monitoring and tuning.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 10. ILLUSTRATIVE API CONTRACT */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase">10. Illustrative API Contract.</h4>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[11px] overflow-x-auto space-y-3">
                <div className="text-emerald-400 font-bold">POST /api/v1/scam-risk/assess.</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] block mb-1">REQUEST Payload.</span>
                    <pre className="text-slate-300 bg-slate-900/80 p-3 rounded-lg border border-slate-800">{`{
  "paymentId": "P12345",
  "customerId": "C987",
  "amount": 250000,
  "currency": "INR",
  "payeeId": "BEN456",
  "channel": "MOBILE"
}`}</pre>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] block mb-1">RESPONSE Payload.</span>
                    <pre className="text-indigo-300 bg-slate-900/80 p-3 rounded-lg border border-slate-800">{`{
  "riskScore": 87,
  "riskBand": "HIGH",
  "decision": "STEP_UP_VERIFY",
  "reasonCodes": [
    "NEW_PAYEE",
    "UNUSUAL_AMOUNT",
    "BEHAVIOUR_DEVIATION"
  ],
  "correlationId": "SCAM-7F91A"
}`}</pre>
                  </div>
                </div>
              </div>
            </div>

            {/* 11. BACKEND DESIGN */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase">11. Backend Design.</h4>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 space-y-2 text-slate-300 text-xs">
                <ul className="space-y-1.5 list-disc pl-5">
                  <li><strong className="text-white">API Gateway:</strong> authentication, throttling, routing and correlation IDs.</li>
                  <li><strong className="text-white">Scam Decision Service:</strong> orchestrates request lifecycle and deterministic response contract.</li>
                  <li><strong className="text-white">Context/Feature Service:</strong> parallel retrieval with strict time budgets and fallback rules.</li>
                  <li><strong className="text-white">Risk Scoring Engine:</strong> versioned rules/model endpoint returning score and reason codes.</li>
                  <li><strong className="text-white">Policy Engine:</strong> independently configurable business treatment logic.</li>
                  <li><strong className="text-white">Audit/Event Store:</strong> immutable evidence plus downstream events for monitoring and feedback.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* DATA, AI, SECURITY & GOVERNANCE */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider border-b border-slate-800 pb-1.5">
              Data, AI, Security & Governance
            </h3>

            {/* 12. DATA & AI APPROACH */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase">12. Data & AI Approach.</h4>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 space-y-2 text-slate-300 text-xs">
                <p>• <strong>Transaction:</strong> amount, currency, channel, time, destination, payment type.</p>
                <p>• <strong>Behaviour:</strong> typical values, frequency, prior payees and historical patterns.</p>
                <p>• <strong>Payee:</strong> new/existing beneficiary and approved risk indicators.</p>
                <p>• <strong>Device/session:</strong> device change and available channel/session anomalies.</p>
                <p>• <strong>Fraud intelligence:</strong> existing alerts, rules, confirmed patterns and watch indicators.</p>
                <p>• <strong>Outcomes:</strong> proceeded, abandoned, verified, held, confirmed scam, false positive.</p>
                <p className="pt-2 text-indigo-300">
                  <strong>AI strategy:</strong> start with rules plus a risk-scoring abstraction; evolve to supervised ML/anomaly/network models where justified. Keep customer-treatment policy separate from model logic. LLMs may support analyst explanation or document generation but should not be the primary transaction risk scorer.
                </p>
              </div>
            </div>

            {/* 13. SECURITY & GOVERNANCE */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase">13. Security & Governance.</h4>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 space-y-2 text-slate-300 text-xs">
                <p>• Use only approved enterprise endpoints and infrastructure for sensitive banking data.</p>
                <p>• Encrypt data in transit and at rest; apply least privilege and strong service authentication.</p>
                <p>• Record model/rule/policy versions with every decision.</p>
                <p>• Define fail-open/fail-closed behaviour and fallback policy before production.</p>
                <p>• Apply privacy, data-retention, model-risk, cyber-security, architecture, conduct and operational-risk reviews.</p>
                <p>• Monitor drift, false positives, intervention rates and customer impact.</p>
                <p>• Maintain human escalation for policy-defined cases.</p>
              </div>
            </div>
          </section>

          {/* DELIVERY, METRICS & RISKS */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider border-b border-slate-800 pb-1.5">
              Delivery, Metrics & Risks
            </h3>

            {/* 14. DELIVERY ROADMAP */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase">14. Delivery Roadmap.</h4>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs text-slate-300 font-mono">
                <div><span className="text-indigo-400 font-bold">Phase 0 Discovery:</span> Validate scam typologies, channels, controls, data and reusable capabilities.</div>
                <div><span className="text-indigo-400 font-bold">Phase 1 MVP:</span> One channel; rules + selected signals; Proceed/Warn/Verify; audit trail.</div>
                <div><span className="text-indigo-400 font-bold">Phase 2 Pilot:</span> Behavioural features, model scoring, hold/escalation and dashboards.</div>
                <div><span className="text-indigo-400 font-bold">Phase 3 Scale:</span> Additional channels/geographies, richer signals, feedback and resilience hardening.</div>
              </div>
            </div>

            {/* 15. SUCCESS METRICS */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase">15. Success Metrics.</h4>
              <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 text-[11px]">
                      <th className="p-3">Metric.</th>
                      <th className="p-3">Desired Direction.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs font-mono">
                    <tr><td className="p-3">Prevented scam loss.</td><td className="p-3 text-emerald-400 font-bold">Increase.</td></tr>
                    <tr><td className="p-3">Precision of high-risk interventions.</td><td className="p-3 text-emerald-400 font-bold">Increase.</td></tr>
                    <tr><td className="p-3">False-positive intervention rate.</td><td className="p-3 text-emerald-400 font-bold">Decrease.</td></tr>
                    <tr><td className="p-3">Decision latency.</td><td className="p-3 text-indigo-400 font-bold">Within SLA.</td></tr>
                    <tr><td className="p-3">Customer abandonment after warning.</td><td className="p-3 text-slate-400">Monitor by risk band.</td></tr>
                    <tr><td className="p-3">Confirmed scam after intervention.</td><td className="p-3 text-emerald-400 font-bold">Decrease.</td></tr>
                    <tr><td className="p-3">Operational review volume.</td><td className="p-3 text-indigo-300">Optimise.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 16. RISKS & MITIGATIONS */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase">16. Risks & Mitigations.</h4>
              <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 text-[11px]">
                      <th className="p-3">Risk.</th>
                      <th className="p-3">Mitigation.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs font-mono">
                    <tr><td className="p-3 font-bold text-amber-400">False positives create friction.</td><td className="p-3">Tier interventions; tune thresholds; monitor overrides and abandonment.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">Latency impacts payment journey.</td><td className="p-3">Precompute stable features; strict timeouts; cache; performance test.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">Missing/poor-quality data.</td><td className="p-3">Quality checks, confidence indicators and fallback rules.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">Scam patterns evolve.</td><td className="p-3">Outcome feedback, monitoring, periodic model/rule updates.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">Integration complexity.</td><td className="p-3">Adapter pattern and phased rollout.</td></tr>
                    <tr><td className="p-3 font-bold text-amber-400">Customer-treatment/regulatory risk.</td><td className="p-3">Early Legal, Compliance, Privacy and Conduct review; explainable interventions.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 17. KEY DESIGN DECISIONS STILL REQUIRED */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase">17. Key Design Decisions Still Required.</h4>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                <p>• Initial payment types, channels and jurisdictions.</p>
                <p>• Maximum tolerated synchronous decision latency.</p>
                <p>• Approved synchronous data sources and fraud signals.</p>
                <p>• Permitted interventions by risk band and jurisdiction.</p>
                <p>• Ownership of policy thresholds, model governance and escalation.</p>
                <p>• Degradation behaviour when enrichment or scoring is unavailable.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};