'use client';

import React, { useState, useEffect } from 'react';
import { LPP_DATABASE, fuzzySearch } from '@/lib/lpp-database';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Search, Database, CheckCircle2, Zap, LogIn, LogOut, User } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modeFilter, setModeFilter] = useState<'all' | 'location' | 'achat'>('all');
  const [results, setResults] = useState(LPP_DATABASE);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('psad_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  useEffect(() => {
    const filtered = fuzzySearch(searchQuery, modeFilter);
    setResults(filtered);
  }, [searchQuery, modeFilter]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('psad_user');
      setUser(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-psad-blue-600 to-psad-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
                📋
              </div>
              <div>
                <h1 className="text-2xl font-bold text-psad-blue-600">PSAD LPP Manager</h1>
                <p className="text-xs text-gray-600">Gestion LPPR - Titre I Chapitre 2</p>
              </div>
            </div>
            
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                  <User className="w-4 h-4 text-psad-blue-600" />
                  <span className="text-sm font-medium text-psad-blue-700">{user.name}</span>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="psad">
                  <LogIn className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Recherche intelligente LPPR
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trouvez les produits LPP en un clic. Tarifs, conditions de remboursement, 
            checklists facturation et support MAD intégrés.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Code LPP, libellé ou mots-clés..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-psad-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-white shadow-sm"
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-700">Mode :</span>
            <button
              onClick={() => setModeFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                modeFilter === 'all'
                  ? 'bg-psad-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-psad-blue-600'
              }`}
            >
              📋 Tous
            </button>
            <button
              onClick={() => setModeFilter('location')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                modeFilter === 'location'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
              }`}
            >
              🔄 Location
            </button>
            <button
              onClick={() => setModeFilter('achat')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                modeFilter === 'achat'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-600'
              }`}
            >
              🛒 Achat
            </button>
          </div>
        </div>

        {!searchQuery && (
          <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-psad-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Base LPPR complète</h3>
              <p className="text-sm text-gray-600">
                {LPP_DATABASE.length}+ produits avec codes officiels et tarifs à jour
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Checklists interactives</h3>
              <p className="text-sm text-gray-600">
                Validez automatiquement tous les critères de facturation LPPR
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Support MAD 24/7</h3>
              <p className="text-sm text-gray-600">
                Chatbot expert pour maintenance et dépannage
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Résultats pour "${searchQuery}"` : 'Tous les produits'}
            {modeFilter !== 'all' && (
              <span className="text-base font-normal text-gray-600 ml-2">
                · {modeFilter === 'location' ? 'Location' : 'Achat'}
              </span>
            )}
          </h3>
          <p className="text-gray-600">
            {results.length} produit{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun résultat</h3>
            <p className="text-gray-600">
              Essayez une autre recherche ou changez le filtre
            </p>
          </div>
        )}
      </div>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 PSAD France. Tous droits réservés.</p>
            <p className="mt-2">Conforme LPPR Titre I Chapitre 2 · CPAM · RGPD</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
