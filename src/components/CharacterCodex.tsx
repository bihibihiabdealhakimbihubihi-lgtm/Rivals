/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Swords, Heart, Sparkles, Star, Award, ChevronRight, Zap, Play } from 'lucide-react';
import { CharacterReward } from '../types';
import { hasWhiteBg } from '../constants';

interface CharacterCodexProps {
  onSelectReward: (item: CharacterReward) => void;
}

interface CodexCharacter {
  id: string;
  name: string;
  role: 'Vanguard' | 'Duelist' | 'Strategist';
  roleLabel: string;
  description: string;
  color: string;
  portrait: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  stats: {
    offense: number;
    defense: number;
    utility: number;
    difficultyVal: number;
  };
  skins: {
    name: string;
    rarity: string;
    image: string;
    color: string;
  }[];
}

const CODEX_CHARACTERS: CodexCharacter[] = [
  {
    id: 'spiderman',
    name: 'Spider-Man',
    role: 'Duelist',
    roleLabel: 'Agile Melee Flanker & Assassin',
    description: 'Peter Parker swings through the battlefield of the Multiverse, manipulating gravity and webs to isolate high-value tactical priority targets. He delivers devastating combo overrides and escapes using fluid aerial acrobatics.',
    color: '#00E5FF',
    portrait: 'https://i.postimg.cc/Y9S4Q9y0/Spider-Man-Spider-Man-No-Way-Home-Table-Icon-(1).webp',
    difficulty: 'Hard',
    stats: { offense: 90, defense: 35, utility: 60, difficultyVal: 85 },
    skins: [
      { name: 'Future Foundation', rarity: 'Mythic', image: 'https://i.postimg.cc/FzT7PJ7r/Spider-Man-Future-Foundation-Table-Icon.webp', color: '#00E5FF' },
      { name: 'Classic Suit', rarity: 'Standard', image: 'https://i.postimg.cc/Y9S4Q9y0/Spider-Man-Spider-Man-No-Way-Home-Table-Icon-(1).webp', color: '#FF003C' }
    ]
  },
  {
    id: 'venom',
    name: 'Venom',
    role: 'Vanguard',
    roleLabel: 'Sustained Symbiote Brawler & Frontliner',
    description: 'Edward Brock bonded with an alien consciousness that thrives on kinetic combat operations. Venom manipulates organic tissue armor density, absorbing massive enemy firepower, while crashing onto defense layers to isolate targets.',
    color: '#FFFFFF',
    portrait: 'https://i.postimg.cc/WprBBV9G/download.jpg',
    difficulty: 'Medium',
    stats: { offense: 75, defense: 95, utility: 50, difficultyVal: 60 },
    skins: [
      { name: 'Anti-Venom', rarity: 'Exotic', image: 'https://i.postimg.cc/kgpY0jkc/venom-anti-venom.webp', color: '#FFFFFF' },
      { name: 'Lethal Protector', rarity: 'Legendary', image: 'https://i.postimg.cc/WprBBV9G/download.jpg', color: '#FF003C' }
    ]
  },
  {
    id: 'scarletwitch',
    name: 'Scarlet Witch',
    role: 'Strategist',
    roleLabel: 'Chaos Energy Controller & Buff Buffer',
    description: 'Wanda Maximoff commands chaotic multiversal manipulation, destabilizing active defense grids and shielding squadmates. Her area-of-effect spells override standard client spatial rules, causing chain damage.',
    color: '#C200FF',
    portrait: 'https://i.postimg.cc/ncXDFdDg/download.jpg',
    difficulty: 'Easy',
    stats: { offense: 80, defense: 45, utility: 85, difficultyVal: 40 },
    skins: [
      { name: 'Chaos Queen', rarity: 'Mythic', image: 'https://i.postimg.cc/Px4RRthG/images.jpg', color: '#C200FF' },
      { name: 'Darkhold Wand', rarity: 'Legendary', image: 'https://i.postimg.cc/ncXDFdDg/download.jpg', color: '#6A00FF' }
    ]
  },
  {
    id: 'jeff',
    name: 'Jeff the Land Shark',
    role: 'Strategist',
    roleLabel: 'Adorably Lethal Support Specialist',
    description: 'Do not let his cute fins fool you. Jeff tracks across custom surface dimensions to heal squad coordinates while biting down with relentless aquatic fury. His dynamic speed bonuses enhance key mobile units during rush steps.',
    color: '#00E5FF',
    portrait: 'https://i.postimg.cc/ry3Hgw5f/images.jpg',
    difficulty: 'Easy',
    stats: { offense: 40, defense: 40, utility: 95, difficultyVal: 30 },
    skins: [
      { name: 'Summer Splash', rarity: 'Limited', image: 'https://i.postimg.cc/yYZMzHvn/download.jpg', color: '#00E5FF' },
      { name: 'Cute Sailor', rarity: 'Legendary', image: 'https://i.postimg.cc/ry3Hgw5f/images.jpg', color: '#FF9500' }
    ]
  },
  {
    id: 'magneto',
    name: 'Magneto',
    role: 'Vanguard',
    roleLabel: 'Magnetic Force-Field Architect',
    description: 'Max Eisenhardt controls electromagnetic vectors with supreme poise. He shields himself and his allies using robust force-fields while projecting molten metal spears at high velocities toward enemy defensive hubs.',
    color: '#FF003C',
    portrait: 'https://i.postimg.cc/vZ62VLpC/download.jpg',
    difficulty: 'Medium',
    stats: { offense: 70, defense: 90, utility: 65, difficultyVal: 65 },
    skins: [
      { name: 'Omega Power', rarity: 'Legendary', image: 'https://i.postimg.cc/N0p8nKXZ/images.jpg', color: '#FF003C' },
      { name: 'Asgardian Armor', rarity: 'Exotic', image: 'https://i.postimg.cc/vZ62VLpC/download.jpg', color: '#FFF' }
    ]
  }
];

