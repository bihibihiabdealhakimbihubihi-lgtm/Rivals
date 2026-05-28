/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowLeft, Zap, Shield, Key, Download, RefreshCw, Star, Info, Check, MessageSquare } from 'lucide-react';
import { CharacterReward, Hero } from '../types';
import { SKIN_REWARDS, HEROES, hasWhiteBg } from '../constants';
import { useEffect, useState, FormEvent } from 'react';

interface CharacterPageProps {
  characterId: string;
  onGoBack: () => void;
  onSelectReward: (item: CharacterReward) => void;
}

export default function CharacterPage({ characterId, onGoBack, onSelectReward }: CharacterPageProps) {
  // Find matching reward asset or hero
  const cleanId = characterId.replace('-hero', '');
  const skin = SKIN_REWARDS.find(s => s.id === cleanId) || SKIN_REWARDS[0];
  const hero = HEROES.find(h => h.id === `${cleanId}-hero`) || HEROES[0];

  const accentColor = skin.color || '#FF003C';

  // State
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'install' | 'reviews'>('details');

  // Reviews Mock Data
  const [reviews, setReviews] = useState([
    { user: 'RivalsPro_99', text: 'Future Foundation looks so crisp in-game. Thanks for the quick injection code!', rating: 5, date: 'Today' },
    { user: 'VanguardMain', text: 'This anti-venom override worked on my Steam client instantly. High quality textures.', rating: 5, date: '1 day ago' },
    { user: 'Wanda_Hex', text: 'Is this real life? Chaotic override codes unlocked Chaos Queen skin on my first verification. Epic!', rating: 5, date: '2 days ago' },
  ]);

  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewUser, setNewReviewUser] = useState('');

  // Handle direct CPA action
  const handleDownloadTrigger = () => {
    setIsProcessing(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 8;
      if (current >= 100) {
        clearInterval(interval);
        setDownloadProgress(100);
        setIsProcessing(false);
        // Instant trigger Reward Activation modal
        onSelectReward(skin);
      } else {
        setDownloadProgress(current);
      }
    }, 150);
  };

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    const author = newReviewUser.trim() || 'AnonymousRival';
    setReviews([
      { user: author, text: newReviewText, rating: 5, date: 'Just now' },
      ...reviews
    ]);
    setNewReviewText('');
    setNewReviewUser('');
  };

  // Scroll to top of the subpage
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [characterId]);

  // Generate internal linking items (other characters)
  const otherSkins = SKIN_REWARDS.filter(s => s.id !== skin.id).slice(0, 3);

  return (
    <article className="min-h-screen pt-28 pb-20 px-4 md:px-8 relative bg-[#02050a] text-slate-200">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b opacity-15 pointer-events-none"
           style={{ backgroundImage: `linear-gradient(to bottom, ${accentColor} 0%, transparent)` }} />
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb with direct SEO intent */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-500 uppercase tracking-widest font-black mb-8 select-none">
          <button onClick={onGoBack} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Database
          </button>
          <span>/</span>
          <span className="text-slate-400">Roster Overview</span>
          <span>/</span>
          <span style={{ color: accentColor }}>{skin.name} ({skin.skinName})</span>
        </nav>

        {/* Dynamic Multi-column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Visual Hologram Panel */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative aspect-[3/4] w-full max-w-[380px] bg-[#03060c]/80 border rounded-[2.5rem] p-6 overflow-hidden flex items-center justify-center shadow-2xl relative"
                 style={{ borderColor: `${accentColor}30` }}>
              
              {/* Back illumination */}
              <div className="absolute w-44 h-44 rounded-full blur-[90px] opacity-25" style={{ backgroundColor: accentColor }} />
              
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 bg-black/60 border border-white/10 rounded-sm">
                <Star className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span className="text-[9px] font-black uppercase text-white tracking-widest">{skin.rarity} Quality</span>
              </div>

              <img 
                src={skin.image} 
                alt={`Marvel Rivals ${skin.name} - ${skin.skinName} mod override client file`}
                className="h-80 w-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] contrast-105 animate-float z-10"
                style={hasWhiteBg(skin.image) ? { filter: 'url(#remove-white)' } : undefined}
                referrerPolicy="no-referrer"
              />

              {/* Bottom Glow Panel */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#03060c] to-transparent z-10" />
            </div>

            {/* Micro Client Spec Specs */}
            <div className="w-full max-w-[380px] mt-6 bg-[#03060c]/40 border border-white/5 rounded-2xl p-4.5 space-y-3 font-mono text-[10px] text-slate-500">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>FILE NAME:</span>
                <span className="text-white font-bold">{skin.id}_mod_texture.pak</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>COMPATIBILITY:</span>
                <span className="text-brand-green font-bold">STEAM / EPIC / XBOX / PS5</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>IN-GAME ROTATION:</span>
                <span className="text-brand-gold font-bold">TRENDING OVERRIDE</span>
              </div>
              <div className="flex justify-between">
                <span>DOWNLOAD STATUS:</span>
                <span className="text-[#ff003c] font-bold">STANDBY ACTIVATE</span>
              </div>
            </div>
          </div>

          {/* Right Column: SEO Optimized Text, Headers, High CTR Download Button */}
          <div className="lg:col-span-7 text-left space-y-8">
            
            {/* Header Content with clear H1 & H2 Hierarchy */}
            <div>
              <span className="text-xs font-black uppercase tracking-[0.4em] px-3.5 py-1.5 rounded-md mb-4 inline-block shadow-lg border"
                    style={{ 
                      color: accentColor, 
                      borderColor: `${accentColor}30`, 
                      backgroundColor: `${accentColor}12`
                    }}>
                Premium {skin.rarity} Mod Code
              </span>

              {/* H1 SEO Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black italic uppercase text-white tracking-tighter leading-none mt-2">
                Marvel Rivals {skin.name} <span style={{ color: accentColor }}>{skin.skinName}</span> Custom Texture Skin
              </h1>

              {/* Tagline */}
              <p className="text-slate-400 font-bold uppercase tracking-wider text-[11px] sm:text-xs mt-3 pl-3 border-l-2"
                 style={{ borderLeftColor: accentColor }}>
                Exclusively compiled and ready for instantaneous network deployment. Download high-integrity game codes directly.
              </p>
            </div>

            {/* Dynamic Interactive CPA Download Card */}
            <div className="bg-[#03060c]/80 border rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl shadow-2xl"
                 style={{ borderColor: `${accentColor}40` }}>
              <div className="absolute top-0 left-0 h-[2px] w-full" style={{ backgroundColor: accentColor }} />
              
              <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight text-white mb-2">
                Secure Client Override Activation
              </h2>
              <p className="text-slate-400 text-xs uppercase tracking-wide mb-6 font-semibold">
                Start deployment sequence to synthesize your premium customized game patch.
              </p>

              {/* Action State Indicator for high conversions */}
              {isProcessing ? (
                <div className="space-y-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-2 font-mono text-xs text-brand-blue animate-pulse">
                    <RefreshCw className="w-4 h-4 animate-spin text-brand-blue" />
                    <span>SYNCHRONIZING SECURE REYLA REPOSITORY DATA ({downloadProgress}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden relative">
                    <div className="h-full bg-brand-blue rounded-full transition-all duration-150"
                         style={{ 
                           width: `${downloadProgress}%`,
                           boxShadow: '0 0 10px #00E5FF'
                         }} />
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase font-black font-mono">
                    Node Handshake Status: Packaging assets to secure memory blocks
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-start gap-3">
                      <Shield className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">ANTIVIRUS VERIFIED</span>
                        <p className="text-[10px] text-slate-500 mt-0.5 font-semibold">Protected against unauthorized modification breaches.</p>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-start gap-3">
                      <Star className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">FREE REWARD ROTATION</span>
                        <p className="text-[10px] text-slate-500 mt-0.5 font-semibold">100% complimentary skin override code rotation.</p>
                      </div>
                    </div>
                  </div>

                  {/* FLASHING GLOWS HIGH-CTR BUTTON */}
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: `0 0 35px ${accentColor}50` }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadTrigger}
                    className="w-full py-5 bg-gradient-to-r from-red-600 via-brand-red to-orange-500 text-white font-black uppercase text-sm tracking-[0.3em] flex items-center justify-center gap-3 cursor-pointer shadow-[0_10px_35px_rgba(255,0,60,0.35)] relative overflow-hidden group border-shine rounded-xl"
                  >
                    <span>ACTIVATE PREMIUM SKIN OVERRIDE</span>
                    <Download className="w-4.5 h-4.5 animate-bounce text-white" />
                  </motion.button>

                  <div className="flex items-center gap-1.5 justify-center font-mono text-[9px] text-slate-500 uppercase tracking-widest text-center mt-2.5">
                    <Star className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Secure Gateway Checked: 14,204 Successful Deployments Today</span>
                  </div>
                </div>
              )}
            </div>

            {/* Category Tabs: Features, Installation, User Reviews */}
            <div className="space-y-4">
              <div className="flex border-b border-white/10 gap-2 select-none">
                {(['details', 'install', 'reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3.5 px-5 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'text-white border-white'
                        : 'text-slate-500 hover:text-slate-300 border-transparent'
                    }`}
                  >
                    {tab === 'details' && 'Mod features'}
                    {tab === 'install' && 'Installation manual'}
                    {tab === 'reviews' && `User Feedback (${reviews.length})`}
                  </button>
                ))}
              </div>

              {/* TAB 1: MOD FEATURES */}
              {activeTab === 'details' && (
                <div className="space-y-4 pt-2">
                  <h2 className="text-lg font-black uppercase tracking-tight text-white italic">
                    Premium Skin Texture Specifications
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm uppercase leading-relaxed font-semibold mb-4">
                    Unmatched visual quality. This override injects authentic textures directly into active game blocks, enabling premium displays with zero latency.
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <li className="flex items-center gap-2.5 bg-white/5 border border-white/5 p-3 rounded-lg font-bold">
                      <Check className="w-4 h-4 text-brand-green shrink-0" /> Ultra-high 4K texture resolution override
                    </li>
                    <li className="flex items-center gap-2.5 bg-white/5 border border-white/5 p-3 rounded-lg font-bold">
                      <Check className="w-4 h-4 text-brand-green shrink-0" /> Fully compatible with native lobby renders
                    </li>
                    <li className="flex items-center gap-2.5 bg-white/5 border border-white/5 p-3 rounded-lg font-bold">
                      <Check className="w-4 h-4 text-brand-green shrink-0" /> Dynamic particle mesh optimization
                      </li>
                    <li className="flex items-center gap-2.5 bg-white/5 border border-white/5 p-3 rounded-lg font-bold">
                      <Check className="w-4 h-4 text-brand-green shrink-0" /> Premium audio spectrum alignment
                    </li>
                  </ul>
                </div>
              )}

              {/* TAB 2: INSTALLATION CODE */}
              {activeTab === 'install' && (
                <div className="space-y-4 pt-2 font-mono text-xs">
                  <h2 className="text-lg font-black uppercase tracking-tight text-white italic font-display">
                    Step-by-Step Deployment Instructions
                  </h2>
                  <div className="bg-black/50 border border-white/5 rounded-2xl p-5 space-y-3.5 text-slate-400 leading-relaxed font-semibold">
                    <p className="flex gap-3">
                      <span className="text-[#ff003c] font-black">01.</span>
                      <span>Trigger the premium override activation secure link above.</span>
                    </p>
                    <p className="flex gap-3">
                      <span className="text-[#ff003c] font-black">02.</span>
                      <span>Complete the quick digital license verification check to prove humanity (anti-bot safeguard).</span>
                    </p>
                    <p className="flex gap-3">
                      <span className="text-[#ff003c] font-black">03.</span>
                      <span>Retrieve the synthesized claims override codename passcode.</span>
                    </p>
                    <p className="flex gap-3">
                      <span className="text-[#ff003c] font-black">04.</span>
                      <span>Start Marvel Rivals on your designated system launcher, access the Mailbox tab, and insert the token.</span>
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: CUSTOM USER REVIEWS */}
              {activeTab === 'reviews' && (
                <div className="space-y-6 pt-2">
                  <h2 className="text-lg font-black uppercase tracking-tight text-white italic">
                    Community Reviews & Sync Verification
                  </h2>

                  {/* Add review form */}
                  <form onSubmit={handleAddReview} className="space-y-3 bg-white/5 border border-white/5 p-4 rounded-2xl">
                    <span className="text-[8px] uppercase tracking-widest font-black text-slate-500 block">POST YOUR HARACTER OVERRIDE REPORT</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input 
                        type="text"
                        value={newReviewUser}
                        onChange={(e) => setNewReviewUser(e.target.value)}
                        placeholder="Character ID / Gamertag..."
                        className="w-full bg-black/40 border border-white/5 focus:border-brand-red rounded-xl p-3 text-xs text-white uppercase font-bold tracking-wider placeholder-slate-600 focus:outline-none"
                      />
                      <input 
                        type="text"
                        required
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        placeholder="Tell the community how direct drops worked..."
                        className="w-full bg-black/40 border border-white/5 focus:border-brand-red rounded-xl p-3 text-xs text-white uppercase font-bold tracking-wider placeholder-slate-600 focus:outline-none"
                      />
                    </div>
                    <button type="submit" className="w-full sm:w-auto px-6 py-2.5 bg-white/10 hover:bg-white/15 text-[9px] text-white font-black uppercase tracking-widest rounded transition-all cursor-pointer">
                      Post Report Node
                    </button>
                  </form>

                  {/* Reviews lists */}
                  <div className="space-y-3">
                    {reviews.map((rev, i) => (
                      <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col gap-1.5 text-left">
                        <div className="flex justify-between items-center text-[10px] font-mono leading-none">
                          <span className="text-white font-black">{rev.user}</span>
                          <span className="text-slate-500 font-semibold">{rev.date}</span>
                        </div>
                        <p className="text-slate-400 text-xs font-semibold uppercase leading-relaxed">&ldquo;{rev.text}&rdquo;</p>
                        <div className="flex gap-1">
                          {Array.from({ length: rev.rating }).map((_, rIdx) => (
                            <Star key={rIdx} className="w-3 h-3 text-brand-gold fill-current" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Internal Link Anchor deck for better search engine crawling */}
            <div className="pt-6 border-t border-white/5">
              <h2 className="text-[10px] text-slate-500 font-semibold uppercase tracking-[0.25em] mb-4">
                Recommended Alternative Marvel Rivals Overrides (Internal Links)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {otherSkins.map((other) => (
                  <a
                    key={other.id}
                    href={`#character/${other.id}`}
                    className="p-3 bg-white/[0.02] hover:bg-white/5 border border-white/5 hover:border-brand-blue rounded-xl flex items-center gap-3.5 transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-black/50 overflow-hidden flex items-center justify-center border border-white/10 shrink-0">
                      <img 
                        src={other.image} 
                        alt={other.name} 
                        className="w-full h-full object-cover" 
                        style={hasWhiteBg(other.image) ? { filter: 'url(#remove-white)' } : undefined}
                      />
                    </div>
                    <div className="truncate">
                      <span className="text-[8px] font-black uppercase tracking-widest block" style={{ color: other.color }}>{other.rarity} mod</span>
                      <span className="text-[10px] text-white font-black uppercase truncate block">{other.skinName}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </article>
  );
}
