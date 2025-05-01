export const messages = {
    unauthorized: "Unauthorized. Please log in to continue.",
    "invalid-email-password": "Invalid email or password.",
    forbidden: "You don’t have permission to access this resource.",
    "not-found": "The requested resource does not exist.",
    "request-timeout": "Request timeout. Please try again later.",
    "email-not-verified": "Please verify your email before logging in.",
    unknown: "An unknown error has occurred.",
    "internal-error": "Internal server error. Please try again later.",
    "session-expired": "Your session has expired. Please log in again.",
    "payment-failed": "Payment failed. Please check your details and try again.",
    "too-many-requests": "Too many requests. Please slow down.",
    ok: "Success! Your request was processed successfully.",
    created: "Resource created successfully.",
    accepted: "Request accepted, processing in progress.",
    "profile-updated": "Your profile was updated successfully.",
    "order-placed": "Your order was placed successfully.",
    "file-uploaded": "File uploaded successfully.",
    "payment-success": "Payment processed successfully.",
    "account-created": "Account created successfully.",
    null: "",
} as const

export type ArkMessageType = "success" | "error" | "message" | "warning" | "null"
export type MessageMap = typeof messages
export type ArkMessageKey = keyof MessageMap

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

// --- Main Inference Magic ---
type SplitMessageInput<T extends string> = T extends `${infer Type}.${infer Msg}`
    ? Type extends ArkMessageType
        ? Msg extends ArkMessageKey
            ? { type: Type; key: Msg }
            : never
        : never
    : never

export type ArkMessage<T extends string> =
    SplitMessageInput<T> extends { type: infer TT; key: infer KK }
        ? Expand<{
              type: TT & ArkMessageType
              message: MessageMap[KK & ArkMessageKey]
          }>
        : never

export function arkMessage<T extends `${ArkMessageType}.${ArkMessageKey}`>(code: T): ArkMessage<T> {
    const [type, key] = code.split(".") as [ArkMessageType, ArkMessageKey]

    if (!messages[key]) {
        console.warn(`[Arkform]: Message "${key}" is not defined.`)
    }

    return {
        type,
        message: messages[key],
    } as ArkMessage<T>
}
const msg = arkMessage("success.ok")

///////////
//
//
//
