<template>
  <footer class="app-footer">
    <ContentSlot :use="$slots.legal" unwrap="p" />
    <ContentSlot :use="$slots.termsAndConditions" unwrap="p" />
  </footer>
</template>

<style lang="scss">
.app-footer {
  display: flex;
  gap: $spacer*3;
  justify-content: center;
  padding: $spacer $spacer*1.25;
  font-size: ms(1);
  font-family: $font-family-highlight;

  & > :first-child {
    position: relative;

    &::after {
      position: absolute;
      content: '|';
      right: -$spacer*1.5;
      height: 100%;
      width: 2px;
    }
  }

  & > a {
    text-decoration: none;
    color: $color-neutral-black;
  }
}
</style>
