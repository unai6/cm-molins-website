<script setup>
import { reactive } from 'vue'
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

const appHeaderRef = useTemplateRef('appHeaderRef')

onClickOutside(appHeaderRef, () => {
  state.visibleDropdown = null
})


const whoWeAreLinks = ['us', 'vision', 'corporateValues']
const whatWeDoLinks = ['whatWeDo', 'organsOfGovernment', 'socialResponsability']

function openDropdown (id) {
  if (state.visibleDropdown === id) {
    state.visibleDropdown = null
    return
  }

  state.visibleDropdown = id
}

function navigateToElement (id) {
  // setTimeout is needed to wait for the DOM to update after navigating from external page routes.
  setTimeout(() => {
    const element = document.getElementById(id)

    window.scrollTo({
      top: element.offsetTop - 96,
      behavior: 'smooth',
    })
  }, 500)

  state.isMenuVisible = false
  state.visibleDropdown = null
}
</script>

<template>
  <div id="top" ref="appHeaderRef" class="app-header" :class="{ 'app-header--collapsed': !state.isMenuVisible }">
    <div class="app-header__container">
      <div class="app-header__mobile-menu mobile-only">
        <NuxtLink class="app-header__title" :to="localePath('/', $i18n.locale)" @click="navigateToElement('top')">
          CARTERA DE<br>INVERSIONES&nbsp;<span>C.M.</span>
        </NuxtLink>
        <AppBurger v-model="state.isMenuVisible" mobile-only />
      </div>
      <template v-if="state.isMenuVisible || !state.isMobile">
        <div class="app-header__block">
          <p class="app-header__dropdown-title" @click="openDropdown('aboutUs')">
            {{ $t('appHeader.label.aboutUs') }} &nbsp;<BaseIcon icon="chevron-down"/>
          </p>
          <div class="app-header__dropdown" :class="{ 'app-header__dropdown--visible': state.visibleDropdown === 'aboutUs' }">
            <NuxtLink
              v-for="(link, idx) in whoWeAreLinks"
              :key="idx"
              :to="localePath('/', $i18n.locale)"
              class="app-header__link"
              @click="navigateToElement(link)"
            >
              {{ $t(`appHeader.label.${link}`) }}
            </NuxtLink>
          </div>
        </div>
        <div class="app-header__block">
          <p class="app-header__dropdown-title" @click="openDropdown('whatWeDo')">
            {{ $t('appHeader.label.whatWeDo') }} &nbsp;<BaseIcon icon="chevron-down"/>
            </p>
          <div class="app-header__dropdown" :class="{ 'app-header__dropdown--visible': state.visibleDropdown === 'whatWeDo' }">
            <NuxtLink
              v-for="(link, idx) in whatWeDoLinks"
              :key="idx"
              class="app-header__link"
              :to="localePath('/', $i18n.locale)"
              @click="navigateToElement(link)"
            >
              {{ $t(`appHeader.label.${link}`) }}
            </NuxtLink>
          </div>
        </div>
        <NuxtLink :to="localePath('/', $i18n.locale)" class="app-header__title desktop-only" @click="navigateToElement('top')">
          CARTERA DE INVERSIONES&nbsp;<span>C.M.</span>
        </NuxtLink>
        <NuxtLink
          :to="localePath('/', $i18n.locale)"
          class="app-header__link"
          @click="navigateToElement('investee')"
        >
          {{ $t('appHeader.label.investeeCompanies') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/', $i18n.locale)"
          class="app-header__link"
          @click="navigateToElement('contact')"
        >
          {{ $t('appHeader.label.contact') }}
        </NuxtLink>
        <AppLocaleSwitcher class="app-header__locale-switcher" />
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.app-header {
  $parent: &;

  background-color: $color-neutral-medium;
  z-index: z-number(header);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: height .2s linear;

  @include breakpoint(lg) {
    height: $app-header-height;
    background-color: $color-neutral-white;
  }

  &--collapsed {
    height: $app-header-height;
  }

  &__container {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    gap: $spacer*1.5;
    box-sizing: border-box;
    padding: $spacer*1.5;
    padding-bottom: $spacer;
    width: 100%;
    height: 100%;
    text-transform: uppercase;
    font-family: $font-family-highlight;
    font-weight: $font-weight-regular;

    @include breakpoint(lg) {
      align-items: center;
      flex-direction: row;
      justify-content: space-evenly;
      gap: $spacer;
      padding: 0 $spacer;
      box-sizing: border-box;
      height: 100%;
      max-width: $max-content-width;
      margin: 0 auto;
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
      padding: $spacer $spacer 0 $spacer-half;
      padding-right: 0;
      font-size: ms(0);
      line-height: $font-lineheight-long;
      color: $color-opacities-darkest;

      @include breakpoint(lg) {
        position: absolute;
        cursor: pointer;
        width: 240px;
        padding-left: $spacer;
        padding-bottom: $spacer;
        line-height: $font-lineheight-long;
        background-color: $color-neutral-white;
      }

      & > #{$parent}__link {
        border-bottom: $border-weight-hairline solid $color-neutral-black;
        color: $color-neutral-black;
        text-decoration: none;
        padding-bottom: $spacer*0.25;
        width: fit-content;

        @include breakpoint(lg) {
          border-bottom: unset;
          padding-bottom: 0;
        }
      }
    }
  }

  &__title {
    display: flex;
    align-items: flex-end;
    font-family: Cinzel, serif;
    font-size: ms(1);
    line-height: $font-lineheight-long;
    font-weight: $font-weight-light;
    color: $color-opacities-darkest;
    text-decoration: none;

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

  &__link {
    cursor: pointer;
    text-decoration: none;
    color: $color-neutral-black;

    @media(hover: hover) {
      &:hover {
        color: $color-primary;
      }
    }
  }
}
</style>
