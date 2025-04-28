import {
    defineNuxtModule,
    addPlugin,
    createResolver,
    addComponentsDir,
    installModule,
    addImportsDir,
    addImports,
} from "@nuxt/kit"
import fs from "fs"
import { existsSync } from "node:fs"
import { useArkForm } from "./runtime/composables/useArkform"
import { resolve } from "node:path"

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: "arkform",
        configKey: "arkform",
    },

    defaults: {},

    async setup(options, _nuxt) {
        await installModule("@pinia/nuxt")
        const resolver = createResolver(import.meta.url)

        addComponentsDir({
            path: resolver.resolve(__dirname, "runtime/components"),
        })
        //await installModule("@pinia/nuxt")
        addPlugin("runtime/plugins/pinia")

        // Load arkformConfig
        const arkformConfig = resolver.resolve(_nuxt.options.rootDir, "arkform.config.ts")
        const userConfig = require(arkformConfig).default

        // Give permission for local module //
        _nuxt.options.vite ??= {}
        _nuxt.options.vite.server ??= {}
        _nuxt.options.vite.server.fs ??= {}
        _nuxt.options.vite.server.fs.allow ??= []
        _nuxt.options.vite.server.fs.allow.push(resolver.resolve(__dirname, ".."))

        const $arkformConfig = useArkForm().config

        const themeDir = resolver.resolve(
            _nuxt.options.rootDir,
            $arkformConfig?.root || "./arkform",
        )

        if (existsSync(themeDir)) {
            addCssFilesFromDir(themeDir, _nuxt)
            _nuxt.options.watch.push(themeDir)
            _nuxt.options.alias["#arkform-theme"] = themeDir
        } else {
            console.warn(`[arkform] Theme directory ${themeDir} does not exist.`)
        }

        addImportsDir(resolver.resolve(__dirname, "runtime/composables"))
        addImportsDir(resolver.resolve("runtime/controllers"))
    },
})

function addCssFilesFromDir(directory: string, _nuxt: any) {
    const files = fs.readdirSync(directory)

    files.forEach((file) => {
        const filePath = resolve(directory, file)
        const stat = fs.statSync(filePath)

        console.log("resolving", filePath)

        if (stat.isDirectory()) {
            addCssFilesFromDir(filePath, _nuxt)
        } else if (file.endsWith(".css") || file.endsWith(".scss")) {
            _nuxt.options.css.push(filePath)
        }
    })
}
