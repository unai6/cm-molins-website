<script setup>
import WhoAreWeGridImages from '@/components/content/WhoAreWeGridImages.vue'
</script>

<template>
  <div id="us" class="who-are-we">
    <div class="who-are-we__title">
      <ContentSlot :use="$slots.title" unwrap="p" />
      <ContentSlot :use="$slots.subtitle" unwrap="p"/>
    </div>
    <div class="who-are-we__content">
      <p class="who-are-we__text">
        <span class="who-are-we__float">
          <ContentSlot :use="$slots.float" unwrap="p"/>
        </span>
        <ContentSlot :use="$slots.text" unwrap="p"/>
      </p>
    </div>
    <WhoAreWeGridImages />
  </div>
</template>

<style lang="scss">
.who-are-we {
  display: flex;
  flex-direction: column;
  gap: $spacer-double;
  box-sizing: border-box;
  padding-top: $spacer*8;
  padding-bottom: $spacer*3;
  max-width: $max-content-width;
  margin: 0 auto;

  @include breakpoint(lg) {
    gap: $spacer*3;
    padding: $spacer*3 $spacer*6.25;
    padding-top: 0;
  }

  &__title {
    display: flex;
    flex-direction: column;
    gap: $spacer*1.5;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 $spacer*1.5;
    color: $color-primary;
    font-size: ms(3);
    text-align: center;

    @include breakpoint(lg) {
      gap: $spacer-double;
    }
  }

  &__subtitle {
    font-size: ms(1);
  }

  &__content {
    padding: 0 $spacer*1.5;

    @include breakpoint(lg) {
      padding: unset;
    }
  }

  &__float {
    color: $color-primary;
    font-family: $font-family-base;
    display: inline-block;

    @include breakpoint(lg) {
      float: left;
      padding: 0 $spacer-double;
      padding-left: 0;
      width: 30%;
      font-size: ms(1);
      line-height: $font-lineheight-largest;
      text-wrap: pretty;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: $spacer;
    line-height: $font-lineheight-largest;
    font-family: $font-family-highlight;
    text-align: left;

    @include breakpoint(lg) {
      display: block;
      text-align: justify;
    }
  }
}
</style>
