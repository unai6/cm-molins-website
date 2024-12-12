<script setup>
const localePath = useLocalePath()
</script>

<template>
  <div class="error">
    <p class="error__message">{{ $t('error.label.pageNotFound') }}</p>
    <NuxtLink :to="localePath('/')">
      <img src="/images/fundacion-joaquin-molins-logo.jpg">
    </NuxtLink>
  </div>
</template>

<style lang="scss">
.error {
  display: flex;
  flex-direction: column;
  gap: $spacer-double;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  font-weight: $font-weight-bold;

  &__message {
    font-size: ms(3);
  }
}
</style>
