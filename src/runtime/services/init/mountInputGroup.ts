import { useArkFormStore } from "../../stores/forms"
import { inputGroupFactory } from "../factories/inputGroupFactory"

type Z = {
    Params: {
        formId: string | undefined
        groupId: string
        groupName: string
    }
    Return: void
}

export const mountInputGroup: Func<Z> = (P) => {
    return
    const { formId, groupId, groupName } = P

    if (!formId || !groupId) return

    const $forms = useArkFormStore()

    $forms.setGroup(groupId, inputGroupFactory({ name: groupName }))
}
