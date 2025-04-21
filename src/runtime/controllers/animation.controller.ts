const ANIMATION_TIME = 200

interface ArkAnimation {
    beforeEnter: (el: Element) => void
    enter: (el: Element, done: () => void) => void
    beforeLeave: (el: Element) => void
    leave: (el: Element, done: () => void) => void
}

export const defaultAnimation: ArkAnimation = {
    beforeEnter: (el: Element) => {
        const element = el as HTMLElement
        element.style.height = "0"
        element.style.transform = "translateY(-25px)"
        element.style.opacity = "0"
    },

    enter: (el: Element, done: () => void) => {
        const element = el as HTMLElement
        const height = element.scrollHeight + "px"
        element.style.transition = `all ${ANIMATION_TIME}ms ease`
        requestAnimationFrame(() => {
            element.style.height = height
            element.style.transform = "translateY(-0px)"

            element.style.opacity = "1"
        })
        setTimeout(() => {
            done()
        }, ANIMATION_TIME)
    },

    beforeLeave: (el: Element) => {
        const element = el as HTMLElement
        element.style.height = element.scrollHeight + "px"
        element.style.transform = "translateY(-0px)"
        element.style.opacity = "1"
    },

    leave: (el: Element, done: () => void) => {
        const element = el as HTMLElement
        element.style.transition = `all ${ANIMATION_TIME}ms ease`
        requestAnimationFrame(() => {
            element.style.height = "0"
            element.style.transform = "translateY(-25px)"
            element.style.opacity = "0"
        })
        setTimeout(() => {
            done()
        }, ANIMATION_TIME)
    },
}
