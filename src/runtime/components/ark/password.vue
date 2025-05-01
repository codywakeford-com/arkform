<template>
    <ark-input
        name="password"
        v-model="input"
        :type="typeState"
        :ark="['password.v1']"
        v-model:id="id"
    >
        <slot />
        <ark-aft>
            <div class="flex-center" @click="toggleRef">
                <Icon v-if="viewPassword" name="streamline:visible-solid" />
                <Icon v-else name="streamline:invisible-1-solid" />
            </div>
        </ark-aft>
    </ark-input>
</template>

<script setup lang="ts">
const viewPassword = ref(false)

const input = ref("123123")
const id = ref("")
const bus = useBus()
const $arkform = useArkForm()

function toggleRef() {
    viewPassword.value = !viewPassword.value
}

const typeState = computed(() => (viewPassword.value ? "text" : "password"))

import { useArkForm } from "../../composables/useArkform"
import { useBus } from "../../composables/useBus"

interface Props {
    strength?: "none" | "weak" | "medium" | "strong" | "bulletproof"
    suggest?: boolean
}

const { strength = "medium", suggest = true } = defineProps<Props>()
</script>

<style scoped lang="scss">
.iconify {
    color: var(--ark-color-text);
    opacity: 0.7;
    max-width: 15\px;
}

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
