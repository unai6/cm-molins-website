<script setup></script>

<template>
  <div class="corporative-responsibility">
    <div class="corporative-responsibility__container">
      <div class="corporative-responsibility__content">
        <div class="corporative-responsibility__title">
          <ContentSlot :use="$slots.title" />
        </div>
        <div class="corporative-responsibility__description">
          <ContentSlot :use="$slots.description" unwrap="p" />
        </div>
      </div>
      <img class="corporative-responsibility__corp-logo" src="/images/fundacion-joaquin-molins-logo.jpg">
    </div>
    <img class="corporative-responsibility__stairs" src="/images/escalera-2.jpg">
  </div>
</template>

<style lang="scss">
.corporative-responsibility {
  background-color: $color-primary-lighter;

  &__container {
    display: flex;
    gap: $spacer*1.5;
    padding: $spacer*1.5;
    max-width: $max-content-width;
    margin: 0 auto;

    @include breakpoint(lg) {
      gap: $spacer*12;
      padding: $spacer*3 $spacer*9.6785;
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
    text-align: justify;
    text-wrap: balance;
  }

  &__corp-logo {
    width: 240px;
  }

  &__stairs {
    display: block;
    margin-top: auto;
    width: 100%;
  }
}
</style>
