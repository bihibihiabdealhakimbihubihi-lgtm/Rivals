/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle, AlertTriangle, ShieldCheck, Send, RefreshCw, Sparkles, Terminal } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);

  // Add dynamic diagnostic logs helper
  const addLog = (msg: string) => {
    console.log(`[Telegram Integration] ${msg}`);
    setDiagnosticLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    // Fast local form validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      addLog('Validation failed: Invalid email format.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    setDiagnosticLogs([]);
    addLog(`Initiating dispatch sequence for: ${email}`);

    try {
      addLog(`Connecting to secure backend proxy endpoint (/api/subscribe)...`);
      const response = await fetch(`/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setStatus('success');
        addLog('Secure Server Handshake: SUCCESS!');
        addLog('Notification successfully dispatched to Telegram Bot');
        setEmail('');
      } else {
        console.error('Subscription proxy error:', data);
        setStatus('error');
        setErrorMessage(data.description || 'API proxy server rejected delivery request.');
        addLog(`Proxy Error: ${data.description || 'Unknown error'}`);
        addLog(`Status code: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Connection failure for proxy server:', error);
      setStatus('error');
      setErrorMessage('Verification proxy channel is currently unreachable. Check server logs.');
      addLog(`Network Relay Failure: ${error?.message || error}`);
    }
  };

  return (
    <section id="subscription" className="py-24 px-4 md:px-8 relative overflow-hidden bg-[#03050a] border-t border-white/5">
      {/* Decorative Atmosphere glow grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[140px] animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Title Grid Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-brand-red font-display font-black uppercase tracking-[0.35em] text-xs mb-3"
          >
            <Sparkles className="w-4 h-4 text-brand-red animate-pulse" />
            HELIOS REWARD DISPATCH
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
            SUBSCRIBE FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-gold animate-pulse">EXPANSION DROPS</span>
          </h2>
          <p className="text-slate-500 max-w-lg text-[10px] uppercase tracking-[0.25em] font-bold mt-2.5 leading-relaxed">
            Voluntarily subscribe your account coordinates to lock in future patch overviews, mythic drop rotations, and secure custom skins.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-brand-red to-transparent rounded-full mt-5" />
        </div>

        {/* Outer Premium Glass card */}
        <div className="glass-premium border-white/5 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl flex flex-col md:flex-row gap-8 items-stretch">
          
          {/* Form Side */}
          <div className="flex-[1.2] flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest block mb-1">DATA COLLECT TERMINAL</span>
              <h3 className="text-xl font-black italic text-white uppercase tracking-tight">
                Secure Updates Enrollment
              </h3>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Connect your mail node directly to custom NetEase event notifications. No password or sensitive credentials requested.
              </p>
            </div>

            {/* Standard exact HTML Form requested */}
            <form id="emailForm" onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  disabled={status === 'loading'}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for updates"
                  className="w-full bg-black/50 border border-white/5 focus:border-brand-red hover:border-white/10 rounded-xl py-4.5 pl-12 pr-4 text-xs font-semibold text-white tracking-widest focus:outline-none transition-all uppercase placeholder-slate-600 font-mono"
                  style={{ transitionDuration: '300ms' }}
                />
                <Mail className="w-4 h-4 text-slate-500 group-focus-within:text-brand-red absolute left-4.5 top-1/2 -translate-y-1/2 transition-colors duration-300 pointer-events-none" />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(255,0,60,0.35)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4.5 bg-[#ff003c] text-white font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-2 cursor-pointer transition-shadow"
                style={{ clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)' }}
              >
                {status === 'loading' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    SUBSCRIBING...
                  </>
                ) : (
                  <>
                    SUBSCRIBE <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="text-[10px] text-slate-500 uppercase tracking-wide leading-relaxed pl-3.5 border-l-2 border-brand-red">
               We only use your email for gaming updates and notifications.
            </div>
          </div>

          {/* Right Console Log Status Indicator */}
          <div className="flex-1 bg-black/60 border border-white/5 rounded-2xl p-5 flex flex-col justify-between font-mono relative min-h-[220px]">
            <div className="absolute top-2 right-4 text-[7px] text-slate-600 select-none">MODULE::TELEGRAM_DISPATCH</div>
            
            <div>
              <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-3">
                <Terminal className="w-3.5 h-3.5 text-brand-red" />
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">INTEGRATION CONSOLE</span>
              </div>

              {/* Console log ticker */}
              <div className="text-[10px] space-y-1.5 h-32 overflow-y-auto custom-scrollbar text-slate-500 leading-snug">
                {diagnosticLogs.length === 0 ? (
                  <div className="text-slate-600 italic">
                    &gt; Console secure standby mode. Enter your email and subscribe above to trigger live dispatch logs.
                  </div>
                ) : (
                  diagnosticLogs.map((log, i) => (
                    <div key={i} className="flex gap-1.5">
                      <span className="text-brand-red font-bold">&gt;</span>
                      <span className="text-slate-300 text-[9.5px]">{log}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Alert / Feedback States Overlay */}
            <div className="border-t border-white/5 pt-3 flex items-center justify-between gap-2">
              <span className="text-[8px] uppercase tracking-widest text-slate-600 font-bold">STATE DIAGNOSTIC:</span>
              
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.span 
                    key="idle" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="text-[9px] uppercase font-bold text-slate-400 flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" /> STANDBY
                  </motion.span>
                )}
                {status === 'loading' && (
                  <motion.span 
                    key="load" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="text-[9px] uppercase font-bold text-brand-gold flex items-center gap-1 animate-pulse"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" /> TRANSMITTING
                  </motion.span>
                )}
                {status === 'success' && (
                  <motion.span 
                    key="success" 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[9px] uppercase font-bold text-brand-green flex items-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-brand-green" /> DISPATCHED
                  </motion.span>
                )}
                {status === 'error' && (
                  <motion.span 
                    key="error" 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[9px] uppercase font-bold text-[#ff003c] flex items-center gap-1"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-[#ff003c]" /> ERROR
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* Global Success Popup Overlay inside the section */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mt-6 p-4 sm:p-5 bg-brand-green/10 border border-brand-green/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-green/20 border border-brand-green/35 flex items-center justify-center text-brand-green shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-black uppercase tracking-tight">Reward request successfully submitted!</h4>
                  <p className="text-slate-400 text-xs">Your subscription handshake node has successfully deployed to the system network.</p>
                </div>
              </div>
              <button 
                onClick={() => setStatus('idle')}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shrink-0 cursor-pointer"
              >
                Clear Log Overlay
              </button>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mt-6 p-4 sm:p-5 bg-brand-red/10 border border-brand-red/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-red/25 border border-brand-red/35 flex items-center justify-center text-[#ff003c] shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-black uppercase tracking-tight">Transmission Fault Detected</h4>
                  <p className="text-slate-400 text-xs font-semibold uppercase">{errorMessage || 'The subscription packet handshake timed out.'}</p>
                </div>
              </div>
              <button 
                onClick={() => setStatus('idle')}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shrink-0 cursor-pointer"
              >
                Disregard Alert
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
