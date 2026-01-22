'use client';

import React, { useState, useEffect } from 'react';
import { 
  Zap, Hexagon, Wallet, RefreshCw, CheckCircle2, 
  Lock, ArrowRight, MousePointerClick, BarChart3, 
  Clock, Shield, AlertCircle, LogOut
} from 'lucide-react';

export default function Dashboard() {
  // ÁLLAPOTOK (Szimuláljuk az adatbázis adatait)
  const [balance, setBalance] = useState(12450.00);
  const [isMining, setIsMining] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  // A "MUNKA" FOLYAMAT (Kattintás logika)
  const handleStartTask = () => {
    if (taskCompleted) return; // Ha már kész ma, ne engedje újra
    
    setIsMining(true);
    let currentProgress = 0;

    // Szimuláljuk a "munkát" (pl. 3 másodpercig tölt)
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsMining(false);
        setTaskCompleted(true);
        // Pénz jóváírása (pl. +$50)
        setBalance(prev => prev + 50.00); 
      }
    }, 100); // Gyorsaság
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] text-slate-200 font-sans selection:bg-violet-500 selection:text-white">
      
      {/* HÁTTÉR */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#1a1638] to-[#0f0c29]"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* --- NAVBAR --- */}
        <nav className="sticky top-0 z-50 bg-[#0f0c29]/90 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-violet-600 p-2 rounded-lg">
                <Hexagon className="text-white fill-white/20" size={20} strokeWidth={2} />
              </div>
              <span className="text-xl font-black tracking-tight text-white">ZENYX<span className="text-violet-400">.WORK</span></span>
            </div>
            
            <div className="flex items-center gap-4">
               {/* Egyenleg Kijelző */}
               <div className="hidden md:flex flex-col items-end mr-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Elérhető Egyenleg</span>
                  <span className={`text-lg font-black transition-all duration-500 ${taskCompleted ? 'text-emerald-400 scale-110' : 'text-white'}`}>
                    $ {balance.toFixed(2)}
                  </span>
               </div>
               <div className="w-9 h-9 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center font-bold text-white text-xs">FS</div>
            </div>
          </div>
        </nav>

        {/* --- FŐ TARTALOM (WORKSTATION) --- */}
        <main className="flex-1 max-w-xl mx-auto w-full p-4 flex flex-col gap-6 mt-4">

          {/* 1. AKTÍV CSOMAG KÁRTYA */}
          <div className="bg-gradient-to-r from-violet-900/50 to-indigo-900/50 border border-violet-500/20 rounded-2xl p-6 relative overflow-hidden">
             <div className="absolute right-0 top-0 p-4 opacity-10">
                <Zap size={120} />
             </div>
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                   <span className="bg-violet-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">Aktív Befektetés</span>
                   <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Aktív</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">VIP Gold Csomag</h2>
                <p className="text-sm text-slate-300 mb-4">Napi hozam: <span className="text-white font-bold">$50.00</span></p>
                
                <div className="w-full bg-black/30 rounded-full h-2 mb-1">
                   <div className="bg-violet-500 h-full rounded-full w-[45%]"></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                   <span>Futamidő: 135 nap</span>
                   <span>Hátralévő: 230 nap</span>
                </div>
             </div>
          </div>

          {/* 2. A NAPI MUNKA (A LÉNYEG!) */}
          <div className="bg-[#15122e] border border-white/5 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden group">
             
             {/* Animált háttér effektus ha megy a munka */}
             {isMining && (
               <div className="absolute inset-0 bg-emerald-500/5 animate-pulse"></div>
             )}

             <h3 className="text-xl font-black text-white mb-2 uppercase tracking-wide">
                {taskCompleted ? "Mai feladat teljesítve! 🎉" : "Napi feladat elérhető"}
             </h3>
             <p className="text-slate-400 text-sm mb-8 max-w-xs mx-auto">
                {taskCompleted 
                  ? "A mai hozam jóváírásra került. Gyere vissza holnap újabb profitért!" 
                  : "Kattints a gombra a rendszer szinkronizálásához és a napi hozam jóváírásához."}
             </p>

             {/* A NAGY GOMB */}
             <div className="relative flex justify-center mb-6">
                {/* Progress Circle (Ha tölt) */}
                {isMining && (
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin"></div>
                   </div>
                )}

                <button 
                  onClick={handleStartTask}
                  disabled={taskCompleted || isMining}
                  className={`
                    w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-[0_0_40px_rgba(124,58,237,0.3)]
                    ${taskCompleted 
                      ? 'bg-slate-800 border-4 border-slate-600 cursor-default opacity-50' 
                      : isMining 
                        ? 'bg-[#0f0c29] scale-95 border-4 border-emerald-500' 
                        : 'bg-gradient-to-b from-violet-600 to-indigo-700 hover:scale-110 border-4 border-white/10 hover:border-white/30 active:scale-95'
                    }
                  `}
                >
                   {taskCompleted ? (
                      <CheckCircle2 size={40} className="text-emerald-500 mb-1" />
                   ) : isMining ? (
                      <span className="text-2xl font-bold text-emerald-400">{progress}%</span>
                   ) : (
                      <>
                        <MousePointerClick size={36} className="text-white mb-1 animate-bounce" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Start</span>
                      </>
                   )}
                </button>
             </div>

             {/* Státusz szöveg */}
             <div className="h-6">
               {isMining && <p className="text-xs text-emerald-400 font-bold animate-pulse">Szinkronizálás folyamatban...</p>}
               {taskCompleted && <p className="text-sm text-slate-400">Következő feladat: <span className="text-white font-mono">23:59:42</span></p>}
             </div>

          </div>

          {/* 3. GYORS STATISZTIKA & KIUTALÁS */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-[#15122e] border border-white/5 p-4 rounded-2xl">
                <div className="bg-blue-500/20 w-8 h-8 rounded-lg flex items-center justify-center mb-2">
                   <Wallet size={16} className="text-blue-400" />
                </div>
                <p className="text-xs text-slate-500 font-bold uppercase">Kiutalható</p>
                <p className="text-lg font-bold text-white">$450.00</p>
                <button className="mt-2 text-[10px] bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded w-full font-bold">Kifizetés</button>
             </div>

             <div className="bg-[#15122e] border border-white/5 p-4 rounded-2xl">
                <div className="bg-amber-500/20 w-8 h-8 rounded-lg flex items-center justify-center mb-2">
                   <Users size={16} className="text-amber-400" />
                </div>
                <p className="text-xs text-slate-500 font-bold uppercase">Csapat</p>
                <p className="text-lg font-bold text-white">14 Fő</p>
                <button className="mt-2 text-[10px] bg-white/5 hover:bg-white/10 text-white border border-white/10 px-3 py-1.5 rounded w-full font-bold">Link Másolása</button>
             </div>
          </div>

          {/* 4. TRANZAKCIÓK LISTA */}
          <div className="mt-2">
             <h3 className="text-sm font-bold text-slate-400 uppercase mb-3 ml-2">Legutóbbi Jóváírások</h3>
             <div className="space-y-2">
                {taskCompleted && (
                  <TransactionItem title="Napi Hozam (VIP Gold)" amount="+$50.00" time="Épp most" type="income" />
                )}
                <TransactionItem title="Referral Jutalék (Lvl 1)" amount="+$12.50" time="2 órája" type="income" />
                <TransactionItem title="Napi Hozam (VIP Gold)" amount="+$50.00" time="Tegnap" type="income" />
                <TransactionItem title="Kifizetés (USDT)" amount="-$200.00" time="3 napja" type="withdraw" />
             </div>
          </div>

        </main>

      </div>
    </div>
  );
}

// --- KISEBB KOMPONENSEK ---

function TransactionItem({ title, amount, time, type }: any) {
   const isIncome = type === 'income';
   return (
      <div className="flex justify-between items-center p-4 bg-[#15122e]/50 border border-white/5 rounded-xl">
         <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isIncome ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
               {isIncome ? <ArrowRight size={14} className="text-emerald-500 -rotate-45" /> : <ArrowRight size={14} className="text-red-500 rotate-45" />}
            </div>
            <div>
               <p className="text-sm font-bold text-white">{title}</p>
               <p className="text-[10px] text-slate-500">{time}</p>
            </div>
         </div>
         <span className={`text-sm font-bold ${isIncome ? 'text-emerald-400' : 'text-white'}`}>{amount}</span>
      </div>
   )
}
