import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-macros", "babel-plugin-styled-components"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@application": path.resolve(__dirname, "src/application"),
      "@domain": path.resolve(__dirname, "src/domain"),
      "@adapters": path.resolve(__dirname, "src/adapters"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@infra": path.resolve(__dirname, "src/infra"),
      "@presentation": path.resolve(__dirname, "src/infra/presentation"),
      "@test": path.resolve(__dirname, "test"),
    },
  },
});
