<template>
    <div class="flex">
        <ark-form>
            <ark-group
                v-model:state="state"
                v-model:errors="errors"
                v-model:items="groupItems"
                v-model:id="id"
                name="messages"
                v-model="group"
            >
                <ark-input name="message2"></ark-input>
                <ark-input name="message3"></ark-input>
            </ark-group>

            <ark-submit>Submit</ark-submit>
            <button @click="$arkform.group.add(id)">Add Item</button>
        </ark-form>

        <client-only>
            <div class="col">
                <pre>v-model = {{ group }}</pre>
                <pre>v-model:items = {{ groupItems }}</pre>
                <pre>v-model:id = {{ id }}</pre>
                <pre>v-model:errors = {{ errors }}</pre>
                <pre>v-model:state = {{ state }}</pre>
            </div>
        </client-only>
    </div>
</template>

<script setup lang="ts">
import { useArkForm } from "../../../src/runtime/composables/useArkform"

const $arkform = useArkForm()

const id = ref("")
const group = ref()
const groupItems = ref()
const form = ref({
    email: null,
})
const errors = ref([])
const state = ref()
</script>

<style scoped lang="scss"></style>
