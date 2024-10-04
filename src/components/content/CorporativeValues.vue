<script setup>
import { ref, onMounted } from 'vue'
import { useElementSize } from '@vueuse/core'

const props = defineProps({
  corporativeValuesItems: {
    type: Array,
    required: true,
  },
})

const doublePi = 2 * Math.PI
const alphaOffset = doublePi / props.corporativeValuesItems.length
const innerCircleRef = ref(null)

const { width } = useElementSize(innerCircleRef)

onMounted(() => {
  const elementsArray = [...innerCircleRef.value.children]
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
    const descriptionX = 75 * Math.cos(angle) + (Math.cos(angle) > 0 ? 75 + 56 : -75 - 56) // Adjust the offset for the description container
    descriptionContainer.style.left = `${descriptionX}px`

  }
})
</script>

<template>
  <div class="corporative-values">
    <div class="corporative-values__content">
      <p class="corporative-values__title">
        <ContentSlot :use="$slots.title" unwrap="p" />
      </p>
      <div class="corporative-values__wheel-container">
        <div ref="innerCircleRef" class="corporative-values__inner-circle">
          <div
            v-for="(value, idx) in props.corporativeValuesItems"
            :key="idx"
            class="corporative-values__item-circle"
            :style="{ backgroundColor: value.backgroundColor }"
          >
            <div class="corporative-values__item-container">
              <p class="corporative-values__item-description">
                {{ value.description }}
              </p>
            </div>
            <p>{{ value.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.corporative-values {
  $parent: &;

  background: $color-neutral-white;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: $max-content-width;

    @include breakpoint(lg) {
      padding: $spacer*3;
      margin: 0 auto;
      gap: $spacer-double;
    }
  }

  &__title {
    font-size: ms(3);
    color: $color-primary;
  }

  &__wheel-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 470px;
  }

  &__inner-circle {
    position: relative;
    border-radius: $border-radius-circular;
    height: 320px;
    width: 320px;
    background-color: $color-neutral-medium;
  }

  &__item-circle {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: $border-radius-circular;
    width: 150px;
    height: 150px;
    left: 50%;
    top: 50%;
    color: $color-neutral-white;
    font-size: ms(1);
    font-weight: $font-weight-bold;
    transition: transform $transition-duration-slow ease;

    &:hover {
      @media (hover: hover) {
        transform: scale(1.1);
      }
    }
  }

  &__item-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    color: $color-neutral-white;
    font-size: ms(1);
    font-weight: $font-weight-bold;
  }

  &__item-description {
    position: absolute;
    color: $color-neutral-black;
    font-size: ms(0);
    line-height: $font-lineheight-large;
    font-family: $font-family-highlight;
    font-weight: $font-weight-regular;

    &:hover {
      @media (hover: hover) {
        cursor: pointer;
        color: $color-primary;
      }
    }
  }
}
</style>
