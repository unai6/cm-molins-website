<script setup>
const { locale: currentLocale, locales, setLocale } = useI18n()
</script>

<template>
  <div class="app-locale-switcher">
    <div
      v-for="locale in locales"
      :key="locale"
      class="app-locale-switcher__locale"
      :class="{ 'app-locale-switcher__locale--selected': locale.code === currentLocale }"
      @click="setLocale(locale.code)"
    >
      {{ locale.customCode }}
    </div>
  </div>
</template>

<style lang="scss">
.app-locale-switcher {
  display: flex;
  gap: $spacer;
  border-radius: $border-radius-sm;
  width: fit-content;
  font-size: ms(0);
  font-weight: $font-weight-semibold;
  font-family: $font-family-highlight;

  @include breakpoint(lg) {
    border: $border-weight-hairline solid $color-primary;
    padding: $spacer*0.75 $spacer-double;
  }

  &__locale {
    cursor: pointer;

    &--selected {
      color: $color-primary;
    }
  }
}
</style>
