import { merge } from "lodash-es"

import { errorDefaults } from "../composables/config/errorDefaults"
import { passwordDefaults } from "../composables/config/passwordDefaults"
import { useArkForm } from "../composables/useArkform"
import { arkDefaultAnimation } from "../style/animations/default"
import { type } from "arktype"
import { errorSets } from "../composables/config/errorSets"
import type { ArkFirestore, defineFirestoreSchema, FirestoreSchema } from "../composables/firestore"

export interface VueTransitions {
    [name: string]: VueTransition
}

export interface VueTransition {
    beforeEnter: (el: Element) => void
    enter: (el: Element, done: () => void) => void
    beforeLeave: (el: Element) => void
    leave: (el: Element, done: () => void) => void
}

export type ArkformConfig<Schema extends FirestoreSchema> = Partial<ArkformConfigFull<Schema>>

export type FirebaseConfig = {
    apiKey: string | undefined
    authDomain: string | undefined
    projectId: string | undefined
    storageBucket: string | undefined
    messagingSenderId: string | undefined
    appId: string | undefined
    measurementId?: string | undefined
}

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
        }
    }
}

export type ArkformConfigFull<Schema extends FirestoreSchema> = {
    /**Root style dir */
    root: string

    arkfire: {
        enabled: boolean
        firebaseConfig: FirebaseConfig | null

        ports?: {
            auth?: number
            firestore?: number
            hosting?: number
            storage?: number
        }
    }

    features: {
        /**Toggle arkfire. */
        arkfire: boolean

        /**Toggle cloud tasks. */
        tasks: boolean
    }

    permissions?: {
        route?: {
            [key: string]: string
        }
    }

    // Select global theme
    theme: string

    animations: {
        [name: string]: VueTransition
    }
    validation: {
        strategies: {
            [name: string]: (valid: Ref<boolean | null>) => void
        }
    }
    errors: {
        named: {
            [name: string]: string[]
        }
        messages: {
            [arkValidator: string]: string
        }
    }
    password: {
        [validator: string]: string[]
    }
}

export const typesConfig = {
    form: type({
        firstName: "string | null",
        lastName: "string | null",
        email: "string | null",
        password: "string | null",
    }),
} as const

export let arkConfigDefaults: ArkformConfigFull<{}> = {
    root: "arkform",
    theme: "default",
    animations: {
        default: arkDefaultAnimation,
    },

    arkfire: {
        enabled: true,
        firebaseConfig: null,

        ports: {
            auth: 9099,
            firestore: 8080,
            hosting: 5000,
            storage: 9199,
        },
    },

    features: {
        arkfire: true,
        tasks: true,
    },

    errors: {
        named: errorSets,
        messages: errorDefaults,
    },
    password: passwordDefaults,
    validation: {
        strategies: {
            shy: (valid) => {},
        },
    },
}

export function defineArkformConfig(userConfig?: ArkformConfig<{}>) {
    const mergedConfig = merge({}, arkConfigDefaults, userConfig || {})

    const arkFormStore = useArkForm()
    Object.assign(arkFormStore.config.value, mergedConfig)

    return useArkForm().config
}
