<template>
    <ark-input
        name="password"
        v-model="input"
        :type="typeState"
        :ark="arkformConfig.password[strength] || []"
        v-model:id="id"
        matches="confirm-password"
    >
        <ark-aft>
            <!-- <div class="flex-center" @click="generatePassword(id)"> -->
            <!--     <Icon class="suggest-aft" name="material-symbols:settings-suggest" v-if="suggest" /> -->
            <!-- </div> -->

            <div class="flex-center" @click="toggleRef">
                <Icon v-if="viewPassword" name="streamline:visible-solid" />
                <Icon v-else name="streamline:invisible-1-solid" />
            </div>
        </ark-aft>
        <slot />
    </ark-input>
</template>

<script setup lang="ts">
const viewPassword = ref(false)
const input = ref("123123")
const id = ref("")
const bus = useBus()
const arkformConfig = useArkformConfig()

function toggleRef() {
    viewPassword.value = !viewPassword.value
}

const typeState = computed(() => (viewPassword.value ? "text" : "password"))

import { useArkformConfig } from "../../composables/useArkformConfig"
import { useBus } from "../../composables/useBus"
import { generatePassword } from "../../services/utils/generatePassword"

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
