<template>
    <ark-input :name="name" type="checkbox" checkbox>
        <slot />
    </ark-input>
</template>

<script setup lang="ts">
interface Props {
    name: string
}

const { name } = defineProps<Props>()
</script>

<style scoped lang="scss"></style>
