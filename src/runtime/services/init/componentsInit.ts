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
    try {
        const { slots, components } = P
        const slotItems = ref<any[]>([])

        const raw = slots?.default?.()
        if (!Array.isArray(raw)) return

        slotItems.value = raw

        console.log(slotItems.value)

        for (let comp of slotItems.value) {
            if (!comp || typeof comp !== "object") continue
            const rawProps = comp?.type?.props

            if (typeof comp?.type === "symbol") {
                slotItems.value.push(...(comp?.children || []))
                continue
            }

            const rawId = rawProps?.componentId

            const name = typeof rawId === "object" ? rawId.default : null

            if (name && name.includes("ark-")) {
                const componentName = name.split("ark-")[1]
                console.log("registering", componentName)

                components.value[componentName] = comp
            }
        }
    } catch (e) {
        console.error(e)
    }
}
