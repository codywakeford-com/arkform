import { merge } from "lodash-es"

import { errorDefaults } from "../composables/config/errorDefaults"
import { passwordDefaults } from "../composables/config/passwordDefaults"
import { useArkForm } from "../composables/useArkform"
import { arkDefaultAnimation } from "../style/animations/default"
import { type } from "arktype"
import { errorSets } from "../composables/config/errorSets"

export interface VueTransitions {
    [name: string]: VueTransition
}

export interface VueTransition {
    beforeEnter: (el: Element) => void
    enter: (el: Element, done: () => void) => void
    beforeLeave: (el: Element) => void
    leave: (el: Element, done: () => void) => void
}

export type ArkformConfig = Partial<ArkformConfigFull>

export type ArkformConfigFull = {
    /**Root style dir */
    root: string

    firebase: {
        auth: boolean
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

export let arkConfigDefaults: ArkformConfigFull = {
    root: "arkform",
    theme: "default",
    animations: {
        default: arkDefaultAnimation,
    },

    firebase: {
        auth: false,
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

export function defineArkformConfig(userConfig?: ArkformConfig) {
    console.log("userConfig", userConfig)

    const mergedConfig = merge({}, arkConfigDefaults, userConfig || {})

    const arkFormStore = useArkForm()
    Object.assign(arkFormStore.config.value, mergedConfig)

    console.log("[Arkform]: Final merged config", useArkForm().config.value)

    return useArkForm().config
}
