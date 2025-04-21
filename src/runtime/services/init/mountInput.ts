import { useArkForm } from "../../composables/useArkform"
import { useArkFormStore } from "../../stores/forms"
import { inputFactory } from "../factories/inputFactory"
import { getIdsFromId } from "../utils/uuid"

type Z = {
    Params: {
        id: string
        arkValidators: any | string
        matches: string | undefined
        inputName: string
        optional: boolean | undefined
        preset?: any | null
    }
    Return: void
}

export const mountInput: Func<Z> = (P) => {
    const { id, preset, arkValidators, matches, inputName, optional } = P

    try {
        const $arkform = useArkForm()
        const $forms = useArkFormStore()

        const { formId, groupId, inputId } = getIdsFromId(id)

        if (!formId || !inputId) {
            throw new Error(`Invalid id: ${id}`)
        }

        const inputData = inputFactory({
            name: inputName,
            arkValidators,
            optional,
            matches,
            preset,
        })

        if (groupId) {
            const group = $arkform.useGroup(groupId)
            group.inputs[inputId]

            return
        }

        $forms.state[formId].inputs[inputId] = inputData
    } catch (e) {
        console.error(e)
    }
}
