# Site statique — Nail artist

Site statique (HTML/CSS/JS minimal) pour prothésiste ongulaire.

## Workflows GitHub Actions
- CI (lint/debug) : `.github/workflows/ci.yml`
- Deploy Netlify (preview + prod) : `.github/workflows/netlify.yml`

## Pages
- `index.html` (Accueil)
- `services.html` (Prestations)
- `gallery.html` (Galerie)
- `about.html` (À propos)
- `contact.html` (Contact + formulaire statique Netlify)

## Personnalisation rapide
- Remplacer `[Nom de la prothésiste]` sur les pages.
- Mettre à jour les liens WhatsApp/Instagram et le numéro de téléphone.

---

## Développement local

Prérequis : Node.js 20+.

```bash
npm install
npm run dev
```

## Qualité / Debug (CI)

```bash
npm run lint:html
npm run lint:css
```

---

## Déploiement Netlify

Ce repo est prêt pour Netlify :
- `netlify.toml` définit `publish = "."`.
- Aucun build requis.

### Formulaire Netlify
Le formulaire de `contact.html` utilise `data-netlify="true"`.

### GitHub Actions (Preview + Prod)

- **Pull Request** : deploy preview Netlify
- **main** : deploy production Netlify

#### Secrets GitHub à ajouter
Dans GitHub → Settings → Secrets and variables → Actions :
- `NETLIFY_AUTH_TOKEN` : token Netlify (User settings → Applications → Personal access tokens)
- `NETLIFY_SITE_ID` : Site ID (Netlify → Site settings → Site details)

Une fois ces secrets configurés, chaque PR aura une URL de preview et chaque push sur `main` déploiera en prod.

### Notes importantes
- Le workflow utilise le dossier racine comme `--dir=.` (site statique, pas de build).
- Les photos sont chargées via URLs externes (Unsplash) : si vous voulez du 100% offline, remplacez-les par des images locales dans `assets/`.

---

## Déploiement Vercel (option)

- Framework : "Other"
- Output directory : `.`
- Build command : vide