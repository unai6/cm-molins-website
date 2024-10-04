<script setup>
import { reactive, ref } from 'vue'
import { onClickOutside, useBreakpoints } from '@vueuse/core'

import AppLocaleSwitcher from '@/components/content/AppLocaleSwitcher.vue'
import AppBurger from '@/components/content/AppBurger.vue'
import BaseIcon from '@/components/content/base/BaseIcon.vue'

import config from '@/config'

const breakpoints = useBreakpoints(config.breakpoints)

const state = reactive({
  visibleDropdown: null,
  isMenuVisible: false,
  isMobile: breakpoints.smaller('lg'),
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
    <div class="app-header__container">
      <div class="app-header__mobile-menu mobile-only">
        <p class="app-header__title">CARTERA DE<br>INVERSIONES&nbsp;<span>C.M.</span></p>
        <AppBurger v-model="state.isMenuVisible" mobile-only />
      </div>
      <template v-if="state.isMenuVisible || !state.isMobile">
        <div class="app-header__block">
          <p class="app-header__dropdown-title" @click="openDropdown('aboutUs')">
            ¿Quiénes somos?&nbsp;<BaseIcon icon="chevron-down"/>
          </p>
          <div class="app-header__dropdown" :class="{ 'app-header__dropdown--visible': state.visibleDropdown === 'aboutUs' }">
            <NuxtLink to="/" v-for="(link, idx) in whoWeAreLinks" :key="idx">
              {{ $t(`appHeader.label.${link}`) }}
            </NuxtLink>
          </div>
        </div>
        <div class="app-header__block">
          <p class="app-header__dropdown-title" @click="openDropdown('whatWeDo')">
            ¿Qué hacemos?&nbsp;<BaseIcon icon="chevron-down"/>
            </p>
          <div class="app-header__dropdown" :class="{ 'app-header__dropdown--visible': state.visibleDropdown === 'whatWeDo' }">
            <NuxtLink to="/"  v-for="(link, idx) in whatWeDoLinks" :key="idx">
              {{ $t(`appHeader.label.${link}`) }}
            </NuxtLink>
          </div>
        </div>
        <p class="app-header__title desktop-only">CARTERA DE INVERSIONES&nbsp;<span>C.M.</span></p>
        <NuxtLink class="app-header__link">Empresas participadas</NuxtLink>
        <NuxtLink class="app-header__link">Contacto</NuxtLink>
        <AppLocaleSwitcher class="app-header__locale-switcher" />
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.app-header {
  background-color: $color-neutral-medium;
  z-index: z-number(header);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;

  @include breakpoint(lg) {
    background-color: $color-neutral-white;
    height: 96px;
  }

  &__container {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    gap: $spacer*1.5;
    justify-content: space-evenly;
    box-sizing: border-box;
    padding: $spacer*1.5;
    padding-bottom: $spacer;
    width: 100%;
    text-transform: uppercase;
    font-family: $font-family-highlight;
    font-weight: $font-weight-regular;

    @include breakpoint(lg) {
      flex-direction: row;
      align-items: center;
      gap: $spacer-half;
      padding: 0 $spacer;
      box-sizing: border-box;
      height: 100%;
    }
  }

  &__mobile-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
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
      padding: $spacer-double $spacer $spacer 0;
      padding-left: $spacer-half;
      padding-bottom: 0;
      font-size: ms(0);
      line-height: $font-lineheight-long;
      color: $color-opacities-darkest;

      @include breakpoint(lg) {
        position: absolute;
        cursor: pointer;
        width: 240px;
        padding-left: $spacer;
        line-height: $font-lineheight-long;
        background-color: $color-neutral-white;
      }

      & > .router-link-active {
        border-bottom: $border-weight-hairline solid $color-neutral-black;
        padding-bottom: $spacer*0.75;
        color: $color-neutral-black;
        text-decoration: none;

        @include breakpoint(lg) {
          border-bottom: unset;
        }
      }
    }
  }

  &__title {
    display: flex;
    align-items: baseline;
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

  &__locale-switcher {
    margin-top: $spacer;

    @include breakpoint(lg) {
      margin-top: unset;
    }
  }
}
</style>
