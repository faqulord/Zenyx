import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Wallet, Users, Settings, Bell, 
  Trophy, LogOut, ArrowUpRight, Flame, Newspaper, 
  Crown, Swords, Search, GraduationCap, CandlestickChart, 
  BookOpen, Gift, ShieldCheck, ArrowRight, Hexagon,
  TrendingUp, CreditCard, Lock, ChevronDown, CheckCircle2
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0B0E11] text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 pb-24 md:pb-0">
      
      {/* --- PROFESSZIONÁLIS HÁTTÉR --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="flex relative z-10">
        
        {/* --- PRÉMIUM SIDEBAR --- */}
        <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 border-r border-white/5 bg-[#0B0E11]/95 backdrop-blur-xl z-50">
          
          {/* LOGÓ SZEKCIÓ */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3 text-white">
               <div className="w-10 h-10 relative">
                  <Hexagon className="w-10 h-10 text-indigo-600 fill-indigo-600/20" strokeWidth={1.5} />
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-xs tracking-tighter">ZNX</div>
               </div>
               <div>
                  <h1 className="text-xl font-bold tracking-tight leading-none">ZENYX<span className="text-indigo-500">PRO</span></h1>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Trading Platform</p>
               </div>
            </div>
          </div>
          
          {/* NAVIGÁCIÓ */}
          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
            <MenuSection title="MARKETS & TRADE" />
            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
            <NavItem icon={<CandlestickChart size={18} />} label="Exchange (Spot)" highlight="LIVE" />
            <NavItem icon={<TrendingUp size={18} />} label="Derivatives" />
            
            <MenuSection title="ASSETS & FINANCE" />
            <NavItem icon={<Wallet size={18} />} label="Wallet Overview" />
            <NavItem icon={<CreditCard size={18} />} label="Deposit / Fiat" />
            <NavItem icon={<Gift size={18} />} label="Staking & Earn" highlight="APY 12%" />

            <MenuSection title="ECOSYSTEM" />
            <NavItem icon={<Trophy size={18} />} label="Championships" />
            <NavItem icon={<Users size={18} />} label="Affiliate Program" />
            <NavItem icon={<Crown size={18} />} label="VIP Membership" gold />
            
            <MenuSection title="LEARNING" />
            <NavItem icon={<BookOpen size={18} />} label="Academy" />
          </nav>

          {/* USER PROFILE MINI */}
          <div className="p-4 border-t border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-3">
               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 border border-white/10 flex items-center justify-center text-sm font-bold text-white">FS</div>
               <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">Faqu Style</p>
                  <p className="text-xs text-emerald-400 flex items-center gap-1"><CheckCircle2 size={10} /> Verified</p>
               </div>
               <Settings size={16} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
            </div>
            <button className="flex items-center justify-center gap-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full py-2 rounded-lg text-xs font-bold uppercase tracking-wider">
              <LogOut size={14} /> Kijelentkezés
            </button>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 p-4 md:p-8 max-w-[1600px] mx-auto w-full overflow-hidden">
          
          {/* HEADER BAR */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Portfolio Overview</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                <span>Last login: 2024.01.22 14:30</span>
                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                <span className="text-emerald-500 flex items-center gap-1"><Lock size={12} /> Secure Connection</span>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
               {/* Kereső */}
               <div className="relative flex-1 md:w-64">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder="Search coin, pair or news..." className="w-full bg-[#0B0E11] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none transition-colors" />
               </div>
               
               {/* Értesítés */}
               <button className="relative p-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-slate-400 hover:text-white">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B0E11]"></span>
               </button>
               
               {/* Quick Deposit Button */}
               <button className="hidden md:flex bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-indigo-900/20 items-center gap-2">
                  <Wallet size={16} /> Deposit
               </button>
            </div>
          </header>

          {/* --- HERO GRID: ASSETS & VIP --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            
            {/* 1. PORTFOLIO CARD (Nagy) */}
            <div className="lg:col-span-8 rounded-2xl bg-[#15191E] border border-white/5 p-6 md:p-8 relative overflow-hidden group">
               <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all"></div>
               
               <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 relative z-10">
                  <div>
                     <p className="text-slate-400 font-medium text-sm mb-2 flex items-center gap-2">Estimated Balance <ShieldCheck size={14} className="text-emerald-500"/></p>
                     <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight flex items-baseline gap-2">
                        $ 12,450.<span className="text-2xl text-slate-500">00</span>
                        <span className="text-sm px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md font-bold ml-2 flex items-center">+4.25%</span>
                     </h3>
                     <p className="text-sm text-slate-500 mt-2">≈ 0.2854 BTC</p>
                  </div>
                  <div className="flex gap-3 mt-6 md:mt-0">
                     <ActionButton icon={<ArrowUpRight size={18} />} label="Withdraw" secondary />
                     <ActionButton icon={<ArrowRight size={18} />} label="Transfer" secondary />
                     <ActionButton icon={<CandlestickChart size={18} />} label="Trade Now" primary />
                  </div>
               </div>

               {/* Asset Line */}
               <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-indigo-500 w-[45%]"></div>
                  <div className="h-full bg-purple-500 w-[30%]"></div>
                  <div className="h-full bg-amber-500 w-[15%]"></div>
                  <div className="h-full bg-slate-600 w-[10%]"></div>
               </div>
               <div className="flex gap-6 mt-3 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> BTC 45%</span>
                  <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div> ETH 30%</span>
                  <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div> ZNX 15%</span>
               </div>
            </div>

            {/* 2. VIP / PREMIUM PROMO (Arany) */}
            <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-[#1E1B15] to-[#0F0E0B] border border-amber-500/20 p-6 relative overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-amber-500/40 transition-all">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               <div className="absolute -right-10 -top-10 text-amber-500/10 rotate-12">
                  <Crown size={180} />
               </div>
               
               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                     <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/20 text-xs font-bold tracking-wider">PREMIUM MEMBER</span>
                     <Crown size={24} className="text-amber-500 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Upgrade to VIP</h3>
                  <p className="text-sm text-amber-200/60 leading-relaxed mb-6">
                     Csökkentett kereskedési díjak, magasabb referral jutalék (30%) és exkluzív Airdrop hozzáférés.
                  </p>
               </div>
               
               <button className="relative z-10 w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-black font-bold py-3 rounded-lg shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                  Vásárlás - $29 / hó <ArrowRight size={16} />
               </button>
            </div>
          </div>

          {/* --- CONTENT COLUMNS --- */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* LEFT: MARKET & TOURNAMENTS */}
            <div className="xl:col-span-2 space-y-8">
               
               {/* Live Markets Table */}
               <div className="bg-[#15191E] border border-white/5 rounded-2xl overflow-hidden">
                  <div className="p-5 border-b border-white/5 flex justify-between items-center">
                     <h3 className="font-bold text-white flex items-center gap-2"><TrendingUp size={18} className="text-indigo-500"/> Market Trend</h3>
                     <button className="text-xs text-indigo-400 hover:text-white transition-colors">View All Markets</button>
                  </div>
                  <div>
                     <MarketRow coin="Bitcoin" symbol="BTC" price="42,150.20" change="+1.24%" vol="24B" />
                     <MarketRow coin="Ethereum" symbol="ETH" price="2,240.80" change="-0.45%" vol="12B" isDown />
                     <MarketRow coin="Zenyx Token" symbol="ZNX" price="1.05" change="+5.12%" vol="500K" highlight />
                     <MarketRow coin="Solana" symbol="SOL" price="98.40" change="+2.30%" vol="3B" />
                  </div>
               </div>

               {/* Academy / Learning Section */}
               <div>
                  <div className="flex justify-between items-end mb-4 px-1">
                     <h3 className="font-bold text-lg text-white">Zenyx Academy <span className="text-slate-500 text-sm font-normal ml-2">Master the markets</span></h3>
                     <Link href="#" className="text-sm text-indigo-400 hover:underline">See all courses</Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <CourseCard 
                        title="Crypto Trading Alapjai" 
                        desc="Tanuld meg a gyertyadiagramok olvasását és a technikai elemzés alapjait."
                        level="Beginner"
                        time="45 min"
                        icon={<CandlestickChart className="text-indigo-400" />}
                     />
                     <CourseCard 
                        title="Airdrop Stratégiák" 
                        desc="Hogyan maximalizáld a hozamot likviditás biztosítással és stakinggel."
                        level="Advanced"
                        time="60 min"
                        icon={<Gift className="text-purple-400" />}
                     />
                  </div>
               </div>
            </div>

            {/* RIGHT: SIDEBAR WIDGETS */}
            <div className="space-y-6">
               
               {/* Own Token (ZNX) Widget */}
               <div className="bg-gradient-to-b from-[#1E2329] to-[#15191E] border border-white/5 rounded-2xl p-6 relative">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Hexagon className="text-white fill-white/20" />
                     </div>
                     <div>
                        <h4 className="font-bold text-white text-lg">Zenyx Token</h4>
                        <p className="text-xs text-slate-400">Utility & Governance</p>
                     </div>
                  </div>
                  <div className="flex justify-between items-end mb-4">
                     <div className="text-3xl font-bold text-white">1.05 <span className="text-sm text-slate-500">USDT</span></div>
                     <div className="text-emerald-400 text-sm font-bold bg-emerald-500/10 px-2 py-1 rounded">+5.12%</div>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                     A Zenyx token birtoklása csökkenti a kereskedési díjakat és szavazati jogot biztosít a DAO-ban.
                  </p>
                  <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2 rounded-lg text-sm font-bold transition-colors">
                     Buy ZNX Token
                  </button>
               </div>

               {/* Top Leaderboard Mini */}
               <div className="bg-[#15191E] border border-white/5 rounded-2xl p-5">
                  <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                     <Trophy size={16} className="text-amber-500" /> Top Traders
                  </h3>
                  <div className="space-y-3">
                     <LeaderRow rank="1" name="WhaleHunter" profit="+420%" />
                     <LeaderRow rank="2" name="SatoshiFan" profit="+315%" />
                     <LeaderRow rank="3" name="CryptoNinja" profit="+180%" />
                     <div className="border-t border-white/5 pt-3 mt-2">
                        <LeaderRow rank="142" name="You (Faqu)" profit="+12%" isUser />
                     </div>
                  </div>
               </div>

               {/* Security Warning */}
               <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 items-start">
                  <ShieldCheck size={20} className="text-blue-400 shrink-0 mt-0.5" />
                  <div>
                     <h4 className="font-bold text-blue-100 text-sm">Biztonsági Emlékeztető</h4>
                     <p className="text-xs text-blue-200/60 mt-1">A fiókod biztonsága érdekében aktiváld a 2FA-t (Kétlépcsős azonosítás).</p>
                     <button className="text-xs text-blue-400 font-bold mt-2 hover:underline">Beállítás most</button>
                  </div>
               </div>

            </div>
          </div>

        </main>
      </div>
      
      {/* MOBILE NAV (FIXED BOTTOM) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#15191E]/95 backdrop-blur-xl border-t border-white/10 p-2 pb-6 flex justify-around z-50">
         <MobileNavItem icon={<LayoutDashboard size={20} />} label="Home" active />
         <MobileNavItem icon={<CandlestickChart size={20} />} label="Trade" />
         <div className="relative -top-5">
            <div className="bg-indigo-600 rounded-full p-4 shadow-lg shadow-indigo-600/40 text-white">
               <Hexagon fill="currentColor" size={24} />
            </div>
         </div>
         <MobileNavItem icon={<Wallet size={20} />} label="Wallet" />
         <MobileNavItem icon={<Users size={20} />} label="Profile" />
      </div>

    </div>
  );
}

// --- REUSABLE PRO COMPONENTS ---

function MenuSection({ title }: { title: string }) {
   return <div className="px-4 mt-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</div>
}

function NavItem({ icon, label, active, highlight, gold }: any) {
  const baseClasses = "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group text-sm font-medium mb-1";
  const activeClasses = "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20";
  const inactiveClasses = "text-slate-400 hover:bg-white/5 hover:text-white";
  const goldClasses = "text-amber-400 hover:bg-amber-500/10 hover:text-amber-300";

  return (
    <Link href="#" className={`${baseClasses} ${gold ? goldClasses : active ? activeClasses : inactiveClasses}`}>
      <span className={gold ? "text-amber-500" : active ? "text-indigo-400" : "text-slate-500 group-hover:text-white transition-colors"}>{icon}</span>
      <span>{label}</span>
      {highlight && <span className="ml-auto text-[9px] font-bold bg-indigo-500 text-white px-1.5 py-0.5 rounded shadow-lg shadow-indigo-500/20">{highlight}</span>}
    </Link>
  );
}

function ActionButton({ icon, label, primary, secondary }: any) {
   return (
      <button className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all active:scale-95 ${
         primary ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20' : 
         'bg-[#0B0E11] hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white'
      }`}>
         {icon} {label}
      </button>
   )
}

function MarketRow({ coin, symbol, price, change, vol, isDown, highlight }: any) {
   return (
      <div className={`grid grid-cols-4 items-center p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer ${highlight ? 'bg-indigo-900/10' : ''}`}>
         <div className="flex items-center gap-3 col-span-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${highlight ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
               {symbol[0]}
            </div>
            <div>
               <p className={`font-bold text-sm ${highlight ? 'text-indigo-400' : 'text-white'}`}>{coin}</p>
               <p className="text-xs text-slate-500">{symbol}</p>
            </div>
         </div>
         <div className="text-right text-sm font-medium text-white">$