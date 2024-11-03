<script setup>
import { reactive, ref, computed } from 'vue'
import { useBreakpoints, useSwipe } from '@vueuse/core'

import BaseModal from '@/components/content/base/BaseModal.vue'

import config from '@/config'

import investeeCompanies from '@/data/investee-companies'

const breakpoints = useBreakpoints(config.breakpoints)


const state = reactive({
  selectedCompanyType: null,
  selectedCompany: null,
  startupInvestmentStatus: '',
  direction: 'left',
  canSlide: false,
  isModalOpen: false,
  isMobile: breakpoints.smaller('lg'),
})

const investeeCompaniesType = ['industry', 'startup', 'finance', 'realState']

const carouselRef = useTemplateRef('carouselRef')

useSwipe(carouselRef, {
  onSwipeEnd: (_, direction) => {
    const currentDirection = direction === 'left' ? 'right' : 'left'
    handleButtonNavigation(currentDirection)
  }
})

const companiesByType = computed(() => {
  let filteredCompanies = investeeCompanies

  if (state.selectedCompanyType) {
    filteredCompanies = filteredCompanies.filter((company) => {
      if (state.selectedCompanyType === 'startup') {
        if (state.startupInvestmentStatus === 'disinvested') {
          return !!company.disinvestedAt
        } else if (state.startupInvestmentStatus === 'invested') {
          return !company.disinvestedAt
        }
      }

      return state.selectedCompanyType === company.type
    })
  }

  return filteredCompanies.sort((a, b) => a.order - b.order)
})

const distanceToTranslate = ref(0)
const elementsToDisplay = computed(() => state.isMobile ? 1 : 4)

function handleButtonNavigation (direction) {
  state.direction = direction

  const children = [...carouselRef.value.children]
  if (!carouselRef.value || !children.length) return

  const columnGap = parseInt(window.getComputedStyle(carouselRef.value).columnGap)
  const childrenWidth = children[0].offsetWidth + columnGap

  const totalDistanceToTranslate = childrenWidth * (children.length - elementsToDisplay.value)
  distanceToTranslate.value = direction === 'right' ? distanceToTranslate.value - childrenWidth : distanceToTranslate.value + childrenWidth

  state.canSlide = distanceToTranslate.value > -totalDistanceToTranslate && distanceToTranslate.value < 0
  distanceToTranslate.value = Math.max(Math.min(distanceToTranslate.value, 0), -totalDistanceToTranslate)

  setElementsTransition(children, '0.3s', 'linear')
}

function selectCompanyType (companyType, status) {
  state.startupInvestmentStatus = ''

  if (status) {
    state.startupInvestmentStatus = status
  }
  state.selectedCompanyType = companyType
  resetElementsPosition()
}

function selectCompany (company) {
  state.selectedCompany = company
  state.isModalOpen = true
}

function resetElementsPosition () {
  distanceToTranslate.value = 0
  state.direction = 'left'
  state.canSlide = false

  const children = [...carouselRef.value.children]
  setElementsTransition(children, '0s', 'none')
}

function setElementsTransition (elements, duration, animation) {
  elements.forEach(element => {
    element.style.transform = `translateX(${distanceToTranslate.value}px)`
    element.style.transition = `${duration} ${animation}`
  })
}
</script>

