import type { Reactive } from "vue"
import { formatArkValidators } from "./utils/formatArkValidators"
import type { ArkMessage } from "./messages.service"

type FormFactory = {
    Params: {
        animation: Style["animation"]
        theme: Style["theme"]
        validation?: ValidationType
        defaults: Record<string, string>
        name?: string
    } | void

    Return: ArkForm
}

export const formFactory: Func<FormFactory> = (P) => {
    const { validation, name, defaults, animation, theme } = P || {}

    const form = {
        name: name || null,
        groups: {},
        inputs: {},
        defaults: defaults || {},
        loading: false,

        validation: validation || "shy",
        style: {
            animation: animation || null,
            theme: theme || null,
        },
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
        animation: Style["animation"]
        theme: Style["theme"]
    }
    Return: ArkInput
}

export const inputFactory: Func<InputFactory> = (P) => {
    const { name, preset, animation, theme, validation, value, arkValidators, matches, optional } =
        P

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
        style: {
            animation: animation || null,
            theme: theme || null,
        },
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
        style: {
            animation: null,
            theme: null,
        },
    }

    return reactive(group)
}
