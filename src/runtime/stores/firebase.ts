import { defineStore } from "pinia"
import type { FirebaseApp } from "firebase/app"
import type { Auth, User } from "firebase/auth"
import type { Firestore } from "firebase/firestore"
import type { Functions } from "firebase/functions"
import type { FirebaseStorage } from "firebase/storage"
import { initializeApp, getApps } from "firebase/app"
import {
    getAuth,
    connectAuthEmulator,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
} from "firebase/auth"
import { getFirestore, connectFirestoreEmulator, setDoc, doc, getDoc } from "firebase/firestore"
import { getFunctions, connectFunctionsEmulator } from "firebase/functions"
import { getStorage, connectStorageEmulator } from "firebase/storage"
import { useArkForm } from "../composables/useArkform"
import { type } from "arktype"

type UseFirebase = {
    app: FirebaseApp
    auth: Auth
    db: Firestore
    storage: FirebaseStorage
    emulatorsRunning: boolean
    functions: Functions
    init: () => void
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

export const useFirebase = defineStore("firebaseStore", (): UseFirebase => {
    const emulatorsRunning = ref(false)
    const app = ref<FirebaseApp>()
    const auth = ref<Auth>()
    const storage = ref<FirebaseStorage>()
    const db = ref<Firestore>()
    const functions = ref<Functions>()
    const user = ref<User | null>()

    const init = () => {
        const $arkform = useArkForm()
        const arkfireConfig = $arkform.config.value.arkfire
        if (!arkfireConfig?.enabled) return

        const firebaseConfig = useRuntimeConfig().public.firebaseConfig as FirebaseConfig

        if (!checkFirebaseConfig(firebaseConfig)) {
        }

        app.value = initializeApp(firebaseConfig)
        auth.value = getAuth(app.value)
        db.value = getFirestore(app.value)

        // Watch for auth state changes
        onAuthStateChanged(auth.value, (firebaseUser) => {
            user.value = firebaseUser
        })

        handleEmulators()
        checkHealth()
    }

    return { app, emulatorsRunning, auth, db, storage, functions, init }
})

function checkHealth() {
    return
    const firebase = useFirebase()
    const failed: string[] = []

    for (const [key, value] of Object.entries(firebase)) {
        if (!value) {
            failed.push(key)
        }
    }

    if (failed.length > 0) {
        for (const item of failed) {
            console.debug(
                `%c [arkfire] Firebase module '${item}' failed to initialize.`,
                "color: orange;",
            )
        }
    }

    const ports = useArkForm().config.value.arkfire.ports

    console.group("[arkfire]: Emulators connected.")
    console.log(`Auth running locally on port ${ports.auth}`),
        console.log(`Firestore running locally on port ${ports.firestore}`),
        console.groupEnd()
}

async function handleEmulators() {
    let { auth, db, emulatorsRunning } = useFirebase() // Pinia store
    const $arkform = useArkForm() // Retrieve form config
    const arkfireConfig = $arkform.config.value.arkfire!
    const ports = arkfireConfig.ports
    const dev = process.env.NODE_ENV === "development"

    if (!auth || !db) {
        console.warn("[arkfire] Firebase modules 'auth' or 'db' are not initialized.")
        return
    }

    if (dev) {
        try {
            connectAuthEmulator(auth, `http://localhost:${ports.auth}`, { disableWarnings: true })
            connectFirestoreEmulator(db, "localhost", ports.firestore)

            emulatorsRunning = true
            console.debug("[arkfire] Firebase emulators connected.")
        } catch (error) {
            console.error("[arkfire] Failed to connect Firebase emulators:", error)
        }
    }

    if (dev && !emulatorsRunning) {
        console.warn(
            "[arkfire] ⚠️ Firebase emulators are NOT connected in development mode. Run firebase emulators:start",
        )
    }
}

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
                "This should be placed in the `nuxt.config.ts` file in the runtimeConfig section.",
        )
        return null
    }

    return config as FirebaseConfig
}
