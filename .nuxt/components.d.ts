
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'ArkAft': typeof import("../src/runtime/components/ark/aft.vue")['default']
    'ArkBtn': typeof import("../src/runtime/components/ark/ark-btn.vue")['default']
    'ArkCheckbox': typeof import("../src/runtime/components/ark/ark-checkbox.vue")['default']
    'ArkLink': typeof import("../src/runtime/components/ark/ark-link.vue")['default']
    'ArkConfirmPassword': typeof import("../src/runtime/components/ark/confirm-password.vue")['default']
    'ArkCrud': typeof import("../src/runtime/components/ark/crud.vue")['default']
    'ArkEmail': typeof import("../src/runtime/components/ark/email.vue")['default']
    'ArkError': typeof import("../src/runtime/components/ark/error.vue")['default']
    'ArkErrors': typeof import("../src/runtime/components/ark/errors.vue")['default']
    'ArkFore': typeof import("../src/runtime/components/ark/fore.vue")['default']
    'ArkForm': typeof import("../src/runtime/components/ark/form.vue")['default']
    'ArkGroup': typeof import("../src/runtime/components/ark/group.vue")['default']
    'ArkHelp': typeof import("../src/runtime/components/ark/help.vue")['default']
    'ArkIf': typeof import("../src/runtime/components/ark/if.vue")['default']
    'ArkInput': typeof import("../src/runtime/components/ark/input.vue")['default']
    'ArkItems': typeof import("../src/runtime/components/ark/items.vue")['default']
    'ArkLabel': typeof import("../src/runtime/components/ark/label.vue")['default']
    'ArkMessageset': typeof import("../src/runtime/components/ark/messageset.vue")['default']
    'ArkModal': typeof import("../src/runtime/components/ark/modal.vue")['default']
    'ArkPage': typeof import("../src/runtime/components/ark/page.vue")['default']
    'ArkPassword': typeof import("../src/runtime/components/ark/password.vue")['default']
    'ArkRow': typeof import("../src/runtime/components/ark/row.vue")['default']
    'ArkSelect': typeof import("../src/runtime/components/ark/select.vue")['default']
    'ArkSubmit': typeof import("../src/runtime/components/ark/submit.vue")['default']
    'ArkTextarea': typeof import("../src/runtime/components/ark/textarea.vue")['default']
    'NuxtWelcome': typeof import("../../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../../../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../../../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtPage': typeof import("../../../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']
    'NoScript': typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyArkAft': LazyComponent<typeof import("../src/runtime/components/ark/aft.vue")['default']>
    'LazyArkBtn': LazyComponent<typeof import("../src/runtime/components/ark/ark-btn.vue")['default']>
    'LazyArkCheckbox': LazyComponent<typeof import("../src/runtime/components/ark/ark-checkbox.vue")['default']>
    'LazyArkLink': LazyComponent<typeof import("../src/runtime/components/ark/ark-link.vue")['default']>
    'LazyArkConfirmPassword': LazyComponent<typeof import("../src/runtime/components/ark/confirm-password.vue")['default']>
    'LazyArkCrud': LazyComponent<typeof import("../src/runtime/components/ark/crud.vue")['default']>
    'LazyArkEmail': LazyComponent<typeof import("../src/runtime/components/ark/email.vue")['default']>
    'LazyArkError': LazyComponent<typeof import("../src/runtime/components/ark/error.vue")['default']>
    'LazyArkErrors': LazyComponent<typeof import("../src/runtime/components/ark/errors.vue")['default']>
    'LazyArkFore': LazyComponent<typeof import("../src/runtime/components/ark/fore.vue")['default']>
    'LazyArkForm': LazyComponent<typeof import("../src/runtime/components/ark/form.vue")['default']>
    'LazyArkGroup': LazyComponent<typeof import("../src/runtime/components/ark/group.vue")['default']>
    'LazyArkHelp': LazyComponent<typeof import("../src/runtime/components/ark/help.vue")['default']>
    'LazyArkIf': LazyComponent<typeof import("../src/runtime/components/ark/if.vue")['default']>
    'LazyArkInput': LazyComponent<typeof import("../src/runtime/components/ark/input.vue")['default']>
    'LazyArkItems': LazyComponent<typeof import("../src/runtime/components/ark/items.vue")['default']>
    'LazyArkLabel': LazyComponent<typeof import("../src/runtime/components/ark/label.vue")['default']>
    'LazyArkMessageset': LazyComponent<typeof import("../src/runtime/components/ark/messageset.vue")['default']>
    'LazyArkModal': LazyComponent<typeof import("../src/runtime/components/ark/modal.vue")['default']>
    'LazyArkPage': LazyComponent<typeof import("../src/runtime/components/ark/page.vue")['default']>
    'LazyArkPassword': LazyComponent<typeof import("../src/runtime/components/ark/password.vue")['default']>
    'LazyArkRow': LazyComponent<typeof import("../src/runtime/components/ark/row.vue")['default']>
    'LazyArkSelect': LazyComponent<typeof import("../src/runtime/components/ark/select.vue")['default']>
    'LazyArkSubmit': LazyComponent<typeof import("../src/runtime/components/ark/submit.vue")['default']>
    'LazyArkTextarea': LazyComponent<typeof import("../src/runtime/components/ark/textarea.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyNuxtPage': LazyComponent<typeof import("../../../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']>
    'LazyNoScript': LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const ArkAft: typeof import("../src/runtime/components/ark/aft.vue")['default']
export const ArkBtn: typeof import("../src/runtime/components/ark/ark-btn.vue")['default']
export const ArkCheckbox: typeof import("../src/runtime/components/ark/ark-checkbox.vue")['default']
export const ArkLink: typeof import("../src/runtime/components/ark/ark-link.vue")['default']
export const ArkConfirmPassword: typeof import("../src/runtime/components/ark/confirm-password.vue")['default']
export const ArkCrud: typeof import("../src/runtime/components/ark/crud.vue")['default']
export const ArkEmail: typeof import("../src/runtime/components/ark/email.vue")['default']
export const ArkError: typeof import("../src/runtime/components/ark/error.vue")['default']
export const ArkErrors: typeof import("../src/runtime/components/ark/errors.vue")['default']
export const ArkFore: typeof import("../src/runtime/components/ark/fore.vue")['default']
export const ArkForm: typeof import("../src/runtime/components/ark/form.vue")['default']
export const ArkGroup: typeof import("../src/runtime/components/ark/group.vue")['default']
export const ArkHelp: typeof import("../src/runtime/components/ark/help.vue")['default']
export const ArkIf: typeof import("../src/runtime/components/ark/if.vue")['default']
export const ArkInput: typeof import("../src/runtime/components/ark/input.vue")['default']
export const ArkItems: typeof import("../src/runtime/components/ark/items.vue")['default']
export const ArkLabel: typeof import("../src/runtime/components/ark/label.vue")['default']
export const ArkMessageset: typeof import("../src/runtime/components/ark/messageset.vue")['default']
export const ArkModal: typeof import("../src/runtime/components/ark/modal.vue")['default']
export const ArkPage: typeof import("../src/runtime/components/ark/page.vue")['default']
export const ArkPassword: typeof import("../src/runtime/components/ark/password.vue")['default']
export const ArkRow: typeof import("../src/runtime/components/ark/row.vue")['default']
export const ArkSelect: typeof import("../src/runtime/components/ark/select.vue")['default']
export const ArkSubmit: typeof import("../src/runtime/components/ark/submit.vue")['default']
export const ArkTextarea: typeof import("../src/runtime/components/ark/textarea.vue")['default']
export const NuxtWelcome: typeof import("../../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../../../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../../../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../../../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']
export const NoScript: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyArkAft: LazyComponent<typeof import("../src/runtime/components/ark/aft.vue")['default']>
export const LazyArkBtn: LazyComponent<typeof import("../src/runtime/components/ark/ark-btn.vue")['default']>
export const LazyArkCheckbox: LazyComponent<typeof import("../src/runtime/components/ark/ark-checkbox.vue")['default']>
export const LazyArkLink: LazyComponent<typeof import("../src/runtime/components/ark/ark-link.vue")['default']>
export const LazyArkConfirmPassword: LazyComponent<typeof import("../src/runtime/components/ark/confirm-password.vue")['default']>
export const LazyArkCrud: LazyComponent<typeof import("../src/runtime/components/ark/crud.vue")['default']>
export const LazyArkEmail: LazyComponent<typeof import("../src/runtime/components/ark/email.vue")['default']>
export const LazyArkError: LazyComponent<typeof import("../src/runtime/components/ark/error.vue")['default']>
export const LazyArkErrors: LazyComponent<typeof import("../src/runtime/components/ark/errors.vue")['default']>
export const LazyArkFore: LazyComponent<typeof import("../src/runtime/components/ark/fore.vue")['default']>
export const LazyArkForm: LazyComponent<typeof import("../src/runtime/components/ark/form.vue")['default']>
export const LazyArkGroup: LazyComponent<typeof import("../src/runtime/components/ark/group.vue")['default']>
export const LazyArkHelp: LazyComponent<typeof import("../src/runtime/components/ark/help.vue")['default']>
export const LazyArkIf: LazyComponent<typeof import("../src/runtime/components/ark/if.vue")['default']>
export const LazyArkInput: LazyComponent<typeof import("../src/runtime/components/ark/input.vue")['default']>
export const LazyArkItems: LazyComponent<typeof import("../src/runtime/components/ark/items.vue")['default']>
export const LazyArkLabel: LazyComponent<typeof import("../src/runtime/components/ark/label.vue")['default']>
export const LazyArkMessageset: LazyComponent<typeof import("../src/runtime/components/ark/messageset.vue")['default']>
export const LazyArkModal: LazyComponent<typeof import("../src/runtime/components/ark/modal.vue")['default']>
export const LazyArkPage: LazyComponent<typeof import("../src/runtime/components/ark/page.vue")['default']>
export const LazyArkPassword: LazyComponent<typeof import("../src/runtime/components/ark/password.vue")['default']>
export const LazyArkRow: LazyComponent<typeof import("../src/runtime/components/ark/row.vue")['default']>
export const LazyArkSelect: LazyComponent<typeof import("../src/runtime/components/ark/select.vue")['default']>
export const LazyArkSubmit: LazyComponent<typeof import("../src/runtime/components/ark/submit.vue")['default']>
export const LazyArkTextarea: LazyComponent<typeof import("../src/runtime/components/ark/textarea.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../../../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']>
export const LazyNoScript: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
