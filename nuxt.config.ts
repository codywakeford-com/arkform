// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxt/test-utils/module"],

    vite: {
        server: {
            watch: {
                usePolling: true,
                interval: 100,
            },
        },
    },
})
