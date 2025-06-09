import { useLocalStorage } from "@vueuse/core"
import { useArkForm } from "../composables/useArkform"
import { useArkFormStore } from "../stores/forms"
import { getIdsFromId } from "../services/utils/uuid"
import { inputFactory, formFactory, groupFactory } from "../services/factory.service"
import { getInputIdByName } from "../services/utils/getInputByName"

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
        defaults: Record<string, string> | null
        name: string | null
        persist: boolean | false
        readOnly?: boolean
    }

    Return: void
}

export const mountForm: Func<MountForm> = (P) => {
    let { formId, readOnly, animation, persist, defaults, name, theme } = P
    const $arkform = useArkForm()

    if (!formId) {
        return
    }

    if (!theme) {
        theme = $arkform.config.value.theme || "default"
    }

    const $forms = useArkFormStore()

    if (!formId) {
        throw new Error("Form id not found")
    }

    name = name ? name : ""

    const form = formFactory({ animation, theme, defaults, name, readOnly })
    $forms.state[formId] = form

    if (defaults) {
        console.log(defaults)
        mountFormData(name, formId, defaults)
        return
    }

    // Persist form localStorage
    if (persist) {
        mountFormData(name, formId)
    }
}

function mountFormData(formName: string | undefined, formId: string, defaultData?: Record<string, string>) {
    console.log("hereeere")
    if (!formName) {
        console.warn("[arkform]: To use the persist prop on a form you must give the form a unique name attribute. <ark-form name='login' />")
        return
    }

    const $arkform = useArkForm()
    const formRef = $arkform.useForm(formId).value
    const formStorageKey = `[arkform.persist]${formName}`

    onMounted(() => {
        let data: any = defaultData

        console.log(data)

        if (!defaultData) {
            data = localStorage.getItem(formStorageKey)
        }

        const storage = useLocalStorage(formStorageKey, {}) as Ref<Record<string, any>>

        console.log(data)
        if (data) {
            if (typeof data === "string") {
                data = JSON.parse(data)
            }

            if (!defaultData) {
                Object.entries(storage.value).forEach(([fieldName, fieldValue]) => {
                    const input = $arkform.useInput(getInputIdByName({ name: fieldName, id: formId }))

                    if (input?.value) {
                        input.value.value = fieldValue
                    }
                })
            } else {
                Object.entries(data).forEach(([fieldName, fieldValue]) => {
                    try {
                        const input = $arkform.useInput(getInputIdByName({ name: fieldName, id: formId }))

                        if (input?.value) {
                            input.value.value = fieldValue
                        }
                    } catch (e) {
                        return
                    }
                })
            }
        }

        if (!defaultData) {
            watch(
                formRef,
                (val) => {
                    storage.value = structuredClone(val)
                    console.log(storage.value)
                },
                { deep: true }
            )
        }
    })
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
