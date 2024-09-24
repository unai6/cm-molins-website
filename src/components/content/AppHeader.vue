<script setup>
import { reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

import AppLocaleSwitcher from '@/components/content/AppLocaleSwitcher.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'

const { t } = useI18n()

const state = reactive({
  visibleDropdown: null,
})

const appHeaderRef = ref(null)
onClickOutside(appHeaderRef, () => {
  state.visibleDropdown = null
})


const whoWeAreLinks = ['us', 'vision', 'corporateValues']
const whatWeDoLinks = ['whatWeDo', 'governmentOrgans', 'socialResponsability']

function openDropdown (id) {
  if (state.visibleDropdown === id) {
    state.visibleDropdown = null
    return
  }

  state.visibleDropdown = id
}
</script>

<template>
  <div ref="appHeaderRef" class="app-header">
    <div class="app-header__block">
      <p class="app-header__dropdown-title" @click="openDropdown('aboutUs')">¿Quiénes somos?&nbsp;
          <BaseIcon icon="chevron-down" size="small" /></p>
      <div class="app-header__dropdown" :class="{ 'app-header__dropdown--visible': state.visibleDropdown === 'aboutUs' }">
        <NuxtLink v-for="(link, idx) in whoWeAreLinks" :key="idx">
          {{ $t(`appHeader.label.${link}`) }}
        </NuxtLink>
      </div>
    </div>
    <div class="app-header__block">
      <p class="app-header__dropdown-title" @click="openDropdown('whatWeDo')">¿Qué hacemos?&nbsp;
          <BaseIcon icon="chevron-down" size="small" /></p>
      <div class="app-header__dropdown" :class="{ 'app-header__dropdown--visible': state.visibleDropdown === 'whatWeDo' }">
        <NuxtLink v-for="(link, idx) in whatWeDoLinks" :key="idx">
          {{ $t(`appHeader.label.${link}`) }}
        </NuxtLink>
      </div>
    </div>
    <div class="app-header__title">CARTERA DE INVERSIONES&nbsp;<span>C.M.</span></div>
    <NuxtLink class="app-header__link">Empresas participadas</NuxtLink>
    <NuxtLink class="app-header__link">Contacto</NuxtLink>
    <AppLocaleSwitcher />
  </div>
</template>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-transform: uppercase;
  font-family: $font-family-highlight;
  font-weight: $font-weight-regular;
  height: 96px;

  &__block {
    position: relative;
  }

  &__dropdown-title {
    cursor: pointer;
  }

  &__dropdown {
    display: none;

    &--visible {
      position: absolute;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      padding: $spacer;
      padding-left: $spacer-half;
      width: 240px;
      background-color: $color-neutral-white;
      font-size: ms(0);
      line-height: $font-lineheight-long;
      color: $color-opacities-darkest;
    }
  }

  &__title {
    font-family: Cinzel, serif;
    font-weight: $font-weight-light;
    font-size: ms(1);
    color: $color-opacities-darkest;

    & > span {
      font-family: Arial, Helvetica, sans-serif;
      font-weight: $font-weight-bold;
      font-size: 21px; // Force this font-size as per design request.
    }
  }
}
</style>
