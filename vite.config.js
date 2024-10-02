import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import pkg from "./package.json";
import path from "path";

export default defineConfig(({ mode }) => ({
    build: {
        target: "esnext",
    },

    define: {
        APP_NAME: JSON.stringify(pkg.name),
        APP_VERSION: JSON.stringify(pkg.version),
        "import.meta.BIRDEYE_API_KEY": JSON.stringify(
            process.env.BIRDEYE_API_KEY
        ),
        "import.meta.env.HELIUS_API_KEY": JSON.stringify(
            process.env.HELIUS_API_KEY
        ),
        "process.env.NODE_DEBUG": "false",
    },

    kit: {
        modulePreload: {
            polyfill: true,
        },
    },

    optimizeDeps: {
        esbuildOptions: {
            target: "es2020",
        },
    },

    plugins: [
        sveltekit(),
        nodePolyfills({
            globals: {
                Buffer: true,
                global: true,
                process: true,
            },
            protocolImports: true,
        }),
    ],

    resolve: {
        alias: {
            $lib: path.resolve("./src/lib"),
        },
    },

    server: {
        fs: {
            allow: ["."],
        },
    },
}));
