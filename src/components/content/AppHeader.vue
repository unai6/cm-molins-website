<script setup>
import AppLocaleSwitcher from '@/components/content/AppLocaleSwitcher.vue'
</script>

<template>
  <div class="app-header">
    <div class="app-header__dropdown"></div>
    <div class="app-header__dropdown"></div>
    <div class="app-header__title"></div>
    <NuxtLink class="app-header__link"></NuxtLink>
    <NuxtLink class="app-header__link"></NuxtLink>
    <AppLocaleSwitcher />
  </div>
</template>

<style lang="scss">
.app-header {}
</style>
