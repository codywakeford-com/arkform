export const passwordDefaults = {
    weak: [
        // At least one digit
        "/^(?=.*\\d)/",

        // Minimum length of 6 characters
        "/.{6,}$/",
    ],
    medium: [
        // At least one lowercase letter
        "/^(?=.*[a-z])/",

        // At least one uppercase letter
        "/^(?=.*[A-Z])/",

        // At least one digit
        "/^(?=.*\\d)/",

        // Minimum length of 8 characters
        "/.{8,}$/",
    ],
    strong: [
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
    bulletproof: [
        // At least one lowercase letter
        "/^(?=.*[a-z])/",

        // At least one uppercase letter
        "/^(?=.*[A-Z])/",

        // At least one digit
        "/^(?=.*\\d)/",

        // At least one special character
        "/^(?=.*[!@#$%^&*()_\\-+=<>?{}[\\]~])/",

        // Minimum length of 12 characters
        "/.{12,}$/",

        // Does not contain common words like "password", "12345", "qwerty", "abc"
        "/^(?!.*(password|12345|qwerty|abc)).*$/",

        // No repeated characters (e.g. "aaa")
        "/^(?!.*(.)\\1{2,}).*$/",

        // No sequential characters (e.g. "123", "abc", "cde")
        "/^(?!.*(?:123|234|345|456|567|678|789|abc|bcd|cde|def)).*$/",

        // No spaces
        "/^\\S+$/",
    ],
}
