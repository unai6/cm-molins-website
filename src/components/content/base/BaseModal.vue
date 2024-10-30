<script setup>
import { onClickOutside } from '@vueuse/core'

import BaseIcon from '@/components/content/base/BaseIcon.vue'

const isOpen = defineModel({ type: Boolean, default: false })

const modalRefContainer = useTemplateRef('modalRefContainer')

onClickOutside(modalRefContainer, () => {
  isOpen.value = false
})
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-if="isOpen" class="base-modal">
      <div class="base-modal__overlay" />
      <div class="base-modal__container" ref="modalRefContainer" >
        <BaseIcon
          class="base-modal__x-mark"
          icon="x-mark"
          size="largest"
          @click="isOpen = false"
        />
        <h2 v-if="!!$slots.title" class="base-modal__title">
          <slot name="title" />
        </h2>
        <div v-if="!!$slots.content" class="base-modal__content">
          <slot name="content" />
        </div>
      </div>
    </div>
  </Transition>
</template>


<style lang="scss">
.base-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: z-number(modal);

  &__overlay {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: $color-opacities-darkest;
  }

  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: $spacer;
    border: $border-weight-heaviest solid $color-neutral-dark;
    background-color: $color-neutral-white;

    @include breakpoint(lg) {
      height: 600px;
      width: 600px;
      padding: $spacer*1.5;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacer;
  }

  &__x-mark {
    display: block;
    margin-left: auto;
    padding: $spacer;
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        color: $color-primary;
      }
    }
  }
}
</style>
