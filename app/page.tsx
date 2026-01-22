import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Wallet, Users, Settings, Bell, TrendingUp, ChevronRight, LogOut, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* --- OLDALSÁV (SIDEBAR) --- */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col z-50">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            ZENYX
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Áttekintés" active />
          <NavItem icon={<Wallet size={20} />} label="Pénztárca" />
          <NavItem icon={<Users size={20} />} label="Referral" />
          <NavItem icon={<TrendingUp size={20} />} label="Piac" />
          <NavItem icon={<Settings size={20} />} label="Beállítások" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors w-full p-2 rounded-lg hover:bg-slate-800">
            <LogOut size={20} />
            <span>Kijelentkezés</span>
          </button>
        </div>
      </aside>

      {/* --- FŐ TARTALOM (MAIN CONTENT) --- */}
      <main className="md:ml-64 p-4 md:p-8">
        
        {/* FEJLÉC */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Üdvözöllek újra! 👋</h2>
            <p className="text-slate-400">Itt a mai pénzügyi áttekintésed.</p>
          </div>
          <div className="flex gap-4 items-center">
            <button className="p-2 bg-slate-900 rounded-full border border-slate-800 hover:border-indigo-500 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center font-bold">
              F
            </div>
          </div>
        </header>

        {/* STATISZTIKA KÁRTYÁK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Egyenleg" 
            value="$12,450.00" 
            change="+2.5%" 
            icon={<Wallet className="text-indigo-400" />} 
          />
          <StatCard 
            title="Zenyx Pontok" 
            value="850 ZP" 
            change="+120 ma" 
            icon={<TrendingUp className="text-emerald-400" />} 
          />
          <StatCard 
            title="Referral Jutalék" 
            value="$450.00" 
            change="3 új tag" 
            icon={<Users className="text-purple-400" />} 
          />
        </div>

        {/* REKLÁM / CTA BANNER */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden shadow-2xl shadow-indigo-900/20">
          <div className="relative z-10 max-w-lg">
            <h3 className="text-2xl font-bold mb-2">Hívd meg barátaidat és keress pénzt! 🚀</h3>
            <p className="text-indigo-100 mb-6">Minden VIP feliratkozás után 20% jutalékot kapsz azonnal az egyenlegedre.</p>
            <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2">
              Referral Link Másolása <ArrowUpRight size={18} />
            </button>
          </div>
          {/* Háttér dekoráció */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        </div>

        {/* AKTIVITÁS LISTA */}
        <div>
          <h3 className="text-xl font-bold mb-4">Legutóbbi tevékenységek</h3>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <ActivityItem 
              title="Sikeres belépés" 
              date="Ma, 14:30" 
              amount="" 
              status="Kész" 
            />
            <ActivityItem 
              title="Referral jutalék jóváírás" 
              date="Tegnap, 09:15" 
              amount="+$25.00" 
              status="Bevétel" 
              isPositive 
            />
             <ActivityItem 
              title="VIP Előfizetés vásárlás" 
              date="Jan 20, 18:00" 
              amount="-$99.00" 
              status="Kiadás" 
            />
          </div>
        </div>

      </main>
    </div>
  );
}

// --- KISEBB KOMPONENSEK (hogy tiszta legyen a kód) ---

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
      {icon}
      <span className="font-medium">{label}</span>
      {active && <ChevronRight size={16} className="ml-auto opacity-50" />}
    </Link>
  );
}

function StatCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">{value}</h3>
        </div>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded text-xs font-bold">{change}</span>
        <span className="text-slate-500">az elmúlt 24 órában</span>
      </div>
    </div>
  );
}

function ActivityItem({ title, date, amount, status, isPositive }: any) {
  return (
    <div className="p-4 border-b border-slate-800 last:border-0 flex justify-between items-center hover:bg-slate-800/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-2 h-2 rounded-full ${isPositive ? 'bg-emerald-500' : 'bg-slate-500'}`}></div>
        <div>
          <p className="font-medium text-white">{title}</p>
          <p className="text-sm text-slate-500">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold ${isPositive ? 'text-emerald-400' : amount.startsWith('-') ? 'text-red-400' : 'text-white'}`}>{amount}</p>
        <p className="text-xs text-slate-500">{status}</p>
      </div>
    </div>
  );
}
