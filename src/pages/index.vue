<script setup>
const { locale, fallbackLocale } = useI18n()
const { path } = useRoute()

const contentPath = locale.value === fallbackLocale.value ? `/${locale.value}${path}` : path
</script>

<template>
  <div>
    <ContentDoc :path="contentPath" />
  </div>
</template>
