<template>
  <swiper
    :loop="true"
    :space-between="20"
    :slides-per-view="7"
    :breakpoints="breakpoints"
  >
    <swiper-slide>

    </swiper-slide>
  </swiper>
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