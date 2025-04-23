
# useForm()

To be as manipulatable as possible [Arkform]() exposes the state object for each of the core elements.

## Usage

You first need to get the id from the component your looking to get the state for. You can do this by using `v-model:id` on the component. 

```typescript
const id = ref()
const $arkform = useArkform()

const form = $arkform.useForm(id)
```

`form` is a regular object with reactive properties. You may notice some of these are computed properties, which means they are readonly. They are here to provide access to data formatted in various ways.

## Interface 

```typescript
interface UseArkForm {
    /**An optional reference string */
    name: Ref<string | null>

    /** An object containing all group objects. */
    groups: Ref<InputGroups>

    /** An object containing all input objects. */
    inputs: Ref<Inputs>

    /**
    Validation strategy for the form. Dictactes
    when a validation will fire. This can be overridden
    at the group or input level.
    */
    validation: Ref<ValidationType>

    /**
    Shows validation result of all descendents,
    or null if not all have been checked.
    */
    valid: ComputedRef<boolean | null>

    /**A list of all descendent <input /> name attributes. */
    names: ComputedRef<string[]>

    /**A list of errors for all descendents */
    errors: ComputedRef<string[]>

    /** Shows the modelValue ONLY if the input is valid. */
    validated: ComputedRef<null | any>

    /**A clean version of the descendent inputs. */
    value: ComputedRef<{
        [key: string]: string
    }>
}
```

You may update any of the refs at runtime. Remember not to replace the ref, but replace the refs value to avoid destroying reactivity.

```typescript
form.name.value = "newName"
form.validation = "eager"
```

Vue will throw a fit if you try to set one of the computed properties. If you want to update one of these update it's dependents.
