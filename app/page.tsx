import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Wallet, Users, Settings, Bell, 
  Trophy, ChevronRight, LogOut, ArrowUpRight, 
  Flame, Newspaper, Crown, Swords, Search 
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-500 selection:text-white pb-24 md:pb-0">
      
      {/* --- HÁTTÉR EFFEKTEK (GLOW) --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="flex relative z-10">
        
        {/* --- OLDALSÁV (SIDEBAR) - ITT VANNAK AZ ÚJ MENÜK! --- */}
        <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 border-r border-white/5 bg-[#020617]/80 backdrop-blur-xl">
          <div className="p-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold">Z</div>
            <h1 className="text-2xl font-black tracking-tighter text-white">
              ZENYX<span className="text-indigo-400">.GG</span>
            </h1>
          </div>
          
          <nav className="flex-1 px-4 space-y-2 mt-4">
            <div className="text-xs font-bold text-slate-500 uppercase px-4 mb-2">Platform</div>
            <NavItem icon={<LayoutDashboard size={18} />} label="Vezérlőpult" active />
            <NavItem icon={<Trophy size={18} />} label="Bajnokságok" highlight="LIVE" />
            <NavItem icon={<Crown size={18} />} label="Ranglista" />
            <NavItem icon={<Newspaper size={18} />} label="Hírek & Elemzések" />
            
            <div className="text-xs font-bold text-slate-500 uppercase px-4 mt-6 mb-2">Pénzügyek</div>
            <NavItem icon={<Wallet size={18} />} label="Pénztárca" />
            <NavItem icon={<Users size={18} />} label="Referral Program" />
            
            <div className="text-xs font-bold text-slate-500 uppercase px-4 mt-6 mb-2">Fiók</div>
            <NavItem icon={<Settings size={18} />} label="Beállítások" />
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
            <div className="flex items-center gap-4 md:hidden">
               <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold">Z</div>
            </div>

            {/* Keresősáv */}
            <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 w-96 focus-within:border-indigo-500/50 transition-colors">
              <Search size={18} className="text-slate-500 mr-3" />
              <input type="text" placeholder="Keress versenyeket, játékosokat..." className="bg-transparent outline-none text-sm text-white w-full placeholder:text-slate-600" />
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-xs text-slate-400">Egyenleg</span>
                <span className="text-sm font-bold text-emerald-400">$12,450.00</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold shadow-lg shadow-indigo-500/20 border border-white/10">
                F
              </div>
            </div>
          </header>

          {/* --- KIEMELT: BAJNOKSÁGOK (HERO SECTION) --- */}
          <div className="rounded-3xl p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-8">
            <div className="rounded-[22px] bg-[#0B0E14] p-6 md:p-10 relative overflow-hidden">
               {/* Background Image Effect */}
               <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
               <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-r from-[#0B0E14] via-[#0B0E14]/80 to-transparent"></div>

               <div className="relative z-10 max-w-xl">
                 <div className="flex items-center gap-2 text-indigo-400 font-bold mb-2">
                   <Flame size={18} className="animate-pulse" /> KIEMELT VERSENY
                 </div>
                 <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                   Crypto Trading <br/>Winter Championship
                 </h2>
                 <p className="text-slate-400 mb-6 max-w-md">
                   Nevezz be a téli szezon legnagyobb kereskedési versenyére! A fődíj 10 BTC és exkluzív Zenyx NFT-k.
                 </p>
                 <div className="flex flex-wrap gap-4">
                   <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-lg shadow-white/10">
                     <Swords size={18} /> Nevezés Most
                   </button>
                   <button className="bg-white/5 text-white border border-white/10 px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all">
                     Részletek
                   </button>
                 </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* --- RANGLISTA (LEADERBOARD) --- */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center px-2">
                <h3 className="font-bold text-lg flex items-center gap-2"><Crown size={20} className="text-amber-400"/> Top Játékosok</h3>
                <Link href="#" className="text-sm text-indigo-400 hover:text-white transition-colors">Teljes lista</Link>
              </div>
              
              <div className="rounded-2xl bg-[#0B0E14]/60 border border-white/5 overflow-hidden backdrop-blur-sm">
                <LeaderboardItem rank={1} name="CryptoKing99" points="154,200 XP" prize="$5,000" />
                <LeaderboardItem rank={2} name="SatoshiNakamoto" points="142,500 XP" prize="$2,500" />
                <LeaderboardItem rank={3} name="MoonWalker" points="120,000 XP" prize="$1,000" />
                <LeaderboardItem rank={4} name="Faqu Style" points="98,400 XP" prize="$500" isUser />
                <LeaderboardItem rank={5} name="HodlMaster" points="85,200 XP" prize="$250" />
              </div>

              {/* HÍREK SZEKCIÓ */}
              <div className="flex justify-between items-center px-2 mt-8">
                <h3 className="font-bold text-lg flex items-center gap-2"><Newspaper size={20} className="text-blue-400"/> Friss Hírek</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NewsCard title="A Bitcoin átlépte a $45k határt" category="Piaci Elemzés" time="2 órája" />
                <NewsCard title="Új Referral rendszer a Zenyx-en!" category="Platform Update" time="5 órája" highlight />
              </div>
            </div>

            {/* --- SIDE WIDGETS (JOBB OLDAL) --- */}
            <div className="flex flex-col gap-6">
              
              {/* REFERRAL MINI CARD */}
              <div className="rounded-2xl p-6 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 backdrop-blur-md relative overflow-hidden group">
                 <div className="absolute -right-4 -top-4 bg-indigo-500/20 w-24 h-24 rounded-full blur-xl group-hover:bg-indigo-500/30 transition-all"></div>
                 <h3 className="font-bold text-lg mb-1">Hívj meg barátokat!</h3>
                 <p className="text-indigo-200 text-sm mb-4">Kapj 20% jutalékot minden VIP tag után.</p>
                 <div className="bg-black/30 rounded-lg p-3 mb-4 flex justify-between items-center border border-white/5">
                    <code className="text-sm text-indigo-300">zenyx.gg/faqu</code>
                    <button className="text-xs bg-indigo-500 hover:bg-indigo-400 px-2 py-1 rounded text-white transition-colors">Másolás</button>
                 </div>
                 <button className="w-full py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm transition-colors">Partnerközpont</button>
              </div>

              {/* AKTÍV BAJNOKSÁGOK LISTA */}
              <div className="rounded-2xl bg-[#0B0E14]/60 border border-white/5 p-5 backdrop-blur-sm">
                <h3 className="font-bold mb-4 text-sm uppercase text-slate-400 tracking-wider">Következő Versenyek</h3>
                <div className="space-y-4">
                  <TournamentRow title="Weekly Blitz" date="Ma, 18:00" prize="$500" icon="⚡" />
                  <TournamentRow title="NFT Cup" date="Jan 25" prize="Rare NFT" icon="🎨" />
                  <TournamentRow title="Whale Wars" date="Feb 01" prize="1 BTC" icon="🐋" />
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0B0E14]/90 backdrop-blur-xl border-t border-white/10 p-2 pb-6 flex justify-around z-50">
         <MobileNavItem icon={<LayoutDashboard size={20} />} label="Home" active />
         <MobileNavItem icon={<Trophy size={20} />} label="Verseny" />
         <div className="bg-indigo-600 rounded-full p-3 -mt-6 shadow-lg shadow-indigo-600/40 border-4 border-[#020617]">
            <Crown className="text-white" size={24} />
         </div>
         <MobileNavItem icon={<Newspaper size={20} />} label="Hírek" />
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
      {highlight && <span className="ml-auto text-[10px] font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/20 animate-pulse">{highlight}</span>}
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

function LeaderboardItem({ rank, name, points, prize, isUser }: any) {
  return (
    <div className={`flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${isUser ? 'bg-indigo-900/20 border-l-2 border-l-indigo-500' : ''}`}>
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${rank === 1 ? 'bg-amber-400/20 text-amber-400' : rank === 2 ? 'bg-slate-300/20 text-slate-300' : rank === 3 ? 'bg-orange-400/20 text-orange-400' : 'text-slate-500'}`}>
          #{rank}
        </div>
        <div className="flex flex-col">
          <span className={`font-bold text-sm ${isUser ? 'text-indigo-300' : 'text-white'}`}>{name} {isUser && '(Te)'}</span>
          <span className="text-xs text-slate-500">{points}</span>
        </div>
      </div>
      <div className="text-emerald-400 font-bold text-sm">{prize}</div>
    </div>
  );
}

function NewsCard({ title, category, time, highlight }: any) {
  return (
    <div className={`p-4 rounded-xl border flex flex-col justify-between h-32 hover:scale-[1.02] transition-transform cursor-pointer ${highlight ? 'bg-indigo-900/20 border-indigo-500/20' : 'bg-[#0B0E14]/40 border-white/5'}`}>
      <div className="flex justify-between items-start">
        <span className={`text-[10px] font-bold px-2 py-1 rounded border ${highlight ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-slate-800 text-slate-400 border-white/5'}`}>{category}</span>
        <span className="text-xs text-slate-500">{time}</span>
      </div>
      <h4 className="font-bold text-white line-clamp-2">{title}</h4>
    </div>
  )
}

function TournamentRow({ title, date, prize, icon }: any) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5">
      <div className="text-xl">{icon}</div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-xs text-slate-500">{date}</p>
      </div>
      <div className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
        {prize}
      </div>
    </div>
  )
}
