'use client';

import React, { useState, useEffect } from 'react';
import { LPP_DATABASE, fuzzySearch } from '@/lib/lpp-database';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Search, LogIn, LogOut, User, Bed, Armchair, Activity, Package, X, Heart, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type CategoryFilter = 'all' | 'Lits médicalisés' | 'Lève-personnes' | 'Matelas thérapeutiques' | 'Fauteuils releveurs' | 'Accessoires lits' | 'Forfaits prestations';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [modeFilter, setModeFilter] = useState<'all' | 'location' | 'achat'>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
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
    let filtered = fuzzySearch(searchQuery, modeFilter);
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.sousCategorie === categoryFilter);
    }
    
    setResults(filtered);
  }, [searchQuery, modeFilter, categoryFilter]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('psad_user');
      setUser(null);
    }
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setModeFilter('all');
    setCategoryFilter('all');
  };

  const hasActiveFilters = searchQuery || modeFilter !== 'all' || categoryFilter !== 'all';

  const categories: { value: CategoryFilter; label: string; icon: any; color: string }[] = [
    { value: 'all', label: 'Tous', icon: Package, color: 'bg-gray-100 text-gray-700' },
    { value: 'Lits médicalisés', label: 'Lits', icon: Bed, color: 'bg-blue-100 text-blue-700' },
    { value: 'Lève-personnes', label: 'Lève-personnes', icon: Activity, color: 'bg-purple-100 text-purple-700' },
    { value: 'Matelas thérapeutiques', label: 'Matelas', icon: Heart, color: 'bg-pink-100 text-pink-700' },
    { value: 'Fauteuils releveurs', label: 'Fauteuils', icon: Armchair, color: 'bg-amber-100 text-amber-700' },
    { value: 'Accessoires lits', label: 'Accessoires', icon: Package, color: 'bg-teal-100 text-teal-700' },
    { value: 'Forfaits prestations', label: 'Forfaits', icon: ClipboardList, color: 'bg-purple-100 text-purple-700' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-psad-blue-600 to-psad-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
                📋
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-psad-blue-600">PSAD LPP Manager</h1>
                <p className="text-xs text-gray-600 hidden md:block">Gestion LPPR - Titre I Chapitre 2</p>
              </div>
            </Link>
            
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                  <User className="w-4 h-4 text-psad-blue-600" />
                  <span className="text-sm font-medium text-psad-blue-700">{user.name}</span>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Déconnexion</span>
                </Button>
              </div>
            ) : (
              <Button onClick={handleLoginClick} variant="psad">
                <LogIn className="w-4 h-4 mr-2" />
                Connexion
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Recherche intelligente LPPR
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Trouvez les produits LPP en un clic. Tarifs, conditions de remboursement, 
            checklists facturation et support MAD intégrés.
          </p>
        </div>

        {/* Search Box */}
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

        {/* Filtres par catégorie */}
        <div className="max-w-4xl mx-auto mb-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Type de dispositif médical</p>
            <div className="flex items-center justify-start gap-2 flex-wrap">
              {categories.map(cat => {
                const Icon = cat.icon;
                const isActive = categoryFilter === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setCategoryFilter(cat.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-psad-blue-600 text-white shadow-md scale-105'
                        : `${cat.color} hover:scale-105`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filtres mode acquisition */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Mode d'acquisition</p>
            <div className="flex items-center justify-start gap-2 flex-wrap">
              <button
                onClick={() => setModeFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  modeFilter === 'all'
                    ? 'bg-psad-blue-600 text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📋 Tous
              </button>
              <button
                onClick={() => setModeFilter('location')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  modeFilter === 'location'
                    ? 'bg-green-600 text-white shadow-md scale-105'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                🔄 Location
              </button>
              <button
                onClick={() => setModeFilter('achat')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  modeFilter === 'achat'
                    ? 'bg-orange-600 text-white shadow-md scale-105'
                    : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                }`}
              >
                🛒 Achat
              </button>
            </div>
          </div>
        </div>

        {/* Reset filters */}
        {hasActiveFilters && (
          <div className="max-w-4xl mx-auto mb-6 flex justify-center">
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-full text-sm font-medium transition-all"
            >
              <X className="w-4 h-4" />
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Results - direct, sans cards intermédiaires */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Résultats pour "${searchQuery}"` : 'Catalogue LPP'}
            {categoryFilter !== 'all' && (
              <span className="text-base font-normal text-gray-600 ml-2">
                · {categoryFilter}
              </span>
            )}
            {modeFilter !== 'all' && (
              <span className="text-base font-normal text-gray-600 ml-2">
                · {modeFilter === 'location' ? 'Location' : 'Achat'}
              </span>
            )}
          </h3>
          <p className="text-gray-600 text-sm">
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
            <p className="text-gray-600 mb-4">
              Essayez une autre recherche ou changez les filtres
            </p>
            <button
              onClick={resetFilters}
              className="text-psad-blue-600 hover:underline font-medium text-sm"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
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
