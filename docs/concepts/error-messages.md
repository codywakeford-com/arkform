<script setup>
import ExampleIframe from "../components/example-iframe.vue"
</script>

# Error Messages


## Customising Errors

To override all error messages throughout your application you can provide alternatives in `nuxt.config.ts`. Specify the `ark` validator that your using and the error message you would like to show when a validation of that type fails.

```typescript
export default defineNuxtConfig({
    arkform: {
        errors: {
            "string.email": "Please enter a valid email address.",
            "\b\w+\b": "Please provide a valid word."
        }
    }
})
```

Alternatively you can pass your custom errors into directly to any `<ark-form/>`, `<ark-group/>` or `<ark-input/>` to specify the error just that element or its descendents.

```vue
<template>
    <ark-form>
        <ark-input
            name="email"
            ark="string.email"
            :custom-errors="customErrors"
        />

        <ark-submit>Submit</ark-submit>
    </ark-form>
</template>

<script setup lang="ts">
const customErrors = {
    "string.email": "Please enter a valid email address."
}
</script>
```

### Example
Now when we use these validators in our forms we get this.

<ExampleIframe url="/errors/custom-errors" />

