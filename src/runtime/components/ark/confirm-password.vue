<template>
    <ark-input
        name="confirm-password"
        :type="typeState"
        v-model:id="id"
        :ark="$arkform.config.value.password?.[strength]"
        v-model="model"
        matches="password"
    >
        <ark-aft @click="toggleRef">
            <div class="flex-center">
                <Icon v-if="viewPassword" name="streamline:visible-solid" />
                <Icon v-else name="streamline:invisible-1-solid" />
            </div>
        </ark-aft>
    </ark-input>
</template>

<script setup lang="ts">
import { useArkForm } from "../../composables/useArkform"

const model = ref("")
const id = ref("")
const $arkform = useArkForm()

interface Props {
    strength?: "none" | "weak" | "medium" | "strong" | "bulletproof"
    suggest?: boolean
}

const viewPassword = ref(false)

function toggleRef() {
    viewPassword.value = !viewPassword.value
}

const typeState = computed(() => (viewPassword.value ? "text" : "password"))

const { strength = "medium", suggest = true } = defineProps<Props>()
</script>

<style scoped lang="scss"></style>
