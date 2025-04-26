import { merge } from "lodash-es"
import { arkDefaultAnimation } from "~/arkform/animations/default"

type ArkformConfig = {
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

let config: ArkformConfig = {
    theme: "default",
    animations: {
        default: arkDefaultAnimation,
    },
    errors: {},
    password: {},
}

export function defineArkformConfig(arkConfig: ArkformConfig) {
    merge(config, arkConfig)
}

export function useArkformConfig() {
    return config
}
