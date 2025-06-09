import { useArkFormStore } from "../../stores/forms"

type Z = {
    Params: {
        formId: string | undefined
        inputName: string
        value: string
    }

    Return: boolean
}

export const checkMatch: Func<Z> = (P) => {
    const { formId, inputName, value } = P

    const $forms = useArkFormStore()

    const input = $forms.getInputByName(formId, inputName)

    if (!input) return false

    if (input.value === value) return true
    else return false
}