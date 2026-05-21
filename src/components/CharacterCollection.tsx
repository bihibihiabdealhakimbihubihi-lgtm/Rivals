/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HEROES, hasWhiteBg } from '../constants';
import { Shield, Swords, Heart, Search, Compass, Zap, Layers } from 'lucide-react';
import { Hero } from '../types';

interface CharacterCollectionProps {
  onSelectReward: (item: Hero) => void;
}

export default function CharacterCollection({ onSelectReward }: CharacterCollectionProps) {
  const [activeRole, setActiveRole] = useState<'all' | 'Duelist' | 'Vanguard' | 'Strategist'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic
  const filteredHeroes = HEROES.filter((hero) => {
    const matchesSearch = hero.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = activeRole === 'all' || hero.role === activeRole;
    return matchesSearch && matchesRole;
  });

  const roles = [
    { id: 'all', label: 'All roster', icon: Layers },
    { id: 'Duelist', label: 'Duelist (DPS)', icon: Swords },
    { id: 'Vanguard', label: 'Vanguard (Tank)', icon: Shield },
    { id: 'Strategist', label: 'Strategist (Healer)', icon: Heart },
  ] as const;

  return (
    <section id="character-collection" className="py-28 px-4 md:px-8 relative overflow-hidden bg-[#020509] border-t border-white/5">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-[5%] w-[450px] h-[450px] bg-brand-purple/5 rounded-full blur-[150px] animate-pulse [animation-delay:1.5s]" />
        <div className="absolute bottom-1/4 left-[5%] w-[450px] h-[450px] bg-brand-gold/5 rounded-full blur-[150px] animate-pulse [animation-delay:3s]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Title Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-brand-gold font-display font-black uppercase tracking-[0.4em] text-xs mb-3"
          >
            <Shield className="w-4 h-4 text-brand-gold animate-bounce" />
            PLAYABLE ROSTER OVERLAYS
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
            CHAMPION <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-500">DATABASE</span>
          </h2>
          <p className="text-slate-500 max-w-xl text-xs uppercase tracking-[0.25em] font-bold mt-3 leading-relaxed">
            Select standard hero slot configurations and activate premium character visual mods.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent rounded-full mt-6" />
        </div>

        {/* Dynamic Filter Deck */}
        <div className="glass-premium border-white/5 rounded-3xl p-6 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          {/* ROLE SELECTOR TABS */}
          <div className="flex items-center flex-wrap gap-2.5 w-full lg:w-auto">
            {roles.map((item) => {
              const RoleIcon = item.icon;
              const isActive = activeRole === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveRole(item.id)}
                  className={`px-5 py-3.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                    isActive 
                      ? 'bg-white/10 text-brand-gold border border-brand-gold/30 shadow-[0_0_15px_rgba(255,215,0,0.1)]' 
                      : 'text-slate-400 hover:text-white bg-transparent border border-transparent hover:bg-white/5'
                  }`}
                >
                  <RoleIcon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-gold' : 'text-slate-500'}`} />
                  {item.label}
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
              placeholder="Search hero ID..."
              className="w-full bg-black/40 border border-white/5 focus:border-brand-gold rounded-xl py-3 pl-12 pr-4 text-xs font-semibold text-white tracking-widest focus:outline-none transition-colors uppercase"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[9px] uppercase font-black tracking-widest text-[#FFD700] absolute right-4 top-1/2 -translate-y-1/2 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* DRY LIST STATE */}
        {filteredHeroes.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass border-white/5 rounded-3xl p-16 text-center max-w-lg mx-auto flex flex-col items-center gap-4"
          >
            <Compass className="w-12 h-12 text-slate-600 animate-spin" />
            <h3 className="text-white font-black italic uppercase text-lg tracking-wider">Empty roster slot</h3>
            <p className="text-slate-500 text-xs uppercase tracking-widest">
              No playable champions matching "{searchQuery}" under this selector tab.
            </p>
          </motion.div>
        )}

        {/* HERO CARDS COMPASS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          <AnimatePresence>
            {filteredHeroes.map((item, idx) => (
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
                {/* Visual Glass Box */}
                <div className="relative h-full w-full bg-[#04060b]/98 backdrop-blur-3xl rounded-[1.9rem] flex flex-col overflow-hidden border-shine">
                  
                  {/* Glowing background gradient fade */}
                  <div 
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-40"
                    style={{ backgroundImage: `linear-gradient(to top, ${item.color}50, transparent)` }}
                  />

                  {/* Character Meta Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/80 border border-white/15 rounded-sm backdrop-blur-md shadow-2xl">
                    <Shield className="w-3.5 h-3.5 text-brand-gold" />
                    <span className="text-[9px] font-black uppercase text-white tracking-[0.2em]">{item.role} Slot</span>
                  </div>

                  {/* Top-Right Specialty Info Pill */}
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
                      {item.role}
                    </span>
                  </div>

                  {/* Big sharp Transparent Character artwork container */}
                  <div className="relative flex-[1.4] overflow-hidden flex items-center justify-center p-4 pt-12">
                    <div 
                      className="absolute w-44 h-44 opacity-25 blur-[70px] transition-transform duration-700 group-hover:scale-130 group-hover:opacity-40"
                      style={{ background: `radial-gradient(circle, ${item.color} 0%, transparent 80%)` }}
                    />

                    {/* Tech scanline textures */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay pointer-events-none" />

                    <motion.img 
                      whileHover={{ scale: 1.1, rotate: -1.5 }}
                      transition={{ duration: 0.6 }}
                      src={item.image} 
                      alt={item.name}
                      className="h-56 mt-4 w-full object-contain z-10 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] contrast-105 brightness-95"
                      style={hasWhiteBg(item.image) ? { filter: 'url(#remove-white)' } : undefined}
                      referrerPolicy="no-referrer"
                    />

                    {/* Soft ambient bottom visual mask */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#04060b] to-transparent z-10" />
                  </div>

                  {/* Interactive card content fields */}
                  <div className="relative p-6 bg-gradient-to-b from-transparent to-[#04060b] z-20 flex flex-col justify-end">
                    <div className="mb-5">
                      <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-[0.3em] mb-1.5 pl-1.5 border-l-2 border-brand-gold">
                        Active Champion
                      </p>
                      <h3 
                        className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter leading-none pr-1 truncate group-hover:translate-x-1 transition-all duration-300"
                        style={{ color: item.color, textShadow: `0 0 25px ${item.color}35` }}
                      >
                        {item.name}
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
                      <span>Unlock Champion</span>
                      <Zap className="w-3.5 h-3.5 fill-current text-white group-hover:text-black" />
                    </motion.button>
                  </div>

                  {/* Micro Neon Highlight border overlay */}
                  <div 
                    className="absolute inset-0 rounded-[1.9rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2"
                    style={{ 
                      borderColor: `${item.color}50`, 
                      boxShadow: `inset 0 0 25px ${item.color}20, 0 0 25px ${item.color}15` 
                    }} 
                  />

                  {/* Mechanical corner trims */}
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
