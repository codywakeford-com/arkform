<template>
    <form
        :data-ark-form="name"
        @submit.prevent
        class="ark-form"
        :class="{
            [`arkform-animation-${animation}`]: !!animationVal,
            [`${themeVal}`]: !!themeVal,
        }"
    >
        <div v-if="reset" class="ark-reset">
            <button @click="$arkform.reset(formId)" :data-ark-reset="name">reset</button>
        </div>
        <slot />
    </form>
</template>

<script setup lang="ts" generic="T">
import { submitForm } from "../../controllers/submitForm"
import { useBus } from "../../composables/useBus"
import { useArkForm } from "../../composables/useArkform"
import { mountForm } from "../../controllers/mount.controller"
import { useFormModelSync } from "../../composables/useModelSync"
import { useFormId } from "../../composables/initId"
import { type } from "arktype"

const $arkform = useArkForm()
const bus = useBus()
const $arkconfig = $arkform.config

type Validated<T> = { [K in keyof T]: string } | null
type Expand<T> = { [K in keyof T]: T[K] }
type ResolvedValidated = Expand<Validated<T>>

const errorsModel = defineModel<string[]>("errors", { default: null })
const idModel = defineModel<string>("id", { default: "" })
const namesModel = defineModel<string[]>("names", { default: null })
const stateModel = defineModel<any>("state", { default: null })
const validatedModel = defineModel<ResolvedValidated>("validated")
const modelVal = defineModel<T>({ default: {} })
const validModel = defineModel<boolean | null>("valid", { default: null })
const performanceModel = defineModel<number>("performance", { default: null })

const formId = useFormId({
    idModel,
})

const formRef = computed(() => $arkform.useForm(formId.value))

const {
    componentId = "ark-form",
    submit = null,
    reset = true,
    valid = null,
    validated = null,
    state = {},
    errors = [],
    id = "",
    name = "",
    modelValue = {},
    theme = null,
    animation = null,
    defaults = {},
} = defineProps<{
    componentId?: "ark-form"
    submit?: Function | null
    validation?: ValidationType
    reset?: boolean
    id?: string
    name?: string
    modelValue?: ModelType
    state?: any
    defaults?: Record<string, string>
    errors?: string[]
    names?: string[]
    valid?: boolean | null
    animation?: string | null
    validated?: Validated<T>
    theme?: string | null
}>()

const ModelTypeDef = type({
    firstName: "string | null",
    lastName: "string | null",
    email: "string | null",
    password: "string | null",
})

type ModelType = typeof ModelTypeDef.infer

// Get active style
const themeVal = computed(() => {
    return theme ? theme : $arkconfig.value.theme
})
const animationVal = computed(() => {
    return animation ? animation : null
})

mountForm({ formId: formId.value, animation, theme, defaults })

useFormModelSync({
    formRef,
    models: {
        stateModel,
        validModel,
        validatedModel,
        modelVal,
        namesModel,
        errorsModel,
    },
})

provide("form-name", name)

onMounted(() => {
    const onSubmit = () => {
        const start = performance.now()

        submitForm({ submitFunction: submit, formId: formId.value })
        $arkform.useForm(formId.value).validation.value = "eager"

        const perf = Number((performance.now() - start).toFixed(6))
        performanceModel.value = perf
    }

    const onInput = (input: any) => {
        const start = performance.now()

        if ($arkform.useForm(formId.value).validation.value === "eager") {
            $arkform.validate(formId.value)
        }

        const perf = Number((performance.now() - start).toFixed(4))
        performanceModel.value = perf
    }

    bus.on(`${formId}:submit`, onSubmit)
    bus.on(`${formId}:input`, onInput)

    onUnmounted(() => {
        bus.off(`form-${formId}:submit`, onSubmit)
        bus.off(`${formId}:input`, onInput)
    })
})
</script>

<style scoped lang="scss"></style>
