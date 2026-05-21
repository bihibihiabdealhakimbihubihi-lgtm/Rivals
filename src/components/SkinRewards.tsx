/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKIN_REWARDS, hasWhiteBg } from '../constants';
import { Sparkles, Zap, Search, SlidersHorizontal, CheckSquare, Compass } from 'lucide-react';
import { CharacterReward } from '../types';

interface SkinRewardsProps {
  onSelectReward: (item: CharacterReward) => void;
}

export default function SkinRewards({ onSelectReward }: SkinRewardsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'mythic' | 'exotic' | 'legendary-limited'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sorter / Filter Logic
  const filteredRewards = SKIN_REWARDS.filter((item) => {
    // Search query match
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.skinName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Rarity Tab match
    if (activeTab === 'mythic') return item.rarity === 'Mythic';
    if (activeTab === 'exotic') return item.rarity === 'Exotic';
    if (activeTab === 'legendary-limited') {
      return item.rarity === 'Legendary' || item.rarity === 'Limited';
    }
    return true; // 'all'
  });

  const categories = [
    { id: 'all', label: 'All Artifacts' },
    { id: 'mythic', label: 'Mythic Drop' },
    { id: 'exotic', label: 'Exotic Gems' },
    { id: 'legendary-limited', label: 'Legacy & Limited' },
  ] as const;

  return (
    <section id="skin-rewards" className="py-28 px-4 md:px-8 relative overflow-hidden bg-dark-bg">
      {/* High-fidelity atmosphere spots of color */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/12 w-[450px] h-[450px] bg-brand-red/10 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/12 w-[450px] h-[450px] bg-brand-blue/10 rounded-full blur-[160px] animate-pulse [animation-delay:4s]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Title Grid */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-brand-red font-display font-black uppercase tracking-[0.4em] text-xs mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#ff003c]" />
            LIMITED CODENAME OVERRIDES
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
            CHROME <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-500">REWARDS</span>
          </h2>
          <p className="text-slate-500 max-w-xl text-xs uppercase tracking-[0.25em] font-bold mt-3 leading-relaxed">
            High-integrity digital code injections. Unlocks ultra-sharp custom client textures.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-brand-red to-transparent rounded-full mt-6" />
        </div>

        {/* Dynamic Controls Suite */}
        <div className="glass-premium border-white/5 rounded-3xl p-6 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          {/* TAB BUTTONS */}
          <div className="flex items-center flex-wrap gap-2.5 w-full lg:w-auto">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-5 py-3 text-[10px] font-black uppercase tracking-widest relative rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive 
                      ? 'bg-white/10 text-white shadow-lg border border-white/20' 
                      : 'text-slate-400 hover:text-white bg-transparent border border-transparent hover:bg-white/5'
                  }`}
                >
                  {cat.id !== 'all' && (
                    <span 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ 
                        backgroundColor: 
                          cat.id === 'mythic' ? '#C200FF' : 
                          cat.id === 'exotic' ? '#00E5FF' : '#FFD700' 
                      }} 
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-4.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rewards..."
              className="w-full bg-black/40 border border-white/5 focus:border-brand-red rounded-xl py-3 pl-12 pr-4 text-xs font-semibold text-white tracking-widest focus:outline-none transition-colors uppercase"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[9px] uppercase font-black tracking-widest text-[#ff003c] absolute right-4 top-1/2 -translate-y-1/2 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* EMPTY STATE */}
        {filteredRewards.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass border-white/5 rounded-3xl p-16 text-center max-w-lg mx-auto flex flex-col items-center gap-4"
          >
            <Compass className="w-12 h-12 text-slate-600 animate-spin" />
            <h3 className="text-white font-black italic uppercase text-lg tracking-wider">No drops located</h3>
            <p className="text-slate-500 text-xs uppercase tracking-widest">
              We couldn't find matches for "{searchQuery}". Try editing your input filter.
            </p>
          </motion.div>
        )}

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          <AnimatePresence>
            {filteredRewards.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.7, 
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -12, scale: 1.01 }}
                className="group relative aspect-[3/4.6] w-full max-w-[290px] sm:max-w-none flex flex-col bg-[#03060c] rounded-[2rem] p-[2px] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${item.color}35, transparent 60%, ${item.color}15)`
                }}
                onClick={() => onSelectReward(item)}
              >
                {/* Card Inner - Matte dark finish with premium glassmorphism overlay */}
                <div className="relative h-full w-full bg-[#04060b]/98 backdrop-blur-3xl rounded-[1.9rem] flex flex-col overflow-hidden border-shine">
                  
                  {/* Status Overlay glow */}
                  <div 
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-40"
                    style={{ backgroundImage: `linear-gradient(to top, ${item.color}50, transparent)` }}
                  />

                  {/* Premium Tag Left */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/80 border border-white/15 rounded-sm backdrop-blur-md shadow-2xl">
                    <div 
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}
                    />
                    <span className="text-[9px] font-black uppercase text-white tracking-[0.2em]">{item.rarity} Skin</span>
                  </div>

                  {/* Rarity Label Right */}
                  <div className="absolute top-4.5 right-4 z-20">
                    <span 
                      className="text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-sm border backdrop-blur-md shadow-lg"
                      style={{ 
                        color: item.color, 
                        borderColor: `${item.color}30`, 
                        backgroundColor: `${item.color}12`,
                        boxShadow: `0 0 15px ${item.color}15`
                      }}
                    >
                      {item.rarity}
                    </span>
                  </div>

                  {/* Main Artwork container */}
                  <div className="relative flex-[1.4] overflow-hidden flex items-center justify-center p-4 pt-12">
                    {/* Dynamic Back Halo Spot */}
                    <div 
                      className="absolute w-44 h-44 opacity-35 blur-[70px] transition-transform duration-700 group-hover:scale-130 group-hover:opacity-50"
                      style={{ background: `radial-gradient(circle, ${item.color} 0%, transparent 80%)` }}
                    />

                    {/* Tech mesh grid overlay */}
                    <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay pointer-events-none" />

                    <motion.img 
                      whileHover={{ scale: 1.12, rotate: 1.5 }}
                      transition={{ duration: 0.6 }}
                      src={item.image} 
                      alt={item.name}
                      className="h-56 mt-4 w-full object-contain z-10 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] contrast-105 brightness-95"
                      style={hasWhiteBg(item.image) ? { filter: 'url(#remove-white)' } : undefined}
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient transition to bottom dark sector */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#04060b] to-transparent z-10" />
                  </div>

                  {/* Hero Information Content Area */}
                  <div className="relative p-6 bg-gradient-to-b from-transparent to-[#04060b] z-20 flex flex-col justify-end">
                    <div className="mb-5">
                      <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-[0.3em] mb-1.5 pl-1.5 border-l-2 border-brand-red">
                        {item.name}
                      </p>
                      <h3 
                        className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter leading-none pr-1 truncate group-hover:translate-x-1 transition-all duration-300"
                        style={{ color: item.color, textShadow: `0 0 25px ${item.color}35` }}
                      >
                        {item.skinName}
                      </h3>
                    </div>

                    <motion.button 
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: `0 0 20px ${item.color}45`
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-3 relative overflow-hidden group/btn rounded-lg text-[9px] font-black uppercase tracking-[0.35em] transition-all duration-500 bg-white/5 border border-white/10 text-white group-hover:bg-white group-hover:text-black flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Get Overrides</span>
                      <Zap className="w-3.5 h-3.5 fill-current text-white group-hover:text-black" />
                    </motion.button>
                  </div>

                  {/* Subtle Interactive Cyber Accent */}
                  <div 
                    className="absolute inset-0 rounded-[1.9rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2"
                    style={{ 
                      borderColor: `${item.color}50`, 
                      boxShadow: `inset 0 0 25px ${item.color}20, 0 0 25px ${item.color}15` 
                    }} 
                  />

                  {/* Mechanical Outer Tech Corners */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/5 rounded-br-[1.9rem] mix-blend-overlay" />
                  <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/5 rounded-tl-[1.9rem] mix-blend-overlay" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
