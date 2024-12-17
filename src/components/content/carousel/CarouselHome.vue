<script setup>
import { reactive, onUnmounted, useSlots } from 'vue'

import BaseCarousel from '@/components/content/base/BaseCarousel.vue'

const state = reactive({
  activeImage: 1,
  interval: null,
})

const imagesLength = 4


const carouselDotsConfig = {
  background: {
    color: '#6C6C6C',
    lg: {
      color: '#FFFFFF',
    }
  },
  border: {
    color: '#6C6C6C',
    size: '1px',
    lg: {
      color: '#FFFFFF',
      size: '1px',
    }
  },
  positions: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    bottom: '-80px',
    lg: {
      position: 'relative',
      transform: 'translate(-50%, -50%)',
      bottom: '40px',
      left: '50%',
    }
  },
  size: '16px',
}

const carouselNavConfig = {
  buttons: {
    margin: '0'
  },
  lg: {
    maxWidth: '100%',
    width: 'calc(100% - 100px)'
  },
}

state.interval = setInterval(() => {
  state.activeImage = state.activeImage >= imagesLength ? 1 : state.activeImage + 1
}, 6000)


function getTemplateIdx (idx) {
  return `item${idx}`
}

onUnmounted(() => {
  clearInterval(state.interval)
})
</script>

<template>
  <div>
    <BaseCarousel
      v-model="state.activeImage"
      :dots-config="carouselDotsConfig"
      :nav-config="carouselNavConfig"
      :items-length="imagesLength"
      class="carousel-home"
    >
      <template #[getTemplateIdx(state.activeImage)]>
        <div class="carousel-home__image-wrapper">
          <img
            :src="`/images/carousel-home-${state.activeImage}.jpg`"
            :alt="`carousel-image-${state.activeImage}`"
            class="carousel-home__image"
          />
        </div>
      </template>
    </BaseCarousel>
    <div class="carousel-home__quotes">
      <ContentSlot v-if="state.activeImage === 1" :use="$slots.item1" unwrap="p" />
      <ContentSlot v-if="state.activeImage === 2" :use="$slots.item2" unwrap="p" />
      <ContentSlot v-if="state.activeImage === 3" :use="$slots.item3" unwrap="p" />
      <ContentSlot v-if="state.activeImage === 4" :use="$slots.item4" unwrap="p" />
    </div>
  </div>
</template>


<style lang="scss">
.carousel-home {
  position: relative;
  box-sizing: border-box;

  @include breakpoint(lg) {
    height: calc(100dvh - 64px);
    overflow: visible;
  }

  &__image-wrapper {
    display: flex;
    height: calc(100dvh - 208px);
    overflow: hidden;

    @include breakpoint(lg) {
      height: calc(100dvh - $app-header-height - $spacer-double);
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    animation: scaleIn 3s linear;
    object-fit: cover;
  }

  &__quotes {
    position: absolute;
    bottom: 80px;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacer;
    justify-content: center;
    box-sizing: border-box;
    z-index: z-number(dropdown);
    width: 80%;
    max-width: 250px;
    height: 250px;
    padding: $spacer-double;
    font-size: ms(1);
    line-height: $font-lineheight-long;
    color: $color-neutral-white;
    animation: fadeIn 1s linear;

    @include breakpoint(md) {
      max-width: unset;
      height: 300px;
      width: 300px
    }

    @include breakpoint(lg) {
      bottom: 8px;
      left: 105px;
      height: 336px;
      width: 336px;
      font-size: ms(2);
    }

    @include breakpoint(xl) {
      bottom: 8px;
      left: 175px;
      height: 336px;
      width: 336px;
      font-size: ms(2);
    }

    @include breakpoint(xxl) {
      bottom: -24px;
      left: 255px;
      max-width: 600px;
      width: 500px;
      height: 500px;
      font-size: ms(3);
    }

    &::after {
      position: absolute;
      content: '';
      z-index: z-number(underbase);
      background-color: $color-primary;
      height: 100%;
      width: 100%;
      opacity: 0.6;
    }

    & span {
      font-size: ms(0);
      align-self: flex-start;

      @include breakpoint(xxl) {
        font-size: ms(1);
      }
    }
  }
}
</style>
