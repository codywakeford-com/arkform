<template>
    <div class="flex">
        <ark-form v-model="form" v-model:errors="errors">
            <ark-input name="hello">
                <ark-aft name="material-symbols:mail-rounded" />
            </ark-input>

            <ark-submit>Submit</ark-submit>
        </ark-form>

        <div class="col">
            <pre>v-model = {{ form }}</pre>
            <pre>v-model:errors = {{ errors }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
const form = ref({
    email: null,
})
const errors = ref([])
</script>

<style scoped lang="scss"></style>
