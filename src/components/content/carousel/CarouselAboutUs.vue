<script setup>
import { reactive, onUnmounted } from 'vue'

import BaseCarousel from '@/components/content/base/BaseCarousel.vue'

const state = reactive({
  activeItem: 1,
  interval: null,
})

const itemsLength = 2

const carouselItemConfig = {
  lg: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1.25rem',
  },
}

const carouselDotsConfig = {
  background: {
    color: '#FFFFFF',
    lg: {
      color: '#FFFFFF',
    }
  },
  border: {
    color: '#FFFFFF',
    size: '2px',
    lg: {
      color: '#FFFFFF',
      size: '1px',
    }
  },
  positions: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    bottom: '16px',
    lg: {
      position: 'relative',
      transform: 'unset',
      bottom: '0',
      left: '0',
    }
  },
  size: '16px',
}

const carouselNavConfig = {
  buttons: {
    margin: '0'
  },
  lg: {
    width: 'calc(100%  - 155px * 2)',
  },
}

state.interval = setInterval(() => {
  state.activeItem = state.activeItem >= itemsLength ? 1 : state.activeItem + 1
}, 6000)


function getTemplateIdx (idx) {
  return `item${idx}`
}

onUnmounted(() => {
  clearInterval(state.interval)
})
</script>

<template>
  <BaseCarousel
    id="vision"
    v-model="state.activeItem"
    :dots-config="carouselDotsConfig"
    :nav-config="carouselNavConfig"
    :item-config="carouselItemConfig"
    :items-length="itemsLength"
    class="carousel-about-us"
    :class="{ 'carousel-about-us--primary': state.activeItem !== 1 }"
  >
    <template #[getTemplateIdx(state.activeItem)]>
      <div class="carousel-about-us__container">
        <div class="carousel-about-us__title">
          <template v-if="state.activeItem === 1">
            <ContentSlot :use="$slots.item1Title" unwrap="p" />
          </template>
          <template v-else>
            <ContentSlot :use="$slots.item2Title" unwrap="p" />
          </template>
        </div>
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
  background-color: $color-neutral-dark;
  color: $color-neutral-white;
  padding: $spacer*3 $spacer*1.5;
  padding-bottom: $spacer*4.25;
  box-sizing: border-box;

  @include breakpoint(lg) {
    padding: $spacer*3 $spacer*9.6785;
  }

  &--primary {
    background-color: $color-primary;
  }

  &__container {
    display: flex;
    gap: $spacer*1.25;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    max-width: $max-content-width;
    margin: 0 auto;
    animation: fadeIn 1s linear;

    @include breakpoint(lg) {
      gap: $spacer*3;
    }
  }

  &__title {
    font-size: ms(1);

    @include breakpoint(lg) {
      font-size: ms(3);
    }

    h2 {
      color: $color-neutral-white !important;
    }
  }

  &__content {
    line-height: $font-lineheight-largest;
    text-align: justify;
    text-wrap: balance;

    @include breakpoint(lg) {
      text-align: center;
      text-wrap: unset;
      font-size: ms(1);
      padding: 0 $spacer*7;
    }
  }
}
</style>
