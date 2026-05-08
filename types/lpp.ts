// Types LPP - Produits et Prestations Remboursables

export type LPPTitre = 'I' | 'II' | 'III' | 'IV' | 'V';
export type LPPChapitre = '1' | '2' | '3' | '4' | '5' | '6';
export type RemboursementStatut = 'remboursable' | 'partiellement' | 'sur-prescription' | 'non-remboursable';
export type ModeAcquisition = 'location' | 'achat' | 'location-achat';

export interface LPPProduct {
  id: string;
  code: string;
  libelle: string;
  description: string;
  tarifResponsabilite: number;
  tarifLocationHebdo?: number;
  tarifPatient?: number;
  tauxRemboursement: number;
  modeAcquisition: ModeAcquisition;
  titre: LPPTitre;
  chapitre: LPPChapitre;
  sousCategorie: string;
  remboursementStatut: RemboursementStatut;
  requiresPrescription: boolean;
  requiresPriorAuth: boolean;
  requiresALD: boolean;
  conditions: LPPCondition[];
  prestationsAssociees: string[];
  needsMaintenanceLog: boolean;
  maintenanceCategorie?: 'lit' | 'fauteuil' | 'leve' | 'matelas' | 'autre';
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
