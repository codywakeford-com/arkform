<template>
    <div class="flex">
        <ark-form v-model="form" v-model:valid="valid" v-model:validated="validated">
            <ark-input name="email" ark="string.email"></ark-input>
            <ark-input name="message"></ark-input>

            <ark-submit>Submit</ark-submit>
        </ark-form>

        <client-only>
            <div class="col">
                <pre>v-model = {{ form }}</pre>
                <pre>v-model:validated = {{ validated === null ? "null" : validated }}</pre>
                <pre>v-model:valid = {{ valid === null ? "null" : valid }}</pre>
            </div>
        </client-only>
    </div>
</template>

<script setup lang="ts">
const form = ref({
    email: null,
})
const valid = ref()
const validated = ref()
</script>

<style scoped lang="scss"></style>
