import { useArkForm } from "../composables/useArkform"

interface Z {
    Params: {
        submitFunction: Function | null
        formId: string
    }
    Return: Promise<void>
}

export const submitForm: Func<Z> = async (P) => {
    const { submitFunction, formId } = P

    const $arkform = useArkForm()

    const form = $arkform.useForm(formId)
    form.loading.value = true

    try {
        const valid = $arkform.validate(formId)

        if (!valid) return

        if (submitFunction) await submitFunction()
    } finally {
        form.loading.value = false
    }
}
