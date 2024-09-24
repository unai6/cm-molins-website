<template>
  <div class="who-are-we-grid-images">
    <div className="who-are-we-grid-images__item who-are-we-grid-images__item--1" />
    <div className="who-are-we-grid-images__item who-are-we-grid-images__item--2" />
    <div className="who-are-we-grid-images__item who-are-we-grid-images__item--3" />
    <div className="who-are-we-grid-images__item who-are-we-grid-images__item--4" />
    <div className="who-are-we-grid-images__item who-are-we-grid-images__item--5" />
    <div className="who-are-we-grid-images__item who-are-we-grid-images__item--6" />
    <div className="who-are-we-grid-images__item who-are-we-grid-images__item--7" />
    <div className="who-are-we-grid-images__item who-are-we-grid-images__item--8" />
    <div className="who-are-we-grid-images__item who-are-we-grid-images__item--9" />
  </div>
</template>

<style lang="scss">
.who-are-we-grid-images {
  @include breakpoint(lg) {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: $spacer-half;
  }

  &__item {
    @include breakpoint(lg) {
      background-clip: border-box;
      background-size: cover;
      background-repeat: no-repeat;
    }

    &--1 {
      @include breakpoint(lg) {
        background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618326526/fotos%20carousel%20home/cementos_antiguo_dzvgvg.webp');
        grid-area: 1 / 1 / 2 / 2;
        height: 250px;
        width: 350px;
      }
    }

    &--2 {
      @include breakpoint(lg) {
        background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618327513/fotos%20carousel%20home/modernista_1_g2opnx.webp');
        grid-area: 2 / 1 / 3 / 2;
      }
    }

    &--3 {
      @include breakpoint(lg) {
        background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618327715/fotos%20carousel%20home/panots_g8iia6.webp');
        grid-area: 3 / 1 / 4 / 2;
      }
    }

    &--4 {
      @include breakpoint(lg) {
        background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618327556/fotos%20carousel%20home/modernista_2_pootg5.webp');
        grid-area: 3 / 2 / 4 / 5;
      }
    }

    &--5 {
      @include breakpoint(lg) {
        grid-area: 1 / 2 / 2 / 3;
      }
    }

    &--6 {
      background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618326559/fotos%20carousel%20home/cementera_urzfdh.webp');
      background-repeat: round;
      background-size: contain;
      grid-area: 1 / 2 / 3 / -1;

      @include breakpoint(lg) {
        background-repeat: no-repeat;
        background-size: cover;
      }
    }

    &--7 {
      @include breakpoint(lg) {
        background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618327396/fotos%20carousel%20home/entrada_casa_wqsazb.webp');
        grid-area: 3 / 5 / 4 / -1;
      }
    }

    &--8 {
      @include breakpoint(lg) {
        background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618327504/fotos%20carousel%20home/cms_mapa_vjvy7u.webp');
        background-position: center;
        grid-area: 4 / 1 / -1 / 4;
        height: 380px;
      }
    }

    &--9 {
      @include breakpoint(lg) {
        background-image: url('https://res.cloudinary.com/webmolins/image/upload/v1618329920/fotos%20carousel%20home/cementera_2_voxszb.webp');
        background-position: center;
        grid-area: 4 / 4 / 4 / -1;
        height: 380px;
      }
    }
  }
}
</style>
