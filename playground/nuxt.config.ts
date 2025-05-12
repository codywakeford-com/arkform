import Arkform from "../src/module"

export default defineNuxtConfig({
    modules: [Arkform, "@nuxt/icon"],
    devtools: { enabled: true },
    compatibilityDate: "2025-04-15",

    runtimeConfig: {
        public: {
            firebaseConfig: {
                apiKey: "AIzaSyDMSv0-murcR1RtW3lW_mrobxm217DIQjo",
                authDomain: "jdl-designs.firebaseapp.com",
                projectId: "jdl-designs",
                storageBucket: "jdl-designs.firebasestorage.app",
                messagingSenderId: "460036483506",
                appId: "1:460036483506:web:833ebdb6461d436db55cab",
                measurementId: "G-Z9R4JV869P",
            },
        },
    },

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
