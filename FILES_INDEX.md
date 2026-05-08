# 📑 PSAD LPP Manager - Index Complet des Fichiers

## 📂 Structure Générale

```
psad-lpp-app/
├── 📄 Documentation
│   ├── README.md                 ← Guide complet projet
│   ├── QUICK_START.md           ← Démarrage rapide 5min
│   ├── PROJET_RESUME.md         ← Résumé détaillé fonctionnalités
│   └── FILES_INDEX.md           ← CE FICHIER
│
├── 📦 Configuration & Setup
│   ├── package.json             ← Dépendances (Next.js 15, shadcn/ui, Prisma)
│   ├── tsconfig.json            ← TypeScript strict
│   ├── tailwind.config.ts       ← Design tokens bleu/blanc médical
│   ├── next.config.js           ← Optimisations Next.js
│   ├── .gitignore               ← Fichiers à ignorer
│   ├── .env.example             ← Template variables d'env
│   └── prettier.config.js       ← Formatage code (optionnel)
│
├── 🎨 Frontend
│   ├── app/
│   │   ├── layout.tsx           ← Layout racine + Fonts Google
│   │   ├── globals.css          ← Styles globaux (Tailwind + custom)
│   │   ├── page.tsx             ← 🏠 Accueil + Recherche intelligente
│   │   │
│   │   └── products/
│   │       └── [id]/
│   │           └── page.tsx     ← 📋 Fiche produit détaillée
│   │
│   └── components/
│       ├── ProductCard.tsx          ← Carte produit grille
│       ├── ProductDetailView.tsx    ← ⭐ Fiche complète (hero + checklist + actions)
│       ├── BillingChecklist.tsx     ← ✅ Checklist facturation interactive
│       ├── MaintenanceBot.tsx       ← 🤖 Chatbot MAD (Maintenance & Dépannage)
│       │
│       └── ui/ (shadcn/ui composants)
│           ├── button.tsx           ← Bouton réutilisable
│           ├── badge.tsx            ← Badge/Tag
│           ├── card.tsx             ← Card container
│           └── ... (autres si ajoutés)
│
├── 🔧 Backend & Logic
│   └── lib/
│       ├── lpp-database.ts      ← Base 5 produits LPP + search fuzzy
│       ├── utils.ts             ← Helpers (formatPrice, formatDate, etc)
│       │
│       └── api/ (À ajouter)
│           ├── search.ts        ← Recherche API
│           ├── checklists.ts    ← CRUD checklists
│           └── auth.ts          ← Authentification
│
├── 📊 Types TypeScript
│   ├── types/
│   │   ├── lpp.ts              ← Types LPP, Checklist, Facturation
│   │   └── auth.ts             ← Types Authentification, Session
│   │
│   └── prisma/
│       └── schema.prisma       ← Schéma base de données (PostgreSQL)
│
└── 🌐 Public Assets
    ├── manifest.json           ← Manifest PWA
    ├── favicon.ico            ← Favicon
    ├── icon-192x192.png       ← Icon PWA (à générer)
    ├── icon-512x512.png       ← Icon PWA (à générer)
    └── apple-icon.png         ← iOS home screen icon (à générer)
```

---

## 📄 Fichiers Détaillés

### 📚 Documentation

| Fichier | Contenu | Pour qui |
|---------|---------|----------|
| **README.md** | Guide complet: features, stack, déploiement, roadmap | Tous |
| **QUICK_START.md** | Démarrage 5min: local ou Vercel | Développeurs |
| **PROJET_RESUME.md** | Résumé complet: architecture, cas d'usage, roadmap | PO, Tech |
| **FILES_INDEX.md** | Index de tous les fichiers (ce fichier) | Dev |

### 🛠️ Configuration

| Fichier | Rôle |
|---------|------|
| **package.json** | Dépendances: Next.js, React, TypeScript, Tailwind, Prisma, NextAuth |
| **tsconfig.json** | TypeScript strict, path aliases (@/components, @/lib, etc) |
| **tailwind.config.ts** | Design tokens, couleurs PSAD bleu/blanc, extensions |
| **next.config.js** | Image optimization, headers sécurité, PWA |
| **.env.example** | Template: NEXTAUTH_SECRET, DATABASE_URL, etc |
| **.gitignore** | node_modules, .env, .next, etc |

### 🎨 Pages Principales

#### **app/page.tsx** - Accueil & Recherche
```typescript
Fonctionnalités:
- Hero section avec call-to-action
- Barre de recherche intelligente
- Résultats en grille (fuzzy matching)
- Historique recherches récentes
- 3 feature cards (Base, Checklist, Support)
```

#### **app/products/[id]/page.tsx** - Fiche Produit
```typescript
Fonctionnalités:
- Affiche ProductDetailView composant
- Récupère produit par ID
- SEO metadata dynamique
- 404 si produit inexistant
```

### 🎯 Composants Critiques

