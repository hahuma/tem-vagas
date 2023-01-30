<template>
  <swiper
    :slides-per-view="1"
    :space-between="0"
    :loop="true"
  >
    <swiper-slide>
      <div class="position-relative">
        <div style="z-index: 20;" class="banner-content bg-black text-white text-center position-absolute">
          <h1 class="text-white display-2">
            Tenha acesso a<br />
            <strong>vagas exclusivas</strong>
          </h1>
          <p class="text-center display-2 text-white">
            Quer divulgar vagas de emprego e estágio?
          </p>
        </div>
        <img src="../../assets/images/banner-completo.png" class="d-none d-lg-block" alt="">
        <img src="../../assets/images/banner-mobile.png" class="d-block d-lg-none" alt="">
      </div>
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
</script>