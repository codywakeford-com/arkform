<script setup>
import ExampleIframe from './.vitepress/components/example-iframe.vue'
</script>

# Your first form

In this page I'll give you a high level view of what you can do with [Arkform]() and link various pages for extra details.

A form requires 1 thing to work. That is the `<ark-form/>` tag. All form state is stored using this tag. All `<ark-input/>` and `<ark-group/>` must be inside a `<ark-form/>` to work.

```html
<ark-form>
    <ark-input name="message" />
</ark-form>
```

<ExampleIframe url="/plain-input" />

## Validation

[Full validation breakdown](/validation)

To validate a form we can pass in a validator to a `<ark-input />` element. We can pass a **string** or a **string[]**.


```html
<ark-form>
    <ark-input name="message" ark="string>=10" />
</ark-form>
```
<ExampleIframe url="/input-string>10" />

For all primitives we can pass as strings. See the all the primitive validators [here](https://arktype.io)

```html
<ark-form>
    <ark-input name="message" :ark="['string>=10', 'string.alphanumeric']" />
</ark-form>
```
<ExampleIframe url="/input-stringarray" />

Learn more about form validation [here](/validation)

## Groups

[Full groups breakdown](/components/groups)

With primitive inputs solved, we look to building typesafe arrays given a user input. Maybe we want to produce a **string[]**, for example collecting a list of emails. Or we want to produce a **object[]** list a list of billing addresses. This is where we can leverage `<ark-group/>`.

The `<ark-group />` element takes `<ark-inputs />` as its descendents and you use them like normal.

Each group exposes an array named `items`. This is where all form data is stored. You can access these items if needed using the `v-model:items`

```html
<ark-form>
    <ark-group ref="group">
        <ark-email />
    </ark-group>

    <button @click="group?.addItem()">Submit</button>
</ark-form>

<script lang="ts">
const group = ref(null)
</script>
```

<ExampleIframe url="/group" />

By default a group will render UI to manage the groups. I plan to add more UI designs that work out of the box for the most common use cases. For example chips for primitive arrays or tables for extensive objects.

To build your own UI please refer to the functions below.


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

## Box Model


<iframe 
  src="http://localhost:3000/box-model" 
  width="100%"
  style="border: none; border-radius: 6px; min-height: 325px;" 
></iframe>
