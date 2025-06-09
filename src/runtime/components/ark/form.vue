<template>
    <form
        :name="name || ''"
        :data-ark-form="name"
        @submit.prevent
        :readonly
        class="ark-form"
        :class="{
            'read-only': !!readonly,
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

const $arkform = useArkForm()
const bus = useBus()
const $arkconfig = $arkform.config

const modelVal = defineModel<T>({ default: {} as T })
const errorsModel = defineModel<string[]>("errors", { default: null })
const idModel = defineModel<string>("id", { default: "" })
const namesModel = defineModel<string[]>("names", { default: null })
const stateModel = defineModel<ArkForm>("state", { default: null })
const validModel = defineModel<boolean | null>("valid", { default: null })
const validatedModel = defineModel<any>("validated", { default: null })
const performanceModel = defineModel<number>("performance", { default: null })

const emit = defineEmits(["change"])

const formId = useFormId({
    idModel,
})

const formRef = computed(() => $arkform.useForm(formId.value))

const {
    componentId = "ark-form",
    submit = null,
    reset = true,
    readonly = false,
    valid = null,
    validated = null,
    state = {},
    errors = [],
    id = "",
    name = null,
    modelValue = {},
    theme = null,
    animation = null,
    defaults = null,
    auth = null,
    persist = false,
} = defineProps<{
    componentId?: "ark-form"
    name: string
    submit?: Function | null
    validation?: ValidationType
    persist?: boolean
    reset?: boolean
    id?: string
    modelValue?: T
    state?: any
    defaults?: any
    errors?: string[]
    names?: string[]
    valid?: boolean | null
    animation?: string | null
    validated?: any
    theme?: string | null
    auth?: "signin" | null
    readonly?: boolean
}>()

// Get active style
const themeVal = computed(() => {
    return theme ? theme : $arkconfig.value.theme
})
const animationVal = computed(() => {
    return animation ? animation : null
})

mountForm({ formId: formId.value, animation, theme, defaults, name, persist, readOnly: readonly })

useFormModelSync({
    formRef,
    formId: formId.value,
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

    const onChange = (input: any) => {
        emit("change", formRef)
    }

    bus.on(`${formId}:change`, onChange)
    bus.on(`${formId}:submit`, onSubmit)
    bus.on(`${formId}:input`, onInput)

    onUnmounted(() => {
        bus.off(`form-${formId}:submit`, onSubmit)
        bus.off(`${formId}:input`, onInput)
    })
})
</script>

<style scoped lang="scss"></style>
