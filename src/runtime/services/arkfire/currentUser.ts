// composables/useCurrentUser.ts
import { onAuthStateChanged } from "firebase/auth"

export const useCurrentUser = () => {
    const { auth } = useFirebase()
    const user = ref(auth.currentUser)

    onAuthStateChanged(auth, (newUser) => {
        user.value = newUser
    })

    return user
}
