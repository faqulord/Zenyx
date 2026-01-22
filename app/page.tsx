'use client';

import React, { useState, useEffect } from 'react';
import { 
  Zap, Hexagon, Wallet, RefreshCw, CheckCircle2, 
  Lock, ArrowRight, MousePointerClick, BarChart3, 
  Clock, Shield, AlertCircle, LogOut, Users, // JAVÍTVA: Users ikon importálva!
  Cpu, Globe, Activity, Server, Terminal
} from 'lucide-react';

export default function Dashboard() {
  // --- ÁLLAPOTOK ---
  const [balance, setBalance] = useState(12450.00);
  const [isMining, setIsMining] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logLine, setLogLine] = useState("Rendszer készenlétben...");

  // --- A "MUNKA" FOLYAMAT (AD-NETWORK VALIDATION) ---
  const handleStartTask = () => {
    if (taskCompleted) return;
    
    setIsMining(true);
    let currentProgress = 0;
    
    // Tech szövegek, amik futnak a képernyőn
    const logMessages = [
       "Titkosított csatorna megnyitása...",
       "Kapcsolódás a Globális Hirdetési Hálózathoz (US-East)...",
       "Hirdetési csomagok letöltése (Batch #4922)...",
       "Applikáció integritás ellenőrzése...",
       "Forgalom validálása: OK...",
       "Smart Contract aláírása...",
       "Jutalék kalkulálása...",
       "Tranzakció rögzítése a blokkláncon..."
    ];

    const interval = setInterval(() => {
      currentProgress += 2; // Lassabb folyamat, hogy lássa a szövegeket
      setProgress(currentProgress);

      // Üzenetek cserélgetése a folyamat alapján
      const messageIndex = Math.floor((currentProgress / 100) * logMessages.length);
      if (logMessages[messageIndex]) {
         setLogLine(logMessages[messageIndex]);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsMining(false);
        setTaskCompleted(true);
        setLogLine("Folyamat sikeresen befejezve.");
        setBalance(prev => prev + 50.00); 
      }
    }, 150); 
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] text-slate-200 font-sans selection:bg-violet-500 selection:text-white">
      
      {/* HÁTTÉR */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b091e] via-[#161233] to-[#0b091e]"></div>
        {/* Tech rács a háttérben */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* --- NAVBAR --- */}
        <nav className="sticky top-0 z-50 bg-[#0f0c29]/90 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-violet-600 p-2 rounded-lg shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                <Hexagon className="text-white fill-white/20" size={20} strokeWidth={2} />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white leading-none">ZENYX<span className="text-violet-400">.NET</span></span>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest">Ad-Network Node</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="hidden md:flex flex-col items-end mr-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Tárca Egyenleg</span>
                  <span className={`text-lg font-black transition-all duration-500 ${taskCompleted ? 'text-emerald-400 scale-110' : 'text-white'}`}>
                    $ {balance.toFixed(2)}
                  </span>
               </div>
               <div className="w-9 h-9 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center font-bold text-white text-xs relative">
                  FS
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-slate-800 animate-pulse"></div>
               </div>
            </div>
          </div>
        </nav>

        {/* --- FŐ TARTALOM (NODE INTERFACE) --- */}
        <main className="flex-1 max-w-xl mx-auto w-full p-4 flex flex-col gap-6 mt-4">

          {/* 1. STATUS CARD */}
          <div className="bg-[#15122e]/80 border border-violet-500/20 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden">
             <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <Globe size={20} className="text-emerald-400" />
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Hálózati Státusz</p>
                      <p className="text-sm font-bold text-white flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> ONLINE (US-East-4)
                      </p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Aktív Csomag</p>
                   <p className="text-sm font-bold text-violet-400">VIP Gold Node</p>
                </div>
             </div>
          </div>

          {/* 2. A "MUNKA" TERMINÁL (A LÉNYEG!) */}
          <div className="bg-[#0b091e] border border-white/10 rounded-3xl p-1 shadow-2xl relative overflow-hidden group">
             {/* Neon keret effekt */}
             <div className={`absolute inset-0 rounded-3xl opacity-20 transition-opacity duration-500 ${isMining ? 'bg-gradient-to-r from-violet-500 via-emerald-500 to-violet-500 animate-spin-slow opacity-50' : ''}`}></div>
             
             <div className="bg-[#131129] rounded-[22px] p-6 md:p-8 relative z-10">
                
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Cpu size={18} className="text-violet-400" /> 
                      Traffic Validator
                   </h3>
                   <span className={`text-[10px] font-bold px-2 py-1 rounded border ${taskCompleted ? 'bg-slate-800 text-slate-500 border-slate-700' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 animate-pulse'}`}>
                      {taskCompleted ? 'PIHENŐ MÓD' : 'READY TO START'}
                   </span>
                </div>

                {/* VISUALIZER / TERMINAL ABLAK */}
                <div className="bg-black/50 rounded-xl border border-white/5 p-4 mb-8 h-40 flex flex-col justify-end font-mono text-xs overflow-hidden relative">
                   {/* Ha nem fut semmi */}
                   {!isMining && !taskCompleted && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30">
                         <Activity size={48} className="text-white mb-2" />
                         <p>Waiting for manual trigger...</p>
                      </div>
                   )}

                   {/* Ha fut a munka */}
                   {isMining && (
                      <>
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://media.giphy.com/media/u440K02qJ2Hhm/giphy.gif')] opacity-5 bg-cover mix-blend-screen pointer-events-none"></div>
                        <p className="text-slate-500 mb-1">[SYSTEM] Initializing secure protocol...</p>
                        <p className="text-emerald-500/80 mb-1">{`> ${logLine}`}</p>
                        <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse"></span>
                      </>
                   )}

                   {/* Ha kész */}
                   {taskCompleted && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <CheckCircle2 size={48} className="text-emerald-500 mb-2" />
                         <p className="text-emerald-400 font-bold">Validálás Sikeres!</p>
                         <p className="text-slate-400 text-[10px] mt-1">Jutalék: $50.00 jóváírva.</p>
                      </div>
                   )}
                </div>

                {/* GOMBOK */}
                <button 
                  onClick={handleStartTask}
                  disabled={taskCompleted || isMining}
                  className={`
                    w-full py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg
                    ${taskCompleted 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                      : isMining 
                        ? 'bg-slate-800 text-violet-400 border border-violet-500/30' 
                        : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-900/20 hover:scale-[1.02]'
                    }
                  `}
                >
                   {isMining ? (
                      <>
                        <RefreshCw size={18} className="animate-spin" /> FELDOLGOZÁS: {progress}%
                      </>
                   ) : taskCompleted ? (
                      <>
                        <Clock size={18} /> KÖVETKEZŐ BATCH: 23:59:00
                      </>
                   ) : (
                      <>
                        <Server size={18} /> Validálás Indítása
                      </>
                   )}
                </button>
                
                {!taskCompleted && !isMining && (
                   <p className="text-[10px] text-center text-slate-500 mt-4 max-w-xs mx-auto">
                      A gomb megnyomásával hozzájárulsz, hogy az eszközöd részt vegyen a decentralizált hirdetés-ellenőrzési folyamatban.
                   </p>
                )}
             </div>
          </div>

          {/* 3. STATISZTIKA & HÁLÓZAT */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-[#15122e] border border-white/5 p-4 rounded-2xl hover:bg-[#1a1638] transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                   <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                      <Wallet size={18} />
                   </div>
                   <ArrowRight size={14} className="text-slate-600 group-hover:text-white" />
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Kiutalható</p>
                <p className="text-xl font-black text-white">$450.<span className="text-sm text-slate-500">00</span></p>
             </div>

             <div className="bg-[#15122e] border border-white/5 p-4 rounded-2xl hover:bg-[#1a1638] transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                   <div className="bg-amber-500/20 p-2 rounded-lg text-amber-400 group-hover:scale-110 transition-transform">
                      <Users size={18} />
                   </div>
                   <ArrowRight size={14} className="text-slate-600 group-hover:text-white" />
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Network</p>
                <p className="text-xl font-black text-white">14 <span className="text-sm text-slate-500">Node</span></p>
             </div>
          </div>

          {/* 4. ACTIVITY LOG */}
          <div className="mt-2">
             <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-3 ml-2 tracking-widest">Live Network Activity</h3>
             <div className="space-y-2">
                {taskCompleted && (
                  <TransactionItem title="Validálás Jutalék (Batch #4922)" amount="+$50.00" time="Most" type="income" icon={<Server size={14}/>} />
                )}
                <TransactionItem title="Referral Node Jutalék (Lvl 1)" amount="+$12.50" time="14 perce" type="income" icon={<Users size={14}/>} />
                <TransactionItem title="Validálás Jutalék (Batch #4921)" amount="+$50.00" time="Tegnap" type="income" icon={<Server size={14}/>} />
                <TransactionItem title="External Wallet Transfer" amount="-$200.00" time="3 napja" type="withdraw" icon={<LogOut size={14}/>} />
             </div>
          </div>

        </main>
      </div>
    </div>
  );
}

// --- KISEBB KOMPONENSEK ---

function TransactionItem({ title, amount, time, type, icon }: any) {
   const isIncome = type === 'income';
   return (
      <div className="flex justify-between items-center p-3 px-4 bg-[#15122e]/40 border border-white/5 rounded-xl hover:bg-[#15122e] transition-colors">
         <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg ${isIncome ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
               {icon}
            </div>
            <div>
               <p className="text-xs font-bold text-slate-200">{title}</p>
               <p className="text-[10px] text-slate-500">{time}</p>
            </div>
         </div>
         <span className={`text-sm font-bold ${isIncome ? 'text-emerald-400' : 'text-white'}`}>{amount}</span>
      </div>
   )
}
