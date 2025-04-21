# Validation

You do everything you can to make your project type-safe until the user shows up. User input is the wild west. And you're left staring at an unknown wondering what horrors await.

Built on [Arktype](https://arktype.io), a runtime validation library that feels like writing TypeScript, and yes, it’s actually type-safe.

With Arktype powering your validation, you get zero-runtime-cost typesafety, full schema control, and no more guesswork around user input.

## Primatives

For the most part we just need to know something basic about our user input.
We can pass in almost any variable that you would find in typescript: `string`, `undefined`, `number`, `NaN` and so on, but we also have access to more specific typechecking.

### String 

```vue
<template>

    <ark-form>
        <ark-input name="email" ark="string.email"/>
        <ark-input name="password" ark="string>10"/>

        <ark-submit />
    </ark-form>

</template>
```
Here we pass a `"string.email"` validator. `email` is a subset of the `string` type in [Arktype](https://arktype.io)


### Number

```vue
<template>

    <ark-form>
        <ark-input name="mobile" ark="number < 10"/>
        <ark-input name="timestamp" ark="number.epoch"/>
        <ark-input name="days in week" ark="number.integer <= 3"/>

        <ark-submit />
    </ark-form>

</template>
```

For now you can only specify validators on the input level.
