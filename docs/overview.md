<script setup>
import ExampleIframe from "./components/example-iframe.vue"
</script>

# Arkform

Arkform was built to make form development faster and more intuitive, with a focus on developer experience (DX). Managing form state and validating user input has traditionally been a hassle — Arkform aims to change that by offering a streamlined, HTML-native feel without sacrificing flexibility or power.

At its core, Arkform is powered by Arktype — a modern runtime validation library that mirrors native TypeScript syntax. This gives you a strong, expressive way to define and enforce types directly in your forms.

### Why Arkform?

As a developer running a web agency, I built Arkform to save time and write more maintainable code, not to reinvent the wheel, but to fix the flat tire. Most form libraries either over-engineer simple tasks or underdeliver on complex ones. Arkform is designed to strike the perfect balance.

While other libraries quickly jump into adding every feature they can conjure up, I want to focus on building the best abstraction ontop of form validation. This means, as features are added you will still be able to manipulate every aspect of the form. Abstraction without comprimise takes careful design and planning but ultimately is the only way we end up with complex things that are easy to use, rather than the other way around. 

**We focus on:**

🔧 Simplicity: Should feel like writing native HTML.

🧠 Clarity: Easy to understand, reason about, and onboard other developers.

⚡ Power: Capable of handling advanced scenarios without a steep learning curve.

Whether you're building a basic contact form or a complex multi-step flow, Arkform gives you the tools you need without getting in your way.


## Core Use Case
The most common use case for forms is handling basic text input — and this is where Arkform shines. With Arktype under the hood, you get rich validation out of the box for all your primitive types (strings, numbers, booleans, etc.).

To get a sense of how Arktype works with primitives, check out their docs here.

## Example 

To give you a quick peak on the library here is a register form mockup and some of it's basic outputs along with the code used.


<ExampleIframe url="/" style="min-height: 575px;"/>

And here is the code this example uses. You you usually wouldn't need this many `v-models`, just so you can see whats under the hood.

```vue
<template>
    <ark-form
        v-model="form"
        v-model:performance="perf"
        v-model:errors="errors"
        v-model:valid="valid"
        v-model:validated="validated"
        v-model:id="id"
    >
        <div class="inline">
            <ark-input name="firstName"></ark-input>
            <ark-input name="lastName"></ark-input>
        </div>

        <ark-input name="email" ark="string.email">
            <ark-fore name="material-symbols:mail-rounded" />
        </ark-input>

        <ark-input name="password" ark="string>6" />
        <ark-submit />
    </ark-form>
</template>
```

As you can see not only do we remove a lot of the boiler plate from the native HTML we also have a declarative api for defining our forms.


