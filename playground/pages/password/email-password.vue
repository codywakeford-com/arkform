<template>
    <div class="flex">
        <ark-form
            v-model="form"
            v-model:state="state"
            v-model:errors="errors"
            v-model:id="formId"
            v-model:names="names"
        >
            <ark-input name="email" ark="string.email"></ark-input>
            <ark-input name="password"></ark-input>
            <ark-input name="confirm-password" matches="password"></ark-input>

            <ark-submit>Submit</ark-submit>
        </ark-form>

        <client-only>
            <div class="col">
                <pre>v-model = {{ form }}</pre>
                <pre>v-model:id = {{ formId }}</pre>
                <pre>v-model:errors = {{ errors }}</pre>
                <pre>v-model:names = {{ names }}</pre>
                <pre>v-model:state = {{ state }}</pre>
            </div>
        </client-only>
    </div>
</template>

<script setup lang="ts">
import { useArkForm } from "../../../src/runtime/composables/useArkform"
const $arkform = useArkForm()

const formId = ref()
const group = ref()
const form = ref({
    email: null,
    password: null,
})
const errors = ref([])
const names = ref([])
const state = ref()
</script>

<style scoped lang="scss"></style>