#### **ProductDetailView.tsx** ⭐ (600+ lignes)
```
LA pièce maitresse - Tout est ici!

Structure:
├─ Header Hero (gradients bleu/blanc)
├─ Quick Info Box (tarif, remboursement)
├─ Conditions critiques (3 cards: Prescription, Entente, ALD)
├─ Conditions de prise en charge (détaillées)
├─ Prestations associées (facturables)
├─ Metadata légales (JO, dates)
├─ Buttons principaux:
│  ├─ Checklist Facturation (ouvre modal)
│  ├─ Assistance MAD (ouvre chatbot)
│  └─ Télécharger PDF
└─ État:
   ├─ showChecklist (afficher modal checklist)
   └─ showMaintBot (afficher chatbot)
```

#### **BillingChecklist.tsx** ✅ (400+ lignes)
```
Modal interactive pour valider facturation

Structure:
├─ Header gradient orange
│  └─ Progress bar visuelle
├─ Warning si critères obligatoires manquants
├─ Checklist items groupés par catégorie:
│  ├─ Prescription (3 items)
│  ├─ Entente Préalable (2 items, conditionnel)
│  ├─ Durée Location (2 items)
│  ├─ Renouvellement (2 items)
│  ├─ ALD (2 items, conditionnel)
│  ├─ Matériovigilance (1 item, conditionnel)
│  └─ Prestations (1 item, conditionnel)
├─ Notes additionnelles (textarea)
├─ Buttons:
│  ├─ Valider & Sauvegarder (submit)
│  ├─ Exporter PDF
│  └─ Fermer
└─ Message succès si tous obligatoires cochés
```

#### **MaintenanceBot.tsx** 🤖 (300+ lignes)
```
Chatbot flottant pour dépannage

Structure:
├─ Floating button (coin inférieur droit)
├─ Modal au click avec:
│  ├─ Header orange "Assistant MAD"
│  ├─ Messages container (user + bot)
│  │  ├─ Messages utilisateur (bleu, droite)
│  │  └─ Messages bot (blanc, gauche)
│  ├─ Quick action buttons (lit, lève, matelas, fauteuil)
│  ├─ Input texte + Send button
│  └─ Emergency contact footer
└─ Catégories:
   ├─ Lits médicalisés
   ├─ Lève-personnes
   ├─ Matelas anti-escarres
   ├─ Fauteuils releveurs
   ├─ Matériovigilance
   └─ Support numéro 24/7
```

#### **ProductCard.tsx**
```
Mini-card pour grille accueil

Affiche:
├─ Code LPP (mono police)
├─ Badge si entente préalable requise
├─ Libellé produit
├─ Catégorie + Titre/Chapitre
├─ Boîte prix:
│  ├─ Tarif responsabilité
│  └─ Taux remboursement
├─ Conditions (prescription, ALD)
└─ Bouton "Voir fiche complète"
```

### 📊 Types TypeScript

#### **types/lpp.ts** (250+ lignes)
```typescript
Structures:
- LPPProduct: Produit complet
- LPPCondition: Condition de prise en charge
- ChecklistFacturationItem: Item checklist
- BillingChecklist: Checklist sauvegardée
- MaintenanceLog: Log maintenance
- PatientDossier: Dossier patient
- MaintenanceAlert: Alerte maintenance
- SearchResult: Résultat recherche
- APIResponse<T>: Wrapper réponse API
```

#### **types/auth.ts**
```typescript
Structures:
- User: Utilisateur authentifié
- LoginCredentials: Email + password
- AuthResponse: Token + user après login
- AuthError: Erreur authentification
- Session: Session active
```

### 🔧 Logique Backend

#### **lib/lpp-database.ts** (300+ lignes)
```typescript
Contient:
- LPP_DATABASE: Array 5 produits d'exemple
- searchLPP(): Recherche simple
- fuzzySearch(): Recherche fuzzy matching
- getProductById(): Par ID
- getProductByCode(): Par code LPP
- getProductsByCategorie(): Par catégorie
- getProductsByTitre(): Par titre LPPR
- calculateRelevance(): Score pertinence

Produits inclus:
1. Lit électrique (1234567, 1245€, entente required)
2. Lève-personne (7654321, 3500€)
3. Matelas escarres (4567890, 1800€, ALD required)
4. Fauteuil releveur (9876543, 2100€)
5. Accessoires lit (1122334, 245€)
```

#### **lib/utils.ts** (200+ lignes)
```typescript
Helpers:
- cn(): Merge clsx + tailwind-merge
- formatPrice(): Formater €
- formatDate(): Formater date
- formatDatetime(): Formater date+heure
- formatSSN(): Formater numéro SS
- isValidLPPCode(): Valider code LPP
- generatePDF(): Export PDF (stub)
- calculateAveragePriceByCategorie()
- ... et plus
```

### 🎨 Style System

#### **app/globals.css**
```css
Contient:
- Variables CSS (@layer base)
- Tailwind directives (@tailwind)
- Custom scrollbar
- Focus states
- Print styles
- Accessibility (prefers-reduced-motion)
- Animations personnalisées
```

#### **tailwind.config.ts**
```typescript
Customisations:
- Couleurs PSAD (psad-blue-50 → psad-blue-950)
- Border radius
- Keyframes (accordion, pulse)
- Animations
- Fonts (Inter, Geist Mono)
- Dark mode support
```

