import type { Reactive } from "vue"
import { formatArkValidators } from "./utils/formatArkValidators"

type FormFactory = {
    Params: {
        validation?: ValidationType
    } | void
    Return: Reactive<ArkForm>
}

export const formFactory: Func<FormFactory> = (P) => {
    const { validation } = P || {}

    const form = {
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
    Return: Reactive<ArkInput>
}

export const inputFactory: Func<InputFactory> = (P) => {
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

interface GroupFactory {
    Params: {
        name: string
        validation?: ValidationType
    }
    Return: Reactive<ArkInputGroup>
}

export const groupFactory: Func<GroupFactory> = (P) => {
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
