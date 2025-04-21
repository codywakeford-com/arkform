# ArkPassword

`<ark-password/>` is a wrapper around the `<ark-input/>` element that comes with a few powerful features. `<ark-password/>` and `<ark-confirm-password/>` are the same just with a different name attribute.

**Example**
```html
<ark-form v-model="out">
    <ark-password strength="strong" />
    <ark-confirm-password strength="strong" />
</ark-form>

out = {
    password: "",
    "confirmPassword": ""
}

<script lang="ts">
interface Props {
    strength: "none" | "weak" | "medium" | "strong" | "bulletproof"
}
</script>
```

The password element takes a `strength` prop. This passes regex validators to the `ark` validators prop. The default value is medium.
