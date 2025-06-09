type Z = {
    Params: {
        id?: string
        formId?: string
        groupId?: string | null
        inputId?: string
        add: "group" | "input"
    } | void

    Return: string
}

// Ids encode where an element is.
// Example: "form:XXXXXX-input:XXXXXX"
//
// Form id = "form:XXXXXX"
// Input id = "form:XXXXXX-input:XXXXXX"
// input in group = "form:XXXXXX-group:XXXXXX-input:XXXXXX"

export const uuid: Func<Z> = (P) => {
    let { id, add } = P || {}

    const chars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const randomCode = () => Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")

    if (!id) {
        return `form:${randomCode()}`
    }

    if (add === "group") {
        id += `-group:${randomCode()}`
    }

    if (add === "input") {
        id += `-input:${randomCode()}`
    }

    return id
}

interface IdType {
    formId: string
    inputId: null | string
    groupId: null | string
    type: "group" | "form" | "input" | null
}

export function getIdsFromId(id: string): IdType {
    const result: IdType = {
        formId: "",
        inputId: null,
        groupId: null,
        type: null,
    }

    if (!id || typeof id !== "string") {
        console.error(`Invalid id - (${id})`)
        return result
    }

    const split = id.split("-")

    let theId = ""

    for (let i = 0; i < split.length; i++) {
        if (i === split.length - 1) {
            result.type = split[i].split(":")[0] as IdType["type"]
        }

        if (i > 0) {
            theId += `-${split[i]}`
        } else {
            theId += split[i]
        }

        if (split[i].startsWith("form")) {
            result.formId = theId
        }

        if (split[i].startsWith("input")) {
            result.inputId = theId
        }

        if (split[i].startsWith("group")) {
            result.groupId = theId
        }
    }

    if (!result.formId) {
        throw new Error(`Invalid id ${id}`)
    }

    return result
}
