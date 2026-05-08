'use client';

import React, { useState, useEffect } from 'react';
import { LPP_DATABASE, fuzzySearch } from '@/lib/lpp-database';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { SearchIcon, Database, CheckCircle2, Zap, Download } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(LPP_DATABASE);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults(LPP_DATABASE);
      return;
    }

    const filtered = fuzzySearch(searchQuery);
    setResults(filtered);

    // Sauvegarde recherche récente
    if (filtered.length > 0) {
      setRecentSearches(prev => [
        searchQuery,
        ...prev.filter(q => q !== searchQuery),
      ].slice(0, 5));
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
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
            <Button variant="psad">Connexion</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Recherche intelligente LPPR
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trouvez les produits LPP en un clic. Tarifs, conditions de remboursement, 
            checklists facturation et support MAD intégrés.
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Code LPP, libellé ou mots-clés (ex: lit médicalisé, lève-personne, matelas anti-escarres...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-14 text-lg border-2 border-gray-300 rounded-xl focus:border-psad-blue-600 focus:ring-2 focus:ring-psad-blue-500 focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-psad-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <SearchIcon className="w-6 h-6" />
            </button>
          </div>
        </form>

        {/* Recent Searches */}
        {recentSearches.length > 0 && !searchQuery && (
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-sm text-gray-600 mb-2">Recherches récentes :</p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(search)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:border-psad-blue-600 hover:text-psad-blue-600 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
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

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Résultats pour "${searchQuery}"` : 'Tous les produits'}
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
            <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun résultat</h3>
            <p className="text-gray-600">
              Essayez une autre recherche ou un autre code LPP
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-3">PSAD LPP Manager</h4>
              <p className="text-sm text-gray-600 max-w-sm">
                Plateforme complète de gestion des produits LPP pour PSAD France.
                Conforme LPPR Titre I Chapitre 2, Assurance Maladie.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-gray-900 text-sm mb-2">Ressources</h5>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-psad-blue-600">Documentation</a></li>
                  <li><a href="#" className="hover:text-psad-blue-600">API</a></li>
                  <li><a href="#" className="hover:text-psad-blue-600">Support</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 text-sm mb-2">Légal</h5>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-psad-blue-600">CGU</a></li>
                  <li><a href="#" className="hover:text-psad-blue-600">Confidentialité</a></li>
                  <li><a href="#" className="hover:text-psad-blue-600">RGPD</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>© 2024 PSAD France. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
