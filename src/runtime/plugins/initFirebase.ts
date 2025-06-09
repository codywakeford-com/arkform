import { initializeApp } from "firebase/app"
import { connectAuthEmulator, getAuth, onAuthStateChanged } from "firebase/auth"
import { connectFirestoreEmulator, getFirestore, initializeFirestore } from "firebase/firestore"
import { useFirebase } from "../stores/firebase"
import { type } from "arktype"
import { connectStorageEmulator, getStorage } from "firebase/storage"

export default defineNuxtPlugin(async (nuxtApp) => {
    let { auth, app, firestore, storage } = useFirebase()
    const config = useRuntimeConfig().public.firebaseConfig

    checkFirebaseConfig(config)

    app.value = initializeApp(config)
    auth.value = getAuth(app.value)
    storage.value = getStorage(app.value)
    firestore.value = getFirestore(app.value)

    await handleEmulators()
})

async function handleEmulators() {
    let { auth, firestore, emulatorsRunning, storage } = useFirebase()

    const dev = process.env.NODE_ENV === "development"
    if (!dev || emulatorsRunning.value) return

    if (!auth?.value || !firestore?.value) {
        console.error("[arkfire]: Firebase modules 'auth' or 'firestore' not ready.")
        return
    }

    try {
        const emulators = useRuntimeConfig().public.firebase.emulators as any

        if (emulators) {
            console.log(
                `[arkfire]: Firebase Emulators UI online:  ${emulators.ui?.host || "localhost"}:${
                    emulators.ui?.port || 4000
                }`
            )
        }

        if (emulators.firestore) {
            const firestoreHost = emulators.firestore?.host || "localhost"
            const firestorePort = emulators.firestore?.port || 8080
            connectFirestoreEmulator(firestore.value, firestoreHost, firestorePort)
            console.log(`[arkfire]: Firestore emulator online: ${firestoreHost}:${firestorePort}`)
        }

        if (emulators.auth) {
            const authHost = emulators.auth?.host || "localhost"
            const authPort = emulators.auth?.port || 9099
            console.log(`[arkfire]: Auth emulator online: ${authHost}:${authPort}`)
            connectAuthEmulator(auth.value, `http://${authHost}:${authPort}`, {
                disableWarnings: true,
            })
        }

        if (emulators.storage) {
            const storageHost = emulators.storage?.host || "localhost"
            const storagePort = emulators.storage?.port || 9199
            console.log(`[arkfire]: Storage emulator online: ${storageHost}:${storagePort}`)
            connectStorageEmulator(storage.value, storageHost, storagePort)
        }
    } catch (error) {
        console.log("An error occured connecting with emulators", error)
    }
    emulatorsRunning.value = true
}

const FirebaseConfigSchema = type({
    apiKey: "string",
    authDomain: "string",
    projectId: "string",
    storageBucket: "string",
    messagingSenderId: "string",
    appId: "string",
    "measurementId?": "string",
})

function checkFirebaseConfig(config: any): FirebaseConfig | null {
    let out = FirebaseConfigSchema(config)

    if (out instanceof type.errors) {
        console.warn(
            "[firebase]: To use arkfire, provide your firebase config object in your public runtimeConfig.\n" +
                "runtimeConfig: {\n" +
                "  public: {\n" +
                "    firebaseConfig: {\n" +
                `        apiKey: "..." \n` +
                `        authDomain: "..."  \n` +
                `        projectId: "..."  \n` +
                `        storageBucket: "..." \n` +
                `        messagingSenderId: "..." \n` +
                `        appId: "..." \n` +
                `        measurementId?: "..." \n` +
                "    }\n" +
                "  }\n" +
                "}\n" +
                "This should be placed in the `nuxt.config.ts` file in the runtimeConfig section."
        )
        return null
    }

    return config as FirebaseConfig
}
