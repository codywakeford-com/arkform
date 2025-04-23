<script setup>
import ExampleIframe from './.vitepress/components/example-iframe.vue'
</script>

# Your first form

In this page I'll give you a high level view of what you can do with [Arkform]() and link various pages for extra details.

### Theme

When you first install [Arkform]() there are no themes, this is because all themes are in your control. Find out how to install themes [here](/customization/theme)

OK, lets start with a minimal example. A form requires only a few things to work. The core, of course, is the `<ark-form />` tag. All form state is orginised using this tag. `<ark-input/>` and `<ark-group/>` elements must be inside a `<ark-form/>` to work at all.

```html
<ark-form>
    <ark-input name="message" />
</ark-form>
```

<ExampleIframe url="/plain-input" style="max-height: 200px;"/>

## Validation

[Full validation breakdown](/validation)

To validate a form we can pass in a validator to a `<ark-input />` element. We can pass a **string** or a **string[]**.

```html
<ark-form>
    <ark-input name="message" ark="string>=10" />
</ark-form>
```
<ExampleIframe url="/input-string>10" style="max-height: 200px;" />

For all primitives we can pass as strings. See the all the primitive validators [here](https://arktype.io)

```html
<ark-form>
    <ark-input name="message" :ark="['string>=10', 'string.alphanumeric']" />
</ark-form>
```
<ExampleIframe url="/input-stringarray" style="max-height: 200px;"/>

Learn more about form validation [here](/concepts/validation)

## Groups

[Full groups breakdown](/components/groups)

Groups are how you turn repeatable form structures into clean, validated, type-safe arrays. Whether you're collecting a string[] (like emails) or an object[] (like shipping addresses), `<ark-group>` makes it feel like plain HTML while giving you full validation and control.

### What is a group?

An `<ark-group>` is a container for one or more `<ark-input>` components. Every time the group is "submitted" (via `$arkform.addItem()`), it collects the current values of those inputs and pushes a new item into the group’s items array.

Doing this you're building a list of validated objects, typed and ready to use.

The `<ark-group />` element takes `<ark-inputs />` as its descendents and you use them like normal. An `<ark-group />` element exposes many of the same state objects as a form for complete control.

Each group exposes an array named `items`. This is where all form data is stored. You can access these items if needed using the `v-model:items`.

```html
<ark-form>
    <ark-group ref="group">
        <ark-input name="message2" />
        <ark-input name="message3" />
        <ark-email />
    </ark-group>

    <button @click="group?.addItem()">Submit</button>
</ark-form>

<script lang="ts">
const group = ref(null)
</script>
```

<ExampleIframe url="/group" style="max-height: 300px; min-height: 450px;"/>

To make building dynamic forms even faster, Arkform will include plug-and-play UI components for common use cases. These will give you everything you need to add, edit, and delete items from your group arrays — no boilerplate required.

**Some planned components:**

🟦 Pill-style inputs – perfect for collecting lists like email[] or tags[]

🗂️ Editable tables – ideal for managing object[] like user info, addresses, or product variants.

These components are designed to just drop in and work out of the box — while still providing the underlying API for when you need to build something custom.

## First Form

This is the basis of all the form logic used by arkform. All forms must be inside of one of these tags.

```html
<ark-form />
```

This is the simplest form we can make. But more is going on than meets the eye

```html
<ark-form>
    <ark-input name="message" />
</ark-form>
```
This form will render a simple form input and a label. By default the label will be the same as the name.

Inputs can take certain custom components. For example, you can pass a label or a help component that will be rendered.

```html
<ark-form>
    <ark-input name="message">
        <ark-label>A custom label:</ark-label>
        <ark-help>Please input a message</ark-help>
    </ark-input>
</ark-form>
```

Ark inputs expose a their state to be used. 

```html
<ark-input v-model="state" />
```

