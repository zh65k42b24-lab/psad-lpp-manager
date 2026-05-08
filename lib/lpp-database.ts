import { LPPProduct } from '@/types/lpp';

export const LPP_DATABASE: LPPProduct[] = [
  // ===== LIT MÉDICALISÉ ÉLECTRIQUE (LOCATION) =====
  {
    id: 'lpp-1',
    code: '1234567',
    libelle: 'Lit médicalisé électrique, multipositions, avec éléments de commande à distance',
    description: 'Lit médicalisé hauteur variable avec moteur électrique. Permet les positions assise, Fowler et allongée. Équipé de barrières de sécurité rabattables.',
    tarifResponsabilite: 1245.0,
    tarifLocationHebdo: 15.40,
    tarifLocationMensuel: 66.72,
    tauxRemboursement: 100,
    modeAcquisition: 'location',
    periodiciteFactu: 'mensuelle',
    dureeMinimum: '3 mois minimum',
    dureeMaximum: 'Renouvelable indéfiniment selon besoin médical',
    titre: 'II',
    chapitre: '1',
    sousCategorie: 'Lits médicalisés',
    remboursementStatut: 'remboursable',
    requiresPrescription: true,
    requiresPriorAuth: true,
    requiresALD: false,
    conditions: [
      {
        id: 'cond-1',
        titre: 'Prescription médicale obligatoire',
        description: 'Ordonnance signée par un médecin, datant de moins de 1 an, mentionnant explicitement le besoin du lit médicalisé.',
        obligatoire: true,
        regulation: 'Art. L. 165-1 CSS',
      },
      {
        id: 'cond-2',
        titre: 'Entente préalable CPAM',
        description: 'Accord préalable de l\'Assurance Maladie obligatoire avant toute facturation.',
        obligatoire: true,
        regulation: 'Article L. 322-4 CSS',
      },
      {
        id: 'cond-3',
        titre: 'Visite d\'adaptation du domicile',
        description: 'Vérification de la compatibilité du domicile (espace, électricité, accès).',
        obligatoire: true,
        regulation: 'LPPR Titre II Ch. 1',
      },
    ],
    prestationsIncluses: [
      {
        id: 'p1-1',
        label: 'Livraison à domicile',
        description: 'Transport et acheminement jusqu\'au lieu d\'installation',
        obligatoire: true,
        icone: 'delivery',
      },
      {
        id: 'p1-2',
        label: 'Installation et mise en service',
        description: 'Montage complet par technicien qualifié',
        obligatoire: true,
        icone: 'install',
      },
      {
        id: 'p1-3',
        label: 'Démonstration et formation',
        description: 'Formation du patient et des aidants à l\'utilisation',
        obligatoire: true,
        icone: 'training',
      },
      {
        id: 'p1-4',
        label: 'Maintenance préventive mensuelle',
        description: 'Visite mensuelle de vérification et entretien',
        obligatoire: true,
        icone: 'maintenance',
      },
      {
        id: 'p1-5',
        label: 'Support téléphonique 24/7',
        description: 'Assistance téléphonique en cas de problème',
        obligatoire: true,
        icone: 'support',
      },
      {
        id: 'p1-6',
        label: 'Désinfection avant livraison',
        description: 'Nettoyage et désinfection complète selon normes CLIN',
        obligatoire: true,
        icone: 'cleaning',
      },
      {
        id: 'p1-7',
        label: 'Reprise et désinstallation',
        description: 'Récupération du matériel en fin de location',
        obligatoire: true,
        icone: 'pickup',
      },
    ],
    forfaitsAssocies: [
      {
        id: 'fa-1-1',
        productId: 'lpp-6',
        code: '1102842',
        libelle: 'Forfait installation lit médicalisé',
        type: 'installation',
        obligatoire: true,
        raison: 'Installation initiale obligatoire à la première mise en service',
      },
      {
        id: 'fa-1-2',
        productId: 'lpp-7',
        code: '1102843',
        libelle: 'Forfait reprise et désinstallation',
        type: 'reprise',
        obligatoire: true,
        raison: 'Récupération obligatoire en fin de location',
      },
    ],
    accessoiresIds: ['lpp-5', 'lpp-8'],
    needsMaintenanceLog: true,
    maintenanceCategorie: 'lit',
    dateEntreeVigueur: new Date('2023-01-01'),
    referenceJO: 'JORF 2023-01-15',
  },

  // ===== LÈVE-PERSONNE =====
  {
    id: 'lpp-2',
    code: '7654321',
    libelle: 'Lève-personne mobile avec sling, charge maximum 200 kg',
    description: 'Dispositif de levage motorisé pour transfert sécurisé des patients. Châssis mobile, sling intégré.',
    tarifResponsabilite: 3500.0,
    tarifLocationHebdo: 45.00,
    tarifLocationMensuel: 195.00,
    tauxRemboursement: 100,
    modeAcquisition: 'location-achat',
    periodiciteFactu: 'mensuelle',
    dureeMinimum: '1 mois minimum',
    dureeMaximum: 'Selon prescription médicale',
    titre: 'II',
    chapitre: '2',
    sousCategorie: 'Lève-personnes',
    remboursementStatut: 'remboursable',
    requiresPrescription: true,
    requiresPriorAuth: true,
    requiresALD: false,
    conditions: [
      {
        id: 'cond-5',
        titre: 'Prescription médicale détaillée',
        description: 'Prescription mentionnant le risque de chute ou la perte de mobilité.',
        obligatoire: true,
        regulation: 'Art. L. 165-1 CSS',
      },
      {
        id: 'cond-6',
        titre: 'Formation obligatoire des aidants',
        description: 'Formation pratique des aidants à l\'utilisation sécurisée.',
        obligatoire: true,
        regulation: 'Directive fabricant + recommandation HAS',
      },
    ],
    prestationsIncluses: [
      {
        id: 'p2-1',
        label: 'Livraison et installation',
        obligatoire: true,
        icone: 'delivery',
      },
      {
        id: 'p2-2',
        label: 'Formation aidants (2h minimum)',
        description: 'Formation pratique avec essais',
        obligatoire: true,
        icone: 'training',
      },
      {
        id: 'p2-3',
        label: 'Vérification annuelle obligatoire',
        description: 'Contrôle de sécurité par technicien certifié',
        obligatoire: true,
        icone: 'verification',
      },
      {
        id: 'p2-4',
        label: 'Maintenance semestrielle',
        obligatoire: true,
        icone: 'maintenance',
      },
      {
        id: 'p2-5',
        label: 'Support technique 24/7',
        obligatoire: true,
        icone: 'support',
      },
    ],
    forfaitsAssocies: [
      {
        id: 'fa-2-1',
        productId: 'lpp-9',
        code: '1102844',
        libelle: 'Forfait formation aidants lève-personne',
        type: 'formation',
        obligatoire: true,
        raison: 'Formation obligatoire avant utilisation',
      },
      {
        id: 'fa-2-2',
        productId: 'lpp-10',
        code: '1102845',
        libelle: 'Forfait vérification annuelle',
        type: 'maintenance',
        obligatoire: true,
        raison: 'Vérification de sécurité annuelle obligatoire',
      },
    ],
    accessoiresIds: ['lpp-11'],
    needsMaintenanceLog: true,
    maintenanceCategorie: 'leve',
    dateEntreeVigueur: new Date('2022-06-01'),
  },

  // ===== MATELAS ANTI-ESCARRES =====
  {
    id: 'lpp-3',
    code: '4567890',
    libelle: 'Matelas dynamique à air alternant pour prévention escarres, classe 2',
    description: 'Matelas anti-escarres à cellules d\'air alternées. Classe 2 (risque moyen). Poids patient 60-150 kg.',
    tarifResponsabilite: 1800.0,
    tarifLocationHebdo: 22.00,
    tarifLocationMensuel: 95.30,
    tauxRemboursement: 100,
    modeAcquisition: 'location',
    periodiciteFactu: 'mensuelle',
    dureeMinimum: 'Pas de minimum',
    dureeMaximum: 'Selon prescription',
    titre: 'II',
    chapitre: '3',
    sousCategorie: 'Matelas thérapeutiques',
    remboursementStatut: 'remboursable',
    requiresPrescription: true,
    requiresPriorAuth: false,
    requiresALD: true,
    conditions: [
      {
        id: 'cond-7',
        titre: 'Diagnostic d\'escarres ou risque élevé',
        description: 'Patient en ALD ou avec diagnostic d\'escarre, score Braden ≤ 16',
        obligatoire: true,
        regulation: 'LPPR Titre II Ch. 3',
      },
    ],
    prestationsIncluses: [
      {
        id: 'p3-1',
        label: 'Livraison et installation',
        obligatoire: true,
        icone: 'delivery',
      },
      {
        id: 'p3-2',
        label: 'Configuration et mise en service',
        description: 'Réglage selon poids et besoins du patient',
        obligatoire: true,
        icone: 'install',
      },
      {
        id: 'p3-3',
        label: 'Maintenance mensuelle',
        obligatoire: true,
        icone: 'maintenance',
      },
      {
        id: 'p3-4',
        label: 'Désinfection avant livraison',
        obligatoire: true,
        icone: 'cleaning',
      },
      {
        id: 'p3-5',
        label: 'Reprise en fin de location',
        obligatoire: true,
        icone: 'pickup',
      },
    ],
    forfaitsAssocies: [
      {
        id: 'fa-3-1',
        productId: 'lpp-6',
        code: '1102842',
        libelle: 'Forfait installation matelas',
        type: 'installation',
        obligatoire: true,
        raison: 'Installation et configuration initiales',
      },
    ],
    accessoiresIds: [],
    needsMaintenanceLog: true,
    maintenanceCategorie: 'matelas',
    dateEntreeVigueur: new Date('2023-03-15'),
  },

  // ===== FAUTEUIL RELEVEUR (ACHAT) =====
  {
    id: 'lpp-4',
    code: '9876543',
    libelle: 'Fauteuil releveur électrique, moteur double, structure renforcée',
    description: 'Fauteuil motorisé avec repose-pieds électrique. Système dual-moteur. Housse polyuréthane lavable.',
    tarifResponsabilite: 2100.0,
    tauxRemboursement: 100,
    modeAcquisition: 'achat',
    periodiciteFactu: 'unique',
    titre: 'II',
    chapitre: '2',
    sousCategorie: 'Fauteuils releveurs',
    remboursementStatut: 'remboursable',
    requiresPrescription: true,
    requiresPriorAuth: true,
    requiresALD: false,
    conditions: [
      {
        id: 'cond-9',
        titre: 'Limitation de mobilité confirmée',
        description: 'Patient avec limitation de mobilité confirmée médicalement',
        obligatoire: true,
        regulation: 'Prescription médicale',
      },
    ],
    prestationsIncluses: [
      {
        id: 'p4-1',
        label: 'Livraison à domicile',
        obligatoire: true,
        icone: 'delivery',
      },
      {
        id: 'p4-2',
        label: 'Installation et assemblage',
        obligatoire: true,
        icone: 'install',
      },
      {
        id: 'p4-3',
        label: 'Formation à l\'utilisation',
        description: 'Démonstration de toutes les fonctions',
        obligatoire: true,
        icone: 'training',
      },
      {
        id: 'p4-4',
        label: 'Garantie 2 ans pièces et main d\'œuvre',
        obligatoire: true,
        icone: 'verification',
      },
    ],
    forfaitsAssocies: [
      {
        id: 'fa-4-1',
        productId: 'lpp-6',
        code: '1102842',
        libelle: 'Forfait installation fauteuil',
        type: 'installation',
        obligatoire: true,
        raison: 'Installation et formation initiales',
      },
    ],
    accessoiresIds: [],
    needsMaintenanceLog: true,
    maintenanceCategorie: 'fauteuil',
    dateEntreeVigueur: new Date('2023-05-01'),
  },

  // ===== ACCESSOIRE LIT - BARRIÈRE =====
  {
    id: 'lpp-5',
    code: '1122334',
    libelle: 'Barrière de sécurité rabattable pour lit médicalisé',
    description: 'Barrière de sécurité pour prévention des chutes. Rabattable pour accès facile.',
    tarifResponsabilite: 245.0,
    tauxRemboursement: 100,
    modeAcquisition: 'achat',
    periodiciteFactu: 'unique',
    titre: 'II',
    chapitre: '1',
    sousCategorie: 'Accessoires lits',
    remboursementStatut: 'remboursable',
    requiresPrescription: false,
    requiresPriorAuth: false,
    requiresALD: false,
    conditions: [
      {
        id: 'cond-11',
        titre: 'Usage conjoint',
        description: 'Utilisé avec un lit médicalisé remboursable',
        obligatoire: true,
        regulation: 'LPPR',
      },
    ],
    prestationsIncluses: [
      {
        id: 'p5-1',
        label: 'Livraison',
        obligatoire: true,
        icone: 'delivery',
      },
      {
        id: 'p5-2',
        label: 'Installation sur le lit',
        obligatoire: true,
        icone: 'install',
      },
    ],
    forfaitsAssocies: [],
    accessoiresIds: [],
    needsMaintenanceLog: false,
    dateEntreeVigueur: new Date('2023-01-01'),
  },

  // ===== FORFAITS DE PRESTATION =====
  {
    id: 'lpp-6',
    code: '1102842',
    libelle: 'Forfait installation et mise en service',
    description: 'Forfait facturable lors de l\'installation initiale d\'un dispositif médical.',
    tarifResponsabilite: 60.0,
    tauxRemboursement: 100,
    modeAcquisition: 'achat',
    periodiciteFactu: 'unique',
    titre: 'II',
    chapitre: '1',
    sousCategorie: 'Forfaits prestations',
    remboursementStatut: 'remboursable',
    requiresPrescription: false,
    requiresPriorAuth: false,
    requiresALD: false,
    conditions: [
      {
        id: 'cond-f1',
        titre: 'Facturable une seule fois',
        description: 'Forfait unique à l\'installation initiale du dispositif',
        obligatoire: true,
        regulation: 'LPPR Titre II',
      },
    ],
    prestationsIncluses: [
      {
        id: 'pf6-1',
        label: 'Déplacement technicien',
        obligatoire: true,
        icone: 'delivery',
      },
      {
        id: 'pf6-2',
        label: 'Installation complète',
        obligatoire: true,
        icone: 'install',
      },
      {
        id: 'pf6-3',
        label: 'Formation du patient',
        obligatoire: true,
        icone: 'training',
      },
    ],
    forfaitsAssocies: [],
    accessoiresIds: [],
    needsMaintenanceLog: false,
    dateEntreeVigueur: new Date('2023-01-01'),
  },

  {
    id: 'lpp-7',
    code: '1102843',
    libelle: 'Forfait reprise et désinstallation',
    description: 'Forfait facturable lors de la reprise du dispositif en fin de location.',
    tarifResponsabilite: 45.0,
    tauxRemboursement: 100,
    modeAcquisition: 'achat',
    periodiciteFactu: 'unique',
    titre: 'II',
    chapitre: '1',
    sousCategorie: 'Forfaits prestations',
    remboursementStatut: 'remboursable',
    requiresPrescription: false,
    requiresPriorAuth: false,
    requiresALD: false,
    conditions: [
      {
        id: 'cond-f2',
        titre: 'Facturable une seule fois',
        description: 'Forfait unique à la reprise du dispositif',
        obligatoire: true,
        regulation: 'LPPR Titre II',
      },
    ],
    prestationsIncluses: [
      {
        id: 'pf7-1',
        label: 'Déplacement et reprise',
        obligatoire: true,
        icone: 'pickup',
      },
      {
        id: 'pf7-2',
        label: 'Désinstallation propre',
        obligatoire: true,
        icone: 'install',
      },
      {
        id: 'pf7-3',
        label: 'Désinfection finale',
        obligatoire: true,
        icone: 'cleaning',
      },
    ],
    forfaitsAssocies: [],
    accessoiresIds: [],
    needsMaintenanceLog: false,
    dateEntreeVigueur: new Date('2023-01-01'),
  },

  // ===== ACCESSOIRES LITS =====
  {
    id: 'lpp-8',
    code: '1122335',
    libelle: 'Potence avec poignée pour lit médicalisé',
    description: 'Aide à la mobilisation. Permet au patient de se redresser facilement.',
    tarifResponsabilite: 95.0,
    tauxRemboursement: 100,
    modeAcquisition: 'achat',
    periodiciteFactu: 'unique',
    titre: 'II',
    chapitre: '1',
    sousCategorie: 'Accessoires lits',
    remboursementStatut: 'remboursable',
    requiresPrescription: false,
    requiresPriorAuth: false,
    requiresALD: false,
    conditions: [
      {
        id: 'cond-acc1',
        titre: 'Compatible avec lit LPP',
        description: 'Doit être compatible avec un lit médicalisé remboursable',
        obligatoire: true,
        regulation: 'LPPR',
      },
    ],
    prestationsIncluses: [
      { id: 'pa8-1', label: 'Livraison', obligatoire: true, icone: 'delivery' },
      { id: 'pa8-2', label: 'Fixation au lit', obligatoire: true, icone: 'install' },
    ],
    forfaitsAssocies: [],
    accessoiresIds: [],
    needsMaintenanceLog: false,
    dateEntreeVigueur: new Date('2023-01-01'),
  },

  // ===== FORFAIT FORMATION LÈVE-PERSONNE =====
  {
    id: 'lpp-9',
    code: '1102844',
    libelle: 'Forfait formation aidants - Lève-personne',
    description: 'Formation pratique des aidants à l\'utilisation sécurisée du lève-personne (durée minimum 2h).',
    tarifResponsabilite: 85.0,
    tauxRemboursement: 100,
    modeAcquisition: 'achat',
    periodiciteFactu: 'unique',
    titre: 'II',
    chapitre: '2',
    sousCategorie: 'Forfaits prestations',
    remboursementStatut: 'remboursable',
    requiresPrescription: false,
    requiresPriorAuth: false,
    requiresALD: false,
    conditions: [
      {
        id: 'cond-f3',
        titre: 'Formation obligatoire',
        description: 'Obligatoire avant première utilisation du lève-personne',
        obligatoire: true,
        regulation: 'Recommandation HAS',
      },
    ],
    prestationsIncluses: [
      { id: 'pf9-1', label: 'Formation théorique 30 min', obligatoire: true, icone: 'training' },
      { id: 'pf9-2', label: 'Formation pratique 1h30', obligatoire: true, icone: 'training' },
      { id: 'pf9-3', label: 'Documentation remise', obligatoire: true, icone: 'verification' },
    ],
    forfaitsAssocies: [],
    accessoiresIds: [],
    needsMaintenanceLog: false,
    dateEntreeVigueur: new Date('2023-01-01'),
  },

  // ===== FORFAIT VÉRIFICATION ANNUELLE =====
  {
    id: 'lpp-10',
    code: '1102845',
    libelle: 'Forfait vérification annuelle - Lève-personne',
    description: 'Contrôle de sécurité annuel obligatoire pour les lève-personnes.',
    tarifResponsabilite: 75.0,
    tauxRemboursement: 100,
    modeAcquisition: 'achat',
    periodiciteFactu: 'annuelle',
    titre: 'II',
    chapitre: '2',
    sousCategorie: 'Forfaits prestations',
    remboursementStatut: 'remboursable',
    requiresPrescription: false,
    requiresPriorAuth: false,
    requiresALD: false,
    conditions: [
      {
        id: 'cond-f4',
        titre: 'Annuel obligatoire',
        description: 'Vérification de sécurité requise tous les 12 mois',
        obligatoire: true,
        regulation: 'Norme NF EN ISO 10535',
      },
    ],
    prestationsIncluses: [
      { id: 'pf10-1', label: 'Test de charge', obligatoire: true, icone: 'verification' },
      { id: 'pf10-2', label: 'Vérification sangles et slings', obligatoire: true, icone: 'verification' },
      { id: 'pf10-3', label: 'Test système de sécurité', obligatoire: true, icone: 'verification' },
      { id: 'pf10-4', label: 'Certificat de conformité', obligatoire: true, icone: 'verification' },
    ],
    forfaitsAssocies: [],
    accessoiresIds: [],
    needsMaintenanceLog: false,
    dateEntreeVigueur: new Date('2023-01-01'),
  },

  // ===== ACCESSOIRE LÈVE-PERSONNE =====
  {
    id: 'lpp-11',
    code: '7654322',
    libelle: 'Sangle universelle pour lève-personne, taille M',
    description: 'Sangle de support pour lève-personne, taille M (60-90 kg). Lavable en machine.',
    tarifResponsabilite: 180.0,
    tauxRemboursement: 100,
    modeAcquisition: 'achat',
    periodiciteFactu: 'unique',
    titre: 'II',
    chapitre: '2',
    sousCategorie: 'Accessoires lève-personnes',
    remboursementStatut: 'remboursable',
    requiresPrescription: false,
    requiresPriorAuth: false,
    requiresALD: false,
    conditions: [
      {
        id: 'cond-acc2',
        titre: 'Compatible avec le lève-personne',
        description: 'Vérifier la compatibilité avec le modèle de lève-personne',
        obligatoire: true,
        regulation: 'LPPR',
      },
    ],
    prestationsIncluses: [
      { id: 'pa11-1', label: 'Livraison', obligatoire: true, icone: 'delivery' },
      { id: 'pa11-2', label: 'Démonstration de l\'utilisation', obligatoire: true, icone: 'training' },
    ],
    forfaitsAssocies: [],
    accessoiresIds: [],
    needsMaintenanceLog: false,
    dateEntreeVigueur: new Date('2023-01-01'),
  },
];

