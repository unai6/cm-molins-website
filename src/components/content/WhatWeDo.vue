<script setup></script>

<template>
  <div id="whatWeDo" class="what-we-do">
    <div class="what-we-do__container">
      <div class="what-we-do__content">
        <div class="what-we-do__title">
          <ContentSlot :use="$slots.title" />
        </div>
        <p class="what-we-do__intro">
          <ContentSlot :use="$slots.intro" unwrap="p" />
        </p>
        <div class="what-we-do__list">
          <ContentSlot :use="$slots.list"  />
        </div>
      </div>
      <img class="what-we-do__image" src="/images/terraza.jpg">
    </div>
  </div>
</template>

<style lang="scss">
.what-we-do {
  background-color: $color-neutral-white;

  &::before {
    position: absolute;
    content: '';
    height: 48px;
    width: 100%;
    background-color: $color-neutral-medium;

    @include breakpoint(xl) {
      height: 100px;
    }
  }

  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: $spacer*1.5;
    box-sizing: border-box;
    padding: $spacer*1.5 0;
    padding-top: $spacer*6;
    padding-bottom: 0;
    max-width: $max-content-width;
    margin: 0 auto;

    @include breakpoint(lg) {
      padding: $spacer*3 $spacer*7.5;
      padding-top: calc(100px + $spacer*3);
    }

    @include breakpoint(xl) {
      flex-direction: row;
      gap: $spacer*3;
      padding-right: 0;
    }

    @include breakpoint(xxl) {
      padding-right: unset;
      padding: $spacer*3 $spacer*7.5;
      padding-top: calc(100px + $spacer*3);
    }
  }

  &__title {
    color: $color-primary;
    font-size: ms(3);
    text-align: center;

    @include breakpoint(xl) {
      text-align: left;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacer*1.5;
    padding: $spacer*1.5;
    padding-top: 0;

    @include breakpoint(lg) {
      gap: $spacer*3;
      padding: 0;
    }
  }

  &__intro {
    font-size: ms(0);
    line-height: $font-lineheight-largest;
    font-weight: $font-weight-light;
  }

  &__list {
    font-size: ms(2);
    line-height: $font-lineheight-long;
    padding-left: $spacer*2.5;
    color: $color-primary;

    & > ol {
      display: flex;
      flex-direction: column;
      gap: $spacer*1.25;
      list-style: numeric;
      width: fit-content;

      & > li {
        border-bottom: $border-weight-hairline solid $color-neutral-dark;
        padding-bottom: $spacer*0.25;

        &::marker {
          font-size: ms(4);
        }
      }
    }
  }

  &__image {
    object-fit: cover;
    width: 100%;

    @include breakpoint(xl) {
      width: 40%;
      aspect-ratio: 1;
    }
  }
}
</style>
