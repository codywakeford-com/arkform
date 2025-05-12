<template>
    <ark-input v-bind="$attrs" class="ark-textarea" as="textarea" :resize="false" type="text">
        <slot />
    </ark-input>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.ark-textarea {
    resize: none;
}
</style>
