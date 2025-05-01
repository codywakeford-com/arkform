<template>
    <button class="ark-submit" @click="handleClick()" :data-ark-submit="formName">
        <div v-if="form && form.loading.value">loading...</div>
        <slot v-else>Submit</slot>
    </button>
</template>

<script setup lang="ts">
import { useArkForm } from "../../composables/useArkform"
import { useBus } from "../../composables/useBus"
import { useArkFormStore } from "../../stores/forms"

const bus = useBus()
const $forms = useArkFormStore()
const $arkform = useArkForm()

interface Props {
    id?: "ark-submit"
}
const formId = inject<Ref<string>>("form-id")
const formName = inject<string>("form-name")

const form = computed(() => {
    if (!formId) return null

    return $arkform.useForm(formId.value)
})

const { id = "ark-submit" } = defineProps<Props>()

function handleClick() {
    bus.emit(`${formId}:submit`)
}
</script>

<style scoped lang="scss"></style>
