# Arkform Options

## Theme 

Here you can specify a file path to override the arkform default theme.

```typescript
export default defineNuxtConfig({
    arkform: {
        // Sets the default theme
        theme: "default",
    }
})
```
Themes can be overridden by passing a theme name to `<ark-form />`, `<ark-group />` or `<ark-input />` elements.

```html
<ark-input theme="myTheme" />
```

## Error Messages

Here you can pass the validators and their error that will take effect accross the entire application.

```typescript
export default defineNuxtConfig({
    arkform: {
        theme: "default", // Default theme used for the form
        errors: {
            "string.email": "Please enter a valid email.",
            "string > 0": "This field is required.",

            // Password validation errors
            // At least one lowercase letter
            "/^(?=.*[a-z])/": "Password must contain at least one lowercase letter.",

            // At least one uppercase letter
            "/^(?=.*[A-Z])/": "Password must contain at least one uppercase letter.",

            // At least one number
            "/^(?=.*\\d)/": "Password must contain at least one number.",

            // At least one special character
            "/^(?=.*[!@#$%^&*()_\\-+=<>?{}[\\]~])/":
                "Password must contain at least one special character.",

            // Minimum length of 8 characters
            "/.{8,}$/": "Password must be at least 8 characters long.",

            // Minimum length of 6 characters
            "/.{6,}$/": "Password must be at least 6 characters long.",

            // Minimum length of 12 characters
            "/.{12,}$/": "Password must be at least 12 characters long.",

            // Does not contain common words like 'password', '12345', or 'qwerty'
            "/^(?!.*(password|12345|qwerty|abc)).*$/":
                "Password cannot contain common words like 'password', '12345', or 'qwerty'.",

            // Password cannot contain spaces
            "/^\\S+$/": "Password cannot contain spaces.",

            // Password must contain both uppercase and lowercase letters
            "/^(?=.*[a-z])(?=.*[A-Z]).+$/":
                "Password must contain both uppercase and lowercase letters.",

            // Password must contain at least one non-alphanumeric character
            "/^(?=.*[^a-zA-Z0-9]).+$/":
                "Password must contain at least one non-alphanumeric character.",

            // Password cannot have repeated characters
            "/^(?!.*(.)\\1{2,}).+$/": "Password cannot have repeated characters.",

            // At least one special character from a wider range
            '/^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/':
                "Password must contain at least one special character.",

            // Password cannot contain sequential characters (e.g., 123, abc)
            "/^(?!.*(?:123|234|345|456|567|678|789|abc|bcd|cde|def)).*$/":
                "Password cannot contain sequential characters.",

            // Invalid email format
            "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.*/":
                "Please provide a valid email address.",

            // Another version of required field error
            "string>0": "This field is required.",
        },
    }
})
```

## Password

These are the password presets, they should conver the majority of cases. If not, you can alter them or create your own. Each strategy contains an array of ark validators. 

```typescript
export default defineNuxtConfig({
    arkform: {
        password: {
            weak: [
                // At least one digit
                "/^(?=.*\\d)/",

                // Minimum length of 6 characters
                "/.{6,}$/",
            ],
            medium: [
                // At least one lowercase letter
                "/^(?=.*[a-z])/",

                // At least one uppercase letter
                "/^(?=.*[A-Z])/",

                // At least one digit
                "/^(?=.*\\d)/",

                // Minimum length of 8 characters
                "/.{8,}$/",
            ],
            strong: [
                // At least one lowercase letter
                "/^(?=.*[a-z])/",

                // At least one uppercase letter
                "/^(?=.*[A-Z])/",

                // At least one digit
                "/^(?=.*\\d)/",

                // At least one special character
                "/^(?=.*[!@#$%^&*()_\\-+=<>?{}[\\]~])/",

                // Minimum length of 8 characters
                "/.{8,}$/",

                // No spaces
                "/^\\S+$/",
            ],
            bulletproof: [
                // At least one lowercase letter
                "/^(?=.*[a-z])/",

                // At least one uppercase letter
                "/^(?=.*[A-Z])/",

                // At least one digit
                "/^(?=.*\\d)/",

                // At least one special character
                "/^(?=.*[!@#$%^&*()_\\-+=<>?{}[\\]~])/",

                // Minimum length of 12 characters
                "/.{12,}$/",

                // Does not contain common words like "password", "12345", "qwerty", "abc"
                "/^(?!.*(password|12345|qwerty|abc)).*$/",

                // No repeated characters (e.g. "aaa")
                "/^(?!.*(.)\\1{2,}).*$/",

                // No sequential characters (e.g. "123", "abc", "cde")
                "/^(?!.*(?:123|234|345|456|567|678|789|abc|bcd|cde|def)).*$/",

                // No spaces
                "/^\\S+$/",
            ],
        },
    },
})
```
