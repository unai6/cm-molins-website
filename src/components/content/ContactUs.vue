<template>
  <div class="contact-us">
    <img class="contact-us__image" src="/images/oficina.jpg">
    <div class="contact-us__details-wrapper">
      <div class="contact-us__details">
        <h2 class="contact-us__title">
          <ContentSlot :use="$slots.title" unwrap="p" />
          <p class="contact-us__subtitle">
            <ContentSlot :use="$slots.subtitle" unwrap="p" />
          </p>
        </h2>
        <p class="contact-us__item">
          <ContentSlot :use="$slots.phone" unwrap="p" />
        </p>
        <p class="contact-us__item">
          <ContentSlot :use="$slots.mail" unwrap="p" />
        </p>
        <p class="contact-us__item">
          <ContentSlot :use="$slots.location" unwrap="p" />
        </p>
        <p class="contact-us__item">
          <ContentSlot :use="$slots.zip" unwrap="p" />
        </p>
      </div>
      </div>
  </div>
</template>

<style lang="scss">
.contact-us {
  display: flex;
  flex-direction: column-reverse;

  @include breakpoint(lg) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: unset;
    padding-top: $spacer*3;
    width: 100%;
  }

  @include breakpoint(xl) {
    padding-top: 100px;
  }

  &__image {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &__details-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color-neutral-dark;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: $spacer-double;
    box-sizing: border-box;
    padding: $spacer*3 $spacer*1.5;
  }

  &__title {
    display: flex;
    flex-direction: column;
    gap: $spacer*2.5;
    font-size: ms(3);
    line-height: $font-lineheight-medium;
    color: $color-neutral-white;
    letter-spacing: .1rem;
  }

  &__subtitle {
    font-size: ms(1);
    font-family: Cinzel, serif;
    letter-spacing: 0;

    & > strong {
      font-family: $font-family-highlight;
      font-weight: $font-weight-bold;
      font-size: ms(2);
    }
  }

  &__item {
    display: flex;
    align-items: center;
    gap: $spacer;
    color: $color-neutral-white;
    text-decoration: none;
    font-size: ms(1);
    line-height: $font-lineheight-large;
    font-family: $font-family-highlight;


    & > a {
      text-decoration: none;
      color: $color-neutral-white;

      @media(hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }
    }

    & > svg {
      height: 32px;
      width: 32px;
    }
  }
}
</style>
