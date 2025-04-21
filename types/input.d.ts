export {}

declare global {
    interface FormMetadata {
        validateDelayTime: number
    }

    type ValidationType = "none" | "shy" | "eager"

    interface ArkInputs {
        [key: string]: Input
    }

    interface ArkInput {
        name: string
        errors: string[]
        validation: ValidationType
        arkValidators: any[]
        optional: boolean
        valid: boolean | null
        value: any
        default: null | any
        matches: string | null
    }

    interface UseArkInput {
        name: Ref<string>
        errors: Ref<string[]>
        validation: Ref<ValidationType>
        arkValidators: Ref<any[]>
        optional: Ref<boolean>
        valid: Ref<boolean | null>
        value: Ref<any>
        default: Ref<any | null>
        matches: Ref<string | null>

        validated: ComputedRef<{
            [key: string]: any
        } | null>
    }

    interface ArkInputGroups {
        [key: string]: ArkInputGroup
    }

    type ArkInputGroup = {
        inputs: Inputs

        name: string
        items: any[]
        valid: boolean | null
    }

    type UseArkGroup = {
        inputs: Inputs

        name: Ref<string>
        items: Ref<any[]>
        valid: Ref<boolean | null>

        validation: Ref<ValidationType>
        value: ComputedRef<any | null>
        errors: ComputedRef<string[]>
    }

    type ArkForms = {
        [key: string]: ArkForm
    }

    type ArkForm = {
        groups: InputGroups
        inputs: Inputs

        validation: ValidationType
    }

    interface UseArkForm {
        groups: Ref<InputGroups>
        inputs: Ref<Inputs>

        validation: Ref<ValidationType>
        valid: Ref<boolean | null>

        valid: ComputedRef<boolean | null>
        names: ComputedRef<string[]>
        errors: ComputedRef<string[]>
        validated: ComputedRef<null | any>
        value: ComputedRef<{
            [key: string]: string
        }>
    }
}
