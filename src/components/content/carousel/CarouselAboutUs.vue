<script setup>
import { reactive, onUnmounted } from 'vue'

import BaseCarousel from '@/components/content/base/BaseCarousel.vue'

const state = reactive({
  activeItem: 1,
  interval: null,
})

const itemsLength = 2
const carouselDotsConfig = {
  background: { color: '#FFFFFF', lg: { color: '#6C6C6C' } },
  border: { color: '#FFFFFF', size: '2px', lg: {   color: '#6C6C6C',   size: '1px' } },
  position: { left: '50%', bottom: '10px', lg: { bottom: '16px' } },
  size: '16px',
}

// state.interval = setInterval(() => {
//   state.activeItem = state.activeItem >= itemsLength ? 1 : state.activeItem + 1
// }, 1000)


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
  >
    <template #[getTemplateIdx(state.activeItem)]>
      <div class="carousel-about-us__container">
        <p class="carousel-about-us__title">
          <template v-if="state.activeItem === 1">
            <ContentSlot :use="$slots.item1Title" />
          </template>
          <template v-else>
            <ContentSlot :use="$slots.item2Title" />
          </template>
        </p>
        <div class="carousel-abouts__content">
          <template v-if="state.activeItem === 1">
            <ContentSlot :use="$slots.item1Content" />
          </template>
          <template v-else>
            <ContentSlot :use="$slots.item2Content" />
          </template>
        </div>
      </div>
    </template>
  </BaseCarousel>
</template>

<style lang="scss">
.carousel-about-us {
  height: 320px;
  padding-top: $spacer*2;
  background-color: $color-neutral-dark;
  color: $color-neutral-white;

  @include breakpoint(lg) {
    padding: $spacer $spacer*3;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  &__title {
    font-size: ms(2);
  }
}
</style>
