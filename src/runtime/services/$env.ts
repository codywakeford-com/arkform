import { useRuntimeConfig } from "nuxt/app"

export type $Env<T> = {
    public: {
        dev: boolean
        prod: boolean
        test: boolean
        port: number
        host: string
        baseURL: string
    }
} & T

export function defineEnv<const T extends { public?: object }>(data: T): $Env<T> {
    const { public: publicData = {}, ...secretData } = data

    return {
        ...secretData,
        public: {
            ...publicData,
            dev: process.env.NODE_ENV === "development",
            prod: process.env.NODE_ENV === "production",
            test: process.env.NODE_ENV === "test",
            port: Number(process.env.PORT) || 3000,
            host: process.env.HOST || "localhost",
            baseURL: process.env.BASE_URL || "/",
        },
    } as $Env<T>
}
