'use client';

import React from 'react';
import { X, Calendar, Euro, CheckCircle2, ShoppingBag, Key, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LPPProduct } from '@/types/lpp';

interface Props {
  product: LPPProduct;
  onClose: () => void;
  onOpenAssociated?: (code: string) => void;
}

export function ProductDetailModal({ product, onClose, onOpenAssociated }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-8 py-6 border-b flex items-start justify-between">
          <div>
            <span className="text-xs font-mono text-gray-500">{product.code}</span>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.libelle}</h1>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="p-8 space-y-8 overflow-auto max-h-[calc(92vh-80px)]">
          {/* Modalité + Tarif */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {product.modalite === 'location' ? (
                <>
                  <Key className="w-9 h-9 text-emerald-600" />
                  <div>
                    <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-2xl font-semibold text-sm">LOCATION</span>
                  </div>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-9 h-9 text-amber-600" />
                  <div>
                    <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-2xl font-semibold text-sm">ACHAT</span>
                  </div>
                </>
              )}
            </div>

            <div className="text-right">
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-4xl font-bold text-psad-blue-600">{product.tarifForfaitaire}</span>
                <span className="text-xl text-gray-500">{product.uniteTarif}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500 justify-end">
                <Calendar className="w-4 h-4" />
                {product.periodicite}
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Ce que contient la prestation
            </h3>
            <ul className="grid grid-cols-1 gap-3">
              {product.checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Forfaits souvent associés */}
          {product.forfaitsAssocies && product.forfaitsAssocies.length > 0 && (
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <LinkIcon className="w-5 h-5" />
                Forfaits souvent associés
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.forfaitsAssocies.map((assoc) => (
                  <button
                    key={assoc.code}
                    onClick={() => onOpenAssociated?.(assoc.code)}
                    className="flex-1 min-w-[220px] text-left border border-gray-200 hover:border-psad-blue-300 hover:shadow-md rounded-2xl p-4 transition-all group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-xs text-gray-500">{assoc.code}</span>
                        <p className="font-medium text-gray-900 group-hover:text-psad-blue-600 mt-1">
                          {assoc.libelle}
                        </p>
                      </div>
                      <span className="text-xs bg-gray-100 px-3 py-1 rounded-xl text-gray-600">Voir</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">{assoc.raison}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-8 py-6 border-t flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Fermer</Button>
          <Button variant="psad">Ajouter à la checklist patient</Button>
        </div>
      </div>
    </div>
  );
}
