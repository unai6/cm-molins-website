<script setup>
const props = defineProps({
  animation: {
    type: String,
    default: 'fade',
    validator: (value) => ['fade', 'slide'].includes(value),
  },
})
</script>

<template>
  <div class="base-carousel">
    <div v-for="name in Object.keys($slots)" :key="name">
      <slot :name="name" />
    </div>
  </div>
</template>

<style lang="scss">
.base-carousel {
  width: 100%;
  overflow-y: hidden;
}
</style>
