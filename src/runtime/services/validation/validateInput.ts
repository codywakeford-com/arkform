import { ark, type } from "arktype"
import type { ModuleOptions } from "~/src/module"
import { useArkForm } from "../../composables/useArkform"
import { useArkFormStore } from "../../stores/forms"
import { getInputIdByName } from "../utils/getInputByName"

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

    if (!input.optional.value && !input.arkValidators.value?.length) {
        input.arkValidators.value?.push("string>0")
    }

    const err = getErrorMessages([...input.arkValidators.value], id)
    errors.push(...err)

    if (input.matches.value) {
        const inputToMatchId = getInputIdByName({
            name: input.matches.value,
            id,
        })

        const inputToMatch = $arkform.useInput(inputToMatchId)
        if (inputToMatch.value.value !== input.value.value) {
            errors.push(`This field must match the ${input.matches.value} field.`)
        }
    }

    const merged = [...new Set([...input.errors.value, ...errors])]
    const filtered = merged.filter((err) => errors.includes(err))

    input.errors.value.splice(0, input.errors.value.length, ...filtered)
    input.valid.value = filtered.length === 0
    input.checked.value = true

    return input.valid.value
}

function isArkError(data: any): boolean {
    if (!data) return false

    return data[" arkKind"] === "errors"
}

function formatArkValidator(arkValidator: any) {
    if (typeof arkValidator === "string") {
        return arkValidator.replace(" ", "")
    }

    return arkValidator
}

export function getErrorMessages(arkValidators: string[], inputId: string): string[] {
    const $arkform = useArkForm()
    const input = $arkform.useInput(inputId)

    let validators = [...arkValidators]
    let errors: string[] = []
    const customErrorMessages = $arkform.config.value.errors?.messages || {}
    const errorSet = $arkform.config.value.errors?.named || {}

    for (let i = 0; i < validators.length; i++) {
        let validator = validators[i]

        if (validator in errorSet) {
            validators.push(...errorSet[validator])
            continue
        }

        validator = formatArkValidator(validator)

        let result: any
        try {
            const InputValidator = type(validator as any)
            result = InputValidator(input.value.value)
        } catch (e) {}

        if (!isArkError(result)) continue

        const defaultError = result[0].problem.split("(was)")[0]
        const customError = customErrorMessages[validator]

        if (customError) {
            errors.push(customError)
        } else {
            errors.push(defaultError)
        }
    }

    return errors
}
