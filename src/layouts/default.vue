<script setup>
import { ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'

import AppHeader from '@/components/content/AppHeader.vue'
import BaseIcon from '@/components/content/base/BaseIcon.vue'

const mainRef = useTemplateRef('mainRef')

const isArrowVisible = ref(false)

const { isScrolling } = useScroll(mainRef, {
  throttle: 100,
  onScroll: ({ x, y }) => {
    console.log(x, y)
  },
})

watch(isScrolling, () => {
  // console.info(isScrolling.value)
  isArrowVisible.value = true
})

onMounted(() => {
  // console.info(window.scrollY)
})
</script>

<template>
  <div class="default-layout">
    <AppHeader />
    <main ref="mainRef">
      <slot />
      <BaseIcon v-if="isArrowVisible" class="default-layout__arrow" icon="arrow-tail-up" />
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
