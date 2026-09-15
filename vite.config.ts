import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
      tsconfigPaths({ projects: ["./tsconfig.json"] }),
      tailwindcss(),
      tanstackStart({
        pages: [{ path: "/" }, { path: "/v2" }],
        prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false },
      }),
      cloudflare({ viteEnvironment: { name: "ssr" } }),
      viteReact(),
    ],

    resolve: {
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },

    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },

    server: {
      host: "::",
      port: 8080,
    },
});
