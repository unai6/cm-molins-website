<script setup>
import { reactive, onUnmounted } from 'vue'

import BaseCarousel from '@/components/base/BaseCarousel.vue';

const state = reactive({
  activeImage: 1,
  interval: null,
})

const authors = ['', 'HARVEY MACKAY', 'MARK TWAIN', 'CHRIS GROSSER']

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
    <template v-for="(_, idx) in 4" :key="idx" #[getTemplateIdx(state.activeImage)] >
      <img
        :src="`/images/carousel-home-${state.activeImage}.jpg`"
        :alt="`carousel-image-${state.activeImage}`"
        class="carousel-home__image"
      />
      <div class="carousel-home__quotes">

      </div>
    </template>
  </BaseCarousel>
</template>


<style lang="scss">
.carousel-home {
  position: relative;
  height: 100dvh;
  width: 100%;

  &__image {
    width: 100%;
    height: calc(100dvh - 96px - $spacer*3);
    object-fit: cover;
    // animation: scaleIn 3s linear;
  }

  @keyframes scaleIn {
    from {
      transform: scale(1.5);
    }
    to {
      transform: scale(1);
    }
  }

  &__quotes {
    position: absolute;
    bottom: -$spacer*1.5;
    left: 100px;
    height: 360px;
    width: 352px;
    background-color: $color-primary;
    z-index: z-number(overbase);
    opacity: 0.6;
  }
}
</style>
