<script setup>
import { watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

import BaseIcon from '@/components/content/base/BaseIcon.vue'

const isOpen = defineModel({ type: Boolean, default: false })

const modalRefContainer = useTemplateRef('modalRefContainer')

onClickOutside(modalRefContainer, () => {
  isOpen.value = false
})


watch(isOpen, value=> {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'visible'
  }
})
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-if="isOpen" class="base-modal__overlay" />
  </Transition>
  <Transition name="move-up" mode="out-in">
    <div v-if="isOpen" class="base-modal">
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
  justify-content: flex-end;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: z-number(modal);

  @include breakpoint(lg) {
    justify-content: center;
  }

  &__overlay {
    position: fixed;
    bottom: 0;
    z-index: z-number(modal);
    width: 100%;
    height: 100%;
    background-color: $color-opacities-medium;
  }

  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: $spacer;
    box-sizing: border-box;
    border-top-left-radius: $spacer;
    border-top-right-radius: $spacer;
    padding: $spacer*1.5;
    width: 100%;
    height: fit-content;
    max-height: calc(100% - $app-header-height);
    background-color: $color-neutral-white;

    @include breakpoint(lg) {
      border-top-left-radius: unset;
      border-top-right-radius: unset;
      border: $border-weight-heaviest solid $color-neutral-dark;
      width: 650px;
      height: 600px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacer;
    overflow: scroll;
  }

  &__x-mark {
    display: block;
    flex-shrink: 0;
    margin-left: auto;
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        color: $color-primary;
      }
    }
  }
}
</style>
