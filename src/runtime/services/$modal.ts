import { useState } from "nuxt/app"
import ArkModal from "../components/ark/modal.vue"

// modal helper
import { h, render, createVNode } from "vue"
import type { Component as HTMLElement, ComponentPublicInstance, DefineComponent } from "vue"

// const { $modal } = defineModals({
//     default: ArkForm,
// })

export function useModals()
{
    // `Record<string, Component>` - holds modal components
    const modals = useState<Record<string, any>>('_$modals', () => ({}))
  
    return {
      set: (key: string, component: any) => {
        modals.value[key] = component
      },
  
      delete: (key: string) => {
        delete modals.value[key]
      },
  
      has: (key: string) => {
        return key in modals.value
      },
  
      get: (key: string) => {
        return modals.value[key]
      },
  
      keys: () => Object.keys(modals.value),
  
      clear: () => {
        Object.keys(modals.value).forEach(key => delete modals.value[key])
      }
    }
  }
  


type a = DefineComponent<typeof ArkModal>

type Props = InstanceType<a>["$props"]
type Prop = InferSlots<a>

type InferProps<T> = InstanceType<T extends new (...args: any) => any ? T : never>["$props"]
type InferSlots<T> = InstanceType<T extends new (...args: any) => any ? T : never>["$slots"]

type ModalOptions<T extends HTMLElement = HTMLElement> = {
    props?: Record<string, InferProps<T>>
    slots?: Record<string, InferSlots<T>>
}

type DefineModalReturn<T extends Record<string, HTMLElement>> = {
    /**A global helper for managing modals. */
    $modal: <N extends string>(
        name: N,
        options?: ModalOptions<HTMLElement>
    ) => {
        /**Mounts an instance of the modal in the dom. If an instance already exists it will be replaced. */
        open: () => void

        /**Unmount the modal instance. */
        close: () => void

        ref: () => Ref<{
            isOpen: boolean
        }>
    }
}

/**Declare components to be used as modals and get the $modal manager function.   */
export function defineModals<T extends Record<string, HTMLElement>>(modalDefs: T): DefineModalReturn<T> {
    const instances = new Map<string, HTMLElement>()
    console.log("[$modal] Installed")

    const modals = useModals()

    function $modal<N extends keyof T>(name: N, options?: ModalOptions<T[N]>) {
        if (!import.meta.client) {
            console.warn("$modal() can only be used in the browser.")
            return
        }
        const ModalComponent = modalDefs[name]
        if (!ModalComponent) {
            console.warn(`Modal "${String(name)}" not found.`)
            return
        }

        return {
            open: () => {
                if (instances.has(String(name))) {
                    $modal(name).close()
                }

                const container = document.createElement("div")
                document.body.appendChild(container)
                instances.set(String(name), container)

                const vnode = h(
                    ModalComponent,
                    {
                        ...options?.props,
                        onClose: () => {
                            render(null, container)
                            container.remove()
                            instances.delete(String(name))
                        },
                    },
                    options?.slots || {}
                )

                render(vnode, container)
                instances.set(String(name), container)
            },

            close: () => {
                const container = instances.get(String(name)) as HTMLElement

                if (!container) {
                    console.warn(`Modal "${String(name)}" is not open.`)
                    return
                }

                render(null, container)
                container.remove()

                instances.delete(String(name))
            },
        }
    }
    return { $modal }
}
