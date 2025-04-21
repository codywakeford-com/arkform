import type { Reactive } from "vue"

interface Z {
    Params: {
        name: string
        validation?: ValidationType
    }
    Return: Reactive<ArkInputGroup>
}

export const inputGroupFactory: Func<Z> = (P) => {
    const { name, validation } = P
    const group = {
        name,
        inputs: {},
        items: [],
        validation: validation || "shy",
        valid: null,
    }

    return reactive(group)
}
