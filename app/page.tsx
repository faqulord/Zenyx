import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Wallet, Users, Settings, Bell, 
  Trophy, LogOut, ArrowUpRight, BookOpen, Gift, 
  ShieldCheck, ArrowRight, Hexagon, TrendingUp, 
  CreditCard, Lock, CheckCircle2, Search, 
  CandlestickChart, Crown, Flame, Newspaper, 
  ChevronRight, Star
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans pb-24 md:pb-0">
      
      {/* --- FELSŐ SÁV (NAVBAR) --- */}
      <nav className="sticky top-0 z-50 bg-[#1e293b]/90 backdrop-blur-md border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Hexagon className="text-white fill-white" size={24} />
            </div>
            <span className="text-xl font-black tracking-tight text-white">ZENYX<span className="text-indigo-400">.GG</span></span>
          </div>

          {/* DESKTOP MENU (Középen) */}
          <div className="hidden md:flex items-center gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
            <TopNavLink icon={<LayoutDashboard size={18}/>} label="Főoldal" active />
            <TopNavLink icon={<Newspaper size={18}/>} label="Hírek" />
            <TopNavLink icon={<CandlestickChart size={18}/>} label="Tőzsde" />
            <TopNavLink icon={<Trophy size={18}/>} label="Bajnokság" />
            <TopNavLink icon={<BookOpen size={18}/>} label="Akadémia" />
          </div>

          {/* RIGHT SIDE (Profile) */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-bold text-sm items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-amber-500/20">
              <Crown size={16} fill="black" /> VIP Tagság
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center font-bold text-white relative">
              FS
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-800"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- FŐ TARTALOM (GRID SYSTEM) --- */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">

        {/* 1. HERO SZEKCIÓ (Üdvözlés + VIP) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* BAL: Üdvözlés & Statisztika */}
          <div className="md:col-span-2 bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-xl relative overflow-hidden">
             <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
             <div className="relative z-10">
               <h1 className="text-3xl font-bold text-white mb-2">Szia, Faqu! 👋</h1>
               <p className="text-slate-400 mb-6">Íme a mai piaci helyzet és a portfóliód állapota.</p>
               
               <div className="grid grid-cols-3 gap-4">
                 <StatBox label="Egyenleged" value="$12,450" change="+4.2%" color="text-emerald-400" />
                 <StatBox label="Zenyx Pontok" value="8,540 XP" change="+120 ma" color="text-indigo-400" />
                 <StatBox label="Ranglista" value="#142" change="Top 5%" color="text-amber-400" />
               </div>
             </div>
          </div>

          {/* JOBB: PRÉMIUM VIP (Kiemelt) */}
          <div className="bg-gradient-to-br from-amber-900/40 to-slate-900 border border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between relative group overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/20">PRÉMIUM</span>
                <Crown className="text-amber-500 animate-pulse" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Legyél VIP Tag! 🚀</h3>
              <p className="text-sm text-slate-300 mb-4">
                Szerezz 30% jutalékot, 0% kereskedési díjat és exkluzív Airdropokat.
              </p>
            </div>
            <button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition-colors shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2">
              Előfizetés - $29 / hó <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* 2. TARTALOM GRID: HÍREK, AKADÉMIA, RANGLISTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- BAL OSZLOP (8 egység): HÍREK & AKADÉMIA --- */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* HÍREK SZEKCIÓ */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Newspaper className="text-blue-400" /> Friss Hírek & Elemzések
                </h2>
                <Link href="#" className="text-sm text-indigo-400 hover:text-white">Összes hír</Link>
              </div>
              <div className="divide-y divide-slate-700">
                <NewsItem 
                  category="PIACI ELEMZÉS" 
                  title="A Bitcoin áttörte a $42,000 szintet - Mi jön most?" 
                  desc="A technikai elemzők szerint a következő ellenállás $45k-nál található. Olvasd el a részleteket."
                  date="2 órája"
                  imageColor="bg-orange-500"
                />
                <NewsItem 
                  category="PLATFORM UPDATE" 
                  title="Megérkezett az új Referral Rendszer!" 
                  desc="Mostantól minden meghívott barátod után 20% örök jutalékot kapsz. Itt vannak a szabályok."
                  date="5 órája"
                  imageColor="bg-indigo-500"
                />
                <NewsItem 
                  category="AIRDROP" 
                  title="Zenyx Token Airdrop: Indul a 2. fázis" 
                  desc="Készítsd elő a tárcádat, mert holnap indul a snapshot. Ne maradj le az ingyen tokenekről."
                  date="Tegnap"
                  imageColor="bg-emerald-500"
                />
              </div>
            </div>

            {/* AKADÉMIA SZEKCIÓ (Kezdőknek) */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="text-pink-400" /> Tudástár <span className="text-sm font-normal text-slate-500">(Kezdőknek)</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AcademyCard 
                  title="Mi az az Airdrop?" 
                  desc="Ingyen pénz? Majdnem. Ismerd meg a mechanikát." 
                  icon={<Gift size={24} className="text-purple-400"/>} 
                />
                <AcademyCard 
                  title="Hogyan Kereskedj?" 
                  desc="Gyertyák, stop-loss és a profit realizálás alapjai." 
                  icon={<CandlestickChart size={24} className="text-emerald-400"/>} 
                />
                <AcademyCard 
                  title="Biztonság 101" 
                  desc="Így védd meg a tárcádat a hackerektől." 
                  icon={<ShieldCheck size={24} className="text-blue-400"/>} 
                />
                <AcademyCard 
                  title="A Zenyx Token" 
                  desc="Mire jó a platform saját coinja? Utility leírás." 
                  icon={<Hexagon size={24} className="text-indigo-400"/>} 
                />
              </div>
            </div>

          </div>

          {/* --- JOBB OSZLOP (4 egység): RANGLISTA & STATUS --- */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* ÉLŐ STATUS WIDGET */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="text-emerald-400" size={20} /> Piaci Körkép
              </h3>
              <div className="space-y-3">
                <MarketRow coin="Bitcoin" price="$42,150" change="+1.2%" isUp />
                <MarketRow coin="Ethereum" price="$2,240" change="-0.5%" isUp={false} />
                <MarketRow coin="Zenyx Token" price="$1.05" change="+5.2%" isUp highlight />
              </div>
              <button className="w-full mt-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-bold transition-colors">
                Tőzsde Megnyitása
              </button>
            </div>

            {/* RANGLISTA WIDGET */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Trophy className="text-amber-400" size={20} /> Top Kereskedők
                </h3>
                <span className="text-xs text-slate-500">Heti nézet</span>
              </div>
              
              <div className="space-y-4">
                <LeaderRow rank={1} name="CryptoKing" profit="+450%" />
                <LeaderRow rank={2} name="SatoshiFan" profit="+320%" />
                <LeaderRow rank={3} name="WhaleHunter" profit="+210%" />
                <div className="h-px bg-slate-700 my-2"></div>
                <LeaderRow rank={142} name="Faqu (Te)" profit="+12%" isUser />
              </div>

              <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <p className="text-xs text-amber-200 text-center">
                  Lépj be a <strong>Top 100</strong>-ba és nyerj VIP tagságot!
                </p>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 p-2 pb-6 flex justify-around z-50">
         <MobileNavItem icon={<LayoutDashboard size={20} />} label="Főoldal" active />
         <MobileNavItem icon={<Newspaper size={20} />} label="Hírek" />
         <div className="relative -top-5">
            <div className="bg-indigo-600 rounded-full p-4 shadow-lg border-4 border-slate-900">
               <Hexagon className="text-white" size={24} />
            </div>
         </div>
         <MobileNavItem icon={<BookOpen size={20} />} label="Tudás" />
         <MobileNavItem icon={<Settings size={20} />} label="Profil" />
      </div>

    </div>
  );
}

// --- KOMPONENSEK (Hogy tiszta legyen a kód) ---

function TopNavLink({ icon, label, active }: any) {
  return (
    <Link href="#" className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${active ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}>
      {icon}
      <span>{label}</span>
    </Link>
  )
}

function StatBox({ label, value, change, color }: any) {
  return (
    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
      <p className="text-xs text-slate-500 uppercase font-bold mb-1">{label}</p>
      <p className="text-xl md:text-2xl font-black text-white">{value}</p>
      <p className={`text-xs font-bold ${color}`}>{change}</p>
    </div>
  )
}

function NewsItem({ category, title, desc, date, imageColor }: any) {
  return (
    <div className="p-6 hover:bg-slate-700/30 transition-colors cursor-pointer flex gap-4">
      {/* Kép helyőrző */}
      <div className={`w-24 h-24 ${imageColor} rounded-xl flex-shrink-0 hidden sm:flex items-center justify-center opacity-80`}>
        <Newspaper className="text-white/50" size={32} />
      </div>
      
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-bold bg-slate-700 text-slate-300 px-2 py-0.5 rounded uppercase">{category}</span>
          <span className="text-xs text-slate-500 flex items-center gap-1"><Star size={10} /> {date}</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2 leading-tight hover:text-indigo-400 transition-colors">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{desc}</p>
      </div>
    </div>
  )
}

function AcademyCard({ title, desc, icon }: any) {
  return (
    <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl hover:border-indigo-500 transition-all cursor-pointer group">
      <div className="mb-3 p-2 bg-slate-900 w-fit rounded-lg group-hover:scale-110 transition-transform">{icon}</div>
      <h4 className="font-bold text-white mb-1 group-hover:text-indigo-400">{title}</h4>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    </div>
  )
}

function MarketRow({ coin, price, change, isUp, highlight }: any) {
  return (
    <div className={`flex justify-between items-center p-3 rounded-lg ${highlight ? 'bg-indigo-900/20 border border-indigo-500/20' : 'bg-slate-900/50'}`}>
      <span className={`font-bold text-sm ${highlight ? 'text-indigo-300' : 'text-slate-300'}`}>{coin}</span>
      <div className="text-right">
        <div className="text-white font-bold text-sm">{price}</div>
        <div className={`text-xs font-bold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>{change}</div>
      </div>
    </div>
  )
}

function LeaderRow({ rank, name, profit, isUser }: any) {
  return (
    <div className={`flex items-center justify-between p-2 rounded ${isUser ? 'bg-indigo-600/20 border border-indigo-500/30' : ''}`}>
      <div className="flex items-center gap-3">
        <span className={`font-bold w-6 text-center ${rank === 1 ? 'text-amber-400' : 'text-slate-500'}`}>#{rank}</span>
        <span className={`text-sm font-medium ${isUser ? 'text-white' : 'text-slate-300'}`}>{name} {isUser && '(Te)'}</span>
      </div>
      <span className="text-emerald-400 font-bold text-sm">{profit}</span>
    </div>
  )
}

function MobileNavItem({ icon, label, active }: any) {
  return (
     <button className={`flex flex-col items-center gap-1 p-2 rounded-lg ${active ? 'text-indigo-400' : 'text-slate-500'}`}>
        {icon}
        <span className="text-[10px] font-medium">{label}</span>
     </button>
  )
}
