---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Arkform"
  text: "The intuitive form library for Nuxt.js"
  tagline: The bleeding edge of web forms.
  actions:
    - theme: brand
      text: Get Started
      link: /overview
    - theme: alt
      text: Installation
      link: /installation
    - theme: alt
      text: Arktype
      link: https://arktype.io


features:
  - title: Zero-Cost Abstraction
    details: Arkform gives you complete control of your components — no black boxes, no magic. Just clean, declarative form building.

  - title: Type-Safe by Default
    details: Built on top of Arktype, Arkform gives you blazing-fast, rock-solid schema validation right out of the box.

  - title: Designed for Nuxt
    details: Built as a nuxt module so you can drop it into your project and go — no complex setup required.

  - title: Named Components
    details: Every input, every field — explicitly named and fully customizable. Finally, form building that makes sense.

  - title: Dev Experience First
    details: Thoughtfully designed API that feels like it belongs in your codebase. Fast, minimal, and predictable.

  - title: Framework-Aware
    details: SSR, client-side hydration, and composables that Just Work™. No hacks, no compromises.
---



## Have a go

Here is a register form mockup. Fully validated in only a few lines of code.

<WithinHero style="flex: 1;">
    <ExampleIframe url="/hero/skew" style="flex: 1; min-height: 400px; width: 100%;" />
</WithinHero>

<div style="display: flex; gap: 25px; margin-top: 15px;">

<ExampleIframe url="/" style="height: 500px; min-height: 600px; max-width: 70%; flex: 1; margin-bottom: 15px;"/>

```html
<ark-form>
    <ark-email/>
    <ark-password strength="medium" />
    <ark-confirm-password strength="medium" />
    <ark-submit/>
</ark-form>
```
</div>

<script setup>
import WithinHero from "./components/within-hero.vue";
import ExampleIframe from "./components/example-iframe.vue"
</script>
