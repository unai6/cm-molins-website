<script setup>
import { ref, onMounted } from 'vue'
import { useElementSize } from  '@vueuse/core'

const corporativeValuesItems = [
  {
    icon: '',
    title: 'Excelencia',
    description: '',
    backgroundColor: '#014CB1',
  },
  {
    icon: '',
    title: 'Adaptabilidad',
    description: '',
    backgroundColor: '#C6C6C6',
  },
  {
    icon: '',
    title: 'Transparencia',
    description: '',
    backgroundColor: '#057ED1',
  },
  {
    icon: '',
    title: 'Familia',
    description: '',
    backgroundColor: '#4BADD8',
  },
  {
    icon: '',
    title: 'Compromiso',
    description: '',
    backgroundColor: '#666666',
  },
  {
    icon: '',
    title: 'Ética',
    description: '',
    backgroundColor: '#80C8E4',
  },
]

const doublePi = 2 * Math.PI
const alphaOffset = doublePi / corporativeValuesItems.length
const innerCircleRef = ref(null)

const  { width } = useElementSize(innerCircleRef)

onMounted(() => {
  const elementsArray = [...innerCircleRef.value.children]
  // 16 stands for the px spacer added by design.
  const radius =  (width.value / 2) + 16

  for (let i = 0; i < elementsArray.length; i++) {
    const angle = alphaOffset * i + 4.188
    const x = radius + radius * Math.cos(angle) - 75 - 16
    const y = radius + radius * Math.sin(angle) - 75 - 16
    elementsArray[i].style.left = `${x}px`
    elementsArray[i].style.top = `${y}px`
  }
})
</script>

<template>
  <div class="corporative-values">
    <p class="corporative-values__title">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </p>
    <div class="corporative-values__wheel-container">
      <div ref="innerCircleRef" class="corporative-values__inner-circle">
        <div
          v-for="(value, idx) in corporativeValuesItems"
          :key="idx"
          class="corporative-values__item"
          :style="{ backgroundColor: value.backgroundColor }"
        >
          <p>{{ value.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.corporative-values {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: $color-neutral-white;

  @include breakpoint(lg) {
    padding: $spacer*3;
    gap: $spacer-double;
  }

  &__wheel-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 470px;
  }

  &__inner-circle {
    position: relative;
    border-radius: $border-radius-circular;
    height: 320px;
    width: 320px;
    background-color: $color-neutral-medium;
  }

  &__item {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: $border-radius-circular;
    width: 150px;
    height: 150px;
    left: 50%;
    top: 50%;
    color: $color-neutral-white;
    font-size: ms(1);
    font-weight: $font-weight-bold;
  }
}
</style>
