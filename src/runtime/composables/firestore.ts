import {
    addDoc,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    DocumentReference,
    deleteField,
    Firestore,
    getDoc,
    onSnapshot,
    setDoc,
    updateDoc,
    arrayUnion,
    QuerySnapshot,
    type DocumentData,
    QueryConstraint,
    query,
    Query,
} from "firebase/firestore"
import { ref } from "vue"
import { uuid } from "./tools"
import { useFirebase, useFirebaseStore, type UseFirebase } from "../stores/firebase"
import { onAuthStateChanged, signOut, updateProfile, type User } from "firebase/auth"
import { pick } from "lodash"
import { useArkForm } from "./useArkform"
import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
    deleteObject,
    getMetadata,
} from "firebase/storage"

export type Split<
    S extends string,
    Delimiter extends string
> = S extends `${infer Head}${Delimiter}${infer Tail}` ? [Head, ...Split<Tail, Delimiter>] : [S]

type FireJoin<T, Env extends "client" | "db" = "client"> = Env extends "db" ? string : T

type MapEnv<T, Env extends "client" | "db"> = T extends FireJoin<infer U, any>
    ? Env extends "db"
        ? string
        : T
    : T

export type GetTypeAtPath<
    TSchema extends Record<string, CollectionDef>,
    TPath extends string[],
    Env extends "client" | "db" = "client"
> = TPath extends [infer C1 extends keyof TSchema & string]
    ? MapEnv<TSchema[C1]["$doc"][], Env>
    : TPath extends [infer C1 extends keyof TSchema & string, infer DocId extends string]
    ? DocId extends keyof TSchema[C1]
        ? MapEnv<TSchema[C1][DocId], Env>
        : MapEnv<TSchema[C1]["$doc"], Env>
    : TPath extends [
          infer C1 extends keyof TSchema & string,
          infer DocId extends string,
          ...infer Rest extends string[]
      ]
    ? TSchema[C1]["$collections"] extends infer Subs extends Record<string, CollectionDef>
        ? GetTypeAtPath<Subs, Rest, Env>
        : never
    : never

export type GetTypeAtStringPath<
    TSchema extends Record<string, CollectionDef>,
    Path extends string,
    Env extends "client" | "db" = "client"
> = GetTypeAtPath<TSchema, Split<Path, "/">, Env>

type R0 = GetTypeAtStringPath<MySchema, "users"> // -> { name: string; id: string }[]
type R1 = GetTypeAtStringPath<MySchema, "users/123"> // -> { name: string; id: string }
type R2 = GetTypeAtStringPath<MySchema, "users/123/emails"> // -> { id: string }[]
type R3 = GetTypeAtStringPath<MySchema, "users/123/friends/abc123"> // -> { id: string }
type R4 = GetTypeAtStringPath<MySchema, "customers/789"> // -> { name: string; customerName: string }
type R5 = GetTypeAtStringPath<MySchema, "users/randomDocId"> // -> { name: string; customerName: string }

export type RefOptions = {
    textSearch?: boolean
    query?: QueryConstraint[]
}

export type HelloThere = {
    myrandomdata: "hello data hello"
}

// testing schema
export interface MySchema extends FirestoreSchema {
    users: {
        $doc: {
            id: string
            name: FireJoin<HelloThere>
        }
        randomDocId: HelloThere
        $collections: {
            emails: {
                $doc: {
                    email: HelloThere
                }
                $collections: {}
            }
        }
    }
}

export type CollectionDef<Document = any> = {
    $doc: Document
    $collections: FirestoreSchema
}

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never
export type FirestoreSchema = Record<string, CollectionDef>

export type FireDocRef<Data> = {
    /**Reactive reference in sync with firestore. */
    ref: () => Ref<Data | null>

    /**Updates the firestore document, creates it if it doesnt exist. */
    set<TFull extends boolean = false>(
        data: TFull extends true ? Data : Partial<Data>
    ): Promise<void>

    /**Removes the document from firestore. */
    destroy(): Promise<void>

    /**Stops listening for changes */
    unsubscribe: () => void

    /**exists */
    exists: () => boolean

    /**A promise that resolves when the initial firestore read has been completed.
     * ```typescript
     * await awaitData()
     * ``` */
    awaitData: () => Promise<void>
}

export type FireColRef<Data> = {
    /**Reactive reference in sync with firestore. */
    ref: () => Ref<Data>

    /**Updates a document in the collection */
    update: (id: string, data: any) => Promise<void>
    /**Add a document to firestore collection. */
    push: (data: Data) => Promise<void>
    /**Remove a document from the collection. */
    destroy: (id: string) => Promise<void>

    /**Stops listening for changes */
    unsubscribe: () => void
}

