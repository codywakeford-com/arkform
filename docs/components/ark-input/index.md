<script setup>
import ExampleIframe from "../example-iframe.vue"
</script>

# ArkInput

A supercharged version of the native `<input />` element with all the accessibility and styling headaches already handled for you.

### Descendents

Instead of using named slots like <template #prefix>, <ark-input /> lets you drop child components inside it just like you would with native HTML elements:

```html
<ark-input name="url">
  <ark-fore>https://</ark-fore>
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


<ExampleIframe url="/input/full" />

## Label

By default the input will use a label with the name as it's value. This can be overridden by passing the `<ark-label />` component.

```html
<ark-input name="message">
    <ark-label>Input a Message!</ark-label>
</ark-input>
```

<iframe 
  src="http://localhost:3000/input-with-label" 
  width="100%"
  style="border: none; border-radius: 6px; min-height: 225px;" 
></iframe>



## Help

```html
<ark-input name="message">
    <ark-help>Please enter a message.</ark-help>
</ark-input>
```
<iframe 
  src="http://localhost:3000/input-with-help" 
  width="100%"
  style="border: none; border-radius: 6px; min-height: 225px;" 
></iframe>

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

<ExampleIframe url="input-with-fore-aft" />


## v-model
```html
<ark-input v-model="output" />
```
Formatted state can be access via the normal `v-model.`.

## v-model:state

```html
<ark-input v-model:state="output" />
```


<iframe 
  src="http://localhost:3000/input-show-state-model" 
  width="100%"
  id="myIframe"
  style="border: none; border-radius: 6px; min-height: 500px;" 
></iframe>
The entire state object can be found using `v-model:state`.

## v-model:errors

This exposes a `string[]` of errors.

```html
<ark-input v-model:errors="output" />
```

<iframe 
  src="http://localhost:3000/input-show-errors-model" 
  width="100%"
  id="myIframe"
  style="border: none; border-radius: 6px; min-height: 500px;" 
></iframe>


```html
<ark-input v-model:id="output" />
```
This is a lower level api but exposed just in case and can be used to reference a form.

## Default Behaviour

By default all fields are required and will throw an error if not filled out. This uses the `ark` validator `"string > 0"`.

To opt out of this you can pass the optional prop to an input.

```html
<ark-input optional />
```

Bare in mind this wont override any other validators such as `"string.email"` will still throw an error.


## Wrappers

For ease of use there are many wrappers that preconfigure some inputs. View all the wrappers [here](/components/ark-input/wrappers)

```vue
<ark-email />

// is equivilent to 

<ark-input name="email" ark="string.email" />
```

```vue
<ark-password />

// is equivilent to

<ark-input name="password" :ark="['list of password regex rules']" />
```

Read more about password and their validation [here](./ark-password)
