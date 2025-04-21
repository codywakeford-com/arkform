# ArkInput Props

```typescript
interface Props {
    // ark validators
    ark?: any
        
    // name must be passed, every name in the form must be unique.
    name: string

    // used to validate if another form field is the same.
    matches?: string

    // sets the default state of the form, and allows you to reset to that state later.
    preset?: string | null

    // turns the base element into a <textarea />
    textarea?: boolean

    // allows an empty form field through. 
    optional?: boolean

    // turns the input inpt a checkbox
    checkbox?: boolean
}
```

For more information for what to pass into the `ark` prop, visit [arktype.io](https://arktype.io)
