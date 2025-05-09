<template>
    <div :class="{ errors: showErrors }" class="ark-input-wrapper">
        <div class="ark-label-container">
            <label v-if="components.label" class="ark-label">
                <component :is="components.label" />
            </label>

            <label v-else class="ark-label" :class="{ error: showErrors }" :for="name">
                {{ name }}:
            </label>
        </div>

        <div class="ark-input-container" :class="{ error: showErrors }">
            <component :is="components.fore" />
            <input
                :data-ark-input="name"
                class="ark-input"
                :name="name"
                @input="onInput()"
                v-model="inputRef.value.value"
                v-bind="$attrs"
            />
            <component v-if="components.aft" :is="components.aft" />
        </div>

        <div class="ark-help" v-if="components.help">
            <component :is="components.help" />
        </div>
        <div class="ark-link" v-if="components.link">
            <!-- <div :id="`input-link-${formId}`"></div> -->
            <component v-if="components.link" :is="components.link" />
        </div>
        <div class="ark-error-container">
            <component v-if="components.error" :is="components.error" />

            <TransitionGroup
                v-else
                class="ark-errors"
                name="arkform"
                tag="ul"
                :data-ark-errors="name"
                @before-enter="$animation?.beforeEnter"
                @enter="$animation?.enter"
                @before-leave="$animation?.beforeLeave"
                @leave="$animation?.leave"
            >
                <li
                    v-if="showErrors"
                    class="ark-error"
                    v-for="(error, index) in inputRef?.errors?.value"
                    :key="index"
                >
                    {{ error }}
                </li>
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T">
import { inject, ref, computed, useSlots } from "vue"
import { useBus } from "../../composables/useBus"
import { useArkForm } from "../../composables/useArkform"
import { type } from "arktype"
import { componentsInit } from "../../services/init/componentsInit"
import { mountInput } from "../../controllers/mount.controller"
import { useInputId } from "../../composables/initId"
import { useInputModelSync } from "../../composables/useModelSync"

const $arkform = useArkForm()
const groupId = inject<Ref<string | null>>("group-id", ref(null))
const formId = inject<Ref<string>>("form-id")

if (!formId) {
    throw new Error("[Arkform] Missing <form-id> injection")
}

const inputType = type("string")
type ModelType = typeof inputType.infer

const validModel = defineModel<boolean | null>("valid")
const modelValue = defineModel<ModelType | null>()
const validatedModel = defineModel<ModelType | null>("validated", { default: null })
const errorsModel = defineModel<string[]>("errors", { default: [] })
const idModel = defineModel<string>("id", { default: null })
const stateModel = defineModel<UseArkInput>("state", { default: null })

const inputId = useInputId({
    idModel,
    groupId,
    formId,
})

if (!inputId) {
    throw new Error("[Arkform] Missing <input-id> injection")
}

const bus = useBus()
idModel.value = inputId.value

const components = ref({
    label: null,
    error: null,
    help: null,
    aft: null,
    fore: null,
    link: null,
})
interface Props {
    name: string

    componentId?: "ark-input"
    ark?: ArkValidators
    modelValue?: ModelType | null
    matches?: string
    preset?: string | null
    textarea?: boolean
    optional?: boolean
    animation?: string
    checkbox?: boolean
    validated?: null | ModelType
    valid?: null | boolean
    errors?: string[]
}

const {
    componentId = "ark-input",
    matches,
    name,
    preset = null,
    textarea = false,
    checkbox = false,
    optional = false,
    animation = "default",

    errors = [],
    ark = [],
} = defineProps<Props>()

const $animation = $arkform.config?.value?.animations?.[animation]

function onInput() {
    bus.emit(`${formId}:input`)
    bus.emit(`${inputId}:input`)

    if (groupId) {
        bus.emit(`${groupId}:input`)
    }
}

componentsInit({ slots: useSlots(), components })

mountInput({
    preset,
    id: inputId.value,
    arkValidators: ark,
    matches,
    inputName: name,
    optional,
})

const inputRef = computed(() => $arkform.useInput(inputId.value))

useInputModelSync({
    inputRef,
    models: {
        validModel,
        stateModel,
        validatedModel,
        modelValue,
        errorsModel,
    },
})

const showErrors = computed(() => {
    return !!$arkform.useInput(inputId.value).errors.value.length
})
</script>

<style scoped lang="scss"></style>
