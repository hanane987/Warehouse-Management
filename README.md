# Application de Gestion de Stock

## Description

Cette application vise à moderniser et simplifier la gestion des stocks en fournissant aux magasiniers une interface intuitive. Elle permet une gestion rapide des stocks via un scanner de code-barres ou une saisie manuelle, un suivi en temps réel des produits, et l'ajout simplifié de nouveaux articles.

## Fonctionnalités Principales

1. **Authentification**
   - Chaque utilisateur dispose d'un code secret personnel pour accéder à l'application.

2. **Gestion des Produits**
   - **Identification des produits :**
     - Scanner de code-barres intégré pour une identification rapide en utilisant `expo-camera` (qui inclut désormais la fonctionnalité de scan de code-barres).
     - Saisie manuelle du code-barres en cas de dysfonctionnement du scanner.
   - **Vérification automatique dans la base de données :**
     - *Produit existant :*
       - Possibilité d'ajouter ou de retirer des quantités dans un entrepôt.
       - Affichage des informations du produit (nom, type, prix, quantité disponible par entrepôt).
     - *Produit non existant :*
       - Proposition d’un formulaire de création avec les champs : nom, type, prix, fournisseur, quantité initiale (avec indication de l’entrepôt concerné si supérieure à 0), image du produit (facultatif).

3. **Liste des Produits**
   - Affichage détaillé des produits stockés : nom, type, prix (ex : "Solde", "Prix régulier"), quantité disponible, état du stock (ex : "En stock", "Stock épuisé").
   - Indicateurs visuels :
     - Couleur rouge pour les produits en rupture de stock.
     - Couleur jaune pour les produits en faible quantité (ex : moins de 10 unités).
   - Actions disponibles :
     - Bouton "Réapprovisionner" pour augmenter la quantité.
     - Bouton "Décharger" pour retirer des unités.

4. **Fonctionnalités Avancées**
   - **Filtrage et recherche :**
     - Recherche par nom, type, prix ou fournisseur.
   - **Tri dynamique :**
     - Tri des produits par prix croissant/décroissant, nom alphabétique ou quantité.

5. **Statistiques et Résumé des Stocks**
   - Tableau de bord affichant :
     - Nombre total de produits.
     - Nombre total de villes.
     - Produits en rupture de stock.
     - Valeur totale des stocks.
     - Produits les plus ajoutés/retirés récemment.

6. **Sauvegarde et Export des Données**
   - Exporter un rapport de produit au format PDF en utilisant `expo-print`.

## Configuration du Backend

Un fichier `db.json` est fourni pour simuler une base de données. Pour le démarrer :

1. **Installation de `json-server` :**
   - Installer globalement : `npm install -g json-server`
   - *Remarque :* `json-server` est un outil qui permet de créer une API RESTful simulée rapidement et facilement. Plus d'informations sur [npm](https://www.npmjs.com/package/json-server).

2. **Démarrage du serveur :**
   - Se déplacer vers le répertoire contenant `db.json`.
   - Lancer le serveur avec : `npx json-server db.json`

## Installation du Frontend

1. **Installation des dépendances :**
   - Naviguer vers le répertoire `frontend`.
   - Exécuter : `npm install`

2. **Lancement de l'application :**
   - Démarrer l'application avec : `npx expo start`

## Remarques Importantes

- **Scanner de Code-Barres :**
  - `expo-barcode-scanner` est déprécié depuis la version SDK 51 d'Expo. Il est recommandé d'utiliser `expo-camera`, qui inclut désormais la fonctionnalité de scan de code-barres. Plus d'informations dans la [documentation d'Expo](https://docs.expo.dev/versions/latest/sdk/camera/).

- **Fonctionnalité d'Impression :**
  - `expo-print` fournit une API pour les fonctionnalités d'impression sur Android et iOS (AirPrint). Plus de détails disponibles dans la [documentation d'Expo](https://docs.expo.dev/versions/latest/sdk/print/).

## Contribution

Les contributions sont les bienvenues. Veuillez soumettre une pull request ou ouvrir une issue pour discuter des changements proposés.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
