import { defineNuxtModule, addPlugin, createResolver, addComponentsDir, installModule, addImportsDir, addImports } from "@nuxt/kit"
import fs from "fs"
import { existsSync } from "node:fs"
import { resolve } from "node:path"
import config from "../playground/arkform.config"
import { defineArkformConfig, type ArkformConfigFull } from "./runtime/controllers/config.controller"

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
        const arkformConfigPath = resolver.resolve(_nuxt.options.rootDir, "arkform.config.ts")
        const userConfig = await import(arkformConfigPath).then((module) => module.default)

        const $arkformConfig = defineArkformConfig(userConfig)

        // Setup firebase
        if ($arkformConfig.value.arkfire?.enabled) {
            // await installModule("@nuxt-vuefire")

            // Optional: inject composables
            _nuxt.hook("imports:dirs", (dirs) => {
                dirs.push(resolve(__dirname, "runtime/services/arkfire")) // /firebase
            })

            addPlugin({
                src: resolver.resolve("./runtime/plugins/firebase"),
                mode: "all",
                order: -100, // lower runs earlier
            })

            console.log("installing firebase")
        }

        // Setup theme dir
        const themeDir = resolver.resolve(_nuxt.options.rootDir, $arkformConfig?.value?.root || "./arkform")

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

        addImportsDir(resolver.resolve(__dirname, "runtime/composables"))
        addImportsDir(resolver.resolve("runtime/types"))
        addImportsDir(resolver.resolve(__dirname, "runtime/stores"))
        addImportsDir(resolver.resolve("runtime/controllers"))

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
