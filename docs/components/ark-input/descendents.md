<script setup>
import ExampleIframe from "../example-iframe.vue"
</script>

# ArkInput Descendents

Instead of using named slots like <template #prefix>, <ark-input /> lets you drop child components inside it — just like you would with native HTML elements:

```html
<ark-input name="url">
  <ark-fore>https://</ark-fore>
  <ark-input />
  <ark-aft>.com</ark-aft>
</ark-input>

<ark-input name="message">
    <ark-label>Email Address:</ark-label>
    <ark-fore>Before</ark-fore>
    <ark-help>Please input your email.</ark-help>
    <ark-aft>Before</ark-aft>
</ark-input>
```

This approach mirrors how you'd build a custom input using raw HTML think: 
```html
<div>
    <span>prefix</span>
    <input />
    <span>suffix</span>
</div>
```
but with full validation baked in. It’s like slots but without the boilerplate.

**Here is an example using all of the descendents.**

<ExampleIframe url="/input/full" />
