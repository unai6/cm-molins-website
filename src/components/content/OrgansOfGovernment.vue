<script setup>
import BaseIcon from '@/components/content/base/BaseIcon.vue'

const props = defineProps({
  organs: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div id="organsOfGovernment" class="organs-of-government">
    <div class="organs-of-government__container">
      <div class="organs-of-government__title">
        <ContentSlot :use="$slots.title" />
      </div>
      <div class="organs-of-government__organs">
        <div v-for="(organ, idx) in props.organs" :key="idx" class="organs-of-government__organ" >
          <BaseIcon class="organs-of-government__icon" :icon="organ.icon" />
          <p class="organs-of-government__name">{{ organ.name }}</p>
          <p class="organs-of-government__description">{{ organ.description }}</p>
        </div>
      </div>
    </div>
    <img class="organs-of-government__image" src="/images/escalera-1.jpg">
  </div>
</template>


<style lang="scss">
.organs-of-government {
  background-color: $color-neutral-white;

  &__container {
    display: flex;
    flex-direction: column;
    gap: $spacer*1.5;
    padding: $spacer*3 $spacer*1.5;
    max-width: $max-content-width;
    margin: 0 auto;

    @include breakpoint(lg) {
      padding: $spacer*3;
      padding-inline: $spacer*9.6785;
    }
  }

  &__title {
    color: $color-primary;
    font-size: ms(3);
    text-align: center
  }

  &__organs {
    display: flex;
    flex-direction: column;
    gap: $spacer*1.5;

    @include breakpoint(lg) {
      flex-direction: row;
    }
  }

  &__icon {
    color: $color-primary;
    width: 80px;
    height: 80px;
  }

  &__organ {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: $spacer*1.5;
  }

  &__name {
    color: $color-primary;
    font-size: ms(1);
    text-transform: uppercase;
    text-align: center;
  }

  &__description {
    line-height: $font-lineheight-largest;
    font-family: $font-family-highlight;
  }

  &__image {
    display: block;
    margin-top: auto;
    width: 100%;;
  }
}
</style>
