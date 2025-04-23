# useInput()

To be as manipulatable as possible [Arkform]() exposes the state object for each of the core elements.

## Usage

You first need to get the id from the component your looking to get the state for. You can do this by using `v-model:id` on the component. 

```typescript
const id = ref()
const $arkform = useArkform()

const input = $arkform.useInput(id)
```

`input` is a regular object with reactive properties. You may notice some of these are computed properties, which means they are readonly. They are here to provide access to data formatted in various ways.

## Interface 

```typescript
interface UseArkInput {
    /**Name attr on <input />. This must be unique per form.*/
    name: Ref<string>

    /**A list of errors for this particular input. */
    errors: Ref<string[]>

    /**Validation strategy. Dictactes when a validation will fire.*/
    validation: Ref<"none" | "shy" | "eager">

    /**A list of validators to check on input value. */
    arkValidators: Ref<any[]>

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
```


You may update any of the refs at runtime. Remember not to replace the ref, but replace the refs value to avoid destroying reactivity.

```typescript
input.name.value = "newName"
input.validation = "eager"
```

Vue will throw a fit if you try to set one of the computed properties. If you want to update one of these update it's dependents.
