// vite.config.js
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pawpals-logo.svg'],
      manifest: {
        name: 'PawPals Pet Clinic',
        short_name: 'PawPals',
        description: 'Pet clinic services and appointments — even offline.',
        theme_color: '#2e7d6b',
        background_color: '#fdfdfb',
        display: 'standalone',
        start_url: '/PawPals/',
        icons: [
          {
            src: '/PawPals/pawpals-logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{html,js,css,svg,png,jpg,jpeg,ico,woff,woff2}'],
        navigateFallback: '/PawPals/offline.html',
        navigateFallbackDenylist: [/^\/api\//],
        importScripts: ['/PawPals/sw-sync.js'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/dummyjson\.com\/products/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'dummyjson-products',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: { enabled: true, type: 'module' },
    }),
  ],
});