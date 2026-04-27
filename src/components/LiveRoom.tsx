import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Users, 
  Mic, 
  MicOff, 
  Share2, 
  Heart, 
  ShieldCheck, 
  Trophy,
  Star,
  TrendingUp,
  Gift as GiftIcon
} from 'lucide-react';
import { Chat } from './Chat';
import { PKBattle } from './PKBattle';
import { cn } from '../lib/utils';
import type { Room, ChatMessage, Gift, PKBattle as PKBattleType } from '../types';

interface LiveRoomProps {
  room: Room;
  onClose: () => void;
}

export default function LiveRoom({ room, onClose }: LiveRoomProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { id: '1', userId: 'sys', userName: 'System', text: 'Welcome to the room! Keep it respectful.', timestamp: Date.now(), isSystem: true },
  ]);
  const [isMuted, setIsMuted] = React.useState(false);
  const [activeGifts, setActiveGifts] = React.useState<{ id: string; icon: string; animation: string }[]>([]);
  
  const mockPK: PKBattleType = {
    id: 'pk-1',
    roomAId: room.id,
    roomBId: 'other-room',
    scoreA: 12500,
    scoreB: 9800,
    timeLeft: 300,
  };

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Math.random().toString(),
      userId: 'user-1',
      userName: 'ModernGifts',
      text,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendGift = (gift: Gift) => {
    // Add to chat
    const giftMsg: ChatMessage = {
      id: Math.random().toString(),
      userId: 'user-1',
      userName: 'ModernGifts',
      text: `sent ${gift.name} ${gift.icon}`,
      timestamp: Date.now(),
      giftId: gift.id,
    };
    setMessages(prev => [...prev, giftMsg]);

    // Add animation
    const animationId = Math.random().toString();
    setActiveGifts(prev => [...prev, { id: animationId, icon: gift.icon, animation: gift.animation }]);
    setTimeout(() => {
      setActiveGifts(prev => prev.filter(g => g.id !== animationId));
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[100] bg-surface flex flex-col md:flex-row overflow-hidden text-slate-200"
    >
      {/* Left Navigation (Thin) */}
      <nav className="hidden md:flex w-20 flex-col items-center py-8 gap-8 border-r border-slate-800 bg-slate-900">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
          <Star size={24} fill="white" />
        </div>
        <div className="flex flex-col gap-6">
          <button className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 hover:text-white transition-colors">
             <TrendingUp size={20} />
          </button>
          <button className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
             <Mic size={20} />
          </button>
          <button className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 hover:text-white transition-colors">
             <Trophy size={20} />
          </button>
        </div>
      </nav>

      {/* Main Stage */}
      <div className="flex-1 relative flex flex-col bg-slate-950">
        {/* Header Overlay */}
        <header className="h-16 px-6 flex items-center justify-between border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-md relative z-10">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-rose-500 text-white text-[10px] font-black uppercase rounded-full tracking-widest animate-pulse-soft">Live</div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">{room.title}</h1>
              <p className="text-[10px] text-slate-500 font-medium">ROOM ID: {room.id.toUpperCase()} | {room.viewerCount} STREAMING</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex -space-x-2 mr-4">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden" />
               ))}
               <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">+12</div>
             </div>
             <button 
              onClick={onClose}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 flex items-center justify-center transition-all"
             >
                <X size={20} />
             </button>
          </div>
        </header>

        {/* Video/PK Area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          <img 
            src={room.coverImage} 
            className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-110"
            alt="bg"
          />
          
          {/* Broadcasters in PK Battle */}
          {room.pkActive && (
            <div className="w-full max-w-4xl px-8 flex flex-col gap-12 z-10">
              <PKBattle battle={mockPK} />
              
              <div className="flex justify-between items-center px-12">
                <div className="flex flex-col items-center gap-4 group">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-3xl border-4 border-indigo-600 p-1 bg-slate-900 shadow-2xl overflow-hidden mt-4">
                      <img src={room.coverImage} className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500" alt="H" />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-3 py-0.5 rounded font-black text-[10px] uppercase tracking-widest shadow-lg">HOST</div>
                  </div>
                  <span className="text-sm font-bold text-indigo-400 tracking-wider">HOST_SHARK 🔥</span>
                </div>

                <div className="bg-white text-black px-6 py-2 rounded-2xl font-black text-3xl skew-x-[-15deg] shadow-[0_0_50px_rgba(255,255,255,0.2)] animate-pulse">
                  VS
                </div>

                <div className="flex flex-col items-center gap-4 group">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-3xl border-4 border-rose-500 p-1 bg-slate-900 shadow-2xl overflow-hidden mt-4">
                      <div className="w-full h-full rounded-2xl bg-slate-700 flex items-center justify-center text-rose-300">
                        <Users size={40} />
                      </div>
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-rose-500 text-white px-3 py-0.5 rounded font-black text-[10px] uppercase tracking-widest shadow-lg">GUEST</div>
                  </div>
                  <span className="text-sm font-bold text-rose-400 tracking-wider">PIANO_GIRL 🎹</span>
                </div>
              </div>
            </div>
          )}

          {/* Gift Animations Overlay */}
          <div className="absolute inset-0 pointer-events-none z-50">
            <AnimatePresence>
              {activeGifts.map((gift) => (
                <motion.div
                  key={gift.id}
                  initial={{ opacity: 0, scale: 0.5, y: 100 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0], 
                    scale: [0.5, 2, 1.8, 0],
                    y: -600,
                    x: (Math.random() - 0.5) * 500
                  }}
                  transition={{ duration: 4, ease: 'easeOut' }}
                  className="absolute bottom-40 left-1/2 -translate-x-1/2 text-8xl filter drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                >
                  {gift.icon}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="h-24 px-8 flex items-center gap-4 bg-slate-900 border-t border-slate-800">
           <button 
            onClick={() => setIsMuted(!isMuted)}
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-all border",
              isMuted ? "bg-rose-500 border-rose-400 text-white" : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
            )}
           >
             {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
           </button>
           <button className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors">
              <Heart size={24} />
           </button>
           <div className="flex-1" />
           <button className="px-8 h-12 bg-gradient-to-r from-accent-orange to-rose-500 rounded-xl font-black text-sm text-white flex items-center gap-3 shadow-lg shadow-rose-500/20 active:scale-95 transition-all uppercase tracking-widest">
              <GiftIcon size={20} />
              <span>GIFT PK</span>
           </button>
        </div>
      </div>

      {/* Side Chat */}
      <aside className="w-full md:w-[360px] h-[400px] md:h-full border-l border-slate-800">
        <Chat 
          messages={messages} 
          onSendMessage={handleSendMessage} 
          onSendGift={handleSendGift} 
        />
      </aside>
    </motion.div>
  );
}
