<template>
    <div class="ark-group">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { useGroupId } from "../../composables/initId"
import { useArkForm } from "../../composables/useArkform"
import { useGroupModelSync } from "../../composables/useModelSync"
import { mountGroup } from "../../controllers/mount.controller"
import { inject, provide, computed, watch } from "vue"
const $arkform = useArkForm()

interface Props {
    name: string
}

const { name } = defineProps<Props>()

const formId = inject<Ref<string>>("form-id") as Ref<string>

const idModel = defineModel<string>("id", { required: true })

const groupId = useGroupId({
    idModel,
    formId,
})

const validModel = defineModel<boolean | null>("valid")
const modelValue = defineModel<any | null>()
const errorsModel = defineModel<string[]>("errors", { default: null })
const itemsModel = defineModel<any[]>("items", { default: null })
const stateModel = defineModel<UseArkInput>("state", { default: null })
const namesModel = defineModel<string[]>("names", { default: null })
const validatedModel = defineModel<any | null>("validated")

provide<Ref<string>>("group-id", groupId)
mountGroup({ groupName: name, formId: formId?.value, groupId: groupId.value })

const groupRef = computed(() => $arkform.useGroup(groupId.value))

useGroupModelSync({
    groupRef,
    models: {
        validModel,
        validatedModel,
        errorsModel,
        stateModel,
        modelValue,
        namesModel,
        itemsModel,
    },
})
</script>

<style scoped lang="scss"></style>
