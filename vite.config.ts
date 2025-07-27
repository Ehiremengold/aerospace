import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import sitemap  from "vite-plugin-sitemap";
import { blogPosts } from "./src/constants";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    sitemap({
      hostname: "https://yourwebsite.com",
      dynamicRoutes: [
        "/",
        "/who-we-are",
        "/what-we-do",
        "/careers",
        "/blog",
        ...blogPosts.map((post) => `/blog-post/${post.slug}`),
      ],
    }),
  ],
  build: {
    minify: "terser",
    cssMinify: true,
  },
});
