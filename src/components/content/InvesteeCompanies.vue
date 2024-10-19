<script setup>
const investeeCompaniesType = ['industry', 'startup', 'finance', 'real-state']
</script>

<template>
  <div class="investee-companies">
    <div class="investee-companies__container">
      <div class="investee-companies__title">
        <ContentSlot :use="$slots.title" />
      </div>
      <div v-for="investee in investeeCompaniesType" :key="investee">
        <img :src="`/images/investee/participadas-${investee}.jpg`">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.investee-companies {
  &__container {
    max-width: $max-content-width;

    @include breakpoint(lg) {
      margin: 0 auto;
      padding: $spacer*3 $spacer*9.6785;
    }
  }
  &__title {
    font-size: ms(3);
    text-align: center;
    text-transform: uppercase;
    color: $color-primary;
  }
}
</style>