export type FireStorageRef = {
    /** Reactive download URL (null if not available) */
    url: () => Ref<string | null>

    /** Uploads a file to storage */
    upload: (file: File | Blob, metadata?: Record<string, any>) => Promise<void>

    /** Deletes the file from storage */
    destroy: () => Promise<void>

    /** Gets the file's current download URL */
    getDownloadURL: () => Promise<string>

    /** Fetches file metadata */
    getMetadata: () => Promise<any>
}

// const firestore = defineFirestoreSchema<MySchema>()
// const users = $doc("users/124")
// const user2 = $doc("users/123")
// Example Join: $users/123 - $, firestore path

export type ArkFirestore<Schema extends FirestoreSchema, UserType> = {
    /**Typesafe reference to a document in firestore. */
    $doc<const Path extends string>(
        path: Path,
        options?: RefOptions
    ): FireDocRef<GetTypeAtStringPath<Schema, Path>>

    /**Typesafe reference to a collection in firestore. */
    $col<const Path extends string>(
        path: Path,
        options?: RefOptions
    ): FireColRef<GetTypeAtStringPath<Schema, Path>>

    /**Current user global reference. */
    $user: $user<UserType>

    $file: (path: string) => {
        url: () => Promise<string | null>
        destroy: () => Promise<void>
        upload: (file: Blob | Uint8Array | ArrayBuffer) => Promise<void>
    }
}

type FirebaseUser = {
    uid: string | null
    displayName: string | null
    email: string | null
    emailVerified: boolean | null
}

/**Currently logged in user. */
export type $user<UserType> = {
    /**A reactive reference to the firebase auth user combined with the user doc you specified.  */
    ref: () => Ref<UserType>

    /**Get the user profile document from firestore. */
    read: () => Promise<UserType | null>

    /**Sign out the user, optionally pass a path the user should be sent to once logged out.*/
    signout: (path?: string) => Promise<any>

    /**Make changes to the user data. Changes made to mutable firebase auth attributes will be applied to firebase.  */
    set: (data: Partial<UserType>) => Promise<void>

    /**Check if the current user has permissions. Assign roles in your arkform.config.ts */
    hasPermission: () => boolean

    /**Checks if a user can access a route. */
    canAccess: (path: string) => boolean
}

/**Specify roles allow for each route. */
export type RouteRoles = {
    [key: string]: string[]
}

/**Here you can pass in your Firestore schema type. */
export function defineFirestoreSchema<
    const Schema extends FirestoreSchema,
    UserType
