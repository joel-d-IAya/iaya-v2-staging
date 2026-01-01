# Documentation Interne : Structure Directus IAya V2

Cette documentation résume les collections et les relations du CMS Directus utilisées dans le projet IAya V2. Elle sert de base de connaissances pour l'agent IA.

## Collections Principales

### 1. `services`
Définit les services offerts par l'agence, affichés dans la bento grid de la page d'accueil.
- **Champs principaux :**
    - `id` : UUID.
    - `accent_color` : Couleur sémantique (ex: "orange", "turquoise").
    - `home_size` : Relation vers une collection de tailles (utilisé pour les colonnes Tailwind).
    - `show_on_home` : Booléen pour l'affichage en page d'accueil.
    - `internal_name` : Nom technique (ex: "FORMATION - MARKETING").
- **Relations :**
    - `translations` : O2M vers `services_translations`.

### 2. `daily_news`
Articles de veille technologique et actualités IA (Section Pulse).
- **Champs principaux :**
    - `id` : UUID.
    - `publish_date` : Date de publication (utilisée pour le tri et les "Time Pills").
    - `image` : Image mise en avant (ID de fichier).
    - `slug` : Identifiant URL.
- **Relations :**
    - `translations` : O2M vers `daily_news_translations`.

### 3. `recreo` (El Recreo)
Vidéos YouTube et contenus de divertissement/éducation.
- **Champs principaux :**
    - `id` : UUID.
    - `youtube_id` : ID de la vidéo pour l'embed.
    - `video_url` : URL complète.
- **Relations :**
    - `translations` : O2M vers `recreo_translations`.

### 4. `projects`
Projets réalisés par l'agence (Section Portafolio).
- **Champs principaux :**
    - `id` : UUID.
    - `image` : Image du projet.
    - `tech_stack` : Liste de technologies (Array).
- **Relations :**
    - `translations` : O2M vers `projects_translations`.

---

## Système de Traductions

Toutes les collections utilisent un modèle de traduction standardisé via des tables de jonction (`*_translations`).

### Champs Communs dans les Traductions :
- `languages_code` : Code de langue (standardisé : `es-ES`, `en-US`, `fr-FR`).
- `title` : Titre de l'item.
- `summary` / `nexus` : Résumé court ou analyse IA (Nexus Insight).
- `content` / `full_content` : Corps du texte.
- `cta_text` : Texte du bouton d'action.
- `slug` : Version localisée du slug.

---

## Accès aux Assets
Les images sont stockées dans `directus_files`.
- **Méthode d'accès :** Via le proxy `/cms-api/assets/ID_IMAGE`.
- **Authentification :** Le jeton `VITE_DIRECTUS_TOKEN` est automatiquement injecté par le proxy Vite dans le header `Authorization: Bearer ...`.

## Logique de Localisation (Frontend)
La fonction `getLocalizedContent` dans `src/services/api.ts` gère le fallback :
1. Recherche le code exact (ex: `fr-FR`).
2. Recherche par préfixe (ex: `fr`).
3. Fallback sur la première traduction disponible si aucune correspondance n'est trouvée.
