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
import { useEffect, useState } from 'react';
import { CharacterReward, Hero as HeroType } from './types';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<CharacterReward | HeroType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <Hero onSelectReward={handleSelectReward} />
        <LiveActivity />
        <CharacterCodex onSelectReward={handleSelectReward} />
        <SkinRewards onSelectReward={handleSelectReward} />
        <CharacterCollection onSelectReward={handleSelectReward} />
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

      {/* Verification overlay populator */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 right-8 z-40 hidden lg:block"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const el = document.getElementById('character-codex');
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
