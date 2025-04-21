export {}

declare global {
    /** Gives the ability to define a function in a single interface */
    interface Func<T extends { Params: any; Return: any }> {
        (params: T["Params"]): T["Return"]
    }
}
