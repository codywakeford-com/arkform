# Animations

To have full control over animations is a bit more tricky. Generally with form animations you will need to calculate height for elements dynamically so javascript is naturally the tools of choice. 

**Animations use the `<VueTransition />` api.**

You can define an animation in the `nuxt.config.ts`.

```typescript
import { yourAnimation } from "place"

export default defineNuxtConfig({
    arkform: {
        animations: {
            defaultAnimation: "yourAnimationName"
            "yourAnimationName": yourAnimation
        }
    }
})
```

## Animation Interface 

```typescript
interface VueTransition {
    beforeEnter: (el: Element) => void
    enter: (el: Element, done: () => void) => void
    beforeLeave: (el: Element) => void
    leave: (el: Element, done: () => void) => void
}
```

## Animation Example

And here is the default transition as an example.

```typescript
export const arkDefaultAnimation: VueTransition = {
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
```
## Selecting an animation

Once you have set your animation in nuxt you can provide an animation name to a component.

```html
<ark-input animation="yourAnimationName" />
```
