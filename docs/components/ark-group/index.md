
# ArkGroup

One of the more challenging things to implement well in a reusable way are complex object inputs that allow users to create, update and delete form items before then being validated.

This often takes a while to implement and can be error prone. Using pinia were able to make a powerful abstraction on this while maintaining full control on your part and remaining intuative.

Here is an example setup:
```html
<ark-form>
    <ark-group v-model="out" v-model:items="items">
        <ark-email />
        <ark-message />
    </ark-group>
<ark-form>

<script>
const out = ref({
    email: "",
    message: ""
})

const items = ref([
    { email: "example@mail.com", message: "hello" }
])
</script>
```

<iframe 
  src="http://localhost:3000/group" 
  width="100%"
  id="myIframe"
  style="border: none; border-radius: 6px; min-height: 325px;" 
></iframe>


The `<ark-group/>` component can take any `<ark-input>` or it's wrappers. 

The main power of `<ark-group/>` comes from how you can use it to create an array of objects which have been validated.

`<ark-group/>` exposes a few functions for managing the items array.

```vue
<ark-group ref="group"/>

<script lang="ts">
const group = ref(null)

// Add item
group.createGroupItem()
</script>
```

`createGroupItem()` will validate each form field. If all fields pass it will add all fields to an object, then into the items array.

### CRUD

By default `<ark-group/>` will render these items in a basic table. The headers of this table will be the names of your fields. And each field will have its own delete item button.

This behaviour can be turned off using the `crud` prop. 

```vue
<ark-group :crud="false" />
```
This will render below the group by default. You can take this component anywhere your application by using the provided `<ark-crud/>` component.

```vue
<ark-group v-model:id="groupId" />

// elsewhere in the application, 
// this doesnt have to be in the 
// same file. Form states are global.

<ark-crud :group-id="groupId" />
```



