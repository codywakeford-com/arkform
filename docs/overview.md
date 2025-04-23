<script setup>
import ExampleIframe from "./components/example-iframe.vue"
</script>

# Arkform

Arkform was built to make building forms a lot faster and provide a smoother development experience. Managing form state and validating user input can be a pain. Built with DX in mind Arkform attemps to make this a breeze with an intuative HTML native feel.

Arkform is built on top of [Arktype](https://arktype.io), a great runtime validation library. Arktype provides a powerful set of features that mimic the native [Typescript](https://www.typescriptlang.org/) syntax. 


## Overview

The majority of what you'll be using forms for is basic text input. Arktype makes it easy to validate your primitive user inputs. More information on the Arktype primitive validation can be found [here](https://arktype.io/docs/primitives).

## Example 

Here you can see a register form mockup and it's outputs.


<ExampleIframe url="/" style="min-height: 575px;"/>


## Validation

[Full Validation Breakdown](/concepts/validation)

Validation is often the most tedious thing to set up when building from scratch and form libraries often take control away when giving form valiadation. Arkform aims to be a zero cost abstraction built with DX center stage.

Validators can be passed into the `ark` prop of the `<ark-input />` component or any of its wrappers as shown below. Please visit [Arktype] for more information on validators. The `ark` prop accepts a string or an array of strings.

Here are some examples of validating primitive values.

```html
<ark-input ark="string.email" />

<ark-input ark="string > 0" />

<ark-input ark="string.uuid.v4" />

<ark-input ark="string.url"/>

<ark-input ark="number < 500"/>

<ark-input ark="string.NaN"/>

<ark-input ark="string.Infinity"/>

<ark-input :ark="['string > 0', 'string.alphanumeric']" />
```

oh and it takes regex too!

```html
<ark-input ark="/^\s*\S+(?:\s+\S+)+\s*$/" />
```

<iframe 
  src="http://localhost:3000/validation" 
  width="100%"
  id="myIframe"
  style="border: none; border-radius: 6px; min-height: 325px;" 
></iframe>

When a form is submit using `<ark-submit />` these validators will be checked and will throw an error if they do not meet the spec.

```html
<ark-form v-model="output" :submit="myFunction">
    <ark-input name="email" ark="string.email"/>
    <ark-submit>Submit</ark-submit>
</ark-form>
```

This will display any errors to the user and only run the given function on success.


