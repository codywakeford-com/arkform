# $arkform

Because of Arkforms event driven architecture Arkform can provide functions that can be called from anywhere in the application.

The `$arkform` object is globally available with nuxt.

## Usage

You can access the `$arkform` object by using the composable `useArkForm`.

```typescript
const $arkform = useArkForm()
```

## Interface

The id of any `<ark-input/>`, `<ark-group/>` and `<ark-form/>` can be retrived using `v-model:id` on the elements.

Some functions are agnostic of the element type. You can clear errors of just a single input or clear all errors in a form. Whereas you cant submit a input. 

Always pass the `id` of the element your trying to operate on.

```typescript
interface $Arkform {
    // Resets the element to the default state. 
    // Can be used on input, group or form.
    reset: (id: string) => void

    // Clears all element errors.
    // Can be used on input, group or form.
    clearErrors: (id: string) => void

    // Validates each input within element.
    // Can be used on input, group or form.
    validate: (id: string) => void

    // An object containing refs and computed refs for element state
    useForm: (id: string) => ArkForm

    // An object containing refs and computed refs for element state
    useInput: (id: string) => ArkInput

    // An object containing refs and computed refs for element state
    useGroup: (id: string) => ArkGroup

    // Form specific functions
    form: {
        submit: (id: string) => void
    },

    // Group specific functions
    group: {
        // Creates a new `item` from the group.
        add: (id: string) => void
        
        // Removes an item from the groups `items`.
        remove: (id: string) => void

        // Mounts an item into the inputs for editing.
        edit: (id: string) => void
    }
}
```

## Minimal Example

```vue
<template>
    <ark-form v-model:id="formId">
        <ark-input name="email" />
        <button @click="$arkform.validate(formId)">Validate</button>
        <button @click="$arkform.reset(formId)">Reset</button>
    </ark-form>
</template>

<script lang="ts">
const $arkform = useArkform()
const formId = ref("")
</script>
```
