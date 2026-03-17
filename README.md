# Brand Maker

Brand Maker est un projet développé avec [Next.js](https://nextjs.org/) (React 19 & Tailwind CSS v4) qui combine un template de site e-commerce moderne et un puissant éditeur de thème visuel intégré, permettant une personnalisation en temps réel de votre interface.

## 🌟 Fonctionnalités Principales

### 1. Template de Site Storefront
Une structure de page d'accueil complète et modulaire incluant :
- **En-tête (Header)** avec navigation.
- **Bannière (Hero)** dynamique.
- **Catégories** et **Carrousel de Produits**.
- **Tendances** et **Barre d'Information**.
- **Pied de page (Footer)** complet.

### 2. Éditeur de Thème Visuel Avancé (Theme Engine)
Un panneau latéral de personnalisation accessible via un bouton flottant (icône Palette), offrant un contrôle total sur l'UI :
- **Variables Globales et Locales** : Modifiez les couleurs de manière globale (pour l'ensemble de la page) ou spécifiquement pour chaque section indépendante (Header, Hero, etc.).
- **Édition Rapide et Interactive (Quick Picker)** : Double-cliquez directement sur un élément modifiable dans la page pour faire apparaître un sélecteur de couleur contextuel directement à l'emplacement de votre souris.
- **Application Globale Intelligente** : Bouton "Appliquer à tous" dans le Quick Picker permettant de répercuter instantanément un choix de couleur sur l'intégralité des sections du site.
- **Typographie Dynamique** : Basculez en temps réel entre différentes polices pour le corps du texte (ex: Sans) et les accents (ex: Script).
- **Persistance des Données** : Les modifications de thème sont automatiquement sauvegardées de manière persistante sur votre navigateur (`localStorage`).

## 🚀 Démarrage Rapide

Pour lancer le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrez ensuite [http://localhost:3000](http://localhost:3000) dans votre navigateur. 
**Essayez-le :** Double-cliquez sur les textes pour changer leur couleur, ou utilisez l'icône de palette en bas à droite pour ouvrir le panneau principal !
