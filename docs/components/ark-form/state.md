<script setup>
import ExampleIframe from "../example-iframe.vue"
</script>

# Arkform State

To be as powerful as possible `<ark-form />` exposes many state props. 

```typescript
type Model = {
    "v-model": { 
        [fieldName: string]: string 
    },
    
    // Used for referencing the form.
    "v-model:id": string, 

    // Errors from all descendent fields including groups.
    "v-model:errors": string[]
    
    // The entire state object for the form.
    "v-model:state": Arkform 

    // null if not checked yet, boolean is the valid state.
    "v-model:valid": boolean | null 

    // This outputs the same as v-model, but only if the form is valid.
    "v-model:validated": {
        [fieldName: string]: string 
    } | null

    // Names of all descendent inputs, including groups.
    "v-model:names": boolean | null 

    // Number of milliseconds the last verification took.
    "v-model:performance": number
}
```
## Example

Here you can see all the exposed reactive values provided by the `<ark-form />` element.

<ExampleIframe url="/form/state" style="min-height: 425px;"/>