### 🌐 PWA

#### **public/manifest.json**
```json
Configuration:
- Nom & description
- Icons (192x192, 512x512)
- Screenshots
- Theme colors
- Display mode (standalone)
- Shortcuts (recherche, support)
- Share target
```

### 📦 Prisma (À configurer)

#### **prisma/schema.prisma**
```prisma
Modèles:
- User: Authentification
- Session: Sessions utilisateur
- LPPProduct: Produits LPP
- Search: Historique recherches
- BillingChecklist: Checklists sauvegardées
- ChecklistItem: Items checklist
- SupportChat: Messages chatbot
- ChatMessage: Messages individuels
- MaintenanceLog: Logs maintenance
- PatientDossier: Dossiers patients
```

---

## 🔄 Flux de Données

### Recherche Produit
```
User tape "lit"
  ↓
app/page.tsx capte changement
  ↓
lib/lpp-database.ts::fuzzySearch()
  ↓
ProductCard.tsx × N produits
  ↓
Affiche résultats
```

### Ouverture Fiche
```
User clique ProductCard
  ↓
Link vers /products/[id]
  ↓
app/products/[id]/page.tsx
  ↓
getProductById(id) depuis lib/lpp-database
  ↓
ProductDetailView.tsx affiche détails
```

### Ouverture Checklist
```
User clique "✅ Checklist Facturation"
  ↓
ProductDetailView.tsx::setShowChecklist(true)
  ↓
BillingChecklist.tsx s'affiche en modal
  ↓
generateChecklistItems(product) crée items
  ↓
User coche items
  ↓
handleSubmit() envoie au serveur (TODO)
```

### Utilisation Chatbot
```
User clique "🤖 Assistance MAD"
  ↓
MaintenanceBot.tsx s'affiche
  ↓
User tape "mon lit ne se lève plus"
  ↓
processMessage() détecte "lit" + "problème"
  ↓
Affiche MAINTENANCE_RESPONSES['LIT_PROBLEME']
  ↓
Bot répond avec procédure dépannage
```

---

## 🚀 Fichiers à Ajouter (Pour Production)

```
A créer:
├── app/auth/login/page.tsx
├── app/api/auth/login.ts
├── app/api/auth/signup.ts
├── app/api/checklists.ts
├── app/api/search.ts
├── prisma/seed.ts
├── public/icon-*.png (générer avec tools)
├── public/screenshot-*.png (captures)
├── .github/workflows/deploy.yml (CI/CD)
├── scripts/import-lpp-csv.js (import base officielle)
└── docs/API.md (documentation API)
```

---

## 📝 Notes Développement

### Conventions
- **Components:** PascalCase (`ProductCard.tsx`)
- **Files:** kebab-case (`billing-checklist.tsx`) OU PascalCase
- **Imports:** Utiliser aliases (@/components, @/lib)
- **Types:** Exporter depuis types/ folder

### Qualité Code
- TypeScript strict (tsconfig.json)
- Prettier formatage auto
- ESLint rules intégrées

### Testing (À implémenter)
```
Ajouter:
- Jest + React Testing Library
- E2E tests (Cypress/Playwright)
- Performance testing
```

---

## ✅ Checklist Fichiers

```
Frontend:
  ☑️ app/page.tsx (accueil)
  ☑️ app/products/[id]/page.tsx (fiche)
  ☑️ components/ProductDetailView.tsx
  ☑️ components/BillingChecklist.tsx
  ☑️ components/MaintenanceBot.tsx
  ☑️ components/ProductCard.tsx
  ☑️ components/ui/button.tsx
  ☑️ components/ui/card.tsx
  ☑️ components/ui/badge.tsx

Style:
  ☑️ app/globals.css
  ☑️ tailwind.config.ts
  ☑️ app/layout.tsx

Data:
  ☑️ lib/lpp-database.ts
  ☑️ lib/utils.ts
  ☑️ types/lpp.ts
  ☑️ types/auth.ts

Config:
  ☑️ package.json
  ☑️ tsconfig.json
  ☑️ next.config.js
  ☑️ tailwind.config.ts
  ☑️ .env.example
  ☑️ .gitignore

PWA:
  ☑️ public/manifest.json

Docs:
  ☑️ README.md
  ☑️ QUICK_START.md
  ☑️ PROJET_RESUME.md
  ☑️ FILES_INDEX.md (ce fichier)
```

---

## 🎯 Commandes Essentielles

```bash
# Installation
npm install

# Développement
npm run dev              # http://localhost:3000

# Build production
npm run build
npm start

# Linting
npm run lint

# TypeScript check
npm run type-check

# Format code
npx prettier --write .

# Database
npx prisma generate
npx prisma db push
npx prisma studio   # GUI base de données
```

---

## 📞 Support

Pour ajouter un fichier, modifier une structure:
1. Consulter ce fichier
2. Vérifier les conventions
3. Créer dans bon dossier
4. Mettre à jour FILES_INDEX.md

---

**Dernière mise à jour:** 2024-01-15
**Projet:** PSAD LPP Manager v1.0
**Stack:** Next.js 15 + TypeScript + Tailwind + shadcn/ui
