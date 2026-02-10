import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ["src"],
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "HintoriumReact",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "hintorium-core"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "hintorium-core": "Hintorium",
        },
        sourcemap: false,
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
