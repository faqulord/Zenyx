import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Wallet, Users, Settings, Bell, 
  Trophy, LogOut, ArrowUpRight, Flame, Newspaper, 
  Crown, Swords, Search, GraduationCap, CandlestickChart, 
  BookOpen, Gift, ShieldCheck, ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-500 selection:text-white pb-24 md:pb-0">
      
      {/* --- HÁTTÉR EFFEKTEK --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="flex relative z-10">
        
        {/* --- OLDALSÁV (SIDEBAR) --- */}
        <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 border-r border-white/5 bg-[#020617]/80 backdrop-blur-xl">
          <div className="p-6 flex items-center gap-2">
            {/* PLATFORM LOGÓ */}
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center font-black shadow-lg shadow-indigo-500/20 text-white text-xl">Z</div>
            <h1 className="text-2xl font-black tracking-tighter text-white">
              ZENYX<span className="text-indigo-400">.GG</span>
            </h1>
          </div>
          
          <nav className="flex-1 px-4 space-y-2 mt-2">
            <div className="text-[10px] font-bold text-slate-500 uppercase px-4 mb-2 tracking-wider">Főmenü</div>
            <NavItem icon={<LayoutDashboard size={18} />} label="Vezérlőpult" active />
            <NavItem icon={<CandlestickChart size={18} />} label="Kereskedés (Trade)" highlight="HOT" />
            <NavItem icon={<Trophy size={18} />} label="Bajnokságok" />
            
            <div className="text-[10px] font-bold text-slate-500 uppercase px-4 mt-6 mb-2 tracking-wider">Tudás & Tokenek</div>
            <NavItem icon={<GraduationCap size={18} />} label="Zenyx Akadémia" />
            <NavItem icon={<Gift size={18} />} label="Airdrop Központ" />
            <NavItem icon={<Crown size={18} />} label="Ranglista" />

            <div className="text-[10px] font-bold text-slate-500 uppercase px-4 mt-6 mb-2 tracking-wider">Pénzügyek</div>
            <NavItem icon={<Wallet size={18} />} label="Pénztárca" />
            <NavItem icon={<Users size={18} />} label="Referral Program" />
          </nav>

          <div className="p-4 border-t border-white/5">
            <button className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors w-full p-2 rounded-lg hover:bg-white/5">
              <LogOut size={18} />
              <span className="font-medium text-sm">Kijelentkezés</span>
            </button>
          </div>
        </aside>

        {/* --- FŐ TARTALOM --- */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          
          {/* HEADER */}
          <header className="flex justify-between items-center mb-8 gap-4">
            <div className="md:hidden">
               <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center font-black text-white">Z</div>
            </div>

            <div className="hidden md:block">
              <h2 className="text-xl font-bold text-white">Szia, Faqu! 👋</h2>
              <p className="text-sm text-slate-400">Készülj fel a mai kereskedésre.</p>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <div className="hidden md:flex flex-col items-end mr-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                <span className="text-xs text-slate-400">Becsült Egyenleg</span>
                <span className="text-base font-bold text-white">$ 12,450.00</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-indigo-400">
                F
              </div>
            </div>
          </header>

          {/* --- TOP SZEKCIÓ: ZNX TOKEN & STATUS --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* 1. SAJÁT TOKEN KÁRTYA (ZNX COIN) */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-indigo-900/60 to-[#020617] border border-indigo-500/30 backdrop-blur-md relative overflow-hidden group">
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                   <p className="text-indigo-300 font-bold text-sm mb-1">SAJÁT TOKENED</p>
                   <h3 className="text-3xl font-black text-white">5,450 <span className="text-indigo-400">ZNX</span></h3>
                   <p className="text-xs text-slate-400">≈ $5,450.00 USD</p>
                </div>
                {/* --- A COIN LOGÓ --- */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-600 border-4 border-indigo-900/50 shadow-[0_0_20px_rgba(99,102,241,0.5)] flex items-center justify-center relative z-10 animate-pulse-slow">
                   <span className="font-black text-white text-2xl italic">Z</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-indigo-900/20">
                  Staking
                </button>
                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 py-2 rounded-lg font-bold text-sm transition-colors">
                  Eladás
                </button>
              </div>
            </div>

            {/* 2. AIRDROP STATUS */}
            <div className="rounded-3xl p-6 bg-[#0B0E14]/60 border border-white/5 backdrop-blur-md flex flex-col justify-center">
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500">
                     <Gift size={24} />
                  </div>
                  <div>
                     <h4 className="font-bold text-white">Airdrop Státusz</h4>
                     <p className="text-xs text-slate-400">Következő kifizetés: 5 nap</p>
                  </div>
               </div>
               <div className="w-full bg-slate-800 h-2 rounded-full mb-2 overflow-hidden">
                  <div className="bg-amber-500 h-full w-[75%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
               </div>
               <p className="text-right text-xs text-amber-500 font-bold">75% teljesítve</p>
               <button className="mt-4 w-full py-2 border border-amber-500/20 text-amber-500 hover:bg-amber-500/10 rounded-lg text-sm font-bold transition-colors">
                  Feladatok megtekintése
               </button>
            </div>

            {/* 3. TRADING QUICK LINK */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-emerald-900/20 to-[#0B0E14] border border-emerald-500/20 backdrop-blur-md flex flex-col justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
               <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <CandlestickChart className="text-emerald-400" /> Gyors Kereskedés
               </h4>
               <p className="text-sm text-slate-400 mb-4">A piac ma <span className="text-emerald-400 font-bold">BULLISH (+4.2%)</span>. Ne maradj le a mozgásról!</p>
               <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-emerald-900/20">
                  Irány a Tőzsde
               </button>
            </div>

          </div>

          {/* --- ZENYX AKADÉMIA (KEZDŐKNEK) --- */}
          <div className="mb-8">
             <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                   <GraduationCap className="text-cyan-400" /> Zenyx Akadémia <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20 ml-2">KEZDŐKNEK</span>
                </h3>
                <Link href="#" className="text-sm text-indigo-400 hover:text-white">Összes lecke</Link>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AcademyCard 
                  title="Mi az az Airdrop?" 
                  desc="Ingyen pénz? Nem teljesen. Tudd meg, hogyan juthatsz tokenekhez feladatokért cserébe."
                  icon={<Gift size={20} className="text-purple-400" />}
                  color="purple"
                />
                <AcademyCard 
                  title="Hogyan Kereskedj?" 
                  desc="A 'Buy Low, Sell High' titka. Gyertyák, stop-loss és alapfogalmak egyszerűen."
                  icon={<CandlestickChart size={20} className="text-emerald-400" />}
                  color="emerald"
                />
                <AcademyCard 
                  title="Biztonsági Alapok" 
                  desc="Ne hagyd, hogy ellopják a javaidat! 2FA, jelszavak és a hidegtárcák világa."
                  icon={<ShieldCheck size={20} className="text-blue-400" />}
                  color="blue"
                />
             </div>
          </div>

          {/* --- VERSENYEK & HÍREK LISTA --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Bal oldal: Hírek */}
             <div className="lg:col-span-2 rounded-3xl bg-[#0B0E14]/60 border border-white/5 p-6 backdrop-blur-sm">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Newspaper size={18} /> Legfrissebb Hírek</h3>
                <div className="space-y-4">
                   <NewsItem title="Új ZNX Token kibocsátás: Minden amit tudnod kell" date="Ma, 10:00" tag="HIVATALOS" />
                   <NewsItem title="A Bitcoin felezés hatása a piacra" date="Tegnap" tag="ELEMZÉS" />
                   <NewsItem title="Top 5 Airdrop lehetőség februárban" date="2 napja" tag="TIPP" />
                </div>
             </div>

             {/* Jobb oldal: Toplista */}
             <div className="rounded-3xl bg-[#0B0E14]/60 border border-white/5 p-6 backdrop-blur-sm">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Crown size={18} className="text-amber-400" /> Ranglista</h3>
                <div className="space-y-3">
                   <RankItem rank={1} name="CryptoKing" score="150K" />
                   <RankItem rank={2} name="Satoshi" score="142K" />
                   <RankItem rank={3} name="MoonBoy" score="120K" />
                   <RankItem rank={4} name="Faqu" score="98K" isUser />
                </div>
             </div>
          </div>

        </main>
      </div>

      {/* MOBILE NAVBAR */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0B0E14]/90 backdrop-blur-xl border-t border-white/10 p-2 pb-6 flex justify-around z-50">
         <MobileNavItem icon={<LayoutDashboard size={20} />} label="Home" active />
         <MobileNavItem icon={<CandlestickChart size={20} />} label="Trade" />
         <div className="bg-indigo-600 rounded-full p-3 -mt-6 shadow-lg shadow-indigo-600/40 border-4 border-[#020617]">
            <span className="font-black text-white italic">Z</span>
         </div>
         <MobileNavItem icon={<GraduationCap size={20} />} label="Súgó" />
         <MobileNavItem icon={<Wallet size={20} />} label="Tárca" />
      </div>

    </div>
  );
}

// --- KOMPONENSEK ---

function NavItem({ icon, label, active, highlight }: any) {
  return (
    <Link href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${active ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
      <span className={active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-white transition-colors'}>{icon}</span>
      <span className="font-medium text-sm">{label}</span>
      {highlight && <span className="ml-auto text-[10px] font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-0.5 rounded shadow-lg shadow-orange-500/20">{highlight}</span>}
    </Link>
  );
}

function MobileNavItem({ icon, label, active }: any) {
   return (
      <button className={`flex flex-col items-center gap-1 p-2 rounded-lg ${active ? 'text-indigo-400' : 'text-slate-500'}`}>
         {icon}
         <span className="text-[10px] font-medium">{label}</span>
      </button>
   )
}

function AcademyCard({ title, desc, icon, color }: any) {
   const bgColors: any = {
      purple: 'hover:border-purple-500/50 hover:bg-purple-900/10',
      emerald: 'hover:border-emerald-500/50 hover:bg-emerald-900/10',
      blue: 'hover:border-blue-500/50 hover:bg-blue-900/10'
   };
   
   return (
      <div className={`p-5 rounded-2xl bg-[#0B0E14]/40 border border-white/5 cursor-pointer transition-all group ${bgColors[color]}`}>
         <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg bg-white/5 text-white`}>{icon}</div>
            <ArrowRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
         </div>
         <h4 className="font-bold text-white mb-1">{title}</h4>
         <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
      </div>
   )
}

function NewsItem({ title, date, tag }: any) {
   return (
      <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-white/5">
         <div>
            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 mb-1 inline-block">{tag}</span>
            <h4 className="text-sm font-medium text-slate-200">{title}</h4>
         </div>
         <span className="text-xs text-slate-500 whitespace-nowrap ml-4">{date}</span>
      </div>
   )
}

function RankItem({ rank, name, score, isUser }: any) {
   return (
      <div className={`flex items-center justify-between p-3 rounded-xl ${isUser ? 'bg-indigo-600/10 border border-indigo-500/20' : 'hover:bg-white/5'}`}>
         <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${rank === 1 ? 'bg-amber-400 text-black' : 'bg-slate-700 text-white'}`}>
               {rank}
            </div>
            <span className={`text-sm font-medium ${isUser ? 'text-indigo-300' : 'text-slate-300'}`}>{name}</span>
         </div>
         <span className="text-xs font-bold text-emerald-400">{score} XP</span>
      </div>
   )
}
