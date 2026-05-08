// Complete updated database with new fields

export const LPP_DATABASE: LppProduct[] = [
  {
    code: '1130001',
    libelle: 'Lit médicalisé 3 fonctions',
    maintenanceCategorie: 'lit',
    modalite: 'location',
    periodicite: 'Mensuelle',
    tarifForfaitaire: 89.90,
    uniteTarif: '€/mois',
    checklist: [
      'Cadre métallique avec peinture époxy',
      'Sommier à lattes',
      'Télécommande patient + soignant',
      'Barrières de sécurité ¾',
      'Roulettes verrouillables',
      'Installation et formation incluses'
    ],
    forfaitsAssocies: [
      { code: '1130099', libelle: 'Forfait installation & livraison', raison: 'Obligatoire pour la mise en service' }
    ]
  },
  // Add more products as needed
  {
    code: '1130099',
    libelle: 'Forfait installation & livraison de lit médicalisé',
    maintenanceCategorie: 'lit',
    modalite: 'achat',
    periodicite: 'À l’acte',
    tarifForfaitaire: 250,
    uniteTarif: '€/forfait',
    checklist: [
      'Livraison à domicile',
      'Installation complète',
      'Formation du patient et aidants',
      'Vérification de la conformité'
    ],
    forfaitsAssocies: []
  }
];

export function fuzzySearch(query: string): LppProduct[] {
  // Existing fuzzy search logic
  return LPP_DATABASE.filter(p => 
    p.libelle.toLowerCase().includes(query.toLowerCase()) || 
    p.code.includes(query)
  );
}