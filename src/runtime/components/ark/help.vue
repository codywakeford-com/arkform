<template>
    <slot />
</template>

<script setup lang="ts">
interface Props {
    componentId?: "ark-help"
}
const { componentId = "ark-help" } = defineProps<Props>()
</script>

<style scoped lang="scss"></style>
