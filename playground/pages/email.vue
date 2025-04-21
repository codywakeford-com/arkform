<template>
    <div class="flex">
        <ark-form v-model="out">
            <ark-email />

            <ark-submit />
        </ark-form>

        <pre>v-model = {{ out }}</pre>
    </div>
</template>

<script setup lang="ts">
const out = ref()
</script>

<style scoped lang="scss"></style>
