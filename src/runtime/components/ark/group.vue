<template>
    <div class="ark-group">
        <slot />
    </div>
    <!-- <ark-crud v-if="crud" /> -->
</template>

<script setup lang="ts">
import { useGroupId } from "../../composables/initId"
import { getInputsFromId, useArkForm } from "../../composables/useArkform"
import { mountGroup } from "../../controllers/mount.controller"
import { useArkFormStore } from "../../stores/forms"
import { inject, provide, computed, watch } from "vue"
const $arkform = useArkForm()

const formId = inject<Ref<string>>("form-id") as Ref<string>

const idModel = defineModel<string>("id", { required: true })

const groupId = useGroupId({
    idModel,
    formId,
})

const emit = defineEmits([
    "update:modelValue",
    "update:id",
    "update:items",
    "update:state",
    "update:performance",
    "update:names",
    "update:valid",
    "update:validated",
])

interface Props {
    crud?: boolean
    name: string
}

const { crud = true, name } = defineProps<Props>()

provide<Ref<string>>("group-id", groupId)
emit("update:id", groupId)
mountGroup({ groupName: name, formId: formId?.value, groupId: groupId.value })

function getModel(id: string) {
    const inputs = getInputsFromId(id)

    const object: { [key: string]: any } = {}

    Object.values(inputs.value).map((input) => {
        object[input.name] = input.value
    })

    return object
}

watch(
    $arkform.useGroup(groupId.value),
    (newVal) => {
        emit("update:state", newVal)
        emit("update:modelValue", getModel(groupId.value))
        emit("update:items", newVal.items)
    },
    { immediate: true, deep: true },
)
</script>

<style scoped lang="scss"></style>
