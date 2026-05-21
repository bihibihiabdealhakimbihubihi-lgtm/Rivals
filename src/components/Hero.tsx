/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChevronRight, Play, Sparkles, Shield, Trophy, Activity, MessageSquareDot, HelpCircle } from 'lucide-react';
import Stats from './Stats';
import { STATS, SKIN_REWARDS } from '../constants';
import { CharacterReward, Hero as HeroType } from '../types';

interface HeroProps {
  onSelectReward: (item: CharacterReward | HeroType) => void;
}

export default function Hero({ onSelectReward }: HeroProps) {
  const handleQuickClaim = () => {
    // Select the first Mythic drop (Spider-Man Future Foundation) for the instant modal action
    const spidermanSkin = SKIN_REWARDS.find(s => s.id === 'spiderman');
    if (spidermanSkin) {
      onSelectReward(spidermanSkin);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden bg-dark-bg">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-grid opacity-20 -z-10" />
      <div className="cyber-grid" />
      
      {/* Dynamic colorful spots for depth lighting atmosphere */}
      <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] bg-[#ff003c]/15 rounded-full blur-[160px] -z-10 animate-pulse" />
      <div className="absolute bottom-[5%] right-[5%] w-[550px] h-[550px] bg-[#00e5ff]/10 rounded-full blur-[200px] -z-10 animate-pulse [animation-delay:4s]" />
      <div className="absolute top-[35%] right-[25%] w-[350px] h-[350px] bg-brand-purple/10 rounded-full blur-[140px] -z-10" />

      {/* Cyberpunk Scanlines */}
      <div className="absolute inset-0 scanlines opacity-[0.05] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full pt-12 md:pt-16">
        
        {/* LEFT COLUMN: HERO HEADLINE & TEXT COMPOSITION */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          
          {/* Active status indicator badge */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff003c]/8 border border-[#ff003c]/25 text-[#ff003c] text-[9px] font-black tracking-[0.25em] uppercase shadow-[0_0_15px_rgba(255,0,60,0.1)] w-fit"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            LIVE WORLDWIDE REWARDS PORTAL INTERACTIVE
          </motion.div>

          {/* MAIN TITLING H1 */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] text-white"
          >
            CLAIM EXCLUSIVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-purple to-brand-gold animate-gradient-bg">
              MARVEL RIVALS
            </span> <br />
            REWARDS
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="max-w-xl text-slate-400 text-xs sm:text-sm md:text-base tracking-[0.1em] uppercase leading-relaxed font-bold"
          >
            Unlock premium skins, mythic drops, and exclusive hero rewards.
          </motion.p>

          {/* Dual Action Glowing Gaming Button Groups */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4.5 w-full sm:w-auto mt-4"
          >
            {/* GLOWING SHINY RED BUTTON Skewed */}
            <button
              onClick={handleQuickClaim}
              className="w-full sm:w-auto px-10 py-5 bg-[#ff003c] text-white font-black uppercase text-xs tracking-[0.3em] relative overflow-hidden group/btn cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,0,60,0.45)]"
              style={{ clipPath: 'polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%)' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                CLAIM MYTHIC DROP <Play className="w-4 h-4 fill-white text-white animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-[1200ms]" />
            </button>

            {/* SELECTION LINK BUTTON Skewed */}
            <button
              onClick={() => {
                const el = document.getElementById('skin-rewards');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-5 bg-white/5 border border-white/10 hover:border-brand-gold text-slate-300 hover:text-white font-black uppercase text-xs tracking-[0.3em] transition-all cursor-pointer hover:bg-white/10"
              style={{ clipPath: 'polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%)' }}
            >
              <span className="flex items-center justify-center gap-2">
                BROWSE OVERRIDES <ChevronRight className="w-4 h-4" />
              </span>
            </button>
          </motion.div>

          {/* Quick trust metrics line */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-[9px] text-slate-500 uppercase tracking-widest font-black mt-4">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-brand-green" /> Anti-Bot Verified
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-brand-gold" /> NetEase Authoritative Nodes
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN: GIANT KINETIC CHARACTER RENDER */}
        <div className="lg:col-span-5 flex items-center justify-center relative mt-10 lg:mt-0">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[400px] lg:max-w-none aspect-square flex items-center justify-center"
          >
            {/* Pulsing light rings backing the art */}
            <div className="absolute w-72 h-72 rounded-full border-2 border-[#ff003c]/20 animate-ping-slow pointer-events-none" />
            <div className="absolute w-60 h-60 rounded-full border border-[#00e5ff]/20 animate-pulse pointer-events-none" />
            <div className="absolute w-80 h-80 rounded-full blur-[80px] bg-gradient-to-tr from-[#ff003c]/20 to-[#00E5FF]/20 animate-pulse pointer-events-none" />

            {/* Sharp layered artwork render of top fighter (Spider-man foundation render) */}
            <img 
              src="https://i.postimg.cc/FzT7PJ7r/Spider-Man-Future-Foundation-Table-Icon.webp" 
              alt="Spider-Man Future Foundation HD render override"
              className="w-full max-w-[340px] lg:max-w-[420px] h-auto object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] contrast-110 brightness-105 z-10 transition-transform duration-700 hover:scale-105 hover:rotate-1"
              referrerPolicy="no-referrer"
            />
            
            {/* Cinematic floor shadow effect */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/80 blur-xl rounded-full -z-10" />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
