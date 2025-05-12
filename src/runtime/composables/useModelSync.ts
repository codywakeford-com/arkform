import { useBus } from "./useBus"

// Keep exposed v-models in sync with pinia //
//

interface UseFormModelSync {
    Params: {
        formRef: Ref<UseArkForm>
        formId: string
        models: {
            stateModel: Ref<any>
            validModel: Ref<boolean | null>
            validatedModel: Ref<any | null>
            modelVal: Ref<any | null>
            errorsModel: Ref<string[]>
            namesModel: Ref<string[]>
        }
    }
    Return: void
}

export const useFormModelSync: Func<UseFormModelSync> = async (P) => {
    try {
        const { stateModel, validModel, modelVal, validatedModel, errorsModel, namesModel } =
            P.models
        const { formRef, formId } = P

        const bus = useBus()

        watch(
            formRef,
            (val) => {
                if (!val) return

                modelVal.value = val.value
                stateModel.value = { ...val }

                validModel.value = val.valid.value
                namesModel.value = val.names.value
                errorsModel.value = val.errors.value

                if (val.valid.value === true) {
                    validatedModel.value = val.value.value
                } else {
                    validatedModel.value = null
                }

                bus.emit(`${formId}:change`)
            },
            { immediate: true, deep: true },
        )
    } catch (e) {
        console.log(e)
    }
}

interface UseInputModelSync {
    Params: {
        inputRef: Ref<UseArkInput>
        models: {
            stateModel: Ref<any>
            validModel: Ref<boolean | null>
            validatedModel: Ref<any | null>
            modelValue: Ref<any | null>
            errorsModel: Ref<string[]>
        }
    }
    Return: void
}

export const useInputModelSync: Func<UseInputModelSync> = async (P) => {
    try {
        const { stateModel, validModel, modelValue, validatedModel, errorsModel } = P.models
        const { inputRef } = P

        watch(
            inputRef,
            (input) => {
                if (!input) return

                modelValue.value = input.value
                stateModel.value = { ...input }

                if (input.valid?.value === true) {
                    validatedModel.value = input.value.value
                } else {
                    validatedModel.value = null
                }
                validModel.value = input.valid?.value
                errorsModel.value = input.errors?.value
            },
            { immediate: true, deep: true },
        )
    } catch (e) {
        console.log(e)
    }
}

interface UseGroupModelSync {
    Params: {
        groupRef: Ref<UseArkGroup>
        models: {
            stateModel: Ref<any>
            validModel: Ref<boolean | null>
            validatedModel: Ref<any | null>
            modelValue: Ref<any | null>
            errorsModel: Ref<string[]>
            namesModel: Ref<string[]>
            itemsModel: Ref<any[]>
        }
    }
    Return: void
}

export const useGroupModelSync: Func<UseGroupModelSync> = async (P) => {
    const { stateModel, validModel, modelValue, validatedModel, itemsModel, errorsModel } = P.models
    const { groupRef } = P

    try {
        watch(
            groupRef,
            (group) => {
                if (!group) return

                modelValue.value = group.value
                stateModel.value = { ...group }
                itemsModel.value = group.items.value

                if (group.valid.value === true) {
                    validatedModel.value = group.value.value
                } else {
                    validatedModel.value = null
                }

                validModel.value = group.valid.value
                errorsModel.value = group.errors.value
            },
            { immediate: true, deep: true },
        )
    } catch (e) {
        console.log(e)
    }
}
