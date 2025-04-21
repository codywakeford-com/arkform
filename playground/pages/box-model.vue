<template>
    <div class="wrapper">
        <label for="">Label</label>
        <div class="container">
            <div class="fore"></div>
            <div class="input">
                <input type="text" />
            </div>

            <div class="aft"></div>
        </div>
        <div class="help">Help message here</div>
        <div class="errors">A list of errors can be shown here.</div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "empty",
})
</script>

<style scoped lang="scss">
.wrapper {
    margin-block: 5px;
    border-radius: 5px;
    border: 1px solid white;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.container {
    border: 1px solid white;
    padding: 15px;
    border: 1px solid white;
    display: flex;
    gap: 15px;

    input {
        flex: 1;
        border: 1px solid white;
        border: 1px solid white;
        height: 100%;
        width: 100%;
    }
}

.aft,
.fore {
    padding: 15px;
    border: 1px solid white;
    border: 1px solid white;
    min-height: 25px;
    min-width: 50px;
}
</style>
