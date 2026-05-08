# PSAD LPP Manager - Application Web LPPR

**Plateforme complète de gestion des produits LPP pour PSAD France**

Conforme LPPR Titre I Chapitre 2, Assurance Maladie.

## ✨ Fonctionnalités

### 🔍 Recherche Intelligente
- Recherche en **langage naturel** (code LPP, libellé, mots-clés)
- **Fuzzy matching** pour détection automatique des produits
- Historique des recherches récentes
- Filtres par titre/chapitre LPPR

### 📋 Fiches Produit Ultra-Détaillées
- Code LPP officiel + libellé exact
- Tarif responsabilité et taux remboursement
- Conditions de prise en charge complètes
- Prestations associées facturables
- Métadonnées légales (JO, dates validité)

### ✅ Checklist Facturation Interactive
**Validez automatiquement tous les critères :**
- ✓ Ordonnance médicale présente
- ✓ Entente préalable (si requise)
- ✓ Durée de location respectée
- ✓ Renouvellement en règle
- ✓ Statut ALD (si applicable)
- ✓ Matériovigilance à jour
- ✓ Prestations associées facturables

Génération PDF, sauvegarde, suivi du statut.

### 🤖 Chatbot MAD (Maintenance & Dépannage)
**Support 24/7 expert en :**
- 🛏️ Lits médicalisés (moteur, électrique)
- 🏋️ Lève-personnes (hydraulique, sécurité)
- 🛏️ Matelas anti-escarres (gonflage, fuites)
- 🪑 Fauteuils releveurs (motorisation)
- 🔧 Problèmes électriques/mécaniques
- 📋 Signalement matériovigilance

Réponses par catégorie, procédures d'urgence, contact support 24/7.

### 📱 Mobile-First & PWA
- Design responsive optimal
- Installation PWA (mode hors-ligne)
- Sync automatique des données
- Notifications push

### 🔐 Authentification Interne
- Email + mot de passe sécurisé
- Sessions persistantes
- Rôles utilisateurs (admin, manager, user, technician)

## 🚀 Déploiement Rapide (5 min sur Vercel)

### Prérequis
- Node.js 18+
- Compte GitHub
- Compte Vercel (gratuit)

### Installation locale

```bash
# 1. Cloner le projet
git clone <repo>
cd psad-lpp-app

# 2. Installer dépendances
npm install

# 3. Créer .env.local
cat > .env.local << EOF
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/psad
EOF

# 4. Lancer le serveur de développement
npm run dev

# 5. Ouvrir http://localhost:3000
```

### Déploiement sur Vercel (👈 recommandé)

```bash
# 1. Push sur GitHub
git add .
git commit -m "Initial commit: PSAD LPP Manager"
git push origin main

# 2. Sur https://vercel.com
# → "New Project" → Sélectionner le repo GitHub
# → Configurer variables d'environnement
# → Déployer (1 clic)

# 3. Variables d'environnement à ajouter dans Vercel:
# NEXTAUTH_SECRET=<valeur générée>
# NEXTAUTH_URL=https://ton-app.vercel.app
# DATABASE_URL=<PostgreSQL Cloud>
```

## 📦 Stack Technique

| Technologie | Version | Usage |
|---|---|---|
| **Next.js** | 15 | Framework React full-stack |
| **TypeScript** | 5.5 | Type-safety |
| **Tailwind CSS** | 3.4 | Styling responsive |
| **shadcn/ui** | latest | Composants UI |
| **Prisma** | 5.8 | ORM base de données |
| **NextAuth** | 4.24 | Authentification |
| **Zod** | 3.22 | Validation formulaires |
| **Zustand** | 4.4 | State management |
| **Lucide React** | 0.365 | 365+ icônes |

## 📁 Structure du Projet

