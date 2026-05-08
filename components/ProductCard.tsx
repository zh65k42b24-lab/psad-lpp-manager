'use client';

import React from 'react';
import Link from 'next/link';
import { LPPProduct } from '@/types/lpp';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: LPPProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="h-full bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer group">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-xs font-mono text-gray-500 mb-1">Code LPP</div>
              <div className="text-sm font-bold text-psad-blue-600">{product.code}</div>
            </div>
            {product.requiresPriorAuth && (
              <Badge variant="destructive" className="text-xs">
                Entente préalable
              </Badge>
            )}
          </div>

          <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-psad-blue-600 transition-colors">
            {product.libelle}
          </h3>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Catégorie */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              {product.sousCategorie}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Titre {product.titre}.{product.chapitre}
            </Badge>
          </div>

          {/* Prix */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Tarif responsabilité</div>
            <div className="text-xl font-bold text-psad-blue-600">{formatPrice(product.tarifResponsabilite)}</div>
            <div className="text-xs text-gray-600 mt-1">Remboursement : {product.tauxRemboursement}%</div>
          </div>

          {/* Conditions */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {product.requiresPrescription ? (
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-xs text-gray-700">Ordonnance obligatoire</span>
            </div>
            <div className="flex items-center gap-2">
              {product.requiresALD ? (
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-xs text-gray-700">
                {product.requiresALD ? 'Nécessite ALD' : 'Pas de restriction ALD'}
              </span>
            </div>
          </div>

          {/* Button */}
          <Button className="w-full mt-4" variant="psad" size="sm">
            Voir la fiche complète →
          </Button>
        </div>
      </div>
    </Link>
  );
}
