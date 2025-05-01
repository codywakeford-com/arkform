<template>
    <nuxt-link>
        <slot />
    </nuxt-link>
</template>

<script setup lang="ts">
const formId = inject("form-id") as string
interface Props {
    componentId?: "ark-link"
}
const { componentId = "ark-link" } = defineProps<Props>()
</script>

<style scoped lang="scss"></style>
