<template>
    <main>
        <div class="example-text">example</div>
        <slot />
    </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"

function sendHeightToParent() {
    const height = document.documentElement.scrollHeight
    window.parent.postMessage({ type: "setHeight", height }, "*")
}

let observer: MutationObserver | null = null

function setupObservers() {
    window.addEventListener("load", sendHeightToParent)
    window.addEventListener("resize", sendHeightToParent)

    observer = new MutationObserver(sendHeightToParent)
    observer.observe(document.body, { childList: true, subtree: true })
}

function cleanupObservers() {
    window.removeEventListener("load", sendHeightToParent)
    window.removeEventListener("resize", sendHeightToParent)
    observer?.disconnect()
    observer = null
}

onMounted(() => {
    setupObservers()
})

onUnmounted(() => {
    cleanupObservers()
})
</script>

<style lang="scss"></style>
