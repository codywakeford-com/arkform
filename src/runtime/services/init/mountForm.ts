import { useArkFormStore } from "../../stores/forms"
import { formFactory } from "../factories/formFactory"

type Z = {
    Params: {
        formId: string | undefined | null
    }

    Return: void
}

export const mountForm: Func<Z> = (P) => {
    const { formId } = P

    const $forms = useArkFormStore()
    if (!formId) {
        throw new Error("Form id not found")
    }

    const form = formFactory()
    $forms.state[formId] = form
}
