<template>
    <div class="ark-error-container">
        <div class="ark-errors">
            <div class="ark-error" v-for="(error, index) of errors" :key="index">{{ error }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { useArkFormStore } from "../../stores/forms"
import { computed } from "vue"

const $forms = useArkFormStore()

interface Props {
    id: string | undefined
}
const { id } = defineProps<Props>()

onMounted(() => {
    if (!id) {
        console.error(
            "The `<ark-errors/> component requires an errors id. <ark-input/>, <ark-form/>, <ark-group/> all expose their id with: v-model:id"
        )
    }
})

const errors = computed(() => {
    if (!id) return []
    const errors = $forms.getFormErrors(id as string).value

    return errors
})
</script>

<style scoped lang="scss"></style>
