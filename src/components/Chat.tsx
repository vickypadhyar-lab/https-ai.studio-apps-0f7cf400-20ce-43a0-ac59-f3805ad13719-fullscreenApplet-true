import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Smile, Gift as GiftIcon } from 'lucide-react';
import { GIFTS } from '../constants';
import type { ChatMessage, Gift } from '../types';
import { cn } from '../lib/utils';

interface ChatProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onSendGift: (gift: Gift) => void;
}

export function Chat({ messages, onSendMessage, onSendGift }: ChatProps) {
  const [inputText, setInputText] = React.useState('');
  const [showGiftSelector, setShowGiftSelector] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/50 backdrop-blur-xl border-l border-slate-800 relative overflow-hidden">
      {/* Tab Selection (Decorative) */}
      <div className="flex border-b border-slate-800">
        <button className="flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 border-b-2 border-indigo-500">Live Chat</button>
        <button className="flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Viewers</button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar"
      >
        <div className="text-[11px] bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20 text-indigo-300 leading-relaxed mb-6">
          <span className="font-bold">SYSTEM:</span> Welcome to the room! Be respectful and enjoy the vibes. No spamming allowed.
        </div>
        
        {messages.filter(m => !m.isSystem).map((msg) => (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id} 
            className="text-[11px] leading-relaxed group"
          >
            <span className={cn(
              "font-bold mr-2 uppercase tracking-tighter transition-colors",
              msg.giftId ? "text-amber-400" : "text-slate-500 group-hover:text-slate-300"
            )}>
              {msg.userName}:
            </span>
            <span className={cn(
              "text-slate-300",
              msg.giftId ? "italic font-semibold text-amber-200 bg-amber-500/20 px-2 py-0.5 rounded shadow-sm shadow-amber-500/20" : ""
            )}>
              {msg.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-slate-900 border-t border-slate-800 relative">
        <AnimatePresence>
          {showGiftSelector && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-full left-4 right-4 mb-4 p-4 bg-slate-950 border border-slate-800 rounded-2xl grid grid-cols-3 gap-3 shadow-2xl z-20"
            >
              {GIFTS.map((gift) => (
                <button
                  key={gift.id}
                  onClick={() => {
                    onSendGift(gift);
                    setShowGiftSelector(false);
                  }}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-indigo-500/30"
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform">{gift.icon}</span>
                  <span className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter">{gift.value}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowGiftSelector(!showGiftSelector)}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all border",
              showGiftSelector 
                ? "bg-indigo-600 border-indigo-500 text-white" 
                : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
            )}
          >
            <GiftIcon size={18} />
          </button>
          
          <div className="flex-1 relative">
            <input 
              type="text"
              placeholder="Share your thoughts..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl h-10 px-4 outline-none focus:ring-1 focus:ring-indigo-500 text-[11px] placeholder:text-slate-700 text-slate-200 transition-all font-medium"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
          </div>
          
          <button 
            onClick={handleSend}
            className="w-10 h-10 bg-indigo-600 rounded-xl text-white hover:bg-indigo-500 transition-all flex items-center justify-center shadow-lg shadow-indigo-600/20 group"
          >
            <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
