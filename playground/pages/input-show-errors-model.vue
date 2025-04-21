<template>
    <div class="flex">
        <ark-form v-model:errors="out">
            <ark-email />
            <ark-password />

            <ark-submit />
        </ark-form>

        <pre class="pre">v-model = {{ out }}</pre>
    </div>
</template>

<script setup lang="ts">
const out = ref()
</script>

<style scoped lang="scss">
.flex {
    position: sticky;
    top: 50px;
}

pre {
    max-width: 200px;
}
</style>
