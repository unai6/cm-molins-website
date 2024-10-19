<script setup>
import { ref, onMounted } from 'vue'
import { useElementSize, useBreakpoints } from '@vueuse/core'

import { debounce } from '@/utils'

import BaseIcon from '@/components/content/base/BaseIcon.vue'

const props = defineProps({
  corporativeValuesItems: {
    type: Array,
    required: true,
  },
})

const breakpoints = useBreakpoints({
  md: 768,
  lg: 1024,
  xl: 1366,
})

const isMobile = ref(breakpoints.smaller('lg'))

const doublePi = 2 * Math.PI
const alphaOffset = doublePi / props.corporativeValuesItems.length
const innerCircleRef = ref(null)
const { width } = useElementSize(innerCircleRef)


function placeWheelItems () {
  if (isMobile.value) return

  const elementsArray = [...innerCircleRef.value?.children]
  // 16 stands for the px spacer added by design.
  const radius = (width.value / 2) + 16

  for (let i = 0; i < elementsArray.length; i++) {
    const angle = alphaOffset * i + 4.188 // Apply design offset.
    const x = radius + radius * Math.cos(angle) - 75 - 16
    const y = radius + radius * Math.sin(angle) - 75 - 16
    elementsArray[i].style.left = `${x}px`
    elementsArray[i].style.top = `${y}px`

    // Position the description container
    const descriptionContainer = elementsArray[i].querySelector('.corporative-values__item-container')
    const descriptionX = 75 * Math.cos(angle) + (Math.cos(angle) > 0 ? 75 + 56 : -75 - 56) // Adjust the offset for the description container.
    descriptionContainer.style.left = `${descriptionX}px`

  }
}

onMounted(() => {
  placeWheelItems()

  window.addEventListener('resize', debounce(placeWheelItems))
})
</script>

<template>
  <div class="corporative-values">
    <div class="corporative-values__content">
      <div class="corporative-values__title">
        <ContentSlot :use="$slots.title" unwrap="p" />
      </div>
      <div class="corporative-values__wheel-container">
        <div ref="innerCircleRef" class="corporative-values__inner-circle">
          <template v-if="!isMobile">
            <div
              v-for="(value, idx) in props.corporativeValuesItems"
              :key="idx"
              class="corporative-values__item-circle"
              :style="{ backgroundColor: value.backgroundColor }"
            >
              <div class="corporative-values__item-container">
                <BaseIcon :icon="value.icon" class="corporative-values__item-icon" />
                <p class="corporative-values__item-description">
                  {{ value.description }}
                </p>
              </div>
              <p>{{ value.title }}</p>
            </div>
          </template>
          <template v-else>
            <div
              v-for="(value, idx) in props.corporativeValuesItems"
              :key="idx"
              class="corporative-values__item-circle-container-mobile"
            >
              <div class="corporative-values__item-circle" :style="{ backgroundColor: value.backgroundColor }">
                <p>{{ value.title }}</p>
              </div>
                <p class="corporative-values__item-description">
                  {{ value.description }}
                </p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.corporative-values {
  $parent: &;

  background: $color-neutral-white;
  padding: $spacer*3 $spacer*1.25;

  @include breakpoint(lg) {
    padding: $spacer*3 $spacer*9.6785;
  }

  &__content {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: $spacer-double;
    max-width: $max-content-width;

    @include breakpoint(lg) {
      margin: 0 auto;
    }
  }

  &__title {
    font-size: ms(3);
    color: $color-primary;
    text-align: center;
  }

  &__wheel-container {
    @include breakpoint(lg) {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 470px;
    }
  }

  &__inner-circle {
    display: flex;
    flex-direction: column;
    gap: $spacer*1.5;
    height: 100%;

    @include breakpoint(md) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    @include breakpoint(lg) {
      display: block;
      position: relative;
      border-radius: $border-radius-circular;
      height: 320px;
      width: 320px;
      background-color: $color-neutral-medium;
    }
  }

  &__item-circle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: $border-radius-circular;
    width: 160px;
    height: 160px;
    color: $color-neutral-white;
    font-weight: $font-weight-bold;
    transition: transform $transition-duration-slow ease;

    @include breakpoint(lg) {
      position: absolute;
      left: 50%;
      top: 50%;
      font-size: ms(1);
    }

    &:hover {
      @media (hover: hover) {
        transform: scale(1.1);

        & #{$parent}__item-description,
        & #{$parent}__item-icon {
          color: $color-primary;
        }
      }
    }
  }

  &__item-container {
    position: absolute;
    display: flex;
    gap: $spacer;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    color: $color-neutral-white;
    font-weight: $font-weight-bold;


    &:hover {
      @media (hover: hover) {
        cursor: pointer;

        & > * {
          color: $color-primary;
        }
      }
    }
  }

  &__item-icon {
    display: none;

    @include breakpoint(lg) {
      display: block;
      flex-shrink: 0;
      width: 64px;
      height: 64px;
      color: $color-neutral-light-dark;
    }
  }

  &__item-description {
    color: $color-neutral-black;
    font-size: ms(-1);
    line-height: $font-lineheight-large;
    font-family: $font-family-highlight;
    font-weight: $font-weight-regular;
  }

  &__item-circle-container-mobile {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: $spacer;
    padding: 0 $spacer-double;
    box-sizing: border-box;
    text-align: center;
  }
}
</style>
