<script setup>
import BaseIcon from '@/components/content/base/BaseIcon.vue'

const isOpen = defineModel({ type: Boolean, default: false })
</script>

<template>
  <div v-if="isOpen" class="base-modal">
    <div class="base-modal__overlay" />
    <BaseIcon icon="x-icon" @click="isOpen = false" />
    <div class="base-modal__container">
      <h2 class="base-modal__title">
        <slot name="title" />
      </h2>
      <div class="base-modal__content">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
