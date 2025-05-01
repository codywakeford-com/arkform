import { useArkForm } from "../composables/useArkform"
import { inputFactory, formFactory, groupFactory } from "../services/factory.service"
import { arkMessage, type ArkMessage } from "../services/messages.service"
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
        animation: Style["animation"]
        theme: Style["theme"]
    }
    Return: void
}

export const mountInput: Func<MountInput> = (P) => {
    const { id, preset, arkValidators, matches, inputName, optional, animation, theme } = P

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
            animation,
            theme,
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
        animation: Style["animation"]
        theme: Style["theme"]
        defaults: Record<string, string>
        name?: string
    }

    Return: void
}

export const mountForm: Func<MountForm> = (P) => {
    let { formId, animation, defaults, name, theme } = P
    const $arkform = useArkForm()

    if (!theme) {
        theme = $arkform.config.value.theme || "default"
    }

    const $forms = useArkFormStore()
    if (!formId) {
        throw new Error("Form id not found")
    }

    const form = formFactory({ animation, theme, defaults, name })
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

type MountMessages = {
    Params: {
        name: string
    }
    Return: void
}

export const mountMessageSet: Func<MountMessages> = (P) => {
    const { name } = P

    const $forms = useArkFormStore()

    $forms.messages[name] = []
}
