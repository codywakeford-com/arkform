<template>
    <iframe :src="`${baseUrl}${url}`"></iframe>
</template>

<script setup lang="ts">
import { onMounted } from "vue"

const baseUrl = "http://localhost:3500"

interface Props {
    url?: string
}

const { url } = defineProps<Props>()
</script>

<style scoped lang="scss">
iframe {
    border: none;
    width: 100%;
    margin-top: 20px;
    min-height: 0px;
    border-radius: 8px;
    max-height: 250px;
}
</style>
