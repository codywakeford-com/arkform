import { ref, type Ref } from "vue"

export {}

declare global {
    type FirebaseUser<AppUser = {}> = {
        uid: string | null
        email: string | null
        displayName: string | null
        photoURL: string | null
        emailVerified: boolean | null
    } & AppUser
}

// type FirebaseUser<T = {}> = {
//     // Firebase Auth standard properties
//     uid: string
//     email: string | null
//     emailVerified: boolean
//     displayName: string | null
//     phoneNumber: string | null
//     photoURL: string | null
//     isAnonymous: boolean
//     providerId: string
//     refreshToken: string
//     tenantId: string | null
//     metadata: {
//         creationTime?: string
//         lastSignInTime?: string
//     }
//     providerData: Array<{
//         providerId?: string
//         uid?: string
//         displayName?: string | null
//         email?: string | null
//         phoneNumber?: string | null
//         photoURL?: string | null
//     }>
//     } & T