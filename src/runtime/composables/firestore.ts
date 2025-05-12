import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentReference, deleteField, Firestore, getDoc, onSnapshot, setDoc, updateDoc, arrayUnion } from "firebase/firestore"
import { useFirebase } from "../stores/firebase"
import { ref, type Ref } from "vue"

export type Split<S extends string, Delimiter extends string> = S extends `${infer Head}${Delimiter}${infer Tail}` ? [Head, ...Split<Tail, Delimiter>] : [S]

export type GetTypeAtPath<TSchema extends Record<string, CollectionDef>, TPath extends string[]> =
    // 1 segment → collection array
    TPath extends [infer C1 extends keyof TSchema & string]
        ? TSchema[C1]["$doc"][]
        : // 2 segments → single doc
          TPath extends [infer C1 extends keyof TSchema & string, infer _Id extends string]
          ? TSchema[C1]["$doc"]
          : // 3+ segments → recurse into sub‑collections
            TPath extends [infer C1 extends keyof TSchema & string, infer _Id extends string, ...infer Rest extends string[]]
            ? TSchema[C1]["$collections"] extends infer Subs extends Record<string, CollectionDef>
                ? GetTypeAtPath<Subs, Rest>
                : never
            : never

export type GetTypeAtStringPath<TSchema extends Record<string, CollectionDef>, Path extends string> = GetTypeAtPath<TSchema, Split<Path, "/">>

type R0 = GetTypeAtStringPath<MySchema, "users"> // -> { name: string; id: string }[]
type R1 = GetTypeAtStringPath<MySchema, "users/123"> // -> { name: string; id: string }
type R2 = GetTypeAtStringPath<MySchema, "users/123/friends"> // -> { id: string }[]
type R3 = GetTypeAtStringPath<MySchema, "users/123/friends/abc123"> // -> { id: string }
type R4 = GetTypeAtStringPath<MySchema, "customers/789"> // -> { name: string; customerName: string }

export type RefOptions = {
    textSearch: boolean
}

type MySchema = {
    users: {
        $doc: {
            name: string
        }
    }
}

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never
export type FirestoreSchemaBase = {
    [key: string]: CollectionDef
}

export type CollectionDef<Document = any, Collection extends Record<string, CollectionDef> = {}> = {
    $doc: Document
    $collections?: Collection
}

export type FireDocRef<Data> = Expand<
    Ref<Data | null> & {
        set(data: Partial<Data>): Promise<void>
        destroy(): Promise<void>
    }
>

export type FireColRef<Data> = Expand<
    Ref<Data[] | null> & {
        set(data: Partial<Data>): Promise<void>
        push(data: Data): Promise<void>
        destroy(): Promise<void>
    }
>
const firestore = defineFirestoreSchema<MySchema>()
const users = firestore.docRef("users/123")

export type ArkFirestore<Schema extends FirestoreSchemaBase> = {
    docRef<const Path extends string>(data: Path): FireDocRef<GetTypeAtStringPath<Schema, Path>>
}

export function defineFirestoreSchema<const Schema extends FirestoreSchemaBase>(): ArkFirestore<Schema> {
    console.log("hello")

    const firestore: ArkFirestore<Schema> = {
        docRef<const Path extends string>(path: Path, options?: RefOptions): FireDocRef<GetTypeAtStringPath<Schema, Path>> {
            type FirestoreDocType = GetTypeAtStringPath<Schema, Path>

            if (!import.meta.client) {
                const fakeRef = ref(null) as FireDocRef<FirestoreDocType>
                fakeRef.set = async () => {}
                return fakeRef
            }

            const db = useFirebase().db
            const dataRef = ref<FirestoreDocType>()
            const raw = ref<any | null>(null)

            const docRef = doc(db, path) as DocumentReference

            const unsubscribe = onSnapshot(docRef, async (snap) => {
                if (!snap.exists()) {
                    dataRef.value = null
                    raw.value = null
                    return
                }

                dataRef.value = snap.data() as any
                raw.value = snap.data() as any

                resolveJoins(snap.data())
            })

            const joinsMap = ref<Record<string, any>>({})
            const joinUnsubscribers: Record<string, () => void> = {}

            function resolveJoins(data: any, visited = new Set<string>()) {
                function walk(obj: any) {
                    for (let [key, value] of Object.entries(obj)) {
                        if (typeof value === "string" && value.startsWith("$")) {
                            const path = value.slice(1)

                            if (visited.has(path)) continue
                            visited.add(path)

                            const docRef = doc(db, path)
                            const unsubscribe = onSnapshot(docRef, (snap) => {
                                if (!snap.exists()) return

                                const joinedData = snap.data()

                                joinsMap.value[path] = joinedData
                                dataRef.value![key] = joinedData
                                walk(joinedData)
                            })

                            joinUnsubscribers[path] = unsubscribe
                        }

                        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                            walk(value)
                        }
                    }
                }

                walk(data)
            }

            const set = async (newData: Partial<FirestoreDocType>) => {
                if (!newData) return

                const oldData = { ...dataRef.value }

                const updatesForThisDoc: Record<string, any> = {}
                const updatesToJoins: Promise<any>[] = []
                debugger
                // find joins
                for (const [key, value] of Object.entries(newData)) {
                    const isJoin = isJoinKey(value, raw.value?.[key])

                    if (isJoin) {
                        const joinPath = raw.value?.[key] as string // e.g., "$users/123"
                        const absolutePath = joinPath.slice(1) // "users/123"
                        const docRef = doc(db, absolutePath)

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
            }

            const destroy = async () => {
                try {
                    await deleteDoc(docRef)
                    unsubscribe()
                    dataRef.value = null
                } catch (e) {
                    console.log("Failed to delete document", docRef.path)
                }
            }

            onBeforeUnmount(() => unsubscribe())

            return Object.assign(dataRef, { set, destroy }) as FireDocRef<FirestoreDocType>
        },
    }
    return firestore as ArkFirestore<Schema>
}

// currentValue can be any object, if its position matches
export function isJoinKey(currentValue: any, path: any): boolean {
    if (typeof path === "string" && typeof currentValue === "object") {
        return path.startsWith("$")
    }

    return false
}
