<template>
    <div class="ark-aft">
        <Icon v-if="name" class="icon" :name="name" />
        <slot />
    </div>
</template>

<script setup lang="ts">
interface Props {
    componentId?: "ark-aft"
    name?: string
}
const { componentId = "ark-aft", name } = defineProps<Props>()
</script>

<style scoped lang="scss">
.icon {
    opacity: 0.6;
}
</style>
