import { useSlots, VNode } from "vue"

// Define a generic type for the slot components, you can modify this to fit your needs
type SlotComponents = {
    [key: VnodeName]: VNode // Key is the tag name (e.g., "title:"), and value is the VNode (component)
}
type VnodeName = `${string}:`

export function useDynamicComponents() {
    const slots = useSlots()
    const children = slots.default?.() ?? []

    const comps: SlotComponents = Object.fromEntries(
        children.map((vnode) => {
            const tag: VnodeName =
                typeof vnode.type === "string"
                    ? vnode.type
                    : ((vnode.type as any).name ?? "anonymous")
            return [tag, vnode]
        }),
    )

    return { comps, children }
}
