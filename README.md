# CV — Florian Guichard

Site vitrine (CV en ligne) de **Florian Guichard — Consultant IA & Data, Cybersécurité, Transition Numérique**.

📍 **En ligne :** [https://floriang66.github.io/CV_Page/](https://floriang66.github.io/CV_Page/)

## Description

Page de CV moderne et responsive, 100 % statique (HTML / CSS / JavaScript). Les contenus sont pilotés par un unique fichier de données (`data.json`), ce qui permet de tout modifier sans toucher au code.

## Fonctionnalités

- 🎨 Thème sombre / clair (préférence mémorisée)
- 📄 Export PDF 1 page via la feuille de style d'impression (bouton **PDF**)
- 🔍 Filtres de projets par catégorie
- ➕ Détails dépliants des projets, formations professionnelles et centres d'intérêt
- ✉️ Formulaire de contact (FormSubmit.co → email)
- ♿ Accessible et responsive (burger menu sur mobile)
- 🔗 Open Graph / partage réseaux sociaux

## Structure

```
├── index.html      # Structure de la page
├── data.json       # Toutes les données (profil, expériences, projets, compétences…)
├── css/styles.css  # Styles + feuille d'impression (PDF)
├── js/app.js       # Rendu dynamique depuis data.json
└── img/            # Photos
```

## Modifier le contenu

1. Éditer `data.json` (attention au format JSON valide).
2. Le rendu repose sur la structure du fichier :
   - `profile.bio` → section « Qui suis-je ? ». Une ligne vide (`\n\n`) sépare deux paragraphes
   - `skills[].items[].level` → niveau **qualitatif** (`"Expert"`, `"Avancé"`, `"Pratique"`, `"Notions"`), jamais un pourcentage. Chaque compétence est affichée en pastille (`.sk`) dont le remplissage coloré matérialise le niveau : la largeur vient de `LEVEL_WIDTH` (`js/app.js`). Le libellé reste dans `data.json` et le mot-clé est visible dans la pastille ; modifier un niveau ne demande qu'une retouche de `data.json`
   - `profile.roles` → titre affiché en rotation dans le hero
   - `profile.mobility` → ligne « lieu · mobilité » sous la photo + mention dans « Qui suis-je ? » (masquée si vide)
   - `profile.travel` → précisions sur les déplacements, ajoutées en fin de phrase dans « Qui suis-je ? » (ex. `avec possibilité de me déplacer occasionnellement au besoin`)
   - `search` → bloc « Ce que je recherche » (objet `{ "title", "text" }`, masqué si absent)
   - `projects[].detail` → texte dépliant « En savoir plus »
   - `trainings[].detail` → détail de la formation (dépliant)
   - `interests[]` → objets `{ "name", "detail" }` (compatibles aussi avec de simples chaînes)

## Lancer en local

```bash
# serveur statique simple (nécessaire pour fetch data.json)
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Déploiement

Hébergé sur **GitHub Pages** : pousser sur `main` déclenche la mise à jour automatique.

---
© 2026 Florian Guichard