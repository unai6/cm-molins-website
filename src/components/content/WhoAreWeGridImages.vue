<script setup>
import { reactive, onUnmounted } from 'vue'

import BaseCarousel from '@/components/content/base/BaseCarousel.vue'

const state = reactive({
  activeImage: 1,
  interval: null,
})

function getTemplateIdx (idx) {
  return `item-${idx}`
}

const carouselDotsConfig = {
  background: { color: '#FFFFFF', lg: { color: '#6C6C6C' } },
  border: { color: '#FFFFFF', size: '2px', lg: {   color: '#6C6C6C',   size: '1px' } },
  positions: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    bottom: '10px',
  },
  size: '16px',
}

onUnmounted(() => {
  clearInterval(state.interval)
})
</script>

<template>
  <div class="who-are-we-grid-images hidden-mobile">
    <div class="who-are-we-grid-images__item who-are-we-grid-images__item--1" />
    <div class="who-are-we-grid-images__item who-are-we-grid-images__item--2" />
    <div class="who-are-we-grid-images__item who-are-we-grid-images__item--3" />
    <div class="who-are-we-grid-images__item who-are-we-grid-images__item--4" />
    <div class="who-are-we-grid-images__item who-are-we-grid-images__item--5" />
    <div class="who-are-we-grid-images__item who-are-we-grid-images__item--6" />
    <div class="who-are-we-grid-images__item who-are-we-grid-images__item--7" />
    <div class="who-are-we-grid-images__item who-are-we-grid-images__item--8" />
  </div>
  <BaseCarousel
    v-model="state.activeImage"
    :items-length="8"
    :dots-config="carouselDotsConfig"
    class="who-are-we-grid-images hidden-desktop hidden-tablet"
  >
    <template #[getTemplateIdx(state.activeImage)]>
      <div class="who-are-we-grid-images__item" :class="` who-are-we-grid-images__item--${state.activeImage}`" />
    </template>
  </BaseCarousel>
</template>

<style lang="scss">
.who-are-we-grid-images {
  @include breakpoint(md) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacer;
    padding: $spacer*1.5;
    box-sizing: border-box;
  }

  @include breakpoint(lg) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr 1fr 1fr 1.5fr;
    gap: $spacer*0.75;
    padding: unset;
  }

  &__item {
    width: 100%;
    height: 300px;
    background-size: cover;
    animation: fadeIn 1s linear;

    @include breakpoint(md) {
      height: 300px;
    }

    @include breakpoint(lg) {
      width: unset;
      height: unset;
      background-clip: border-box;
      background-repeat: no-repeat;
      animation: unset;
    }

    &--1 {
      background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618326526/fotos%20carousel%20home/cementos_antiguo_dzvgvg.webp');
      background-position: center;

      @include breakpoint(lg) {
        grid-area: 1 / 1 / 2 / 2;
        width: 350px;
      }
    }

    &--2 {
      background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618327513/fotos%20carousel%20home/modernista_1_g2opnx.webp');
      background-position: center;

      @include breakpoint(lg) {
        grid-area: 2 / 1 / 3 / 2;
      }
    }

    &--3 {
      background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618327715/fotos%20carousel%20home/panots_g8iia6.webp');

      @include breakpoint(lg) {
        grid-area: 3 / 1 / 4 / 2;
      }
    }

    &--4 {
      background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618327556/fotos%20carousel%20home/modernista_2_pootg5.webp');
      background-position: center;

      @include breakpoint(lg) {
        grid-area: 3 / 2 / 4 / 10;
      }
    }

    &--5 {
      background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618326559/fotos%20carousel%20home/cementera_urzfdh.webp');
      background-repeat: round;
      background-size: contain;

      @include breakpoint(lg) {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        grid-area: 1 / 2 / 3 / -1;
      }
    }

    &--6 {
      background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618327396/fotos%20carousel%20home/entrada_casa_wqsazb.webp');

      @include breakpoint(lg) {
        grid-area: 3 / 10 / 4 / -1;
      }
    }

    &--7 {
      background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618327504/fotos%20carousel%20home/cms_mapa_vjvy7u.webp');

      @include breakpoint(lg) {
        background-position: bottom;
        grid-area: 4 / 1 / -1 / 5;
        height: 300px;
      }
    }

    &--8 {
      background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618329920/fotos%20carousel%20home/cementera_2_voxszb.webp');

      @include breakpoint(lg) {
        background-position: center;
        grid-area: 4 / 5 / 4 / -1;
        height: 300px;
      }
    }
  }
}
</style>
