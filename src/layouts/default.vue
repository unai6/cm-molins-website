<script setup>
import { useWindowScroll } from '@vueuse/core'

import AppHeader from '@/components/content/AppHeader.vue'
import BaseIcon from '@/components/content/base/BaseIcon.vue'

const { y } = useWindowScroll({ behavior: 'smooth' })
</script>

<template>
  <div class="default-layout">
    <AppHeader />
    <main>
      <slot />
      <Transition name="fade">
        <BaseIcon
          v-if="y > 200"
          class="default-layout__arrow"
          icon="arrow-tail-up"
          @click="y = 0"
        />
        </Transition>
    </main>
  </div>
</template>


<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  background-color: $color-neutral-medium;

  min-height: 100vh;

  &__arrow {
    position: fixed;
    z-index: z-number(overall);
    bottom: 4rem;
    right: 4rem;
    width: 56px;
    height: 56px;
    color: $color-opacities-darkest;
    padding: $spacer*0.25;
    border: $border-weight-hairline solid $color-neutral-black;
    border-radius: $border-radius-circular;
  }
}
</style>
