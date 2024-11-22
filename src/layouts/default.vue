<script setup>
import { ref, onMounted } from 'vue'

import AppHeader from '@/components/content/AppHeader.vue'
import BaseIcon from '@/components/content/base/BaseIcon.vue'

const yRef = ref(0)

function resetScroll () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  yRef.value = 0
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    yRef.value = window.scrollY
  })
})
</script>

<template>
  <div class="default-layout">
    <AppHeader />
    <main>
      <slot />
      <Transition name="fade">
        <BaseIcon
        v-if="yRef > 200"
        class="default-layout__arrow"
        icon="arrow-tail-up"
        @click="resetScroll"
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
  padding-top: $app-header-height;
  min-height: 100vh;

  &__arrow {
    position: fixed;
    z-index: z-number(header);
    bottom: $spacer;
    right: $spacer;
    width: 48px;
    height: 48px;
    color: $color-opacities-darkest;
    padding: $spacer*0.25;
    border: $border-weight-hairline solid $color-neutral-black;
    border-radius: $border-radius-circular;
    cursor: pointer;

    @include breakpoint(lg) {
      bottom: 4rem;
      right: 4rem;
      width: 56px;
      height: 56px;
    }
  }
}
</style>
