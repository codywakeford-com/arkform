<template>
    <ark-input
        class="ark-textarea"
        name="textarea"
        :resize="false"
        type="text"
        :textarea="true"
        rows="10"
    />
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.ark-textarea {
    resize: none;
}
</style>
