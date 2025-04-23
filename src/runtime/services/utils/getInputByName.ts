import { useArkForm } from "../../composables/useArkform"
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
