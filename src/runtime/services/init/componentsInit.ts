import { ref } from "vue"
import type { Ref } from "vue"

type Z = {
    Params: {
        slots: any
        components: Ref<{ [key: string]: any }>
    }

    Return: void
}

/** This takes the slots passed into a component and handles them. This allows for using custom components as named slots.*/
export const componentsInit: Func<Z> = (P) => {
    const { slots, components } = P
    const slotItems = ref<any[]>([])

    const raw = slots?.default?.()
    if (!Array.isArray(raw)) return

    slotItems.value = raw

    for (const comp of slotItems.value) {
        const rawProps = comp?.type?.props
        const rawId = rawProps?.componentId

        const name = typeof rawId === "object" ? rawId.default : null

        if (name && name.includes("ark-")) {
            const componentName = name.split("ark-")[1]

            if (Object.keys(components.value).includes(componentName)) {
                console.error(
                    `Only one of each named <ark> component can be used at once. You have more than one <ark-${componentName} />`,
                )
            }

            components.value[componentName] = comp
        }
    }
}
