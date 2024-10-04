<script setup>
import { reactive } from 'vue'
import BaseIcon from '@/components/content/base/BaseIcon.vue'

import { deepMerge } from '@/utils'

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
  itemConfig: {
    type: Object,
    default: () => ({}),
  },
  navConfig: {
    type: Object,
    default: () => ({}),
  },
})

const slots = useSlots()

const defaultNavConfigStyling = {
  lg: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1440px',
  },
  positions: {
    lg: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '100%',
      justifyContent: 'space-between',
      transform: 'translate(-50%, -50%)',
    },
  },
  buttons: {
    color: '#FFFFFF',
    border: {
      color: '#FFFFFF',
      weight: '2px',
    },
    margin: '0 32px',
  },
}

const state = reactive({
  navConfig: defaultNavConfigStyling,
})


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

getNavConfig()

function getNavConfig () {
  if (props.navConfig) {
    state.navConfig = deepMerge({ ...defaultNavConfigStyling }, props.navConfig)
  } else {
    state.navConfig = defaultNavConfigStyling
  }
}
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
    height: 100%;

    @include breakpoint(lg) {
      display: v-bind('props.itemConfig?.lg?.display');
      align-items: v-bind('props.itemConfig.lg?.alignItems');
      flex-direction: v-bind('props.itemConfig.lg?.flexDirection');
      justify-content: v-bind('props.itemConfig.lg?.justifyContent');
      gap: v-bind('props.itemConfig.lg?.gap');
    }
  }

  &__nav {
    display: none;

    @include breakpoint(lg) {
      position: v-bind('state.navConfig.positions?.lg?.position');
      top: v-bind('state.navConfig.positions?.lg?.top');
      left: v-bind('state.navConfig.positions?.lg?.left');
      transform: v-bind('state.navConfig.positions?.lg?.transform');
      display: v-bind('state.navConfig?.lg?.display');
      width: v-bind('state.navConfig.lg?.width');
      max-width: v-bind('state.navConfig.lg?.maxWidth');
      justify-content: v-bind('state.navConfig.lg?.justifyContent');
    }
  }

  &__nav-button {
    color: v-bind('state.navConfig.buttons?.color');
    border-radius: $border-radius-circular;
    border: v-bind('state.navConfig.buttons?.border.color') solid v-bind('state.navConfig.buttons.border.weight');
    margin: v-bind('state.navConfig.buttons?.margin');
    padding: $spacer*0.75;
    cursor: pointer;
  }

  &__dots {
    position: v-bind('props.dotsConfig.positions.position');
    z-index: z-number(overbase);
    left: v-bind('props.dotsConfig?.positions?.left');
    bottom: v-bind('props.dotsConfig?.positions?.bottom');
    transform: v-bind('props.dotsConfig?.positions?.transform');
    display: flex;
    align-items: center;
    gap: $spacer-half;
    justify-content: center;
    width: 100%;
    height: fit-content;
    cursor: pointer;

    @include breakpoint(lg) {
      position: v-bind('props.dotsConfig.positions?.lg?.position');
      bottom: v-bind('props.dotsConfig.positions?.lg?.bottom');
      left: v-bind('props.dotsConfig.positions?.lg?.left');
      transform: v-bind('props.dotsConfig.positions?.lg?.transform');
    }
  }

  &__dot {
    width: v-bind('props.dotsConfig.size');
    height: v-bind('props.dotsConfig.size');
    border-radius: $border-radius-circular;
    border: v-bind('props.dotsConfig.border?.size') solid v-bind('props.dotsConfig.border?.color');

    @include breakpoint(lg) {
      border: v-bind('props.dotsConfig.border?.lg?.size') solid v-bind('props.dotsConfig.border.lg?.color');
    }

    &--active {
      background-color: v-bind('props.dotsConfig.background?.color');

      @include breakpoint(lg) {
        background-color: v-bind('props.dotsConfig.background?.lg?.color');
      }
    }
  }
}
</style>
