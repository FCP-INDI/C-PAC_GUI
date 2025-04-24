import { defineConfig, globalIgnores } from "eslint/config";
import babel from "@babel/eslint-plugin";
import _import from "eslint-plugin-import";
import promise from "eslint-plugin-promise";
import react from "eslint-plugin-react";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: unicorn.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([globalIgnores([
    "**/logs",
    "**/*.log",
    "**/pids",
    "**/*.pid",
    "**/*.seed",
    "**/lib-cov",
    "**/coverage",
    "**/.grunt",
    "**/.lock-wscript",
    "build/Release",
    "**/.eslintcache",
    "**/node_modules",
    "app/node_modules",
    "**/.DS_Store",
    "**/release",
    "app/main.prod.js",
    "app/main.prod.js.map",
    "app/renderer.prod.js",
    "app/renderer.prod.js.map",
    "app/style.css",
    "app/style.css.map",
    "**/dist",
    "**/dll",
    "**/main.js",
    "**/main.js.map",
    "**/.idea",
    "**/npm-debug.log.*",
    "**/__snapshots__",
    "c-pac",
]), {
    plugins: {
        "@babel": babel,
        import: fixupPluginRules(_import),
        promise,
        compat,
        react,
        unicorn,
        "unused-imports": unusedImports,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: babelParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            allowImportExportEverywhere: true,
        },
    },

    settings: {
        "import/resolver": {
            webpack: {
                config: "config/webpack.config.eslint.js",
            },
        },
    },

    rules: {
        "arrow-parens": ["off"],
        "consistent-return": "off",
        "comma-dangle": "off",
        "generator-star-spacing": "off",
        "import/no-unresolved": "error",
        "import/no-extraneous-dependencies": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "no-console": "off",
        "no-use-before-define": "off",
        "no-multi-assign": "off",
        "promise/param-names": "error",
        "promise/always-return": "error",
        "promise/catch-or-return": "error",
        "promise/no-native": "off",

        "react/sort-comp": ["error", {
            order: [
                "type-annotations",
                "static-methods",
                "lifecycle",
                "everything-else",
                "render",
            ],
        }],

        "react/jsx-no-bind": "off",

        "react/jsx-filename-extension": ["error", {
            extensions: [".js", ".jsx"],
        }],

        "react/prefer-stateless-function": "off",
        "unused-imports/no-unused-imports": "error",
    },
}]);