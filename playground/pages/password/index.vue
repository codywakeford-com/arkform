<template>
    <div class="flex">
        <ark-form validation="eager" v-model="form" v-model:errors="errors">
            <ark-confirm-password strength="none" />
            <ark-submit>Submit</ark-submit>
        </ark-form>

        <div class="col">
            <pre>v-model = {{ form }}</pre>
            <pre>v-model:errors = {{ errors }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
const form = ref({
    email: null,
    password: null,
    "confirm-password": null,
})
const errors = ref([])
</script>

<style scoped lang="scss"></style>
