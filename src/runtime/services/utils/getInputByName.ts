import { useArkForm } from "../../composables/useArkform"
import { useArkFormStore } from "../../stores/forms"
import { getIdsFromId } from "./uuid"

interface GetInputIdByName {
    Params: {
        name: string
        id: string
    }

    Return: ArkInput["id"]
}

export const getInputIdByName: Func<GetInputIdByName> = (P) => {
    const { name, id } = P

    const $arkform = useArkForm()
    const { formId } = getIdsFromId(id)
    const form = $arkform.useForm(formId)

    const found = form.names.value.find((a) => {
        return a.name === name
    })

    if (!found) {
        throw new Error(`[Arkform]: Input with name (${name}) does exist in form.`)
    }

    return found.id
}

interface GetFormInputIdByName {
    Params: {
        name: string
    }

    Return: ArkInput["id"]
}

export const getFormIdByName: Func<GetFormInputIdByName> = (P) => {
    const { name } = P

    const $forms = useArkFormStore()
    let formId: string | null = null

    const formList = Object.entries($forms.state as ArkForm[])
    formList.forEach(([id, form]) => {
        if (form.name === name) {
            formId = id
        }
    })

    if (!formId) {
        console.warn(`[Arkform]: Invalid form name ${name}.`)
        return ""
    }

    return formId
}
