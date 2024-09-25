<script setup>
import BaseIcon from '@/components/content/base/BaseIcon.vue'

const modelValue = defineModel({ type: Number, required: true })

const props = defineProps({
  animation: {
    type: String,
    default: 'fade',
    validator: (value) => ['fade', 'slide'].includes(value),
  },
  itemsLength: {
    type: Number,
    required: true,
  },
  isButtonNavCircular: {
    type: Boolean,
    default: true,
  },
  dotsConfig: {
    type: Object,
    default: () => ({}),
  },
})

const slots = useSlots()

function handleButtonNavigation (direction) {
  if (direction === 'left' && modelValue.value === 1) {
    modelValue.value = props.itemsLength
    return
  }

  if (direction === 'right' && modelValue.value === props.itemsLength) {
    modelValue.value = 1
    return
  }

  modelValue.value = direction === 'left' ? modelValue.value - 1 : modelValue.value + 1
}

const { borderColor, backgroundColor, size, position = {} } = props.dotsConfig
</script>

<template>
  <div class="base-carousel">
    <div class="base-carousel__item" v-for="name in Object.keys(slots)" :key="name">
      <slot :name="name" />
      <div class="base-carousel__nav">
        <BaseIcon
          v-for="direction in ['left', 'right']"
          :key="direction"
          :icon="`arrow-${direction}`"
          size="large"
          class="base-carousel__nav-button"
          @click="handleButtonNavigation(direction)"
        />
      </div>
      <div class="base-carousel__dots">
        <div
          v-for="item in props.itemsLength"
          :key="item"
          class="base-carousel__dot"
          :class="{ 'base-carousel__dot--active': `item-${item}` === name }"
          @click="modelValue = item"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.base-carousel {
  width: 100%;

  @include breakpoint(lg) {
    overflow-y: hidden;
  }

  &__item {
    position: relative;
  }

  &__nav {
    display: none;

    @include breakpoint(lg) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  &__nav-button {
    color: $color-neutral-white;
    border-radius: $border-radius-circular;
    border: $border-weight-thin solid $color-neutral-white;
    margin: 0 $spacer-double;
    padding: $spacer*0.75;
    cursor: pointer;
  }

  &__dots {
    position: absolute;
    z-index: z-number(overbase);
    left: v-bind('position.left');
    bottom: v-bind('position.bottom');
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    gap: $spacer-half;
    justify-content: center;
    width: 100%;
    height: fit-content;
    cursor: pointer;

    @include breakpoint(lg) {
      bottom: v-bind('position.lg?.bottom');
    }
  }

  &__dot {
    width: v-bind(size);
    height: v-bind(size);
    border-radius: $border-radius-circular;
    border: $border-weight-hairline solid $color-neutral-dark;

    @include breakpoint(lg) {
      border: $border-weight-hairline solid $color-neutral-white;
    }

    &--active {
      background-color: $color-neutral-dark;

      @include breakpoint(lg) {
        background-color: $color-neutral-white;
      }
    }
  }
}
</style>
