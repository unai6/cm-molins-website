<script setup></script>


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
  </div>
</template>

<style lang="scss">
.who-are-we {
  @include breakpoint(lg) {
    padding-top: $spacer*4;
    padding-inline: $spacer*9.6785;
  }

  &__title {
    display: flex;
    flex-direction: column;
    gap: $spacer-double;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: $color-primary;
    font-size: ms(3);
  }

  &__subtitle {
    font-size: ms(1);
  }

  &__content {
    padding-top: $spacer*3;
  }

  &__float {
    float: left;
    width: 30%;
    padding: 0 $spacer-double;
    padding-left: 0;
    color: $color-primary;
    font-size: ms(1);
    line-height: 2.5rem;
    font-family: $font-family-base;
    text-wrap: pretty;
  }

  &__text {
    line-height: 2.5rem;
    font-family: $font-family-highlight;
    text-align: justify;
    text-wrap: balance;
  }
}
</style>
