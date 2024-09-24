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
    <p class="app-header__title mobile-only">CARTERA DE<br> INVERSIONES&nbsp;<span>C.M.</span></p>
    <div class="app-header__block">
      <p class="app-header__dropdown-title" @click="openDropdown('aboutUs')">
        ¿Quiénes somos?&nbsp;
        <BaseIcon icon="chevron-down"/>
      </p>
      <div class="app-header__dropdown" :class="{ 'app-header__dropdown--visible': state.visibleDropdown === 'aboutUs' }">
        <NuxtLink to="/" v-for="(link, idx) in whoWeAreLinks" :key="idx">
          {{ $t(`appHeader.label.${link}`) }}
        </NuxtLink>
      </div>
    </div>
    <div class="app-header__block">
      <p class="app-header__dropdown-title" @click="openDropdown('whatWeDo')">
        ¿Qué hacemos?&nbsp;
        <BaseIcon icon="chevron-down"/>
        </p>
      <div class="app-header__dropdown" :class="{ 'app-header__dropdown--visible': state.visibleDropdown === 'whatWeDo' }">
        <NuxtLink v-for="(link, idx) in whatWeDoLinks" :key="idx">
          {{ $t(`appHeader.label.${link}`) }}
        </NuxtLink>
      </div>
    </div>
    <p class="app-header__title desktop-only">CARTERA DE INVERSIONES&nbsp;<span>C.M.</span></p>
    <NuxtLink class="app-header__link">Empresas participadas</NuxtLink>
    <NuxtLink class="app-header__link">Contacto</NuxtLink>
    <AppLocaleSwitcher />
  </div>
</template>

<style lang="scss">
.app-header {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: $spacer*1.5;
  justify-content: space-evenly;
  padding: $spacer*1.5;
  background-color: $color-neutral-medium;
  text-transform: uppercase;
  font-family: $font-family-highlight;
  font-weight: $font-weight-regular;

  @include breakpoint(lg) {
    flex-direction: row;
    align-items: center;
    gap: unset;
    padding: unset;
    height: 96px;
    background-color: $color-neutral-white;
  }

  &__block {
    position: relative;
  }

  &__dropdown-title {
    cursor: pointer;
  }

  &__dropdown {
    display: none;
    z-index: z-number(dropdown);

    &--visible {
      display: flex;
      flex-direction: column;
      gap: $spacer;
      padding: $spacer;
      padding-left: $spacer-half;
      padding-bottom: 0;
      font-size: ms(0);
      line-height: $font-lineheight-long;
      color: $color-opacities-darkest;

      @include breakpoint(lg) {
        position: absolute;
        cursor: pointer;
        width: 240px;
        line-height: $font-lineheight-long;
        background-color: $color-neutral-white;
      }

      & > .router-link-active {
        border-bottom: $border-weight-hairline solid $color-neutral-black;
        padding-bottom: $spacer*0.75;
        color: $color-neutral-black;
        text-decoration: none;
      }
    }
  }

  &__title {
    font-family: Cinzel, serif;
    font-size: ms(1);
    line-height: $font-lineheight-long;
    font-weight: $font-weight-light;
    color: $color-opacities-darkest;

    @include breakpoint(lg) {
      line-height: $font-lineheight-base;
    }

    & > span {
      font-family: Arial, Helvetica, sans-serif;
      font-weight: $font-weight-bold;
      font-size: 21px; // Force this font-size as per design request.
    }
  }
}
</style>
