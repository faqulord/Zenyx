'use client';

import { useState } from 'react';
import { LucideLayoutDashboard, LucideSave, LucideLoader2, LucideArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    isImportant: false
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Hír sikeresen közzétéve! 📢');
      setFormData({ title: '', content: '', imageUrl: '', isImportant: false }); // Törlés
    } else {
      alert('Hiba történt.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white p-8">
      
      {/* FEJLÉC */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
            <LucideArrowLeft />
          </Link>
          <h1 className="text-3xl font-bold text-blue-500">Hírek Kezelése</h1>
        </div>
        <div className="px-4 py-2 bg-red-900/30 text-red-400 border border-red-900 rounded-full text-sm font-bold">
          ADMIN ZÓNA 🔒
        </div>
      </div>

      {/* SZERKESZTŐ */}
      <div className="max-w-4xl mx-auto bg-[#121826] border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* CÍM */}
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">HÍR CÍME (Headline)</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-black/30 border border-gray-700 rounded-lg p-4 text-white text-lg focus:border-blue-500 outline-none"
              placeholder="Pl: Bitcoin új csúcsot döntött!"
            />
          </div>

          {/* KÉP LINK */}
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">BORÍTÓKÉP URL</label>
            <input 
              type="text" 
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              className="w-full bg-black/30 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
              placeholder="https://..."
            />
            <p className="text-xs text-gray-500 mt-1">Tipp: Másolj be egy kép linket a Google-ből.</p>
          </div>

          {/* TARTALOM */}
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">TARTALOM</label>
            <textarea 
              required
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full bg-black/30 border border-gray-700 rounded-lg p-4 text-white focus:border-blue-500 outline-none"
              placeholder="Írd ide a cikket..."
            />
          </div>

          {/* KAPCSOLÓK */}
          <div className="flex items-center gap-4 p-4 bg-black/20 rounded-lg border border-gray-800">
            <input 
              type="checkbox" 
              id="important"
              checked={formData.isImportant}
              onChange={(e) => setFormData({...formData, isImportant: e.target.checked})}
              className="w-5 h-5 accent-blue-600"
            />
            <label htmlFor="important" className="font-bold cursor-pointer select-none">
              Ez egy KIEMELT hír (Breaking News)? 🔥
            </label>
          </div>

          {/* MENTÉS GOMB */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition flex justify-center items-center gap-2 text-lg shadow-lg shadow-blue-900/20"
          >
            {loading ? <LucideLoader2 className="animate-spin" /> : <><LucideSave /> KÖZZÉTÉTEL</>}
          </button>

        </form>
      </div>
    </div>
  );
}
