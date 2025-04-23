<template>
    <div class="flex">
        <ark-form v-model="out">
            <ark-email class="email" />

            <ark-submit />
        </ark-form>

        <pre>v-model = {{ out }}</pre>
    </div>
</template>

<script setup lang="ts">
const out = ref()
</script>

<style lang="scss">
.email {
    input {
        border: 1px solid green;
    }
}
</style>
