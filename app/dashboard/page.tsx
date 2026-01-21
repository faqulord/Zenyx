'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LucideLayoutDashboard, 
  LucideTrendingUp, 
  LucideWallet, 
  LucideSettings, 
  LucideLogOut,
  LucideBell,
  LucideUser
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  
  // Itt tároljuk az adatokat (később az adatbázisból jön)
  const [user, setUser] = useState({
    username: 'Betöltés...',
    balance: 10000,
    points: 500,
    tier: 'STANDARD'
  });

  // Kijelentkezés gomb
  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white flex">
      
      {/* 1. BAL OLDALI MENÜ (SIDEBAR) */}
      <aside className="w-64 bg-[#121826] border-r border-gray-800 hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-500 tracking-wider">ZENYX</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <div className="flex items-center gap-3 p-3 bg-blue-600/10 text-blue-400 rounded-lg cursor-pointer">
            <LucideLayoutDashboard size={20} />
            <span className="font-medium">Áttekintés</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-gray-400 hover:bg-gray-800 rounded-lg cursor-pointer transition">
            <LucideTrendingUp size={20} />
            <span className="font-medium">Kereskedés</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-gray-400 hover:bg-gray-800 rounded-lg cursor-pointer transition">
            <LucideWallet size={20} />
            <span className="font-medium">Pénztárca</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-gray-400 hover:bg-gray-800 rounded-lg cursor-pointer transition">
            <LucideSettings size={20} />
            <span className="font-medium">Beállítások</span>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:text-red-300 transition w-full p-2">
            <LucideLogOut size={20} />
            <span>Kijelentkezés</span>
          </button>
        </div>
      </aside>

      {/* 2. FŐ TARTALOM (MAIN CONTENT) */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* FEJLÉC */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Vezérlőpult</h2>
            <p className="text-gray-400 text-sm">Üdvözlünk újra a fedélzeten!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white cursor-pointer">
              <LucideBell size={20} />
            </div>
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <LucideUser size={20} text-white />
            </div>
          </div>
        </header>

        {/* KÁRTYÁK (EGYENLEG) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* FŐ EGYENLEG KÁRTYA */}
          <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/20 border border-blue-500/30 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">DEMO EGYENLEG</h3>
            <div className="text-3xl font-bold text-white mb-1">
              $ {user.balance.toLocaleString()}
            </div>
            <div className="text-green-400 text-sm flex items-center gap-1">
              +0.00% <span className="text-gray-500">(Ma)</span>
            </div>
          </div>

          {/* PONTOK KÁRTYA */}
          <div className="bg-[#121826] border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-gray-400 text-sm font-medium mb-2">AIRDROP PONTOK</h3>
            <div className="text-3xl font-bold text-yellow-500 mb-1">
              {user.points} XP
            </div>
            <div className="text-gray-500 text-sm">Rang: <span className="text-white font-bold">{user.tier}</span></div>
          </div>

          {/* GYORS GOMBOK */}
          <div className="bg-[#121826] border border-gray-800 p-6 rounded-2xl flex flex-col justify-center gap-3">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition">
              Új Kereskedés
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition">
              Egyenleg Feltöltés
            </button>
          </div>
        </div>

        {/* GRAFIKON HELYE (Üres doboz egyelőre) */}
        <div className="bg-[#121826] border border-gray-800 rounded-2xl p-6 h-64 flex items-center justify-center text-gray-500">
          Itt lesz majd a Bitcoin árfolyam grafikon... 📈
        </div>

      </main>
    </div>
  );
}
