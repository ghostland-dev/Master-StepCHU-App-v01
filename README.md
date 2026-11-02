## Prise en main du projet STEP CHU Admin

## Scripts disponibles

Dans le répertoire du projet :

### Premier lancement

```bash
npm install
```

### Après l'installation, lancez

```bash
npm start
```

Ouvrez http://localhost:8050 dans votre navigateur pour le visualiser.

### Build pour la production

```bash
npm run build
```

Déployez les fichiers générés dans le dossier `build` sur votre serveur web.

Reportez-vous à la section sur le déploiement: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment) pour plus d'informations.

## Structure du projet

- `public/` ressources publiques comme les images, icônes, css, polices
- `src/assets/` ressources de l'application telles que : scss, thèmes, json.
- `src/components/` composants personnalisés
- `src/context/` logique d'état de la page encapsulant des fonctions réutilisables
- `src/hooks/` hooks de l'application
- `src/i18n/` fichiers de traduction de langue
- `src/layouts/` disposition de l'application
- `src/pages/` composants et logique de l'interface utilisateur des pages de l'application
- `src/App.js` disposition principale de l'application
- `src/index.js` point d'entrée de l'application
- `src/.env` configurations de l'application

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fghostland-dev%2Fstepchu)

Click the button to deploy your own copy on Vercel in one step.

Set these environment variables in the Vercel project settings (see `.env.example`):

- `REACT_APP_API_PATH`
- `REACT_APP_API_URL`
- `REACT_APP_LOCALE`
- `REACT_APP_NAME`
- `REACT_APP_STORAGE_KEY`
