<template>
    <slot />
</template>

<script setup lang="ts">
interface Props {
    componentId?: "ark-label"
}
const { componentId = "ark-label" } = defineProps<Props>()
</script>

<style scoped lang="scss"></style>
