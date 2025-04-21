interface Z {
    Params: { ark: string | string[] | undefined }
    Return: string[]
}

export const formatArkValidators: Func<Z> = (P) => {
    const { ark } = P

    if (!ark) return [] as string[]

    if (typeof ark === "string") {
        return [ark]
    }

    return ark
}
