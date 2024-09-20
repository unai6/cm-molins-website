<script setup>
import { reactive } from 'vue'

import AppLocaleSwitcher from '@/components/content/AppLocaleSwitcher.vue'

const { t } = useI18n()

const state = reactive({
  visibleDropdown: null,
})

const whoWeAreLinks = ['us', 'vision', 'corporateValues']

function openDropdown (id) {
  if (state.visibleDropdown === id) {
    state.visibleDropdown = null
    return
  }

  state.visibleDropdown = id
}
</script>

<template>
  <div class="app-header">
    <div class="app-header__block">
      <p class="app-header__dropdown-title" @click="openDropdown('aboutUs')">Quiénes somos?</p>
      <div
        class="app-header__dropdown"
        :class="{ 'app-header__dropdown--visible': state.visibleDropdown === 'aboutUs' }"
      >
        <NuxtLink v-for="(link, idx) in whoWeAreLinks" :key="idx">
          {{ $t(`appHeader.label.${link}`) }}
        </NuxtLink>
      </div>
    </div>
    {{ state.visibleDropdown }}
    <div class="app-header__dropdown"></div>
    <div class="app-header__title"></div>
    <NuxtLink class="app-header__link"></NuxtLink>
    <NuxtLink class="app-header__link"></NuxtLink>
    <AppLocaleSwitcher />
  </div>
</template>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  font-family: $font-family-heading;
  font-weight: $font-weight-regular;

  &__dropdown-title {
    cursor: pointer;
  }

  &__dropdown {
    display: none;

    &--visible {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      padding: $spacer;
      width: 240px;
      font-size: ms(0);
      line-height: $font-lineheight-long;
      color: $color-opacities-darkest;
    }
  }
}
</style>
