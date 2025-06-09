export type uuid = string & { _brand: "uuid" }

export function uuid(length = 20): uuid {
    const chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"
    let uuid: string = ""

    for (let i = 0; i < length; i++) {
        uuid += chars[Math.floor(Math.random() * chars.length)]
    }

    return uuid as uuid
}
