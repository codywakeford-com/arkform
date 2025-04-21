import type { Reactive } from "vue"
import { formatArkValidators } from "../utils/formatArkValidators"

type Z = {
    Params: {
        name: string
        validation?: ValidationType
        value?: any
        arkValidators?: string | string[]
        matches?: string
        optional?: boolean
        preset?: boolean
    }
    Return: Reactive<ArkInput>
}

export const inputFactory: Func<Z> = (P) => {
    const { name, preset, validation, value, arkValidators, matches, optional } = P

    const input = {
        name: name,

        value: preset || value || null,
        errors: [],
        validation: validation || "shy",
        arkValidators: formatArkValidators({ ark: arkValidators }),
        optional: optional || false,
        matches: matches || null,
        valid: null,
        default: preset || null,
    }

    return reactive(input)
}
