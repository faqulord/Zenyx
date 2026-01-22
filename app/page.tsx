'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Newspaper, TrendingUp, ShieldCheck, Zap, 
  ArrowRight, Hexagon, Percent, Lock, 
  Calendar, CheckCircle2, ChevronRight, PlayCircle,
  LayoutDashboard, Users, Building2, Crown, Layers
} from 'lucide-react';

export default function Dashboard() {
  // Állapot a Staking időtáv kiválasztásához (3, 6, 12 hónap)
  const [stakingPeriod, setStakingPeriod] = useState(12);

  // Adatok a különböző időtávokhoz (Dinamikus változás)
  const stakingData: any = {
    3: { apy: "8.5%", label: "Kezdő", desc: "Rövid távú lekötés, gyors hozam.", color: "text-blue-400" },
    6: { apy: "12.0%", label: "Haladó", desc: "Középtávú befektetés, emelt kamattal.", color: "text-violet-400" },
    12: { apy: "18.5%", label: "Profi", desc: "Maximális hozam a KAMATOS KAMAT erejével!", color: "text-emerald-400" }
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] text-slate-200 font-sans selection:bg-violet-500 selection:text-white">
      
      {/* --- HÁTTÉR EFFEKTEK --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#241d4f] to-[#151030]"></div>
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* --- NAVBAR (MENÜ) --- */}
        <nav className="sticky top-0 z-50 bg-[#0f0c29]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* LOGÓ */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-2.5 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                <Hexagon className="text-white fill-white/20" size={24} strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white leading-none">ZENYX<span className="text-violet-400">.IO</span></h1>
              </div>
            </div>
            
            {/* FŐ MENÜPONTOK */}
            <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
               <NavLink icon={<LayoutDashboard size={16}/>} label="Vezérlőpult" />
               <NavLink icon={<Layers size={16}/>} label="Staking Csomagok" active />
               <NavLink icon={<Users size={16}/>} label="MLM & Partner" />
               <NavLink icon={<Building2 size={16}/>} label="Cégleírás" />
            </div>

            {/* JOBB OLDAL (Profil) */}
            <div className="flex items-center gap-4">
               <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform">
                 <Crown size={14} fill="black" /> VIP Upgrade
               </button>
               <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center font-bold text-white">FS</div>
            </div>
          </div>
        </nav>

        {/* --- HERO: STAKING KALKULÁTOR --- */}
        <header className="py-16 md:py-20 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Bal oldal: Szöveg */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
                <Zap size={14} className="fill-emerald-400" />
                Aktív Hozamfizetés
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1]">
                Fektesd be a tőkédet <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Kamatos Kamattal.</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
                Válaszd ki a számodra megfelelő lekötési időszakot. Minél tovább tartod nálunk a pénzed, annál magasabb kamatszorzót (Multiplier) és bónuszokat kapsz.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-2">
                  Lekötés Indítása <ArrowRight size={20} />
                </button>
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
                  <PlayCircle size={20} /> Cégbemutató
                </button>
              </div>
            </div>

            {/* Jobb oldal: INTERAKTÍV KÁRTYA */}
            <div className="relative">
              {/* Háttér glow */}
              <div className={`absolute inset-0 blur-3xl rounded-full transition-colors duration-500 ${stakingPeriod === 12 ? 'bg-emerald-500/20' : stakingPeriod === 6 ? 'bg-violet-500/20' : 'bg-blue-500/20'}`}></div>
              
              <div className="relative bg-[#1a1638]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                
                {/* IDŐTÁV VÁLASZTÓ GOMBOK */}
                <div className="grid grid-cols-3 gap-2 mb-8 bg-black/20 p-1.5 rounded-xl">
                   <TimeSelector label="3 Hónap" active={stakingPeriod === 3} onClick={() => setStakingPeriod(3)} />
                   <TimeSelector label="6 Hónap" active={stakingPeriod === 6} onClick={() => setStakingPeriod(6)} />
                   <TimeSelector label="12 Hónap" active={stakingPeriod === 12} onClick={() => setStakingPeriod(12)} highlight />
                </div>

                {/* DINAMIKUS ADATOK */}
                <div className="text-center mb-8">
                   <p className={`text-sm font-bold uppercase tracking-widest mb-2 ${stakingData[stakingPeriod].color}`}>
                     {stakingData[stakingPeriod].label} Csomag
                   </p>
                   <div className="text-6xl md:text-7xl font-black text-white mb-2 transition-all duration-300 transform scale-100">
                      {stakingData[stakingPeriod].apy}
                   </div>
                   <p className="text-slate-400 text-sm">Éves Hozam (APY) + Tőkevisszafizetés</p>
                </div>

                {/* MAGYARÁZAT */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-6">
                   <p className="text-sm text-slate-200 text-center leading-relaxed">
                      {stakingData[stakingPeriod].desc}
                   </p>
                </div>

                <div className="space-y-3">
                  <BenefitRow text="Automatikus újrabefektetés (Compound)" active />
                  <BenefitRow text="Azonnali tőkekivonás (Büntetés nélkül)" active={false} />
                  <BenefitRow text="Napi kifizetés a tárcádba" active />
                </div>

              </div>
            </div>
          </div>
        </header>

        {/* --- MLM & PARTNER SZEKCIÓ (Brutál Jutalék) --- */}
        <section className="py-20 bg-[#0b091e] border-t border-white/5">
           <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Építsd a Hálózatod 🚀</h2>
                 <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    A Zenyx kínálja a piac legmagasabb partneri jutalékát. Hívd meg ismerőseidet, és részesülj az ő befektetéseikből 3 mélységig!
                 </p>
              </div>

              {/* A 3 SZINT KÁRTYÁI */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                 {/* Összekötő vonal (csak desktopon) */}
                 <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent -translate-y-1/2 z-0"></div>

                 <MLMCard 
                    level="1. Szint" 
                    percent="20%" 
                    desc="Közvetlen meghívottak után" 
                    color="from-amber-400 to-orange-500"
                    icon={<Users size={32} className="text-white" />} 
                 />
                 <MLMCard 
                    level="2. Szint" 
                    percent="10%" 
                    desc="A meghívottaid barátai után" 
                    color="from-violet-400 to-indigo-500"
                    icon={<Layers size={32} className="text-white" />} 
                 />
                 <MLMCard 
                    level="3. Szint" 
                    percent="5%" 
                    desc="A hálózatod mélyebb szintjeiről" 
                    color="from-blue-400 to-cyan-500"
                    icon={<TrendingUp size={32} className="text-white" />} 
                 />
              </div>

              <div className="mt-12 text-center">
                 <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-8 py-3 rounded-xl font-bold transition-all">
                    Referral Linkem Másolása
                 </button>
              </div>
           </div>
        </section>

        {/* --- HÍREK SZEKCIÓ (A főoldal alja) --- */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Newspaper className="text-violet-400" /> Piaci Hírek
              </h2>
              <Link href="#" className="text-violet-400 font-bold hover:text-white transition-colors flex items-center gap-1">
                Archívum <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <NewsCard 
                  tag="CÉGES HÍR"
                  title="Elindult a 12 hónapos 'Diamond' Staking csomag"
                  date="Ma, 09:00"
                  desc="Mostantól elérhető a legmagasabb, 18.5%-os hozamot biztosító csomagunk korlátozott ideig."
               />
               <NewsCard 
                  tag="PIAC"
                  title="A Bitcoin ETF hatása a hozamokra"
                  date="Tegnap"
                  desc="Elemzőink szerint az intézményi tőke beáramlása stabilizálja a piacot. Mit jelent ez neked?"
               />
               <NewsCard 
                  tag="TIPP"
                  title="Hogyan maximalizáld az MLM jutalékodat?"
                  date="2 napja"
                  desc="Stratégiák, hogyan építs fel egy 100 fős csapatot kevesebb mint egy hónap alatt."
               />
            </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-[#080618] border-t border-white/5 py-12 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
             <Hexagon size={24} className="text-violet-600 fill-violet-600" />
             <span className="text-white font-black text-xl tracking-tight">ZENYX</span>
          </div>
          <p className="text-slate-500 text-sm">&copy; 2026 Zenyx Investment Platform.</p>
        </footer>

      </div>
    </div>
  );
}

// --- KOMPONENSEK ---

function NavLink({ icon, label, active }: any) {
   return (
      <Link href="#" className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${active ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
         {icon}
         <span>{label}</span>
      </Link>
   )
}

function TimeSelector({ label, active, onClick, highlight }: any) {
   return (
      <button 
         onClick={onClick}
         className={`py-3 rounded-lg text-sm font-bold transition-all relative overflow-hidden ${
            active 
            ? 'bg-violet-600 text-white shadow-lg' 
            : 'text-slate-400 hover:bg-white/5 hover:text-white'
         }`}
      >  
         {highlight && !active && <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>}
         {label}
      </button>
   )
}

function BenefitRow({ text, active }: { text: string, active?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`p-1 rounded-full ${active ? 'bg-emerald-500/20' : 'bg-slate-700/50'}`}>
        {active ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Lock size={16} className="text-slate-500" />}
      </div>
      <span className={active ? "text-slate-200 font-medium" : "text-slate-500 decoration-slate-600"}>{text}</span>
    </div>
  )
}

function MLMCard({ level, percent, desc, color, icon }: any) {
   return (
      <div className="relative z-10 bg-[#15122e] border border-white/5 p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 shadow-xl group">
         <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-lg`}>
            {icon}
         </div>
         <h3 className="text-xl font-bold text-white mb-1">{level}</h3>
         <div className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${color} mb-2`}>
            {percent}
         </div>
         <p className="text-slate-400 text-sm">{desc}</p>
      </div>
   )
}

function NewsCard({ tag, title, date, desc }: any) {
  return (
    <div className="bg-[#15122e] border border-white/5 p-6 rounded-2xl hover:border-violet-500/30 transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-bold text-violet-300 bg-violet-500/10 px-2 py-1 rounded uppercase tracking-wide border border-violet-500/20">
          {tag}
        </span>
        <span className="text-xs text-slate-500">{date}</span>
      </div>
      <h4 className="font-bold text-white text-lg mb-3 group-hover:text-violet-400 transition-colors leading-snug">
        {title}
      </h4>
      <p className="text-sm text-slate-400 leading-relaxed">
        {desc}
      </p>
    </div>
  )
}
