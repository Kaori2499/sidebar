import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    /^@base-ui\/react/,
    "class-variance-authority",
    "cn",
    "lucide-react",
  ],
  treeshake: true,
});
