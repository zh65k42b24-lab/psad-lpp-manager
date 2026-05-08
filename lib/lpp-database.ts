import { LPPProduct } from '@/types/lpp';

export const LPP_DATABASE: LPPProduct[] = [
  {
    id: 'lpp-1',
    code: '1234567',
    libelle: 'Lit médicalisé électrique, multipositions, avec éléments de commande à distance',
    description: 'Lit médicalisé hauteur variable avec moteur électrique, permet les positions assise, Fowler et allongée. Équipé de barrières de sécurité.',
    tarifResponsabilite: 1245.0,
    tarifLocationHebdo: 15.40,
    tauxRemboursement: 100,
    modeAcquisition: 'location',
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
        titre: 'Prescription médicale',
        description: 'Ordonnance signée par un professionnel autorisé, datant de moins de 1 an',
        obligatoire: true,
        regulation: 'Art. L. 165-1 CSS',
      },
      {
        id: 'cond-2',
        titre: 'Entente préalable',
        description: 'Accord préalable de l\'Assurance Maladie avant facturation',
        obligatoire: true,
        regulation: 'Article L. 322-4 CSS',
      },
    ],
    prestationsAssociees: ['Livraison', 'Installation', 'Maintenance mensuelle'],
    needsMaintenanceLog: true,
    maintenanceCategorie: 'lit',
    dateEntreeVigueur: new Date('2023-01-01'),
    referenceJO: 'JORF 2023-01-15',
  },
  {
    id: 'lpp-2',
    code: '7654321',
    libelle: 'Lève-personne mobile avec sling, charge maximum 200 kg',
    description: 'Dispositif de levage motorisé pour transfert sécurisé des patients.',
    tarifResponsabilite: 3500.0,
    tarifLocationHebdo: 45.00,
    tauxRemboursement: 100,
    modeAcquisition: 'location-achat',
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
        titre: 'Prescription médicale',
        description: 'Prescrite pour risque de chute ou mobilité réduite',
        obligatoire: true,
        regulation: 'Art. L. 165-1 CSS',
      },
    ],
    prestationsAssociees: ['Formation aidants', 'Maintenance semestrielle'],
    needsMaintenanceLog: true,
    maintenanceCategorie: 'leve',
    dateEntreeVigueur: new Date('2022-06-01'),
  },
  {
    id: 'lpp-3',
    code: '4567890',
    libelle: 'Matelas dynamique à air alternant pour prévention escarres, classe 2',
    description: 'Matelas anti-escarres à cellules d\'air alternées. Classe 2 (risque moyen).',
    tarifResponsabilite: 1800.0,
    tarifLocationHebdo: 22.00,
    tauxRemboursement: 100,
    modeAcquisition: 'location',
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
    prestationsAssociees: ['Livraison', 'Entretien mensuel'],
    needsMaintenanceLog: true,
    maintenanceCategorie: 'matelas',
    dateEntreeVigueur: new Date('2023-03-15'),
  },
  {
    id: 'lpp-4',
    code: '9876543',
    libelle: 'Fauteuil releveur électrique, moteur double, structure renforcée',
    description: 'Fauteuil motorisé avec repose-pieds électrique. Système dual-moteur pour confort optimal.',
    tarifResponsabilite: 2100.0,
    tauxRemboursement: 100,
    modeAcquisition: 'achat',
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
        titre: 'Limitation mobilité',
        description: 'Patient avec limitation de mobilité confirmée médicalement',
        obligatoire: true,
        regulation: 'Prescription médicale',
      },
    ],
    prestationsAssociees: ['Livraison assemblée', 'Mise en place'],
    needsMaintenanceLog: true,
    maintenanceCategorie: 'fauteuil',
    dateEntreeVigueur: new Date('2023-05-01'),
  },
  {
    id: 'lpp-5',
    code: '1122334',
    libelle: 'Accessoire lit - Barrière de sécurité rabattable pour lit médicalisé',
    description: 'Barrière de sécurité pour prévention des chutes. Rabattable pour accès facile.',
    tarifResponsabilite: 245.0,
    tauxRemboursement: 100,
    modeAcquisition: 'achat',
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
    prestationsAssociees: [],
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
