<script setup>
import ExampleIframe from "../example-iframe.vue"
</script>

# ArkInput State

```typescript
type Model = {
    "v-model": string | number,
    
    // Used for referencing the form.
    "v-model:id": string, 

    // All field errors
    "v-model:errors": string[]
    
    // The entire state object for the input.
    "v-model:state": ArkInput 

    // null if not checked yet, boolean is the valid state.
    "v-model:valid": boolean | null 

    // This outputs the same as v-model, but ONLY if the input is valid.
    "v-model:validated": YourInputType | null
}
```

## Example

Here you can all state passed from this form.

<ExampleIframe url="/input/state" style="max-height: 500px;" />
