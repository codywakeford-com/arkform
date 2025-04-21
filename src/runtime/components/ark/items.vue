<template>
    <div class="ark-items">
        <pre>{{ items }}</pre>
    </div>
</template>

<script setup lang="ts">
import { inject } from "vue"
import { useArkFormStore } from "../../stores/forms"
import { computed, watch } from "vue"
const $forms = useArkFormStore()

const groupId = inject<string | undefined>("group-id")
const formId = inject<string | undefined>("form-id")

const emit = defineEmits(["update:modelValue"])

const items = computed(() => {
    if (!groupId) return

    return $forms.getGroup(formId, groupId).value.items
})

function updateValue() {
    emit("update:modelValue", items.value)
}

watch(items, updateValue, { immediate: true })

interface Props {
    groupId?: string
}

const {} = defineProps<Props>()
</script>

<style scoped lang="scss"></style>
