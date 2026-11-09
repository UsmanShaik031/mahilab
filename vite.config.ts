
import { resolve } from "node:path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// Resolve LeafThrough imports to source files during
// development or built library files when requested.
const lib = (entry: string) =>
  process.env.LEAFTHROUGH_DIST
    ? resolve(__dirname, `dist/${entry}.js`)
    : resolve(__dirname, `src/${entry}`);

export default defineConfig({
  // Main demo website
  root: "demo",

  // Relative URLs support assets under different paths.
  base: "./",

  plugins: [react(), vue(), svelte()],

  resolve: {
    alias: [
      {
        find: /^leafthrough\/element$/,
        replacement: lib("element"),
      },
      {
        find: /^leafthrough\/react$/,
        replacement: lib("react"),
      },
      {
        find: /^leafthrough\/vue$/,
        replacement: lib("vue"),
      },
      {
        find: /^leafthrough\/svelte$/,
        replacement: lib("svelte"),
      },
      {
        find: /^leafthrough$/,
        replacement: lib("index"),
      },
    ],
  },

  build: {
    // Vercel must publish this folder.
    outDir: "../dist-demo",

    // Clear old build files.
    emptyOutDir: true,

    // Multi-page demo website.
    rollupOptions: {
      input: Object.fromEntries(
        [
          "index",
          "react",
          "vue",
          "svelte",
          "element",
          "three",
        ].map((name) => [
          name,
          resolve(__dirname, `demo/${name}.html`),
        ])
      ),
    },
  },
});
