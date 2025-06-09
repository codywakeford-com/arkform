import { defineStore, storeToRefs } from "pinia"
import type { FirebaseApp } from "firebase/app"
import { onAuthStateChanged, type Auth, type User } from "firebase/auth"
import type { Firestore } from "firebase/firestore"
import type { Functions } from "firebase/functions"
import type { FirebaseStorage } from "firebase/storage"
import { ref, Ref } from "vue"

export const useFirebaseStore = defineStore("firebaseStore", () => {
    const emulatorsRunning = ref(false)
    const app = ref<FirebaseApp | null>(null)
    const auth = ref<Auth | null>(null)
    const storage = ref<FirebaseStorage | null>(null)
    const firestore = ref<Firestore | null>(null)
    const functions = ref<Functions | null>(null)

    return {
        app: app as Ref<FirebaseApp>,
        emulatorsRunning,
        auth: auth as Ref<Auth>,
        firestore: firestore as Ref<Firestore>,
        storage: storage as Ref<FirebaseStorage>,
        functions: functions as Ref<Functions>,
    }
})

export type UseFirebase = {
    app: Ref<FirebaseApp>
    emulatorsRunning: Ref<boolean>
    auth: Ref<Auth>
    firestore: Ref<Firestore>
    storage: Ref<FirebaseStorage>
    functions: Ref<Functions>
}

/**A pinia instance that provides full access to all firestore client objects. */
export function useFirebase(): UseFirebase {
    return storeToRefs(useFirebaseStore())
}