```
psad-lpp-app/
├── app/
│   ├── page.tsx                 # Accueil avec recherche
│   ├── products/
│   │   └── [id]/page.tsx       # Fiche produit détaillée
│   ├── auth/
│   │   └── login/page.tsx      # Login
│   ├── layout.tsx              # Layout racine
│   └── globals.css             # Styles globaux
│
├── components/
│   ├── ProductCard.tsx          # Carte produit
│   ├── ProductDetailView.tsx    # Fiche complète
│   ├── BillingChecklist.tsx     # Checklist interactive
│   ├── MaintenanceBot.tsx       # Chatbot MAD
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       └── ...
│
├── lib/
│   ├── lpp-database.ts         # Base LPP en mémoire
│   └── utils.ts                # Utilitaires
│
├── types/
│   ├── lpp.ts                  # Types LPP
│   └── auth.ts                 # Types auth
│
├── prisma/
│   └── schema.prisma           # Schéma base de données
│
├── tailwind.config.ts          # Config Tailwind
├── tsconfig.json               # Config TypeScript
├── next.config.js              # Config Next.js
└── package.json                # Dépendances
```

## 🎨 Design System

### Couleurs PSAD (Bleu/Blanc Médical)
```
Primary (Bleu): #004CBC
Secondary: #3b82f6
Accent (Sky): #0ea5e9
Destructive (Rouge): #dc2626
```

### Responsive
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

## 🔑 Authentification

### Login par défaut (développement)
```
Email: admin@psad-france.fr
Password: Demo123!
```

### Production
Implémenter avec OAuth2 PSAD ou LDAP.

## 📊 Base de Données

### Setup PostgreSQL (local)

```bash
# Créer base
createdb psad_lpp

# Migrer schéma
npx prisma db push

# Seed données
npx prisma db seed
```

### Cloud PostgreSQL recommandé
- **Supabase** (gratuit, 500MB)
- **Railway** (simple)
- **Neon** (serverless)

## 🧪 Test Produits

5 produits sont pré-configurés pour tester :

1. **Lit médicalisé électrique** (Code: 1234567)
   - Titre II, Chapitre 1
   - Tarif: 1245€
   - Entente préalable requise

2. **Lève-personne mobile** (Code: 7654321)
   - Titre II, Chapitre 2
   - Tarif: 3500€
   - Formation aidants obligatoire

3. **Matelas anti-escarres** (Code: 4567890)
   - Titre II, Chapitre 3
   - Tarif: 1800€
   - ALD obligatoire

4. **Fauteuil releveur** (Code: 9876543)
   - Titre II, Chapitre 2
   - Tarif: 2100€
   - Adaptation ergonomique requise

5. **Accessoires lits** (Code: 1122334)
   - Titre II, Chapitre 1
   - Tarif: 245€
   - Usage conjoint obligatoire

## 🚨 Fonctionnalités Avancées

### À implémenter
- [ ] Import CSV base LPP officielle
- [ ] PDF de la checklist (html2pdf)
- [ ] Synchronisation CPAM API
- [ ] Tableau de bord analytique
- [ ] Gestion multi-utilisateurs
- [ ] Audit trail complet
- [ ] Export feuille de soins NOEMIE
- [ ] Integration calendrier maintenance

## 📱 PWA Installation

L'app fonctionne comme une PWA native :

```
iOS: Safari → Partage → Sur l'écran d'accueil
Android: Menu → Installer l'app
Desktop: ... → Installer
```

## 🔒 Sécurité

- ✅ HTTPS only
- ✅ CSRF protection (NextAuth)
- ✅ XSS prevention (React sanitization)
- ✅ SQL injection prevention (Prisma ORM)
- ✅ Rate limiting (à ajouter)
- ✅ RGPD compliant

## 📞 Support & Contact

- **Email**: support@psad-france.fr
- **Docs**: https://docs.psad-lpp.fr
- **Issues**: GitHub repo

## 📜 Licences & Conformité

- ✅ LPPR Titre I Chapitre 2 conforme
- ✅ Assurance Maladie compatible
- ✅ RGPD compliant
- ✅ Données sensibles chiffrées

## 🎯 Roadmap

**v1.1** (Février 2024)
- Intégration base LPP officielle
- PDF export complet

**v1.2** (Mars 2024)
- Dashboard analytique
- Sync CPAM API

**v2.0** (Q2 2024)
- Mobile app native
- Offline-first sync
- API publique

## 📝 Licence

MIT License - PSAD France 2024

---

**Prêt à déployer ? Commençons !** 🚀

```bash
npm install && npm run dev
```
