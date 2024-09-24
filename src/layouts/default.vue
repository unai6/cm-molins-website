<script setup>
import AppHeader from '@/components/content/AppHeader.vue'
</script>

<template>
  <div class="default-layout">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>


<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  background-color: $color-neutral-medium;

  min-height: 100vh;
}
</style>
