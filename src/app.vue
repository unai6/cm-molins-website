<script setup>
import { useRuntimeConfig } from 'nuxt/app'
import { useRoute } from 'vue-router'

const route = useRoute()

const { locale: currentLocale, defaultLocale, availableLocales } = useI18n()

const { baseAppUrl } = useRuntimeConfig().app

const canonicalUrl = `${baseAppUrl}${route.path}`

const localePath = useLocalePath()

useSchemaOrg([
  defineWebSite({
    '@type': 'Family Office',
    name: 'Cartera de Inversiones C.M.',
    url: route.path || baseAppUrl,
    inLanguage: currentLocale.value || defaultLocale,
  }),
])

useHead(() => ({
  htmlAttrs: { lang: currentLocale.value },
  link: getLanguageLinks(),
}))


function getLanguageLinks () {
  if (Object.keys(route.params).length) return []

  const routeName = route.name.split('__')[0]
  const languageLinks = availableLocales.map(availableLocale => {
    if (!localePath(routeName, availableLocale)) return {}

    return {
      rel: 'alternate',
      hreflang: availableLocale,
      href: `${baseAppUrl}${localePath(routeName, availableLocale)}`,
    }
  })

  return [
    { rel: 'canonical', href: canonicalUrl },
    { rel: 'alternate', hreflang: 'x-default', href: canonicalUrl },
    ...languageLinks,
  ]
}
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
