<script setup></script>

<template>
  <div id="socialResponsability" class="corporate-responsibility">
    <div class="corporate-responsibility__container">
      <div class="corporate-responsibility__content">
        <div class="corporate-responsibility__title">
          <ContentSlot :use="$slots.title" />
        </div>
        <img class="corporate-responsibility__corp-logo hidden-desktop" src="/images/fundacion-joaquin-molins-logo.jpg">
        <div class="corporate-responsibility__description">
          <ContentSlot :use="$slots.description" unwrap="p" />
        </div>
      </div>
      <img class="corporate-responsibility__corp-logo desktop-only" src="/images/fundacion-joaquin-molins-logo.jpg">
    </div>
    <img class="corporate-responsibility__stairs" src="/images/escalera-2.jpg">
  </div>
</template>

<style lang="scss">
.corporate-responsibility {
  background-color: $color-primary-lighter;

  &__container {
    display: flex;
    flex-direction: column;
    gap: $spacer*1.5;
    padding: $spacer*3 $spacer*1.5;
    max-width: $max-content-width;
    margin: 0 auto;

    @include breakpoint(lg) {
      flex-direction: row;
      padding: $spacer*3 $spacer*9.6785;
      gap: $spacer*3;
    }

    @include breakpoint(xl) {
      gap: $spacer*12;
    }
  }

  &__title {
    color: $color-primary;
    font-size: ms(3);
    line-height: $font-lineheight-long;
    text-align: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacer*1.5;
    font-family: $font-family-highlight;
    line-height: $font-lineheight-largest;

    @include breakpoint(lg) {
      gap: $spacer*3;
    }

    & strong {
      font-weight: $font-weight-bold;
    }
  }

  &__description {
    text-align: left;
    text-wrap: pretty;

    & > a {
      text-decoration: none;
      color: $color-primary;
    }
  }

  &__corp-logo {
    flex-shrink: 0;
    object-fit: contain;
    margin: 0 auto;
    width: 50%;

    @include breakpoint(md) {
      width: 300px;
      margin: 0 auto;
    }

    @include breakpoint(lg) {
      min-width: 240px;
    }
  }

  &__stairs {
    display: block;
    margin-top: auto;
    width: 100%;
  }
}
</style>
