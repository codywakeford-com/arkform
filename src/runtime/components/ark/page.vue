<template>
    <div class="page">
        <slot />
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.page {
    max-width: 1440px;
    margin-inline: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>
