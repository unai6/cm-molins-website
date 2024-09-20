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
