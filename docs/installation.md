# Installation

Arkform is built for nuxt, so installation is easy using the Nuxt modules ecosystem.

### Add with nuxi

Simply add using the nuxi cli.

```bash
npx nuxi module add arkform
```


### Add manually

First install the npm package, then add the module into `nuxt.config.ts`.

```bash
pnpm i arkform
```

and add the module in `nuxt.config.ts`.

```typescript
export default defineNuxtConfig({
    modules: ["arkform"],
})
```


