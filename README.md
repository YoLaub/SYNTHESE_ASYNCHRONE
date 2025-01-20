# SYNTHESE_ASYNCHRONE

# Synthèse - Météo : DOM / Requête Asynchrone / Librairie Graphique

## Objectif
Créer une page web affichant et mettant en forme des données météorologiques récupérées depuis un service web externe.  
Les principales fonctionnalités à implémenter sont les suivantes :

- **Récupération des données** : depuis la page front-end par des requêtes asynchrones auprès de l'API [Open-Meteo](https://open-meteo.com/en/docs).
- **Filtrage des données** : via des paramètres saisis directement dans la page web, permettant de construire dynamiquement la requête.
- **Format des données** : les données reçues seront au format JSON.
- **Mise en forme** : construction dynamique d'un tableau adapté pour afficher les données reçues.
- **Bonus** : utilisation d'une librairie graphique (par ex. [Chart.js](https://www.chartjs.org/)) pour une visualisation plus attrayante.

---

## Étapes de la Partie Principale

### 1. Étudier l'API Open-Meteo
- Identifier une **valeur à observer** : température, précipitations ou vent (valeurs pertinentes et simples).
- Choisir de 1 à 3 **paramètres de sélection** : 
  - Exemple : lieu de mesure, plage de temps, intervalle entre deux mesures.
- Comprendre la structure de la requête à exécuter via la documentation de l'API.

### 2. Créer une Page de Consultation des Données
- **Zone de saisie** : 
  - Permettre à l'utilisateur d'entrer les paramètres pour filtrer les données.
  - Ajouter un bouton pour soumettre la requête.
- **Zone d'affichage** : 
  - Présenter les données reçues sous forme textuelle ou dans un tableau dynamique.

### 3. Implémenter le JavaScript
- **Construction de la requête** : 
  - Utiliser les paramètres saisis pour créer une URL dynamique.
- **Exécution de la requête** : 
  - Utiliser `fetch` pour envoyer une requête HTTP asynchrone.
- **Traitement de la réponse** : 
  - Récupérer les données au format JSON.
  - Afficher les données textuellement (solution temporaire pour mise au point).

---

## Étapes de la Partie Bonus

### 1. Étudier l'API Chart.js
- Identifier le **type de graphique** adapté aux données (courbes, barres, etc.).
- Étudier les formats de données requis pour l'API.
- Envisager des options supplémentaires : 
  - Popups flottants.
  - Ajustement des échelles et graduations des axes.

### 2. Concevoir une Passerelle de Format
- Adapter les données reçues au format attendu par Chart.js.

### 3. Intégrer Chart.js dans la Page Web
- Remplacer la zone textuelle par un graphique interactif généré avec Chart.js.

### 4. Insérer les Données dans le Graphique
- Alimenter le graphique avec les données météorologiques récupérées.

---

## Résultat Attendu
Une page fonctionnelle permettant :
- De consulter les données météorologiques selon des critères définis par l'utilisateur.
- D'afficher les données de manière claire, soit sous forme de tableau (partie principale), soit avec un graphique interactif (bonus).

