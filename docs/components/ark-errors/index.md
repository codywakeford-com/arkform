<script setup>
import ExampleIframe from "../../components/example-iframe.vue"
</script>

# ArkErrors

Sometimes you might want to move the error messages elsewhere in the application. By using `<ark-errors/>` you can move it anywhere in the nuxt context.

```html
<ark-form v-model:id="id">
    <ark-input name="message" />
    <ark-submit />
</ark-form>

<h3>Elsewhere in the application.</h3>
<ark-errors :id="id" />


<script setup lang="ts">
const id = ref()
</script>
```

## Example

`<ark-input/>`, `<ark-group/>` and `<ark-form/>` all expose a UUID via `v-model:id`. This ID can be used to reference the element anywhere in the application. 

In the example above we pass the id into the `<ark-errors/>` component to be displayed.

<ExampleIframe url="/errors" />

