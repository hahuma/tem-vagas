<template>
  <section class="generic-container container text-center pb-5">
    <h3 class="pb-5 text-secondary main-title">Nossos Planos</h3>

    <swiper
      :slides-per-view="5"
      :space-between="30"
      :loop="false"
      :breakpoints="breakpoints"
    >
      <swiper-slide class="py-5 bg-white d-flex flex-column rounded-3 shadow">
        <img class="m-auto img-fluid" src="../../assets/images/job.png" alt="">
        <h2 class="titulo--2">01</h2>
        <span class="titulo--1">Anúncio</span>
        <hr class="mx-5" />
        <span>R$ 50,00</span>
      </swiper-slide>
      <swiper-slide class="py-5 bg-white d-flex flex-column rounded-3 shadow">
        <img class="m-auto img-fluid" src="../../assets/images/job.png" alt="">
        <h2 class="titulo--2">02</h2>
        <span class="titulo--1">Anúncios</span>
        <hr class="mx-5" />
        <span>R$ 90,00</span>
      </swiper-slide>
      <swiper-slide class="py-5 bg-white d-flex flex-column rounded-3 shadow">
        <img class="m-auto img-fluid" src="../../assets/images/job.png" alt="">
        <h2 class="titulo--2">05</h2>
        <span class="titulo--1">Anúncios</span>
        <hr class="mx-5" />
        <span>R$ 200,00</span>
      </swiper-slide>
      <swiper-slide class="py-5 bg-white d-flex flex-column rounded-3 shadow">
        <img class="m-auto img-fluid" src="../../assets/images/job.png" alt="">
        <h2 class="titulo--2">10</h2>
        <span class="titulo--1">Anúncios</span>
        <hr class="mx-5" />
        <span>R$ 350,00</span>
      </swiper-slide>
      <swiper-slide class="py-5 bg-white d-flex flex-column rounded-3 shadow">
        <img class="m-auto img-fluid" src="../../assets/images/job.png" alt="">
        <h2 class="titulo--2">25</h2>
        <span class="titulo--1">Anúncios</span>
        <hr class="mx-5" />
        <span>R$ 500,00</span>
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