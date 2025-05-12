// experiment
<template>
    <div class="if" v-if="propsTrue === true && propsFalse === false">
        <slot />
    </div>
</template>

<script setup lang="ts">
const { true: propsTrue = true, false: propsFalse = false } = defineProps<{
    true: boolean | "in-viewport"
    false: boolean | "in-viewport"
}>()
</script>

<style scoped lang="scss"></style>
