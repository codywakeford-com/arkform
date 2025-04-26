export default defineNuxtConfig({
    modules: ["../src/module", "@nuxt/icon"],
    devtools: { enabled: true },
    compatibilityDate: "2025-04-15",

    imports: {
        dirs: ["./components/"],
    },

    css: ["@/style/main.scss"],

    arkform: {},

    vite: {
        server: {
            watch: {
                usePolling: true,
                interval: 100,
            },
        },
    },
})
