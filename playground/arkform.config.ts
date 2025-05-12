import { type FirestoreSchemaBase, type ArkFirestore, type ArkformConfig } from "#imports"
import { defineFirestoreSchema } from "../src/runtime/composables/firestore"

export type CustomSchema = {
    users: {
        $doc: {
            id: string
        }

        $collections: {
            emails: {
                $doc: {
                    email: string
                }
            }
            hello: {
                name: 123
            }
        }
    }
}
const firestore = defineFirestoreSchema<CustomSchema>()
const users = firestore.docRef("users/123")

const config: ArkformConfig<CustomSchema> = {
    arkfire: {
        enabled: true,
        firestore,
    },
} as const

export default config
