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
  small: '8px',
  medium: '16px',
  large: '24px',
  largest: '32px',
}

const currentIcon = computed(() => defineAsyncComponent(() => import(`../../assets/icons/${props.icon}.svg`)))
</script>

<template>
  <component :is="currentIcon" />
</template>
