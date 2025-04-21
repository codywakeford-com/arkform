<script setup>
import ExampleIframe from "../example-iframe.vue"
</script>

# ArkForm

The `<ark-form />` component is what drives all reactivity in arkform. We use [Pinia](https://pinia.vuejs.org/) to track the state of the form and its descendents with this component. For this reason automatic validation of inputs can only happen within `<ark-form />`.

## State

Most of the time you will just want the values of the user input and know if there valid.

You can get the clean output from `<ark-form v-model />`

```vue
<template>
    <ark-form v-model="form">
        <ark-input name="email" ark="string.email" />
        <ark-input name="password" ark="string > 0"/>
    </ark-form>
</template>

<script lang="ts">
const form = ref()
</script>
```

## Example

Here you will see the formatted outputs for the `<ark-form />` element.

<ExampleIframe url="/password/email-password" />




