/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Twitter, Youtube, MessageSquare, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
              <span className="text-white font-black italic text-xs">MR</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tighter">
              MARVEL<span className="text-brand-red">RIVALS</span>
            </span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            The multiverse's leading platform for Marvel Rivals hero skins and community drops. 
            Assemble your team, claim your rewards.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-brand-blue transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-brand-blue transition-colors"><Youtube className="w-5 h-5" /></a>
            <a href="#" className="hover:text-brand-blue transition-colors"><MessageSquare className="w-5 h-5" /></a>
            <a href="#" className="hover:text-brand-blue transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-display font-bold uppercase tracking-widest text-[10px] mb-8">Platform</h4>
          <ul className="flex flex-col gap-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Live Drops</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Verification</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-bold uppercase tracking-widest text-[10px] mb-8">Support</h4>
          <ul className="flex flex-col gap-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Discord Server</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security Rules</a></li>
            <li><a href="#" className="hover:text-white transition-colors">API Status</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-bold uppercase tracking-widest text-[10px] mb-8">Newsletter</h4>
          <p className="text-slate-500 text-sm mb-6">Stay updated with the latest drops and community events.</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Email address" 
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-blue transition-colors"
            />
            <button className="bg-brand-blue text-dark-bg font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-transform">
              Join
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-600">
          © 2026 ROCKET REWARDS SYSTEM. ALL RIGHTS RESERVED.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-8 text-[10px] uppercase font-bold tracking-widest text-slate-600">
          <span className="flex items-center gap-1.5 text-brand-green">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
            Servers Stable
          </span>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
