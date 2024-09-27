<script setup>
import { reactive, onUnmounted } from 'vue'

import BaseCarousel from '@/components/content/base/BaseCarousel.vue'

const state = reactive({
  activeItem: 1,
  interval: null,
})

const itemsLength = 2
const carouselDotsConfig = {
  background: { color: '#FFFFFF', lg: { color: '#FFFFFF' } },
  border: { color: '#FFFFFF', size: '2px', lg: {   color: '#FFFFFF',   size: '1px' } },
  position: { left: '50%', bottom: '-35px', lg: { bottom: '10px' } },
  size: '16px',
}

state.interval = setInterval(() => {
  state.activeItem = state.activeItem >= itemsLength ? 1 : state.activeItem + 1
}, 6000)


function getTemplateIdx (idx) {
  return `item-${idx}`
}

onUnmounted(() => {
  clearInterval(state.interval)
})
</script>

<template>
  <BaseCarousel
    v-model="state.activeItem"
    :dots-config="carouselDotsConfig"
    :items-length="itemsLength"
    class="carousel-about-us"
    :class="{ 'carousel-about-us--primary': state.activeItem !== 1 }"
  >
    <template #[getTemplateIdx(state.activeItem)]>
      <div class="carousel-about-us__container">
        <p class="carousel-about-us__title">
          <template v-if="state.activeItem === 1">
            <ContentSlot :use="$slots.item1Title" unwrap="p" />
          </template>
          <template v-else>
            <ContentSlot :use="$slots.item2Title" unwrap="p" />
          </template>
        </p>
        <div class="carousel-about-us__content">
          <template v-if="state.activeItem === 1">
            <ContentSlot :use="$slots.item1Content" unwrap="p" />
          </template>
          <template v-else>
            <ContentSlot :use="$slots.item2Content" unwrap="p" />
          </template>
        </div>
      </div>
    </template>
  </BaseCarousel>
</template>

<style lang="scss">
.carousel-about-us {
  height: 650px;
  background-color: $color-neutral-dark;
  color: $color-neutral-white;
  padding: $spacer*3;
  box-sizing: border-box;
  @include breakpoint(lg) {
    padding: unset;
    padding-top: $spacer*3;
    height: 330px;
  }

  &--primary {
    background-color: $color-primary;
  }

  &__container {
    display: flex;
    gap: $spacer*1.25;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    animation: fadeIn 1s linear;
  }

  &__title {
    font-size: ms(1);

    @include breakpoint(lg) {
      font-size: ms(3);
    }
  }

  &__content {
    line-height: $font-lineheight-largest;
    text-align: justify;
    text-wrap: balance;

    @include breakpoint(lg) {
      padding: 0 $spacer*9.6875;
      text-align: center;
      text-wrap: unset;
      font-size: ms(1);
    }
  }
}
</style>
