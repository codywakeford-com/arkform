<template>
    <div class="flex">
        <!-- @vue-generic {typeof modelType.infer} -->
        <ark-form
            v-model="form"
            v-model:performance="perf"
            v-model:validated="validated"
            v-model:errors="errors"
            v-model:valid="valid"
            v-model:id="id"
        >
            <div class="inline">
                <ark-input name="firstName"></ark-input>
                <ark-input name="lastName"></ark-input>
            </div>

            <ark-input name="email" ark="string.email">
                <ark-fore name="material-symbols:mail-rounded" />
            </ark-input>

            <ark-input name="password" ark="string>6" />
            <ark-submit />
        </ark-form>

        <client-only>
            <div class="col">
                <pre>v-model:id = {{ id }}</pre>
                <pre>v-model:performance = {{ !perf ? "0.0" : perf }}ms</pre>
                <pre>v-model:valid = {{ valid === null ? "null" : valid }}</pre>
                <pre>v-model = {{ form }}</pre>
                <!-- <pre>v-model:errors = {{ errors }}</pre> -->
                <pre>v-model:validated = {{ validated === null ? "null" : validated }}</pre>
            </div>
        </client-only>
    </div>
</template>

<script setup lang="ts">
import { type } from "arktype"
import { useArkForm } from "../../src/runtime/composables/useArkform"
import { ref } from "vue"

const $arkform = useArkForm()

const modelType = type({
    firstName: "string | null",
    lastName: "string | null",
    email: "string | null",
    password: "string | null",
})

const form = ref<typeof modelType.infer>({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
})

const errors = ref()
const valid = ref()
const perf = ref()
const validated = ref()
const id = ref()
</script>

<style scoped lang="scss">
.inline {
    display: flex;
    gap: 10px;
}
</style>
