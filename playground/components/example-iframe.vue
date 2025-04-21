<template>
    <iframe :src="`${baseUrl}${url}`"></iframe>
</template>

<script setup lang="ts">
import { onMounted } from "vue"

const baseUrl = "http://localhost:3000"

interface Props {
    url?: string
}

const { url } = defineProps<Props>()

onMounted(() => {
    window.addEventListener("message", (event) => {
        if (event.data?.type === "setHeight") {
            const iframes = document.querySelectorAll("iframe")
            iframes.forEach((iframe) => {
                iframe.style.height = `${event.data.height}px`
            })
        }
    })
})
</script>

<style scoped lang="scss">
iframe {
    border: none;
    width: 100%;
    min-height: 300px;
}
</style>
