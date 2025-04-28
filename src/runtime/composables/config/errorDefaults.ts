export const errorDefaults = {
    "string.email": "Please enter a valid email.",
    "string > 0": "This field is required.",
    "string>0": "This field is required.",
    "string>6": "Must be over length 6",

    // Password regex
    "/^(?=.*[a-z])/": "Password must contain at least one lowercase letter.",
    "/^(?=.*[A-Z])/": "Password must contain at least one uppercase letter.",
    "/^(?=.*\\d)/": "Password must contain at least one number.",
    "/^(?=.*[!@#$%^&*()_\\-+=<>?{}[\\]~])/":
        "Password must contain at least one special character.",
    "/.{8,}$/": "Password must be at least 8 characters long.",
    "/.{6,}$/": "Password must be at least 6 characters long.",
    "/.{12,}$/": "Password must be at least 6 characters long.",
    "/^(?!.*(password|12345|qwerty|abc)).*$/":
        "Password cannot contain common words like 'password', '12345', or 'qwerty'.",
    "/^\\S+$/": "Password cannot contain spaces.",
    "/^(?=.*[a-z])(?=.*[A-Z]).+$/": "Password must contain both uppercase and lowercase letters.",
    "/^(?=.*[^a-zA-Z0-9]).+$/": "Password must contain at least one non-alphanumeric character.",
    "/^(?!.*(.)\\1{2,}).+$/": "Password cannot have repeated characters.",
    '/^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/': "Password must contain at least one special character.",
    "/^(?!.*(?:123|234|345|456|567|678|789|abc|bcd|cde|def)).*$/":
        "Password cannot contain sequential characters.",
    "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.*/":
        "Please provide a valid email address.",
}
