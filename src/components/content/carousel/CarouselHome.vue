<script setup>
import { reactive, onUnmounted } from 'vue'

import BaseCarousel from '@/components/content/base/BaseCarousel.vue'

const state = reactive({
  activeImage: 1,
  interval: null,
})

// state.interval = setInterval(() => {
//   state.activeImage = state.activeImage >= authors.length - 1 ? 1 : state.activeImage + 1
// }, 6000)

function getTemplateIdx (idx) {
  return `item-${idx}`
}

onUnmounted(() => {
  clearInterval(state.interval)
})
</script>

<template>
  <BaseCarousel v-model="state.activeImage" class="carousel-home" :items-length="4">
    <template #[getTemplateIdx(state.activeImage)]>
      <div class="carousel-home__image-wrapper">
        <img
          :src="`/images/carousel-home-${state.activeImage}.jpg`"
          :alt="`carousel-image-${state.activeImage}`"
          class="carousel-home__image"
        />
      </div>
      <div class="carousel-home__quotes">
        <p v-html="$t(`carouselHome.message.item${state.activeImage}`)" />
      </div>
    </template>
  </BaseCarousel>
</template>


<style lang="scss">
.carousel-home {
  position: relative;

  @include breakpoint(lg) {
    height: calc(100dvh - 64px);
    overflow: visible;
  }

  &__image-wrapper {
    height: calc(100dvh - 208px);
    overflow: hidden;

    @include breakpoint(lg) {
      height: calc(100dvh - 64px);
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
    bottom: -24px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    z-index: z-number(dropdown);
    width: 352px;
    height: 360px;
    padding: $spacer-double;
    font-size: ms(2);
    line-height: $font-lineheight-long;
    color: $color-neutral-white;
    animation: fadeIn 1s linear;

    & span {
      font-size: ms(1);
    }

    @include breakpoint(lg) {
      bottom: -32px;
      left: 155px;
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
  }
}
</style>
