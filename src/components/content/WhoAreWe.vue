<script setup>
import WhoAreWeGridImages from '@/components/content/WhoAreWeGridImages.vue'
</script>

<template>
  <div class="who-are-we">
    <p class="who-are-we__title">
      <ContentSlot :use="$slots.title" unwrap="p" />
      <ContentSlot :use="$slots.subtitle" unwrap="p"/>
    </p>
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
  padding-top: $spacer*8;

  @include breakpoint(lg) {
    gap: $spacer*3;
    padding-top: $spacer*4;
    padding-inline: $spacer*9.6785;
  }

  &__title {
    display: flex;
    flex-direction: column;
    gap: $spacer*1.5;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    padding: $spacer*1.5;
    color: $color-primary;
    font-size: ms(3);

    @include breakpoint(lg) {
      gap: $spacer-double;
    }
  }

  &__subtitle {
    font-size: ms(1);
  }

  &__content {
    padding: $spacer*1.5;
    padding-bottom: 0;
  }

  &__float {
    color: $color-primary;
    font-size: ms(1);
    font-family: $font-family-base;
    display: inline-block;

    @include breakpoint(lg) {
      float: left;
      padding: 0 $spacer-double;
      padding-left: 0;
      width: 30%;
      line-height: 2.5rem;
      text-wrap: pretty;
    }
  }

  &__text {
    line-height: 2.5rem;
    font-family: $font-family-highlight;
    text-align: justify;
    text-wrap: balance;
  }
}
</style>
