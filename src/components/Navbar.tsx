/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Shield, Gift, Search, User, Menu, X, Globe, Trophy } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home Hub', href: '#hero' },
    { name: 'Premium Overrides', href: '#skin-rewards' },
    { name: 'Fighter Roster', href: '#character-collection' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-5">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-between glass-premium rounded-2xl px-6 py-3.5 border border-white/5 relative z-50 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
          {/* Logo Brand skew */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 bg-brand-red rounded-md skew-x-[-12deg] flex items-center justify-center font-black italic text-white shadow-[0_0_20px_rgba(255,0,60,0.5)] select-none">
              MR
            </div>
            <span className="font-display font-black tracking-tighter italic uppercase text-lg sm:text-xl block">
              Marvel<span className="text-[#ff003c]">Rivals</span>
              <span className="text-[8px] uppercase tracking-widest text-[#00E5FF] font-black block leading-none pl-0.5">
                Drops Gateway
              </span>
            </span>
          </motion.div>

          {/* Desktop Links Grid */}
          <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-black italic">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={(e) => handleScroll(e, link.href)}
                className="text-slate-400 hover:text-white transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-4_5">
            {/* Server Status Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-[9px] uppercase font-bold tracking-wider text-slate-400">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              NetEase Node Online
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const el = document.getElementById('skin-rewards');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden sm:block px-6 py-2.5 bg-[#ff003c] text-[9.5px] font-black tracking-[0.2em] uppercase text-white hover:shadow-[0_0_25px_rgba(255,0,60,0.4)] transition-all cursor-pointer"
              style={{ clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' }}
            >
              Verify Session
            </motion.button>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-lg border border-white/5 cursor-pointer"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu slide animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="absolute top-full left-0 right-0 mt-3 md:hidden z-40"
            >
              <div className="glass-premium rounded-2xl p-6 border border-white/5 flex flex-col gap-4.5 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-slate-300 text-xs uppercase tracking-[0.2em] font-black italic hover:text-[#ff003c] transition-colors py-2.5 border-b border-white/5"
                  >
                    {link.name}
                  </a>
                ))}
                
                <div className="flex items-center gap-2 px-3 py-3 rounded-xl bg-black/40 text-[9px] uppercase font-bold tracking-wider text-slate-400 justify-center">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                  Crypto-Verification Active
                </div>

                <button 
                  onClick={() => {
                    const el = document.getElementById('skin-rewards');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-3.5 bg-[#ff003c] text-white text-[10px] font-black uppercase tracking-[0.25em] italic hover:bg-opacity-95"
                >
                  Verify Session
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
