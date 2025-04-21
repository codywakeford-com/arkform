<template>
    <div class="flex">
        <ark-form v-model:state="out">
            <ark-email />
            <ark-password />

            <ark-submit />
        </ark-form>

        <pre>v-model = {{ out }}</pre>
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
</style>