export default function CharacterCodex({ onSelectReward }: CharacterCodexProps) {
  const [selectedChar, setSelectedChar] = useState<CodexCharacter>(CODEX_CHARACTERS[0]);
  const [activeSkinIdx, setActiveSkinIdx] = useState(0);

  const handleCharChange = (char: CodexCharacter) => {
    setSelectedChar(char);
    setActiveSkinIdx(0);
  };

  const currentSkin = selectedChar.skins[activeSkinIdx];

  const triggerClaimReward = () => {
    // Construct corresponding CharacterReward object
    const reward: CharacterReward = {
      id: `${selectedChar.id}-${currentSkin.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: selectedChar.name,
      skinName: currentSkin.name,
      image: currentSkin.image,
      rarity: currentSkin.rarity as any,
      color: selectedChar.color
    };
    onSelectReward(reward);
  };

  return (
    <section id="character-codex" className="py-28 px-4 md:px-8 relative overflow-hidden bg-[#04070e] border-t border-white/5">
      {/* Dynamic Ambient Blur Halo */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-15 transition-all duration-1000 pointer-events-none"
        style={{ backgroundColor: selectedChar.color }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <span 
            className="flex items-center gap-2 font-display font-black uppercase tracking-[0.4em] text-xs transition-colors duration-500 mb-3"
            style={{ color: selectedChar.color }}
          >
            <Star className="w-4 h-4 animate-spin-slow" />
            UNIVERSE CHARACTER FILES
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
            HERO <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">MANIFESTS</span>
          </h2>
          <p className="text-slate-500 max-w-xl text-xs uppercase tracking-[0.25em] font-bold mt-3 leading-relaxed">
            Uncover professional profiles and claim exclusive community override packs.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#ff003c] to-transparent rounded-full mt-6" />
        </div>

        {/* Horizontal Navigation Grid for top 5 heroes */}
        <div className="flex overflow-x-auto pb-4 gap-3 justify-start lg:justify-center custom-scrollbar mb-12 select-none">
          {CODEX_CHARACTERS.map((char) => {
            const isCurrent = selectedChar.id === char.id;
            return (
              <button
                key={char.id}
                onClick={() => handleCharChange(char)}
                className={`flex items-center gap-3 py-3 px-5 rounded-2xl border transition-all duration-300 whitespace-nowrap cursor-pointer shrink-0 ${
                  isCurrent
                    ? 'bg-white/10 text-white border-white/20'
                    : 'bg-[#03050a]/40 text-slate-400 border-white/5 hover:bg-white/5 hover:text-white'
                }`}
                style={{ 
                  borderColor: isCurrent ? char.color : undefined,
                  boxShadow: isCurrent ? `0 0 20px ${char.color}15` : undefined
                }}
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden border border-white/15 bg-black/40">
                  <img 
                    src={char.portrait} 
                    alt={char.name} 
                    className="w-full h-full object-cover" 
                    style={hasWhiteBg(char.portrait) ? { filter: 'url(#remove-white)' } : undefined}
                  />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">{char.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Board */}
        <div className="bg-[#03050b]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 relative overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="absolute top-0 right-0 h-[2px] w-full" style={{ backgroundColor: selectedChar.color }} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Sector: Interactive Holographic Portrait & Renders */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[300px] sm:min-h-[400px]">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSkin.image}
                  initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 w-full max-w-[320px] flex items-center justify-center"
                >
                  {/* Neon pulsing back-shadow aura */}
                  <div 
                    className="absolute inset-0 blur-[80px] opacity-25 rounded-full transition-colors duration-1000 animate-pulse"
                    style={{ backgroundColor: selectedChar.color }}
                  />
                  <img
                    src={currentSkin.image}
                    alt={`${selectedChar.name} - ${currentSkin.name} Skin`}
                    className="h-80 sm:h-96 w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] scale-105"
                    referrerPolicy="no-referrer"
                    style={hasWhiteBg(currentSkin.image) ? { filter: 'url(#remove-white)' } : undefined}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Multi-Skin Override Picker Row */}
              <div className="flex gap-3.5 mt-6 relative z-20">
                {selectedChar.skins.map((skin, idx) => {
                  const isActive = activeSkinIdx === idx;
                  return (
                    <button
                      key={skin.name}
                      onClick={() => setActiveSkinIdx(idx)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'bg-black/30 text-slate-500 hover:text-slate-300'
                      }`}
                      style={{ borderColor: isActive ? selectedChar.color : 'rgba(255,255,255,0.05)' }}
                    >
                      <div className="w-12 h-12 rounded-lg bg-black/50 overflow-hidden flex items-center justify-center border border-white/5">
                        <img 
                          src={skin.image} 
                          alt={skin.name} 
                          className="w-full h-full object-cover" 
                          style={hasWhiteBg(skin.image) ? { filter: 'url(#remove-white)' } : undefined}
                        />
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-wider">{skin.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Sector: Technical Specs, Story, Capability Sliders */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div>
                <div className="flex items-center gap-3.5 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] px-3.5 py-1 rounded bg-[#ff003c]/10 text-[#ff003c] border border-[#ff003c]/20"
                        style={{ color: selectedChar.color, borderColor: `${selectedChar.color}30`, backgroundColor: `${selectedChar.color}10` }}>
                    {selectedChar.role} Class
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none">
                    Difficulty: <span className="text-white">{selectedChar.difficulty}</span>
                  </span>
                </div>

                <h3 className="text-4xl sm:text-5xl font-black italic uppercase text-white mt-3 tracking-tighter">
                  {selectedChar.name}
                </h3>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-xs sm:text-sm mt-1"
                   style={{ color: selectedChar.color }}>
                  {selectedChar.roleLabel}
                </p>

                <p className="text-slate-500 text-xs sm:text-sm uppercase tracking-wide leading-relaxed mt-4 font-semibold text-justify">
                  {selectedChar.description}
                </p>
              </div>

              {/* Slider Combat stats mock */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#ff003c] block">
                  CAPABILITY PROFILE RATINGS
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Sliders rows */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>Offense Potential</span>
                      <span>{selectedChar.stats.offense}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${selectedChar.stats.offense}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="h-full bg-[#ff003c]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>Defense/Armor rating</span>
                      <span>{selectedChar.stats.defense}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${selectedChar.stats.defense}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="h-full bg-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>Utility & Crowd Control</span>
                      <span>{selectedChar.stats.utility}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${selectedChar.stats.utility}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="h-full bg-brand-gold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>Fighter Skill Ceiling</span>
                      <span>{selectedChar.stats.difficultyVal}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${selectedChar.stats.difficultyVal}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="h-full bg-slate-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-step skin claiming sector */}
              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-5 leading-none">
                <div>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">CURRENT SPEC SELECTED</span>
                  <p className="text-white font-black uppercase tracking-wider italic text-sm mt-1">
                    {currentSkin.name} Override Code
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${selectedChar.color}40` }}
                  whileTap={{ scale: 0.98 }}
                  onClick={triggerClaimReward}
                  className="w-full sm:w-auto px-10 py-4.5 text-[10px] text-white font-black uppercase tracking-[0.3em] bg-[#ff003c] relative overflow-hidden group border-shine"
                  style={{ backgroundColor: selectedChar.color, clipPath: 'polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%)' }}
                >
                  <span className="flex items-center justify-center gap-1.5 z-10 relative">
                    CLAIM THIS OVERRIDE <Play className="w-3.5 h-3.5 fill-current text-white" />
                  </span>
                </motion.button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
