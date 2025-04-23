import type { Reactive } from "vue"
import { formatArkValidators } from "./utils/formatArkValidators"

type FormFactory = {
    Params: {
        validation?: ValidationType
    } | void
    Return: ArkForm
}

export const formFactory: Func<FormFactory> = (P) => {
    const { validation } = P || {}

    const form = {
        name: null,
        groups: {},
        inputs: {},
        validation: validation || "shy",
    }

    return reactive(form)
}

type InputFactory = {
    Params: {
        name: string
        validation?: ValidationType
        value?: any
        arkValidators?: string | string[]
        matches?: string
        optional?: boolean
        preset?: boolean
    }
    Return: ArkInput
}

export const inputFactory: Func<InputFactory> = (P) => {
    const { name, preset, validation, value, arkValidators, matches, optional } = P

    const input = {
        name: name,
        errors: [],
        validation: validation || "shy",
        arkValidators: formatArkValidators({ ark: arkValidators }),
        optional: optional || false,
        valid: null,
        value: preset || value || null,
        default: preset || null,
        matches: matches || null,
        checked: false,
    }

    return reactive(input)
}

interface GroupFactory {
    Params: {
        name?: string | null
        validation?: ValidationType
    }
    Return: ArkGroup
}

export const groupFactory: Func<GroupFactory> = (P) => {
    const { name, validation } = P
    const group = {
        name: name || null,
        inputs: {},
        items: [],
        validation: validation || "shy",
        valid: null,
    }

    return reactive(group)
}
