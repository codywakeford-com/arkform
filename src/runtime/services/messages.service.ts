const messages = {
    "auth/invalid-email": "Invalid email or password.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/user-disabled": "Unauthorized. Please log in to continue.",
    "auth/user-not-found": "Invalid email or password.",
    "auth/wrong-password": "Invalid email or password.",
    "auth/email-already-in-use": "An account with this email address already exists.",
    "auth/weak-password": "Invalid email or password.",
    "auth/operation-not-allowed": "You don’t have permission to access this resource.",
    "auth/too-many-requests": "Too many requests. Please slow down.",
    "auth/invalid-verification-code": "Invalid email or password.",
    "auth/invalid-verification-id": "Invalid email or password.",
    "auth/missing-android-pkg-name": "Internal server error. Please try again later.",
    "auth/missing-continue-uri": "Internal server error. Please try again later.",
    "auth/missing-ios-bundle-id": "Internal server error. Please try again later.",
    "auth/account-exists-with-different-credential": "Invalid email or password.",
    "auth/credential-already-in-use": "Invalid email or password.",
    "auth/provider-already-linked": "Your profile was updated successfully.",
    "auth/cancelled-popup-request": "An unknown error has occurred.",
    "auth/popup-closed-by-user": "An unknown error has occurred.",
    "auth/redirect-cancelled-by-user": "An unknown error has occurred.",
    "auth/unsupported-persistent-storage": "Internal server error. Please try again later.",
    "invalid-argument": "Internal server error, please try again",

    unauthorized: "Unauthorized. Please log in to continue.",
    login: "Logged in successfully.",
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
    "invalid-fields": "Not all fields are valid",
    "account-created": "Account created successfully.",
    null: "",
} as const

export type ArkMessageType = "success" | "error" | "message" | "warning" | "null"
export type MessageMap = typeof messages
export type ArkMessageKey = keyof MessageMap

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

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
        console.warn(`[arkform.arkMessage()]: Message "${key}" is not defined.`)
        return {
            type: "error",
            message: messages["unknown"],
        } as ArkMessage<T>
    }

    return {
        type,
        message: messages[key],
    } as ArkMessage<T>
}

const msg = arkMessage("success.ok")
const msg2 = arkMessage("warning.forbidden")
const msg3 = arkMessage("error.unknown")
