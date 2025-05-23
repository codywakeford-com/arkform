// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxt/test-utils/module", "@pinia/nuxt"],

    runtimeConfig: {
        public: {
            firebaseConfig: {
                firebaseApiKey: "AIzaSyDMSv0-murcR1RtW3lW_mrobxm217DIQjo",
                firebaseAuthDomain: "jdl-designs.firebaseapp.com",
                firebaseProjectId: "jdl-designs",
                firebaseStorageBucket: "jdl-designs.firebasestorage.app",
                firebaseMessagingSenderId: "460036483506",
                firebaseAppId: "1460036483506:web:833ebdb6461d436db55cab",
                firebaseMeasurementId: "G-Z9R4JV869P",
            },
        },
    },

    vite: {
        server: {
            watch: {
                usePolling: true,
                interval: 100,
            },
        },
    },
})
