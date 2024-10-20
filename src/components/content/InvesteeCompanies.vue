<script setup>
import { reactive, computed } from 'vue'

import investeeCompanies from '@/data/investee-companies'

const state = reactive({
  selectedInvestee: null,
})

const investeeCompaniesType = ['industry', 'startup', 'finance', 'real-state']

const companiesByType = computed(() => state.selectedInvestee ? investeeCompanies.filter((company) => state.selectedInvestee === company.type) : investeeCompanies)
</script>

<template>
  <div class="investee-companies">
    <div class="investee-companies__container">
      <div class="investee-companies__title">
        <ContentSlot :use="$slots.title" />
      </div>
      <div class="investee-companies__companies">
        <div
          v-for="investee in investeeCompaniesType"
          :key="investee"
          class="investee-companies__investee"
          :class="{ 'investee-companies__investee--selected': state.selectedInvestee === investee }"
          @click="state.selectedInvestee = investee"
        >
          <img class="investee-companies__image" :src="`/images/investee/participadas-${investee}.jpg`">
        </div>
      </div>
    </div>
      <div class="investee-companies__carousel-container">
        <div class="investee-companies__carousel">
          <div v-for="company in companiesByType">
            <img class="investee-companies__investee-logo" :src="company.logoUrl">
          </div>
        </div>
      </div>
  </div>
</template>

<style lang="scss">
.investee-companies {
  background-color: $color-neutral-medium;

  &__container {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: $spacer*3;
    max-width: $max-content-width;

    @include breakpoint(lg) {
      margin: 0 auto;
      padding: $spacer*3 $spacer*9.6785;
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
    gap: $spacer;
    justify-content: center;
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
    display: flex;
    justify-content: center;
    width: 100%;
    padding: $spacer 0;
    background-color: $color-neutral-white;

  }

  &__carousel {
    display: flex;
    align-items: center;
    gap: $spacer-double;
    overflow-x: scroll;
    overflow-y: hidden;
    scrollbar-width: none;
    max-width: calc(528px + $spacer*6);
  }

  &__investee-logo {
    height: fit-content;
    width: 132px;
    object-fit: contain;
  }
}
</style>
