<template>
    <div class="flex">
        <ark-form>
            <ark-input
                v-model="model"
                v-model:state="state"
                v-model:errors="errors"
                v-model:valid="valid"
                v-model:validated="validated"
                v-model:id="id"
                name="email"
                ark=""
            ></ark-input>

            <ark-submit>Submit</ark-submit>
        </ark-form>

        <client-only>
            <div class="col">
                <pre>v-model = {{ model === null ? "null" : model }}</pre>
                <pre>v-model:id = {{ id }}</pre>
                <pre>v-model:errors = {{ errors }}</pre>
                <pre>v-model:state = {{ state }}</pre>
                <pre>v-model:valid = {{ valid === null ? "null" : `${valid}` }}</pre>
                <pre>v-model:validated = {{ validated === null ? "null" : validated }}</pre>
            </div>
        </client-only>
    </div>
</template>

<script setup lang="ts">
const id = ref("")
const valid = ref()
const validated = ref()
const model = ref()
const errors = ref([])
const state = ref()
const perf = ref()
</script>

<style scoped lang="scss"></style>
