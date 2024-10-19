<script setup></script>

<template>
  <div class="what-we-do">
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
      <img class="what-we-do__image" src="/images/terraza.webp">
    </div>
  </div>
</template>

<style lang="scss">
.what-we-do {
  background-color: $color-neutral-white;

  &::before {
    position: absolute;
    content: '';
    height: 100px;
    width: 100%;
    background-color: $color-neutral-medium;
  }

  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: $spacer*3;
    padding: $spacer*1.5 0;
    max-width: $max-content-width;
    margin: 0 auto;

    @include breakpoint(lg) {
      flex-direction: row;
      padding: $spacer*3 0;
    }
  }

  &__title {
    color: $color-primary;
    font-size: ms(3);
    text-align: left;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacer*3;
    padding: $spacer*1.5;
    padding-top: calc(100px + $spacer*3);

    @include breakpoint(lg) {
      padding-left: $spacer*9.6785;
    }
  }

  &__intro {
    font-size: ms(0);
    line-height: $font-lineheight-large;
    font-weight: $font-weight-light;
  }

  &__list {
    font-size: ms(3);
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
    align-self: center;
    object-fit: cover;
    width: 100%;
    aspect-ratio: 1;

    @include breakpoint(lg) {
      padding-top: calc(100px + $spacer*3);
      width: 40%;
    }
  }
}
</style>
