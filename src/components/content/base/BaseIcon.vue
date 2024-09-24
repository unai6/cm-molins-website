<script setup>
import { defineAsyncComponent, computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'largest'].includes(value),
  },
})

const sizes = {
  small: 8,
  medium: 16,
  large: 24,
  largest: 32,
}

const pixelSize = computed(() => sizes[props.size] || sizes.medium)
const CurrentIconComponent = computed(() => defineAsyncComponent(() => import(`../../../assets/icons/${props.icon}.svg`)))
</script>

<template>
  <component
    :is="CurrentIconComponent"
    :height="pixelSize"
    :width="pixelSize"
  />
</template>
