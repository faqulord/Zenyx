import Link from 'next/link';
import { LucideTrendingUp, LucideAward, LucideZap, LucideUsers, LucideArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0e17] text-white overflow-hidden">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-wider text-blue-500 flex items-center gap-2">
          <LucideZap className="w-6 h-6 text-yellow-400" />
          ZENYX
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="text-gray-300 hover:text-white transition px-4 py-2">
            Belépés
          </Link>
          <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            CSATLAKOZOM
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
            🚀 Play-to-Airdrop Kereskedési Szimulátor
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400">
            Trade Risk-Free.<br />
            <span className="text-blue-500">Earn for Real.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            A kezdők 90%-a elveszíti a pénzét. A ZENYX ezt változtatja meg. 
            Tanulj, versenyezz és szerezz $ZNX tokent kockázat nélkül.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/register" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-lg px-8 py-4 rounded-xl font-bold transition transform hover:scale-105 shadow-xl flex items-center justify-center gap-2">
              Kezdés 10.000 $ Tőkével <LucideArrowRight />
            </Link>
            <a href="#features" className="bg-[#121826] border border-gray-700 hover:border-gray-500 text-white text-lg px-8 py-4 rounded-xl font-medium transition flex items-center justify-center">
              Hogyan működik?
            </a>
          </div>
        </div>
      </section>

      {/* MIÉRT A ZENYX? */}
      <section id="features" className="py-20 px-6 bg-[#0f1421]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">MIÉRT A <span className="text-blue-500">ZENYX?</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Kártya 1 */}
            <div className="bg-[#1a202e] p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition group">
              <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition">
                <LucideTrendingUp className="text-blue-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Szimulált Kereskedés</h3>
              <p className="text-gray-400 text-sm">
                10.000 USD virtuális tőke. Valós idejű árfolyamok (BTC, ETH, SOL). Kockázatmentes tanulás.
              </p>
            </div>

            {/* Kártya 2 */}
            <div className="bg-[#1a202e] p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition group">
              <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600 transition">
                <LucideAward className="text-purple-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Play-to-Airdrop</h3>
              <p className="text-gray-400 text-sm">
                A profitos kereskedésekért és ranglista helyezésért Pontokat kapsz. Ez a "csali", amiért megéri játszani.
              </p>
            </div>

            {/* Kártya 3 */}
            <div className="bg-[#1a202e] p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition group">
              <div className="w-12 h-12 bg-yellow-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-yellow-600 transition">
                <LucideZap className="text-yellow-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">$ZNX Token</h3>
              <p className="text-gray-400 text-sm">
                A megszerzett pontok a jövőbeni Token Generálás (TGE) során valódi kriptovalutára válthatók.
              </p>
            </div>

            {/* Kártya 4 */}
            <div className="bg-[#1a202e] p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition group">
              <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-600 transition">
                <LucideUsers className="text-green-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Közösségi Versenyek</h3>
              <p className="text-gray-400 text-sm">
                Influenszer bajnokságok. A Te követőid mérhetik össze tudásukat más közösségekkel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER PROGRAM */}
      <section className="py-20 px-6 border-t border-gray-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-blue-600/5 blur-[100px]"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">PARTNERI PROGRAM <br /><span className="text-blue-500">INFLUENCEREKNEK</span></h2>
            <p className="text-gray-400 mb-8 text-lg">
              Segíts a követőidnek megtanulni kereskedni anélkül, hogy elveszítenék a fizetésüket. Hálásak lesznek érte.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="min-w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">✓</div>
                <div><strong className="text-white">Tartalomgyártó Eszköz:</strong> Szervezz saját bajnokságokat.</div>
              </li>
              <li className="flex items-start gap-3">
                <div className="min-w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">✓</div>
                <div><strong className="text-white">Revenue Share:</strong> 30% jutalék minden VIP előfizetés után.</div>
              </li>
              <li className="flex items-start gap-3">
                <div className="min-w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">✓</div>
                <div><strong className="text-white">Korai Airdrop Allokáció:</strong> Extra szorzó neked és a top követőidnek.</div>
              </li>
            </ul>

            <button className="mt-8 bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-bold transition">
              Partner Jelentkezés
            </button>
          </div>

          <div className="flex-1 bg-[#121826] p-8 rounded-2xl border border-gray-800 shadow-2xl relative">
            <div className="absolute -top-4 -right-4 bg-yellow-500 text-black font-bold px-4 py-1 rounded-full transform rotate-12">
              Jutalék: 30%
            </div>
            <h3 className="text-gray-500 font-bold text-sm mb-4 tracking-wider">BEVÉTEL SZIMULÁTOR</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <span>100 VIP Felhasználó</span>
                <span className="text-green-400 font-bold font-mono">+ $1,500 / hó</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <span>500 VIP Felhasználó</span>
                <span className="text-green-400 font-bold font-mono">+ $7,500 / hó</span>
              </div>
              <div className="flex justify-between items-center">
                <span>1000 VIP Felhasználó</span>
                <span className="text-green-400 font-bold font-mono text-xl">+ $15,000 / hó</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-20 px-6 bg-[#0a0e17]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">ÜTEMTERV</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <div className="bg-[#121826] p-6 rounded-xl border-l-4 border-blue-500">
                <h3 className="text-blue-500 font-bold mb-2">Q1 - Launch</h3>
                <p className="text-sm text-gray-400">Platform indulása (Web & PWA), Regisztrációk megnyitása.</p>
             </div>
             <div className="bg-[#121826] p-6 rounded-xl border-l-4 border-gray-700 opacity-70">
                <h3 className="text-gray-300 font-bold mb-2">Q2 - Competitions</h3>
                <p className="text-sm text-gray-500">Globális kereskedési versenyek, Ranglisták élesítése.</p>
             </div>
             <div className="bg-[#121826] p-6 rounded-xl border-l-4 border-gray-700 opacity-50">
                <h3 className="text-gray-300 font-bold mb-2">Q3 - Education</h3>
                <p className="text-sm text-gray-500">Prémium oktatóanyagok és AI alapú elemzések.</p>
             </div>
             <div className="bg-[#121826] p-6 rounded-xl border-l-4 border-gray-700 opacity-30">
                <h3 className="text-gray-300 font-bold mb-2">Q4 - TGE & Airdrop</h3>
                <p className="text-sm text-gray-500">A $ZNX token kibocsátása és a pontok beváltása.</p>
             </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-gray-800">
        <p>&copy; 2026 ZENYX Platform. Minden jog fenntartva.</p>
      </footer>

    </main>
  );
}
