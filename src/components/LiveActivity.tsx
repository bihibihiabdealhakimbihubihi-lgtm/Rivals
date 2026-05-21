/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Sparkles, Trophy, Users, Zap, Bell, CheckCircle } from 'lucide-react';

interface RecentClaim {
  id: string;
  username: string;
  item: string;
  rarity: string;
  color: string;
  platform: string;
  timeAgo: string;
}

const PRESET_NAMES = [
  'ProRival#9382', 'DarkWeb#293', 'SpideyFighter#112', 'HexSorcerer#4725',
  'CarnageX#0038', 'VenomSymbiote#827', 'StrangeD#4829', 'TonyCosmic#551',
  'LoganBerserk#3392', 'MagnetoCore#839', 'JeffyShark#2231', 'GamerX#0018',
  'RivalsGod#6625', 'NetEaseElite#3920', 'LootMaster#4412', 'TikTokGamer#2918'
];

const PRESET_ITEMS = [
  { name: 'Anti-Venom', rarity: 'Exotic', color: '#FFFFFF' },
  { name: 'Future Foundation', rarity: 'Mythic', color: '#00E5FF' },
  { name: 'Chaos Queen', rarity: 'Mythic', color: '#C200FF' },
  { name: 'Berserker Rage', rarity: 'Legendary', color: '#FFD700' },
  { name: 'Cosmic Armor', rarity: 'Exotic', color: '#FF003C' },
  { name: 'Omega Power', rarity: 'Legendary', color: '#FF003C' },
  { name: 'Summer Splash', rarity: 'Limited', color: '#00E5FF' }
];

const PRESET_PLATFORMS = ['Steam', 'Epic Games', 'PlayStation', 'Xbox'];

export default function LiveActivity() {
  const [onlineUsers, setOnlineUsers] = useState(1482);
  const [claimsToday, setClaimsToday] = useState(243);
  const [recentClaims, setRecentClaims] = useState<RecentClaim[]>([]);

  // Generate initial list of claims
  useEffect(() => {
    const initial: RecentClaim[] = Array.from({ length: 4 }).map((_, idx) => {
      const item = PRESET_ITEMS[Math.floor(Math.random() * PRESET_ITEMS.length)];
      return {
        id: Math.random().toString(),
        username: PRESET_NAMES[Math.floor(Math.random() * PRESET_NAMES.length)],
        item: item.name,
        rarity: item.rarity,
        color: item.color,
        platform: PRESET_PLATFORMS[Math.floor(Math.random() * PRESET_PLATFORMS.length)],
        timeAgo: `${idx * 2 + 1}m ago`
      };
    });
    setRecentClaims(initial);
  }, []);

  // Update online users and claims progressively
  useEffect(() => {
    const timer = setInterval(() => {
      // Dynamic users count fluctuation
      setOnlineUsers((prev) => {
        const diff = Math.floor(Math.random() * 9) - 4;
        return Math.max(1400, Math.min(1600, prev + diff));
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Inject a new fake claim every few seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const item = PRESET_ITEMS[Math.floor(Math.random() * PRESET_ITEMS.length)];
      const newClaim: RecentClaim = {
        id: Math.random().toString(),
        username: PRESET_NAMES[Math.floor(Math.random() * PRESET_NAMES.length)],
        item: item.name,
        rarity: item.rarity,
        color: item.color,
        platform: PRESET_PLATFORMS[Math.floor(Math.random() * PRESET_PLATFORMS.length)],
        timeAgo: 'Just now'
      };

      setRecentClaims((prev) => {
        const next = [newClaim, ...prev.slice(0, 3)];
        // After 10 seconds, update the "Just now" tag into real minutes values
        return next.map((c, idx) => {
          if (idx > 0) {
            return { ...c, timeAgo: idx === 1 ? '1m ago' : `${idx * 2}m ago` };
          }
          return c;
        });
      });

      setClaimsToday((v) => v + 1);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-16 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Real-time trust stats card (Left) */}
        <div className="lg:col-span-5 glass-premium border-white/5 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          {/* Top subtle grid pattern */}
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 border border-brand-green/20 text-brand-green rounded-full text-[9px] font-black uppercase tracking-widest w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
              Verifying Terminal Active
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black italic uppercase text-white tracking-tighter leading-none mb-1">
              MULTIVERSE STREAM FEED
            </h3>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-6">
              Official catalog claim and server injection stats.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start text-slate-500 mb-1">
                  <span className="p-1 rounded-md bg-brand-red/10 border border-brand-red/20 text-[#ff003c]">
                    <Zap className="w-3 h-3" />
                  </span>
                  <span className="text-[9px] uppercase font-black tracking-widest">Active Claims</span>
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-white italic">
                  {claimsToday}
                  <span className="text-slate-500 text-sm font-bold ml-1">Today</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start text-slate-500 mb-1">
                  <span className="p-1 rounded-md bg-brand-blue/10 border border-brand-blue/20 text-brand-blue">
                    <Users className="w-3 h-3" />
                  </span>
                  <span className="text-[9px] uppercase font-black tracking-widest">Live Agents</span>
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-[#00E5FF] italic">
                  {onlineUsers}
                  <span className="text-[#00E5FF] text-[8px] uppercase tracking-widest animate-pulse ml-2">●</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 mt-6 flex items-center gap-2.5 relative z-10 text-[9px] text-slate-400 uppercase font-black tracking-normal">
            <ShieldCheck className="w-4 h-4 text-brand-green" />
            <span>Anti-Duplicate Security Key System Activated.</span>
          </div>
        </div>

        {/* Live Ticker Feed (Right) */}
        <div className="lg:col-span-7 glass-premium border-white/5 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#ff003c]" />
                <span className="text-[10px] uppercase font-black tracking-widest text-[#ff003c]">Recent Drops Claims</span>
              </div>
              <span className="text-[9px] font-bold text-slate-500">REALTIME NETWORK LOG</span>
            </div>

            {/* Scrolling Feed layout */}
            <div className="space-y-3 h-[180px] overflow-hidden relative">
              <AnimatePresence mode="popLayout">
                {recentClaims.map((claim, idx) => (
                  <motion.div
                    key={claim.id}
                    layout
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1 - idx * 0.22, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="w-8 h-8 rounded-lg bg-black/40 border-2 flex items-center justify-center font-black italic text-[9px]"
                           style={{ borderColor: claim.color, color: claim.color }}>
                        {claim.username.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white">{claim.username}</span>
                          <span className="text-[8px] uppercase font-extrabold px-1.5 py-0.5 rounded-sm bg-white/5 text-slate-400">
                            {claim.platform}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Claimed <span className="font-bold text-white uppercase italic" style={{ color: claim.color }}>{claim.item} Override</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 pl-2 shrink-0">
                      <span className="text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded bg-[#ff003c]/10 text-[#ff003c] border border-[#ff003c]/20"
                            style={{ color: claim.color, borderColor: `${claim.color}30`, backgroundColor: `${claim.color}10` }}>
                        {claim.rarity}
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-slate-500">{claim.timeAgo}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
