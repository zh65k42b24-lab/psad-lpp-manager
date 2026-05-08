// Types LPP - Produits et Prestations Remboursables

export type LPPTitre = 'I' | 'II' | 'III' | 'IV' | 'V';
export type LPPChapitre = '1' | '2' | '3' | '4' | '5' | '6';
export type RemboursementStatut = 'remboursable' | 'partiellement' | 'sur-prescription' | 'non-remboursable';
export type ModeAcquisition = 'location' | 'achat' | 'location-achat';
export type Periodicite = 'hebdomadaire' | 'mensuelle' | 'trimestrielle' | 'unique' | 'annuelle';

export interface PrestationIncluse {
  id: string;
  label: string;
  description?: string;
  obligatoire: boolean;
  icone: 'delivery' | 'install' | 'training' | 'maintenance' | 'support' | 'cleaning' | 'pickup' | 'verification';
}

export interface ForfaitAssocie {
  id: string;
  productId: string; // Référence vers un autre LPPProduct
  code: string;
  libelle: string;
  type: 'installation' | 'maintenance' | 'livraison' | 'reprise' | 'formation' | 'accessoire';
  obligatoire: boolean;
  raison: string; // Pourquoi associé
}

export interface LPPProduct {
  id: string;
  code: string;
  libelle: string;
  description: string;
  
  // Tarification
  tarifResponsabilite: number;
  tarifLocationHebdo?: number;
  tarifLocationMensuel?: number;
  tarifPatient?: number;
  tauxRemboursement: number;
  
  // Mode et périodicité
  modeAcquisition: ModeAcquisition;
  periodiciteFactu?: Periodicite;
  dureeMinimum?: string; // Ex: "3 mois minimum"
  dureeMaximum?: string; // Ex: "Renouvelable max 2 fois"
  
  // Classification
  titre: LPPTitre;
  chapitre: LPPChapitre;
  sousCategorie: string;
  
  // Conditions de prise en charge
  remboursementStatut: RemboursementStatut;
  requiresPrescription: boolean;
  requiresPriorAuth: boolean;
  requiresALD: boolean;
  
  // Conditions spécifiques
  conditions: LPPCondition[];
  
  // Prestations incluses (checklist détaillée)
  prestationsIncluses: PrestationIncluse[];
  
  // Forfaits & accessoires associés
  forfaitsAssocies: ForfaitAssocie[];
  accessoiresIds: string[]; // IDs des accessoires compatibles
  
  // Maintenance et matériovigilance
  needsMaintenanceLog: boolean;
  maintenanceCategorie?: 'lit' | 'fauteuil' | 'leve' | 'matelas' | 'autre';
  
  // Métadonnées
  dateEntreeVigueur: Date;
  dateFinValidite?: Date;
  referenceJO?: string;
}

export interface LPPCondition {
  id: string;
  titre: string;
  description: string;
  obligatoire: boolean;
  regulation: string;
  exemples?: string[];
}

export interface ChecklistFacturationItem {
  id: string;
  category: 'prescription' | 'prior-auth' | 'duration' | 'renewal' | 'ald' | 'vigilance' | 'prestations';
  title: string;
  description: string;
  required: boolean;
  regulation?: string;
  checked?: boolean;
  evidence?: string;
}

export interface SearchResult {
  product: LPPProduct;
  relevanceScore: number;
  matchFields: string[];
}
