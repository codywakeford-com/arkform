# ArkInput Wrappers

Wrappers are syntax suger to make using the `<ark-input/>` easier to use.

For example, these forms are the same.

```vue
<template>
    <ark-form>
        <ark-email />
    </ark-form>


    <ark-form>
        <ark-input name="email" :ark="['string.email']" />
    </ark-form>
</template>
```

The password example has a few more things going on but it's the same priciple.


```vue
<template>
    <ark-form>
        <ark-password />
    </ark-form>


    <ark-form>
        <ark-input name="password" type="password" :ark="passwordValidators" />
    </ark-form>
</template>
```

Ok now I'll drop all the wrappers.

```vue
<template>

    <ark-email />
    <ark-password />
    <ark-confirm-password/>

</template>
```

