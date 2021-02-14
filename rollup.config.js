import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import del from "rollup-plugin-delete";
import scss from "rollup-plugin-scss";
import pkg from "./package.json";
import visualizer from "rollup-plugin-visualizer";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    input: pkg.source,
    output: [
        { file: pkg.main, format: "cjs" },
        { file: pkg.module, format: "esm" },
    ],
    plugins: [
        scss({
            output: "dist/style.css",
        }),
        external(),
        babel({
            exclude: "node_modules/**",
        }),
        del({ targets: ["dist/*"] }),
        visualizer({
            open: true,
        }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
};
