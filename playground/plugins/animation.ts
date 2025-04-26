import { arkDefaultAnimation } from "~/arkform/animations/default"
import { defineArkAnimations } from "../../src/runtime/services/animation.service"

export default defineNuxtPlugin(() => {
    defineArkAnimations({
        default: "default",
        transitions: {
            default: arkDefaultAnimation,
        },
    })
})
