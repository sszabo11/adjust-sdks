import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
  input: "index.ts", // Entry file
  output: {
    file: "dist/index.min.js", // Output file
    format: "iife", // Immediately Invoked Function Expression, works in browsers
    name: "Adjust", // Global variable name exposed to the browser
    sourcemap: true, // Optional: for debugging
  },
  plugins: [
    typescript(),
    resolve(), // Resolve imports from node_modules
    commonjs(), // Handle CommonJS modules
    terser(), // Minify the output
  ],
};
