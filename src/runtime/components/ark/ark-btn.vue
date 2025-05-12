<template>
    <button
        :style="{ '--menu-gap': menuGap + 'px' }"
        class="btn"
        ref="btn"
        :disabled="loading || functionLoading"
        @click="handleClick(e)"
    >
        <div class="fore" v-if="$slots.fore">
            <slot name="fore"></slot>
        </div>

        <div class="center">
            <div class="loader">
                <slot name="loader" v-if="loading || functionLoading">
                    <Icon class="loader-icon" name="svg-spinners:90-ring" />
                </slot>
            </div>

            <div v-if="firstClick && confirm" class="confirm-message">Are you sure?</div>

            <div
                :class="{
                    hidden: loading || functionLoading || (confirm && firstClick),
                    'hidden-abs': confirm && firstClick,
                }"
            >
                <slot />
            </div>
        </div>

        <div class="aft" v-if="$slots.aft">
            <slot name="aft"></slot>
        </div>

        <div class="btn-menu" :class="[menuPos, { inActive: !menuActive }]" @click.stop>
            <slot name="menu" />
        </div>
    </button>
</template>

<script setup lang="ts">
import { ref, useAttrs } from "vue"
const btn = ref<HTMLButtonElement | null>(null)

const menuActive = ref(false)
const functionLoading = ref(false)
const firstClick = ref(false)
const buttonHeight = ref(0)

interface Props {
    loading?: boolean
    menuPos?: "bottom-left" | "bottom-right"
    menuGap?: number
    func?: Function
    confirm?: boolean
}

const { menuPos = "bottom-left", confirm = false, menuGap = 5, func } = defineProps<Props>()

const handleClick = async (event: Event) => {
    menuActive.value = !menuActive.value

    if (confirm && !firstClick.value) {
        firstClick.value = true
        return
    }

    firstClick.value = false
    await handleLoading()
}

async function handleLoading() {
    if (func) {
        const result = (func as Function)(event)

        if (result instanceof Promise) {
            functionLoading.value = true
            try {
                await result
            } finally {
                functionLoading.value = false
            }
        }
    }
}
//fix
// useClickOutside(btn, () => {
//     menuActive.value = false
//     firstClick.value = false
// })
</script>

<style scoped lang="scss">
.btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    padding: 3px 10px;
    border-radius: 3px;
    cursor: pointer;

    .confirm-message {
        color: inherit;
        white-space: nowrap;
    }

    .loader {
        color: inherit;
        position: absolute;
        left: 50%;
        top: 50%;

        transform: translate(-50%, -50%);

        .loader-icon {
            font-size: inherit;
        }
    }

    .center {
        display: flex;
        align-items: center;
        height: fit-content;
    }
}

.btn-menu {
    position: absolute;

    &.inActive {
        display: none;
    }

    &.bottom-left {
        transform-origin: top left;
        top: calc(100% + var(--menu-gap));
        left: 0;
    }

    &.bottom-right {
        transform-origin: top right;
        top: calc(100% + var(--menu-gap));
        right: 0;
    }
}

.hidden {
    opacity: 0;
}

.hidden-abs {
    position: absolute;
    opacity: 0;
}
</style>
