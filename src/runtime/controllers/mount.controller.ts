import { useArkForm } from "../composables/useArkform"
import { inputFactory, formFactory, groupFactory } from "../services/factory.service"
import { getIdsFromId } from "../services/utils/uuid"
import { useArkFormStore } from "../stores/forms"

type MountInput = {
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

export const mountInput: Func<MountInput> = (P) => {
    const { id, preset, arkValidators, matches, inputName, optional } = P

    if (!inputName) {
        console.warn("[Arkform] A unique name attribute for each <ark-input /> must be provided.")
    }

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

type MountForm = {
    Params: {
        formId: string | undefined | null
    }

    Return: void
}

export const mountForm: Func<MountForm> = (P) => {
    const { formId } = P

    const $forms = useArkFormStore()
    if (!formId) {
        throw new Error("Form id not found")
    }

    const form = formFactory()
    $forms.state[formId] = form
}

type MountGroup = {
    Params: {
        formId: string | undefined
        groupId: string
        groupName: string
    }
    Return: void
}

export const mountGroup: Func<MountGroup> = (P) => {
    return
    const { formId, groupId, groupName } = P

    if (!formId || !groupId) return

    const $forms = useArkFormStore()

    $forms.setGroup(groupId, groupFactory({ name: groupName }))
}
