<template>
    <div class="flex">
        <ark-form v-model="form">
            <div class="inline">
                <ark-input name="firstName"></ark-input>
                <ark-input name="lastName"></ark-input>
            </div>
            <ark-email />
            <ark-password strength="weak" />
            <ark-confirm-password strength="weak" />

            <ark-checkbox name="tc">
                <ark-label>Do you accept the terms of service?</ark-label>
            </ark-checkbox>
            <ark-submit />
        </ark-form>

        <client-only>
            <pre>v-model = {{ form }}</pre>
        </client-only>
    </div>
</template>

<script setup lang="ts">
const form = ref()
</script>

<style scoped lang="scss">
.inline {
    display: flex;
    gap: 10px;
}
</style>
