<template>
    <div class="ark-fore">
        <Icon v-if="name" class="icon" :name="name" />
        <slot />
    </div>
</template>

<script setup lang="ts">
interface Props {
    componentId?: "ark-fore"
    name?: string
}
const { componentId = "ark-fore", name } = defineProps<Props>()
</script>

<style scoped lang="scss"></style>
