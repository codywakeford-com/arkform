<template>
    <div class="ark-crud">
        <table>
            <thead>
                <tr>
                    <th v-for="(key, index) of columns">{{ key }}</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item, index) of rows">
                    <td v-for="(key, index) of columns">{{ item[key] }}</td>
                    <td>
                        <button @click="$forms.removeItem(formId, groupId, index)">X</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue"
import { useArkFormStore } from "../../stores/forms"
import { computed, watch } from "vue"

const $forms = useArkFormStore()

const groupId = inject<string | undefined>("group-id")
const formId = inject<string | undefined>("form-id")

const emit = defineEmits(["update:modelValue"])

const items = computed(() => {
    if (!groupId) return

    return $forms.getGroup(formId, groupId).items
})

const columns = computed(() => {
    return $forms.getGroupItemHeaders(formId, groupId)
})

const rows = computed(() => {
    return Object.values(items.value)
})

function updateValue() {
    emit("update:modelValue", items.value)
}

watch(items, updateValue, { immediate: true })
</script>

<style scoped lang="scss">
.ark-crud {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.ark-crud-items {
    display: flex;
}

table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
    border: 1px solid grey;
    border-radius: 5px;
}

tr {
    border-bottom: 1px solid grey;
}

th,
td {
    padding: 0.75em 1em;
    text-align: left;
    font-size: 0.95rem;
}

th {
    font-weight: 600;
    color: #333;
}

button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: color 0.2s;
}

button:hover {
    color: #c0392b;
}
</style>
