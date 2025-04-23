# $arkform

Arkform exposes a powerful global API you can tap into from anywhere in your app. Thanks to its event-driven architecture, you can programmatically interact with forms, groups, and inputs without needing to pass references around manually.


## Getting Started

Use the `useArkForm` composable to access the `$arkform` API.

```typescript
const $arkform = useArkForm()
```

## Interface Overview
Every `<ark-input>`, `<ark-group>`, and `<ark-form>` component supports a unique id, which can be synced via v-model:id. All $arkform methods expect that id as their target reference.

Some methods are universal across all element types (e.g., reset, clearErrors), while others are specific to forms or groups.

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
