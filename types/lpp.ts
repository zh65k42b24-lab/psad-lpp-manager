// Types LPP - Produits et Prestations Remboursables

export type LPPTitre = 'I' | 'II' | 'III' | 'IV' | 'V';
export type LPPChapitre = '1' | '2' | '3' | '4' | '5' | '6';
export type RemboursementStatut = 'remboursable' | 'partiellement' | 'sur-prescription' | 'non-remboursable';

export interface LPPProduct {
  id: string;
  code: string; // Code LPP officiel (ex: "1234567")
  libelle: string; // Libellé officiel
  description: string;
  
  // Tarification
  tarifResponsabilite: number; // €
  tarifPatient?: number; // € si applicable
  tauxRemboursement: number; // 0-100%
  
  // Classification
  titre: LPPTitre;
  chapitre: LPPChapitre;
  sousCategorie: string; // Ex: "Lits médicalisés", "Lève-personnes"
  
  // Conditions de prise en charge
  remboursementStatut: RemboursementStatut;
  requiresPrescription: boolean;
  requiresPriorAuth: boolean; // Entente préalable
  requiresALD: boolean; // Affection Longue Durée
  
  // Conditions spécifiques
  conditions: LPPCondition[];
  prestationsAssociees: string[]; // Prestations facturables ensemble
  
  // Maintenance et matériovigilance
  needsMaintenanceLog: boolean;
  maintenanceCategorie?: 'lit' | 'fauteuil' | 'leve' | 'matelas' | 'autre';
  
  // Métadonnées
  dateEntreeVigueur: Date;
  dateFinValidite?: Date;
  referenceJO?: string; // Référence Journal Officiel
}

export interface LPPCondition {
  id: string;
  titre: string;
  description: string;
  obligatoire: boolean;
  regulation: string; // Référence légale
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
  evidence?: string; // Pièce justificative
}

export interface BillingChecklist {
  id: string;
  productId: string;
  productCode: string;
  userId: string;
  items: ChecklistFacturationItem[];
  status: 'draft' | 'pending' | 'complete' | 'submitted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  rejectionReason?: string;
  notes?: string;
}

export interface MaintenanceLog {
  id: string;
  productId: string;
  date: Date;
  type: 'preventive' | 'curative' | 'inspection';
  description: string;
  issues?: string[];
  nextCheckDate?: Date;
  technician?: string;
}

export interface PatientDossier {
  id: string;
  ssn: string; // Numéro Sécurité Sociale
  nom: string;
  prenom: string;
  dateNaissance: Date;
  prescriber: PresciberInfo;
  ald?: ALDInfo;
  activeProducts: {
    productId: string;
    startDate: Date;
    endDate?: Date;
    prescriptionDate: Date;
  }[];
}

export interface PresciberInfo {
  id: string;
  nom: string;
  specialite: string;
  numeroPE?: string; // Numéro de prescripteur
  contact: string;
}

export interface ALDInfo {
  numero: string;
  libelle: string;
  dateDebut: Date;
  dateFin?: Date;
  taux: number; // 100% ou autre
}

export interface SearchResult {
  product: LPPProduct;
  relevanceScore: number;
  matchFields: string[]; // Code, libelle, description, etc
}

export interface FacturationSession {
  id: string;
  userId: string;
  productId: string;
  patientId: string;
  checklists: BillingChecklist[];
  status: 'draft' | 'ready' | 'submitted' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  totalAmount: number;
  remboursementAmount: number;
  notes?: string;
}

export interface MaintenanceAlert {
  id: string;
  productId: string;
  type: 'overdue' | 'upcoming' | 'critical' | 'recall';
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  dueDateOrOccurred: Date;
  resolved: boolean;
}

// ===== Réponses API =====

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
  timestamp: string;
}

export interface SearchLPPRequest {
  query: string;
  titre?: LPPTitre;
  chapitre?: LPPChapitre;
  remboursableOnly?: boolean;
}

export interface SearchLPPResponse {
  results: SearchResult[];
  total: number;
  pageSize: number;
  hasMore: boolean;
}
