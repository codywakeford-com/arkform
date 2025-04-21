<template>
    <main class="container">
        <div class="flex">
            <ark-form v-model="form" v-model:errors="errors">
                <ark-email />
                <ark-password strength="none" />
                <ark-confirm-password strength="none" />
                <ark-submit>Submit</ark-submit>
            </ark-form>

            <client-only>
                <div class="col">
                    <pre>v-model = {{ form }}</pre>
                    <pre>v-model:errors = {{ errors }}</pre>
                </div>
            </client-only>
        </div>
    </main>
</template>

<script setup lang="ts">
const form = ref({})
const errors = ref([])
</script>

<style scoped lang="scss"></style>
