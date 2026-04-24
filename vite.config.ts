// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: "autoUpdate",
//       manifest: {
//         name: "2026 DS Fest",
//         short_name: "DSFest",
//         description: "2026 DS Fest",
//         theme_color: "#ffffff",
//         background_color: "#ffffff",
//         display: "standalone",
//         start_url: "/",
//         icons: [
//           {
//             src: "/favicons/favicon.svg",
//             sizes: "any",
//             type: "image/svg+xml",
//           },
//           {
//             src: "/favicons/icon-192x192.png",
//             sizes: "192x192",
//             type: "image/png",
//           },
//           {
//             src: "/favicons/icon-512x512.png",
//             sizes: "512x512",
//             type: "image/png",
//           },
//         ],
//       },
//     }),
//   ],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicons/favicon.svg",
        "favicons/icon-192x192.png",
        "favicons/icon-512x512.png",
      ],
      manifest: {
        name: "2026 DS Fest",
        short_name: "DSFest",
        description: "2026 DS Fest",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/favicons/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
          {
            src: "/favicons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
