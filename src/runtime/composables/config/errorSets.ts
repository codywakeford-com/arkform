import { type } from "arktype"

export const errorSets = {
    "string.alphanumerical": [],
    "password.v1": [
        // At least one digit
        "/^(?=.*\\d)/",

        // Minimum length of 6 characters
        "/.{6,}$/",
    ],
    "password.v2": [
        // At least one lowercase letter
        "/^(?=.*[a-z])/",

        // At least one uppercase letter
        "/^(?=.*[A-Z])/",

        // At least one digit
        "/^(?=.*\\d)/",

        // Minimum length of 8 characters
        "/.{8,}$/",
    ],
    "password.v3": [
        // At least one lowercase letter
        "/^(?=.*[a-z])/",

        // At least one uppercase letter
        "/^(?=.*[A-Z])/",

        // At least one digit
        "/^(?=.*\\d)/",

        // At least one special character
        "/^(?=.*[!@#$%^&*()_\\-+=<>?{}[\\]~])/",

        // Minimum length of 8 characters
        "/.{8,}$/",

        // No spaces
        "/^\\S+$/",
    ],
}
