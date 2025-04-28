<template>
    <form
        :data-ark-form="name"
        @submit.prevent
        class="ark-form"
        :class="{
            [`arkform-animation-${animation}`]: !!animation,
            [theme]: !!theme,
        }"
    >
        <div v-if="reset" class="ark-reset">
            <button @click="$arkform.reset(formId)" :data-ark-reset="name">reset</button>
        </div>
        <slot />
    </form>
</template>

<script setup lang="ts">
import { useArkFormStore } from "../../stores/forms"
import { submitForm } from "../../controllers/submitForm"
import { useBus } from "../../composables/useBus"
import { useArkForm } from "../../composables/useArkform"
import { mountForm } from "../../controllers/mount.controller"
import { useFormModelSync } from "../../composables/useModelSync"
import { useFormId } from "../../composables/initId"

const $arkform = useArkForm()
const bus = useBus()

const errorsModel = defineModel<string[]>("errors", { default: null })
const idModel = defineModel<string>("id", { default: "" })
const namesModel = defineModel<string[]>("names", { default: null })
const stateModel = defineModel<any>("state", { default: null })
const modelVal = defineModel<any>()
const validModel = defineModel<boolean | null>("valid", { default: null })
const validatedModel = defineModel<any | null>("validated")
const performanceModel = defineModel<number>("performance", { default: null })

const formId = useFormId({
    idModel,
})

const formRef = computed(() => $arkform.useForm(formId.value))

mountForm({ formId: formId.value })

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
    theme = "default",
    animation = "default",
} = defineProps<{
    componentId?: "ark-form"
    submit?: Function | null
    validation?: ValidationType
    reset?: boolean
    id?: string
    name?: string
    modelValue?: any
    state?: any
    errors?: string[]
    names?: string[]
    valid?: boolean | null
    validated?: any | null
    animation?: string | "default"
    theme?: string
}>()

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
