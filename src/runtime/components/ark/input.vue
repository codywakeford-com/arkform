<template>
    <div :class="{ errors: showErrors }" class="ark-input-wrapper">
        <div class="ark-label-container">
            <label v-if="components.label && label" class="ark-label">
                <component :is="components.label" />
            </label>

            <label
                v-else-if="label"
                class="ark-label"
                :class="{ error: showErrors }"
                :for="$attrs.name as string"
            >
                {{ $attrs.name }}:
            </label>
        </div>

        <div class="ark-input-container" :class="{ error: showErrors }">
            <component v-if="components.fore" :is="components.fore" />
            <input
                v-if="isType('input')"
                :readonly="readOnly.value"
                :data-ark-input="$attrs.name"
                class="ark-input"
                v-model="inputRef.value.value"
                v-bind="$attrs"
            />
            <textarea v-if="isType('textarea')" v-bind="$attrs" v-model="inputRef.value.value" />

            <select v-if="isType('select')" v-bind="$attrs" v-model="inputRef.value.value">
                <slot />
            </select>

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
                :data-ark-errors="$attrs.name"
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
const attrs = useAttrs()

if (!formId) {
    throw new Error("[Arkform] Missing <form-id> injection")
}

const modelValue = defineModel<T | null>()
const validModel = defineModel<boolean | null>("valid")
const validatedModel = defineModel<T | null>("validated", { default: null })
const errorsModel = defineModel<string[]>("errors", { default: [] })
const idModel = defineModel<string>("id", { default: null })
const stateModel = defineModel<UseArkInput>("state", { default: null })

const readOnly = computed(() => {
    return $arkform.useForm(formId.value).readOnly
})

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
    as?: "input" | "textarea" | "select"
    value?: null | any
    componentId?: "ark-input"
    ark?: string | string[]
    modelValue?: T | null
    matches?: string
    preset?: string | null
    edit?: boolean
    textarea?: boolean
    theme?: Style["theme"]
    optional?: boolean
    animation?: string
    checkbox?: boolean
    validated?: T | null
    valid?: null | boolean
    errors?: string[]
    label?: boolean
}
const props = defineProps<Props>()

const {
    componentId = "ark-input",
    as = "input",
    edit = true,
    matches,
    value = null,
    preset = null,
    checkbox = false,
    optional = false,
    animation = "default",
    theme = "default",
    errors = [],
    ark = [],
    label = true,
} = props

const $animation = $arkform.config?.value?.animations?.[animation]

function onInput() {
    console.log("Hello?")
    bus.emit(`${formId}:input`)
    bus.emit(`${inputId}:input`)

    if (groupId) {
        bus.emit(`${groupId}:input`)
    }
}

componentsInit({ slots: useSlots(), components })

mountInput({
    id: inputId.value,
    arkValidators: ark,
    matches,
    inputName: attrs.name as string,
    preset,
    optional,
    animation: animation,
    theme: theme,
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

watch(inputRef.value.value, (val) => {
    console.log(val)
    onInput()
})
const showErrors = computed(() => {
    return !!$arkform.useInput(inputId.value).errors.value.length
})

function isType(type: string): boolean {
    return as === type
}
</script>

<style scoped lang="scss"></style>
