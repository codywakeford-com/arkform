<template>
    <div class="flex">
        <ark-form
            name="test-form"
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
                <pre data-cy="form-id">v-model:id =
                <div>
                    {{ formId }}
                </div>
                </pre>
                <pre data-cy="performance">v-model:performance = {{ !perf ? "0.00" : perf }}ms</pre>
                <pre data-cy="form">v-model = {{ form }}</pre>
                <pre data-cy="valid">v-model:valid = {{ valid === null ? "null" : valid }}</pre>
                <pre data-cy="validated">
v-model:validated = {{ validated === null ? "null" : validated }}</pre
                >
                <pre data-cy="errors">v-model:errors = {{ errors }}</pre>
                <pre data-cy="names">v-model:names = {{ names }}</pre>
                <pre data-cy="state">v-model:state = {{ state }}</pre>
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
