<template>
  <div class="home min-vh-100">
    <!-- <component :is="componentView" /> -->
    <Header></Header>
    <banner></banner>
    <section class="text-center container generic-container">
      <h3 class="pb-5 text-secondary main-title">Benefícios</h3>
      <swiper
        :slides-per-view="3"
        :space-between="40"
        :loop="true"
        :breakpoints="firstBreakpoint"
      >
        <swiper-slide class="beneficios bg-white d-flex flex-column">
          <img class="mx-auto" src="https://www.temvagas.net/_nuxt/img/icone-agendamento.1f2d924.png" alt="">
          <h4 class="title">Agendamento Facilitado</h4>
          <p>
            Agende entrevistas com os candidatos via SMS e email. Encerrou a
            vaga, os candidatos são comunicados por email.
          </p>
        </swiper-slide>
        <swiper-slide class="beneficios bg-white d-flex flex-column">
          <img class="mx-auto" src="https://www.temvagas.net/_nuxt/img/icone-agendamento.1f2d924.png" alt="">
          <h4 class="title">Divulgação em Diversos Sites</h4>
          <p>
            Agende entrevistas com os candidatos via SMS e email. Encerrou a
            vaga, os candidatos são comunicados por email.
          </p>
        </swiper-slide>
        <swiper-slide class="beneficios bg-white d-flex flex-column">
          <img class="mx-auto" src="https://www.temvagas.net/_nuxt/img/icone-agendamento.1f2d924.png" alt="">
          <h4 class="title">Funil de Seleção Inteligente</h4>
          <p>
            
            Disponibilizamos um Funil de Seleção Inteligente que separa os
            candidatos compatíveis dos incompatíveis, dando mais agilidade ao
            processo seletivo.
          
          </p>
        </swiper-slide>
      </swiper>
    </section>

    <who-announces></who-announces>

    <our-process></our-process>

    <plans></plans>
    <faq></faq>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from '@/components/site/Header.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import Faq from '@/components/home/Faq.vue'
import Plans from '@/components/home/Plans.vue'
import OurProcess from '@/components/home/OurProcess.vue'
import WhoAnnounces from '@/components/home/WhoAnnounces.vue'
import Banner from '@/components/home/Banner.vue'
import Footer from '@/components/site/Footer.vue'

const firstBreakpoint = {
  768: {
    slidesPerView: 3
  },
  320: {
    slidesPerView: 1
  }
}


// import { ref, onMounted } from 'vue'
// import { useAuthStore } from '@/stores/authStore'
// import Gestores from '@/pages/Dashboards/Gestores.vue'
// import Gerencias from '@/pages/Dashboards/Gerencias.vue'
// import Marketing from '@/pages/Dashboards/Marketing.vue'
// import Assistentes from '@/pages/Dashboards/Assistentes.vue'

// const router = useRouter()
// const store = useAuthStore()
// const componentView = ref(Assistentes)

// onMounted(() => {
//   switch (store.perfil) {
//     case 'GESTOR':
//       componentView.value = Gestores
//       break
//     case 'GERENCIAS':
//       componentView.value = Gerencias
//       break
//     case 'MARKETING':
//       componentView.value = Marketing
//       break
//     default:
//       componentView.value = Assistentes
//       break
//   }
// })
</script>

<style lang="scss">


.home {
  .banner-content {
    top: 25%;
    left: 0;
    right: 0;
  }

  .generic-container {
    padding: 50px 20px;

    .main-title {
      font-size: 24px;
      font-weight: 700;
    }

    .beneficios {
      background-color: white;
      width: 390px;
      height: 350px;
      padding: 50px 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgb(0 0 0 / 10%);
    
      .title {
        font-size: 20px;
        color: #0f4478;
        margin-top: 25px;
        margin-bottom: 15px;
        font-weight: 700;
      }
    
      img {
        height: 80px;
        width: 80px;
      }

      p {
        font-size: 14px;
      }
    }
  }

  .swiper-pagination {
    width: 500px;
    height: 150px;
    display: flex;
    
    .swiper-pagination-bullet {
      width: 25px !important;
      height: 25px !important;
    }
  }

    
  

  #beneficios {
    padding-bottom: 0;
  }


}

</style>