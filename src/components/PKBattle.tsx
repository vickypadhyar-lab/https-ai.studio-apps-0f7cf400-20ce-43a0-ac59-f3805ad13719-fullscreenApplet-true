import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Zap, Timer } from 'lucide-react';
import { cn } from '../lib/utils';
import type { PKBattle as PKBattleType } from '../types';

interface PKBattleProps {
  battle: PKBattleType;
}

export function PKBattle({ battle }: PKBattleProps) {
  const totalScore = battle.scoreA + battle.scoreB;
  const percentageA = totalScore === 0 ? 50 : (battle.scoreA / totalScore) * 100;
  
  return (
    <div className="w-full flex flex-col gap-4 p-4 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative shadow-2xl">
      <div className="flex justify-between items-end px-2">
        <div className="flex flex-col items-start">
          <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase mb-1">TEAM ALPHA</span>
          <span className="font-display text-3xl font-black text-white italic tracking-tighter">
            {battle.scoreA.toLocaleString()}
          </span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-slate-800 px-3 py-1 rounded-lg flex items-center gap-2 border border-slate-700 mb-2">
            <Timer size={14} className="text-rose-500" />
            <span className="font-mono text-sm font-bold text-white leading-none">
              {Math.floor(battle.timeLeft / 60)}:{(battle.timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <div className="bg-white text-black px-4 py-0.5 rounded font-black text-xs skew-x-[-15deg] shadow-lg">
            VERSUS
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black tracking-widest text-rose-400 uppercase mb-1">TEAM BETA</span>
          <span className="font-display text-3xl font-black text-white italic tracking-tighter">
            {battle.scoreB.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden flex">
        <motion.div 
          initial={{ width: '50%' }}
          animate={{ width: `${percentageA}%` }}
          className="h-full bg-indigo-500 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
        </motion.div>
        
        <motion.div 
          initial={{ width: '50%' }}
          animate={{ width: `${100 - percentageA}%` }}
          className="h-full bg-rose-500 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>
      </div>
      
      {/* Dynamic Glows */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1/3 bg-indigo-500/10 blur-3xl pointer-events-none transition-opacity",
        percentageA > 50 ? "opacity-100" : "opacity-0"
      )} />
      <div className={cn(
        "absolute right-0 top-0 bottom-0 w-1/3 bg-rose-500/10 blur-3xl pointer-events-none transition-opacity",
        percentageA < 50 ? "opacity-100" : "opacity-0"
      )} />
    </div>
  );
}
