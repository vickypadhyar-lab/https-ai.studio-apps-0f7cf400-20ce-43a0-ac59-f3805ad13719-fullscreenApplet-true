/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic2, 
  Video, 
  Users, 
  Crown, 
  MessageCircle, 
  Trophy, 
  Zap,
  Search,
  Bell,
  Star,
  TrendingUp,
  Flame
} from 'lucide-react';
import { cn } from './lib/utils';
import { INITIAL_ROOMS } from './constants';
import type { Room as RoomType } from './types';
import LiveRoom from './components/LiveRoom';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<'live' | 'voice'>('live');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedRoom, setSelectedRoom] = React.useState<RoomType | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden text-slate-200">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-surface-muted/80 backdrop-blur-md border-b border-border h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="w-5 h-5 border-2 border-white rounded-sm" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight hidden sm:block text-white">VP LIVE STREAM</span>
        </div>

        <div className="flex-1 max-w-lg mx-12 relative hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            type="text"
            placeholder="Search artists, streams, or rooms..."
            className="w-full h-10 bg-surface/50 border border-border rounded-xl pl-11 pr-4 focus:ring-1 focus:ring-brand-primary outline-none transition-all placeholder:text-slate-600 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-6">
          <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-secondary rounded-full border-2 border-surface-muted" />
          </button>
          
          <div className="flex items-center gap-3 bg-surface-light/50 border border-border p-1 rounded-full pr-4">
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 overflow-hidden" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-brand-primary leading-none">PRO USER</span>
              <span className="text-[10px] text-slate-500 font-medium">VIP 12</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        {/* Hero Ranking Push Section */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 relative overflow-hidden rounded-[2rem] h-56 md:h-72 bg-slate-900 border border-border p-10 flex items-center">
            <div className="relative z-10 max-w-md">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-[10px] mb-4 uppercase tracking-[0.3em]">
                <Star size={12} fill="currentColor" /> Season Event
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-black leading-[0.9] mb-6 text-white uppercase tracking-tighter">
                STAR <br/>RANKING <span className="text-indigo-500 italic">IV</span>
              </h1>
              <p className="text-slate-400 text-sm mb-8 max-w-xs leading-relaxed">Rise through the global leaderboards. The top performers share a weekly 50,000 credit prize pool.</p>
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30 uppercase tracking-widest">
                VIEW LADDER
              </button>
            </div>
            {/* Visual Flairs */}
            <div className="absolute right-0 top-0 bottom-0 w-3/4 bg-gradient-to-l from-indigo-600/10 to-transparent pointer-events-none" />
            <Crown className="absolute -right-20 -bottom-10 text-slate-800/20" size={320} />
          </div>

          <div className="bg-surface-muted border border-border rounded-[2rem] p-8 flex flex-col shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display font-bold text-[11px] tracking-[0.2em] uppercase flex items-center gap-2 text-slate-400">
                <Trophy size={14} className="text-amber-500" /> Hall of Fame
              </h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] text-indigo-400 uppercase font-black tracking-widest">LIVE</span>
              </div>
            </div>
            <div className="space-y-6 flex-1">
              {[
                { name: 'CrystalKing', value: '1,240,000', rank: 1, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                { name: 'NeonPulse', value: '890,500', rank: 2, color: 'text-slate-400', bg: 'bg-slate-400/10' },
                { name: 'VibeHunter', value: '640,000', rank: 3, color: 'text-orange-500', bg: 'bg-orange-500/10' },
              ].map((user) => (
                <div key={user.name} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black italic border border-white/5", user.color, user.bg)}>
                      {user.rank}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-wider">{user.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{user.value} PTS</p>
                    </div>
                  </div>
                  <TrendingUp size={14} className="text-slate-700 group-hover:text-indigo-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories / Tabs */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
          {(['live', 'voice'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-3 whitespace-nowrap text-xs uppercase tracking-widest",
                activeTab === tab 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                  : "bg-surface-light/50 border border-border text-slate-500 hover:text-white hover:bg-surface-light transition-all"
              )}
            >
              {tab === 'live' ? <Video size={14} /> : <Mic2 size={14} />}
              {tab}
            </button>
          ))}
          <div className="h-6 w-[1px] bg-border mx-3" />
          {['Gaming', 'Music', 'ASMR', 'Talk Show'].map(cat => (
            <button 
              key={cat}
              className="px-6 py-3 rounded-xl bg-surface-muted border border-border text-slate-500 hover:text-white transition-all text-[11px] font-bold uppercase tracking-widest whitespace-nowrap"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {INITIAL_ROOMS
              .filter(room => searchQuery ? room.title.toLowerCase().includes(searchQuery.toLowerCase()) : true)
              .map((room, index) => (
              <RoomCard 
                key={room.id} 
                room={room as RoomType} 
                index={index} 
                onClick={() => setSelectedRoom(room as RoomType)}
              />
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Live Room Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <LiveRoom 
            room={selectedRoom} 
            onClose={() => setSelectedRoom(null)} 
          />
        )}
      </AnimatePresence>

      {/* Mobile Nav */}
      <nav className="md:hidden sticky bottom-0 z-50 bg-slate-900 border-t border-slate-800 h-16 flex items-center justify-around backdrop-blur-xl">
        <button className="p-2 text-indigo-500"><Video size={24} /></button>
        <button className="p-2 text-slate-500"><Search size={24} /></button>
        <button className="p-2 text-slate-500"><Trophy size={24} /></button>
        <button className="p-2 text-slate-500"><Users size={24} /></button>
      </nav>
    </div>
  );
}

interface RoomCardProps {
  room: RoomType;
  index: number;
  onClick: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] cursor-pointer bg-surface-muted border border-border shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
    >
      <img 
        src={room.coverImage} 
        alt={room.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
      />
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/20" />
      
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="bg-rose-500 text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1.5 uppercase tracking-widest animate-pulse-soft">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          Live
        </div>
        {room.pkActive && (
          <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1.5 uppercase tracking-widest shadow-lg shadow-indigo-600/20">
            <Zap size={10} fill="currentColor" />
            PK
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-white flex items-center gap-2 border border-white/10 uppercase tracking-tighter">
        <Users size={12} className="text-indigo-400" />
        {room.viewerCount}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 pt-12">
        <h3 className="font-display font-bold text-xl leading-tight mb-3 text-white group-hover:text-indigo-400 transition-colors line-clamp-2 uppercase tracking-tight">
          {room.title}
        </h3>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-800 border border-border overflow-hidden p-0.5">
            <div className="w-full h-full rounded-lg bg-slate-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">HOST</span>
            <span className="text-[11px] font-bold text-white/80">@host_{room.hostId}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};



