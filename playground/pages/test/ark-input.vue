<template>
    <div class="flex">
        <ark-form name="test-form">
            <ark-input
                v-model="model"
                v-model:state="state"
                v-model:valid="valid"
                v-model:validated="validated"
                v-model:errors="errors"
                v-model:id="id"
                name="email"
                ark="string.email"
            />

            <ark-submit>Submit</ark-submit>
        </ark-form>

        <client-only>
            <div class="col">
                <div id="id">{{ id }}</div>
                <div id="model">{{ `${model}` }}</div>
                <div id="valid">{{ `${valid}` }}</div>
                <div id="validated">{{ `${JSON.stringify(validated)}` }}</div>
                <div id="errors">{{ errors }}</div>
                <div id="state">{{ state }}</div>
            </div>
        </client-only>
    </div>
</template>

<script setup lang="ts">
const id = ref()
const model = ref()
const errors = ref()
const valid = ref()
const validated = ref()
const state = ref()
</script>

<style scoped lang="scss"></style>
