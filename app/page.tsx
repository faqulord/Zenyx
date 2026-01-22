import React from 'react';
import Link from 'next/link';
import { 
  Newspaper, TrendingUp, ShieldCheck, Zap, 
  ArrowRight, Hexagon, Percent, Lock, 
  Calendar, CheckCircle2, ChevronRight, PlayCircle
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0f0c29] text-slate-200 font-sans selection:bg-violet-500 selection:text-white">
      
      {/* --- HÁTTÉR GRADIENS (LILA-KÉK) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Mély lila-kék átmenet */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"></div>
        {/* Fényfoltok */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* --- NAVBAR (Logó + Egyszerű menü) --- */}
        <nav className="sticky top-0 z-50 bg-[#0f0c29]/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-violet-500/30">
                <Hexagon className="text-white fill-white/20" size={28} strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white leading-none">ZENYX<span className="text-violet-400">.NEWS</span></h1>
                <p className="text-[10px] text-violet-300/80 uppercase tracking-[0.2em] mt-0.5">Crypto Intelligence</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-300">
               <Link href="#" className="hover:text-white transition-colors">Hírek</Link>
               <Link href="#" className="hover:text-white transition-colors">Staking & Hozam</Link>
               <Link href="#" className="hover:text-white transition-colors">Akadémia</Link>
               <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full transition-all border border-white/10">
                 Belépés
               </button>
            </div>
          </div>
        </nav>

        {/* --- HERO SZEKCIÓ: STAKING & PROFIT (A fő üzenet) --- */}
        <header className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Bal oldal: Szöveg */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-wider mb-6">
                <Zap size={14} className="text-yellow-400 fill-yellow-400" />
                Magas Hozamú Befektetés
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                Építsd a vagyonod a <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Kamatos Hozammal.</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
                A hagyományos kereskedés kockázatos. A Zenyx Staking rendszerével a tőkédet 
                munkára foghatod: élvezd az automatikusan újrabefektetett hozamok erejét 
                (Compound Effect) és maximalizáld a passzív jövedelmedet.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-violet-900/40 transition-transform hover:scale-105 flex items-center gap-2">
                  Staking Indítása <ArrowRight size={20} />
                </button>
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center gap-2">
                  <PlayCircle size={20} /> Hogyan működik?
                </button>
              </div>
            </div>

            {/* Jobb oldal: Staking Kártya (Visual) */}
            <div className="relative">
              <div className="absolute inset-0 bg-violet-600/20 blur-3xl rounded-full"></div>
              <div className="relative bg-[#1a1638]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Éves Hozam (APY)</p>
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                      18.5%
                    </div>
                  </div>
                  <div className="bg-violet-500/20 p-3 rounded-xl">
                    <Percent className="text-violet-400" size={32} />
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <BenefitRow text="Automatikus tőke visszaforgatás" />
                  <BenefitRow text="Napi kamatjóváírás" />
                  <BenefitRow text="Bármikor kivehető (No Lock-up)" />
                  <BenefitRow text="Banki szintű biztonság" />
                </div>

                <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Befektetett Tőke:</span>
                    <span className="text-white font-bold">$10,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Várható érték (1 év):</span>
                    <span className="text-emerald-400 font-bold">$11,985</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-700 rounded-full mt-3 overflow-hidden">
                     <div className="h-full w-[65%] bg-gradient-to-r from-violet-500 to-indigo-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* --- HÍRPORTÁL SZEKCIÓ (NEWS GRID) --- */}
        <main className="flex-1 bg-[#0b091e] py-16 px-4 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Newspaper className="text-violet-400" /> Piaci Hírek & Elemzések
              </h2>
              <Link href="#" className="text-violet-400 font-bold hover:text-white transition-colors flex items-center gap-1">
                Összes cikk <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* KIEMELT NAGY HÍR (Featured) */}
              <div className="lg:col-span-7 group cursor-pointer">
                <div className="relative h-[400px] rounded-2xl overflow-hidden mb-4 border border-white/10 shadow-2xl">
                  {/* Placeholder kép helyett színes gradiens */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                  
                  <div className="absolute bottom-0 left-0 p-8 z-20">
                    <span className="bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider mb-3 inline-block">
                      Kiemelt Elemzés
                    </span>
                    <h3 className="text-3xl font-bold text-white leading-tight mb-2 group-hover:text-violet-300 transition-colors">
                      A Bitcoin felezés hatása: Új csúcsok felé tartunk?
                    </h3>
                    <p className="text-slate-300 line-clamp-2">
                      A történelmi adatok alapján a felezés utáni 12 hónapban exponenciális növekedés várható. 
                      Szakértőink megvizsgálták a láncon belüli adatokat.
                    </p>
                  </div>
                </div>
              </div>

              {/* HÍRLISTA (Side List) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <NewsCard 
                  category="Platform Update"
                  date="Ma, 10:00"
                  title="Indul a Zenyx VIP Program: Exkluzív Staking szintek"
                  desc="Magasabb hozamok és csökkentett díjak a VIP tagoknak."
                />
                <NewsCard 
                  category="Piac"
                  date="Tegnap"
                  title="Az Ethereum ETF elfogadása megmozgatta a piacot"
                  desc="Az intézményi befektetők érdeklődése sosem látott magasságokban."
                />
                <NewsCard 
                  category="Oktatás"
                  date="2 napja"
                  title="Hogyan használd ki a Kamatos Kamat erejét?"
                  desc="Útmutató kezdőknek a passzív jövedelem felépítéséhez."
                />
              </div>

            </div>
          </div>
        </main>

        {/* --- EDUKÁCIÓS SÁV --- */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Miért a Staking a legjobb stratégia?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Nem kell folyamatosan a grafikonokat figyelned. A staking olyan, mint egy digitális bankbetét, 
                csak sokkal magasabb hozammal és napi kifizetéssel.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Lock size={32} className="text-violet-400" />}
                title="Biztonságos Letét"
                desc="A tőkédet okosszerződések (Smart Contracts) védik, amelyeket független auditorok ellenőriztek."
              />
              <FeatureCard 
                icon={<TrendingUp size={32} className="text-indigo-400" />}
                title="Kamatos Kamat Hatás"
                desc="A hozamod nem csak a tőkédre, hanem a már megtermelt kamatokra is jár. Ez exponenciális növekedést jelent."
              />
              <FeatureCard 
                icon={<Calendar size={32} className="text-blue-400" />}
                title="Napi Jóváírás"
                desc="Nem kell hónapokat várnod. A rendszer minden nap jóváírja a számládon a megtermelt profitot."
              />
           </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-[#0b091e] border-t border-white/5 py-12 text-center text-slate-500 text-sm">
          <div className="flex justify-center items-center gap-2 mb-4">
             <Hexagon size={20} className="text-violet-600 fill-violet-600" />
             <span className="text-white font-bold text-lg">ZENYX</span>
          </div>
          <p>&copy; 2026 Zenyx Platform. Minden jog fenntartva.</p>
          <p className="mt-2 text-xs">A kriptovaluta befektetés kockázattal jár. Tájékozódj a döntés előtt.</p>
        </footer>

      </div>
    </div>
  );
}

// --- KISEBB KOMPONENSEK ---

function BenefitRow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-emerald-500/20 p-1 rounded-full">
        <CheckCircle2 size={14} className="text-emerald-400" />
      </div>
      <span className="text-slate-300 font-medium">{text}</span>
    </div>
  )
}

function NewsCard({ category, date, title, desc }: any) {
  return (
    <div className="bg-[#15122e] border border-white/5 p-5 rounded-xl hover:border-violet-500/30 transition-all cursor-pointer group h-full">
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-bold text-violet-300 bg-violet-500/10 px-2 py-1 rounded uppercase tracking-wide">
          {category}
        </span>
        <span className="text-xs text-slate-500">{date}</span>
      </div>
      <h4 className="font-bold text-white text-lg mb-2 group-hover:text-violet-300 transition-colors leading-snug">
        {title}
      </h4>
      <p className="text-sm text-slate-400 leading-relaxed">
        {desc}
      </p>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="bg-[#15122e]/50 border border-white/5 p-8 rounded-2xl hover:bg-[#15122e] transition-all hover:-translate-y-1 duration-300">
      <div className="bg-[#1e1b38] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/5">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">
        {desc}
      </p>
    </div>
  )
}
