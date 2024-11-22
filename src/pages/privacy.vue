<script setup>
const { locale, defaultLocale } = useI18n()
const { path } = useRoute()

const contentPath = locale.value === defaultLocale ? `/${locale.value}${path}` : path
</script>

<template>
  <div class="privacy">
    <ContentDoc :path="contentPath" />
  </div>
</template>

<style lang="scss">
.privacy {
  max-width: $max-content-width;
  padding: $spacer*1.5;
  margin: 0 auto;

  @include breakpoint(lg) {
    padding: $spacer*3 $spacer*6.25;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: $spacer*1.5;
    font-family: $font-family-highlight;
    line-height: $font-lineheight-large;

    & > h1,
    & > h2,
    & > h3 {
      font-family: $font-family-base;
    }

    & >  ul {
      display: flex;
      flex-direction: column;
      gap: $spacer;
    }

    & strong {
      font-weight: $font-weight-bold;
      font-family: $font-family-highlight;
    }

    & a {
      text-decoration: none;
      color: $color-primary;
    }
  }
}
</style>
