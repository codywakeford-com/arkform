# ArkGroup State

```typescript
type Model = {
    "v-model": {
        [fieldName: string]: any
    }
    
    // Used for referencing the form.
    "v-model:id": string, 

    // Errors from all descendent inputs
    "v-model:errors": string[]
    
    // The entire state object for the group.
    "v-model:state": ArkInputGroup 

    // null if not checked yet, boolean is the valid state.
    "v-model:valid": boolean | null 

    // This outputs the same as v-model, but only if the group is valid.
    "v-model:validated": {
        [fieldName: string]: string 
    } | null
}
```
