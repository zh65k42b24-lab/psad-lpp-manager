import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatDatetime(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + '...' : str;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Erreur copie', error);
    return false;
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Formattage numéro Sécurité Sociale
export function formatSSN(ssn: string): string {
  const cleaned = ssn.replace(/\D/g, '');
  if (cleaned.length !== 13) return ssn;
  return `${cleaned.substring(0, 1)} ${cleaned.substring(1, 3)} ${cleaned.substring(3, 5)} ${cleaned.substring(5, 8)} ${cleaned.substring(8, 13)}`;
}

// Validation code LPP
export function isValidLPPCode(code: string): boolean {
  return /^\d{7}$/.test(code.trim());
}

// Génération PDF
export async function generatePDF(html: string, filename: string) {
  // À implémenter avec html2pdf ou similar
  console.log('PDF generation requested for:', filename);
}

// Statistiques et calculs
export function calculateAveragePriceByCategorie(products: any[]): Record<string, number> {
  const groupedByCategorie: Record<string, number[]> = {};

  products.forEach(product => {
    if (!groupedByCategorie[product.sousCategorie]) {
      groupedByCategorie[product.sousCategorie] = [];
    }
    groupedByCategorie[product.sousCategorie].push(product.tarifResponsabilite);
  });

  const averages: Record<string, number> = {};
  Object.entries(groupedByCategorie).forEach(([categorie, prices]) => {
    averages[categorie] = prices.reduce((a, b) => a + b, 0) / prices.length;
  });

  return averages;
}

// Valeurs par défaut
export const DEFAULT_LPP_PRICES: Record<string, number> = {
  'Lits médicalisés': 1250,
  'Lève-personnes': 3500,
  'Matelas thérapeutiques': 1800,
  'Fauteuils releveurs': 2100,
  'Accessoires lits': 250,
};
