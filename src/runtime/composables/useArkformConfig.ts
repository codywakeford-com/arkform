import type { ModuleOptions } from "~/src/module"

export function useArkformConfig(): ModuleOptions {
    const config = useRuntimeConfig().public.arkform as ModuleOptions

    return config
}
