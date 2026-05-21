/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Cpu, Key, CheckCircle, ExternalLink, RefreshCw, Layers, Award, ShieldAlert, Wifi, Terminal, ChevronRight, Copy } from 'lucide-react';
import { CharacterReward, Hero } from '../types';
import { hasWhiteBg } from '../constants';

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardItem: CharacterReward | Hero | null;
}

type ClaimStep = 'loading-sync' | 'platforms' | 'verification' | 'success';

export default function ClaimModal({ isOpen, onClose, rewardItem }: ClaimModalProps) {
  const [step, setStep] = useState<ClaimStep>('loading-sync');
  const [platform, setPlatform] = useState<'steam' | 'epic' | 'psn' | 'xbox'>('steam');
  const [username, setUsername] = useState('');
  const [region, setRegion] = useState('us-east');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Custom interactive loaders
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [claimCode, setClaimCode] = useState('');
  const [isVerifyingLink, setIsVerifyingLink] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Initialize and Reset Flow
  useEffect(() => {
    if (isOpen) {
      setStep('loading-sync');
      setUsername('');
      setProgress(0);
      setSyncLogs([]);
      setErrorMsg('');
      setIsVerifyingLink(false);
      setShowToast(false);
      
      const randHash = Array.from({ length: 4 }, () => 
        Math.random().toString(36).substring(2, 6).toUpperCase()
      ).join('-');
      setClaimCode(`MR-${randHash}`);
    }
  }, [isOpen]);

  // Toast auto-dismiss logic
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Step 1: Server and Catalog Sync Simulation
  useEffect(() => {
    if (isOpen && step === 'loading-sync') {
      const logs = [
        'Connecting to Marvel Rivals secure mainframe node...',
        'Synthesizing NetEase multi-region handshakes...',
        'Syncing global custom user skin configurations...',
        'Checking secure loot container database slots...',
        'Cryptographic secure server sync: ESTABLISHED!',
        'Preparing requested award overrides package for rendering...'
      ];

      let logIndex = 0;
      const interval = setInterval(() => {
        if (logIndex < logs.length) {
          setSyncLogs((prev) => [...prev, logs[logIndex]]);
          setProgress((prev) => {
            const next = prev + 16.6;
            return next > 99 ? 100 : next;
          });
          logIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setStep('platforms');
          }, 800);
        }
      }, 350);

      return () => clearInterval(interval);
    }
  }, [isOpen, step]);

  if (!rewardItem) return null;

  const isSkin = 'skinName' in rewardItem;
  const displayName = isSkin ? (rewardItem as CharacterReward).skinName : rewardItem.name;
  const rarityOrRole = isSkin ? (rewardItem as CharacterReward).rarity : 'Playable Hero';
  const accentColor = rewardItem.color || '#FF003C';

  const handlePlatformSubmit = () => {
    if (!username.trim()) {
      setErrorMsg('Game account username or platform ID is required to link.');
      return;
    }
    if (username.trim().length < 3) {
      setErrorMsg('Gaming identifier must be at least 3 characters.');
      return;
    }
    setErrorMsg('');
    setStep('verification');
  };

  const handleActivateClaim = () => {
    setIsVerifyingLink(true);
    
    // Call CPALead Content Locker function _HL() if available
    if (typeof window !== 'undefined' && (window as any)._HL) {
      try {
        (window as any)._HL();
      } catch (e) {
        console.error('Error triggering Content Locker:', e);
      }
    } else {
      console.warn('Content Locker function _HL is not defined on window.');
    }

    setTimeout(() => {
      setIsVerifyingLink(false);
      setStep('success');
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
          />

          {/* Holographic Cyber Dialog */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            className="relative w-full max-w-xl bg-[#03060d]/98 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.85)] z-20"
            style={{ 
              borderColor: `${accentColor}40`,
              boxShadow: `0 0 60px ${accentColor}12`
            }}
          >
            {/* Tech details */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent" />
            <div className="absolute -top-[10%] -left-[10%] w-[120%] h-[30%] blur-[100px] pointer-events-none opacity-20"
                 style={{ background: `radial-gradient(ellipse at top, ${accentColor}, transparent 70%)` }} />

            {/* Corner styling */}
            <div className="absolute top-2 left-4 font-mono text-[7px] text-slate-600 select-none">NODE_SYS::CLAIM_GATE_V.3.1</div>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-colors z-30"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 sm:p-8 pt-10 relative z-20">

              {/* STEP 1: LOADING & SYNCHRONIZING */}
              {step === 'loading-sync' && (
                <div className="flex flex-col items-center py-6 text-center">
                  <div className="relative mb-6">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      className="w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center"
                      style={{ borderColor: accentColor }}
                    >
                      <RefreshCw className="w-6 h-6 animate-pulse" style={{ color: accentColor }} />
                    </motion.div>
                    <div className="absolute inset-0 blur-lg rounded-full opacity-40 animate-pulse" style={{ backgroundColor: accentColor }} />
                  </div>

                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">
                    CONNECTING OUTPOST MAINFRANE...
                  </h3>
                  <p className="text-slate-400 text-[10px] tracking-widest uppercase mb-6">
                    SYNCHRONIZING SECURE REWARD MANIFEST
                  </p>

                  {/* Progress Glow Indicator */}
                  <div className="w-full max-w-sm h-1.5 bg-white/5 rounded-full overflow-hidden mb-8 relative">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${progress}%`,
                        backgroundColor: accentColor,
                        boxShadow: `0 0 10px ${accentColor}`
                      }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Log console container */}
                  <div className="w-full bg-black/60 border border-white/5 rounded-xl p-4 font-mono text-[10px] text-left text-slate-500 h-40 overflow-y-auto space-y-2">
                    {syncLogs.map((log, index) => (
                      <div key={index} className="flex gap-2">
                        <span className="text-brand-red font-bold">&gt;</span>
                        <span className={index === syncLogs.length - 1 ? 'text-white font-bold' : ''}>{log}</span>
                      </div>
                    ))}
                    {syncLogs.length < 5 && (
                      <div className="flex items-center gap-1.5 animate-pulse text-brand-blue">
                        <span className="w-1 h-1 rounded-full bg-brand-blue" />
                        <span>Injecting dynamic override packet...</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: CHOOSE PLATFORM */}
              {step === 'platforms' && (
                <div>
                  <div className="flex items-center gap-3 mb-5 border-b border-white/5 pb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[8px] font-black tracking-widest uppercase text-slate-500 block">MULTIVERSE EXCLUSIVES</span>
                      <h3 className="text-lg font-black italic uppercase text-white tracking-tight">
                        Claim <span style={{ color: accentColor }}>{displayName}</span>
                      </h3>
                    </div>
                  </div>

                  {/* Item card mock details */}
                  <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-3 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-black/40 border border-white/10 overflow-hidden relative flex items-center justify-center">
                      <img 
                        src={rewardItem.image} 
                        alt={rewardItem.name} 
                        className="w-full h-full object-cover relative z-10" 
                        style={hasWhiteBg(rewardItem.image) ? { filter: 'url(#remove-white)' } : undefined}
                      />
                      <div className="absolute inset-0 blur-md opacity-25" style={{ backgroundColor: accentColor }} />
                    </div>
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm" style={{ color: accentColor, backgroundColor: `${accentColor}12` }}>{rarityOrRole}</span>
                      <h4 className="text-white text-base font-black uppercase italic mt-1">{displayName}</h4>
                      <p className="text-slate-400 text-[10px] uppercase mt-0.5">Compatible for Marvel Rivals client modifications</p>
                    </div>
                  </div>

                  {/* Input form */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[9px] uppercase font-black tracking-widest text-slate-400 mb-2">
                        1. SELECT TARGET PLATFORM
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {(['steam', 'epic', 'psn', 'xbox'] as const).map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPlatform(p)}
                            className={`py-3 px-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all relative flex flex-col items-center justify-center gap-1.5 ${
                              platform === p
                                ? 'bg-white/15 text-white border-white/20'
                                : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                            }`}
                            style={{ borderColor: platform === p ? accentColor : undefined }}
                          >
                            <span className="text-center">{p}</span>
                            {platform === p && (
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] uppercase font-black tracking-widest text-slate-400 mb-2">
                          2. PLATFORM ID / GAME TAG
                        </label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                            if (errorMsg) setErrorMsg('');
                          }}
                          placeholder="e.g. MarvelHero#7738, SteamID"
                          className="w-full bg-black/40 border border-white/5 focus:border-brand-red rounded-xl px-4 py-3.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors font-mono uppercase tracking-wider"
                          style={{ focusBorderColor: accentColor }}
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase font-black tracking-widest text-slate-400 mb-2">
                          3. REGION ENCRYPTION NODE
                        </label>
                        <select
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                          className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3.5 text-xs font-bold text-white uppercase focus:outline-none focus:border-brand-red transition-colors"
                        >
                          <option value="us-east">North America (US East)</option>
                          <option value="us-west">North America (US West)</option>
                          <option value="eu-west">Europe (EU West)</option>
                          <option value="eu-east">Europe (EU East)</option>
                          <option value="asia">Asia-Pacific Router</option>
                        </select>
                      </div>
                    </div>

                    {errorMsg && (
                      <p className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500 text-xs font-bold font-mono tracking-tight bg-brand-red/5 p-3 rounded-lg border border-brand-red/10">
                        ⚠ {errorMsg}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-slate-500">
                        <ShieldCheck className="w-4 h-4 text-brand-green" />
                        <span className="text-[10px] uppercase font-black tracking-wider bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500">
                          End-to-End Handshake Shield
                        </span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${accentColor}40` }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handlePlatformSubmit}
                        className="w-full sm:w-auto px-8 py-4 bg-[#ff003c] text-white text-[10px] font-black uppercase tracking-[0.25em] relative overflow-hidden group border-shine"
                        style={{ backgroundColor: accentColor, clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' }}
                      >
                        CONTINUE TO REWARD <ChevronRight className="w-3.5 h-3.5 inline ml-1.5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PREMIUM HOLOGRAPHIC VERIFICATION SCREEN */}
              {step === 'verification' && (
                <div className="flex flex-col items-center text-center py-2">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4 animate-bounce">
                    <ShieldAlert className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-black italic uppercase text-white tracking-tight leading-none mb-2">
                    VERIFICATION SECURE LOCK
                  </h3>
                  <p className="text-slate-400 text-[10px] tracking-wider uppercase max-w-sm mb-6 leading-relaxed">
                    To prevent malicious catalog extraction bot networks, a final digital game license check is required over your account <span className="text-white font-bold font-mono">"{username}"</span>.
                  </p>

                  {/* PREMIUM HOLOGRAPHIC VERIFICATION BOX */}
                  <div className="w-full relative bg-gradient-to-br from-[#080d19] to-[#04070e] border rounded-2xl p-6 mb-6 overflow-hidden text-left shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                       style={{ borderColor: `${accentColor}50` }}>
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none">
                      <Terminal className="w-full h-full" />
                    </div>

                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-light-glow/5">
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-brand-green animate-pulse" />
                        <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                          CLIENT_MOD_INJECTION_QUEUED
                        </span>
                      </div>
                      <span className="text-[8px] font-black tracking-widest text-[#FFD700] uppercase bg-[#FFD700]/10 px-2 py-0.5 rounded border border-[#FFD700]/20">
                        PENDING ACTIVATE
                      </span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">TARGET ACCOUNT:</span>
                        <span className="text-white font-bold">{username} ({platform.toUpperCase()})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">PACKET REWARD:</span>
                        <span className="text-slate-300 font-extrabold" style={{ color: accentColor }}>{displayName} SKIN</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">ENCRYPTION CHANNEL:</span>
                        <span className="text-brand-green font-bold">TLS-1.3 (SECURED)</span>
                      </div>
                    </div>

                    <div className="mt-5 p-3 bg-black/40 border border-white/5 rounded-xl flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                        ANTI-BOT PROTOCOL ACTIVATED. CONTINUING VERIFIES THE DIRECT DROPS PACKET.
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isVerifyingLink}
                    onClick={handleActivateClaim}
                    className="w-full py-4.5 bg-gradient-to-r from-brand-red via-brand-red to-brand-gold text-white font-black uppercase text-xs tracking-[0.3em] shadow-[0_4px_30px_rgba(255,0,60,0.35)] flex items-center justify-center gap-2.5 cursor-pointer relative"
                    style={{ clipPath: 'polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%)' }}
                  >
                    {isVerifyingLink ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        SYNCHRONIZING VERIFICATION DATA...
                      </>
                    ) : (
                      <>
                        VERIFY & COMPLETE CLAIM <CheckCircle className="w-4 h-4 text-brand-green" />
                      </>
                    )}
                  </motion.button>
                </div>
              )}

              {/* SUCCESS / LOCKED VIEW */}
              {step === 'success' && (
                <div className="text-center py-4 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1.3, 0.95, 1], opacity: 1 }}
                    className="w-14 h-14 rounded-full bg-brand-green/20 border border-brand-green/40 flex items-center justify-center text-brand-green mb-5"
                  >
                    <CheckCircle className="w-8 h-8" />
                  </motion.div>

                  <h3 className="text-2xl sm:text-3xl font-black italic uppercase text-white tracking-tighter mb-2">
                    INJECTION SUCCESSFUL!
                  </h3>
                  <p className="text-slate-400 max-w-md text-xs uppercase mb-6 tracking-widest leading-relaxed">
                    Custom override code has successfully processed your account <span className="font-bold text-white">"{username}"</span>. The client reward is ready to propagate.
                  </p>

                  <div className="w-full bg-black/60 border border-white/5 rounded-2.5xl p-5 mb-6 text-left relative overflow-hidden">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 block mb-1">
                      SECURE CLAIMS CODENAME PASS-HASH:
                    </span>
                    <div className="flex items-center justify-between gap-4 font-mono select-all">
                      <span className="text-base font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                        {claimCode}
                      </span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(claimCode);
                          setShowToast(true);
                        }}
                        className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-[9px] font-black text-slate-300 hover:text-white rounded border border-white/10 transition-all uppercase tracking-widest flex items-center gap-1.5"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="bg-brand-gold/10 p-3.5 border border-brand-gold/25 rounded-xl text-brand-gold text-[10px] text-left uppercase font-black tracking-wider leading-relaxed mb-6 w-full">
                    HOW TO LAUNCH: Start Marvel Rivals on {platform.toUpperCase()} inside the next 15-20 minutes, check your ingame Mailbox Hub and finalize synchronization block!
                  </div>

                  <div className="flex gap-3 w-full justify-center">
                    <button
                      onClick={onClose}
                      className="px-5 py-3 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[10px] font-black rounded transition-all uppercase tracking-widest"
                    >
                      Close Lobby Overlay
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-5 py-3 bg-brand-red text-white text-[10px] font-black rounded transition-all uppercase tracking-widest shadow-lg flex items-center gap-1.5 hover:scale-105"
                    >
                      View Other Drops <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </motion.div>

          {/* Cyber Toast Notification */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9, x: '-50%' }}
                animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                exit={{ opacity: 0, y: 15, scale: 0.95, x: '-50%' }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="fixed bottom-8 left-1/2 z-[100] px-4 py-3 bg-[#03060d] border border-brand-green/30 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-2.5 whitespace-nowrap"
                style={{
                  boxShadow: `0 0 25px rgba(22, 163, 74, 0.15)`
                }}
              >
                <div className="w-5 h-5 rounded-full bg-brand-green/10 border border-brand-green/30 flex items-center justify-center text-brand-green">
                  <CheckCircle className="w-3 h-3" />
                </div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-white font-semibold">
                  CODE COPIED TO CLIPBOARD
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
