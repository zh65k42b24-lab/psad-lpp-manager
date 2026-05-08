'use client';

import React, { useState } from 'react';
import { LPPProduct, ChecklistFacturationItem } from '@/types/lpp';
import { formatPrice, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  Download,
  MessageSquare,
  Paperclip,
  Clock,
  Shield,
  Wrench,
} from 'lucide-react';
import { BillingChecklist } from './BillingChecklist';
import { MaintenanceBot } from './MaintenanceBot';

interface ProductDetailViewProps {
  product: LPPProduct;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [showChecklist, setShowChecklist] = useState(false);
  const [showMaintBot, setShowMaintBot] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Hero */}
      <div className="bg-gradient-to-r from-psad-blue-600 to-psad-blue-700 text-white rounded-lg p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-white/20" variant="secondary">
                Titre {product.titre}.{product.chapitre}
              </Badge>
              <Badge className="bg-white/20">{product.sousCategorie}</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.libelle}</h1>

            <div className="flex items-center gap-2 text-white/80 mb-4">
              <span className="font-mono text-lg">Code : {product.code}</span>
            </div>

            <p className="text-white/90 leading-relaxed">{product.description}</p>
          </div>

          {/* Quick Info Box */}
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 min-w-xs text-right">
            <div className="mb-4">
              <div className="text-sm text-white/70 mb-1">Tarif responsabilité</div>
              <div className="text-3xl font-bold">{formatPrice(product.tarifResponsabilite)}</div>
            </div>
            <div className="mb-4">
              <div className="text-sm text-white/70 mb-1">Taux remboursement</div>
              <div className="text-2xl font-bold">{product.tauxRemboursement}%</div>
            </div>
            <Badge variant="secondary" className="bg-green-500/20 text-green-200 w-full justify-center">
              {product.remboursementStatut === 'remboursable' ? '✓ Remboursable' : '⚠ À vérifier'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Conditions critiques */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Prescription */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Paperclip className="w-5 h-5 text-psad-blue-600" />
              Prescription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              product.requiresPrescription ? 'bg-amber-50 text-amber-900' : 'bg-green-50 text-green-900'
            }`}>
              {product.requiresPrescription ? (
                <>
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Ordonnance obligatoire</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Pas d'ordonnance requise</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Entente Préalable */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-5 h-5 text-psad-blue-600" />
              Entente Préalable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              product.requiresPriorAuth ? 'bg-red-50 text-red-900' : 'bg-green-50 text-green-900'
            }`}>
              {product.requiresPriorAuth ? (
                <>
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Accord CPAM requis</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Pas requise</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ALD */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-5 h-5 text-psad-blue-600" />
              ALD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              product.requiresALD ? 'bg-yellow-50 text-yellow-900' : 'bg-blue-50 text-blue-900'
            }`}>
              {product.requiresALD ? (
                <>
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">ALD obligatoire</span>
                </>
              ) : (
                <>
                  <Info className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Non limitée à ALD</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conditions de prise en charge */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-psad-blue-600" />
            Conditions de prise en charge
          </CardTitle>
          <CardDescription>
            Tous les critères marqués comme obligatoires doivent être satisfaits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {product.conditions.map((condition) => (
              <div key={condition.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{condition.titre}</h4>
                    <p className="text-sm text-gray-600 mt-1">{condition.description}</p>
                  </div>
                  {condition.obligatoire ? (
                    <Badge className="bg-red-100 text-red-700 text-xs whitespace-nowrap">
                      OBLIGATOIRE
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs whitespace-nowrap">
                      Recommandé
                    </Badge>
                  )}
                </div>
                {condition.regulation && (
                  <div className="text-xs text-gray-500 mt-2 font-mono">
                    📋 {condition.regulation}
                  </div>
                )}
                {condition.exemples && (
                  <div className="text-xs text-gray-600 mt-2 pl-6 list-disc">
                    <strong>Exemples :</strong>
                    <ul className="mt-1 space-y-1">
                      {condition.exemples.map((ex, idx) => (
                        <li key={idx}>• {ex}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prestations associées */}
      {product.prestationsAssociees.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Prestations associées facturables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {product.prestationsAssociees.map((prestation, idx) => (
                <div key={idx} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{prestation}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Métadonnées légales */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-base">Informations légales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Date d'entrée en vigueur</span>
              <p className="font-medium text-gray-900">{formatDate(product.dateEntreeVigueur)}</p>
            </div>
            {product.dateFinValidite && (
              <div>
                <span className="text-gray-600">Date de fin validité</span>
                <p className="font-medium text-gray-900">{formatDate(product.dateFinValidite)}</p>
              </div>
            )}
            {product.referenceJO && (
              <div>
                <span className="text-gray-600">Référence Journal Officiel</span>
                <p className="font-mono text-gray-900">{product.referenceJO}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions principales */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => setShowChecklist(true)}
          className="flex-1"
          variant="psad"
          size="lg"
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Checklist Facturation
        </Button>

        <Button
          onClick={() => setShowMaintBot(true)}
          className="flex-1"
          variant="outline"
          size="lg"
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          🤖 Assistance MAD
        </Button>

        <Button variant="ghost" size="lg">
          <Download className="w-5 h-5 mr-2" />
          Télécharger PDF
        </Button>
      </div>

      {/* Modals */}
      {showChecklist && (
        <BillingChecklist
          product={product}
          onClose={() => setShowChecklist(false)}
        />
      )}

      {showMaintBot && (
        <MaintenanceBot
          productCategory={product.maintenanceCategorie}
          onClose={() => setShowMaintBot(false)}
        />
      )}
    </div>
  );
}
