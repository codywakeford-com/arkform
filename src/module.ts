import {
    defineNuxtModule,
    addPlugin,
    createResolver,
    addComponentsDir,
    installModule,
    addImportsDir,
    addImports,
    addServerHandler,
} from "@nuxt/kit"
import * as fs from "fs"
import { existsSync } from "node:fs"
import { resolve } from "node:path"
// import config from "../playground/arkform.config"
import {
    defineArkformConfig,
    type ArkformConfigFull,
} from "./runtime/controllers/config.controller"

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: "arkform",
        configKey: "arkform",
    },

    defaults: {},

    async setup(options, _nuxt) {
        const resolver = createResolver(import.meta.url)
        await installModule("@pinia/nuxt")

        // Give permission for local module //
        _nuxt.options.vite ??= {}
        _nuxt.options.vite.server ??= {}
        _nuxt.options.vite.server.fs ??= {}
        _nuxt.options.vite.server.fs.allow ??= []
        _nuxt.options.vite.server.fs.allow.push(resolver.resolve(__dirname, ".."))

        // Load arkformConfig
        const arkformConfigPath = resolve(_nuxt.options.rootDir, "arkform.config.ts")

        let userConfig: ArkformConfigFull = {}

        if (existsSync(arkformConfigPath)) {
            userConfig = await import(arkformConfigPath).then((m) => m.default)
        } else {
            console.warn(
                `[arkform] No arkform.config.ts found at ${arkformConfigPath}. Using default configuration.`
            )
        }

        const $arkformConfig = defineArkformConfig(userConfig)

        if ($arkformConfig.value.arkfire?.enabled) {
            _nuxt.hook("imports:dirs", (dirs) => {
                dirs.push(resolve(__dirname, "runtime/arkfire"))
            })

            addPlugin({
                src: resolver.resolve("./runtime/plugins/initFirebase"),
                mode: "all",
                order: -100, // lower runs earlier
            })
        }

        let firebaseConfig: any
        try {
            const raw = fs.readFileSync(
                resolver.resolve(_nuxt.options.rootDir, "firebase.json"),
                "utf-8"
            )
            firebaseConfig = JSON.parse(raw)
            console.log("[module]: Firebase config loaded:", firebaseConfig)

            _nuxt.options.runtimeConfig.public.firebase = {
                emulators: firebaseConfig.emulators,
            }
        } catch (err) {
            console.error("[module]: Failed to read firebase.json:", err)
        }

        // setup features
        const features = userConfig?.features ?? {}

        // if (features.tasks) {
        if (true) {
            addServerHandler({
                route: "/api/_arkfire/tasks/create",
                handler: resolver.resolve("./runtime/server/api/_arkfire/tasks/create.post.ts"),
            })
        }

        // Setup theme dir
        const themeDir = resolver.resolve(
            _nuxt.options.rootDir,
            $arkformConfig?.value?.root || "./arkform"
        )

        if (existsSync(themeDir)) {
            addCssFilesFromDir(themeDir, _nuxt)
            addCssFilesFromDir
            _nuxt.options.watch.push(themeDir)
            _nuxt.options.alias["#arkform-theme"] = themeDir
        } else {
            console.warn(`[arkform] Theme directory ${themeDir} does not exist.`)
        }

        addPlugin({
            src: resolver.resolve("./runtime/plugins/pinia"),
            mode: "all",
            order: -100, // lower runs earlier
        })

        addComponentsDir({
            path: resolver.resolve(__dirname, "runtime/components"),
        })

        const runtimeDirs = [
            "composables",
            "types",
            "stores",
            "controllers",
            "services/$env.ts",
            "services/$bus.ts",
            "services/$tasks.ts",
            "services/$modal.ts",
        ]

        for (const dir of runtimeDirs) {
            const a = resolver.resolve("runtime", __dirname, dir)

            _nuxt.options.watch.push(a)
            addImportsDir(a)
        }

        console.log("\x1b[38;2;255;85;0m🔥 [arkform] Installed\x1b[0m")
    },
})

function addCssFilesFromDir(directory: string, _nuxt: any) {
    const files = fs.readdirSync(directory)

    files.forEach((file) => {
        const filePath = resolve(directory, file)
        const stat = fs.statSync(filePath)

        // console.log("resolving", filePath)

        if (stat.isDirectory()) {
            addCssFilesFromDir(filePath, _nuxt)
        } else if (file.endsWith(".css") || file.endsWith(".scss")) {
            _nuxt.options.css.push(filePath)
        }
    })
}
