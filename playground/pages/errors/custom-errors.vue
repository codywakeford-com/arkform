<template>
    <div class="flex">
        <ark-form>
            <ark-input
                v-model="model"
                v-model:state="state"
                v-model:errors="errors"
                v-model:id="id"
                name="email"
                ark="string.email"
            ></ark-input>

            <ark-input name="message" ark="string > 0" />

            <ark-submit>Submit</ark-submit>
        </ark-form>

        <client-only>
            <div class="col">
                <pre>v-model = {{ model === null ? "null" : model }}</pre>
                <pre>v-model:id = {{ id }}</pre>
                <pre>v-model:errors = {{ errors }}</pre>
                <pre>v-model:state = {{ state }}</pre>
            </div>
        </client-only>
    </div>
</template>

<script setup lang="ts">
const id = ref("")
const group = ref()
const model = ref({
    email: null,
})
const errors = ref([])
const state = ref()
</script>

<style scoped lang="scss"></style>
