# CV — Florian Guichard

Site vitrine (CV en ligne) de **Florian Guichard — Consultant IA & Data, Cybersécurité, Transition Numérique**.

📍 **En ligne :** [https://floriang66.github.io/CV_Page/](https://floriang66.github.io/CV_Page/)

## Description

Page de CV moderne et responsive, 100 % statique (HTML / CSS / JavaScript), **bilingue français / anglais**. Les contenus sont pilotés par deux fichiers de données (`data.json` et `data.en.json`), ce qui permet de tout modifier sans toucher au code.

## Fonctionnalités

- 🌍 **Bilingue FR / EN** avec bascule instantanée (bouton en haut de page)
- 🎨 Thème sombre / clair (préférence mémorisée)
- 📄 Export PDF 1 page via la feuille de style d'impression (`Ctrl+P` sur PC, `Imprimer` sur mobile)
- 🔍 Filtres de projets par catégorie
- 🔒 Missions clients anonymisées, distinguées des projets publics par leur catégorie
- ➕ Détails dépliants des projets, formations professionnelles et centres d'intérêt
- ✉️ Formulaire de contact (FormSubmit.co → email)
- ♿ Accessible et responsive (burger menu sur mobile)
- 🔗 Open Graph / partage réseaux sociaux

## Structure

```
├── index.html      # Structure de la page
├── data.json       # Données françaises (profil, expériences, projets, compétences…)
├── data.en.json    # Données anglaises, structure identique
├── css/styles.css  # Styles + feuille d'impression (PDF)
├── js/app.js       # Rendu dynamique + bascule de langue
├── tools/          # stamp-assets.mjs (cache-busting)
└── img/            # Photos
```

## Bilingue

- Le bouton **EN / FR** en haut de page bascule la langue sans rechargement : le contenu vient du fichier correspondant et les libellés d'interface (navigation, titres, formulaire, messages) sont traduits par le dictionnaire `I18N` dans `js/app.js`.
- La langue est mémorisée (`localStorage`, clé `cv-lang`) et reflétée dans l'URL (`?lang=en`) pour être partageable.
- `document.documentElement.lang` est mis à jour, ce qui couvre l'accessibilité et le SEO.
- **Pour ajouter ou modifier un texte d'interface** : ajouter la clé dans les deux blocs `fr` et `en` de `I18N`, puis la référencer dans `index.html` via `data-i18n` (texte), `data-i18n-ph` (placeholder) ou `data-i18n-attr` (attributs, ex. `aria-label:nav.menu,title:nav.menu`).
- **Pour modifier un contenu** : éditer `data.json` **et** `data.en.json` en parallèle, en gardant la structure identique.

## Modifier le contenu

1. Éditer `data.json` et `data.en.json` (attention au format JSON valide).
2. Le rendu repose sur la structure du fichier :
   - `profile.bio` → section « Qui suis-je ? ». Une ligne vide (`\n\n`) sépare deux paragraphes
   - `skills[].items[].level` → pourcentage **de 0 à 100**, jamais affiché à l'écran. Il pilote la largeur du remplissage de la pastille (`.sk`) et sa couleur via `SKILL_BANDS` (`js/app.js`) : `haut` ≥ 67 = bleu, `moyen` ≥ 34 = orange, `bas` = rouge. Ajuster un seuil ou une couleur se fait dans `css/styles.css` (`.sk-fill.haut` / `.moyen` / `.bas`)

   - `projects[].status` → mention affichée en badge sur la carte projet (écran) et en italique dans l'aperçu imprimable, pour signaler honnêtement un projet non achevé. Absent = projet terminé
   - `projects[].detail` → tableau de paragraphes affiché dans le `<details>` repliable

> **Projets publics vs missions clients** : les projets open source portent un `link` GitHub et un `status` de travail en cours. Les missions clients n'ont pas de lien et indiquent explicitement que le détail est disponible en entretien. C'est ce qui permet d'être transparent sur le volume d'expériences sans rien diffuser — sans nommer ni le client ni le secteur.

   - `profile.roles` → titre affiché en rotation dans le hero
   - `profile.mobility` → ligne « lieu · mobilité » sous la photo + mention dans « Qui suis-je ? » (masquée si vide)
   - `profile.travel` → précisions sur les déplacements, ajoutées en fin de phrase dans « Qui suis-je ? » (ex. `avec possibilité de me déplacer occasionnellement au besoin`)
   - `search` → bloc « Ce que je recherche » (objet `{ "title", "text" }`, masqué si absent)
   - `trainings[].detail` → détail de la formation (dépliant)
   - `interests[]` → objets `{ "name", "detail" }` (compatibles aussi avec de simples chaînes)
3. Si `css/styles.css` ou `js/app.js` ont changé, lancer `node tools/stamp-assets.mjs` puis commiter.

> Le site étant 100 % statique (aucun build), GitHub Pages sert les assets avec un `max-age` : sans paramètre de version, un simple rechargement peut réafficher l'ancien CSS. Le script estampille `index.html` avec `?v=<empreinte du contenu>` — la version change donc automatiquement dès qu'un fichier change, sans rien incrémenter à la main.

## Lancer en local

```bash
# serveur statique simple (nécessaire pour fetch data.json)
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`. Ouvrir `index.html` en `file://` fonctionne mais retombe sur les données de repli intégrées dans `js/app.js` (le `fetch` est bloqué) : la version anglaise ne sera alors pas disponible.

## Déploiement

Hébergé sur **GitHub Pages** : pousser sur `main` déclenche la mise à jour automatique.

---
© 2026 Florian Guichard