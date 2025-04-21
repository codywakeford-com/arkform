<template>
    <ark-input
        name="confirm-password"
        :type="typeState"
        :ark="arkformConfig.password[strength]"
        v-model:id="id"
        v-model="model"
        matches="password"
    >
        <ark-aft @click="toggleRef">
            <div class="flex-center" @click="generatePassword(id)">
                <Icon name="material-symbols:settings-suggest" v-if="suggest" />
            </div>

            <div class="flex-center">
                <Icon v-if="viewPassword" name="streamline:visible-solid" />
                <Icon v-else name="streamline:invisible-1-solid" />
            </div>
        </ark-aft>
    </ark-input>
</template>

<script setup lang="ts">
import { useArkformConfig } from "../../composables/useArkformConfig"
import { useBus } from "../../composables/useBus"
import { generatePassword } from "../../services/utils/generatePassword"
import { getIdsFromId } from "../../services/utils/uuid"
import { useArkFormStore } from "../../stores/forms"
const bus = useBus()
const $forms = useArkFormStore()
const model = ref("")
const id = ref("")
const arkformConfig = useArkformConfig()

interface Props {
    strength?: "none" | "weak" | "medium" | "strong" | "bulletproof"
    suggest?: boolean
}

const viewPassword = ref(false)

function toggleRef() {
    viewPassword.value = !viewPassword.value
}

onMounted(() => {
    return
    const { formId } = getIdsFromId(id.value)
    const input = $forms.getInput(id.value)

    if (!input) {
        throw new Error("Fuck off")
    }
    console.log(`${formId}:matches-${input.value.matches}`)

    bus.on(`${formId}:matches-confirm-password`, (password) => {
        input.value.value = password as string
    })
})

const typeState = computed(() => (viewPassword.value ? "text" : "password"))

const { strength = "medium", suggest = true } = defineProps<Props>()
</script>

<style scoped lang="scss"></style>
