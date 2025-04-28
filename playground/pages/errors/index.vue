<template>
    <div>
        <div class="flex">
            <ark-form v-model:id="id" v-model:errors="errors">
                <ark-email></ark-email>
                <ark-submit />
            </ark-form>

            <div class="col">
                <pre>v-model:id = {{ id }}</pre>
                <pre>v-model:errors = {{ errors }}</pre>
            </div>
        </div>

        <h3>Elsewhere in the application.</h3>
        <ark-errors :id="id" />
    </div>
</template>

<script setup lang="ts">
const id = ref("")

const errors = ref([])
</script>

<style scoped lang="scss">
h3 {
    margin-top: 50px;
}
</style>
