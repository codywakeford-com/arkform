# Login Example

I've made [Arkform]() speed up your dev workflow while staying out of your way. Here I'll show the common example of a login form using the `<ark-input/>` wrapper components.

```html
<ark-form v-model="out">
    <ark-email/>
    <ark-password/>
    <ark-confirm-password matches="password"/>
</ark-form>

out = {
    email: "",
    password: "",
    "confirm-password": ""
}

<script lang="ts">
const out = ref()
</script>
```

This really is all you need for a validated register form. Using the `<ark-input/>` wrappers we can remove some boiler plate.

You'll notice we pass a `matches` props to `<ark-confirm-password/>`. Matches can be used to validate that the form field matching the name `matches` will be the same. If not `<ark-confirm-password/>` will throw an error. For this to work it can be the `name` attribute of any field within the `<ark-form/>`.

Name attributes defaults of course can be overridden.

```html
<ark-form v-model="out">
    <ark-email/>
    <ark-password name="mypassword" />
    <ark-confirm-password matches="mypassword"/>
</ark-form>
```
