<template>
    <ark-form>
        <ark-group name="group" v-model:state="group" v-model:id="groupId" v-model:items="items">
            <div class="flex">
                <div>
                    <ark-input name="message" v-model="input" />
                    <button @click="$arkform.validate(groupId)">Validate</button>
                    <button @click="$arkform.group.add(groupId)">add</button>
                </div>
                <div>
                    <pre>v-model:state = {{ group }}</pre>
                    <pre>v-model = {{ input }}</pre>
                    <pre>v-model:id = {{ groupId }}</pre>
                    <pre>v-model:items = {{ items }}</pre>
                </div>
            </div>
        </ark-group>
    </ark-form>
</template>

<script setup lang="ts">
import { useArkForm } from "../../../src/runtime/composables/useArkform"

const $arkform = useArkForm()
const out = ref()
const groupId = ref()
const group = ref()
const input = ref()
const items = ref()
</script>

<style scoped lang="scss"></style>
