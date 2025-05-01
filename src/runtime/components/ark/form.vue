<template>
    <form
        :name="name || ''"
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

type Expand<T> = T extends object ? { [K in keyof T]: T[K] } : T

type Validated<T extends Record<string, any>> = T extends object
    ? { [K in keyof T]: string }
    : never

type ResolvedValidated<T extends Record<string, any>> = Expand<Validated<T>> | null

const modelVal = defineModel<T>({ default: {} as T })
const errorsModel = defineModel<string[]>("errors", { default: null })
const idModel = defineModel<string>("id", { default: "" })
const namesModel = defineModel<string[]>("names", { default: null })
const stateModel = defineModel<ArkForm>("state", { default: null })
const validModel = defineModel<boolean | null>("valid", { default: null })
const validatedModel = defineModel<ResolvedValidated<T>>("validated", { default: null })
const performanceModel = defineModel<number>("performance", { default: null })
const isSubmitting = ref(false)

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
    name = null,
    modelValue = {},
    theme = null,
    animation = null,
    defaults = {},
    auth = null,
} = defineProps<{
    componentId?: "ark-form"
    submit?: Function | null
    validation?: ValidationType
    reset?: boolean
    id?: string
    name?: string | null
    modelValue?: T
    state?: any
    defaults?: Record<string, string>
    errors?: string[]
    names?: string[]
    valid?: boolean | null
    animation?: string | null
    validated?: ResolvedValidated<T>
    theme?: string | null
    auth?: "signin" | null
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

mountForm({ formId: formId.value, animation, theme, defaults, name: name || "" })

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

// provide("form-id", formId)
provide("form-name", name)

onMounted(() => {
    const onSubmit = async () => {
        const start = performance.now()

        if (auth) {
            // handle firebase signin here
        }

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
