<template>
    <div class="ark-modal__overlay" @click="$modal('modal').close()">
        <div class="ark-modal">hello rfom modal</div>
    </div>
</template>

<script setup lang="ts">
import { $modal } from "~~/schema"
</script>

<style lang="scss" scoped>
.ark-modal {
    color: black;
}

.ark-modal__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    opacity: 0.1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
