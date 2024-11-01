<script setup>
const props = defineProps({
  contactDetails: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="contact-us">
    <img src="/images/oficina.jpg">
    <div class="contact-us__details">
      <h2 class="contact-us__title">
        <ContentSlot :use="$slots.title" unwrap="p" />
      </h2>
      <div v-for="(item, idx) in contactDetails" :key="idx" class="contact-us__item">
        {{ item }}
      </div>
      <ContentSlot :use="$slots.phone" />
    </div>
  </div>
</template>

<style lang="scss">
.contact-us {
  display: flex;
  padding-top: $spacer*3;
  width: 100%;

  &__details {
    background: $color-neutral-dark;
    flex: 1;
  }
}
</style>
