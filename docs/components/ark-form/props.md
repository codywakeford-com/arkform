# Arkform Props

```typescript
interface Props {
    // pass a function to run on validation success.
    submit?: Function | null

    // validation strategy.
    validation?: "none" | "shy" | "eager"

    // toggle a reset button component
    reset?: true | false
}
```
