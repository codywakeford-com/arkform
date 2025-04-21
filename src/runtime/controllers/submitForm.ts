import { useArkForm } from "../composables/useArkform"

interface Z {
    Params: {
        submitFunction: Function | null
        formId: string
    }
    Return: void
}

export const submitForm: Func<Z> = async (P) => {
    const { submitFunction, formId } = P

    const $arkform = useArkForm()

    const valid = $arkform.validate(formId)

    if (!valid) return

    if (submitFunction) submitFunction()
}
