<script setup>
const emit = defineEmits(['update:isActive'])

const modelValue = defineModel({ type: Boolean, required: true })
</script>
<template>
  <div
    role="button"
    aria-label="menu"
    class="app-burger"
    :class="{ 'app-burger--active': !!modelValue }"
    @click="modelValue = !modelValue"
  >
    <div v-for="i in 3" :key="i" class="app-burger__line" />
  </div>
</template>

<style lang="scss">
// Config vars
$thickness: 4px;
$width: 32px;
$line-width: 32px;
$ratio: 0.75; // 3:4

// Helpers
$line-position: $line-width*$ratio*0.5;
$line-cross-width: hypot($line-width, $line-width);

.app-burger {
  $parent: &;

  cursor: pointer;
  display: block;
  height: $width;
  width: $width;
  min-width: $width;
  position: relative;

  &__line {
    background-color: currentcolor;
    height: $thickness;
    left: calc(50% - $line-width*0.5);
    position: absolute;
    transform-origin: center;
    transition-duration: $transition-duration-fastest;
    transition-property: all;
    transition-timing-function: ease-out;
    width: $line-width;
    transform: translateY(-50%);
    border-radius: $border-radius-quark;

    &:nth-child(1) {
      top: calc(50% - $line-position);
    }

    &:nth-child(2) {
      top: 50%;
    }

    &:nth-child(3) {
      top: calc(50% + $line-position);
    }
  }

  &--active {
    #{$parent}__line {
      width: $line-cross-width;
      left: calc(50% - $line-cross-width*0.5);

      &:nth-child(1) {
        transform: translateY(calc($line-position - 50%)) rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        transform: translateY(calc(-1*$line-position - 50%)) rotate(-45deg);
      }
    }
  }
}
</style>
