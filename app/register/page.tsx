'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LucideWallet, LucideLoader2 } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Sikeres regisztráció -> Irány a Login oldal (amit majd megcsinálunk)
        router.push('/login'); 
      } else {
        setError(data.message || 'Hiba történt.');
      }
    } catch (err) {
      setError('Nem sikerült elérni a szervert.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e17] text-white p-4">
      <div className="w-full max-w-md bg-[#121826] border border-gray-800 rounded-2xl p-8 shadow-xl">
        
        {/* LOGO */}
        <div className="flex justify-center mb-8 gap-3 items-center">
            <div className="bg-blue-600 p-2 rounded-lg">
                <LucideWallet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-wider">ZENYX</h1>
        </div>

        <h2 className="text-center text-gray-400 mb-6 text-sm uppercase tracking-wide">Fiók létrehozása</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 ml-1">FELHASZNÁLÓNÉV</label>
            <input 
              name="username" 
              type="text" 
              required
              className="w-full bg-[#0a0e17] border border-gray-700 rounded-lg p-3 mt-1 text-white focus:border-blue-500 outline-none transition-all"
              placeholder="CryptoKing99"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 ml-1">EMAIL CÍM</label>
            <input 
              name="email" 
              type="email" 
              required
              className="w-full bg-[#0a0e17] border border-gray-700 rounded-lg p-3 mt-1 text-white focus:border-blue-500 outline-none transition-all"
              placeholder="pelda@email.com"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 ml-1">JELSZÓ</label>
            <input 
              name="password" 
              type="password" 
              required
              className="w-full bg-[#0a0e17] border border-gray-700 rounded-lg p-3 mt-1 text-white focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all flex justify-center items-center shadow-lg shadow-blue-900/20"
          >
            {loading ? <LucideLoader2 className="animate-spin w-5 h-5" /> : 'Regisztráció'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Van már fiókod?{' '}
          <Link href="/login" className="text-blue-500 hover:text-blue-400 font-medium ml-1">
            Belépés
          </Link>
        </div>

      </div>
    </div>
  );
}