>(): ArkFirestore<Schema, UserType> {
    const { auth, firestore } = useFirebase()

    const user = ref<UserType>({
        uid: null,
        email: null,
        displayName: null,
        emailVerified: null,
    })

    const exists = ref(false)

    onAuthStateChanged(auth.value, async (firebaseUser) => {
        if (!firebaseUser?.uid) {
            user.value = {
                uid: null,
                email: null,
                displayName: null,
                emailVerified: null,
            }

            exists.value = false
            return
        }

        const profileRef = arkfire.$doc(`users/${firebaseUser.uid}`).ref()

        exists.value = true
        watchEffect(() => {
            user.value = {
                ...profileRef.value,
                uid: firebaseUser.uid || null,
                email: firebaseUser.email || null,
                displayName: firebaseUser.displayName || null,
                emailVerified: firebaseUser.emailVerified || null,
            }
        })
    })

    const arkfire: ArkFirestore<Schema, UserType> = {
        $user: {
            ref: () => {
                return user as Ref<(FirebaseUser & UserType) | null>
            },

            set: async (data: Partial<UserType>) => {
                let profileUpdates = pick(data, ["displayName", "photoUrl"])

                await updateProfile(auth.value.currentUser!, profileUpdates)

                const userDoc = arkfire.$doc(`users/${user.value?.uid}`)
                await userDoc.set(data)

                return
            },

            read: async (): Promise<UserType | null> => {
                const docRef = doc(firestore.value, `users/${user.value?.uid}`)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    return docSnap.data() as UserType
                } else {
                    return null
                }
            },

            exists: () => {
                return exists.value
            },

            canAccess: () => {},
            signout: async (path: string) => {
                await signOut(auth.value)

                if (path) {
                    return navigateTo(path)
                }
            },

            hasPermission: (resource: Name, action: Action): boolean => {
                // get ark config permissions
                // check role
                // if no role error

                if (!user.value?.roles) return false

                const roles = user.value.roles

                return roles.some((role) => {
                    return roles[role]?.[resource]?.[action] === true
                })
            },
        },

        $col<const Path extends string>(
            path: Path,
            options?: RefOptions
        ): FireColRef<GetTypeAtStringPath<Schema, Path>> {
            type FirestoreType = GetTypeAtStringPath<Schema, Path>
            type FirestoreTypeRaw = GetTypeAtStringPath<Schema, Path, "db">

            const { firestore } = useFirebase()
            console.log(firestore)
            const dataRef = ref<FirestoreType>([])
            const raw = ref<any | null>(null)
            let colRef = collection(firestore.value, path)
            let finalQuery: Query = colRef

            let unsubscribe = () => {}

            if (options?.query && options.query.length > 0) {
                finalQuery = query(colRef, ...options.query)
            }
            return {
                ref: () => {
                    unsubscribe = onSnapshot(
                        finalQuery,
                        async (snap: QuerySnapshot<DocumentData>) => {
                            snap.docChanges().forEach((change) => {
                                switch (change.type) {
                                    case "added":
                                        console.log("New doc added: ", change.doc.data())
                                        break
                                    case "modified":
                                        console.log("Doc modified: ", change.doc.data())
                                        break
                                    case "removed":
                                        console.log("Doc removed: ", change.doc.data())
                                        break
                                }
                            })

                            const documentsData = snap.docs.map((doc) => doc.data())

                            dataRef.value = documentsData
                            raw.value = documentsData
                        }
                    )

                    return dataRef
                },

                add: async (data: FirestoreType | FirestoreType[]) => {
                    const { firestore } = useFirebase()
                    let docs = []
                    if (!Array.isArray(data)) {
                        docs.push(data)
                    } else {
                        docs.push(...data)
                    }

                    for (let item of docs) {
                        const docRef = doc(firestore.value, `${path}/${uuid()}`)
                        setDoc(docRef, item)
                    }
                },

                update: async (id: string, data: any) => {
                    const { firestore } = useFirebase()
                    const docRef = doc(firestore.value, `${path}/${id}`)
                    await updateDoc(docRef, data)
                },

                destroy: async (id: string) => {
                    const { firestore } = useFirebase()
                    const docRef = doc(firestore.value, `${path}/${id}`)

                    await deleteDoc(docRef)
                },

                unsubscribe: () => unsubscribe(),
            }
        },

        // Reference
        $file: async (path: string) => {
            const { storage } = useFirebase()
            const fileRef = storageRef(storage.value, path)

            return {
                url: async (options?: { download?: boolean }) => {
                    const downloadUrl = await getDownloadURL(fileRef)

                    console.log(downloadUrl)
                    return downloadUrl
                },

                upload: async (file: Blob | Uint8Array | ArrayBuffer) => {
                    await uploadBytes(fileRef, file)
                },

                destroy: async () => {
                    await deleteObject(fileRef)
                },
            }
        },
        $doc<const Path extends string>(
            path: Path,
            options?: RefOptions
        ): FireDocRef<GetTypeAtStringPath<Schema, Path>> {
            type FirestoreDocType = GetTypeAtStringPath<Schema, Path>

            const { firestore } = useFirebase()
            const docRef = doc(firestore.value, path) as DocumentReference
            const dataRef = ref<FirestoreDocType | null>(null)
            const raw = ref<any | null>(null)
            let unsubscribe = () => {}

            let resolveReady: () => void
            const ready = new Promise<void>((resolve) => {
                resolveReady = resolve
            })

            return {
                ref: () => {
                    getDoc(docRef)
                        .then((snap) => {
                            if (snap.exists()) {
                                dataRef.value = snap.data() as FirestoreDocType
                                raw.value = snap.data()
                            } else {
                                dataRef.value = null
                                raw.value = null
                            }

                            resolveJoins(firestore.value, dataRef)
                            resolveReady()
                        })
                        .catch(() => resolveReady())

                    const unsubscribe = onSnapshot(docRef, async (snap) => {
                        if (!snap.exists()) {
                            dataRef.value = null
                            raw.value = null
                            return
                        }

                        dataRef.value = snap.data() as any
                        raw.value = snap.data() as any

                        resolveJoins(firestore.value, dataRef)
                        resolveReady()
                    })

                    return dataRef
                },

                awaitData: () => ready,

                set: async <TFull extends boolean>(
                    newData: TFull extends true ? FirestoreDocType : Partial<FirestoreDocType>
                ) => {
                    if (!newData) return

                    const oldData = { ...dataRef.value }

                    const updatesForThisDoc: Record<string, any> = {}
                    const updatesToJoins: Promise<any>[] = []

                    // find joins
                    for (const [key, value] of Object.entries(newData)) {
                        const isJoin = isJoinKey(value, raw.value?.[key])

                        if (isJoin) {
                            const joinPath = raw.value?.[key] as string // e.g., "$users/123"
                            const absolutePath = joinPath.slice(1) // "users/123"
                            const docRef = doc(firestore.value, absolutePath)

                            updatesToJoins.push(setDoc(docRef, newData, { merge: false }))
                            continue
                        }

                        updatesForThisDoc[key] = value
                    }

                    // Optimistic
                    dataRef.value = {
                        ...dataRef.value,
                        ...updatesForThisDoc,
                    }

                    try {
                        if (Object.keys(updatesForThisDoc).length > 0) {
                            await setDoc(docRef, updatesForThisDoc, { merge: true })
                        }
                        await Promise.all(updatesToJoins)
                    } catch (e) {
                        dataRef.value = oldData // rollback
                    }
                },

                destroy: async () => {
                    try {
                        await deleteDoc(docRef)
                        unsubscribe()
                        dataRef.value = null
                    } catch (e) {
                        console.log("Failed to delete document", docRef.path)
                    }
                },

                unsubscribe: () => unsubscribe(),
            }
        },
    }
    return arkfire as ArkFirestore<Schema>
}

