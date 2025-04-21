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

    if (slots.default) {
        slotItems.value = slots.default()

        slotItems.value.forEach((comp) => {
            const name = comp?.type?.props?.componentId?.default ?? null

            if (name && name.includes("ark-")) {
                const componentName = name.split("ark-")[1]

                if (Object.keys(components.value).includes(componentName)) {
                    if (components.value[componentName]) {
                        console.error("only one of each named <ark> component can be used at once.")
                    }

                    components.value[componentName] = comp
                }
            }
        })
    }
}
