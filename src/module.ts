import {
    defineNuxtModule,
    addPlugin,
    createResolver,
    addComponentsDir,
    installModule,
    addImportsDir,
} from "@nuxt/kit"
import fs from "fs"
import { resolve } from "node:path"
import { arkDefaultAnimation } from "./runtime/controllers/animation.controller"

// Module options TypeScript interface definition
export interface ModuleOptions {
    /** */
    root: string
    theme: string
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
        root: "arkform",
        theme: "default",
        errors: {
            "string.email": "Please enter a valid email.",
            "string > 0": "This field is required.",
            "string>0": "This field is required.",
            "string>6": "Must be over length 6",

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

        const themeDir = resolve(_nuxt.options.rootDir, options.root)
        addCssFilesFromDir(themeDir, _nuxt)

        addImportsDir(resolve(__dirname, "runtime/composables"))

        _nuxt.options.runtimeConfig.public.arkform = options
    },
})

function addCssFilesFromDir(directory: string, _nuxt: any) {
    const files = fs.readdirSync(directory)

    files.forEach((file) => {
        const filePath = resolve(directory, file)
        const stat = fs.statSync(filePath)

        console.log("resolving", filePath)

        if (stat.isDirectory()) {
            // If it's a directory, recurse into it
            addCssFilesFromDir(filePath, _nuxt)
        } else if (file.endsWith(".css") || file.endsWith(".scss")) {
            // If it's a CSS or SCSS file, add it to the Nuxt CSS array
            _nuxt.options.css.push(filePath)
        }
    })
}
