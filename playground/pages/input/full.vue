<template>
    <div class="flex">
        <ark-form>
            <ark-input
                name="email"
                ark="string.email"
                v-model="model"
                v-model:errors="errors"
                v-model:id="id"
                v-model:valid="valid"
            >
                <ark-label>Email Address:</ark-label>
                <ark-fore name="material-symbols:mail-rounded"></ark-fore>
                <ark-aft name="material-symbols:mail-rounded"></ark-aft>
                <ark-help>Please enter your email</ark-help>
            </ark-input>

            <ark-submit>Submit</ark-submit>
        </ark-form>

        <div class="col">
            <pre wrap>v-model:id = {{ id }}</pre>
            <pre>v-model = {{ model === null ? "null" : model }}</pre>
            <pre>v-model:errors = {{ errors }}</pre>
            <pre>v-model:valid = {{ valid === null ? "null" : valid }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
const model = ref(null)
const id = ref()
const errors = ref([])
const valid = ref(null)
</script>

<style scoped lang="scss"></style>
