<template>
  <section class="generic-container container text-center pb-5">
    <h3 class="pb-5 text-secondary main-title">Quem anuncia com a gente</h3>

    <swiper
      :slides-per-view="5"
      :space-between="10"
      :loop="true"
      :breakpoints="breakpoints"
      :autoplay="true"
    >
      <swiper-slide class="py-5 bg-white d-flex flex-column">
        <img class="m-auto img-fluid" src="https://www.temvagas.net/_nuxt/img/icone-agendamento.1f2d924.png" alt="">
      </swiper-slide>
      <swiper-slide class="py-5 bg-white d-flex flex-column">
        <img class="m-auto img-fluid" src="https://www.temvagas.net/_nuxt/img/icone-agendamento.1f2d924.png" alt="">
      </swiper-slide>
      <swiper-slide class="py-5 bg-white d-flex flex-column">
        <img class="m-auto img-fluid" src="https://www.temvagas.net/_nuxt/img/icone-agendamento.1f2d924.png" alt="">
      </swiper-slide>
    </swiper>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
const breakpoints = {
  1024: {
    slidesPerView: 5
  },
  768: {
    slidesPerView: 3
  },
  320: {
    slidesPerView: 1
  }
}
</script>