import { merge } from "lodash-es"

import { errorDefaults } from "../composables/config/errorDefaults"
import { passwordDefaults } from "../composables/config/passwordDefaults"
import { useArkForm } from "../composables/useArkform"
import { arkDefaultAnimation } from "../style/animations/default"

interface VueTransitions {
    [name: string]: VueTransition
}

interface VueTransition {
    beforeEnter: (el: Element) => void
    enter: (el: Element, done: () => void) => void
    beforeLeave: (el: Element) => void
    leave: (el: Element, done: () => void) => void
}

export type ArkformConfig = {
    /**Root style dir */
    root: string

    // Select global theme
    theme: string

    animations: {
        [name: string]: VueTransition
    }
    errors: {
        [arkValidator: string]: string
    }
    password: {
        [validator: string]: string[]
    }
}

export let arkConfigDefaults: ArkformConfig = {
    root: "arkform",
    theme: "default",
    animations: {
        default: arkDefaultAnimation,
    },
    errors: errorDefaults,
    password: passwordDefaults,
}

export function defineArkformConfig(userConfig?: Partial<ArkformConfig>) {
    console.log("defineArkConfig() fired")

    const mergedConfig = merge({}, arkConfigDefaults, userConfig || {})

    const arkFormStore = useArkForm()
    arkFormStore.config = mergedConfig

    console.log("[Arkform]: Final merged config", mergedConfig)

    return mergedConfig
}
