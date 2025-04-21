# Theme

ArkForm provides full control over styling through a modular SCSS theme system. Whether you want to roll with the default look or fully tailor your forms to match your brand, it's all baked in.

**Themes are split into four key parts:**

- theme – the main stylesheet with all core component styles
- variables – SCSS variables for colors, fonts, spacing, etc.
- reset – optional reset to align form elements across browsers
- animation – transition styles for error messages and input feedback

By default, ArkForm ships with a clean base theme, but you can plug in your own styles by pointing to custom files in your `nuxt.config.ts`.


## Custom Theme

To use a custom theme you can override the `arkform.theme` options in `nuxt.config.ts`.

```typescript
export default defineNuxtConfig({
    arkform: {
        theme: "string.filepath",
        variables: "string.filepath",
        reset: "string.filepath",
        animation: "string.filepath"
    }
})
```


## Default Theme
The default `ark-default-theme.scss` can be seen below.

```scss
@use "./ark-reset.scss" as *;
@use "./ark-variables.scss" as *;
@use "./ark-animation.scss" as *;

.ark-form,
.ark-group {
    display: flex;
    flex-direction: column;
    font-family: var(--ark-font-family);
    gap: 15px;
    max-width: 350px;
    color: var(--ark-color-text);
}


// Ark Input
.ark-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .ark-input-container {
        display: flex;
        align-items: center;
        border: 1px solid var(--ark-color-secondary);
        border-radius: 5px;
        gap: 2px;
        padding: 1px;
        width: 100%;
        font-family: var(--ark-font-family);

        .ark-input,
        .ark-textarea {
            display: flex;
            flex-direction: column;
            gap: 2px;
            padding: 5px;
            font-family: var(--ark-font-family);
            border-radius: 5px;
            width: 100%;
            border: none;
            resize: none;
        }

        .ark-input:focus,
        .ark-textarea:focus {
            outline: none;
        }

        &:focus-within {
            border: 1px solid var(--ark-color-primary);
        }

        &.error {
            border: 1px solid var(--ark-color-error);

        }
    }

    .ark-fore {
        display: flex;
        align-items: center;
        font-family: var(--ark-font-family);
        padding-left: 5px;

        &.error {
            color: inherit;
        }
    }

    .ark-aft {
        display: flex;
        align-items: center;
        font-family: var(--ark-font-family);
        padding-right: 5px;
        gap: 5px;

        &.error {
            color: inherit;
        }
    }

    .ark-label {
        font-size: 0.9rem;
        text-transform: capitalize;
        font-family: var(--ark-font-family);

        &.error {
            color: var(--ark-color-error);
        }
    }

    .ark-help {
        font-size: 0.9rem;
        font-family: var(--ark-font-family);
    }
}

// Errors
.ark-errors {
    padding-left: 0;
    margin: 0;
    height: fit-content;

    .ark-error {
        color: var(--ark-color-error);
        font-family: var(--ark-font-family);
        overflow: hidden;
        font-size: 0.9rem;
    }

    .ark-error::first-letter {
        text-transform: capitalize;
    }
}

input:-webkit-autofill {
    background-color: transparent;
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    box-shadow: 0 0 0px 1000px white inset;
}
```
