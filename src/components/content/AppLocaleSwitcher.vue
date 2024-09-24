<script setup>
import { reactive, ref, computed } from 'vue'
import { onClickOutside, useBreakpoints } from '@vueuse/core'

import config from '@/config'

const { locale: currentLocale, locales, setLocale } = useI18n()
const breakpoints = useBreakpoints(config.breakpoints)

const state = reactive({
  isMobile: breakpoints.smaller('lg'),
})

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
  margin-top: $spacer;
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
