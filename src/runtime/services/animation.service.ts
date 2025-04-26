import { arkDefaultAnimation } from "../controllers/animation.controller"

interface VueTransitions {
    [name: string]: VueTransition
}

interface VueTransition {
    beforeEnter: (el: Element) => void
    enter: (el: Element, done: () => void) => void
    beforeLeave: (el: Element) => void
    leave: (el: Element, done: () => void) => void
}

interface DefineArkAnimationsInput {
    default: string
    transitions: Record<string, VueTransition>
}

export const arkAnimations: DefineArkAnimationsInput = {
    default: "default",
    transitions: {
        default: arkDefaultAnimation,
    },
}

export function defineArkAnimations(input: DefineArkAnimationsInput) {
    arkAnimations.default = input.default

    for (const [name, animation] of Object.entries(input.transitions)) {
        arkAnimations.transitions[name] = animation
    }
}
