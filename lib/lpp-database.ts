import { LPPProduct, LPPCondition } from '@/types/lpp';

// Base de données exemple - À remplacer par requêtes BDD réelle
export const LPP_DATABASE: LPPProduct[] = [
  {
    id: 'lpp-1',
    code: '1234567',
    libelle: 'Lit médicalisé électrique, multipositions, avec éléments de commande à distance',
    description:
      'Lit médicalisé hauteur variable avec moteur électrique, permet les positions assise, Fowler et allongée. Équipé de barrières de sécurité.',
    tarifResponsabilite: 1245.0,
    tauxRemboursement: 100,
    titre: 'II',
    chapitre: '1',
    sousCategorie: 'Lits médicalisés',
    remboursementStatut: 'remboursable',
    requiresPrescription: true,
    requiresPriorAuth: true, // Entente préalable obligatoire
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
      {
        id: 'cond-3',
        titre: 'Durée minimale de location',
        description: 'Minimum 3 mois de location continue',
        obligatoire: true,
        regulation: 'LPPR - Titre II',
      },
      {
        id: 'cond-4',
        titre: 'Adaptation du domicile',
        description: 'Visite d\'adaptation du domicile obligatoire',
        obligatoire: true,
        regulation: 'Norme AFNOR',
      },
    ],
    prestationsAssociees: [
      'Livraison et mise en place',
      'Démonstration et formation',
      'Maintenance mensuelle',
      'Support téléphonique 24/7',
    ],
    needsMaintenanceLog: true,
    maintenanceCategorie: 'lit',
    dateEntreeVigueur: new Date('2023-01-01'),
    referenceJO: 'JORF 2023-01-15',
  },
  {
    id: 'lpp-2',
    code: '7654321',
    libelle: 'Lève-personne mobile avec sling, charge maximum 200 kg',
    description:
      'Dispositif de levage motorisé pour transfert sécurisé des patients. Châssis mobile, équipé de slings et commande intuitive.',
    tarifResponsabilite: 3500.0,
    tauxRemboursement: 100,
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
      {
        id: 'cond-6',
        titre: 'Formation obligatoire',
        description: 'Formation des aidants et du patient par technicien',
        obligatoire: true,
        regulation: 'Directive fabricant',
      },
    ],
    prestationsAssociees: ['Formation aidants', 'Maintenance semestrielle', 'Vérification annuelle'],
    needsMaintenanceLog: true,
    maintenanceCategorie: 'leve',
    dateEntreeVigueur: new Date('2022-06-01'),
  },
  {
    id: 'lpp-3',
    code: '4567890',
    libelle: 'Matelas dynamique à air alternant pour prévention escarres, classe 2',
    description:
      'Matelas anti-escarres à cellules d\'air alternées. Classe 2 (risque moyen). Poids patient 60-150 kg.',
    tarifResponsabilite: 1800.0,
    tauxRemboursement: 100,
    titre: 'II',
    chapitre: '3',
    sousCategorie: 'Matelas thérapeutiques',
    remboursementStatut: 'remboursable',
    requiresPrescription: true,
    requiresPriorAuth: false,
    requiresALD: true, // Nécessite ALD
    conditions: [
      {
        id: 'cond-7',
        titre: 'Diagnostic d\'escarres ou risque élevé',
        description: 'Patient en ALD ou avec diagnostic d\'escarre, score Braden ≤ 16',
        obligatoire: true,
        regulation: 'LPPR Titre II Ch. 3',
      },
      {
        id: 'cond-8',
        titre: 'Vérification poids patient',
        description: 'Poids compatible avec les tolérances du matelas',
        obligatoire: true,
        regulation: 'Fiche produit',
      },
    ],
    prestationsAssociees: ['Livraison', 'Vidage initial', 'Entretien mensuel'],
    needsMaintenanceLog: true,
    maintenanceCategorie: 'matelas',
    dateEntreeVigueur: new Date('2023-03-15'),
  },
  {
    id: 'lpp-4',
    code: '9876543',
    libelle: 'Fauteuil releveur électrique, moteur double, structure renforcée',
    description:
      'Fauteuil motorisé avec repose-pieds électrique. Système dual-moteur pour confort optimal. Housse polyuréthane lavable.',
    tarifResponsabilite: 2100.0,
    tauxRemboursement: 100,
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
      {
        id: 'cond-10',
        titre: 'Adaptation ergonomique',
        description: 'Visite pour vérifier adaptation au domicile et aux mesures du patient',
        obligatoire: true,
        regulation: 'Normes ergonomie',
      },
    ],
    prestationsAssociees: ['Livraison assemblée', 'Mise en place', 'Formation utilisation'],
    needsMaintenanceLog: true,
    maintenanceCategorie: 'fauteuil',
    dateEntreeVigueur: new Date('2023-05-01'),
  },
  {
    id: 'lpp-5',
    code: '1122334',
    libelle: 'Accessoire lit - Barrière de sécurité rabattable pour lit médicalisé',
    description:
      'Barrière de sécurité pour prévention des chutes. Rabattable pour accès facile. Compatible avec lits médicalisés standard.',
    tarifResponsabilite: 245.0,
    tauxRemboursement: 100,
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

// Recherche intelligente en langage naturel
export function searchLPP(query: string, titre?: string, chapitre?: string): LPPProduct[] {
  const normalizedQuery = query.toLowerCase().trim();

  return LPP_DATABASE.filter(product => {
    let matches = false;

    // Recherche par code exact
    if (product.code === query) {
      matches = true;
    }

    // Recherche dans libellé et description
    if (
      product.libelle.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.sousCategorie.toLowerCase().includes(normalizedQuery)
    ) {
      matches = true;
    }

    // Recherche par mots-clés
    const keywords = ['lit', 'leve', 'lève', 'matelas', 'fauteuil', 'releveur', 'escarres', 'anti-escarre'];
    if (keywords.some(kw => normalizedQuery.includes(kw) && product.libelle.toLowerCase().includes(kw))) {
      matches = true;
    }

    // Filtre par titre et chapitre si spécifiés
    if (titre && product.titre !== titre) matches = false;
    if (chapitre && product.chapitre !== chapitre) matches = false;

    return matches;
  });
}

export function getProductById(id: string): LPPProduct | undefined {
  return LPP_DATABASE.find(p => p.id === id);
}

export function getProductByCode(code: string): LPPProduct | undefined {
  return LPP_DATABASE.find(p => p.code === code);
}

export function getProductsByCategorie(categorie: string): LPPProduct[] {
  return LPP_DATABASE.filter(p => p.sousCategorie.toLowerCase() === categorie.toLowerCase());
}

export function getProductsByTitre(titre: string): LPPProduct[] {
  return LPP_DATABASE.filter(p => p.titre === titre);
}

// Recherche fuzzy pour langage naturel plus avancée
export function fuzzySearch(query: string): LPPProduct[] {
  const results = searchLPP(query);
  
  // Tri par pertinence si plusieurs résultats
  return results.sort((a, b) => {
    const aScore = calculateRelevance(query, a);
    const bScore = calculateRelevance(query, b);
    return bScore - aScore;
  });
}

function calculateRelevance(query: string, product: LPPProduct): number {
  const q = query.toLowerCase();
  let score = 0;

  // Code exact = haute pertinence
  if (product.code === query) score += 1000;

  // Libellé commence par la requête
  if (product.libelle.toLowerCase().startsWith(q)) score += 500;

  // Catégorie correspond
  if (product.sousCategorie.toLowerCase().includes(q)) score += 300;

  // Libellé contient
  if (product.libelle.toLowerCase().includes(q)) score += 100;

  // Description contient
  if (product.description.toLowerCase().includes(q)) score += 50;

  return score;
}
