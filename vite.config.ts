import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    reactRouter(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Rafi Portfolio",
        short_name: "R-Portfolio",
        description: "Portofolio of Rafi Abdillah F",
        theme_color: "#0a0a0a",
        background_color: "#0a0a0a",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "/images/favicon.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/images/favicon.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 }
            }
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
