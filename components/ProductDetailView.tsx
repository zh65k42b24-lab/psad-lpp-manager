'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LPPProduct } from '@/types/lpp';
import { formatPrice, formatDate } from '@/lib/utils';
import { getProductsByIds } from '@/lib/lpp-database';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  Download,
  MessageSquare,
  Shield,
  Repeat,
  ShoppingCart,
  Calendar,
  Truck,
  Wrench,
  GraduationCap,
  Headphones,
  Sparkles,
  Package2,
  ClipboardCheck,
  ArrowRight,
  ExternalLink,
  Euro,
} from 'lucide-react';
import { BillingChecklist } from './BillingChecklist';
import { MaintenanceBot } from './MaintenanceBot';

interface ProductDetailViewProps {
  product: LPPProduct;
}

const PRESTATION_ICONS = {
  delivery: Truck,
  install: Wrench,
  training: GraduationCap,
  maintenance: Wrench,
  support: Headphones,
  cleaning: Sparkles,
  pickup: Package2,
  verification: ClipboardCheck,
};

const PERIODICITE_LABELS: Record<string, string> = {
  hebdomadaire: 'Hebdomadaire',
  mensuelle: 'Mensuelle',
  trimestrielle: 'Trimestrielle',
  annuelle: 'Annuelle',
  unique: 'Paiement unique',
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [showChecklist, setShowChecklist] = useState(false);
  const [showMaintBot, setShowMaintBot] = useState(false);

  const isLocation = product.modeAcquisition === 'location' || product.modeAcquisition === 'location-achat';
  const isAchat = product.modeAcquisition === 'achat' || product.modeAcquisition === 'location-achat';
  
  const accessoires = getProductsByIds(product.accessoiresIds);

  return (
    <div className="space-y-6">
      {/* ========================================================== */}
      {/* MODE ACQUISITION ULTRA VISIBLE - BANNER COLORÉ EN HAUT     */}
      {/* ========================================================== */}
      <div className={`rounded-xl p-4 shadow-lg border-2 ${
        product.modeAcquisition === 'location' ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-700' :
        product.modeAcquisition === 'achat' ? 'bg-gradient-to-r from-orange-500 to-red-500 border-orange-700' :
        'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-700'
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            {product.modeAcquisition === 'location' && (
              <>
                <div className="bg-white text-green-600 rounded-full p-3">
                  <Repeat className="w-7 h-7" />
                </div>
                <div className="text-white">
                  <div className="text-xs uppercase font-semibold opacity-90">Mode d'acquisition</div>
                  <div className="text-2xl font-bold">LOCATION UNIQUEMENT</div>
                </div>
              </>
            )}
            {product.modeAcquisition === 'achat' && (
              <>
                <div className="bg-white text-orange-600 rounded-full p-3">
                  <ShoppingCart className="w-7 h-7" />
                </div>
                <div className="text-white">
                  <div className="text-xs uppercase font-semibold opacity-90">Mode d'acquisition</div>
                  <div className="text-2xl font-bold">ACHAT UNIQUEMENT</div>
                </div>
              </>
            )}
            {product.modeAcquisition === 'location-achat' && (
              <>
                <div className="bg-white text-purple-600 rounded-full p-3">
                  <Repeat className="w-7 h-7" />
                </div>
                <div className="text-white">
                  <div className="text-xs uppercase font-semibold opacity-90">Mode d'acquisition</div>
                  <div className="text-2xl font-bold">LOCATION OU ACHAT</div>
                </div>
              </>
            )}
          </div>
          <div className="text-white text-right">
            {isLocation && product.tarifLocationMensuel && (
              <div>
                <div className="text-xs opacity-90">Location</div>
                <div className="text-xl font-bold">{formatPrice(product.tarifLocationMensuel)}/mois</div>
              </div>
            )}
            {isAchat && (
              <div>
                <div className="text-xs opacity-90">Achat</div>
                <div className="text-xl font-bold">{formatPrice(product.tarifResponsabilite)}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-psad-blue-600 via-psad-blue-700 to-psad-blue-800 text-white rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Badge className="bg-white/20 text-white border-0">
            Titre {product.titre}.{product.chapitre}
          </Badge>
          <Badge className="bg-white/20 text-white border-0">{product.sousCategorie}</Badge>
        </div>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">{product.libelle}</h1>
        <div className="flex items-center gap-2 text-white/80 mb-4">
          <span className="font-mono text-base md:text-lg">Code LPP : {product.code}</span>
        </div>
        <p className="text-white/90 leading-relaxed text-sm md:text-base">{product.description}</p>
      </div>

      {/* Tarification & Périodicité - 3 cartes critiques */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Tarif détaillé */}
        <Card className="border-2 border-psad-blue-200">
          <CardHeader className="pb-3 bg-blue-50 rounded-t-lg">
            <CardTitle className="text-sm flex items-center gap-2 text-psad-blue-700">
              <Euro className="w-4 h-4" />
              Tarif {isLocation && !isAchat ? 'forfaitaire' : 'responsabilité'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {isLocation && product.tarifLocationMensuel ? (
              <div>
                <div className="text-3xl font-bold text-psad-blue-600 mb-1">
                  {formatPrice(product.tarifLocationMensuel)}
                </div>
                <div className="text-sm text-gray-600">/ mois (location)</div>
                {product.tarifLocationHebdo && (
                  <div className="text-xs text-gray-500 mt-2">
                    Soit {formatPrice(product.tarifLocationHebdo)}/semaine
                  </div>
                )}
                {isAchat && (
                  <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                    Achat possible : {formatPrice(product.tarifResponsabilite)}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="text-3xl font-bold text-psad-blue-600 mb-1">
                  {formatPrice(product.tarifResponsabilite)}
                </div>
                <div className="text-sm text-gray-600">
                  Achat unique
                </div>
              </div>
            )}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Remboursement</span>
                <span className="font-bold text-green-600">{product.tauxRemboursement}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Périodicité */}
        <Card className="border-2 border-amber-200">
          <CardHeader className="pb-3 bg-amber-50 rounded-t-lg">
            <CardTitle className="text-sm flex items-center gap-2 text-amber-700">
              <Calendar className="w-4 h-4" />
              Périodicité facturation
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-amber-700 mb-2">
              {product.periodiciteFactu ? PERIODICITE_LABELS[product.periodiciteFactu] : 'Unique'}
            </div>
            {product.dureeMinimum && (
              <div className="text-xs text-gray-600 mb-1">
                <strong>Durée min :</strong> {product.dureeMinimum}
              </div>
            )}
            {product.dureeMaximum && (
              <div className="text-xs text-gray-600">
                <strong>Durée max :</strong> {product.dureeMaximum}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Conditions */}
        <Card className={`border-2 ${product.requiresPriorAuth ? 'border-red-200' : 'border-green-200'}`}>
          <CardHeader className={`pb-3 rounded-t-lg ${product.requiresPriorAuth ? 'bg-red-50' : 'bg-green-50'}`}>
            <CardTitle className={`text-sm flex items-center gap-2 ${product.requiresPriorAuth ? 'text-red-700' : 'text-green-700'}`}>
              <Shield className="w-4 h-4" />
              Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              {product.requiresPrescription ? (
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
              <span className={product.requiresPrescription ? 'text-amber-900 font-medium' : 'text-gray-600'}>
                {product.requiresPrescription ? 'Ordonnance obligatoire' : 'Sans ordonnance'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {product.requiresPriorAuth ? (
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              )}
              <span className={product.requiresPriorAuth ? 'text-red-900 font-medium' : 'text-gray-600'}>
                {product.requiresPriorAuth ? 'Entente préalable CPAM' : 'Pas d\'entente'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {product.requiresALD ? (
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              )}
              <span className={product.requiresALD ? 'text-amber-900 font-medium' : 'text-gray-600'}>
                {product.requiresALD ? 'ALD obligatoire' : 'Pas de restriction ALD'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CHECKLIST PRESTATIONS INCLUSES */}
      <Card className="border-2 border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <ClipboardCheck className="w-5 h-5" />
            Prestations incluses dans le forfait
          </CardTitle>
          <CardDescription>
            Liste exhaustive de ce qui doit être fourni avec ce dispositif
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-3">
            {product.prestationsIncluses.map(prestation => {
              const Icon = PRESTATION_ICONS[prestation.icone] || CheckCircle2;
              return (
                <div
                  key={prestation.id}
                  className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="bg-green-600 text-white rounded-full p-1.5 flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-gray-900 text-sm">{prestation.label}</span>
                      {prestation.obligatoire && (
                        <Badge className="bg-green-600 text-white text-[10px] px-1.5 py-0">
                          OBLIGATOIRE
                        </Badge>
                      )}
                    </div>
                    {prestation.description && (
                      <p className="text-xs text-gray-600">{prestation.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* FORFAITS ASSOCIÉS */}
      {product.forfaitsAssocies.length > 0 && (
        <Card className="border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center gap-2 text-purple-800">
              📋 Forfaits associés à facturer
            </CardTitle>
            <CardDescription>
              Ces forfaits sont généralement facturés ensemble avec ce dispositif
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            {product.forfaitsAssocies.map(forfait => (
              <Link
                key={forfait.id}
                href={`/products/${forfait.productId}`}
                className="block bg-purple-50 border-2 border-purple-200 rounded-lg p-4 hover:bg-purple-100 hover:border-purple-300 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono text-xs text-purple-700 bg-white px-2 py-0.5 rounded">
                        {forfait.code}
                      </span>
                      {forfait.obligatoire && (
                        <Badge className="bg-red-600 text-white text-[10px]">OBLIGATOIRE</Badge>
                      )}
                      <Badge variant="outline" className="text-[10px] border-purple-300 text-purple-700">
                        {forfait.type}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-700">
                      {forfait.libelle}
                    </h4>
                    <p className="text-sm text-gray-600 italic">
                      <Info className="w-3 h-3 inline mr-1" />
                      {forfait.raison}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 group-hover:translate-x-1 transition-transform mt-2" />
                </div>
                <div className="mt-2 text-xs text-purple-600 font-medium">
                  → Voir la fiche complète
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {/* ACCESSOIRES COMPATIBLES */}
      {accessoires.length > 0 && (
        <Card className="border-2 border-teal-200">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
            <CardTitle className="flex items-center gap-2 text-teal-800">
              <Package2 className="w-5 h-5" />
              Accessoires compatibles
            </CardTitle>
            <CardDescription>
              Accessoires recommandés pour ce dispositif (facturables séparément)
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-3">
              {accessoires.map(accessoire => (
                <Link
                  key={accessoire.id}
                  href={`/products/${accessoire.id}`}
                  className="block bg-teal-50 border-2 border-teal-200 rounded-lg p-4 hover:bg-teal-100 hover:border-teal-300 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-xs text-teal-700 bg-white px-2 py-0.5 rounded inline-block mb-2">
                        {accessoire.code}
                      </span>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm group-hover:text-teal-700">
                        {accessoire.libelle}
                      </h4>
                      <p className="text-sm text-teal-700 font-bold">
                        {formatPrice(accessoire.tarifResponsabilite)}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conditions détaillées */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-psad-blue-600" />
            Conditions détaillées de prise en charge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {product.conditions.map(condition => (
              <div key={condition.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{condition.titre}</h4>
                    <p className="text-sm text-gray-600 mt-1">{condition.description}</p>
                  </div>
                  {condition.obligatoire && (
                    <Badge className="bg-red-100 text-red-700 text-xs whitespace-nowrap">
                      OBLIGATOIRE
                    </Badge>
                  )}
                </div>
                {condition.regulation && (
                  <div className="text-xs text-gray-500 mt-2 font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                    📋 {condition.regulation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métadonnées */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600 text-xs">Date d'entrée en vigueur</span>
              <p className="font-medium text-gray-900">{formatDate(product.dateEntreeVigueur)}</p>
            </div>
            {product.referenceJO && (
              <div>
                <span className="text-gray-600 text-xs">Référence Journal Officiel</span>
                <p className="font-mono text-gray-900 text-xs">{product.referenceJO}</p>
              </div>
            )}
            <div>
              <span className="text-gray-600 text-xs">Statut</span>
              <p className="font-medium text-green-700">✓ Remboursable LPPR</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions principales */}
      <div className="flex flex-col sm:flex-row gap-3 sticky bottom-4 bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
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
          PDF
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
