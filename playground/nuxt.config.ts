import Arkform from "../src/module"

export default defineNuxtConfig({
    modules: [Arkform, "@nuxt/icon"],
    devtools: { enabled: true },
    compatibilityDate: "2025-04-15",

    imports: {
        dirs: ["./components/"],
    },

    devServer: {
        port: 3321,
    },

    css: ["@/style/main.scss"],

    vite: {
        server: {
            watch: {
                usePolling: true,
                interval: 100,
            },
        },
    },
})
