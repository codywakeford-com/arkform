<template>
    <div class="flex">
        <ark-form>
            <ark-input name="message" v-model="model" v-model:errors="errors" v-model:id="id">
                <ark-label>Input a message!</ark-label>
            </ark-input>
            <ark-submit />
        </ark-form>
        <client-only>
            <div class="col">
                <h4>Input State</h4>
                <pre wrap>v-model:id = {{ id }}</pre>
                <pre>v-model = {{ `${model}` }}</pre>
                <pre>v-model:errors = {{ errors }}</pre>
            </div>
        </client-only>
    </div>
</template>

<script setup lang="ts">
const model = ref()
const id = ref()
const form = ref()
const errors = ref()
</script>

<style scoped lang="scss"></style>
