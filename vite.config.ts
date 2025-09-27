import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

// zamieniamy __dirname w ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Hintorium",
      fileName: (format) => `hintorium.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
