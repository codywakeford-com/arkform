interface UseFormModelSync {
    Params: {
        formRef: Ref<UseArkForm>
        models: {
            state: Ref<any>
            valid: Ref<boolean | null>
            validated: Ref<any | null>
            modelVal: Ref<any | null>
            value: Ref<any>
            errors: Ref<string[]>
            names: Ref<string[]>
        }
    }
    Return: void
}

export const useFormModelSync: Func<UseFormModelSync> = async (P) => {
    const { state, valid, modelVal, validated, value, errors, names } = P.models
    const { formRef } = P

    watch(
        formRef,
        (val) => {
            state.value = { ...val }
            valid.value = val.valid.value
            names.value = val.names.value
            errors.value = val.errors.value

            modelVal.value = val.value

            if (val.valid.value === true) {
                validated.value = val.value.value
            } else {
                validated.value = null
            }
        },
        { immediate: true, deep: true },
    )
}
