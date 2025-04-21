<template>
    <div class="flex">
        <ark-form
            class="card-3d"
            v-model="model"
            v-model:valid="valid"
            v-model:validated="validated"
            v-model:performance="perf"
        >
            <ark-input name="email" ark="string.email">
                <ark-label>Email Address:</ark-label>
                <ark-fore name="material-symbols:mail-rounded"></ark-fore>
                <ark-aft name="material-symbols:mail-rounded"></ark-aft>
                <ark-help>Please enter your email</ark-help>
            </ark-input>

            <ark-password />

            <ark-submit>Submit</ark-submit>
        </ark-form>

        <client-only>
            <div class="col">
                <pre>v-model = {{ model }}</pre>
                <pre>v-model:valid = {{ valid === null ? "null" : valid }}</pre>
                <pre>v-model:validated = {{ validated === null ? "null" : validated }}</pre>
                <pre>v-model:performance = {{ perf ? perf.toFixed(4) : "0.000" }}ms</pre>
            </div>
        </client-only>
    </div>
</template>

<script setup lang="ts">
const model = ref(null)
const valid = ref(null)
const validated = ref(null)
const perf = ref()
</script>

<style scoped lang="scss">
.flex {
    align-items: flex-start;
}
.card-3d {
    position: relative;
    width: 275px;
    color: white;
    border-radius: 12px;
}

.col {
    &:first-child {
        margin-top: 0 !important;
    }
}
</style>

<style>
html,
body {
    padding: 0;
    background: #1b1b1f;
}
</style>
