# 🚀 PSAD LPP Manager - Démarrage Rapide (5 min)

## Option 1 : Déployer sur Vercel (recommandé)

### ⚡ En 3 clics, c'est live !

```bash
# 1. Créer repo GitHub
git clone <ce-projet>
cd psad-lpp-app
git add .
git commit -m "Initial"
git push origin main

# 2. Aller sur https://vercel.com
# - Cliquer "New Project"
# - Sélectionner le repo GitHub
# - Cliquer "Deploy" (30 secondes)

# 3. URLs :
# https://psad-lpp.vercel.app (live!)
```

**Avantages :**
- ✅ Gratuit
- ✅ HTTPS automatique
- ✅ Déploiement instant
- ✅ Base de données PostgreSQL (Supabase gratuit 500MB)
- ✅ Domaine personnalisé optionnel

---

## Option 2 : Développement Local

### Prérequis (5 min d'install)

```bash
# Installer Node.js 18+
# https://nodejs.org/ (LTS recommandé)

# Vérifier l'installation
node --version   # v18+ ok
npm --version    # 9+ ok
```

### Installation (2 min)

```bash
# 1. Cloner le projet
git clone <ce-projet>
cd psad-lpp-app

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur
npm run dev

# 4. Ouvrir http://localhost:3000
```

**Voilà !** L'app est live en local.

---

## 🎯 Tester les Fonctionnalités

### 1️⃣ Recherche Intelligente
- Aller à http://localhost:3000
- Taper dans la barre : `lit médicalisé`
- ✨ 5 résultats LPP s'affichent avec tarifs

### 2️⃣ Fiche Produit Détaillée
- Cliquer sur "Lit médicalisé électrique"
- Voir : code LPP, tarif, conditions, prestations
- Design bleu/blanc médical professionnel

### 3️⃣ Checklist Facturation
- Cliquer bouton "✅ Checklist Facturation"
- Cocher les critères obligatoires
- ✓ Barre de progression en temps réel
- 💾 Sauvegarder automatiquement

### 4️⃣ Chatbot MAD
- Cliquer "🤖 Assistance MAD"
- Décrire un problème : "Lit qui ne s'allève plus"
- Recevoir procédure dépannage étape par étape
- Numéro d'urgence intégré

---

## 📊 Produits de Test

5 produits pré-chargés :

| Code | Produit | Tarif | Entente ? | ALD ? |
|------|---------|-------|-----------|-------|
| 1234567 | Lit électrique | 1245€ | ✓ Oui | ✗ Non |
| 7654321 | Lève-personne | 3500€ | ✓ Oui | ✗ Non |
| 4567890 | Matelas anti-escarres | 1800€ | ✗ Non | ✓ Oui |
| 9876543 | Fauteuil releveur | 2100€ | ✓ Oui | ✗ Non |
| 1122334 | Accessoires lit | 245€ | ✗ Non | ✗ Non |

**Tester :** Taper chaque code dans la recherche.

---

## 🔧 Configuration Production

### PostgreSQL Cloud (Supabase - Gratuit)

```bash
# 1. Créer compte https://supabase.com
# 2. Créer projet
# 3. Copier DATABASE_URL

# 4. Dans .env.local :
echo "DATABASE_URL=postgresql://..." >> .env.local

# 5. Migrer la base
npx prisma db push

# 6. Seed les données
npx prisma db seed
```

### Variables d'Environnement Vercel

```bash
# Dans Settings → Environment Variables de votre projet Vercel:

NEXTAUTH_SECRET=$(openssl rand -base64 32)  # Générer nouveau
NEXTAUTH_URL=https://ton-app.vercel.app
DATABASE_URL=postgresql://user:pass@db.com/psad
```

---

## 📱 Installation PWA

L'app fonctionne comme une app mobile native :

```
iPhone:
1. Ouvrir dans Safari
2. Partager → Sur l'écran d'accueil
3. "PSAD LPP Manager" → Ajouter
4. App disponible en hors-ligne!

Android:
1. Ouvrir dans Chrome
2. Menu ⋮ → "Installer l'app"
3. App disponible en hors-ligne!

Desktop (Ordinateur):
1. Ouvrir dans Chrome/Edge
2. Adresse → "Installer"
3. App standalone lancée
```

---

## 🐛 Troubleshooting

### Port 3000 occupé ?
```bash
lsof -i :3000           # Trouver le processus
kill -9 <PID>           # Tuer le processus
npm run dev             # Relancer
```

### Erreur "MODULE NOT FOUND" ?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Base de données erreur ?
```bash
# Vérifier CONNECTION_URL dans .env.local
# S'assurer que PostgreSQL est lancé
psql -U postgres        # Tester connexion
npx prisma db push     # Migrer schéma
```

---

## 📚 Ressources

- **Docs Next.js** : https://nextjs.org/docs
- **Tailwind CSS** : https://tailwindcss.com
- **TypeScript** : https://www.typescriptlang.org
- **Supabase** : https://supabase.com/docs
- **Vercel Docs** : https://vercel.com/docs

---

## ✅ Checklist Déploiement

- [ ] Code cloné localement
- [ ] `npm install` exécuté
- [ ] `npm run dev` lancé
- [ ] http://localhost:3000 accédé
- [ ] Recherche testée (tape "lit")
- [ ] Checklist validée
- [ ] Chatbot MAD testé
- [ ] Repo pushé sur GitHub
- [ ] Projet créé sur Vercel
- [ ] Variables d'env configurées
- [ ] Déploiement lancé
- [ ] Production vérifiée
- [ ] PWA installée sur téléphone

---

## 🎉 C'est Bon !

Votre plateforme PSAD LPP Manager est **live et fonctionnelle** !

**Prochaines étapes :**
1. Ajouter base LPP officielle (import CSV)
2. Configurer authentification PSAD/LDAP
3. Intégrer API CPAM si disponible
4. Ajouter dashboard analytique
5. Marketing & onboarding utilisateurs

Besoin d'aide ? → support@psad-france.fr

**Bon déploiement ! 🚀**
