// Updated types for LPP Product

export type LppProduct = {
  code: string;
  libelle: string;
  maintenanceCategorie: 'lit' | 'fauteuil' | 'leve' | 'matelas' | 'autre';
  modalite: 'location' | 'achat';
  periodicite: string;
  tarifForfaitaire: number;
  uniteTarif: string;
  checklist: string[];
  forfaitsAssocies: {
    code: string;
    libelle: string;
    raison: string;
  }[];
  // Add other existing fields if needed
};