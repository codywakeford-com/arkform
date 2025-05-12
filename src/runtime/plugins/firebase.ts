import { useFirebase } from "../stores/firebase"

export default defineNuxtPlugin((nuxtApp) => {
    const firebase = useFirebase()
    firebase.init()
})