// currentValue can be any object, if its position matches
export function isJoinKey(currentValue: any, path: any): boolean {
    if (typeof path === "string" && typeof currentValue === "object") {
        return path.startsWith("$")
    }

    return false
}

type Flag = {
    [key: string]: boolean | Flag
}

export function defineFlags<const Data extends Flag>(data: Data) {
    const $flags = ref<Data>(data)

    return {
        ref: (): Ref<Readonly<Data>> => {
            return $flags
        },

        set: (data: Partial<Data>) => {
            Object.assign($flags.value, data)
        },

        value: () => {
            return $flags.value as Data
        },
    }
}

function defineNotifications() {
    return {
        useMessage: (name: string) => {},
        sendMessage: () => {},
    }
}

type UnsubMap = Record<string, () => void>

export function resolveJoins(
    firestore: Firestore,
    dataRef: Ref<any>,
    visited = new Set<string>(),
    unsubscribers: UnsubMap = {}
) {
    const start = performance.now()
    function walk(value: any, parent: any, key?: string | number) {
        if (typeof value === "string" && value.startsWith("$doc/")) {
            const path = value.replace("$doc/", "")

            if (visited.has(path)) return
            visited.add(path)

            const docRef = doc(firestore, path)

            const unsub = onSnapshot(docRef, (snap) => {
                if (!snap.exists()) return
                const joined = snap.data()

                if (Array.isArray(parent)) {
                    parent.splice(key as number, 1, joined)
                } else if (key !== undefined) {
                    console.log("Setting value")
                    parent[key] = joined
                }

                walk(joined, parent, key)
            })

            unsubscribers[path] = unsub
            return
        } else if (typeof value === "string" && value.startsWith("$col/")) {
            const path = value.replace("$col/", "")

            if (visited.has(path)) return
            visited.add(path)
            const colRef = collection(firestore, path)

            const unsub = onSnapshot(colRef, (snap) => {
                const joined = snap.docs.map((doc) => doc.data())

                // Replace the placeholder string with the actual array
                if (Array.isArray(parent)) {
                    parent.splice(key as number, 1, joined)
                } else if (key !== undefined) {
                    parent[key] = joined
                }

                // Walk into each joined document in the collection
                joined.forEach((doc, idx) => {
                    walk(doc, parent[key], idx)
                })
            })

            unsubscribers[path] = unsub
            return
        } else if (typeof value === "string" && value.startsWith("$table/")) {
            const path = value.replace("$table/", "")

            if (visited.has(path)) return
            visited.add(path)

            const docRef = doc(firestore, path)

            const unsub = onSnapshot(docRef, (snap) => {
                if (!snap.exists()) return
                const joined = snap.data().joins as string[]

                if (Array.isArray(parent)) {
                    parent.splice(key as number, 1, joined)
                } else if (key !== undefined) {
                    parent[key] = joined
                }

                walk(joined, parent, key)
            })

            return
        }

        if (Array.isArray(value)) {
            value.forEach((item, idx) => {
                walk(item, value, idx)
            })
            return
        }

        if (value && typeof value === "object") {
            Object.entries(value).forEach(([prop, val]) => {
                walk(val, value, prop)
            })
            return
        }
    }

    walk(dataRef.value, dataRef.value)
    const end = performance.now()
    console.log(`resolveJoins setup took ${end - start} ms`)
    return () => {
        Object.values(unsubscribers).forEach((fn) => fn())
    }
}
