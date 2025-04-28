import { useArkForm } from "../composables/useArkform"
import { inputFactory, formFactory, groupFactory } from "../services/factory.service"
import { getInputIdByName } from "../services/utils/getInputByName"
import { getIdsFromId } from "../services/utils/uuid"
import { useArkFormStore } from "../stores/forms"

type MountInput = {
    Params: {
        id: string
        arkValidators: any | string
        matches?: string
        inputName: string
        optional?: boolean
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

        // if (matches) {
        //     const $arkform = useArkForm()

        //     const inputIdToMatch = getInputIdByName({
        //         name: matches,
        //         id,
        //     })

        //     const input = $arkform.useInput(inputIdToMatch)

        //     input.matches.value = inputName
        // }

        if (groupId) {
            $forms.state[formId].groups[groupId].inputs[inputId] = inputData
            console.log("Input mounted:", $forms.state[formId].groups[groupId].inputs[inputId])
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
        groupName: string | null
    }
    Return: void
}

export const mountGroup: Func<MountGroup> = (P) => {
    const { formId, groupId, groupName } = P

    if (!formId || !groupId) return

    const $forms = useArkFormStore()
    const group = groupFactory({ name: groupName })

    $forms.state[formId].groups[groupId] = group
    console.log("group mounted:", $forms.state[formId].groups[groupId])
}
