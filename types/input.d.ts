export {}

declare global {
    type InputName = {
        id: string
        name: string
    }

    interface FormMetadata {
        validateDelayTime: number
    }

    type ValidationType = "none" | "shy" | "eager"

    interface ArkInputs {
        [key: string]: Input
    }

    interface ArkGroups {
        [key: string]: ArkInputGroup
    }

    type ArkInput = Reactive<{
        name: string
        errors: string[]
        validation: ValidationType
        arkValidators: any[]
        optional: boolean
        valid: boolean | null
        value: any
        default: null | any
        matches: string | null

        /** If the input has been validated yet. */
        checked: boolean
    }>

    type ArkForm = Reactive<{
        name: string | null
        groups: InputGroups
        inputs: Inputs
        validation: ValidationType
    }>

    type ArkGroup = Reactive<{
        name: string | null
        inputs: Inputs
        items: any[]
        valid: boolean | null
    }>

    interface UseArkInput {
        /**Name attr on <input />. This must be unique per form.*/
        name: Ref<string>

        /**A list of errors for this particular input. */
        errors: Ref<string[]>

        /**Validation strategy. Dictactes when a validation will fire.*/
        validation: Ref<"none" | "shy" | "eager">

        /**A list of validators to check on input value. */
        arkValidators: Ref<string[]>

        /**
        By default all inputs are required. They will display a error
        if no input is provided.
        */
        optional: Ref<boolean>

        /** Shows validation result, or null if not yet checked. */
        valid: Ref<boolean | null>

        /** The inputs raw value */
        value: Ref<any>

        /** Default input, used for resetting the form. */
        default: Ref<any | null>

        /** Provide an input `name` attr to check for a match. */
        matches: Ref<string | null>

        /** If the input has been validated yet*/
        checked: Ref<boolean>

        /** Shows the raw output ONLY if the input is valid. */
        validated: ComputedRef<{
            [key: string]: any
        } | null>
    }

    type UseArkGroup = {
        /** An object containing descendent input objects. */
        inputs: Inputs

        /**An optional reference string */
        name: Ref<string | null>

        /**
        An <ark-group /> allows you to make
        an array of objects from a group of inputs.
        This is where you can find them.
        */
        items: Ref<any[]>

        /**
        Shows validation result of all descendents,
        or null if not all have been checked.
        */
        valid: Ref<boolean | null>

        /**
        Will inherit from the parent form, and can
        be overridden at the input level.
        */
        validation: Ref<ValidationType>

        /** A formatted output of all descendent values. */
        value: ComputedRef<any | null>

        /** A list of errors of all descendent inputs. */
        errors: ComputedRef<string[]>
    }

    type ArkForms = {
        [key: string]: ArkForm
    }

    interface UseArkForm {
        /**An optional reference string */
        name: Ref<string | null>

        /** An object containing all group objects. */
        groups: InputGroups

        /** An object containing all input objects. */
        inputs: Ref<Inputs>

        /**
        Validation strategy for the form. Dictactes
        when a validation will fire. This can be overridden
        at the group or input level.
        */
        validation: Ref<ValidationType>

        /**
        Shows validation result of all descendents,
        or null if not all have been checked.
        */
        valid: ComputedRef<boolean | null>

        /**A list of all descendent <input /> name attributes. */
        names: ComputedRef<InputName[]>

        /**A list of errors for all descendents */
        errors: ComputedRef<string[]>

        /** Shows the modelValue ONLY if the input is valid. */
        validated: ComputedRef<null | any>

        /**A clean version of the descendent inputs. */
        value: ComputedRef<{
            [key: string]: string
        }>
    }
}
