<template>
    <div :class="{ errors: state.errors.value.length }" class="ark-input-wrapper">
        <div class="ark-label-container">
            <label v-if="components.label" class="ark-label">
                <component :is="components.label" />
            </label>

            <label
                v-else
                class="ark-label"
                :class="{ error: state.errors.value.length }"
                :for="name"
            >
                {{ name }}:
            </label>
        </div>

        <div class="ark-input-container" :class="{ error: state.errors.value.length }">
            <component :is="components.fore" />
            <textarea
                v-if="textarea && !checkbox"
                class="ark-textarea"
                :name="name"
                type="text"
                @input="onInput()"
                v-model="state.value.value"
                v-bind="$attrs"
                :data-ark-input="name"
            />
            <input
                :data-ark-input="name"
                class="ark-input"
                :name="name"
                @input="onInput()"
                v-else
                v-model="$arkform.useInput(inputId).value.value"
                v-bind="$attrs"
            />
            <component :is="components.aft" />
        </div>

        <div class="ark-help" v-if="components.help">
            <component :is="components.help" />
        </div>

        <div class="ark-error-container">
            <component v-if="components.error" :is="components.error" />

            <TransitionGroup
                v-else
                class="ark-errors"
                name="list"
                tag="ul"
                :data-ark-errors="name"
                @before-enter="defaultAnimation.beforeEnter"
                @enter="defaultAnimation.enter"
                @before-leave="defaultAnimation.beforeLeave"
                @leave="defaultAnimation.leave"
            >
                <li
                    class="ark-error"
                    v-for="(error, index) in $arkform.useInput(inputId).errors.value"
                    :key="index"
                >
                    {{ error }}
                </li>
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, ref, computed, useSlots } from "vue"
import type { Slots } from "vue"
import { useBus } from "../../composables/useBus"
import { useArkForm } from "../../composables/useArkform"
import { type } from "arktype"
import { componentsInit } from "../../services/init/componentsInit"
import { mountInput } from "../../controllers/mount.controller"
import { defaultAnimation } from "../../controllers/animation.controller"
import { useInputId } from "../../composables/initId"

const $arkform = useArkForm()
const groupId = inject<Ref<string | null>>("group-id", ref(null))
const formId = inject<Ref<string>>("form-id")

if (!formId) {
    throw new Error("[Arkform] Missing <form-id> injection")
}

const inputType = type("string")
type ModelType = typeof inputType.infer

const validModel = defineModel<boolean | null>("valid", { required: true })
const modelValue = defineModel<any | null>({ required: true })
const validatedModel = defineModel<ModelType | null>("validated", { required: true })
const errorsModel = defineModel<string[]>("errors", { required: true })
const idModel = defineModel<string>("id", { required: true })
const stateModel = defineModel<UseArkInput>("state", { required: true })

const models = {
    validModel,
    modelValue,
    validatedModel,
    errorsModel,
    idModel,
    stateModel,
}

const inputId = useInputId({
    idModel,
    groupId,
    formId,
})

if (!inputId) {
    throw new Error("[Arkform] Missing <input-id> injection")
}

const state = computed(() => {
    return $arkform.useInput(inputId.value)
})

const bus = useBus()
models.idModel.value = inputId.value

const components = ref({
    label: null,
    error: null,
    help: null,
    aft: null,
    fore: null,
})

interface Props {
    name: string
    componentId?: "ark-input"

    ark?: string | string[]
    modelValue?: ModelType | null
    matches?: string
    slots?: Slots
    preset?: string | null
    textarea?: boolean
    optional?: boolean
    checkbox?: boolean
    validated?: null | ModelType
    valid?: null | boolean
    errors?: string[]
}

const {
    componentId = "ark-input",
    matches,
    name,
    slots,
    preset = null,
    textarea = false,
    checkbox = false,
    optional = false,
    valid = null,
    validated = null,
    errors = [],

    ark = [],
} = defineProps<Props>()

componentsInit({ slots: useSlots(), components })
mountInput({
    preset,
    id: inputId.value,
    arkValidators: ark,
    matches,
    inputName: name,
    optional,
})

function onInput() {
    bus.emit(`${formId}:input`)
    bus.emit(`${inputId}:input`)

    if (groupId) {
        bus.emit(`${groupId}:input`)
    }
}

watch(
    () => $arkform.useInput(inputId.value),
    (input) => {
        models.modelValue.value = input.value
        models.stateModel.value = { ...input }

        if (input.valid.value === true) {
            models.validatedModel.value = input.value.value
        } else {
            models.validatedModel.value = null
        }

        models.validModel.value = input.valid.value
        models.errorsModel.value = input.errors.value
    },
    { immediate: true, deep: true },
)
</script>

<style scoped lang="scss"></style>
