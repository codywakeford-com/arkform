import { ark, type } from "arktype"
import type { ModuleOptions } from "~/src/module"
import { useArkForm } from "../../composables/useArkform"
import { useArkFormStore } from "../../stores/forms"

type Z = {
    Params: {
        id: string
    }

    Return: boolean
}

export const validateInput: Func<Z> = (P) => {
    const $arkform = useArkForm()
    const { id } = P

    const input = $arkform.useInput(id)
    let errors: string[] = []

    // Fallback validator if none are defined
    if (!input.arkValidators.value.length) {
        input.arkValidators.value.push("string>0")
    }

    for (const ark of input.arkValidators.value) {
        const err = getErrorMessages(ark, id)
        errors.push(...err)
    }

    const merged = [...new Set([...input.errors.value, ...errors])]
    const filtered = merged.filter((err) => errors.includes(err))

    input.errors.value.splice(0, input.errors.value.length, ...filtered)
    input.valid.value = filtered.length === 0

    return input.valid.value
}

function isArkError(data: any) {
    return data[" arkKind"] === "errors"
}

function formatArkValidator(arkValidator: any) {
    if (typeof arkValidator === "string") {
        return arkValidator.replace(" ", "")
    }

    return arkValidator
}

function getErrorMessages(arkValidator: any, inputId: string) {
    const $arkform = useArkForm()
    arkValidator = formatArkValidator(arkValidator)

    const input = $arkform.useInput(inputId)

    const InputValidator = type(arkValidator)
    const result = InputValidator(input.value.value)

    if (!isArkError(result)) {
        return []
    }

    const defaultError = result[0].problem.split("(was)")[0]

    const options = useRuntimeConfig().public.arkform as ModuleOptions

    let customErrors = null

    if (options.errors) {
        customErrors = options.errors
    } else {
        return [defaultError]
    }

    let errors = []
    let usingCustomError = false

    for (let [validator, error] of Object.entries(customErrors)) {
        if (validator.replace(" ", "") === arkValidator) {
            errors.push(error)
            usingCustomError = true
        }
    }

    if (!usingCustomError) {
        errors.push(defaultError)
    }

    return errors
}
