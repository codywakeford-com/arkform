import {
    defineNuxtModule,
    addPlugin,
    createResolver,
    addComponentsDir,
    installModule,
    addImportsDir,
} from "@nuxt/kit"
import { resolve } from "node:path"
import { useArkformConfig } from "./runtime/composables/useArkformConfig"

// Module options TypeScript interface definition
export interface ModuleOptions {
    theme: "default" | string
    errors: {
        [arkValidator: string]: string
    }
    password: {
        [validator: string]: string[]
    }
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: "arkform",
        configKey: "arkform",
    },

    // Default configuration options of the Nuxt module
    defaults: {
        theme: "default",
        errors: {
            "string.email": "Please enter a valid email.",
            "string > 0": "This field is required.",

            // Password regex
            "/^(?=.*[a-z])/": "Password must contain at least one lowercase letter.",
            "/^(?=.*[A-Z])/": "Password must contain at least one uppercase letter.",
            "/^(?=.*\\d)/": "Password must contain at least one number.",
            "/^(?=.*[!@#$%^&*()_\\-+=<>?{}[\\]~])/":
                "Password must contain at least one special character.",
            "/.{8,}$/": "Password must be at least 8 characters long.",
            "/.{6,}$/": "Password must be at least 6 characters long.",
            "/.{12,}$/": "Password must be at least 6 characters long.",
            "/^(?!.*(password|12345|qwerty|abc)).*$/":
                "Password cannot contain common words like 'password', '12345', or 'qwerty'.",
            "/^\\S+$/": "Password cannot contain spaces.",
            "/^(?=.*[a-z])(?=.*[A-Z]).+$/":
                "Password must contain both uppercase and lowercase letters.",
            "/^(?=.*[^a-zA-Z0-9]).+$/":
                "Password must contain at least one non-alphanumeric character.",
            "/^(?!.*(.)\\1{2,}).+$/": "Password cannot have repeated characters.",
            '/^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/':
                "Password must contain at least one special character.",
            "/^(?!.*(?:123|234|345|456|567|678|789|abc|bcd|cde|def)).*$/":
                "Password cannot contain sequential characters.",
            "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.*/":
                "Please provide a valid email address.",
            "string>0": "this field is required.",
        },

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

    async setup(options, _nuxt) {
        const resolver = createResolver(import.meta.url)

        addComponentsDir({
            path: resolver.resolve("runtime/components"),
        })

        await installModule("@pinia/nuxt")

        if (options.theme === "default") {
            _nuxt.options.css.push(resolver.resolve("./runtime/style/ark-default-theme.scss"))
        } else {
            _nuxt.options.css.push(resolve(_nuxt.options.rootDir, options.theme))
        }

        addImportsDir(resolve(__dirname, "runtime/composables"))

        addPlugin({
            src: resolver.resolve("./runtime/plugins/pinia"),
            mode: "all",
            order: -100, // lower runs earlier
        })
        _nuxt.options.runtimeConfig.public.arkform = options
    },
})