<template>
  <BaseModal v-model="state.isModalOpen">
    <template #content>
      <img
        class="investee-companies__investee-logo investee-companies__investee-logo--large"
        :src="state.selectedCompany.logoUrl"
      />
      <p class="investee-companies__modal-title">
        <template v-if="!!state.selectedCompany.investedAt">
        {{ $t('investeeCompanies.label.investedAt', { year: state.selectedCompany.investedAt }) }}
        </template>
      </p>
      <p v-if="!!state.selectedCompany.disinvestedAt" class="investee-companies__modal-title">
        {{ $t('investeeCompanies.label.disinvestedAt', { year: state.selectedCompany.disinvestedAt }) }}
      </p>
      <p class="investee-companies__modal-description">
        {{ state.selectedCompany.description[$i18n.locale] }}
      </p>
      <a class="investee-companies__modal-website-url" :href="state.selectedCompany.websiteUrl" target="_blank" rel="nofollow">
        {{ state.selectedCompany.websiteUrl }}
      </a>
    </template>
  </BaseModal>
  <div id="investee" class="investee-companies">
    <div class="investee-companies__container">
      <div class="investee-companies__title">
        <ContentSlot :use="$slots.title" />
      </div>
      <div class="investee-companies__companies">
        <div
          v-for="companyType in investeeCompaniesType"
          :key="companyType"
          class="investee-companies__investee"
          :class="{ 'investee-companies__investee--selected': state.selectedCompanyType === companyType }"
          @click="selectCompanyType(companyType)"
        >
          <img class="investee-companies__image" :src="`/images/investee/participadas-${companyType}.jpg`">
          <p class="investee-companies__type">
            {{ $t(`investeeCompanies.label.${companyType}`) }}
          </p>

        </div>
      </div>
    </div>
    <div class="investee-companies__buttonset-wrapper">
      <div v-if="state.selectedCompanyType === 'startup'" class="investee-companies__buttonset">
        <button
          class="investee-companies__button"
          :class="{ 'investee-companies__button--active': state.startupInvestmentStatus === 'invested' }"
          @click="selectCompanyType('startup', 'invested')"
        >
          Portfolio
        </button>
        <button
          class="investee-companies__button"
          :class="{ 'investee-companies__button--active': state.startupInvestmentStatus === 'disinvested' }"
          @click="selectCompanyType('startup', 'disinvested')"
        >
          Desinversiones
        </button>
      </div>
    </div>
    <div class="investee-companies__carousel-wrapper">
      <div class="investee-companies__carousel-container">
        <template v-if="companiesByType.length > elementsToDisplay">
          <BaseIcon
            icon="arrow-left"
            class="investee-companies__chevron investee"
            :class="{ 'investee-companies__chevron--disabled': !state.canSlide && state.direction === 'left' }"
            @click="handleButtonNavigation('left')"
           />
          <BaseIcon
            icon="arrow-right"
            class="investee-companies__chevron investee"
            :class="{ 'investee-companies__chevron--disabled': !state.canSlide && state.direction === 'right' }"
            @click="handleButtonNavigation('right')"
          />
        </template>
        <div ref="carouselRef" class="investee-companies__carousel">
          <div
           v-for="company in companiesByType"
           :key="company.id"
            class="investee-companies__investee-logo-wrapper"
            @click="selectCompany(company)"
          >
            <img class="investee-companies__investee-logo" :src="company.logoUrl">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.investee-companies {
  $parent: &;

  position: relative;
  background-color: $color-neutral-medium;

  &__container {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: $spacer*1.5;
    box-sizing: border-box;
    max-width: $max-content-width;
    padding: $spacer*3 $spacer*1.5;

    @include breakpoint(lg) {
      gap: $spacer*3;
      padding: $spacer*3 $spacer*9.6785;
      margin: 0 auto;
    }
  }

  &__title {
    font-size: ms(3);
    text-align: center;
    text-transform: uppercase;
    color: $color-primary;
  }

  &__companies {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacer-half;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;

    @include breakpoint(lg) {
      display: flex;
      flex-direction: row;
      gap: $spacer;
      padding: 0;
    }
  }

  &__investee {
    position: relative;

    @media(hover: hover) {
      &:hover {
        &::after {
          position: absolute;
          content: '';
          z-index: z-number(overbase);
          bottom: 0;
          left: 0;
          height: 10px;
          width: 100%;
          background-color: $color-primary;
        }
      }
    }

    &--selected {
      &::after {
        position: absolute;
        content: '';
        z-index: z-number(overbase);
        bottom: 0;
        left: 0;
        height: 10px;
        width: 100%;
        background-color: $color-primary;
      }
    }
  }

  &__image {
    position: relative;
    cursor: pointer;
    width: 100%;
    height: 100px;
    object-fit: cover;

    @include breakpoint(lg) {
      max-height: 215px;
      max-width: 215px;
      width: 100%;
      height: 100%;
    }

    @include breakpoint(xl) {
      max-width: unset;
      max-height: unset;
      width: 250px;
      height: 250px;
    }
  }

  &__type {
    position: absolute;
    left: 50%;
    bottom: $spacer*1.25;
    transform: translateX(-50%);
    font-size: ms(1);
    line-height: $font-lineheight-base;
    font-weight: $font-weight-bold;
    color: $color-neutral-white;
    text-align: center;

    @include breakpoint(lg) {
      bottom: $spacer-double;
      font-size: ms(2);
    }

    @include breakpoint(xl) {
      font-size: ms(3);
    }
  }

  &__carousel-wrapper {
    background-color: $color-neutral-white;
  }

  &__carousel-container {
    position: relative;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    max-width: $max-content-width;
    height: 150px;
    margin: 0 auto;
    padding: $spacer $spacer*5;

    @include breakpoint(lg) {
      height: unset;
      padding: $spacer*1.5 0;
    }
  }

  &__carousel {
    display: flex;
    align-items: center;
    gap: $spacer-double;
    overflow-x: hidden;
    overflow-y: hidden;
    scrollbar-width: none;
    max-width: calc(250px + 32px * 4); // Calculated based on the width of the images and container gap.
    z-index: z-number(overbase);

    @include breakpoint(lg) {
      max-width: calc(680px + 32px * 4); // Calculated based on the width of the investee logo and container gap.
    }
  }

  &__buttonset-wrapper {
    background-color: $color-neutral-white;
  }

  &__buttonset {
    display: flex;
    gap: $spacer;
    box-sizing: border-box;
    padding: $spacer*1.5;

    @include breakpoint(lg) {
      max-width: $max-content-width;
      width: 100%;
      margin: 0 auto;
      padding: $spacer*1.5 $spacer*9.6785;
    }
  }

  &__button {
    background: transparent;
    border: $border-weight-hairline solid $color-neutral-dark;
    padding: $spacer-half;
    font-size: ms(1);
    cursor: pointer;

    &:not(#{$parent}__button--active) {
      @media(hover: hover) {
        &:hover {
          border: $border-weight-hairline solid $color-primary;
          color: $color-primary;
        }
      }
    }

    &--active {
      border: $border-weight-hairline solid $color-neutral-white;
      background-color: $color-primary;
      color: $color-neutral-white;
    }
  }

  &__investee-logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-shrink: 0;

    @include breakpoint(lg) {
      display: block;
      width: unset;
      height: unset;
      flex-shrink: unset;
    }
  }

  &__investee-logo {
    height: fit-content;
    max-height: 125px;
    width: 100%;
    object-fit: contain;

    @include breakpoint(lg) {
      cursor: pointer;
      width: 178px;
    }

    &--large {
      width: 150px;
      min-height: 64px;
      max-height: 150px;
      margin: 0 auto;

      @include breakpoint(lg) {
        width: 225px;
        height: 125px;
        margin: 0 auto;
      }
    }
  }

  &__direction {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: calc(100% - $spacer*3);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: z-number(underheader);

    @include breakpoint(lg) {
      max-width: calc(250px * 4 + 48px);
    }
  }

  &__chevron {
    position: absolute;
    cursor: pointer;
    color: $color-neutral-medium;
    width: 32px;
    height: 32px;
    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    @include breakpoint(lg) {
      height: 72px;
      width: 72px;
    }

    &--disabled {
      pointer-events: none;
      opacity: 0.4;
    }

    &:nth-child(1) {
      z-index: z-number(overbase);
      top: 50%;
      left: $spacer*1.5;
      transform: translateY(-50%);
      padding: $spacer;
      padding-left: 0;

      @include breakpoint(xl) {
        left: calc(9.6785rem + $spacer*1.5);
      }
    }

    &:nth-child(2) {
      z-index: z-number(overbase);
      top: 50%;
      right: $spacer*1.5;
      transform: translateY(-50%);
      padding: $spacer;
      padding-right: 0;

      @include breakpoint(xl) {
        right: calc(9.6785rem + $spacer*1.5);
      }
    }
  }

  &__modal-title {
    position: relative;
    font-size: ms(2);
    font-weight: $font-weight-bold;
    font-family: $font-family-highlight;

    &:first-of-type {
      padding-top: $spacer;

      &::before {
        position: absolute;
        content: '';
        top: 0;
        width: 100%;
        height: $border-weight-hairline;
        background-color: $color-neutral-dark;
      }
    }
  }

  &__modal-description {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: $spacer;
    font-family: $font-family-highlight;
    line-height: $font-lineheight-extra-large;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 5px;
      z-index: z-number(overbase);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: $border-radius-lg;
    }

    &:hover::-webkit-scrollbar-thumb {
      background-color: $color-neutral-medium;
    }

    & > b {
      font-size: ms(2);
      font-weight: $font-weight-bold;
    }
  }

  &__modal-website-url {
    text-decoration: none;
    color: $color-primary;
    font-size: ms(1);
    font-weight: $font-weight-bold;
    line-height: $font-lineheight-long;
    font-family: $font-family-highlight;
  }
}
</style>
