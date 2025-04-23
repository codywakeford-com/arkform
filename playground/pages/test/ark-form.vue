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
                <div id="formId">{{ formId }}</div>
                <div id="performance">{{ perf }}</div>
                <div id="model">{{ form }}</div>
                <div id="valid">{{ `${valid}` }}</div>
                <div id="validated">{{ `${JSON.stringify(validated)}` }}</div>
                <div id="errors">{{ errors }}</div>
                <div id="state">{{ state }}</div>
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
