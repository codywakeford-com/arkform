# Theme

Arkform gives you full control over your form styling by letting you own your CSS. Instead of injecting styles behind the scenes or locking you into a rigid theme system, Arkform embraces your project’s design language by allowing you to download and customize Theme Packs directly into your codebase. 

Arkform tries to stay out of the way and leave out the black magic. Download themes straight into your project and edit them as you need.

### How it works

Arkform does not apply any built-in CSS. All styling is opt-in. You can choose from a selection of pre-built Theme Packs — simple CSS or SCSS files designed to work with Arkform out of the box — and bring them into your project with a single download.

These themepacks work on css namespace selectors to allow for having multiple themes in one project. We effectivly just give our components a theme class. 

**This means:**

You’re in charge of every style rule.

There are no hidden styles — what you see is what you get.

You can edit, extend, or nuke the theme however you like.

No weird specificity battles with a form library trying to be clever.

## Default Theme

Download the default theme pack using the curl:

```bash
mkdir -p arkform/themes
mkdir -p arkform/animations

# Default theme install
curl -L -o ./default-theme.zip https://github.com/codywakeford-com/arkform/blob/master/arkform/themes/default/default-theme.zip

# Default animation
curl -L -o ./default-animation.zip https://github.com/codywakeford-com/arkform/blob/master/arkform/themes/default/default-animation.zip

# Unzip
unzip ./arkform-default-theme.zip -d ./arkform/themes
unzip ./arkform-default-animation.zip -d ./arkform/animation

# Clean up
rm default-theme.zip
rm default-animation.zip
```

Of course if you want to browse these files before hand visit [github](https://github.com/codywakeford-com/arkform/blob/master/ark-themes/).

You can specify a theme in `nuxt.config.ts`.

```typescript
export default defineNuxtConfig({
    arkform: {
        style: {
            // sets the default theme class
            themepack: "arkform-default-theme",

            // sets the default animation class
            animation: "arkform-default-animation",
        },
    }
})
```
**Themes are split into three key parts:**

- main – the main stylesheet with all core component styles
- variables – SCSS variables for colors, fonts, spacing, etc.
- reset – this configures some defaults

## Using Multiple Themes

Arkform supports multiple themes within a single project. You can download a template theme pack from our [GitHub repository](https://github.com/codywakeford-com/arkform).

Here is an example layout for managing multiple themes in one project.

```tree
@
├── animations
│   ├── default.ts
│   ├── yourAnimation.ts
└── themes
    ├── default
    │   ├── main.scss
    │   ├── reset.scss
    │   ├── variables.scss
    └── authForms
        ├── main.scss
        ├── reset.scss
        └── variables.scss
```

You dont need to use this layout but it makes it easy to define multiple form themes and switch between them. 

**How it works**

Because all elements will be inside a `<ark-form />` tag we can add a custom class to the form and use that to change themes.

Each theme is scoped using a unique class name to avoid conflicts. For example:

```scss
// Theme namespace
.my-arkform-theme {
  // Your custom theme styles here
}
```
Then you can provide a dynamic class to `<ark-form />`.

```html
<ark-form theme="my-arkform-theme" />
```

This tells Arkform to apply only that theme’s styles to the given form instance.
