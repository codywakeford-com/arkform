<template>
    <div :class="{ errors: showErrors }" class="ark-input-wrapper">
        <div class="ark-label-container">
            <label class="ark-label">
                <component :is="components.label" />
            </label>

            <label v-if="label" class="ark-label" :class="{ error: showErrors }" :for="$attrs.name">{{ $attrs.name }}:</label>
        </div>

        <div class="ark-input-container" :class="{ error: showErrors }">
            <component v-if="components.fore" :is="components.fore" />
            <input v-if="isType('input')" :readonly="readOnly.value" :data-ark-input="$attrs.name" class="ark-input" v-model="inputRef.value.value" v-bind="$attrs" />
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

            <TransitionGroup v-else class="ark-errors" name="arkform" tag="ul" :data-ark-errors="$attrs.name" @before-enter="$animation?.beforeEnter" @enter="$animation?.enter" @before-leave="$animation?.beforeLeave" @leave="$animation?.leave">
                <li v-if="showErrors" class="ark-error" v-for="(error, index) in inputRef?.errors?.value" :key="index">
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
import { mountInput } from "../../controllers/mount.controller"
import { useInputId } from "../../composables/initId"
import { useInputModelSync } from "../../composables/useModelSync"
import { componentsInit } from "../../services/init/init"

const $arkform = useArkForm()
const groupId = inject<Ref<string | null>>("group-id", ref(null))
const formId = inject<Ref<string>>("form-id")
const attrs = useAttrs()

if (!formId) {
    throw new Error(`[arkform] All <ark-input name='${attrs.name || ""}' /> tags must be inside a <ark-form /> tag. `)
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

type ArktypeStringKinds =
    | "string"
    | "string.alpha"
    | "string.alphanumeric"
    | "string.base64"
    | "string.base64.url"
    | "string.capitalize"
    | "string.capitalize.preformatted"
    | "string.creditCard"
    | "string.date"
    | "string.date.epoch"
    | "string.date.epoch.parse"
    | "string.date.iso"
    | "string.date.iso.parse"
    | "string.date.parse"
    | "string.digits"
    | "string.email"
    | "string.hex"
    | "string.integer"
    | "string.integer.parse"
    | "string.ip"
    | "string.ip.v4"
    | "string.ip.v6"
    | "string.json"
    | "string.json.parse"
    | "string.lower"
    | "string.lower.preformatted"
    | "string.normalize"
    | "string.normalize.NFC"
    | "string.normalize.NFC.preformatted"
    | "string.normalize.NFD"
    | "string.normalize.NFD.preformatted"
    | "string.normalize.NFKC"
    | "string.normalize.NFKC.preformatted"
    | "string.normalize.NFKD"
    | "string.normalize.NFKD.preformatted"
    | "string.numeric"
    | "string.numeric.parse"
    | "string.regex"
    | "string.semver"
    | "string.trim"
    | "string.trim.preformatted"
    | "string.upper"
    | "string.upper.preformatted"
    | "string.url"
    | "string.url.parse"
    | "string.uuid"
    | "string.uuid.v1"
    | "string.uuid.v2"
    | "string.uuid.v3"
    | "string.uuid.v4"
    | "string.uuid.v5"
    | "string.uuid.v6"
    | "string.uuid.v7"
    | "string.uuid.v8"
type ArktypeNumberKinds = "number" | "number.Infinity" | "number.NaN" | "number.NegativeInfinity" | "number.epoch" | "number.integer" | "number.safe"
type Other = "boolean" | "true" | "false" | "number" | "null" | "string" | "object" | "array" | "undefined"
type Operators = ">" | "<" | "="
type RawNumbers = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0"

type WithOperator = `${ArktypeStringKinds}${Operators}`
type WithOperatorNumber = `${ArktypeStringKinds}${Operators}${Numbers}`

type KnownArktype = ArktypeStringKinds | ArktypeNumberKinds | Other | WithOperator | WithOperatorNumber
type ArktypeAutoComplete = LiteralUnion<KnownArktype>
type LiteralUnion<T extends U, U = string> = T | (U & { _?: never })

interface Props {
    as?: "input" | "textarea" | "select"
    value?: null | any
    ark?: ArktypeAutoComplete
    componentId?: "ark-input"
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

const { componentId = "ark-input", as = "input", edit = true, matches, value = null, preset = null, checkbox = false, optional = false, animation = "default", theme = "default", errors = [], ark = [], label = true } = props

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
