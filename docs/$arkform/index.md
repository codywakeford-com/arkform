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
    reset: (id: string) => void

    // Clears all element errors.
    clearErrors: (id: string) => void

    // Validates each input within element.
    validate: (id: string) => void

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

## Example Usage 

```vue
<template>
    <ark-form v-model:id="formId">
        <ark-input name="email" />
        <button @click="$arkform.validate(formId)">Validate</button>
        <button @click="$arkform.reset(formId)">Reset</button>
    </ark-form>
</template>

<script lang="ts">
const formId = ref("")
</script>
```
