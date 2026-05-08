'use client';

import React, { useState } from 'react';
import { LPPProduct, ChecklistFacturationItem } from '@/types/lpp';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  AlertCircle,
  Download,
  Save,
  X,
  Paperclip,
  FileText,
} from 'lucide-react';

interface BillingChecklistProps {
  product: LPPProduct;
  onClose: () => void;
}

export function BillingChecklist({ product, onClose }: BillingChecklistProps) {
  const [items, setItems] = useState<ChecklistFacturationItem[]>(
    generateChecklistItems(product)
  );
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const completedCount = items.filter(i => i.checked).length;
  const requiredCount = items.filter(i => i.required).length;
  const completionRate = Math.round((completedCount / items.length) * 100);
  const allRequiredChecked = items.filter(i => i.required).every(i => i.checked);

  const toggleItem = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSubmit = async () => {
    if (!allRequiredChecked) {
      alert('Veuillez cocher tous les éléments obligatoires');
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Envoyer au serveur
      console.log({
        productId: product.id,
        items,
        notes,
        timestamp: new Date(),
      });
      alert('Checklist sauvegardée avec succès');
      onClose();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportPDF = () => {
    // TODO: Générer PDF
    console.log('Export PDF demandé');
  };

  const categories = [
    'prescription',
    'prior-auth',
    'duration',
    'renewal',
    'ald',
    'vigilance',
    'prestations',
  ];

  const categoryLabels: Record<string, string> = {
    prescription: 'Ordonnance médicale',
    'prior-auth': 'Entente préalable',
    duration: 'Durée location',
    renewal: 'Renouvellement',
    ald: 'Statut ALD',
    vigilance: 'Matériovigilance',
    prestations: 'Prestations associées',
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl my-4">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-psad-blue-600 to-psad-blue-700 text-white rounded-t-lg relative pb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-white text-2xl mb-2">
                Checklist Facturation
              </CardTitle>
              <CardDescription className="text-white/80">
                Code LPP {product.code} • {product.libelle}
              </CardDescription>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm font-medium">Progression</span>
              <span className="text-white text-sm font-bold">{completionRate}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="text-white/70 text-xs mt-2">
              {completedCount} / {items.length} tâches complétées
              {requiredCount > 0 && (
                <span>
                  {' '}
                  • {items.filter(i => i.required && i.checked).length} / {requiredCount} obligatoires
                </span>
              )}
            </p>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto space-y-6">
          {/* Warning si items obligatoires manquants */}
          {!allRequiredChecked && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900">Éléments obligatoires manquants</h4>
                <p className="text-sm text-red-800 mt-1">
                  {requiredCount - items.filter(i => i.required && i.checked).length} critères
                  obligatoires restent à cocher pour valider la checklist.
                </p>
              </div>
            </div>
          )}

          {/* Checklist par catégorie */}
          {categories.map(category => {
            const categoryItems = items.filter(i => i.category === category);
            if (categoryItems.length === 0) return null;

            return (
              <div key={category} className="space-y-3">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-psad-blue-600" />
                  {categoryLabels[category]}
                </h3>

                <div className="space-y-2">
                  {categoryItems.map(item => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        id={item.id}
                        checked={item.checked || false}
                        onChange={() => toggleItem(item.id)}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-psad-blue-600 focus:ring-psad-blue-500 cursor-pointer"
                      />
                      <label htmlFor={item.id} className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{item.title}</span>
                          {item.required && (
                            <Badge className="bg-red-100 text-red-700 text-xs">
                              OBLIGATOIRE
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        {item.regulation && (
                          <p className="text-xs text-gray-500 mt-2 font-mono">
                            📋 {item.regulation}
                          </p>
                        )}
                        {item.evidence && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
                            <Paperclip className="w-3 h-3" />
                            Pièce jointe : {item.evidence}
                          </div>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Notes */}
          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Notes additionnelles (optionnel)
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Ajoutez des informations supplémentaires ou des commentaires..."
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-psad-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
        </CardContent>

        {/* Footer Actions */}
        <div className="border-t p-6 bg-gray-50 rounded-b-lg flex gap-3 flex-wrap">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !allRequiredChecked}
            className="flex-1"
            variant="psad"
            size="lg"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Sauvegarde...' : 'Valider & Sauvegarder'}
          </Button>

          <Button
            onClick={handleExportPDF}
            variant="outline"
            size="lg"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter PDF
          </Button>

          <Button
            onClick={onClose}
            variant="ghost"
            size="lg"
          >
            Fermer
          </Button>
        </div>

        {/* Success message */}
        {allRequiredChecked && (
          <div className="mx-6 mt-4 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-900">Checklist complète !</p>
              <p className="text-sm text-green-800">Tous les critères obligatoires sont validés.</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// Générateur de checklist selon le produit
function generateChecklistItems(product: LPPProduct): ChecklistFacturationItem[] {
  const items: ChecklistFacturationItem[] = [];

  // Prescription
  items.push({
    id: 'pres-1',
    category: 'prescription',
    title: 'Ordonnance médicale présente',
    description: 'Ordonnance signée datant de moins de 1 an, identifiant clairement le prescripteur',
    required: product.requiresPrescription,
    regulation: 'Art. L. 165-1 CSS',
  });

  // Entente préalable
  if (product.requiresPriorAuth) {
    items.push({
      id: 'auth-1',
      category: 'prior-auth',
      title: 'Entente préalable CPAM obtenue',
      description: 'Accord écrit de l\'Assurance Maladie reçu avant facturation',
      required: true,
      regulation: 'Article L. 322-4 CSS',
    });
  }

  // Durée location
  items.push({
    id: 'dur-1',
    category: 'duration',
    title: 'Durée minimale de location respectée',
    description: 'Minimum 3 mois de location continue depuis la première fourniture',
    required: true,
    regulation: 'LPPR - Titre II',
  });

  // Renouvellement
  items.push({
    id: 'ren-1',
    category: 'renewal',
    title: 'Nombre de renouvellements valide',
    description: 'Le nombre maximum de renouvellements n\'est pas dépassé',
    required: false,
    regulation: 'LPPR - Conditions renouvellement',
  });

  // ALD
  if (product.requiresALD) {
    items.push({
      id: 'ald-1',
      category: 'ald',
      title: 'Statut ALD confirmé',
      description: 'Patient en ALD avec numéro et diagnostic documenté',
      required: true,
      regulation: 'Articles L. 322-3 et L. 322-4 CSS',
    });
  }

  // Matériovigilance
  if (product.needsMaintenanceLog) {
    items.push({
      id: 'vig-1',
      category: 'vigilance',
      title: 'Matériovigilance à jour',
      description: 'Dernière visite de maintenance ou inspection effectuée',
      required: false,
      regulation: 'Directive matériovigilance',
    });
  }

  // Prestations associées
  if (product.prestationsAssociees.length > 0) {
    items.push({
      id: 'prest-1',
      category: 'prestations',
      title: 'Prestations associées documentées',
      description: `Prestations incluses : ${product.prestationsAssociees.slice(0, 2).join(', ')}...`,
      required: false,
      regulation: 'Facture conjointe autorisée',
    });
  }

  // Documentation générale
  items.push({
    id: 'doc-1',
    category: 'prescription',
    title: 'Facture complète établie',
    description: 'Facture numérotée, datée, avec code LPP, montant HT/TTC, SIRET',
    required: true,
    regulation: 'Article L. 441-3 CCom',
  });

  items.push({
    id: 'doc-2',
    category: 'prescription',
    title: 'Code LPP exact sur facture',
    description: `Code officiel : ${product.code}`,
    required: true,
    regulation: 'LPPR - Nomenclature',
  });

  return items;
}
