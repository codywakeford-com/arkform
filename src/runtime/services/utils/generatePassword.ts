import { useArkForm } from "../../composables/useArkform"
import { useBus } from "../../composables/useBus"
import { useArkFormStore } from "../../stores/forms"
import { getIdsFromId } from "./uuid"

export function generatePassword(id: string, length = 12) {
    const bus = useBus()
    const $forms = useArkFormStore()
    const $arkform = useArkForm()

    const input = $arkform.useInput(id)

    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()-_=+[]{};:,.<>?"

    const allChars = lowercase + uppercase + numbers + symbols

    // Ensure at least one of each type
    const getRandom = (str: string) => str[Math.floor(Math.random() * str.length)]

    let password = [
        getRandom(lowercase),
        getRandom(uppercase),
        getRandom(numbers),
        getRandom(symbols),
    ]

    for (let i = password.length; i < length; i++) {
        password.push(getRandom(allChars))
    }

    // Shuffle to avoid predictable positions
    const out = password.sort(() => 0.5 - Math.random()).join("")

    input.value.value = out
    const { formId } = getIdsFromId(id)
    console.log(`${formId}:matches-confirm-password`)
    bus.emit(`${formId}:matches-confirm-password`, out)
}
