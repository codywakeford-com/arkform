<template>
    <div class="flex">
        <ark-form
            v-model="form"
            v-model:state="state"
            v-model:performance="perf"
            v-model:valid="valid"
            v-model:validated="validated"
            v-model:errors="errors"
            v-model:id="formId"
            v-model:names="names"
        >
            <ark-input name="email" ark="string.email"></ark-input>
            <ark-input name="message"></ark-input>
            <ark-input name="message2"></ark-input>
            <ark-input name="message3"></ark-input>

            <ark-submit>Submit</ark-submit>
        </ark-form>

        <client-only>
            <div class="col">
                <pre>v-model:id = {{ formId }}</pre>
                <pre>v-model:performance = {{ !perf ? "0.00" : perf }}ms</pre>
                <pre>v-model = {{ form }}</pre>
                <pre>v-model:valid = {{ valid === null ? "null" : valid }}</pre>
                <pre>v-model:validated = {{ validated === null ? "null" : validated }}</pre>
                <pre>v-model:errors = {{ errors }}</pre>
                <pre>v-model:names = {{ names }}</pre>
                <pre>v-model:state = {{ state }}</pre>
            </div>
        </client-only>
    </div>
</template>

<script setup lang="ts">
const formId = ref()
const form = ref()
const errors = ref()
const valid = ref()
const perf = ref()
const names = ref()
const validated = ref()
const state = ref()
</script>

<style scoped lang="scss"></style>
