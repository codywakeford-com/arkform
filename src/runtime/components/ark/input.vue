<template>
    <div data-ark="input" :class="{ errors: state.errors.value.length }" class="ark-input-wrapper">
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
                type="text"
                @input="onInput()"
                v-model="state.value.value"
                v-bind="$attrs"
            />
            <input
                class="ark-input"
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
                ref="errorBoxRef"
                name="list"
                tag="ul"
                @before-enter="beforeEnter"
                @enter="enter"
                @before-leave="beforeLeave"
                @leave="leave"
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
import { useArkFormStore } from "../../stores/forms"
import { uuid } from "../../services/utils/uuid"
import type { Slots } from "vue"
import { useBus } from "../../composables/useBus"
import { useArkForm } from "../../composables/useArkform"
import { Type, type } from "arktype"
import { componentsInit } from "../../services/init/componentsInit"
import { mountInput } from "../../controllers/mount.controller"

const $arkform = useArkForm()
const formId = inject<Ref<string>>("form-id")
const groupId = inject<string | null>("group-id", null)

const $forms = useArkFormStore()
const errorBoxRef = ref<null | HTMLElement>(null)

if (!formId) {
    throw new Error("[Arkform] Missing <form-id> injection")
}

const inputType = type("string")
type ModelType = typeof inputType.infer

const valid = defineModel<boolean | null>("valid", { required: true })
const modelValue = defineModel<any | null>({ required: true })
const validated = defineModel<ModelType | null>("validated", { required: true })
const errors = defineModel<string[]>("errors", { required: true })
const id = defineModel<string>("id", { required: true })
const stateModel = defineModel<UseArkInput>("state", { required: true })
const performance = defineModel<number>("performance", { required: true })

const models = {
    valid,
    modelValue,
    validated,
    errors,
    id,
    stateModel,
    performance,
}

const inputId = useState<string>(`input-${useId()}`, () => {
    return uuid({ id: groupId || formId.value, add: "input" })
})

if (!inputId) {
    throw new Error("[Arkform] Missing <input-id> injection")
}

const state = computed(() => {
    return $arkform.useInput(inputId.value)
})

const bus = useBus()
models.id.value = inputId.value

const components = ref({
    label: null,
    error: null,
    help: null,
    aft: null,
    fore: null,
})

interface Props {
    componentId?: "ark-input"
    ark?: string | string[]
    modelValue?: ModelType | null
    matches?: string
    name: string
    slots?: Slots
    preset?: string | null
    textarea?: boolean
    optional?: boolean
    checkbox?: boolean
    id?: string
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

const ANIMATION_TIME = 200

function beforeEnter(el: Element) {
    const element = el as HTMLElement
    element.style.height = "0"
    element.style.transform = "translateY(-25px)"
    element.style.opacity = "0"
}

function enter(el: Element, done: () => void) {
    const element = el as HTMLElement
    const height = element.scrollHeight + "px"
    element.style.transition = `all ${ANIMATION_TIME}ms ease`
    requestAnimationFrame(() => {
        element.style.height = height
        element.style.transform = "translateY(-0px)"

        element.style.opacity = "1"
    })
    setTimeout(() => {
        done()
    }, ANIMATION_TIME)
}

function beforeLeave(el: Element) {
    const element = el as HTMLElement
    element.style.height = element.scrollHeight + "px"
    element.style.transform = "translateY(-0px)"
    element.style.opacity = "1"
}

function leave(el: Element, done: () => void) {
    const element = el as HTMLElement
    element.style.transition = `all ${ANIMATION_TIME}ms ease`
    requestAnimationFrame(() => {
        element.style.height = "0"
        element.style.transform = "translateY(-25px)"
        element.style.opacity = "0"
    })
    setTimeout(() => {
        done()
    }, ANIMATION_TIME)
}

watch(
    () => $arkform.useInput(inputId.value),
    (val) => {
        models.modelValue.value = val.value
        models.stateModel.value = { ...val }

        if (val.valid.value === true) {
            models.validated.value = $arkform.useInput(inputId.value).value.value
        } else {
            models.validated.value = null
        }
    },
    { immediate: true, deep: true },
)

watch(
    $arkform.useInput(inputId.value).valid,
    (val) => {
        models.valid.value = val
    },
    { immediate: true },
)

watch(
    () => $arkform.useInput(inputId.value).errors,
    (val) => {
        models.errors.value = val.value
    },
    { immediate: true },
)
</script>

<style scoped lang="scss"></style>
