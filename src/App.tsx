/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveActivity from './components/LiveActivity';
import CharacterCodex from './components/CharacterCodex';
import SkinRewards from './components/SkinRewards';
import CharacterCollection from './components/CharacterCollection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Background from './components/Background';
import ClaimModal from './components/ClaimModal';
import CharacterPage from './components/CharacterPage';
import { useEffect, useState } from 'react';
import { CharacterReward, Hero as HeroType } from './types';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<CharacterReward | HeroType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [characterRoute, setCharacterRoute] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#character/') || hash.startsWith('#hero/')) {
        const id = hash.split('/').pop() || null;
        setCharacterRoute(id);
      } else {
        setCharacterRoute(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectReward = (item: CharacterReward | HeroType) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="relative selection:bg-brand-blue selection:text-dark-bg">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.15 }}
            className="fixed inset-0 z-[100] bg-[#020408] flex flex-col items-center justify-center gap-6"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 border-4 border-[#ff003c] border-t-transparent rounded-full shadow-[0_0_35px_rgba(255,0,60,0.5)]"
            />
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="font-display font-bold uppercase tracking-[0.4em] text-[#ff003c] text-xs"
            >
              ASSEMBLING MULTIVERSE OUTPOSTS
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <Background />
      <Navbar />
      
      <main className="relative z-10">
        {characterRoute ? (
          <CharacterPage 
            characterId={characterRoute} 
            onGoBack={() => window.location.hash = ''} 
            onSelectReward={handleSelectReward} 
          />
        ) : (
          <>
            <Hero onSelectReward={handleSelectReward} />
            <LiveActivity />
            <CharacterCodex onSelectReward={handleSelectReward} />
            <SkinRewards onSelectReward={handleSelectReward} />
            <CharacterCollection onSelectReward={handleSelectReward} />
          </>
        )}
        <Newsletter />
      </main>

      <Footer />

      <ClaimModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rewardItem={selectedItem}
      />

      {/* Global SVG Filters for Image Background Knockout */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none', width: 0, height: 0 }}>
        <defs>
          <filter id="remove-white" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              -4 -4 -4 12 -0.05
            " />
          </filter>
        </defs>
      </svg>

      {/* FIXED STICKY CONVERSION BAR FOR HIGH CPA CONVERSION RATES */}
      <AnimatePresence>
        {!characterRoute && (
          <motion.div 
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 lg:right-10 z-40 max-w-sm w-full bg-[#03060c]/98 border border-[#ff003c]/35 rounded-2xl p-4.5 shadow-[0_15px_45px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
            style={{ boxShadow: '0 0 35px rgba(255, 0, 60, 0.15)' }}
          >
            <div className="absolute top-0 left-0 bg-[#ff003c] text-white uppercase font-black text-[7px] tracking-widest px-2.5 py-0.5 rounded-tl-xl rounded-br-sm select-none animate-pulse">
              TRENDING MOD DEPLOYMENT
            </div>
            <div className="flex gap-4 items-center mt-2.5 select-none">
              <div className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                <img 
                  src="https://i.postimg.cc/FzT7PJ7r/Spider-Man-Future-Foundation-Table-Icon.webp" 
                  alt="Hot Spider man skin overlay"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <h4 className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">FUTURE FOUNDATION CODES</h4>
                <p className="text-xs text-white font-black uppercase italic truncate mt-1">
                  Spider-Man Override
                </p>
                <div className="flex items-center gap-2 mt-1 text-[9px] uppercase font-bold text-slate-500">
                  <span className="text-brand-green font-black">98.2% claimed</span>
                  <span>•</span>
                  <span className="text-brand-gold font-black animate-pulse">18 codes left</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => window.location.hash = '#character/spiderman'}
              className="w-full mt-3.5 py-2.5 bg-[#ff003c] hover:bg-[#e60036] text-white font-black text-[9.5px] uppercase tracking-[0.25em] flex items-center justify-center gap-1.5 cursor-pointer relative overflow-hidden rounded-lg hover:scale-103 transition-transform"
            >
              CLAIM OVERRIDE CODE NOW
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verification overlay populator */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 left-8 z-40 hidden lg:block"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const el = document.getElementById('skin-rewards');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-14 h-14 bg-[#ff003c] rounded-2xl shadow-[0_10px_30px_rgba(255,0,60,0.4)] flex items-center justify-center text-white transition-shadow hover:shadow-[0_15px_40px_rgba(255,0,60,0.65)] cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
        </motion.button>
      </motion.div>
    </div>
  );
}
