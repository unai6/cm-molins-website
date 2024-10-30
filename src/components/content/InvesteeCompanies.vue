<script setup>
import { reactive, ref, computed } from 'vue'

import BaseModal from '@/components/content/base/BaseModal.vue'

import investeeCompanies from '@/data/investee-companies'

const state = reactive({
  selectedCompanyType: null,
  selectedCompany: null,
  direction: 'left',
  canSlide: false,
  isModalOpen: false
})

const investeeCompaniesType = ['industry', 'startup', 'finance', 'real-state']

const carouselRef = useTemplateRef('carouselRef')

const companiesByType = computed(() => state.selectedCompanyType ? investeeCompanies.filter((company) => state.selectedCompanyType === company.type) : investeeCompanies)

const distanceToTranslate = ref(0)
const elementsToDisplay = 4

function handleButtonNavigation (direction) {
  state.direction = direction

  const children = [...carouselRef.value.children]
  if (!carouselRef.value || !children.length) return

  const columnGap = parseInt(window.getComputedStyle(carouselRef.value).columnGap)
  const childrenWidth = children[0].offsetWidth + columnGap

  const totalDistanceToTranslate = childrenWidth * (children.length - elementsToDisplay)
  distanceToTranslate.value = direction === 'right' ? distanceToTranslate.value - childrenWidth : distanceToTranslate.value + childrenWidth

  state.canSlide = distanceToTranslate.value >= -totalDistanceToTranslate && distanceToTranslate.value <= 0
  distanceToTranslate.value = Math.max(Math.min(distanceToTranslate.value, 0), -totalDistanceToTranslate)

  setElementsTransition(children, '0.3s', 'linear')
}

function selectCompanyType (companyType) {
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
  setElementsTransition(children)
}

function setElementsTransition (elements, duration = '0', animation = 'none') {
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
        class="investee-companies__investee-logo investe-companies__investee-logo--large"
        :src="state.selectedCompany.logoUrl"
      />
      <p class="investee-companies__modal-description">
        {{ state.selectedCompany.description[$i18n.locale] }}
      </p>
    </template>
  </BaseModal>
  <div class="investee-companies">
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
        </div>
      </div>
    </div>
      <div class="investee-companies__carousel-container">
        <div v-if="companiesByType.length > elementsToDisplay" class="investee-companies__direction">
          <BaseIcon
            v-for="direction in ['left', 'right']"
            :icon="`arrow-${direction}`"
            class="investee-companies__chevron"
            :class="{ 'investee-companies__chevron--disabled': !state.canSlide && direction === state.direction }"
            @click="handleButtonNavigation(direction)"
           />
        </div>
        <div ref="carouselRef" class="investee-companies__carousel">
          <div v-for="company in companiesByType">
            <img
              class="investee-companies__investee-logo"
              :src="company.logoUrl"
              @click="selectCompany(company)"
              >
          </div>
        </div>
      </div>
  </div>
</template>

<style lang="scss">
.investee-companies {
  position: relative;
  background-color: $color-neutral-medium;

  &__container {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: $spacer*3;
    max-width: $max-content-width;
    padding: $spacer*3 0;

    @include breakpoint(lg) {
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
    display: flex;
    flex-direction: column;
    gap: $spacer;
    justify-content: center;

    @include breakpoint(md) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }


    @include breakpoint(lg) {
      display: flex;
      flex-direction: row;
    }
  }

  &__investee {
    position: relative;

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
    height: 250px;
    width: 250px;
  }

  &__carousel-container {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: $spacer*1.5 0;
    background-color: $color-neutral-white;
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

  &__investee-logo {
    height: fit-content;
    max-height: 100px;
    width: 100px;
    object-fit: contain;

    @include breakpoint(lg) {
      width: 170px;
      cursor: pointer;
    }

    &--large {
      width: 200px;
      height: 200px;

      @include breakpoint(lg) {
        width: 500px;
        height: 400px;
      }
    }
  }

  &__direction {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: calc(100px * 4 + 48px); // Calculated based on the width of the images and container gap.
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: z-number(base);

    @include breakpoint(lg) {
      max-width: calc(250px * 4 + 48px);
    }
  }

  &__chevron {
    cursor: pointer;
    color: $color-neutral-medium;

    @include breakpoint(lg) {
      height: 64px;
      width: 64px;
    }

    &--disabled {
      pointer-events: none;
      opacity: 0.4;
    }
  }

  &__modal-description {
    position: relative;

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: $border-weight-hairline;
      top: -$spacer;
      background-color: $color-neutral-dark;
    }
  }
}
</style>
