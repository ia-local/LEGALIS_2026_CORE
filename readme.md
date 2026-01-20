# 🏛️ LÉGALIS-FR 2026 | Projet de Loi Citoyen i-5049

## 📝 Présentation
Système de plaidoyer digital pour la dépénalisation et la valorisation industrielle du chanvre en France (Horizon 2026).

## ⚙️ Architecture Système (v1.0.0)
- **Port d'écoute local** : 1193 (Social Reference)
- **Répertoire de déploiement** : `/docs` (GitHub Pages)
- **Kernel** : `LEGALIS_2026_CORE.js` (DataLoader & Logic)
- **Modèle d'Inférence** : Llama-3.1-Instant via Groq LPU

## 🚀 Piliers Stratégiques
1. **Dépénalisation** : Réforme Art. 222-37 du Code Pénal.
2. **Souveraineté** : Partenariat EuropaFi (Billets de banque en chanvre).
3. **Santé** : Protocoles RDR & textiles hospitaliers antibactériens.

## 📊 KPI Économiques
- **Impact PIB** : +1.2%
- **Répartition Taxes** : 40% Santé / 30% Éducation / 30% Sécurité.


# CAHIER DES CHARGES : PLATEFORME "LÉGALIS-FR 2026"
## Objectif : Plaidoyer Digital pour la Réforme du Code Pénal et la Valorisation du Chanvre

---

### 1. IDENTITÉ DU PROJET
* **Nom de code :** LÉGALIS-FR 2026
* **Statut :** Initiative Citoyenne (Pétition i-5049)
* **Style Visuel :** "Glassmorphism" Institutionnel, épuré, typographie Monospace (Technique/Juridique), Palette : Vert Forêt (#1A3C34), Blanc Pur, Gris Acier.

### 2. ARCHITECTURE DES FICHIERS (STRUCTURE REQUise)
* `index.html` : Interface principale (Single Page Application).
* `studio.css` : Design "Resolve-style" (Blur, Inertia, Responsive 9:16 & Desktop).
* `main.js` : Contrôleur d'interactivité et navigation.
* `legal_core.json` : Base de données de la réforme (Articles de loi, Amendements).
* `data_intl.json` : Comparateur international (USA 2014, DE 2024, NL).

### 3. SPÉCIFICATIONS FONCTIONNELLES (LES PILIERS)

#### A. Le Hub Législatif (Réforme de l'Art. 222-37)
* **Fonction :** Comparateur "Avant/Après" la réforme.
* **Contenu :** Explication de la dépénalisation de l'usage simple vs maintien des peines pour le grand trafic.
* **Action :** Bouton "Lire la Proposition de Loi (PPL)" ouvrant un drawer latéral.

#### B. Le Module RDR & Santé (Réduction des Risques)
* **Données :** Intégration des alertes addiction (référentiel ANSM).
* **Fonction :** Simulateur de composition (THC/CBD) et traçabilité pour éliminer les produits de synthèse.
* **Visualisation :** Graphique sur le financement de la prévention via la taxe cannabis.

#### C. L'Industrie du Chanvre (Souveraineté 2026)
* **Usage 1 :** Textile Hospitalier (Fibre antibactérienne, draps, masques).
* **Usage 2 :** Éco-construction (Béton de chanvre, puits de carbone).
* **Rendu :** Animation Warp-ASCII de la structure moléculaire de la fibre de chanvre.

#### D. Le Terminal de Votation
* **Lien Permanent :** `https://petitions.assemblee-nationale.fr/initiatives/i-5049`
* **CTA :** Bouton "Signer sur le portail de l'Assemblée" (Notification de nécessité FranceConnect).

### 4. COMPOSANTS INTERACTIFS (MASTER PROMPTS /GEM)
* **Drawer Gauche (Media) :** Galerie d'images haute définition sur les applications industrielles.
* **Drawer Droit (AI) :** Assistant de réponse aux FAQ sur la légalisation (arguments contre-argumentés).
* **HUD :** Affichage dynamique du compteur de temps restant avant la fin de l'expérimentation médicale (31 mars 2026).

---
### 5. MATRICE DE DONNÉES (JSON EXEMPLE)
```json
{
  "international_benchmarks": [
    { "country": "USA", "year": 2014, "impact": "Taxation / Écoles", "status": "Légal" },
    { "country": "Germany", "year": 2024, "impact": "Club Social / Santé", "status": "Légal" },
    { "country": "France", "year": 2026, "impact": "Industrie / Dépénalisation", "status": "En cours" }
  ]
}
# MASTER CONFIG : PROJECT LÉGALIS-FR 2026
## Role: Interface & UX Architect | Context: Digital Lobbying & Legal Reform

---

### I. REQUIS TECHNIQUES (ROOT)
1. **FRAMEWORK** : HTML5/CSS3/JS database.json (Zero dépendance externe pour la pérennité).
2. **DESIGN SYSTEM** : Resolve-style. Dark mode par défaut. Accents Vert Émeraude (#2ECC71).
3. **FILES TO GENERATE** : [index.html, studio.css, main.js, legal_core.json, industrial_matrix.json].

### II. COMPOSANTS CRITIQUES
1. **HERO SECTION** : Logo Warp-ASCII "LÉGALIS-FR". Compteur de temps réel avant le 31/03/2026 (Fin expérimentation ANSM).
2. **THE FIDUCIARY ENGINE** : Module interactif présentant le partenariat EuropaFi. Visualisation d'un billet de banque 2026 avec texture de chanvre.
3. **TAX CALCULATOR** : Un curseur permettant à l'utilisateur de simuler le gain pour le PIB français selon le volume de vente légalisé.
4. **PETITION GATEWAY** : Overlay permanent en bas à droite pointant vers i-5049.

### III. LOGIQUE JURIDIQUE
- Intégrer la réforme de l'Art. 222-37 (Dépénalisation) et l'Art. L. 3421-1 (RDR).
- Section "Transparence" : Affichage des flux financiers (de la récolte à la taxe d'État).

### IV. NAVIGATION (DRAWERS)
- **LEFT-ASIDE (Media)** : Zoom sur les textiles hospitaliers et les billets EuropaFi.
- **RIGHT-ASIDE (System)** : FAQ dynamique et simulateur de réduction des risques (RDR).

---
READY FOR INITIALIZATION.
{
  "fiscal_strategy": {
    "tax_model": "TVA Sociale Cannabis (20%) + Accise Spécifique",
    "pib_impact_projection": "+1.2% à l'horizon 2028",
    "revenue_allocation": [
      { "target": "Prévention & Santé", "percentage": 40 },
      { "target": "Éducation & Recherche", "percentage": 30 },
      { "target": "Sécurité & Justice", "percentage": 30 }
    ],
    "industrial_innovation": {
      "partner": "EuropaFi (Papeterie Fiduciaire)",
      "project": "Billet de Banque en Fibre de Chanvre",
      "benefits": [
        "Durabilité accrue (3x supérieure au papier coton)",
        "Sécurité anti-contrefaçon (biopolymères naturels)",
        "Écologie (réduction de l'empreinte carbone de la zone Euro)"
      ],
      "denominations": ["5€", "10€", "20€", "50€"]
    }
  }
}
---
*Initiative enregistrée sous l'ID i-5049 sur le portail de l'Assemblée Nationale.*