<script setup></script>

<template>
  <div class="what-we-do">
    <div class="what-we-do__content">
      <ContentSlot :use="$slots.title" />
      <div class="what-we-do__list">
        <p class="what-we-do__intro">
          <ContentSlot :use="$slots.intro" unwrap="p" />
        </p>
        <ContentSlot :use="$slots.list"  />
      </div>
    </div>
    <img>
  </div>
</template>

<style lang="scss">
.what-we-do {}
</style>
