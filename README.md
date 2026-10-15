# PawPals Pet Clinic PWA

A progressive web app for PawPals Pet Clinic — a small neighbourhood pet clinic
and shop. Pet owners can browse services, view products, and book appointments
even when their internet is spotty.

**Live site:** https://pawpals-clinic.netlify.app/

## Overview

PawPals is a fully client-side PWA built with Vite and vanilla JavaScript. It
uses a Workbox service worker for offline support, Background Sync for queued
appointment requests, and a small History API router for client-side navigation.

**Key features:**
- Browse services and product listings (cached for offline use)
- Book appointments with live validation and offline queueing
- Dark mode toggle that persists across sessions
- Installable as a home-screen app on mobile and desktop

## Install

Clone the repository and install dependencies:

    git clone https://github.com/jawadiftikhar-dev/PawPals.git
    cd PawPals
    npm install

## Build

Run a production build:

    npm run build

The output is written to `dist/`. Preview the production build locally:

    npm run preview

## Test

Run the Jest test suite:

    npm test

Tests cover the router (route matching, 404 fallback), form validation (labels,
ARIA attributes, live error messages), and offline sync (success vs queued
submissions). The suite runs automatically on every push via GitHub Actions.

## Deploy

This project deploys to Netlify with continuous deployment from the `main`
branch.

**Configuration** (`netlify.toml`):
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect: all unknown paths serve `index.html` (status 200)

**Manual deploy:**

    npm run deploy

**Netlify deploy:** connect the repo at [app.netlify.com](https://app.netlify.com),
and every push to `main` triggers a rebuild automatically.

## Architecture

    pawpals/
    ├── public/
    │   ├── pawpals-logo.svg
    │   ├── offline.html        # fallback page when offline
    │   └── sw-sync.js          # Background Sync handler
    ├── src/
    │   ├── main.js             # entry point
    │   ├── router.js           # History API router
    │   ├── theme.js            # dark mode toggle
    │   ├── install-prompt.js   # PWA install button
    │   ├── booking-queue.js    # (deprecated, logic moved to appointment.js)
    │   ├── pages/              # route views
    │   │   ├── home.js
    │   │   ├── services.js
    │   │   ├── appointment.js  # form + validation + sync
    │   │   ├── products.js
    │   │   └── notFound.js
    │   └── styles/
    │       └── main.css        # light + dark theme variables
    ├── tests/                  # Jest suite
    ├── .github/workflows/
    │   └── test.yml            # CI workflow
    ├── netlify.toml            # Netlify config + SPA redirect
    └── vite.config.js          # Vite + VitePWA config

**Data flow:**
- The router intercepts `[data-link]` clicks and calls `pushState`
- Pages are pure functions returning HTML strings
- The service worker precaches all static assets on install
- Failed form submissions are written to IndexedDB and replayed on sync

## Future Work

- Replace the dummy product API with a real backend
- Add email confirmation via a serverless function
- Support multiple languages
- Add an admin dashboard for managing appointments
- Improve test coverage to include the service worker itself

## License

Released under the MIT License. See [LICENSE](./LICENSE) for the full text.