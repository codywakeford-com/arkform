# useGroup()

To be as manipulatable as possible [Arkform]() exposes the state object for each of the core elements.

## Usage

You first need to get the id from the component your looking to get the state for. You can do this by using `v-model:id` on the component. 

```typescript
const id = ref()
const $arkform = useArkform()

const group = $arkform.useInput(id)
```

`group` is a regular object with reactive properties. You may notice some of these are computed properties, which means they are readonly. They are here to provide access to data formatted in various ways.

## Interface 

```typescript
type UseArkGroup = {
    /** An object containing descendent input objects. */
    inputs: Inputs

    /**An optional reference string */
    name: Ref<string | null>

    /**
    An <ark-group /> allows you to make
    an array of objects from a group of inputs.
    This is where you can find them.
    */
    items: Ref<any[]>

    /**
    Shows validation result of all descendents,
    or null if not all have been checked.
    */
    valid: Ref<boolean | null>

    /**
    Will inherit from the parent form, and can
    be overridden at the input level.
    */
    validation: Ref<ValidationType>

    /** A formatted output of all descendent values. */
    value: ComputedRef<any | null>

    /** A list of errors of all descendent inputs. */
    errors: ComputedRef<string[]>
}
```

You may update any of the refs at runtime. Remember not to replace the ref, but replace the refs value to avoid destroying reactivity.

```typescript
group.name.value = "newName"
```


