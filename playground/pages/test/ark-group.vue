<template>
    <div class="flex">
        <ark-form name="test-form">
            <ark-group
                v-model="model"
                v-model:state="state"
                v-model:valid="valid"
                v-model:validated="validated"
                v-model:errors="errors"
                v-model:id="id"
                v-model:items="items"
                v-model:names="names"
            >
                <ark-input name="email" ark="string.email"></ark-input>
                <ark-input name="message"></ark-input>
                <ark-input name="message2"></ark-input>
                <ark-input name="message3"></ark-input>
            </ark-group>

            <ark-submit>Submit</ark-submit>
            <button id="add-items-button" @click="$arkform.group.add(id)">Add Item</button>
        </ark-form>

        <client-only>
            <div class="col">
                <div id="items">{{ items }}</div>
                <div id="id">{{ id }}</div>
                <div id="model">{{ model }}</div>
                <div id="valid">{{ `${valid}` }}</div>
                <div id="validated">{{ `${JSON.stringify(validated)}` }}</div>
                <div id="errors">{{ errors }}</div>
                <div id="state">{{ state }}</div>
            </div>
        </client-only>
    </div>
</template>

<script setup lang="ts">
const $arkform = useArkForm()
const id = ref()
const model = ref()
const errors = ref()
const items = ref()
const valid = ref()
const names = ref()
const validated = ref()
const state = ref()
</script>

<style scoped lang="scss"></style>
