import { arkConfigDefaults, type ArkformConfig } from "../controllers/config.controller"
import { getFormIdByName } from "../services/utils/getInputByName"
import { getIdsFromId } from "../services/utils/uuid"
import { validateInput } from "../services/validation/validateInput"
import { useArkFormStore } from "../stores/forms"
import { useBus } from "./useBus"
import { ref } from "vue"

export type $Arkform = {
    useInput: (id: string) => UseArkInput
    useForm: (id: string) => UseArkForm
    useGroup: (id: string) => UseArkGroup
    useMessageSet: (name: string) => UseArkMessage

    clearErrors: (id: string) => void
    reset: (id: string) => void
    clearInputs: (id: string) => void
    validate: <T>(id: string) => T | null

    form: {
        submit: (id: string) => void
        readonly: (id: string, value: boolean) => void
        /**Sets the form fields.
         *
         * ```typescript
         * const formValue = {
         *   fieldName: "value"
         * }
         * ```
         */
        set: (id: string, data: Record<string, any>) => void
    }

    group: {
        add: (id: string, clearInputs: boolean) => void
        remove: (id: string, index: number) => void
    }
    config: Ref<ArkformConfig<{}>>

    message: {
        set: (name: string, message: ArkMessage) => void
        clear: (name: string) => void
    }

    state: ComputedRef<ArkForms>
}

type Primative = string | number | undefined | null | boolean

export function $form<FormType extends Record<string, Primative> = any>(id: string) {
    // check names for form
    // check form id

    return {
        /**Clear the form, errors and inputs. */
        clear: (data?: Partial<{ errors: boolean; inputs: boolean }>) => {},

        /**Set the form fields. */
        set: (data: Partial<FormType>) => {},

        /**Submit the form. */
        submit: (options?: {}) => {},

        /**Change the readonly state. */
        readonly: (value: boolean) => {},

        /**Validate the form fields. */
        validate: (): boolean => {
            return false
        },

        /**A reactive reference to the form data. */
        value: ref<FormType>(),

        /**A reactive reference to the form errors. */
        errors: ref<string[]>([]),

        /**A reactive reference to all the forms data. */
        state: ref<$Arkform>(),

        /**A reactive reference to all the input names within the form. */
        names: ref<string[]>([]),

        /**A boolean value true only when all decendents meet their criteria. */
        valid: ref<boolean>(false),

        /**When the form is valid this will show the form data, else it will be null. */
        validated: ref<FormType | null>(null),
    }
}

export function $input(formId: string, inputId: string) {
    return {
        /**Clear the form, errors and inputs. */
        clear: (data?: Partial<["errors", "inputs"]>) => {},

        /**Set the form fields. */
        set: (data: Partial<FormType>) => {},

        /**Change the readonly state. */
        readonly: (value: boolean) => {},

        /**Validate the form fields. */
        validate: (): boolean => {
            return false
        },

        /**A reactive reference to the form data. */
        value: ref<FormType>(),

        /**A reactive reference to the form errors. */
        errors: ref<string[]>([]),

        /**A reactive reference to all the forms data. */
        state: ref<$Arkform>(),

        /**A reactive reference to the inputs name. */
        name: ref<string[]>([]),

        /**A boolean value true only when all decendents meet their criteria. */
        valid: ref<boolean>(false),

        /**When the form is valid this will show the form data, else it will be null. */
        validated: ref<FormType | null>(null),
    }
}

export function $group() {}

export function useArkForm() {
    let $arkform: $Arkform = {
        useInput(id: string): UseArkInput {
            const $forms = useArkFormStore()
            const { type, formId, groupId, inputId } = getIdsFromId(id)

            if (type !== "input" || !formId || !inputId) {
                throw new Error(`useInput(): Invalid ID type or structure for "${id}"`)
            }

            const form = $forms.state[formId]
            if (!form) throw new Error(`useInput(): Form "${formId}" not found for "${id}"`)

            const input: ArkInput = groupId ? form.groups?.[groupId]?.inputs?.[inputId] : form.inputs?.[inputId]

            if (!input) {
                throw new Error(`useInput(): Input "${inputId}" not found in form "${formId}"`)
            }

            return toRefs(input)
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

            // const value = computed(() => {
            //     const result: Record<string, any> = {}

            //     Object.values(inputs).forEach((input: any) => {
            //         const val = input.value ? input.value : null

            //         result[input.name] = val
            //     })

            //     return result
            // })

            const valid = computed(() => {
                if (Object.values(inputs).every((input) => !input.checked)) {
                    return null
                }

                return Object.values(inputs).every((input) => input.valid)
            })

            const makeValueRefs = () => {
                const refs: { [name: string]: Ref } = {}

                Object.entries(inputs).forEach(([inputId, input]) => {
                    let inputRef: { [name: string]: Ref } = {}
                    inputRef[input.name.value] = toRef(input.value)

                    refs[input.name] = input.value
                })

                return reactive(refs)
            }

            const value = makeValueRefs()

            const validated = computed(() => {
                return valid.value ? value : null
            })

            const out: UseArkForm = {
                ...toRefs($forms.state[formId]),
                names,
                errors,
                validated,
                value,
                valid,
            }

            return out
        },

        useGroup(id: string): UseArkGroup {
            const $forms = useArkFormStore()

            const { type, groupId, formId } = getIdsFromId(id)

            if (type !== "group" || !groupId || !formId) {
                throw new Error(`useGroup(): Invalid ID structure for "${id}", this is not a valid group ID.`)
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

        validate<T>(id: string): T | null {
            if (!id) {
                console.error(`[$arkform.validate]: id is invalid (${id})`)
                return null
            }

            const formId = getFormIdByName({ name: id })
            const inputIds = getInputIdsFromId(formId || id)

            let valid = true

            inputIds.forEach((id) => {
                if (!validateInput({ id })) {
                    valid = false
                }
            })

            if (valid) {
                return $arkform.useForm(formId).validated.value as T
            } else {
                return null
            }
        },

        form: {
            submit: (id: string | undefined) => {
                if (!id) return

                const bus = useBus()
                bus.emit(`form-${id}:submit`)
            },

            readonly: (id: string | undefined, value: boolean) => {
                if (!id) return

                const form = $arkform.useForm(id)
                form.readOnly.value = value
                console.log(form.readOnly.value)
            },

            set: (id: string, data: Record<string, any>) => {
                console.log("hello from $arkform.form.set")
                const inputIds = getInputIdsFromId(id)

                inputIds.forEach((id) => {
                    const input = $arkform.useInput(id)

                    if (input.name.value in data) {
                        console.log(data[input.name.value])
                        input.value.value = data[input.name.value]
                    }
                })
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

        config: ref(arkConfigDefaults),

        message: {
            set: (name: string, message: ArkMessage) => {
                const messageGroup = $arkform.useMessageSet(name)

                if (!messageGroup.value) {
                    console.warn(`[arkform]: Cannot set value undefined <ark-message-group /> with name (${name}).`)
                }

                messageGroup.value.push(message)
            },

            clear: (name: string) => {
                const messageSet = $arkform.useMessageSet(name)
                messageSet.value.splice(0, messageSet.value.length)
            },
        },

        useMessageSet(name: string): UseArkMessage {
            const $forms = useArkFormStore()
            const messageGroups = $forms.messages

            const messageGroup = messageGroups[name]

            if (!messageGroup) {
                throw new Error(`[Arkform]: Cannot set <ark-message-group /> with name (${name}).`)
            }

            return toRef(messageGroup)
        },

        state: () => {
            const $forms = useArkFormStore()
            return $forms.state
        },
    }

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
