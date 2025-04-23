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


## Label

By default the input will use a label with the name as it's value. This can be overridden by passing the `<ark-label />` component.

```html
<ark-input name="message">
    <ark-label>Input a Message!</ark-label>
</ark-input>
```


<ExampleIframe url="/input-with-label" style="max-height: 200px;" />

## Help

```html
<ark-input name="message">
    <ark-help>Please enter a message.</ark-help>
</ark-input>
```

<ExampleIframe url="/input-with-help" style="max-height: 200px;"/>

Help message is displayed below the input element to give the user a hint.


# Fore and Aft

For and aft component can be added and will be inserted in the input field before and after the input area. Commonly this might be used for a icon or button.


```html
<ark-input name="message">
    <ark-fore>
        <Icon name="material-symbols:android-messages" />
    </ark-fore>

    <ark-aft>
        <Icon name="material-symbols:android-messages" />
    </ark-aft>
</ark-input>
```

<ExampleIframe url="/input-with-fore-aft" />

As the most common use case for for and aft is to put icons both `<ark-fore />` and `<ark-aft />` can take a `name` attribute  which will render an `<Icon />` using nuxt icon. 
So the above example may also be achieved using:


```html
<ark-input name="message">
    <ark-fore name="material-symbols:android-messages" />
    <ark-aft name="material-symbols:android-messages" />
</ark-input>
```

Find the full icon library at [icones.js](https://icones.js.org/collection/all)

Visit [Nuxt Icon](https://nuxt.com/modules/icon) to find out more.

