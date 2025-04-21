import type { Reactive } from "vue"

type Z = {
    Params: {
        validation?: ValidationType
    } | void
    Return: Reactive<ArkForm>
}

export const formFactory: Func<Z> = (P) => {
    const { validation } = P || {}

    const form = {
        groups: {},
        inputs: {},
        validation: validation || "shy",
    }

    return reactive(form)
}
