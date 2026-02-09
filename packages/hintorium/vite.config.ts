import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    cssCodeSplit: true,
    outDir: "dist",
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        styles: path.resolve(__dirname, "src/style.css"),
      },
      name: "Hintorium",
      formats: ["es"],
      fileName: (format, entryName) =>
        entryName === "styles" ? "hintorium.css" : `hintorium.${format}.js`,
    },
    minify: "esbuild",
    rollupOptions: {
      external: ["marked"],
      output: {
        globals: {
          marked: "marked",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "styles.css") {
            return "hintorium-core.css";
          }
          return assetInfo.name!;
        },
      },
    },
  },
});
