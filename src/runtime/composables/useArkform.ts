import { getIdsFromId, uuid } from "../services/utils/uuid"
import { validateInput } from "../services/validation/validateInput"
import { useArkFormStore } from "../stores/forms"
import { useBus } from "./useBus"

const $arkform = {
    useInput(id: string): UseArkInput {
        const $forms = useArkFormStore()
        const { type, formId, groupId, inputId } = getIdsFromId(id)

        if (type !== "input" || !formId || !inputId) {
            throw new Error(`useInput(): Invalid ID type or structure for "${id}"`)
        }

        const form = $forms.state[formId]
        if (!form) throw new Error(`useInput(): Form "${formId}" not found for "${id}"`)

        const input = groupId ? form.groups?.[groupId]?.inputs?.[inputId] : form.inputs?.[inputId]

        if (!input) {
            throw new Error(`useInput(): Input "${inputId}" not found in form "${formId}"`)
        }

        return toRefs(input) // now this will work beautifully
    },

    useForm(id: string): UseArkForm {
        const $forms = useArkFormStore()

        const { type, formId } = getIdsFromId(id)

        if (type !== "form" || !formId) {
            throw new Error(`useForm(): Invalid ID structure for "${id}"`)
        }

        const form = $forms.state[formId]

        if (!form) {
            throw new Error(`useForm(): Form "${formId}" not found`)
        }

        const inputs: ArkInputs = form.inputs

        const names = computed(() => {
            return Object.entries(inputs).map(([id, input]) => {
                return {
                    name: input.name,
                    id: id,
                }
            })
        })

        const errors = computed(() => {
            return Object.values(inputs).flatMap((input: any) => input.errors)
        })

        const value = computed(() => {
            const result: Record<string, any> = {}

            Object.values(inputs).forEach((input: any) => {
                const val = input.value ? input.value : null

                result[input.name] = val
            })

            return result
        })

        const valid = computed(() => {
            if (Object.values(inputs).every((input) => !input.checked)) {
                return null
            }

            return Object.values(inputs).every((input) => input.valid)
        })

        const validated = computed(() => {
            return valid.value ? value.value : null
        })

        const out = {
            ...toRefs($forms.state[formId]),
            names,
            errors,
            value,
            validated,
            valid,
        }

        return out
    },

    useGroup(id: string): UseArkGroup {
        const $forms = useArkFormStore()

        const { type, groupId, formId } = getIdsFromId(id)

        if (type !== "group" || !groupId || !formId) {
            throw new Error(
                `useGroup(): Invalid ID structure for "${id}", this is not a valid group ID.`,
            )
        }

        const form = $forms.state[formId]
        if (!form) {
            throw new Error(`useGroup(): Form "${formId}" not found for group "${groupId}"`)
        }

        const group = $forms.state[formId].groups[groupId]

        if (!group) {
            throw new Error(`useGroup(): Group "${groupId}" not found in form "${formId}"`)
        }

        const inputs: ArkInputs = $forms.state[formId].groups[groupId].inputs

        console.log(toRaw(inputs))

        const names = computed(() => {
            return Object.values(inputs).map((input: any) => input.name)
        })

        const errors = computed(() => {
            return Object.values(inputs).flatMap((input: any) => input.errors)
        })

        const valid = computed(() => {
            if (Object.values(inputs).every((input) => !input.checked)) {
                return null
            }

            return Object.values(inputs).every((input) => input.valid)
        })

        const value = computed(() => {
            const result: Record<string, any> = {}

            Object.values(inputs).forEach((input: any) => {
                result[input.name] = input.value
            })

            return result
        })

        const validated = computed(() => {
            return valid.value ? value.value : null
        })

        const out = {
            ...toRefs($forms.state[formId].groups[groupId]),
            names,
            value,
            errors,
            validated,
            valid,
        }

        console.log(toRaw(out))
        return out
    },

    clearInputs: (id: string) => {
        const bus = useBus()

        const inputIds = getInputIdsFromId(id)

        inputIds.forEach((id) => {
            const input = $arkform.useInput(id)

            input.valid.value = null
            input.value.value = input.default.value

            bus.emit(`input-${id}:update`, input)
        })
    },

    clearErrors: (id: string) => {
        const $forms = useArkFormStore()

        const inputIds = getInputIdsFromId(id)

        inputIds.forEach((id) => {
            const input = $arkform.useInput(id)

            input.errors.value = []
        })
    },

    reset: (id: string) => {
        $arkform.clearErrors(id)
        $arkform.clearInputs(id)
    },

    validate: (id: string): boolean => {
        if (!id) {
            console.error(`[$arkform.validate] id is invalid (${id})`)
            return false
        }

        const inputIds = getInputIdsFromId(id)

        let valid = true

        inputIds.forEach((id) => {
            if (!validateInput({ id })) {
                valid = false
            }
        })

        return valid
    },

    form: {
        submit: (id: string | undefined) => {
            if (!id) return

            const bus = useBus()
            bus.emit(`form-${id}:submit`)
        },
    },

    group: {
        add: (id: string, clearInputs: boolean = true) => {
            const group = $arkform.useGroup(id)

            if ($arkform.validate(id)) {
                group.items.value.push(group.value.value)

                const inputIds = getInputIdsFromId(id)

                if (clearInputs) {
                    inputIds.forEach((id) => {
                        const input = $arkform.useInput(id)

                        input.value.value = input.default.value
                    })
                }
            }
        },
        remove: (id: string, index: number) => {
            const group = $arkform.useGroup(id)
            group.items.value.splice(index, 1)
        },
    },
}

export function useArkForm() {
    return $arkform
}

export function getInputsFromId(id: string): ComputedRef<ArkInputs> {
    return computed(() => {
        const $arkform = useArkForm()

        const { type, formId, groupId, inputId } = getIdsFromId(id)

        if (type === "input" && inputId) {
            return { inputId: $arkform.useInput(inputId) }
        }

        if (groupId) {
            return $arkform.useGroup(groupId).inputs
        }

        if (type === "form" && formId) {
            const form = $arkform.useForm(formId)

            let inputs = {
                ...$arkform.useForm(formId).inputs,
            }

            if (groupId) {
                for (let [grId, input] of Object.entries(form.groups)) {
                    const group = $arkform.useGroup(grId)

                    inputs = {
                        ...inputs,
                        ...group.inputs,
                    }
                }
            }

            return inputs
        }

        return {}
    })
}
export function getInputIdsFromId(id: string): string[] {
    const $arkform = useArkForm()

    const { type, formId, groupId, inputId } = getIdsFromId(id)

    if (type === "input" && inputId) {
        return [inputId]
    }

    if (type === "group" && groupId) {
        return Object.keys($arkform.useGroup(groupId).inputs.value)
    }

    if (type === "form" && formId) {
        const form = $arkform.useForm(formId)

        if (!form) return []

        let ids = [...Object.keys(form.inputs.value)]

        const groupIds = Object.keys(form.groups.value)

        groupIds.forEach((id) => {
            const group = $arkform.useGroup(id)

            ids.push(...Object.keys(group.inputs.value))
        })

        return ids
    }

    return []
}
