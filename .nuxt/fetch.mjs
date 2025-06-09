import { $fetch } from 'ofetch'
import { baseURL } from '#internal/nuxt/paths'
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  })
}