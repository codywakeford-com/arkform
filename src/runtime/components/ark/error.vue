<template>
    <slot />
</template>

<script setup lang="ts">
interface Props {
    componentId?: "ark-error"
}
const { componentId = "ark-error" } = defineProps<Props>()
</script>

<style scoped lang="scss"></style>
