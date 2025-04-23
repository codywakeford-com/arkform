export {}

declare global {
    interface VueTransitions {
        [name: string]: VueTransition
    }

    interface VueTransition {
        beforeEnter: (el: Element) => void
        enter: (el: Element, done: () => void) => void
        beforeLeave: (el: Element) => void
        leave: (el: Element, done: () => void) => void
    }
}
