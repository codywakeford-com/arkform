<template>
    <form
        :data-ark-form="name"
        @submit.prevent
        class="ark-form"
        :class="{
            [`arkform-animation-${animation}`]: !!animation,
        }"
    >
        <div v-if="reset" class="ark-form-reset-button">
            <button @click="$arkform.reset(formId)">reset</button>
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

const $forms = useArkFormStore()
const $arkform = useArkForm()
const bus = useBus()

const errorsModel = defineModel<string[]>("errors", { required: true })
const idModel = defineModel<string>("id", { required: true })
const namesModel = defineModel<string[]>("names", { required: true })
const stateModel = defineModel<any>("state", { required: true })
const modelVal = defineModel<any>()
const validModel = defineModel<boolean | null>("valid", { required: true })
const validatedModel = defineModel<any | null>("validated", { required: true })
const performanceModel = defineModel<number>("performance", { required: true })

const formId = useFormId({
    idModel,
})

const formRef = computed(() => $arkform.useForm(formId.value))

useFormModelSync({
    formRef,
    models: {
        state: stateModel,
        valid: validModel,
        validated: validatedModel,
        modelVal,
        value: modelVal,
        names: namesModel,
        errors: errorsModel,
    },
})

mountForm({ formId: formId.value })

interface Props {
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
    animation?: false | "default"
}

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

    animation = "default",
} = defineProps<Props>()

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
