<script setup>
const { locale, defaultLocale } = useI18n()
const { path } = useRoute()

const contentPath = locale.value === defaultLocale ? `/${locale.value}${path}` : path
</script>

<template>
  <div>
    <ContentDoc :path="contentPath" />
  </div>
</template>
