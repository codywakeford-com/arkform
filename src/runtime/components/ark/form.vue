<template>
    <form
        :data-ark-formid="formId"
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
import { provide, watch } from "vue"
import { useArkFormStore } from "../../stores/forms"
import { uuid } from "../../services/utils/uuid"
import { submitForm } from "../../controllers/submitForm"
import { useBus } from "../../composables/useBus"
import { useArkForm } from "../../composables/useArkform"
import { mountForm } from "../../controllers/mount.controller"

const emit = defineEmits<{
    (e: "update:errors", value: string[]): void
    (e: "update:id", value: string): void
    (e: "update:names", value: string[]): void
    (e: "update:state", value: UseArkForm): void
    (e: "update:modelValue", value: any): void
    (e: "update:valid", value: boolean | null): void
    (e: "update:validated", value: any | null): void
    (e: "update:performance", value: number | null): void
}>()

const instanceId = useId()
const formId = useState<string>(`form`, () => uuid())
emit("update:id", formId.value)

onServerPrefetch(() => {
    emit("update:id", formId.value)
})

const $forms = useArkFormStore()
const $arkform = useArkForm()
const bus = useBus()

provide<Ref<string>>("form-id", formId)
mountForm({ formId: formId.value })

interface Props {
    componentId?: "ark-form"
    submit?: Function | null
    validation?: ValidationType
    reset?: boolean
    id?: string
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

    animation = "default",
} = defineProps<Props>()

watch(
    () => $arkform.useForm(formId.value),
    (val) => {
        emit("update:state", { ...val })

        emit("update:valid", val.valid.value)

        console.log(val.valid.value)

        if (val.valid.value === true) {
            emit("update:validated", val.value.value)
        } else {
            emit("update:validated", null)
        }
    },
    { immediate: true, deep: true },
)

watch(
    $arkform.useForm(formId.value).names,
    (val) => {
        emit("update:names", val)
    },
    { immediate: true },
)

watch(
    $arkform.useForm(formId.value).errors,
    (val) => {
        emit("update:errors", val)
    },
    { immediate: true },
)

watch(
    $arkform.useForm(formId.value).value,
    (val) => {
        emit("update:modelValue", val)
    },
    { immediate: true },
)

onMounted(() => {
    const onSubmit = () => {
        const start = performance.now()

        submitForm({ submitFunction: submit, formId: formId.value })
        $arkform.useForm(formId.value).validation.value = "eager"

        const perf = Number((performance.now() - start).toFixed(6))
        emit("update:performance", perf)
    }

    const onInput = (input: any) => {
        const start = performance.now()

        if ($arkform.useForm(formId.value).validation.value === "eager") {
            $arkform.validate(formId.value)
        }

        const perf = Number((performance.now() - start).toFixed(4))
        emit("update:performance", perf)
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
