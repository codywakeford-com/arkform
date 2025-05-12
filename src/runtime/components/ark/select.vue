<template>
    <ark-input v-bind="$attrs" class="ark-select" inputType="select">
        <slot />
    </ark-input>
</template>

<script setup lang="ts">
const model = ref()
const props = defineProps<{}>()
</script>

<style scoped lang="scss"></style>
