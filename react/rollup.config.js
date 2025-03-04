import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/components/index.ts", // Entry file where components are exported
  output: [
    {
      file: "dist/index.esm.js",
      format: "esm", // ES module for modern bundlers
      sourcemap: true,
    },
    {
      file: "dist/index.cjs.js",
      format: "cjs", // CommonJS module for Node.js
      sourcemap: true,
    },
  ],
  external: ["react", "react-dom"], // Externalize React to avoid bundling it
  plugins: [
    typescript(),
    resolve({
      extensions: [".ts", ".tsx", ".js", ".jsx"], // Add TypeScript and JSX extensions
    }),
    commonjs(), // Convert CommonJS modules to ES6
    babel({
      exclude: "node_modules/**", // Exclude node_modules from Babel transpiling
      presets: ["@babel/preset-react"],
    }),
  ],
};