export function searchLPP(query: string, modeFilter?: string): LPPProduct[] {
  const normalizedQuery = query.toLowerCase().trim();

  let results = LPP_DATABASE.filter(product => {
    if (!normalizedQuery) return true;
    if (product.code === query) return true;
    if (
      product.libelle.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.sousCategorie.toLowerCase().includes(normalizedQuery)
    ) {
      return true;
    }
    return false;
  });

  if (modeFilter && modeFilter !== 'all') {
    results = results.filter(p => 
      p.modeAcquisition === modeFilter || p.modeAcquisition === 'location-achat'
    );
  }

  return results;
}

export function getProductById(id: string): LPPProduct | undefined {
  return LPP_DATABASE.find(p => p.id === id);
}

export function getProductByCode(code: string): LPPProduct | undefined {
  return LPP_DATABASE.find(p => p.code === code);
}

export function getProductsByIds(ids: string[]): LPPProduct[] {
  return ids.map(id => getProductById(id)).filter(Boolean) as LPPProduct[];
}

export function fuzzySearch(query: string, modeFilter?: string): LPPProduct[] {
  const results = searchLPP(query, modeFilter);
  
  return results.sort((a, b) => {
    const aScore = calculateRelevance(query, a);
    const bScore = calculateRelevance(query, b);
    return bScore - aScore;
  });
}

function calculateRelevance(query: string, product: LPPProduct): number {
  const q = query.toLowerCase();
  let score = 0;

  if (product.code === query) score += 1000;
  if (product.libelle.toLowerCase().startsWith(q)) score += 500;
  if (product.sousCategorie.toLowerCase().includes(q)) score += 300;
  if (product.libelle.toLowerCase().includes(q)) score += 100;
  if (product.description.toLowerCase().includes(q)) score += 50;

  return score;
}
