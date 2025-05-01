<template>
    <div>
        <TransitionGroup
            class="ark-message-group"
            name="arkform-message"
            tag="ul"
            :data-ark-errors="name"
            @before-enter="$animation?.beforeEnter"
            @enter="$animation?.enter"
            @before-leave="$animation?.beforeLeave"
            @leave="$animation?.leave"
        >
            <li
                v-for="(message, index) of messages"
                class="ark-message"
                :class="message.type"
                :name="messageSetName"
                :key="index"
            >
                {{ message.message }}
            </li>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { useArkForm } from "../../composables/useArkform"
import { mountMessageSet } from "../../controllers/mount.controller"
import { arkMessage, type ArkMessage } from "../../services/messages.service"

const $arkform = useArkForm()
const $animation = $arkform.config?.value?.animations?.["default"]
const formName = inject<string | null>("form-name", null)
type Props = {
    message?: ArkMessage
    name?: string | null
}

const { message, name = null } = defineProps<Props>()

if (!name && !formName) {
    console.warn(
        "[Arkform]: <ark-messageset /> requires a name attribute to mount correctly. It can also inherit the name from the parent <ark-form />.",
    )
}

// Prioritise prop over inherit
const messageSetName = computed((): string => {
    return name ?? formName ?? ""
})

mountMessageSet({ name: messageSetName.value })

const messages = computed(() => {
    return $arkform.useMessageSet(messageSetName.value).value
})
</script>

<style scoped lang="scss">
.ark-message {
    &.success {
        color: green;
    }

    &.error {
        color: red;
    }
}
</style>
