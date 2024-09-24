<script setup>
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
})
</script>

<template>
  <div class="base-carousel">
    <div class="base-carousel__item" v-for="name in Object.keys($slots)" :key="name">
      <slot :name="name" />
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
  overflow-y: hidden;

  &__item {
    position: relative;
    height: 100%;
  }

  &__dots {
    position: absolute;
    left: 50%;
    bottom: $spacer;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    gap: $spacer-half;
    justify-content: center;
    z-index: z-number(overbase);
    height: fit-content;
    width: 100%;
    cursor: pointer;
  }

  &__dot {
    height: 8px;
    width: 8px;
    border-radius: $border-radius-circular;
    border: $border-weight-hairline solid $color-neutral-white;

    @include breakpoint(lg) {
      height: 16px;
      width: 16px;
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
